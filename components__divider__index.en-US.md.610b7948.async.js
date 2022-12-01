"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[1418],{91630:function(_,i,n){n.r(i);var u=n(2143),m=n(50250),p=n(59378),c=n(78190),v=n(74775),d=n(5937),x=n(2068),Z=n(74399),h=n(46004),D=n(35708),E=n(30138),f=n(56140),o=n(5388),P=n(49545),g=n(92169),M=n(13140),R=n(95127),O=n(74418),U=n(97119),l=n(28257),a=n(67294),e=n(13946);function r(){var s=(0,l.eL)(),t=s.texts;return(0,e.tZ)(l.dY,null,(0,e.tZ)(a.Fragment,null,(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)("p",null,t[0].value),(0,e.tZ)("h2",{id:"when-to-use"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#when-to-use"},(0,e.tZ)("span",{className:"icon icon-link"})),"When To Use"),(0,e.tZ)("ul",null,(0,e.tZ)("li",null,t[1].value),(0,e.tZ)("li",null,t[2].value)),(0,e.tZ)("h2",{id:"examples"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#examples"},(0,e.tZ)("span",{className:"icon icon-link"})),"Examples")),(0,e.tZ)(o.Z,{items:[{demo:{id:"components-divider-demo-horizontal"},previewerProps:{title:"Horizontal",filename:"components/divider/demo/horizontal.tsx",jsx:`import React from 'react';
import { Divider } from 'antd';
const App = () => (
  <>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <Divider />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <Divider dashed />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
  </>
);
export default App;
`,description:"<p>Divider is <code>horizontal</code> by default. You can add text within Divider.</p>"}},{demo:{id:"components-divider-demo-with-text"},previewerProps:{title:"Divider with title",filename:"components/divider/demo/with-text.tsx",jsx:`import React from 'react';
import { Divider } from 'antd';
const App = () => (
  <>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <Divider>Text</Divider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <Divider orientation="left">Left Text</Divider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <Divider orientation="right">Right Text</Divider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <Divider orientation="left" orientationMargin="0">
      Left Text with 0 orientationMargin
    </Divider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <Divider orientation="right" orientationMargin={50}>
      Right Text with 50px orientationMargin
    </Divider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
  </>
);
export default App;
`,description:'<p>Divider with inner title, set <code>orientation="left/right"</code> to align it.</p>'}},{demo:{id:"components-divider-demo-plain"},previewerProps:{title:"Text without heading style",filename:"components/divider/demo/plain.tsx",jsx:`import React from 'react';
import { Divider } from 'antd';
const App = () => (
  <>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <Divider plain>Text</Divider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <Divider orientation="left" plain>
      Left Text
    </Divider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <Divider orientation="right" plain>
      Right Text
    </Divider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
  </>
);
export default App;
`,description:"<p>You can use non-heading style of divider text by setting <code>plain</code>.</p>"}},{demo:{id:"components-divider-demo-vertical"},previewerProps:{title:"Vertical",filename:"components/divider/demo/vertical.tsx",jsx:`import React from 'react';
import { Divider } from 'antd';
const App = () => (
  <>
    Text
    <Divider type="vertical" />
    <a href="#">Link</a>
    <Divider type="vertical" />
    <a href="#">Link</a>
  </>
);
export default App;
`,description:'<p>Use <code>type="vertical"</code> make it vertical.</p>'}},{demo:{id:"components-divider-demo-customize-style"},previewerProps:{debug:!0,title:"Style Customization",filename:"components/divider/demo/customize-style.tsx",jsx:`import React from 'react';
import { Divider } from 'antd';
const App = () => (
  <>
    <Divider
      style={{
        borderWidth: 2,
        borderColor: '#7cb305',
      }}
    />
    <Divider
      style={{
        borderColor: '#7cb305',
      }}
      dashed
    />
    <Divider
      style={{
        borderColor: '#7cb305',
      }}
      dashed
    >
      Text
    </Divider>
    <Divider
      type="vertical"
      style={{
        height: 60,
        borderColor: '#7cb305',
      }}
    />
    <Divider
      type="vertical"
      style={{
        height: 60,
        borderColor: '#7cb305',
      }}
      dashed
    />
  </>
);
export default App;
`,description:"<p>Use <code>style</code> to change default style.</p>"}}]}),(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)("h2",{id:"api"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,e.tZ)("span",{className:"icon icon-link"})),"API"),(0,e.tZ)(d.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,t[3].value),(0,e.tZ)("th",null,t[4].value),(0,e.tZ)("th",null,t[5].value),(0,e.tZ)("th",null,t[6].value),(0,e.tZ)("th",null,t[7].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[8].value),(0,e.tZ)("td",null,t[9].value),(0,e.tZ)("td",null,t[10].value),(0,e.tZ)("td",null,t[11].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[12].value),(0,e.tZ)("td",null,t[13].value),(0,e.tZ)("td",null,t[14].value),(0,e.tZ)("td",null,t[15].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[16].value),(0,e.tZ)("td",null,t[17].value),(0,e.tZ)("td",null,t[18].value),(0,e.tZ)("td",null,t[19].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[20].value),(0,e.tZ)("td",null,t[21].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[22].value),t[23].value,(0,e.tZ)("code",null,t[24].value),t[25].value,(0,e.tZ)("code",null,t[26].value)),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[27].value)),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[28].value),(0,e.tZ)("td",null,t[29].value,(0,e.tZ)("code",null,t[30].value),t[31].value,(0,e.tZ)("code",null,t[32].value),t[33].value,(0,e.tZ)("code",null,t[34].value)),(0,e.tZ)("td",null,t[35].value),(0,e.tZ)("td",null,t[36].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[37].value),(0,e.tZ)("td",null,t[38].value),(0,e.tZ)("td",null,t[39].value),(0,e.tZ)("td",null,t[40].value),(0,e.tZ)("td",null,t[41].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[42].value),(0,e.tZ)("td",null,t[43].value),(0,e.tZ)("td",null,t[44].value),(0,e.tZ)("td",null,t[45].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[46].value),(0,e.tZ)("td",null,t[47].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[48].value),t[49].value,(0,e.tZ)("code",null,t[50].value)),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[51].value)),(0,e.tZ)("td",null)))))))}i.default=r}}]);
