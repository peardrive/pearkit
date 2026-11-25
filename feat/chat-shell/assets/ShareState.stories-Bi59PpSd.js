import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{t}from"./react-BWPDF9mI.js";import{n,t as r}from"./Text-CPaIl-yS.js";import{a as i,u as a,z as o}from"./iframe-DCe4DXPm.js";import{n as s,t as c}from"./ProgressBar-bCkZ5JHr.js";import{i as l,n as u,r as d,t as f}from"./ShareProgressBar-Bu2FP8b_.js";import{i as p,t as m}from"./helpers-zAnan5Dk.js";var h,g,_,v,y,b,x;function S(){return(S=e((()=>{t(),a(),n(),s(),p(),u(),l(),h=i(),g={title:`Components/ShareState`,parameters:{layout:`padded`,docs:{description:{component:`The universal states of a share: one word, one colour and one bar for each, the same in
every app and every layout.`}}}},_={good:`#a6ce39`,busy:`#fbbf24`,plain:`#9ca3af`,bad:`#ef4444`},v=[[`The files are here and available`,{kind:`active`}],[`Someone is taking the file from you`,{kind:`sharing`,percent:12}],[`The file is arriving`,{kind:`downloading`,percent:48}],[`The sender was found; about to move`,{kind:`starting`,percent:23}],[`Nobody to download from yet; carries on by itself`,{kind:`waiting`,percent:23}],[`You paused it; it never restarts by itself`,{kind:`paused`,percent:23}],[`Switched off`,{kind:`inactive`}],[`The list is here and nothing is asked for yet`,{kind:`choose`}],[`It cannot carry on without you`,{kind:`attention`,note:`Not enough space`}]],y={render:()=>(0,h.jsx)(m,{width:560,children:v.map(([e,t])=>{let n=d(t);return(0,h.jsxs)(o,{style:{gap:6,opacity:n.dim?.55:1},children:[(0,h.jsxs)(o,{style:{flexDirection:`row`,justifyContent:`space-between`,gap:24},children:[(0,h.jsx)(r,{variant:`caption`,children:e}),(0,h.jsx)(r,{style:{color:_[n.tone],fontWeight:`600`},children:n.label})]}),n.bar?(0,h.jsx)(f,{value:n.bar.value,look:n.bar.look}):null]},e)})})},b={render:()=>(0,h.jsxs)(m,{width:420,children:[(0,h.jsxs)(o,{style:{gap:8},children:[(0,h.jsx)(r,{variant:`caption`,children:`ProgressBar (official)`}),(0,h.jsx)(c,{value:.48})]}),(0,h.jsxs)(o,{style:{gap:8},children:[(0,h.jsx)(r,{variant:`caption`,children:`ShareProgressBar, moving`}),(0,h.jsx)(f,{value:.48,look:`moving`})]}),(0,h.jsxs)(o,{style:{gap:8},children:[(0,h.jsx)(r,{variant:`caption`,children:`ShareProgressBar, holding (waiting)`}),(0,h.jsx)(f,{value:.48,look:`holding`})]}),(0,h.jsxs)(o,{style:{gap:8},children:[(0,h.jsx)(r,{variant:`caption`,children:`ShareProgressBar, stopped (paused)`}),(0,h.jsx)(f,{value:.48,look:`stopped`})]})]})},x=[`EveryState`,`BesideTheOfficialBar`],y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <Column width={560}>
      {STATES.map(([what, input]) => {
      const view = describeShareState(input);
      return <View key={what} style={{
        gap: 6,
        opacity: view.dim ? 0.55 : 1
      }}>
            <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 24
        }}>
              <Text variant="caption">{what}</Text>
              <Text style={{
            color: TONE[view.tone],
            fontWeight: '600'
          }}>{view.label}</Text>
            </View>
            {view.bar ? <ShareProgressBar value={view.bar.value} look={view.bar.look} /> : null}
          </View>;
    })}
    </Column>
}`,...y.parameters?.docs?.source},description:{story:`Every state: what it means, the line a row shows, and its bar.`,...y.parameters?.docs?.description}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <Column width={420}>
      <View style={{
      gap: 8
    }}>
        <Text variant="caption">ProgressBar (official)</Text>
        <ProgressBar value={0.48} />
      </View>
      <View style={{
      gap: 8
    }}>
        <Text variant="caption">ShareProgressBar, moving</Text>
        <ShareProgressBar value={0.48} look="moving" />
      </View>
      <View style={{
      gap: 8
    }}>
        <Text variant="caption">ShareProgressBar, holding (waiting)</Text>
        <ShareProgressBar value={0.48} look="holding" />
      </View>
      <View style={{
      gap: 8
    }}>
        <Text variant="caption">ShareProgressBar, stopped (paused)</Text>
        <ShareProgressBar value={0.48} look="stopped" />
      </View>
    </Column>
}`,...b.parameters?.docs?.source},description:{story:"The moving bar beside Pearkit's own `ProgressBar`: the same track, radius and gradient.",...b.parameters?.docs?.description}}}})))()}S();export{b as BesideTheOfficialBar,y as EveryState,x as __namedExportsOrder,g as default};