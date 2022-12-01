"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[7339],{81426:function(d,o,e){e.r(o);var u=e(2143),c=e(50250),h=e(59378),m=e(78190),p=e(74775),i=e(5937),Z=e(2068),f=e(74399),v=e(46004),x=e(35708),A=e(30138),k=e(56140),a=e(5388),P=e(49545),L=e(92169),E=e(13140),g=e(95127),O=e(74418),C=e(97119),l=e(28257),s=e(67294),n=e(13946);function r(){var _=(0,l.eL)(),t=_.texts;return(0,n.tZ)(l.dY,null,(0,n.tZ)(s.Fragment,null,(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("p",null,t[0].value),(0,n.tZ)("h2",{id:"when-to-use"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#when-to-use"},(0,n.tZ)("span",{className:"icon icon-link"})),"When To Use"),(0,n.tZ)("p",null,t[1].value),(0,n.tZ)("blockquote",null,(0,n.tZ)("p",null,t[2].value),(0,n.tZ)("p",null,t[3].value,(0,n.tZ)("code",null,t[4].value),t[5].value,(0,n.tZ)("code",null,t[6].value),t[7].value)),(0,n.tZ)("h2",{id:"examples"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#examples"},(0,n.tZ)("span",{className:"icon icon-link"})),"Examples")),(0,n.tZ)(a.Z,{items:[{demo:{id:"components-anchor-demo-basic"},previewerProps:{title:"Basic",filename:"components/anchor/demo/basic.tsx",jsx:`import React from 'react';
import { Anchor } from 'antd';
const { Link } = Anchor;
const App = () => (
  <Anchor>
    <Link href="#components-anchor-demo-basic" title="Basic demo" />
    <Link href="#components-anchor-demo-static" title="Static demo" />
    <Link href="#api" title="API">
      <Link href="#anchor-props" title="Anchor Props" />
      <Link href="#link-props" title="Link Props" />
    </Link>
  </Anchor>
);
export default App;
`,description:"<p>The simplest usage.</p>",style:`.code-box-demo .ant-affix {
  z-index: 11;
}`}},{demo:{id:"components-anchor-demo-static"},previewerProps:{title:"Static Anchor",filename:"components/anchor/demo/static.tsx",jsx:`import React from 'react';
import { Anchor } from 'antd';
const { Link } = Anchor;
const App = () => (
  <Anchor affix={false}>
    <Link href="#components-anchor-demo-basic" title="Basic demo" />
    <Link href="#components-anchor-demo-static" title="Static demo" />
    <Link href="#api" title="API">
      <Link href="#anchor-props" title="Anchor Props" />
      <Link href="#link-props" title="Link Props" />
    </Link>
  </Anchor>
);
export default App;
`,description:"<p>Do not change state when page is scrolling.</p>"}},{demo:{id:"components-anchor-demo-onclick"},previewerProps:{title:"Customize the onClick event",filename:"components/anchor/demo/onClick.tsx",jsx:`import React from 'react';
import { Anchor } from 'antd';
const { Link } = Anchor;
const handleClick = (e, link) => {
  e.preventDefault();
  console.log(link);
};
const App = () => (
  <Anchor affix={false} onClick={handleClick}>
    <Link href="#components-anchor-demo-basic" title="Basic demo" />
    <Link href="#components-anchor-demo-static" title="Static demo" />
    <Link href="#api" title="API">
      <Link href="#anchor-props" title="Anchor Props" />
      <Link href="#link-props" title="Link Props" />
    </Link>
  </Anchor>
);
export default App;
`,description:"<p>Clicking on an anchor does not record history.</p>"}},{demo:{id:"components-anchor-demo-customizehighlight"},previewerProps:{title:"Customize the anchor highlight",filename:"components/anchor/demo/customizeHighlight.tsx",jsx:`import React from 'react';
import { Anchor } from 'antd';
const { Link } = Anchor;
const getCurrentAnchor = () => '#components-anchor-demo-static';
const App = () => (
  <Anchor affix={false} getCurrentAnchor={getCurrentAnchor}>
    <Link href="#components-anchor-demo-basic" title="Basic demo" />
    <Link href="#components-anchor-demo-static" title="Static demo" />
    <Link href="#api" title="API">
      <Link href="#anchor-props" title="Anchor Props" />
      <Link href="#link-props" title="Link Props" />
    </Link>
  </Anchor>
);
export default App;
`,description:"<p>Customize the anchor highlight.</p>"}},{demo:{id:"components-anchor-demo-targetoffset"},previewerProps:{title:"Set Anchor scroll offset",filename:"components/anchor/demo/targetOffset.tsx",jsx:`import React, { useEffect, useState } from 'react';
import { Anchor } from 'antd';
const { Link } = Anchor;
const App = () => {
  const [targetOffset, setTargetOffset] = useState(undefined);
  useEffect(() => {
    setTargetOffset(window.innerHeight / 2);
  }, []);
  return (
    <Anchor targetOffset={targetOffset}>
      <Link href="#components-anchor-demo-basic" title="Basic demo" />
      <Link href="#components-anchor-demo-static" title="Static demo" />
      <Link href="#api" title="API">
        <Link href="#anchor-props" title="Anchor Props" />
        <Link href="#link-props" title="Link Props" />
      </Link>
    </Anchor>
  );
};
export default App;
`,description:"<p>Anchor target scroll to screen center.</p>"}},{demo:{id:"components-anchor-demo-onchange"},previewerProps:{title:"Listening for anchor link change",filename:"components/anchor/demo/onChange.tsx",jsx:`import React from 'react';
import { Anchor } from 'antd';
const { Link } = Anchor;
const onChange = (link) => {
  console.log('Anchor:OnChange', link);
};
const App = () => (
  <Anchor affix={false} onChange={onChange}>
    <Link href="#components-anchor-demo-basic" title="Basic demo" />
    <Link href="#components-anchor-demo-static" title="Static demo" />
    <Link href="#api" title="API">
      <Link href="#anchor-props" title="Anchor Props" />
      <Link href="#link-props" title="Link Props" />
    </Link>
  </Anchor>
);
export default App;
`,description:"<p>Listening for anchor link change.</p>"}}]}),(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("h2",{id:"api"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,n.tZ)("span",{className:"icon icon-link"})),"API"),(0,n.tZ)("h3",{id:"anchor-props"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#anchor-props"},(0,n.tZ)("span",{className:"icon icon-link"})),"Anchor Props"),(0,n.tZ)(i.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,t[8].value),(0,n.tZ)("th",null,t[9].value),(0,n.tZ)("th",null,t[10].value),(0,n.tZ)("th",null,t[11].value),(0,n.tZ)("th",null,t[12].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[13].value),(0,n.tZ)("td",null,t[14].value),(0,n.tZ)("td",null,t[15].value),(0,n.tZ)("td",null,t[16].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[17].value),(0,n.tZ)("td",null,t[18].value),(0,n.tZ)("td",null,t[19].value),(0,n.tZ)("td",null,t[20].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[21].value),(0,n.tZ)("td",null,t[22].value),(0,n.tZ)("td",null,t[23].value),(0,n.tZ)("td",null,t[24].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[25].value),(0,n.tZ)("td",null,t[26].value),(0,n.tZ)("td",null,t[27].value),(0,n.tZ)("td",null,t[28].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[29].value),(0,n.tZ)("td",null,t[30].value),(0,n.tZ)("td",null,t[31].value),(0,n.tZ)("td",null,t[32].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[33].value),(0,n.tZ)("td",null,t[34].value,(0,n.tZ)("code",null,t[35].value)),(0,n.tZ)("td",null,t[36].value),(0,n.tZ)("td",null,t[37].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[38].value),(0,n.tZ)("td",null,t[39].value,(0,n.tZ)("code",null,t[40].value),t[41].value,(0,n.tZ)(l.rU,{to:"#components-anchor-demo-targetOffset"},t[42].value)),(0,n.tZ)("td",null,t[43].value),(0,n.tZ)("td",null,t[44].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[45].value),(0,n.tZ)("td",null,t[46].value),(0,n.tZ)("td",null,t[47].value),(0,n.tZ)("td",null),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[48].value),(0,n.tZ)("td",null,t[49].value,(0,n.tZ)("code",null,t[50].value),t[51].value),(0,n.tZ)("td",null,t[52].value),(0,n.tZ)("td",null,t[53].value),(0,n.tZ)("td",null)))),(0,n.tZ)("h3",{id:"link-props"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#link-props"},(0,n.tZ)("span",{className:"icon icon-link"})),"Link Props"),(0,n.tZ)(i.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,t[54].value),(0,n.tZ)("th",null,t[55].value),(0,n.tZ)("th",null,t[56].value),(0,n.tZ)("th",null,t[57].value),(0,n.tZ)("th",null,t[58].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[59].value),(0,n.tZ)("td",null,t[60].value),(0,n.tZ)("td",null,t[61].value),(0,n.tZ)("td",null),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[62].value),(0,n.tZ)("td",null,t[63].value),(0,n.tZ)("td",null,t[64].value),(0,n.tZ)("td",null),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[65].value),(0,n.tZ)("td",null,t[66].value),(0,n.tZ)("td",null,t[67].value),(0,n.tZ)("td",null),(0,n.tZ)("td",null)))))))}o.default=r}}]);
