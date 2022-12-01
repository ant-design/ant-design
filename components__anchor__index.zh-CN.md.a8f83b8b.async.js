"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[7610],{91264:function(d,o,e){e.r(o);var u=e(2143),c=e(50250),m=e(59378),p=e(78190),h=e(74775),a=e(5937),Z=e(2068),f=e(74399),v=e(46004),x=e(35708),A=e(30138),k=e(56140),i=e(5388),P=e(49545),E=e(92169),L=e(13140),O=e(95127),D=e(74418),g=e(97119),l=e(28257),s=e(67294),n=e(13946);function r(){var _=(0,l.eL)(),t=_.texts;return(0,n.tZ)(l.dY,null,(0,n.tZ)(s.Fragment,null,(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("p",null,t[0].value),(0,n.tZ)("h2",{id:"\u4F55\u65F6\u4F7F\u7528"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F55\u65F6\u4F7F\u7528"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4F55\u65F6\u4F7F\u7528"),(0,n.tZ)("p",null,t[1].value),(0,n.tZ)("blockquote",null,(0,n.tZ)("p",null,t[2].value),(0,n.tZ)("p",null,t[3].value,(0,n.tZ)("code",null,t[4].value),t[5].value,(0,n.tZ)("code",null,t[6].value),t[7].value)),(0,n.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,n.tZ)(i.Z,{items:[{demo:{id:"components-anchor-demo-basic"},previewerProps:{title:"\u57FA\u672C",filename:"components/anchor/demo/basic.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u6700\u7B80\u5355\u7684\u7528\u6CD5\u3002</p>",style:`.code-box-demo .ant-affix {
  z-index: 11;
}`}},{demo:{id:"components-anchor-demo-static"},previewerProps:{title:"\u9759\u6001\u4F4D\u7F6E",filename:"components/anchor/demo/static.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u4E0D\u6D6E\u52A8\uFF0C\u72B6\u6001\u4E0D\u968F\u9875\u9762\u6EDA\u52A8\u53D8\u5316\u3002</p>"}},{demo:{id:"components-anchor-demo-onclick"},previewerProps:{title:"\u81EA\u5B9A\u4E49 onClick \u4E8B\u4EF6",filename:"components/anchor/demo/onClick.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u70B9\u51FB\u951A\u70B9\u4E0D\u8BB0\u5F55\u5386\u53F2\u3002</p>"}},{demo:{id:"components-anchor-demo-customizehighlight"},previewerProps:{title:"\u81EA\u5B9A\u4E49\u951A\u70B9\u9AD8\u4EAE",filename:"components/anchor/demo/customizeHighlight.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u81EA\u5B9A\u4E49\u951A\u70B9\u9AD8\u4EAE\u3002</p>"}},{demo:{id:"components-anchor-demo-targetoffset"},previewerProps:{title:"\u8BBE\u7F6E\u951A\u70B9\u6EDA\u52A8\u504F\u79FB\u91CF",filename:"components/anchor/demo/targetOffset.tsx",jsx:`import React, { useEffect, useState } from 'react';
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
`,description:"<p>\u951A\u70B9\u76EE\u6807\u6EDA\u52A8\u5230\u5C4F\u5E55\u6B63\u4E2D\u95F4\u3002</p>"}},{demo:{id:"components-anchor-demo-onchange"},previewerProps:{title:"\u76D1\u542C\u951A\u70B9\u94FE\u63A5\u6539\u53D8",filename:"components/anchor/demo/onChange.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u76D1\u542C\u951A\u70B9\u94FE\u63A5\u6539\u53D8</p>"}}]}),(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("h2",{id:"api"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,n.tZ)("span",{className:"icon icon-link"})),"API"),(0,n.tZ)("h3",{id:"anchor-props"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#anchor-props"},(0,n.tZ)("span",{className:"icon icon-link"})),"Anchor Props"),(0,n.tZ)(a.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,t[8].value),(0,n.tZ)("th",null,t[9].value),(0,n.tZ)("th",null,t[10].value),(0,n.tZ)("th",null,t[11].value),(0,n.tZ)("th",null,t[12].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[13].value),(0,n.tZ)("td",null,t[14].value),(0,n.tZ)("td",null,t[15].value),(0,n.tZ)("td",null,t[16].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[17].value),(0,n.tZ)("td",null,t[18].value),(0,n.tZ)("td",null,t[19].value),(0,n.tZ)("td",null,t[20].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[21].value),(0,n.tZ)("td",null,t[22].value),(0,n.tZ)("td",null,t[23].value),(0,n.tZ)("td",null,t[24].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[25].value),(0,n.tZ)("td",null,t[26].value),(0,n.tZ)("td",null,t[27].value),(0,n.tZ)("td",null,t[28].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[29].value),(0,n.tZ)("td",null,t[30].value),(0,n.tZ)("td",null,t[31].value),(0,n.tZ)("td",null),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[32].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[33].value),t[34].value),(0,n.tZ)("td",null,t[35].value),(0,n.tZ)("td",null,t[36].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[37].value),(0,n.tZ)("td",null,t[38].value,(0,n.tZ)(l.rU,{to:"#components-anchor-demo-targetOffset"},t[39].value)),(0,n.tZ)("td",null,t[40].value),(0,n.tZ)("td",null,t[41].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[42].value),(0,n.tZ)("td",null,t[43].value),(0,n.tZ)("td",null,t[44].value),(0,n.tZ)("td",null,t[45].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[46].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[47].value),t[48].value),(0,n.tZ)("td",null,t[49].value),(0,n.tZ)("td",null,t[50].value),(0,n.tZ)("td",null)))),(0,n.tZ)("h3",{id:"link-props"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#link-props"},(0,n.tZ)("span",{className:"icon icon-link"})),"Link Props"),(0,n.tZ)(a.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,t[51].value),(0,n.tZ)("th",null,t[52].value),(0,n.tZ)("th",null,t[53].value),(0,n.tZ)("th",null,t[54].value),(0,n.tZ)("th",null,t[55].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[56].value),(0,n.tZ)("td",null,t[57].value),(0,n.tZ)("td",null,t[58].value),(0,n.tZ)("td",null,t[59].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[60].value),(0,n.tZ)("td",null,t[61].value),(0,n.tZ)("td",null,t[62].value),(0,n.tZ)("td",null,t[63].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[64].value),(0,n.tZ)("td",null,t[65].value),(0,n.tZ)("td",null,t[66].value),(0,n.tZ)("td",null,t[67].value),(0,n.tZ)("td",null)))))))}o.default=r}}]);
