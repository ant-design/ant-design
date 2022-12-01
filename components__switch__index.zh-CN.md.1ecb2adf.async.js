"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[1564],{89042:function(o,n,l){l.r(n);var r=l(2143),c=l(50250),m=l(59378),Z=l(78190),v=l(74775),_=l(5937),h=l(2068),x=l(74399),p=l(46004),E=l(35708),C=l(30138),P=l(56140),u=l(5388),D=l(49545),O=l(92169),M=l(13140),f=l(95127),W=l(74418),U=l(97119),d=l(28257),a=l(67294),t=l(13946);function s(){var i=(0,d.eL)(),e=i.texts;return(0,t.tZ)(d.dY,null,(0,t.tZ)(a.Fragment,null,(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("p",null,e[0].value),(0,t.tZ)("h2",{id:"\u4F55\u65F6\u4F7F\u7528"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F55\u65F6\u4F7F\u7528"},(0,t.tZ)("span",{className:"icon icon-link"})),"\u4F55\u65F6\u4F7F\u7528"),(0,t.tZ)("ul",null,(0,t.tZ)("li",null,e[1].value),(0,t.tZ)("li",null,e[2].value,(0,t.tZ)("code",null,e[3].value),e[4].value,(0,t.tZ)("code",null,e[5].value),e[6].value,(0,t.tZ)("code",null,e[7].value),e[8].value)),(0,t.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,t.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,t.tZ)(u.Z,{items:[{demo:{id:"components-switch-demo-basic"},previewerProps:{title:"\u57FA\u672C",filename:"components/switch/demo/basic.tsx",jsx:`import React from 'react';
import { Switch } from 'antd';
const onChange = (checked) => {
  console.log(\`switch to \${checked}\`);
};
const App = () => <Switch defaultChecked onChange={onChange} />;
export default App;
`,description:"<p>\u6700\u7B80\u5355\u7684\u7528\u6CD5\u3002</p>",style:`.code-box-demo .ant-switch {
  margin-bottom: 8px;
}`}},{demo:{id:"components-switch-demo-disabled"},previewerProps:{title:"\u4E0D\u53EF\u7528",filename:"components/switch/demo/disabled.tsx",jsx:`import React, { useState } from 'react';
import { Button, Switch } from 'antd';
const App = () => {
  const [disabled, setDisabled] = useState(true);
  const toggle = () => {
    setDisabled(!disabled);
  };
  return (
    <>
      <Switch disabled={disabled} defaultChecked />
      <br />
      <Button type="primary" onClick={toggle}>
        Toggle disabled
      </Button>
    </>
  );
};
export default App;
`,description:"<p>Switch \u5931\u6548\u72B6\u6001\u3002</p>"}},{demo:{id:"components-switch-demo-text"},previewerProps:{title:"\u6587\u5B57\u548C\u56FE\u6807",filename:"components/switch/demo/text.tsx",jsx:`import React from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Switch, Space } from 'antd';
const App = () => (
  <Space direction="vertical">
    <Switch checkedChildren="\u5F00\u542F" unCheckedChildren="\u5173\u95ED" defaultChecked />
    <Switch checkedChildren="1" unCheckedChildren="0" />
    <Switch
      checkedChildren={<CheckOutlined />}
      unCheckedChildren={<CloseOutlined />}
      defaultChecked
    />
  </Space>
);
export default App;
`,description:"<p>\u5E26\u6709\u6587\u5B57\u548C\u56FE\u6807\u3002</p>"}},{demo:{id:"components-switch-demo-size"},previewerProps:{title:"\u4E24\u79CD\u5927\u5C0F",filename:"components/switch/demo/size.tsx",jsx:`import React from 'react';
import { Switch } from 'antd';
const App = () => (
  <>
    <Switch defaultChecked />
    <br />
    <Switch size="small" defaultChecked />
  </>
);
export default App;
`,description:'<p><code>size="small"</code> \u8868\u793A\u5C0F\u53F7\u5F00\u5173\u3002</p>'}},{demo:{id:"components-switch-demo-loading"},previewerProps:{title:"\u52A0\u8F7D\u4E2D",filename:"components/switch/demo/loading.tsx",jsx:`import React from 'react';
import { Switch } from 'antd';
const App = () => (
  <>
    <Switch loading defaultChecked />
    <br />
    <Switch size="small" loading />
  </>
);
export default App;
`,description:"<p>\u6807\u8BC6\u5F00\u5173\u64CD\u4F5C\u4ECD\u5728\u6267\u884C\u4E2D\u3002</p>"}}]}),(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("h2",{id:"api"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,t.tZ)("span",{className:"icon icon-link"})),"API"),(0,t.tZ)(_.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,e[9].value),(0,t.tZ)("th",null,e[10].value),(0,t.tZ)("th",null,e[11].value),(0,t.tZ)("th",null,e[12].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[13].value),(0,t.tZ)("td",null,e[14].value),(0,t.tZ)("td",null,e[15].value),(0,t.tZ)("td",null,e[16].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[17].value),(0,t.tZ)("td",null,e[18].value),(0,t.tZ)("td",null,e[19].value),(0,t.tZ)("td",null,e[20].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[21].value),(0,t.tZ)("td",null,e[22].value),(0,t.tZ)("td",null,e[23].value),(0,t.tZ)("td",null,e[24].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[25].value),(0,t.tZ)("td",null,e[26].value),(0,t.tZ)("td",null,e[27].value),(0,t.tZ)("td",null,e[28].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[29].value),(0,t.tZ)("td",null,e[30].value),(0,t.tZ)("td",null,e[31].value),(0,t.tZ)("td",null,e[32].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[33].value),(0,t.tZ)("td",null,e[34].value),(0,t.tZ)("td",null,e[35].value),(0,t.tZ)("td",null,e[36].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[37].value),(0,t.tZ)("td",null,e[38].value),(0,t.tZ)("td",null,e[39].value),(0,t.tZ)("td",null,e[40].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[41].value),(0,t.tZ)("td",null,e[42].value,(0,t.tZ)("code",null,e[43].value),e[44].value,(0,t.tZ)("code",null,e[45].value)),(0,t.tZ)("td",null,e[46].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,e[47].value))),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[48].value),(0,t.tZ)("td",null,e[49].value),(0,t.tZ)("td",null,e[50].value),(0,t.tZ)("td",null,e[51].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[52].value),(0,t.tZ)("td",null,e[53].value),(0,t.tZ)("td",null,e[54].value),(0,t.tZ)("td",null,e[55].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[56].value),(0,t.tZ)("td",null,e[57].value),(0,t.tZ)("td",null,e[58].value),(0,t.tZ)("td",null,e[59].value)))),(0,t.tZ)("h2",{id:"\u65B9\u6CD5"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u65B9\u6CD5"},(0,t.tZ)("span",{className:"icon icon-link"})),"\u65B9\u6CD5"),(0,t.tZ)(_.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,e[60].value),(0,t.tZ)("th",null,e[61].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[62].value),(0,t.tZ)("td",null,e[63].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[64].value),(0,t.tZ)("td",null,e[65].value)))))))}n.default=s}}]);
