"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[7005],{45497:function(r,o,e){e.r(o);var _=e(2143),p=e(50250),c=e(59378),m=e(78190),v=e(74775),l=e(5937),Z=e(2068),h=e(74399),x=e(46004),f=e(35708),B=e(30138),O=e(56140),a=e(5388),g=e(49545),E=e(92169),P=e(13140),b=e(95127),C=e(74418),F=e(97119),u=e(28257),i=e(67294),t=e(13946);function d(){var s=(0,u.eL)(),n=s.texts;return(0,t.tZ)(u.dY,null,(0,t.tZ)(i.Fragment,null,(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("p",null,n[0].value,(0,t.tZ)("code",null,n[1].value),n[2].value),(0,t.tZ)("h2",{id:"when-to-use"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#when-to-use"},(0,t.tZ)("span",{className:"icon icon-link"})),"When To Use"),(0,t.tZ)("ul",null,(0,t.tZ)("li",null,n[3].value),(0,t.tZ)("li",null,n[4].value)),(0,t.tZ)("h2",{id:"examples"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#examples"},(0,t.tZ)("span",{className:"icon icon-link"})),"Examples")),(0,t.tZ)(a.Z,{items:[{demo:{id:"components-float-button-demo-basic"},previewerProps:{iframe:"360",title:"Basic",filename:"components/float-button/demo/basic.tsx",jsx:`import React from 'react';
import { FloatButton } from 'antd';
const App = () => <FloatButton onClick={() => console.log('click')} />;
export default App;
`,description:"<p>The most basic usage.</p>"}},{demo:{id:"components-float-button-demo-type"},previewerProps:{iframe:"360",title:"Type",filename:"components/float-button/demo/type.tsx",jsx:`import React from 'react';
import { FloatButton } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
const App = () => (
  <>
    <FloatButton
      icon={<QuestionCircleOutlined />}
      type="primary"
      style={{
        right: 24,
      }}
    />
    <FloatButton
      icon={<QuestionCircleOutlined />}
      type="default"
      style={{
        right: 94,
      }}
    />
  </>
);
export default App;
`,description:"<p>Change the type of the FloatButton with <code>type</code>.</p>"}},{demo:{id:"components-float-button-demo-shape"},previewerProps:{iframe:"360",title:"Shape",filename:"components/float-button/demo/shape.tsx",jsx:`import React, { useState } from 'react';
import { FloatButton, Radio } from 'antd';
import { CustomerServiceOutlined } from '@ant-design/icons';
const App = () => {
  const [shape, setShape] = useState('circle');
  const onChange = (e) => {
    setShape(e.target.value);
  };
  return (
    <>
      <Radio.Group
        onChange={onChange}
        value={shape}
        style={{
          margin: 20,
        }}
      >
        <Radio value="circle">\u5706\u5F62</Radio>
        <Radio value="square">\u65B9\u5F62</Radio>
      </Radio.Group>
      <FloatButton icon={<CustomerServiceOutlined />} type="primary" shape={shape} />
    </>
  );
};
export default App;
`,description:"<p>Change the shape of the FloatButton with <code>shape</code>.</p>"}},{demo:{id:"components-float-button-demo-description"},previewerProps:{iframe:"360",title:"Description",filename:"components/float-button/demo/description.tsx",jsx:`import React from 'react';
import { FloatButton } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
const App = () => (
  <>
    <FloatButton
      icon={<FileTextOutlined />}
      description="HELP INFO"
      shape="square"
      style={{
        right: 24,
      }}
    />
    <FloatButton
      description="HELP INFO"
      shape="square"
      style={{
        right: 94,
      }}
    />
    <FloatButton
      icon={<FileTextOutlined />}
      description="HELP"
      shape="square"
      style={{
        right: 164,
      }}
    />
  </>
);
export default App;
`,description:`<p>Setting <code>description</code> prop to show FloatButton with description.</p>
<blockquote>
<p>supported only when <code>shape</code> is <code>square</code>. Due to narrow space for text, short sentence is recommended.</p>
</blockquote>`}},{demo:{id:"components-float-button-demo-tooltip"},previewerProps:{iframe:"360",title:"FloatButton with tooltip",filename:"components/float-button/demo/tooltip.tsx",jsx:`import React from 'react';
import { FloatButton } from 'antd';
const App = () => <FloatButton tooltip={<div>Documents</div>} />;
export default App;
`,description:"<p>Setting <code>tooltip</code> prop to show FloatButton with tooltip.</p>"}},{demo:{id:"components-float-button-demo-group"},previewerProps:{iframe:"360",title:"FloatButton Group",filename:"components/float-button/demo/group.tsx",jsx:`import React from 'react';
import { FloatButton } from 'antd';
import { QuestionCircleOutlined, SyncOutlined } from '@ant-design/icons';
const App = () => (
  <>
    <FloatButton.Group
      shape="circle"
      style={{
        right: 24,
      }}
    >
      <FloatButton icon={<QuestionCircleOutlined />} />
      <FloatButton />
      <FloatButton.BackTop visibilityHeight={-1} />
    </FloatButton.Group>
    <FloatButton.Group
      shape="square"
      style={{
        right: 94,
      }}
    >
      <FloatButton icon={<QuestionCircleOutlined />} />
      <FloatButton />
      <FloatButton icon={<SyncOutlined />} />
      <FloatButton.BackTop visibilityHeight={-1} />
    </FloatButton.Group>
  </>
);
export default App;
`,description:"<p>When multiple buttons are used together, <code>&#x3C;FloatButton.Group /></code> is recommended. By setting <code>shape</code> of FloatButton.Group, you can change the shape of group. <code>shape</code> of FloatButton.Group will override <code>shape</code> of FloatButton inside.</p>"}},{demo:{id:"components-float-button-demo-group-menu"},previewerProps:{iframe:"360",title:"Menu mode",filename:"components/float-button/demo/group-menu.tsx",jsx:`import React from 'react';
import { FloatButton } from 'antd';
import { CustomerServiceOutlined, CommentOutlined } from '@ant-design/icons';
const App = () => (
  <FloatButton.Group icon={<CustomerServiceOutlined />} type="primary" trigger="click">
    <FloatButton />
    <FloatButton icon={<CommentOutlined />} />
  </FloatButton.Group>
);
export default App;
`,description:"<p>Open menu mode with <code>trigger</code>, which could be <code>hover</code> or <code>click</code>.</p>"}},{demo:{id:"components-float-button-demo-back-top"},previewerProps:{iframe:"360",title:"BackTop",filename:"components/float-button/demo/back-top.tsx",jsx:`import React from 'react';
import { FloatButton } from 'antd';
const App = () => (
  <div
    style={{
      height: '500vh',
      padding: 10,
    }}
  >
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <FloatButton.BackTop />
  </div>
);
export default App;
`,description:"<p><code>BackTop</code> makes it easy to go back to the top of the page.</p>"}},{demo:{id:"components-float-button-demo-render-panel"},previewerProps:{debug:!0,title:"_InternalPanelDoNotUseOrYouWillBeFired",filename:"components/float-button/demo/render-panel.tsx",jsx:`import React from 'react';
import { CustomerServiceOutlined, QuestionCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

/** Test usage. Do not use in your production. */
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalFloatButton } = FloatButton;
export default () => (
  <div
    style={{
      display: 'flex',
      columnGap: 16,
      alignItems: 'center',
    }}
  >
    <InternalFloatButton backTop />
    <InternalFloatButton icon={<CustomerServiceOutlined />} />
    <InternalFloatButton
      icon={<QuestionCircleOutlined />}
      description="HELP"
      shape="square"
      type="primary"
    />
    <InternalFloatButton
      shape="square"
      items={[
        {
          icon: <QuestionCircleOutlined />,
        },
        {
          icon: <CustomerServiceOutlined />,
        },
        {
          icon: <SyncOutlined />,
        },
      ]}
    />
    <InternalFloatButton
      icon={<CustomerServiceOutlined />}
      trigger="click"
      open
      items={[
        {
          icon: <QuestionCircleOutlined />,
        },
        {
          icon: <CustomerServiceOutlined />,
        },
        {
          icon: <SyncOutlined />,
        },
      ]}
    />
  </div>
);
`,description:"<p>Debug usage. Do not use in your production.</p>"}}]}),(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("h2",{id:"api"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,t.tZ)("span",{className:"icon icon-link"})),"API"),(0,t.tZ)("blockquote",null,(0,t.tZ)("p",null,n[5].value,(0,t.tZ)("code",null,n[6].value),n[7].value)),(0,t.tZ)("h3",{id:"common-api"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#common-api"},(0,t.tZ)("span",{className:"icon icon-link"})),"common API"),(0,t.tZ)(l.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,n[8].value),(0,t.tZ)("th",null,n[9].value),(0,t.tZ)("th",null,n[10].value),(0,t.tZ)("th",null,n[11].value),(0,t.tZ)("th",null,n[12].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[13].value),(0,t.tZ)("td",null,n[14].value),(0,t.tZ)("td",null,n[15].value),(0,t.tZ)("td",null,n[16].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[17].value),(0,t.tZ)("td",null,n[18].value),(0,t.tZ)("td",null,n[19].value),(0,t.tZ)("td",null,n[20].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[21].value),(0,t.tZ)("td",null,n[22].value),(0,t.tZ)("td",null,n[23].value),(0,t.tZ)("td",null),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[24].value),(0,t.tZ)("td",null,n[25].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[26].value),n[27].value,(0,t.tZ)("code",null,n[28].value)),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[29].value)),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[30].value),(0,t.tZ)("td",null,n[31].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[32].value),n[33].value,(0,t.tZ)("code",null,n[34].value)),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[35].value)),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[36].value),(0,t.tZ)("td",null,n[37].value,(0,t.tZ)("code",null,n[38].value),n[39].value),(0,t.tZ)("td",null,n[40].value),(0,t.tZ)("td",null,n[41].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[42].value),(0,t.tZ)("td",null,n[43].value),(0,t.tZ)("td",null,n[44].value),(0,t.tZ)("td",null,n[45].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[46].value),(0,t.tZ)("td",null,n[47].value),(0,t.tZ)("td",null,n[48].value),(0,t.tZ)("td",null,n[49].value),(0,t.tZ)("td",null)))),(0,t.tZ)("h3",{id:"floatbuttongroup"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#floatbuttongroup"},(0,t.tZ)("span",{className:"icon icon-link"})),"FloatButton.Group"),(0,t.tZ)(l.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,n[50].value),(0,t.tZ)("th",null,n[51].value),(0,t.tZ)("th",null,n[52].value),(0,t.tZ)("th",null,n[53].value),(0,t.tZ)("th",null,n[54].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[55].value),(0,t.tZ)("td",null,n[56].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[57].value),n[58].value,(0,t.tZ)("code",null,n[59].value)),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[60].value)),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[61].value),(0,t.tZ)("td",null,n[62].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[63].value),n[64].value,(0,t.tZ)("code",null,n[65].value)),(0,t.tZ)("td",null,n[66].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[67].value),(0,t.tZ)("td",null,n[68].value),(0,t.tZ)("td",null,n[69].value),(0,t.tZ)("td",null,n[70].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[71].value),(0,t.tZ)("td",null,n[72].value),(0,t.tZ)("td",null,n[73].value),(0,t.tZ)("td",null,n[74].value),(0,t.tZ)("td",null)))),(0,t.tZ)("h3",{id:"floatbuttonbacktop"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#floatbuttonbacktop"},(0,t.tZ)("span",{className:"icon icon-link"})),"FloatButton.BackTop"),(0,t.tZ)(l.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,n[75].value),(0,t.tZ)("th",null,n[76].value),(0,t.tZ)("th",null,n[77].value),(0,t.tZ)("th",null,n[78].value),(0,t.tZ)("th",null,n[79].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[80].value),(0,t.tZ)("td",null,n[81].value),(0,t.tZ)("td",null,n[82].value),(0,t.tZ)("td",null,n[83].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[84].value),(0,t.tZ)("td",null,n[85].value),(0,t.tZ)("td",null,n[86].value),(0,t.tZ)("td",null,n[87].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[88].value),(0,t.tZ)("td",null,n[89].value),(0,t.tZ)("td",null,n[90].value),(0,t.tZ)("td",null,n[91].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[92].value),(0,t.tZ)("td",null,n[93].value),(0,t.tZ)("td",null,n[94].value),(0,t.tZ)("td",null,n[95].value),(0,t.tZ)("td",null)))))))}o.default=d}}]);
