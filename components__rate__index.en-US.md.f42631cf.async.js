"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[6669],{65147:function(r,n,l){l.r(n);var i=l(2143),m=l(50250),Z=l(59378),p=l(78190),c=l(74775),a=l(5937),v=l(2068),x=l(74399),h=l(46004),E=l(35708),f=l(30138),P=l(56140),d=l(5388),O=l(49545),R=l(92169),M=l(13140),D=l(95127),A=l(74418),W=l(97119),u=l(28257),s=l(67294),t=l(13946);function _(){var o=(0,u.eL)(),e=o.texts;return(0,t.tZ)(u.dY,null,(0,t.tZ)(s.Fragment,null,(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("p",null,e[0].value),(0,t.tZ)("h2",{id:"when-to-use"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#when-to-use"},(0,t.tZ)("span",{className:"icon icon-link"})),"When To Use"),(0,t.tZ)("ul",null,(0,t.tZ)("li",null,e[1].value),(0,t.tZ)("li",null,e[2].value)),(0,t.tZ)("h2",{id:"examples"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#examples"},(0,t.tZ)("span",{className:"icon icon-link"})),"Examples")),(0,t.tZ)(d.Z,{items:[{demo:{id:"components-rate-demo-basic"},previewerProps:{title:"Basic",filename:"components/rate/demo/basic.tsx",jsx:`import React from 'react';
import { Rate } from 'antd';
const App = () => <Rate />;
export default App;
`,description:"<p>The simplest usage.</p>"}},{demo:{id:"components-rate-demo-half"},previewerProps:{title:"Half star",filename:"components/rate/demo/half.tsx",jsx:`import React from 'react';
import { Rate } from 'antd';
const App = () => <Rate allowHalf defaultValue={2.5} />;
export default App;
`,description:"<p>Support select half star.</p>"}},{demo:{id:"components-rate-demo-text"},previewerProps:{title:"Show copywriting",filename:"components/rate/demo/text.tsx",jsx:`import React, { useState } from 'react';
import { Rate } from 'antd';
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
const App = () => {
  const [value, setValue] = useState(3);
  return (
    <span>
      <Rate tooltips={desc} onChange={setValue} value={value} />
      {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
    </span>
  );
};
export default App;
`,description:"<p>Add copywriting in rate components.</p>"}},{demo:{id:"components-rate-demo-disabled"},previewerProps:{title:"Read only",filename:"components/rate/demo/disabled.tsx",jsx:`import React from 'react';
import { Rate } from 'antd';
const App = () => <Rate disabled defaultValue={2} />;
export default App;
`,description:"<p>Read only, can't use mouse to interact.</p>"}},{demo:{id:"components-rate-demo-clear"},previewerProps:{title:"Clear star",filename:"components/rate/demo/clear.tsx",jsx:`import React from 'react';
import { Rate } from 'antd';
const App = () => (
  <>
    <Rate defaultValue={3} />
    <span className="ant-rate-text">allowClear: true</span>
    <br />
    <Rate allowClear={false} defaultValue={3} />
    <span className="ant-rate-text">allowClear: false</span>
  </>
);
export default App;
`,description:"<p>Support set allow to clear star when click again.</p>"}},{demo:{id:"components-rate-demo-character"},previewerProps:{title:"Other Character",filename:"components/rate/demo/character.tsx",jsx:`import React from 'react';
import { HeartOutlined } from '@ant-design/icons';
import { Rate } from 'antd';
const App = () => (
  <>
    <Rate character={<HeartOutlined />} allowHalf />
    <br />
    <Rate
      character="A"
      allowHalf
      style={{
        fontSize: 36,
      }}
    />
    <br />
    <Rate character="\u597D" allowHalf />
  </>
);
export default App;
`,description:"<p>Replace the default star to other character like alphabet, digit, iconfont or even Chinese word.</p>"}},{demo:{id:"components-rate-demo-character-function"},previewerProps:{title:"Customize character",filename:"components/rate/demo/character-function.tsx",jsx:`import React from 'react';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { Rate } from 'antd';
const customIcons = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};
const App = () => (
  <>
    <Rate defaultValue={2} character={({ index }) => index + 1} />
    <br />
    <Rate defaultValue={3} character={({ index }) => customIcons[index + 1]} />
  </>
);
export default App;
`,description:"<p>Can customize each character using <code>(RateProps) => ReactNode</code>.</p>"}}]}),(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("h2",{id:"api"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,t.tZ)("span",{className:"icon icon-link"})),"API"),(0,t.tZ)(a.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,e[3].value),(0,t.tZ)("th",null,e[4].value),(0,t.tZ)("th",null,e[5].value),(0,t.tZ)("th",null,e[6].value),(0,t.tZ)("th",null,e[7].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[8].value),(0,t.tZ)("td",null,e[9].value),(0,t.tZ)("td",null,e[10].value),(0,t.tZ)("td",null,e[11].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[12].value),(0,t.tZ)("td",null,e[13].value),(0,t.tZ)("td",null,e[14].value),(0,t.tZ)("td",null,e[15].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[16].value),(0,t.tZ)("td",null,e[17].value),(0,t.tZ)("td",null,e[18].value),(0,t.tZ)("td",null,e[19].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[20].value),(0,t.tZ)("td",null,e[21].value),(0,t.tZ)("td",null,e[22].value),(0,t.tZ)("td",null,e[23].value),(0,t.tZ)("td",null,e[24].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[25].value),(0,t.tZ)("td",null,e[26].value),(0,t.tZ)("td",null,e[27].value),(0,t.tZ)("td",null,e[28].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[29].value),(0,t.tZ)("td",null,e[30].value),(0,t.tZ)("td",null,e[31].value),(0,t.tZ)("td",null,e[32].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[33].value),(0,t.tZ)("td",null,e[34].value),(0,t.tZ)("td",null,e[35].value),(0,t.tZ)("td",null,e[36].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[37].value),(0,t.tZ)("td",null,e[38].value),(0,t.tZ)("td",null,e[39].value),(0,t.tZ)("td",null,e[40].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[41].value),(0,t.tZ)("td",null,e[42].value),(0,t.tZ)("td",null,e[43].value),(0,t.tZ)("td",null,e[44].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[45].value),(0,t.tZ)("td",null,e[46].value),(0,t.tZ)("td",null,e[47].value),(0,t.tZ)("td",null,e[48].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[49].value),(0,t.tZ)("td",null,e[50].value),(0,t.tZ)("td",null,e[51].value),(0,t.tZ)("td",null,e[52].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[53].value),(0,t.tZ)("td",null,e[54].value),(0,t.tZ)("td",null,e[55].value),(0,t.tZ)("td",null,e[56].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[57].value),(0,t.tZ)("td",null,e[58].value),(0,t.tZ)("td",null,e[59].value),(0,t.tZ)("td",null,e[60].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[61].value),(0,t.tZ)("td",null,e[62].value),(0,t.tZ)("td",null,e[63].value),(0,t.tZ)("td",null,e[64].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[65].value),(0,t.tZ)("td",null,e[66].value),(0,t.tZ)("td",null,e[67].value),(0,t.tZ)("td",null,e[68].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[69].value),(0,t.tZ)("td",null,e[70].value),(0,t.tZ)("td",null,e[71].value),(0,t.tZ)("td",null,e[72].value),(0,t.tZ)("td",null)))),(0,t.tZ)("h2",{id:"methods"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#methods"},(0,t.tZ)("span",{className:"icon icon-link"})),"Methods"),(0,t.tZ)(a.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,e[73].value),(0,t.tZ)("th",null,e[74].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[75].value),(0,t.tZ)("td",null,e[76].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[77].value),(0,t.tZ)("td",null,e[78].value)))))))}n.default=_}}]);
