/**
 * What the person did, written into the trace: EVERY click, anywhere — a button,
 * a file tile, a row, a blank spot — with what it was, which region of the
 * screen, where the pointer was and the element's box. Plus scroll-bar grabs,
 * scrolling, right-clicks, double-clicks, fields entered and shortcut keys.
 *
 * Guy, memo 2026-10-22T16-03: "Any time there is a click from the mouse, that
 * click should show up. That click should be identified and its space, the
 * location or the layer that it is clicking on should be logged."
 *
 * Never logged: what is typed into a field, or any key without a modifier.
 *
 * Web and Electron only (it listens on `document`). On React Native it installs
 * nothing; the app calls `trace.step()` from its own handlers.
 *
 * The app can say more than the DOM can, through two hooks:
 *   region(el)   → 'sidebar' | 'toolbar' | 'grid' | …   the area of the screen (default: nearest landmark/id)
 *   describe(el) → { text, data } | null               what the thing IS ("file IMG_5238.MOV in Photos/2026")
 */
import type { DebugTrace } from './types';

export type RegionFn = (el: Element) => string | null | undefined;
export type DescribeFn = (target: Element, hit: Element) => { text?: string; data?: Record<string, unknown> } | null | undefined;

export interface CaptureOptions {
  region?: RegionFn;
  describe?: DescribeFn;
}

const INTERACTIVE = 'button, a, input, select, textarea, label, summary, [role], [data-act], [data-path], [data-id], [data-name], [tabindex], li, tr';

const short = (s: unknown, n = 80) => {
  const str = String(s ?? '').trim().replace(/\s+/g, ' ');
  return str.length > n ? str.slice(0, n) + '…' : str;
};

/** The element's short DOM path: `div#app > section.grid > div.tile`. */
export function domPath(el: Element, depth = 4): string {
  const parts: string[] = [];
  for (let n: Element | null = el; n && n.nodeType === 1 && parts.length < depth; n = n.parentElement) {
    let p = n.tagName.toLowerCase();
    if (n.id) p += `#${n.id}`;
    else if (n.classList.length) p += '.' + [...n.classList].slice(0, 2).join('.');
    parts.unshift(p);
    if (n.id) break;
  }
  return parts.join(' > ');
}

const box = (el: Element) => {
  const r = el.getBoundingClientRect();
  return [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)];
};

function defaultRegion(el: Element): string {
  for (let n: Element | null = el; n && n !== document.body; n = n.parentElement) {
    const role = n.getAttribute('role');
    const label = n.getAttribute('aria-label');
    if (label && /^(navigation|main|dialog|toolbar|menu|banner|complementary)$/.test(role || '')) return label;
    if (n.id && n.parentElement === document.body) return n.id;
  }
  return 'page';
}

/** A readable name for whatever is under the pointer. */
function nameOf(el: Element) {
  const t = el.closest(INTERACTIVE) || el;
  const h = t as HTMLElement & { placeholder?: string; name?: string; type?: string };
  const label =
    t.getAttribute('aria-label') ||
    t.getAttribute('title') ||
    h.dataset?.name ||
    h.dataset?.path ||
    (t.tagName === 'INPUT' ? h.placeholder || h.name || h.type : '') ||
    t.getAttribute('alt') ||
    t.textContent;
  return { target: t, label: short(label, 60), act: h.dataset?.act || null };
}

const isField = (el: Element) => el.matches('input, textarea, select, [contenteditable]');

/**
 * Listen to the document and write what happens into `trace`. → uninstall.
 * Mark anything the trace should not see (the debug button itself) with `data-debug-ignore`.
 */
export function installCapture(trace: DebugTrace, { region = defaultRegion, describe = () => null }: CaptureOptions = {}): () => void {
  if (typeof document === 'undefined' || typeof addEventListener === 'undefined') return () => {};

  const regionOf = (el: Element) => {
    try {
      return region(el) || defaultRegion(el);
    } catch {
      return defaultRegion(el);
    }
  };
  const at = (e: MouseEvent) => [Math.round(e.clientX), Math.round(e.clientY)];

  function pointerStep(kind: 'click' | 'dblclick' | 'right-click', e: MouseEvent) {
    if (!trace.active || !(e.target instanceof Element)) return;
    if (e.target.closest('[data-debug-ignore]')) return;
    const { target, label, act } = nameOf(e.target);
    let said: ReturnType<DescribeFn> = null;
    try {
      said = describe(target, e.target) || null;
    } catch {
      /* the app's hook never breaks the trace */
    }
    const where = regionOf(target);
    const what = said?.text || label || target.tagName.toLowerCase();
    const data: Record<string, unknown> = { in: where, at: at(e), el: domPath(target), rect: box(target), ...(act ? { act } : {}), ...(said?.data || {}) };
    if (e.shiftKey || e.metaKey || e.ctrlKey || e.altKey) {
      data.mods = (['shift', 'meta', 'ctrl', 'alt'] as const).filter((m) => e[`${m}Key`]).join('+');
    }
    trace.step(kind, `${kind === 'click' ? '' : kind + ': '}${what} (${where})`, data);
  }

  // A press on a scroll bar never becomes a click; catch it at pointerdown, where the pointer sits past the
  // element's content box (clientWidth/Height exclude the bar).
  function scrollbarGrab(e: PointerEvent) {
    if (!trace.active || e.button !== 0) return;
    let el: Element | null = e.target instanceof Element ? e.target : null;
    const root = document.scrollingElement || document.documentElement;
    if (el === document.documentElement || el === document.body) el = root;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const isRoot = el === root;
    const left = isRoot ? 0 : r.left + el.clientLeft;
    const top = isRoot ? 0 : r.top + el.clientTop;
    const onV = el.scrollHeight > el.clientHeight && e.clientX >= left + el.clientWidth;
    const onH = el.scrollWidth > el.clientWidth && e.clientY >= top + el.clientHeight;
    if (!onV && !onH) return;
    trace.step('scrollbar', `scroll bar grabbed: ${regionOf(el)}${onH && !onV ? ' (horizontal)' : ''}`, { in: regionOf(el), at: at(e), el: domPath(el), rect: box(el) });
  }

  function scrolled(e: Event) {
    if (!trace.active) return;
    const el = e.target === document ? document.scrollingElement || document.documentElement : e.target;
    if (!(el instanceof Element)) return;
    const max = el.scrollHeight - el.clientHeight;
    const pct = max > 0 ? Math.round((el.scrollTop / max) * 100) : 0;
    const where = regionOf(el);
    trace.step('scroll', `scroll ${where} to ${pct}%`, { in: where, top: Math.round(el.scrollTop), of: Math.round(max) }, { group: `scroll:${where}` });
  }

  function focused(e: FocusEvent) {
    if (!trace.active || !(e.target instanceof Element) || !isField(e.target)) return;
    const { label } = nameOf(e.target);
    trace.step('focus', `field: ${label || e.target.tagName.toLowerCase()} (${regionOf(e.target)})`, { in: regionOf(e.target), el: domPath(e.target) });
  }

  function keyed(e: KeyboardEvent) {
    if (!trace.active) return;
    if (/^(Meta|Control|Alt|Shift|OS)$/.test(e.key)) return; // a modifier on its own is not a command yet
    const mod = e.metaKey || e.ctrlKey || e.altKey;
    if (!mod && !/^(Escape|Enter|Tab|Delete|Backspace|Arrow\w+|F\d+)$/.test(e.key)) return;
    if (!mod && e.target instanceof Element && e.target.matches('input, textarea, [contenteditable]')) return; // editing, not commanding
    const combo = [e.metaKey && 'cmd', e.ctrlKey && 'ctrl', e.altKey && 'alt', e.shiftKey && 'shift', e.key.length === 1 ? e.key.toUpperCase() : e.key].filter(Boolean).join('+');
    trace.step('key', `key ${combo}`, { in: e.target instanceof Element ? regionOf(e.target) : 'page' });
  }

  const onError = (ev: ErrorEvent) => trace.step('error', short(ev.message || ev.error || 'error', 300), { at: `${ev.filename || ''}:${ev.lineno || ''}` });
  const onReject = (ev: PromiseRejectionEvent) => {
    const r = ev.reason as { message?: string } | undefined;
    trace.step('error', `unhandled: ${short(r?.message || ev.reason, 300)}`);
  };

  // Capture phase: the app's own handlers stop propagation; the trace still sees everything.
  const subs: Array<[string, EventListener]> = [
    ['click', (e) => pointerStep('click', e as MouseEvent)],
    ['dblclick', (e) => pointerStep('dblclick', e as MouseEvent)],
    ['contextmenu', (e) => pointerStep('right-click', e as MouseEvent)],
    ['pointerdown', (e) => scrollbarGrab(e as PointerEvent)],
    ['scroll', scrolled],
    ['focusin', (e) => focused(e as FocusEvent)],
    ['keydown', (e) => keyed(e as KeyboardEvent)],
  ];
  for (const [ev, fn] of subs) document.addEventListener(ev, fn, { capture: true, passive: true });
  addEventListener('error', onError);
  addEventListener('unhandledrejection', onReject);
  return () => {
    for (const [ev, fn] of subs) document.removeEventListener(ev, fn, { capture: true });
    removeEventListener('error', onError);
    removeEventListener('unhandledrejection', onReject);
  };
}
