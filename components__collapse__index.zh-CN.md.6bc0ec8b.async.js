"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[4781],{29052:function(p,t,l){l.r(t);var r=l(2143),c=l(50250),_=l(59378),m=l(78190),h=l(74775),a=l(5937),x=l(2068),v=l(74399),Z=l(46004),P=l(35708),f=l(30138),C=l(56140),s=l(5388),y=l(49545),g=l(92169),E=l(13140),A=l(95127),T=l(74418),O=l(97119),o=l(28257),d=l(67294),e=l(13946);function i(){var u=(0,o.eL)(),n=u.texts;return(0,e.tZ)(o.dY,null,(0,e.tZ)(d.Fragment,null,(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)("p",null,n[0].value),(0,e.tZ)("h2",{id:"\u4F55\u65F6\u4F7F\u7528"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F55\u65F6\u4F7F\u7528"},(0,e.tZ)("span",{className:"icon icon-link"})),"\u4F55\u65F6\u4F7F\u7528"),(0,e.tZ)("ul",null,(0,e.tZ)("li",null,n[1].value),(0,e.tZ)("li",null,(0,e.tZ)("code",null,n[2].value),n[3].value)),(0,e.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,e.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,e.tZ)(s.Z,{items:[{demo:{id:"components-collapse-demo-basic"},previewerProps:{title:"\u6298\u53E0\u9762\u677F",filename:"components/collapse/demo/basic.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u53EF\u4EE5\u540C\u65F6\u5C55\u5F00\u591A\u4E2A\u9762\u677F\uFF0C\u8FD9\u4E2A\u4F8B\u5B50\u9ED8\u8BA4\u5C55\u5F00\u4E86\u7B2C\u4E00\u4E2A\u3002</p>",style:`[data-theme="compact"] p, p {
  margin: 0;
}`}},{demo:{id:"components-collapse-demo-accordion"},previewerProps:{title:"\u624B\u98CE\u7434",filename:"components/collapse/demo/accordion.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u624B\u98CE\u7434\uFF0C\u6BCF\u6B21\u53EA\u6253\u5F00\u4E00\u4E2A tab\u3002</p>"}},{demo:{id:"components-collapse-demo-mix"},previewerProps:{title:"\u9762\u677F\u5D4C\u5957",filename:"components/collapse/demo/mix.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u5D4C\u5957\u6298\u53E0\u9762\u677F\u3002</p>"}},{demo:{id:"components-collapse-demo-borderless"},previewerProps:{title:"\u7B80\u6D01\u98CE\u683C",filename:"components/collapse/demo/borderless.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u4E00\u5957\u6CA1\u6709\u8FB9\u6846\u7684\u7B80\u6D01\u6837\u5F0F\u3002</p>"}},{demo:{id:"components-collapse-demo-custom"},previewerProps:{title:"\u81EA\u5B9A\u4E49\u9762\u677F",filename:"components/collapse/demo/custom.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u81EA\u5B9A\u4E49\u5404\u4E2A\u9762\u677F\u7684\u80CC\u666F\u8272\u3001\u5706\u89D2\u3001\u8FB9\u8DDD\u548C\u56FE\u6807\u3002</p>",style:`[data-theme='compact'] .site-collapse-custom-collapse .site-collapse-custom-panel,
.site-collapse-custom-collapse .site-collapse-custom-panel {
  margin-bottom: 24px;
  overflow: hidden;
  background: #f7f7f7;
  border: 0px !important;
  border-radius: 2px;
}`}},{demo:{id:"components-collapse-demo-noarrow"},previewerProps:{title:"\u9690\u85CF\u7BAD\u5934",filename:"components/collapse/demo/noarrow.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u4F60\u53EF\u4EE5\u901A\u8FC7 <code>showArrow={false}</code> \u9690\u85CF <code>CollapsePanel</code> \u7EC4\u4EF6\u7684\u7BAD\u5934\u56FE\u6807\u3002</p>"}},{demo:{id:"components-collapse-demo-extra"},previewerProps:{title:"\u989D\u5916\u8282\u70B9",filename:"components/collapse/demo/extra.tsx",jsx:`import React, { useState } from 'react';
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
`,description:"<p>\u53EF\u4EE5\u540C\u65F6\u5C55\u5F00\u591A\u4E2A\u9762\u677F\uFF0C\u8FD9\u4E2A\u4F8B\u5B50\u9ED8\u8BA4\u5C55\u5F00\u4E86\u7B2C\u4E00\u4E2A\u3002</p>"}},{demo:{id:"components-collapse-demo-ghost"},previewerProps:{title:"\u5E7D\u7075\u6298\u53E0\u9762\u677F",filename:"components/collapse/demo/ghost.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u5C06\u6298\u53E0\u9762\u677F\u7684\u80CC\u666F\u53D8\u6210\u900F\u660E\u3002</p>"}},{demo:{id:"components-collapse-demo-collapsible"},previewerProps:{title:"\u53EF\u6298\u53E0\u89E6\u53D1\u533A\u57DF",filename:"components/collapse/demo/collapsible.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u901A\u8FC7 <code>collapsible</code> \u5C5E\u6027\uFF0C\u53EF\u4EE5\u8BBE\u7F6E\u9762\u677F\u7684\u53EF\u6298\u53E0\u89E6\u53D1\u533A\u57DF\u3002</p>",style:`[data-theme="compact"] p, p {
  margin: 0;
}
#components-collapse-demo-collapsible .ant-space {
  width: 100%;
}`}}]}),(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)("h2",{id:"api"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,e.tZ)("span",{className:"icon icon-link"})),"API"),(0,e.tZ)("h3",{id:"collapse"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#collapse"},(0,e.tZ)("span",{className:"icon icon-link"})),"Collapse"),(0,e.tZ)(a.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,n[4].value),(0,e.tZ)("th",null,n[5].value),(0,e.tZ)("th",null,n[6].value),(0,e.tZ)("th",null,n[7].value),(0,e.tZ)("th",null,n[8].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[9].value),(0,e.tZ)("td",null,n[10].value),(0,e.tZ)("td",null,n[11].value),(0,e.tZ)("td",null,n[12].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[13].value),(0,e.tZ)("td",null,n[14].value),(0,e.tZ)("td",null,n[15].value,(0,e.tZ)("br",null),n[16].value),(0,e.tZ)("td",null,n[17].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[18].value),(0,e.tZ)("td",null,n[19].value),(0,e.tZ)("td",null,n[20].value),(0,e.tZ)("td",null,n[21].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[22].value),(0,e.tZ)("td",null,n[23].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,n[24].value),n[25].value,(0,e.tZ)("code",null,n[26].value),n[27].value,(0,e.tZ)("code",null,n[28].value)),(0,e.tZ)("td",null,n[29].value),(0,e.tZ)("td",null,n[30].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[31].value),(0,e.tZ)("td",null,n[32].value),(0,e.tZ)("td",null,n[33].value,(0,e.tZ)("br",null),n[34].value),(0,e.tZ)("td",null,n[35].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[36].value),(0,e.tZ)("td",null,n[37].value),(0,e.tZ)("td",null,n[38].value),(0,e.tZ)("td",null,n[39].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[40].value),(0,e.tZ)("td",null,n[41].value),(0,e.tZ)("td",null,n[42].value),(0,e.tZ)("td",null,n[43].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[44].value),(0,e.tZ)("td",null,n[45].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,n[46].value),n[47].value,(0,e.tZ)("code",null,n[48].value)),(0,e.tZ)("td",null,n[49].value),(0,e.tZ)("td",null,n[50].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[51].value),(0,e.tZ)("td",null,n[52].value),(0,e.tZ)("td",null,n[53].value),(0,e.tZ)("td",null,n[54].value),(0,e.tZ)("td",null,n[55].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[56].value),(0,e.tZ)("td",null,n[57].value),(0,e.tZ)("td",null,n[58].value),(0,e.tZ)("td",null,n[59].value),(0,e.tZ)("td",null)))),(0,e.tZ)("h3",{id:"collapsepanel"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#collapsepanel"},(0,e.tZ)("span",{className:"icon icon-link"})),"Collapse.Panel"),(0,e.tZ)(a.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,n[60].value),(0,e.tZ)("th",null,n[61].value),(0,e.tZ)("th",null,n[62].value),(0,e.tZ)("th",null,n[63].value),(0,e.tZ)("th",null,n[64].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[65].value),(0,e.tZ)("td",null,n[66].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,n[67].value),n[68].value,(0,e.tZ)("code",null,n[69].value),n[70].value,(0,e.tZ)("code",null,n[71].value)),(0,e.tZ)("td",null,n[72].value),(0,e.tZ)("td",null,n[73].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[74].value),(0,e.tZ)("td",null,n[75].value),(0,e.tZ)("td",null,n[76].value),(0,e.tZ)("td",null,n[77].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[78].value),(0,e.tZ)("td",null,n[79].value),(0,e.tZ)("td",null,n[80].value),(0,e.tZ)("td",null,n[81].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[82].value),(0,e.tZ)("td",null,n[83].value),(0,e.tZ)("td",null,n[84].value),(0,e.tZ)("td",null,n[85].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[86].value),(0,e.tZ)("td",null,n[87].value),(0,e.tZ)("td",null,n[88].value),(0,e.tZ)("td",null,n[89].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[90].value),(0,e.tZ)("td",null,n[91].value),(0,e.tZ)("td",null,n[92].value),(0,e.tZ)("td",null,n[93].value),(0,e.tZ)("td",null)))))))}t.default=i}}]);
