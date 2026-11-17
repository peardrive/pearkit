/**
 * The lab page: the chat in three places it will live (Pearkit Studio's sidebar, Pearcast's sidebar, a room in
 * rKeyChat), with every feature on a switch. Made for a phone first: the chat fills the screen, the switches open
 * as a sheet. Settings stay in this browser; "Send to Claude" posts a note and the current settings to this Mac.
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, TextInput, View, useWindowDimensions } from 'react-native';
import { Button, cn, darkTheme, IconButton, lightTheme, Text, ThemeProvider } from 'pearkit';
import { Chat } from './chat/Chat';
import { FEATURE_LABELS, ROOM, SIDEBAR, type ChatFeatures, type ChatMessage } from './chat/types';
import { ME, newId, PEER_LINES, SCENARIOS, type Scenario } from './scenarios';

type Settings = Record<Scenario['id'], ChatFeatures>;
const read = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? { ...fallback, ...(JSON.parse(raw) as T) } : fallback;
  } catch {
    return fallback;
  }
};
const defaults = (): Settings => Object.fromEntries(SCENARIOS.map((s) => [s.id, s.preset])) as Settings;

export function Lab() {
  const { width } = useWindowDimensions();
  const wide = width >= 900;
  const [dark, setDark] = useState(() => read('chat-lab:dark', { v: true }).v);
  const [which, setWhich] = useState<Scenario['id']>(() => read('chat-lab:which', { v: 'studio' as Scenario['id'] }).v);
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = read<Partial<Settings>>('chat-lab:settings', {});
    const d = defaults();
    return Object.fromEntries(SCENARIOS.map((s) => [s.id, { ...d[s.id], ...saved[s.id] }])) as Settings;
  });
  const [frame, setFrame] = useState<'sidebar' | 'full'>('sidebar');
  const [sheet, setSheet] = useState(false);
  const scenario = SCENARIOS.find((s) => s.id === which) ?? SCENARIOS[0]!;
  const features = settings[scenario.id];

  useEffect(() => {
    try {
      localStorage.setItem('chat-lab:settings', JSON.stringify(settings));
      localStorage.setItem('chat-lab:which', JSON.stringify({ v: which }));
      localStorage.setItem('chat-lab:dark', JSON.stringify({ v: dark }));
    } catch {
      /* private window: nothing is kept */
    }
    document.body.style.background = (dark ? darkTheme : lightTheme).colors.background;
  }, [settings, which, dark]);

  const set = (patch: Partial<ChatFeatures>) => setSettings((s) => ({ ...s, [scenario.id]: { ...s[scenario.id], ...patch } }));
  const panel = <Switches scenario={scenario} features={features} set={set} dark={dark} setDark={setDark} onClose={wide ? undefined : () => setSheet(false)} />;

  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme} className="flex-1 bg-background" style={{ flex: 1 }}>
      <View className="flex-1 flex-row">
        <View className="flex-1">
          {/* which place, and the switches */}
          <View className="flex-row items-center gap-1 border-b border-overlay/[0.06] px-2 py-1.5">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 4, alignItems: 'center' }} style={{ flex: 1 }}>
              {SCENARIOS.map((s) => (
                <Button key={s.id} size="sm" variant={s.id === which ? 'secondary' : 'ghost'} label={s.title} onPress={() => setWhich(s.id)} />
              ))}
            </ScrollView>
            {wide ? <Button size="sm" variant="ghost" label={frame === 'sidebar' ? 'Sidebar width' : 'Full width'} onPress={() => setFrame((f) => (f === 'sidebar' ? 'full' : 'sidebar'))} /> : <Button size="sm" variant="secondary" label="Switches" onPress={() => setSheet(true)} />}
          </View>
          <View className={cn('flex-1', wide && frame === 'sidebar' && 'items-center bg-pane py-4')}>
            <View className={cn('flex-1', wide && frame === 'sidebar' && 'overflow-hidden rounded-card border border-overlay/[0.08]')} style={wide && frame === 'sidebar' ? { width: 340 } : { alignSelf: 'stretch' }}>
              <Room key={scenario.id} scenario={scenario} features={features} />
            </View>
          </View>
        </View>
        {wide ? <View className="border-l border-overlay/[0.06]" style={{ width: 340 }}>{panel}</View> : null}
      </View>
      {!wide && sheet ? (
        <View style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}>
          <Pressable onPress={() => setSheet(false)} className="bg-black/50" style={{ height: '12%' }} accessibilityLabel="Close the switches" />
          <View className="flex-1 rounded-t-[18px] border-t border-overlay/[0.10] bg-background">{panel}</View>
        </View>
      ) : null}
    </ThemeProvider>
  );
}

/* ───────── one conversation, with a pretend agent and pretend people ───────── */

function Room({ scenario, features }: { scenario: Scenario; features: ChatFeatures }) {
  const [messages, setMessages] = useState<ChatMessage[]>(scenario.seed);
  const [typing, setTyping] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [opened, setOpened] = useState<string | null>(null);
  const asked = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const stream = useRef<ReturnType<typeof setInterval> | null>(null);
  const later = (fn: () => void, ms: number) => timers.current.push(setTimeout(fn, ms));
  const patch = (id: string, p: Partial<ChatMessage>) => setMessages((all) => all.map((m) => (m.id === id ? { ...m, ...p } : m)));
  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
      if (stream.current) clearInterval(stream.current);
    },
    [],
  );

  const stop = useCallback(() => {
    if (stream.current) clearInterval(stream.current);
    stream.current = null;
    setBusy(false);
    setTyping([]);
    setMessages((all) => all.map((m) => (m.streaming ? { ...m, streaming: false, options: undefined, attachments: undefined } : m)));
  }, []);

  /** The agent's answer arrives word by word. */
  const agentAnswers = (question: string) => {
    const agent = scenario.agent!;
    const { text, options, attachments } = scenario.answer(question, asked.current++);
    setBusy(true);
    setTyping([agent.name]);
    later(() => {
      setTyping([]);
      const id = newId();
      const words = text.split(' ');
      let shown = 0;
      setMessages((all) => [...all, { id, author: agent, text: '', at: Date.now(), streaming: true, options, attachments }]);
      stream.current = setInterval(() => {
        shown += 2;
        patch(id, { text: words.slice(0, shown).join(' ') });
        if (shown >= words.length) {
          if (stream.current) clearInterval(stream.current);
          stream.current = null;
          patch(id, { streaming: false });
          setBusy(false);
        }
      }, 70);
    }, 900);
  };

  const send = (text: string, replyTo?: string) => {
    const id = newId();
    setMessages((all) => [...all, { id, author: ME, text, at: Date.now(), replyTo, status: 'sending' }]);
    later(() => patch(id, { status: /fail/i.test(text) ? 'failed' : 'sent' }), 500);
    const room = scenario.peers.length > 0;
    if (scenario.agent && (!room || /@pear/i.test(text))) agentAnswers(text);
    if (room) {
      // Someone reacts, someone answers.
      const peer = scenario.peers[Math.floor(Math.random() * scenario.peers.length)]!;
      later(() => patch(id, { reactions: { '👍': [peer.id] } }), 1400);
      later(() => setTyping((t) => [...t, peer.name]), 1800);
      later(() => {
        setTyping((t) => t.filter((n) => n !== peer.name));
        setMessages((all) => [...all, { id: newId(), author: peer, text: PEER_LINES[Math.floor(Math.random() * PEER_LINES.length)]!, at: Date.now(), replyTo: Math.random() < 0.4 ? id : undefined }]);
      }, 4200);
    }
  };

  const react = (id: string, emoji: string) =>
    setMessages((all) =>
      all.map((m) => {
        if (m.id !== id) return m;
        const who = m.reactions?.[emoji] ?? [];
        return { ...m, reactions: { ...m.reactions, [emoji]: who.includes(ME.id) ? who.filter((w) => w !== ME.id) : [...who, ME.id] } };
      }),
    );

  const choose = (id: string, optionId: string) => {
    const label = messages.find((m) => m.id === id)?.options?.find((o) => o.id === optionId)?.label;
    patch(id, { chosen: optionId });
    later(() => setMessages((all) => [...all, { id: newId(), author: scenario.agent!, text: `"${label}" it is. In the app this is where it would go into the New version slot, ready to propose.`, at: Date.now() }]), 500);
  };

  return (
    <View className="flex-1">
      <View className="flex-row items-center gap-2 border-b border-overlay/[0.06] px-3 py-2">
        <View className="flex-1">
          <Text variant="label" weight="bold" truncate>
            {scenario.subject}
          </Text>
          <Text variant="micro" tone="muted" truncate>
            {scenario.peers.length ? 'A room: people and an agent' : `One conversation with ${scenario.agent?.name ?? 'the agent'} about this item`}
          </Text>
        </View>
        <IconButton icon="refresh" size="sm" accessibilityLabel="Start over" onPress={() => { stop(); asked.current = 0; setMessages(scenario.seed()); }} />
      </View>
      <Chat
        messages={messages}
        me={ME}
        features={features}
        onSend={send}
        onReact={react}
        onChoose={choose}
        onAttach={() => send('📎 drawing-v3.svg')}
        onOpen={(a) => setOpened(a.name)}
        typing={typing}
        placeholder={scenario.placeholder}
        emptyText={scenario.emptyText}
        starters={scenario.starters}
        busy={busy}
        onStop={stop}
      />
      {/* The lab has nothing to open: it only shows that the press arrived. */}
      {opened ? (
        <Pressable onPress={() => setOpened(null)} className="absolute left-3 right-3 top-3 rounded-control border border-primary/50 bg-pane px-3 py-2">
          <Text variant="caption">The app would open "{opened}" here. Tap to close.</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

/* ───────── the switches ───────── */

function Switches({ scenario, features, set, dark, setDark, onClose }: { scenario: Scenario; features: ChatFeatures; set: (p: Partial<ChatFeatures>) => void; dark: boolean; setDark: (v: boolean) => void; onClose?: () => void }) {
  const [note, setNote] = useState('');
  const [sent, setSent] = useState<'no' | 'sending' | 'yes' | 'failed'>('no');
  const keys = (Object.keys(FEATURE_LABELS) as (keyof ChatFeatures)[]).filter((k) => k !== 'look' && k !== 'density');
  const submit = async () => {
    setSent('sending');
    try {
      const res = await fetch('/feedback', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ scenario: scenario.id, note: note.trim(), features, dark, screen: `${globalThis.innerWidth}x${globalThis.innerHeight}` }) });
      if (!res.ok) throw new Error(String(res.status));
      setSent('yes');
      setNote('');
    } catch {
      setSent('failed');
    }
  };
  return (
    <ScrollView className="flex-1" contentContainerStyle={{ padding: 14, gap: 14 }} keyboardShouldPersistTaps="handled">
      <View className="flex-row items-center">
        <View className="flex-1">
          <Text variant="body-lg">Switches</Text>
          <Text variant="micro" tone="muted">
            For {scenario.title}. Kept in this browser.
          </Text>
        </View>
        {onClose ? <Button size="sm" variant="secondary" label="Done" onPress={onClose} /> : null}
      </View>

      <View className="gap-1.5">
        <Text variant="micro" tone="subtle">
          START FROM
        </Text>
        <View className="flex-row gap-2">
          <Button size="sm" variant="secondary" label="Sidebar (minimal)" onPress={() => set(SIDEBAR)} />
          <Button size="sm" variant="secondary" label="Room (everything)" onPress={() => set(ROOM)} />
        </View>
      </View>

      <Pick label="Look" value={features.look} options={[['bubbles', 'Bubbles'], ['flat', 'Flat rows']]} onChange={(v) => set({ look: v })} />
      <Pick label="Density" value={features.density} options={[['compact', 'Compact'], ['comfortable', 'Comfortable']]} onChange={(v) => set({ density: v })} />
      <Pick label="Theme" value={dark ? 'dark' : 'light'} options={[['dark', 'Dark'], ['light', 'Light']]} onChange={(v) => setDark(v === 'dark')} />

      <View>
        {keys.map((k) => (
          <Pressable key={k} onPress={() => set({ [k]: !features[k] } as Partial<ChatFeatures>)} className="flex-row items-center gap-3 border-b border-overlay/[0.05] py-2.5" accessibilityRole="switch" accessibilityState={{ checked: !!features[k] }}>
            <Text variant="label" className="flex-1">
              {FEATURE_LABELS[k]}
            </Text>
            <View className={cn('h-6 w-10 justify-center rounded-full px-0.5', features[k] ? 'bg-primary' : 'bg-overlay/[0.14]')}>
              <View className={cn('h-5 w-5 rounded-full', features[k] ? 'self-end bg-primary-foreground' : 'self-start bg-foreground/80')} />
            </View>
          </Pressable>
        ))}
      </View>

      <View className="gap-2">
        <Text variant="micro" tone="subtle">
          NOTES FOR CLAUDE
        </Text>
        <TextInput
          value={note}
          onChangeText={(t) => { setNote(t); setSent('no'); }}
          placeholder="What should change? Sent with these switches."
          placeholderTextColor="#8a8794"
          multiline
          className="rounded-control border border-overlay/[0.10] bg-inset px-3 py-2 text-foreground"
          style={{ minHeight: 88, fontSize: 16, lineHeight: 21 }}
        />
        <View className="flex-row items-center gap-3">
          <Button size="sm" variant="primary" label={sent === 'sending' ? 'Sending…' : 'Send to Claude'} disabled={sent === 'sending'} onPress={submit} />
          <Text variant="micro" tone={sent === 'failed' ? 'danger' : 'muted'}>
            {sent === 'yes' ? 'Saved on the Mac.' : sent === 'failed' ? 'Could not reach the Mac.' : ''}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

function Pick<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: [T, string][]; onChange: (v: T) => void }) {
  return (
    <View className="flex-row items-center gap-3">
      <Text variant="label" className="flex-1">
        {label}
      </Text>
      <View className="flex-row gap-1">
        {options.map(([v, text]) => (
          <Button key={v} size="sm" variant={v === value ? 'secondary' : 'ghost'} label={text} onPress={() => onChange(v)} />
        ))}
      </View>
    </View>
  );
}
