"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[4448],{24244:function(r,n,e){e.r(n);var i=e(2143),m=e(50250),Z=e(59378),p=e(78190),v=e(74775),a=e(5937),c=e(2068),x=e(74399),E=e(46004),f=e(35708),P=e(30138),h=e(56140),d=e(5388),O=e(49545),R=e(92169),D=e(13140),M=e(95127),A=e(74418),W=e(97119),u=e(28257),_=e(67294),t=e(13946);function s(){var o=(0,u.eL)(),l=o.texts;return(0,t.tZ)(u.dY,null,(0,t.tZ)(_.Fragment,null,(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("p",null,l[0].value),(0,t.tZ)("h2",{id:"\u4F55\u65F6\u4F7F\u7528"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F55\u65F6\u4F7F\u7528"},(0,t.tZ)("span",{className:"icon icon-link"})),"\u4F55\u65F6\u4F7F\u7528"),(0,t.tZ)("ul",null,(0,t.tZ)("li",null,l[1].value),(0,t.tZ)("li",null,l[2].value)),(0,t.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,t.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,t.tZ)(d.Z,{items:[{demo:{id:"components-rate-demo-basic"},previewerProps:{title:"\u57FA\u672C",filename:"components/rate/demo/basic.tsx",jsx:`import React from 'react';
import { Rate } from 'antd';
const App = () => <Rate />;
export default App;
`,description:"<p>\u6700\u7B80\u5355\u7684\u7528\u6CD5\u3002</p>"}},{demo:{id:"components-rate-demo-half"},previewerProps:{title:"\u534A\u661F",filename:"components/rate/demo/half.tsx",jsx:`import React from 'react';
import { Rate } from 'antd';
const App = () => <Rate allowHalf defaultValue={2.5} />;
export default App;
`,description:"<p>\u652F\u6301\u9009\u4E2D\u534A\u661F\u3002</p>"}},{demo:{id:"components-rate-demo-text"},previewerProps:{title:"\u6587\u6848\u5C55\u73B0",filename:"components/rate/demo/text.tsx",jsx:`import React, { useState } from 'react';
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
`,description:"<p>\u7ED9\u8BC4\u5206\u7EC4\u4EF6\u52A0\u4E0A\u6587\u6848\u5C55\u793A\u3002</p>"}},{demo:{id:"components-rate-demo-disabled"},previewerProps:{title:"\u53EA\u8BFB",filename:"components/rate/demo/disabled.tsx",jsx:`import React from 'react';
import { Rate } from 'antd';
const App = () => <Rate disabled defaultValue={2} />;
export default App;
`,description:"<p>\u53EA\u8BFB\uFF0C\u65E0\u6CD5\u8FDB\u884C\u9F20\u6807\u4EA4\u4E92\u3002</p>"}},{demo:{id:"components-rate-demo-clear"},previewerProps:{title:"\u6E05\u9664",filename:"components/rate/demo/clear.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u652F\u6301\u5141\u8BB8\u6216\u8005\u7981\u7528\u6E05\u9664\u3002</p>"}},{demo:{id:"components-rate-demo-character"},previewerProps:{title:"\u5176\u4ED6\u5B57\u7B26",filename:"components/rate/demo/character.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u53EF\u4EE5\u5C06\u661F\u661F\u66FF\u6362\u4E3A\u5176\u4ED6\u5B57\u7B26\uFF0C\u6BD4\u5982\u5B57\u6BCD\uFF0C\u6570\u5B57\uFF0C\u5B57\u4F53\u56FE\u6807\u751A\u81F3\u4E2D\u6587\u3002</p>"}},{demo:{id:"components-rate-demo-character-function"},previewerProps:{title:"\u81EA\u5B9A\u4E49\u5B57\u7B26",filename:"components/rate/demo/character-function.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u53EF\u4EE5\u4F7F\u7528 <code>(RateProps) => ReactNode</code> \u7684\u65B9\u5F0F\u81EA\u5B9A\u4E49\u6BCF\u4E00\u4E2A\u5B57\u7B26\u3002</p>"}}]}),(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("h2",{id:"api"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,t.tZ)("span",{className:"icon icon-link"})),"API"),(0,t.tZ)(a.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,l[3].value),(0,t.tZ)("th",null,l[4].value),(0,t.tZ)("th",null,l[5].value),(0,t.tZ)("th",null,l[6].value),(0,t.tZ)("th",null,l[7].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[8].value),(0,t.tZ)("td",null,l[9].value),(0,t.tZ)("td",null,l[10].value),(0,t.tZ)("td",null,l[11].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[12].value),(0,t.tZ)("td",null,l[13].value),(0,t.tZ)("td",null,l[14].value),(0,t.tZ)("td",null,l[15].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[16].value),(0,t.tZ)("td",null,l[17].value),(0,t.tZ)("td",null,l[18].value),(0,t.tZ)("td",null,l[19].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[20].value),(0,t.tZ)("td",null,l[21].value),(0,t.tZ)("td",null,l[22].value),(0,t.tZ)("td",null,l[23].value),(0,t.tZ)("td",null,l[24].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[25].value),(0,t.tZ)("td",null,l[26].value),(0,t.tZ)("td",null,l[27].value),(0,t.tZ)("td",null,l[28].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[29].value),(0,t.tZ)("td",null,l[30].value),(0,t.tZ)("td",null,l[31].value),(0,t.tZ)("td",null,l[32].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[33].value),(0,t.tZ)("td",null,l[34].value),(0,t.tZ)("td",null,l[35].value),(0,t.tZ)("td",null,l[36].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[37].value),(0,t.tZ)("td",null,l[38].value),(0,t.tZ)("td",null,l[39].value),(0,t.tZ)("td",null,l[40].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[41].value),(0,t.tZ)("td",null,l[42].value),(0,t.tZ)("td",null,l[43].value),(0,t.tZ)("td",null,l[44].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[45].value),(0,t.tZ)("td",null,l[46].value),(0,t.tZ)("td",null,l[47].value),(0,t.tZ)("td",null,l[48].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[49].value),(0,t.tZ)("td",null,l[50].value),(0,t.tZ)("td",null,l[51].value),(0,t.tZ)("td",null,l[52].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[53].value),(0,t.tZ)("td",null,l[54].value),(0,t.tZ)("td",null,l[55].value),(0,t.tZ)("td",null,l[56].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[57].value),(0,t.tZ)("td",null,l[58].value),(0,t.tZ)("td",null,l[59].value),(0,t.tZ)("td",null,l[60].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[61].value),(0,t.tZ)("td",null,l[62].value),(0,t.tZ)("td",null,l[63].value),(0,t.tZ)("td",null,l[64].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[65].value),(0,t.tZ)("td",null,l[66].value),(0,t.tZ)("td",null,l[67].value),(0,t.tZ)("td",null,l[68].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[69].value),(0,t.tZ)("td",null,l[70].value),(0,t.tZ)("td",null,l[71].value),(0,t.tZ)("td",null,l[72].value),(0,t.tZ)("td",null)))),(0,t.tZ)("h2",{id:"\u65B9\u6CD5"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u65B9\u6CD5"},(0,t.tZ)("span",{className:"icon icon-link"})),"\u65B9\u6CD5"),(0,t.tZ)(a.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,l[73].value),(0,t.tZ)("th",null,l[74].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[75].value),(0,t.tZ)("td",null,l[76].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[77].value),(0,t.tZ)("td",null,l[78].value)))))))}n.default=s}}]);
