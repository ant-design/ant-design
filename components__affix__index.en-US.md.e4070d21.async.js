"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[3154],{5942:function(r,a,n){n.r(a);var m=n(2143),x=n(50250),f=n(59378),c=n(78190),o=n(74775),s=n(5937),p=n(2068),v=n(74399),h=n(46004),Z=n(35708),E=n(30138),g=n(56140),l=n(5388),P=n(49545),A=n(92169),D=n(13140),M=n(95127),O=n(74418),W=n(97119),i=n(28257),_=n(67294),t=n(13946);function d(){var u=(0,i.eL)(),e=u.texts;return(0,t.tZ)(i.dY,null,(0,t.tZ)(_.Fragment,null,(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("p",null,e[0].value),(0,t.tZ)("h2",{id:"when-to-use"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#when-to-use"},(0,t.tZ)("span",{className:"icon icon-link"})),"When To Use"),(0,t.tZ)("p",null,e[1].value),(0,t.tZ)("p",null,e[2].value),(0,t.tZ)("h2",{id:"examples"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#examples"},(0,t.tZ)("span",{className:"icon icon-link"})),"Examples")),(0,t.tZ)(l.Z,{items:[{demo:{id:"components-affix-demo-basic"},previewerProps:{title:"Basic",filename:"components/affix/demo/basic.tsx",jsx:`import React, { useState } from 'react';
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
`,description:"<p>The simplest usage.</p>"}},{demo:{id:"components-affix-demo-on-change"},previewerProps:{title:"Callback",filename:"components/affix/demo/on-change.tsx",jsx:`import React from 'react';
import { Affix, Button } from 'antd';
const App = () => (
  <Affix offsetTop={120} onChange={(affixed) => console.log(affixed)}>
    <Button>120px to affix top</Button>
  </Affix>
);
export default App;
`,description:"<p>Callback with affixed state.</p>"}},{demo:{id:"components-affix-demo-target"},previewerProps:{title:"Container to scroll.",filename:"components/affix/demo/target.tsx",jsx:`import React, { useState } from 'react';
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
`,description:"<p>Set a <code>target</code> for 'Affix', which is listen to scroll event of target element (default is <code>window</code>).</p>",style:`#components-affix-demo-target .scrollable-container {
  height: 100px;
  overflow-y: scroll;
}
#components-affix-demo-target .background {
  padding-top: 60px;
  height: 300px;
  background-image: url('https://zos.alipayobjects.com/rmsportal/RmjwQiJorKyobvI.jpg');
}`}},{demo:{id:"components-affix-demo-debug"},previewerProps:{debug:!0,title:"debug",filename:"components/affix/demo/debug.tsx",jsx:`import React, { useState } from 'react';
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
`,description:"<p>DEBUG</p>"}}]}),(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("h2",{id:"api"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,t.tZ)("span",{className:"icon icon-link"})),"API"),(0,t.tZ)(s.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,e[3].value),(0,t.tZ)("th",null,e[4].value),(0,t.tZ)("th",null,e[5].value),(0,t.tZ)("th",null,e[6].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[7].value),(0,t.tZ)("td",null,e[8].value),(0,t.tZ)("td",null,e[9].value),(0,t.tZ)("td",null,e[10].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[11].value),(0,t.tZ)("td",null,e[12].value),(0,t.tZ)("td",null,e[13].value),(0,t.tZ)("td",null,e[14].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[15].value),(0,t.tZ)("td",null,e[16].value),(0,t.tZ)("td",null,e[17].value),(0,t.tZ)("td",null,e[18].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[19].value),(0,t.tZ)("td",null,e[20].value),(0,t.tZ)("td",null,e[21].value),(0,t.tZ)("td",null,e[22].value)))),(0,t.tZ)("p",null,(0,t.tZ)("strong",null,e[23].value),e[24].value,(0,t.tZ)("code",null,e[25].value),e[26].value,(0,t.tZ)("code",null,e[27].value),e[28].value,(0,t.tZ)("code",null,e[29].value),e[30].value,(0,t.tZ)("code",null,e[31].value),e[32].value),(0,t.tZ)(o.Z,{lang:"jsx"},e[33].value),(0,t.tZ)("h2",{id:"faq"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#faq"},(0,t.tZ)("span",{className:"icon icon-link"})),"FAQ"),(0,t.tZ)("h3",{id:"when-binding-container-with-target-in-affix-elements-sometimes-move-out-of-the-container"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#when-binding-container-with-target-in-affix-elements-sometimes-move-out-of-the-container"},(0,t.tZ)("span",{className:"icon icon-link"})),"When binding container with ",(0,t.tZ)("code",null,e[34].value)," in Affix, elements sometimes move out of the container."),(0,t.tZ)("p",null,e[35].value,(0,t.tZ)("a",{href:"https://codesandbox.io/s/2xyj5zr85p"},e[36].value)),(0,t.tZ)("p",null,e[37].value,(0,t.tZ)("a",{href:"https://github.com/ant-design/ant-design/issues/3938"},e[38].value),e[39].value,(0,t.tZ)("a",{href:"https://github.com/ant-design/ant-design/issues/5642"},e[40].value),e[41].value,(0,t.tZ)("a",{href:"https://github.com/ant-design/ant-design/issues/16120"},e[42].value)),(0,t.tZ)("h3",{id:"when-affix-is-used-in-a-horizontal-scroll-container-the-position-of-the-element-left-is-incorrect"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#when-affix-is-used-in-a-horizontal-scroll-container-the-position-of-the-element-left-is-incorrect"},(0,t.tZ)("span",{className:"icon icon-link"})),"When Affix is \u200B\u200Bused in a horizontal scroll container, the position of the element ",(0,t.tZ)("code",null,e[43].value)," is incorrect."),(0,t.tZ)("p",null,e[44].value,(0,t.tZ)("code",null,e[45].value),e[46].value),(0,t.tZ)("p",null,e[47].value,(0,t.tZ)("a",{href:"https://github.com/ant-design/ant-design/issues/29108"},e[48].value)))))}a.default=d}}]);
