"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[8273],{3165:function(r,a,n){n.r(a);var x=n(2143),m=n(50250),f=n(59378),p=n(78190),u=n(74775),s=n(5937),c=n(2068),v=n(74399),E=n(46004),Z=n(35708),h=n(30138),A=n(56140),o=n(5388),D=n(49545),g=n(92169),B=n(13140),P=n(95127),M=n(74418),O=n(97119),_=n(28257),i=n(67294),t=n(13946);function l(){var d=(0,_.eL)(),e=d.texts;return(0,t.tZ)(_.dY,null,(0,t.tZ)(i.Fragment,null,(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("p",null,e[0].value),(0,t.tZ)("h2",{id:"\u4F55\u65F6\u4F7F\u7528"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F55\u65F6\u4F7F\u7528"},(0,t.tZ)("span",{className:"icon icon-link"})),"\u4F55\u65F6\u4F7F\u7528"),(0,t.tZ)("p",null,e[1].value),(0,t.tZ)("p",null,e[2].value),(0,t.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,t.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,t.tZ)(o.Z,{items:[{demo:{id:"components-affix-demo-basic"},previewerProps:{title:"\u57FA\u672C",filename:"components/affix/demo/basic.tsx",jsx:`import React, { useState } from 'react';
import { Affix, Button } from 'antd';
const App = () => {
  const [top, setTop] = useState(10);
  const [bottom, setBottom] = useState(10);
  return (
    <>
      <Affix offsetTop={top}>
        <Button type="primary" onClick={() => setTop(top + 10)}>
          Affix top
        </Button>
      </Affix>
      <br />
      <Affix offsetBottom={bottom}>
        <Button type="primary" onClick={() => setBottom(bottom + 10)}>
          Affix bottom
        </Button>
      </Affix>
    </>
  );
};
export default App;
`,description:"<p>\u6700\u7B80\u5355\u7684\u7528\u6CD5\u3002</p>"}},{demo:{id:"components-affix-demo-on-change"},previewerProps:{title:"\u56FA\u5B9A\u72B6\u6001\u6539\u53D8\u7684\u56DE\u8C03",filename:"components/affix/demo/on-change.tsx",jsx:`import React from 'react';
import { Affix, Button } from 'antd';
const App = () => (
  <Affix offsetTop={120} onChange={(affixed) => console.log(affixed)}>
    <Button>120px to affix top</Button>
  </Affix>
);
export default App;
`,description:"<p>\u53EF\u4EE5\u83B7\u5F97\u662F\u5426\u56FA\u5B9A\u7684\u72B6\u6001\u3002</p>"}},{demo:{id:"components-affix-demo-target"},previewerProps:{title:"\u6EDA\u52A8\u5BB9\u5668",filename:"components/affix/demo/target.tsx",jsx:`import React, { useState } from 'react';
import { Affix, Button } from 'antd';
const App = () => {
  const [container, setContainer] = useState(null);
  return (
    <div className="scrollable-container" ref={setContainer}>
      <div className="background">
        <Affix target={() => container}>
          <Button type="primary">Fixed at the top of container</Button>
        </Affix>
      </div>
    </div>
  );
};
export default App;
`,description:"<p>\u7528 <code>target</code> \u8BBE\u7F6E <code>Affix</code> \u9700\u8981\u76D1\u542C\u5176\u6EDA\u52A8\u4E8B\u4EF6\u7684\u5143\u7D20\uFF0C\u9ED8\u8BA4\u4E3A <code>window</code>\u3002</p>",style:`#components-affix-demo-target .scrollable-container {
  height: 100px;
  overflow-y: scroll;
}
#components-affix-demo-target .background {
  padding-top: 60px;
  height: 300px;
  background-image: url('https://zos.alipayobjects.com/rmsportal/RmjwQiJorKyobvI.jpg');
}`}},{demo:{id:"components-affix-demo-debug"},previewerProps:{debug:!0,title:"\u8C03\u6574\u6D4F\u89C8\u5668\u5927\u5C0F\uFF0C\u89C2\u5BDF Affix \u5BB9\u5668\u662F\u5426\u53D1\u751F\u53D8\u5316\u3002\u8DDF\u968F\u53D8\u5316\u4E3A\u6B63\u5E38\u3002#17678",filename:"components/affix/demo/debug.tsx",jsx:`import React, { useState } from 'react';
import { Affix, Button } from 'antd';
const App = () => {
  const [top, setTop] = useState(10);
  return (
    <div
      style={{
        height: 10000,
      }}
    >
      <div>Top</div>
      <Affix offsetTop={top}>
        <div
          style={{
            background: 'red',
          }}
        >
          <Button type="primary" onClick={() => setTop(top + 10)}>
            Affix top
          </Button>
        </div>
      </Affix>
      <div>Bottom</div>
    </div>
  );
};
export default App;
`,description:"<p>DEBUG</p>"}}]}),(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("h2",{id:"api"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,t.tZ)("span",{className:"icon icon-link"})),"API"),(0,t.tZ)(s.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,e[3].value),(0,t.tZ)("th",null,e[4].value),(0,t.tZ)("th",null,e[5].value),(0,t.tZ)("th",null,e[6].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[7].value),(0,t.tZ)("td",null,e[8].value),(0,t.tZ)("td",null,e[9].value),(0,t.tZ)("td",null,e[10].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[11].value),(0,t.tZ)("td",null,e[12].value),(0,t.tZ)("td",null,e[13].value),(0,t.tZ)("td",null,e[14].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[15].value),(0,t.tZ)("td",null,e[16].value,(0,t.tZ)("code",null,e[17].value),e[18].value),(0,t.tZ)("td",null,e[19].value),(0,t.tZ)("td",null,e[20].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[21].value),(0,t.tZ)("td",null,e[22].value),(0,t.tZ)("td",null,e[23].value),(0,t.tZ)("td",null,e[24].value)))),(0,t.tZ)("p",null,(0,t.tZ)("strong",null,e[25].value),(0,t.tZ)("code",null,e[26].value),e[27].value,(0,t.tZ)("code",null,e[28].value),e[29].value),(0,t.tZ)(u.Z,{lang:"jsx"},e[30].value),(0,t.tZ)("h2",{id:"faq"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#faq"},(0,t.tZ)("span",{className:"icon icon-link"})),"FAQ"),(0,t.tZ)("h3",{id:"affix-\u4F7F\u7528-target-\u7ED1\u5B9A\u5BB9\u5668\u65F6\u5143\u7D20\u4F1A\u8DD1\u5230\u5BB9\u5668\u5916"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#affix-\u4F7F\u7528-target-\u7ED1\u5B9A\u5BB9\u5668\u65F6\u5143\u7D20\u4F1A\u8DD1\u5230\u5BB9\u5668\u5916"},(0,t.tZ)("span",{className:"icon icon-link"})),"Affix \u4F7F\u7528 ",(0,t.tZ)("code",null,e[31].value)," \u7ED1\u5B9A\u5BB9\u5668\u65F6\uFF0C\u5143\u7D20\u4F1A\u8DD1\u5230\u5BB9\u5668\u5916\u3002"),(0,t.tZ)("p",null,e[32].value,(0,t.tZ)("a",{href:"https://codesandbox.io/s/2xyj5zr85p"},e[33].value)),(0,t.tZ)("p",null,e[34].value,(0,t.tZ)("a",{href:"https://github.com/ant-design/ant-design/issues/3938"},e[35].value),e[36].value,(0,t.tZ)("a",{href:"https://github.com/ant-design/ant-design/issues/5642"},e[37].value),e[38].value,(0,t.tZ)("a",{href:"https://github.com/ant-design/ant-design/issues/16120"},e[39].value)),(0,t.tZ)("h3",{id:"affix-\u5728\u6C34\u5E73\u6EDA\u52A8\u5BB9\u5668\u4E2D\u4F7F\u7528\u65F6-\u5143\u7D20-left-\u4F4D\u7F6E\u4E0D\u6B63\u786E"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#affix-\u5728\u6C34\u5E73\u6EDA\u52A8\u5BB9\u5668\u4E2D\u4F7F\u7528\u65F6-\u5143\u7D20-left-\u4F4D\u7F6E\u4E0D\u6B63\u786E"},(0,t.tZ)("span",{className:"icon icon-link"})),"Affix \u5728\u6C34\u5E73\u6EDA\u52A8\u5BB9\u5668\u4E2D\u4F7F\u7528\u65F6\uFF0C \u5143\u7D20 ",(0,t.tZ)("code",null,e[40].value)," \u4F4D\u7F6E\u4E0D\u6B63\u786E\u3002"),(0,t.tZ)("p",null,e[41].value,(0,t.tZ)("code",null,e[42].value),e[43].value),(0,t.tZ)("p",null,e[44].value,(0,t.tZ)("a",{href:"https://github.com/ant-design/ant-design/issues/29108"},e[45].value)))))}a.default=l}}]);
