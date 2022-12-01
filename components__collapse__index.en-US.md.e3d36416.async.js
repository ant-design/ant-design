"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[5990],{30489:function(u,t,l){l.r(t);var r=l(2143),c=l(50250),_=l(59378),m=l(78190),h=l(74775),a=l(5937),x=l(2068),v=l(74399),Z=l(46004),P=l(35708),f=l(30138),C=l(56140),s=l(5388),y=l(49545),g=l(92169),E=l(13140),A=l(95127),b=l(74418),T=l(97119),o=l(28257),d=l(67294),e=l(13946);function i(){var p=(0,o.eL)(),n=p.texts;return(0,e.tZ)(o.dY,null,(0,e.tZ)(d.Fragment,null,(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)("p",null,n[0].value),(0,e.tZ)("h2",{id:"when-to-use"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#when-to-use"},(0,e.tZ)("span",{className:"icon icon-link"})),"When To Use"),(0,e.tZ)("ul",null,(0,e.tZ)("li",null,n[1].value),(0,e.tZ)("li",null,(0,e.tZ)("code",null,n[2].value),n[3].value,(0,e.tZ)("code",null,n[4].value),n[5].value)),(0,e.tZ)("h2",{id:"examples"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#examples"},(0,e.tZ)("span",{className:"icon icon-link"})),"Examples")),(0,e.tZ)(s.Z,{items:[{demo:{id:"components-collapse-demo-basic"},previewerProps:{title:"Collapse",filename:"components/collapse/demo/basic.tsx",jsx:`import React from 'react';
import { Collapse } from 'antd';
const { Panel } = Collapse;
const text = \`
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
\`;
const App = () => {
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <Collapse defaultActiveKey={['1']} onChange={onChange}>
      <Panel header="This is panel header 1" key="1">
        <p>{text}</p>
      </Panel>
      <Panel header="This is panel header 2" key="2">
        <p>{text}</p>
      </Panel>
      <Panel header="This is panel header 3" key="3">
        <p>{text}</p>
      </Panel>
    </Collapse>
  );
};
export default App;
`,description:"<p>By default, any number of panels can be expanded at a time. The first panel is expanded in this example.</p>",style:`[data-theme="compact"] p, p {
  margin: 0;
}`}},{demo:{id:"components-collapse-demo-accordion"},previewerProps:{title:"Accordion",filename:"components/collapse/demo/accordion.tsx",jsx:`import React from 'react';
import { Collapse } from 'antd';
const { Panel } = Collapse;
const text = \`
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
\`;
const App = () => (
  <Collapse accordion>
    <Panel header="This is panel header 1" key="1">
      <p>{text}</p>
    </Panel>
    <Panel header="This is panel header 2" key="2">
      <p>{text}</p>
    </Panel>
    <Panel header="This is panel header 3" key="3">
      <p>{text}</p>
    </Panel>
  </Collapse>
);
export default App;
`,description:"<p>In accordion mode, only one panel can be expanded at a time.</p>"}},{demo:{id:"components-collapse-demo-mix"},previewerProps:{title:"Nested panel",filename:"components/collapse/demo/mix.tsx",jsx:`import React from 'react';
import { Collapse } from 'antd';
const { Panel } = Collapse;
const text = \`
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
\`;
const App = () => {
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <Collapse onChange={onChange}>
      <Panel header="This is panel header 1" key="1">
        <Collapse defaultActiveKey="1">
          <Panel header="This is panel nest panel" key="1">
            <p>{text}</p>
          </Panel>
        </Collapse>
      </Panel>
      <Panel header="This is panel header 2" key="2">
        <p>{text}</p>
      </Panel>
      <Panel header="This is panel header 3" key="3">
        <p>{text}</p>
      </Panel>
    </Collapse>
  );
};
export default App;
`,description:"<p><code>Collapse</code> is nested inside the <code>Collapse</code>.</p>"}},{demo:{id:"components-collapse-demo-borderless"},previewerProps:{title:"Borderless",filename:"components/collapse/demo/borderless.tsx",jsx:`import React from 'react';
import { Collapse } from 'antd';
const { Panel } = Collapse;
const text = (
  <p
    style={{
      paddingLeft: 24,
    }}
  >
    A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
    as a welcome guest in many households across the world.
  </p>
);
const App = () => (
  <Collapse bordered={false} defaultActiveKey={['1']}>
    <Panel header="This is panel header 1" key="1">
      {text}
    </Panel>
    <Panel header="This is panel header 2" key="2">
      {text}
    </Panel>
    <Panel header="This is panel header 3" key="3">
      {text}
    </Panel>
  </Collapse>
);
export default App;
`,description:"<p>A borderless style of Collapse.</p>"}},{demo:{id:"components-collapse-demo-custom"},previewerProps:{title:"Custom Panel",filename:"components/collapse/demo/custom.tsx",jsx:`import React from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
const { Panel } = Collapse;
const text = \`
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
\`;
const App = () => (
  <Collapse
    bordered={false}
    defaultActiveKey={['1']}
    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
    className="site-collapse-custom-collapse"
  >
    <Panel header="This is panel header 1" key="1" className="site-collapse-custom-panel">
      <p>{text}</p>
    </Panel>
    <Panel header="This is panel header 2" key="2" className="site-collapse-custom-panel">
      <p>{text}</p>
    </Panel>
    <Panel header="This is panel header 3" key="3" className="site-collapse-custom-panel">
      <p>{text}</p>
    </Panel>
  </Collapse>
);
export default App;
`,description:"<p>Customize the background, border, margin styles and icon for each panel.</p>",style:`[data-theme='compact'] .site-collapse-custom-collapse .site-collapse-custom-panel,
.site-collapse-custom-collapse .site-collapse-custom-panel {
  margin-bottom: 24px;
  overflow: hidden;
  background: #f7f7f7;
  border: 0px !important;
  border-radius: 2px;
}`}},{demo:{id:"components-collapse-demo-noarrow"},previewerProps:{title:"No arrow",filename:"components/collapse/demo/noarrow.tsx",jsx:`import React from 'react';
import { Collapse } from 'antd';
const { Panel } = Collapse;
const text = \`
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
\`;
const App = () => {
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <Collapse defaultActiveKey={['1']} onChange={onChange}>
      <Panel header="This is panel header with arrow icon" key="1">
        <p>{text}</p>
      </Panel>
      <Panel showArrow={false} header="This is panel header with no arrow icon" key="2">
        <p>{text}</p>
      </Panel>
    </Collapse>
  );
};
export default App;
`,description:"<p>You can hide the arrow icon by passing <code>showArrow={false}</code> to <code>CollapsePanel</code> component.</p>"}},{demo:{id:"components-collapse-demo-extra"},previewerProps:{title:"Extra node",filename:"components/collapse/demo/extra.tsx",jsx:`import React, { useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Collapse, Select } from 'antd';
const { Panel } = Collapse;
const { Option } = Select;
const text = \`
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
\`;
const App = () => {
  const [expandIconPosition, setExpandIconPosition] = useState('start');
  const onPositionChange = (newExpandIconPosition) => {
    setExpandIconPosition(newExpandIconPosition);
  };
  const onChange = (key) => {
    console.log(key);
  };
  const genExtra = () => (
    <SettingOutlined
      onClick={(event) => {
        // If you don't want click extra trigger collapse, you can prevent this:
        event.stopPropagation();
      }}
    />
  );
  return (
    <>
      <Collapse
        defaultActiveKey={['1']}
        onChange={onChange}
        expandIconPosition={expandIconPosition}
      >
        <Panel header="This is panel header 1" key="1" extra={genExtra()}>
          <div>{text}</div>
        </Panel>
        <Panel header="This is panel header 2" key="2" extra={genExtra()}>
          <div>{text}</div>
        </Panel>
        <Panel header="This is panel header 3" key="3" extra={genExtra()}>
          <div>{text}</div>
        </Panel>
      </Collapse>
      <br />
      <span>Expand Icon Position: </span>
      <Select
        value={expandIconPosition}
        style={{
          margin: '0 8px',
        }}
        onChange={onPositionChange}
      >
        <Option value="start">start</Option>
        <Option value="end">end</Option>
      </Select>
    </>
  );
};
export default App;
`,description:"<p>More than one panel can be expanded at a time, the first panel is initialized to be active in this case.</p>"}},{demo:{id:"components-collapse-demo-ghost"},previewerProps:{title:"Ghost Collapse",filename:"components/collapse/demo/ghost.tsx",jsx:`import React from 'react';
import { Collapse } from 'antd';
const { Panel } = Collapse;
const text = \`
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
\`;
const App = () => (
  <Collapse defaultActiveKey={['1']} ghost>
    <Panel header="This is panel header 1" key="1">
      <p>{text}</p>
    </Panel>
    <Panel header="This is panel header 2" key="2">
      <p>{text}</p>
    </Panel>
    <Panel header="This is panel header 3" key="3">
      <p>{text}</p>
    </Panel>
  </Collapse>
);
export default App;
`,description:"<p>Making collapse's background to transparent.</p>"}},{demo:{id:"components-collapse-demo-collapsible"},previewerProps:{title:"Collapsible",filename:"components/collapse/demo/collapsible.tsx",jsx:`import React from 'react';
import { Collapse, Space } from 'antd';
const { Panel } = Collapse;
const text = \`
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
\`;
const App = () => (
  <Space direction="vertical">
    <Collapse collapsible="header" defaultActiveKey={['1']}>
      <Panel header="This panel can only be collapsed by clicking text" key="1">
        <p>{text}</p>
      </Panel>
    </Collapse>
    <Collapse collapsible="icon" defaultActiveKey={['1']}>
      <Panel header="This panel can only be collapsed by clicking icon" key="1">
        <p>{text}</p>
      </Panel>
    </Collapse>
    <Collapse collapsible="disabled">
      <Panel header="This panel can't be collapsed" key="1">
        <p>{text}</p>
      </Panel>
    </Collapse>
  </Space>
);
export default App;
`,description:"<p>Specify the trigger area of collapsible by <code>collapsible</code>.</p>",style:`[data-theme="compact"] p, p {
  margin: 0;
}
#components-collapse-demo-collapsible .ant-space {
  width: 100%;
}`}}]}),(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)("h2",{id:"api"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,e.tZ)("span",{className:"icon icon-link"})),"API"),(0,e.tZ)("h3",{id:"collapse"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#collapse"},(0,e.tZ)("span",{className:"icon icon-link"})),"Collapse"),(0,e.tZ)(a.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,n[6].value),(0,e.tZ)("th",null,n[7].value),(0,e.tZ)("th",null,n[8].value),(0,e.tZ)("th",null,n[9].value),(0,e.tZ)("th",null,n[10].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[11].value),(0,e.tZ)("td",null,n[12].value),(0,e.tZ)("td",null,n[13].value),(0,e.tZ)("td",null,n[14].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[15].value),(0,e.tZ)("td",null,n[16].value),(0,e.tZ)("td",null,n[17].value,(0,e.tZ)("br",null),n[18].value),(0,e.tZ)("td",null,n[19].value,(0,e.tZ)("code",null,n[20].value),n[21].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[22].value),(0,e.tZ)("td",null,n[23].value),(0,e.tZ)("td",null,n[24].value),(0,e.tZ)("td",null,n[25].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[26].value),(0,e.tZ)("td",null,n[27].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,n[28].value),n[29].value,(0,e.tZ)("code",null,n[30].value),n[31].value,(0,e.tZ)("code",null,n[32].value)),(0,e.tZ)("td",null,n[33].value),(0,e.tZ)("td",null,n[34].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[35].value),(0,e.tZ)("td",null,n[36].value),(0,e.tZ)("td",null,n[37].value,(0,e.tZ)("br",null),n[38].value),(0,e.tZ)("td",null,n[39].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[40].value),(0,e.tZ)("td",null,n[41].value),(0,e.tZ)("td",null,n[42].value),(0,e.tZ)("td",null,n[43].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[44].value),(0,e.tZ)("td",null,n[45].value),(0,e.tZ)("td",null,n[46].value),(0,e.tZ)("td",null,n[47].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[48].value),(0,e.tZ)("td",null,n[49].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,n[50].value),n[51].value,(0,e.tZ)("code",null,n[52].value)),(0,e.tZ)("td",null,n[53].value),(0,e.tZ)("td",null,n[54].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[55].value),(0,e.tZ)("td",null,n[56].value),(0,e.tZ)("td",null,n[57].value),(0,e.tZ)("td",null,n[58].value),(0,e.tZ)("td",null,n[59].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[60].value),(0,e.tZ)("td",null,n[61].value),(0,e.tZ)("td",null,n[62].value),(0,e.tZ)("td",null,n[63].value),(0,e.tZ)("td",null)))),(0,e.tZ)("h3",{id:"collapsepanel"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#collapsepanel"},(0,e.tZ)("span",{className:"icon icon-link"})),"Collapse.Panel"),(0,e.tZ)(a.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,n[64].value),(0,e.tZ)("th",null,n[65].value),(0,e.tZ)("th",null,n[66].value),(0,e.tZ)("th",null,n[67].value),(0,e.tZ)("th",null,n[68].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[69].value),(0,e.tZ)("td",null,n[70].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,n[71].value),n[72].value,(0,e.tZ)("code",null,n[73].value),n[74].value,(0,e.tZ)("code",null,n[75].value)),(0,e.tZ)("td",null,n[76].value),(0,e.tZ)("td",null,n[77].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[78].value),(0,e.tZ)("td",null,n[79].value),(0,e.tZ)("td",null,n[80].value),(0,e.tZ)("td",null,n[81].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[82].value),(0,e.tZ)("td",null,n[83].value),(0,e.tZ)("td",null,n[84].value),(0,e.tZ)("td",null,n[85].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[86].value),(0,e.tZ)("td",null,n[87].value),(0,e.tZ)("td",null,n[88].value),(0,e.tZ)("td",null,n[89].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[90].value),(0,e.tZ)("td",null,n[91].value),(0,e.tZ)("td",null,n[92].value),(0,e.tZ)("td",null,n[93].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[94].value),(0,e.tZ)("td",null,n[95].value),(0,e.tZ)("td",null,n[96].value),(0,e.tZ)("td",null,n[97].value),(0,e.tZ)("td",null)))))))}t.default=i}}]);
