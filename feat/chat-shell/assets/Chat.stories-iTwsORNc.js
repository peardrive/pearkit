import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{t}from"./react-BWPDF9mI.js";import{n,t as r}from"./Text-CPaIl-yS.js";import{a as i,u as a,z as o}from"./iframe-DCe4DXPm.js";import{n as s,t as c}from"./Button-DbkpAyom.js";import{n as l,t as u}from"./EmptyState-ByOKcMN9.js";import{n as d,o as f,r as p}from"./EmojiPicker-CX4iYXyB.js";import{i as m,n as h,r as g,t as _}from"./MessageList-JnPzEIp-.js";import{n as v,t as y}from"./Composer-DbE-USt_.js";import{i as b,n as x,t as S}from"./helpers-zAnan5Dk.js";function C({compact:e,replyTo:t,disabled:n}){let[r,i]=(0,w.useState)(``),[a,o]=(0,w.useState)(!1),[s,c]=(0,w.useState)(t??null);return(0,T.jsx)(y,{value:r,onChangeText:i,compact:e,disabled:n,sending:a,replyTo:s,onCancelReply:()=>c(null),onAttach:E(),onSend:()=>{o(!0),setTimeout(()=>{o(!1),i(``),c(null)},600)}})}var w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y;function X(){return(X=e((()=>{w=t(),a(),v(),h(),m(),s(),p(),l(),n(),b(),T=i(),{fn:E}=__STORYBOOK_MODULE_TEST__,D={id:`me`,name:`Guy`},O={id:`ana`,name:`Ana`},k={id:`tomas`,name:`Tomás`},A={id:`pear`,name:`Pear`,agent:!0},j={id:`system`,name:``},M=6e4,N=Date.now(),P=N-1560*M,F=N-40*M,I=`data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22264%22%20height%3D%22168%22%3E%3Crect%20width%3D%22264%22%20height%3D%22168%22%20fill%3D%22%2310151a%22%2F%3E%3Crect%20x%3D%2272%22%20y%3D%2262%22%20width%3D%22120%22%20height%3D%2244%22%20rx%3D%2210%22%20fill%3D%22%2358c47a%22%2F%3E%3C%2Fsvg%3E`,L=[{id:`r0`,author:j,text:`Ana added Tomás to the room`,ts:P-M,system:!0},{id:`r1`,author:O,text:`New drag bar is in the library. Bolder, 75% of the gap.`,ts:P,reactions:[{emoji:`🎉`,count:2,mine:!0}]},{id:`r2`,author:k,text:`Tried it on the tablet, the grab area is finally big enough.`,ts:P+2*M},{id:`r3`,author:k,text:`One thing: it disappears on the light theme.`,ts:P+2.4*M,reactions:[{emoji:`👀`,count:1}]},{id:`r4`,author:D,text:`Good catch. It should use the overlay colour, not white.`,ts:P+6*M,re:[`r3`]},{id:`r5`,author:O,text:`Morning. Chat pieces today?`,ts:F},{id:`r6`,author:D,text:`Yes. One set for the sidebar chats and for rooms like this one.`,ts:F+M},{id:`r7`,author:D,text:`Same messages, same composer. The sidebar just switches most of it off.`,ts:F+1.3*M,reactions:[{emoji:`👍`,count:1}]},{id:`r8`,author:O,text:`Here is the mock and the recording from the tablet.`,ts:F+4*M,attachments:[{name:`drag-bar.png`,size:184e3,url:I,kind:`image`},{name:`tablet-run.mov`,size:423e5}]},{id:`r9`,author:k,text:`never mind, wrong room`,ts:F+5*M,redacted:!0},{id:`r10`,author:A,text:`I can keep a summary of this room pinned at the top if that helps. Say "@Pear summarize".`,ts:F+6*M},{id:`r12`,author:A,text:`**So far**

- The new drag bar shipped: \`ResizeHandle\`, 75% of the gap
- It vanishes on the light theme; Guy moves it to the *overlay* colour

To check it:

\`\`\`sh
npm run storybook
\`\`\`

More in [the handle's story](https://peardrive.github.io/pearkit).`,ts:F+7*M},{id:`r11`,author:D,text:`@Pear summarize`,ts:N-5e3,pending:!0}],R=[`Makes sense.`,`Can you show it on the phone width too?`,`I like the compact one for sidebars.`,`Replies need to show who is being answered.`,`ok, trying it now`,`That works for me 🍐`],z={title:`Components/Chat`,component:_,parameters:{docs:{description:{component:"The chat pieces for every app: `MessageList` (messages grouped by author within five minutes, a line per day, the agent's mark, system lines, struck redacted rows, lighter pending rows; stays at the newest message unless you scrolled up) and `Composer` (a growing pill field; Enter sends, Shift+Enter is a new line on a keyboard). Both are controlled: the app owns the messages and the text. `MessageRow` is one message on its own."}}},argTypes:{look:{control:`inline-radio`,options:[`bubbles`,`flat`]}},args:{messages:L,currentUserId:`me`,look:`bubbles`,compact:!1,showDays:!0,showTimes:!0,onReact:E(),onReply:E(),onOpenAttachment:E()}},B=(e=420,t=560)=>[n=>(0,T.jsx)(o,{className:`overflow-hidden rounded-card border border-overlay/[0.08] bg-background`,style:{width:e,height:t},children:(0,T.jsx)(n,{})})],V={decorators:B()},H={name:`Flat rows`,args:{look:`flat`},decorators:B()},U={name:`Compact, for a sidebar`,args:{compact:!0,showDays:!1},decorators:B(320)},W={args:{messages:[],emptyState:(0,T.jsx)(u,{icon:`message`,title:`Nothing here yet`,description:`Say hello, or drop a file in.`})},decorators:B()},G={name:`MessageRow variants`,render:()=>(0,T.jsxs)(S,{width:420,children:[(0,T.jsx)(x,{title:`A person, first and last of a group`,children:(0,T.jsx)(o,{className:`w-full`,children:(0,T.jsx)(g,{message:L[1],onReact:E(),onReply:E()})})}),(0,T.jsx)(x,{title:`Mine, answering`,children:(0,T.jsx)(o,{className:`w-full`,children:(0,T.jsx)(g,{message:L[4],mine:!0,quoted:[L[3]]})})}),(0,T.jsx)(x,{title:`An agent`,children:(0,T.jsx)(o,{className:`w-full`,children:(0,T.jsx)(g,{message:L[10]})})}),(0,T.jsx)(x,{title:`System, redacted, pending`,children:(0,T.jsxs)(o,{className:`w-full`,children:[(0,T.jsx)(g,{message:L[0]}),(0,T.jsx)(g,{message:L[9]}),(0,T.jsx)(g,{message:L[12],mine:!0})]})}),(0,T.jsx)(x,{title:`Markdown, in a bubble and flat`,children:(0,T.jsxs)(o,{className:`w-full`,children:[(0,T.jsx)(g,{message:L[11],onLinkPress:E()}),(0,T.jsx)(g,{message:{...L[11],id:`mine-md`,author:D},mine:!0,onLinkPress:E()}),(0,T.jsx)(g,{message:L[11],look:`flat`,onLinkPress:E()})]})}),(0,T.jsx)(x,{title:`Attachments`,children:(0,T.jsx)(o,{className:`w-full`,children:(0,T.jsx)(g,{message:L[8],onOpenAttachment:E()})})}),(0,T.jsx)(x,{title:`Flat`,children:(0,T.jsxs)(o,{className:`w-full`,children:[(0,T.jsx)(g,{message:L[1],look:`flat`}),(0,T.jsx)(g,{message:L[2],look:`flat`})]})})]})},K={name:`Composer`,render:()=>(0,T.jsxs)(S,{width:420,children:[(0,T.jsx)(x,{title:`Default`,children:(0,T.jsx)(o,{className:`w-full`,children:(0,T.jsx)(C,{})})}),(0,T.jsx)(x,{title:`Answering someone`,children:(0,T.jsx)(o,{className:`w-full`,children:(0,T.jsx)(C,{replyTo:{name:`Tomás`,text:`One thing: it disappears on the light theme.`}})})}),(0,T.jsx)(x,{title:`Compact`,children:(0,T.jsx)(o,{className:`w-full`,children:(0,T.jsx)(C,{compact:!0})})}),(0,T.jsx)(x,{title:`Disabled`,children:(0,T.jsx)(o,{className:`w-full`,children:(0,T.jsx)(C,{disabled:!0})})})]})},q={name:`Mixed conversation, bubbles`,decorators:B(),render:()=>{let[e,t]=(0,w.useState)(L.slice(0,12)),[n,i]=(0,w.useState)(``),[a,s]=(0,w.useState)(null),[l,u]=(0,w.useState)(null),[p,m]=(0,w.useState)(null),[h,g]=(0,w.useState)([`🍐`,`✅`]),v=a?e.find(e=>e.id===a):void 0,b=()=>{let e=`m${Date.now()}`;t(t=>[...t,{id:e,author:D,text:(l?`> ${l}\n\n`:``)+n.trim(),ts:Date.now(),re:a?[a]:void 0,pending:!0}]),i(``),s(null),u(null),setTimeout(()=>t(t=>t.map(t=>t.id===e?{...t,pending:!1}:t)),700),setTimeout(()=>t(t=>[...t,{id:`${e}a`,author:O,text:`Makes sense.`,ts:Date.now()}]),2200)},x=(e,n)=>t(t=>t.map(t=>{if(t.id!==e)return t;let r=t.reactions?.find(e=>e.emoji===n),i=(t.reactions??[]).filter(e=>e.emoji!==n),a=r?r.mine?{...r,count:r.count-1,mine:!1}:{...r,count:r.count+1,mine:!0}:{emoji:n,count:1,mine:!0};return{...t,reactions:[...i,a]}}));return(0,T.jsxs)(T.Fragment,{children:[(0,T.jsxs)(o,{className:`flex-row items-center gap-2 border-b border-overlay/[0.06] px-3 py-2`,children:[(0,T.jsxs)(o,{className:`flex-1`,children:[(0,T.jsx)(r,{variant:`label`,weight:`bold`,truncate:!0,children:`Pearkit crew · 4 people`}),(0,T.jsx)(r,{variant:`micro`,tone:`muted`,truncate:!0,children:`A room: people and an agent`})]}),(0,T.jsx)(c,{size:`sm`,variant:`ghost`,icon:`refresh`,accessibilityLabel:`Start over`,onPress:()=>t(L.slice(0,12))})]}),(0,T.jsx)(_,{messages:e,currentUserId:`me`,onReact:x,onReply:e=>{s(e),u(null)},onReplyToSelection:(e,t)=>{s(e.id),u(t)},onMore:m,quickReactions:[...h,...[`👍`,`❤️`,`😂`,`🎉`,`🤔`,`👀`].filter(e=>!h.includes(e))].slice(0,6),onOpenAttachment:E()}),(0,T.jsx)(y,{value:n,onChangeText:i,onSend:b,onAttach:E(),replyTo:v?{name:v.author.name,text:l??v.text}:null,onCancelReply:()=>{s(null),u(null)},placeholder:`Message Pearkit crew`}),(0,T.jsx)(d,{open:!!p,onClose:()=>m(null),recent:h,onPick:e=>{p&&x(p.id,e),g(t=>f(t,e))}})]})}},J={name:`Older history`,decorators:B(),render:()=>{let[e,t]=(0,w.useState)(L),[n,i]=(0,w.useState)(!1),[a,o]=(0,w.useState)(0),s=a>=3;return(0,T.jsx)(_,{messages:e,currentUserId:`me`,onReachTop:()=>{n||s||(i(!0),setTimeout(()=>{t(e=>{let t=e[0].ts;return[...Array.from({length:20},(e,n)=>({id:`old-${a}-${n}`,author:[O,k,D][n%3],text:`${R[n%R.length]} (${a*20+20-n} back)`,ts:t-(20-n)*7*M})),...e]}),o(e=>e+1),i(!1)},700))},loadingOlder:n,header:s?(0,T.jsx)(r,{variant:`micro`,tone:`subtle`,className:`py-2 text-center`,children:`The beginning of the room`}):null})}},Y=[`Playground`,`Flat`,`Compact`,`Empty`,`Rows`,`ComposerStory`,`Conversation`,`OlderHistory`],V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  decorators: framed()
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  name: 'Flat rows',
  args: {
    look: 'flat'
  },
  decorators: framed()
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  name: 'Compact, for a sidebar',
  args: {
    compact: true,
    showDays: false
  },
  decorators: framed(320)
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    messages: [],
    emptyState: <EmptyState icon="message" title="Nothing here yet" description="Say hello, or drop a file in." />
  },
  decorators: framed()
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  name: 'MessageRow variants',
  render: () => <Column width={420}>
      <Showcase title="A person, first and last of a group">
        <View className="w-full"><MessageRow message={ROOM[1]!} onReact={fn()} onReply={fn()} /></View>
      </Showcase>
      <Showcase title="Mine, answering">
        <View className="w-full"><MessageRow message={ROOM[4]!} mine quoted={[ROOM[3]!]} /></View>
      </Showcase>
      <Showcase title="An agent">
        <View className="w-full"><MessageRow message={ROOM[10]!} /></View>
      </Showcase>
      <Showcase title="System, redacted, pending">
        <View className="w-full">
          <MessageRow message={ROOM[0]!} />
          <MessageRow message={ROOM[9]!} />
          <MessageRow message={ROOM[12]!} mine />
        </View>
      </Showcase>
      <Showcase title="Markdown, in a bubble and flat">
        <View className="w-full">
          <MessageRow message={ROOM[11]!} onLinkPress={fn()} />
          <MessageRow message={{
          ...ROOM[11]!,
          id: 'mine-md',
          author: ME
        }} mine onLinkPress={fn()} />
          <MessageRow message={ROOM[11]!} look="flat" onLinkPress={fn()} />
        </View>
      </Showcase>
      <Showcase title="Attachments">
        <View className="w-full"><MessageRow message={ROOM[8]!} onOpenAttachment={fn()} /></View>
      </Showcase>
      <Showcase title="Flat">
        <View className="w-full"><MessageRow message={ROOM[1]!} look="flat" /><MessageRow message={ROOM[2]!} look="flat" /></View>
      </Showcase>
    </Column>
}`,...G.parameters?.docs?.source},description:{story:`Every kind of row, on its own.`,...G.parameters?.docs?.description}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  name: 'Composer',
  render: () => <Column width={420}>
      <Showcase title="Default"><View className="w-full"><ComposerDemo /></View></Showcase>
      <Showcase title="Answering someone"><View className="w-full"><ComposerDemo replyTo={{
          name: 'Tomás',
          text: 'One thing: it disappears on the light theme.'
        }} /></View></Showcase>
      <Showcase title="Compact"><View className="w-full"><ComposerDemo compact /></View></Showcase>
      <Showcase title="Disabled"><View className="w-full"><ComposerDemo disabled /></View></Showcase>
    </Column>
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  name: 'Mixed conversation, bubbles',
  decorators: framed(),
  render: () => {
    const [messages, setMessages] = useState<ChatMessage[]>(ROOM.slice(0, 12));
    const [value, setValue] = useState('');
    const [replyTo, setReplyTo] = useState<string | null>(null);
    const [quoteText, setQuoteText] = useState<string | null>(null);
    const [more, setMore] = useState<ChatMessage | null>(null);
    const [recent, setRecent] = useState<string[]>(['🍐', '✅']);
    const quoted = replyTo ? messages.find(m => m.id === replyTo) : undefined;
    const send = () => {
      const id = \`m\${Date.now()}\`;
      setMessages(all => [...all, {
        id,
        author: ME,
        text: (quoteText ? \`> \${quoteText}\\n\\n\` : '') + value.trim(),
        ts: Date.now(),
        re: replyTo ? [replyTo] : undefined,
        pending: true
      }]);
      setValue('');
      setReplyTo(null);
      setQuoteText(null);
      setTimeout(() => setMessages(all => all.map(m => m.id === id ? {
        ...m,
        pending: false
      } : m)), 700);
      setTimeout(() => setMessages(all => [...all, {
        id: \`\${id}a\`,
        author: ANA,
        text: 'Makes sense.',
        ts: Date.now()
      }]), 2200);
    };
    const react = (id: string, emoji: string) => setMessages(all => all.map(m => {
      if (m.id !== id) return m;
      const have = m.reactions?.find(r => r.emoji === emoji);
      const rest = (m.reactions ?? []).filter(r => r.emoji !== emoji);
      const next = have ? have.mine ? {
        ...have,
        count: have.count - 1,
        mine: false
      } : {
        ...have,
        count: have.count + 1,
        mine: true
      } : {
        emoji,
        count: 1,
        mine: true
      };
      return {
        ...m,
        reactions: [...rest, next]
      };
    }));
    return <>
        <View className="flex-row items-center gap-2 border-b border-overlay/[0.06] px-3 py-2">
          <View className="flex-1">
            <Text variant="label" weight="bold" truncate>Pearkit crew · 4 people</Text>
            <Text variant="micro" tone="muted" truncate>A room: people and an agent</Text>
          </View>
          <Button size="sm" variant="ghost" icon="refresh" accessibilityLabel="Start over" onPress={() => setMessages(ROOM.slice(0, 12))} />
        </View>
        <MessageList messages={messages} currentUserId="me" onReact={react} onReply={id => {
        setReplyTo(id);
        setQuoteText(null);
      }} onReplyToSelection={(m, text) => {
        setReplyTo(m.id);
        setQuoteText(text);
      }} onMore={setMore} quickReactions={[...recent, ...['👍', '❤️', '😂', '🎉', '🤔', '👀'].filter(e => !recent.includes(e))].slice(0, 6)} onOpenAttachment={fn()} />
        <Composer value={value} onChangeText={setValue} onSend={send} onAttach={fn()} replyTo={quoted ? {
        name: quoted.author.name,
        text: quoteText ?? quoted.text
      } : null} onCancelReply={() => {
        setReplyTo(null);
        setQuoteText(null);
      }} placeholder="Message Pearkit crew" />
        <EmojiPicker open={!!more} onClose={() => setMore(null)} recent={recent} onPick={e => {
        if (more) react(more.id, e);
        setRecent(r => pushRecent(r, e));
      }} />
      </>;
  }
}`,...q.parameters?.docs?.source},description:{story:`A mixed conversation in bubbles, the list and the composer together, with the messages owned by the page around
them. Press a message for its action row (the quick emoji, + for the full list, reply, copy); on the web, select
words inside a message for "Reply to this".`,...q.parameters?.docs?.description}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  name: 'Older history',
  decorators: framed(),
  render: () => {
    const [messages, setMessages] = useState<ChatMessage[]>(ROOM);
    const [loading, setLoading] = useState(false);
    const [pages, setPages] = useState(0);
    const done = pages >= 3;
    const loadOlder = () => {
      if (loading || done) return;
      setLoading(true);
      setTimeout(() => {
        setMessages(all => {
          const oldest = all[0]!.ts;
          const older = Array.from({
            length: 20
          }, (_, i) => ({
            id: \`old-\${pages}-\${i}\`,
            author: [ANA, TOMAS, ME][i % 3]!,
            text: \`\${LINES[i % LINES.length]} (\${pages * 20 + 20 - i} back)\`,
            ts: oldest - (20 - i) * 7 * min
          }));
          return [...older, ...all];
        });
        setPages(p => p + 1);
        setLoading(false);
      }, 700);
    };
    return <MessageList messages={messages} currentUserId="me" onReachTop={loadOlder} loadingOlder={loading} header={done ? <Text variant="micro" tone="subtle" className="py-2 text-center">The beginning of the room</Text> : null} />;
  }
}`,...J.parameters?.docs?.source},description:{story:`Scroll to the top: a page of twenty older messages is put in front, and the view stays where it was.`,...J.parameters?.docs?.description}}}})))()}X();export{U as Compact,K as ComposerStory,q as Conversation,W as Empty,H as Flat,J as OlderHistory,V as Playground,G as Rows,Y as __namedExportsOrder,z as default};