"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[751],{37951:function(_,a,t){t.r(a);var r=t(2143),h=t(50250),p=t(59378),x=t(78190),d=t(74775),l=t(5937),m=t(2068),Z=t(74399),v=t(46004),C=t(35708),k=t(30138),b=t(56140),s=t(5388),g=t(49545),E=t(92169),P=t(13140),f=t(95127),A=t(74418),D=t(97119),o=t(28257),u=t(67294),e=t(13946);function i(){var c=(0,o.eL)(),n=c.texts;return(0,e.tZ)(o.dY,null,(0,e.tZ)(u.Fragment,null,(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)("p",null,n[0].value),(0,e.tZ)("h2",{id:"\u4F55\u65F6\u4F7F\u7528"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F55\u65F6\u4F7F\u7528"},(0,e.tZ)("span",{className:"icon icon-link"})),"\u4F55\u65F6\u4F7F\u7528"),(0,e.tZ)("ul",null,(0,e.tZ)("li",null,n[1].value),(0,e.tZ)("li",null,n[2].value,(0,e.tZ)("code",null,n[3].value),n[4].value,(0,e.tZ)("code",null,n[5].value),n[6].value,(0,e.tZ)("code",null,n[7].value),n[8].value)),(0,e.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,e.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,e.tZ)(s.Z,{items:[{demo:{id:"components-checkbox-demo-basic"},previewerProps:{title:"\u57FA\u672C\u7528\u6CD5",filename:"components/checkbox/demo/basic.tsx",jsx:`import React from 'react';
import { Checkbox } from 'antd';
const onChange = (e) => {
  console.log(\`checked = \${e.target.checked}\`);
};
const App = () => <Checkbox onChange={onChange}>Checkbox</Checkbox>;
export default App;
`,description:"<p>\u7B80\u5355\u7684 checkbox\u3002</p>"}},{demo:{id:"components-checkbox-demo-disabled"},previewerProps:{title:"\u4E0D\u53EF\u7528",filename:"components/checkbox/demo/disabled.tsx",jsx:`import React from 'react';
import { Checkbox } from 'antd';
const App = () => (
  <>
    <Checkbox defaultChecked={false} disabled />
    <br />
    <Checkbox defaultChecked disabled />
  </>
);
export default App;
`,description:"<p>checkbox \u4E0D\u53EF\u7528\u3002</p>"}},{demo:{id:"components-checkbox-demo-controller"},previewerProps:{title:"\u53D7\u63A7\u7684 Checkbox",filename:"components/checkbox/demo/controller.tsx",jsx:`import React, { useState } from 'react';
import { Button, Checkbox } from 'antd';
const App = () => {
  const [checked, setChecked] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const toggleChecked = () => {
    setChecked(!checked);
  };
  const toggleDisable = () => {
    setDisabled(!disabled);
  };
  const onChange = (e) => {
    console.log('checked = ', e.target.checked);
    setChecked(e.target.checked);
  };
  const label = \`\${checked ? 'Checked' : 'Unchecked'}-\${disabled ? 'Disabled' : 'Enabled'}\`;
  return (
    <>
      <p
        style={{
          marginBottom: '20px',
        }}
      >
        <Checkbox checked={checked} disabled={disabled} onChange={onChange}>
          {label}
        </Checkbox>
      </p>
      <p>
        <Button type="primary" size="small" onClick={toggleChecked}>
          {!checked ? 'Check' : 'Uncheck'}
        </Button>
        <Button
          style={{
            margin: '0 10px',
          }}
          type="primary"
          size="small"
          onClick={toggleDisable}
        >
          {!disabled ? 'Disable' : 'Enable'}
        </Button>
      </p>
    </>
  );
};
export default App;
`,description:"<p>\u8054\u52A8 checkbox\u3002</p>"}},{demo:{id:"components-checkbox-demo-group"},previewerProps:{title:"Checkbox \u7EC4",filename:"components/checkbox/demo/group.tsx",jsx:`import React from 'react';
import { Checkbox } from 'antd';
const onChange = (checkedValues) => {
  console.log('checked = ', checkedValues);
};
const plainOptions = ['Apple', 'Pear', 'Orange'];
const options = [
  {
    label: 'Apple',
    value: 'Apple',
  },
  {
    label: 'Pear',
    value: 'Pear',
  },
  {
    label: 'Orange',
    value: 'Orange',
  },
];
const optionsWithDisabled = [
  {
    label: 'Apple',
    value: 'Apple',
  },
  {
    label: 'Pear',
    value: 'Pear',
  },
  {
    label: 'Orange',
    value: 'Orange',
    disabled: false,
  },
];
const App = () => (
  <>
    <Checkbox.Group options={plainOptions} defaultValue={['Apple']} onChange={onChange} />
    <br />
    <br />
    <Checkbox.Group options={options} defaultValue={['Pear']} onChange={onChange} />
    <br />
    <br />
    <Checkbox.Group
      options={optionsWithDisabled}
      disabled
      defaultValue={['Apple']}
      onChange={onChange}
    />
  </>
);
export default App;
`,description:"<p>\u65B9\u4FBF\u7684\u4ECE\u6570\u7EC4\u751F\u6210 Checkbox \u7EC4\u3002</p>"}},{demo:{id:"components-checkbox-demo-check-all"},previewerProps:{title:"\u5168\u9009",filename:"components/checkbox/demo/check-all.tsx",jsx:`import React, { useState } from 'react';
import { Checkbox, Divider } from 'antd';
const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];
const App = () => {
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const onChange = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };
  return (
    <>
      <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
        Check all
      </Checkbox>
      <Divider />
      <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
    </>
  );
};
export default App;
`,description:"<p>\u5728\u5B9E\u73B0\u5168\u9009\u6548\u679C\u65F6\uFF0C\u4F60\u53EF\u80FD\u4F1A\u7528\u5230 <code>indeterminate</code> \u5C5E\u6027\u3002</p>"}},{demo:{id:"components-checkbox-demo-layout"},previewerProps:{title:"\u5E03\u5C40",filename:"components/checkbox/demo/layout.tsx",jsx:`import React from 'react';
import { Checkbox, Col, Row } from 'antd';
const onChange = (checkedValues) => {
  console.log('checked = ', checkedValues);
};
const App = () => (
  <Checkbox.Group
    style={{
      width: '100%',
    }}
    onChange={onChange}
  >
    <Row>
      <Col span={8}>
        <Checkbox value="A">A</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="B">B</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="C">C</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="D">D</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="E">E</Checkbox>
      </Col>
    </Row>
  </Checkbox.Group>
);
export default App;
`,description:"<p>Checkbox.Group \u5185\u5D4C Checkbox \u5E76\u4E0E Grid \u7EC4\u4EF6\u4E00\u8D77\u4F7F\u7528\uFF0C\u53EF\u4EE5\u5B9E\u73B0\u7075\u6D3B\u7684\u5E03\u5C40\u3002</p>"}},{demo:{id:"components-checkbox-demo-debug-line"},previewerProps:{debug:!0,title:"\u540C\u884C\u5E03\u5C40",filename:"components/checkbox/demo/debug-line.tsx",jsx:`import React from 'react';
import { Checkbox, Radio, Space } from 'antd';
const sharedStyle = {
  border: '1px solid red',
  marginBottom: 16,
};
const App = () => (
  <div>
    <Space style={sharedStyle} align="center">
      <Checkbox value="light" />
      <div>Bamboo</div>
      <Checkbox value="little">Little</Checkbox>
    </Space>

    <Space style={sharedStyle} align="center">
      <Radio value="light" />
      <div>Bamboo</div>
      <Radio value="little">Little</Radio>
    </Space>

    <div
      style={{
        ...sharedStyle,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Checkbox value="light" />
      <div>Bamboo</div>
      <Checkbox value="little">Little</Checkbox>
    </div>

    <div
      style={{
        ...sharedStyle,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Radio value="light" />
      <div>Bamboo</div>
      <Radio value="little">Little</Radio>
    </div>
  </div>
);
export default App;
`,description:"<p>\u540C\u884C\u5E03\u5C40</p>"}}]}),(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)("h2",{id:"api"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,e.tZ)("span",{className:"icon icon-link"})),"API"),(0,e.tZ)("h3",{id:"\u5C5E\u6027"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u5C5E\u6027"},(0,e.tZ)("span",{className:"icon icon-link"})),"\u5C5E\u6027"),(0,e.tZ)("h4",{id:"checkbox"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#checkbox"},(0,e.tZ)("span",{className:"icon icon-link"})),"Checkbox"),(0,e.tZ)(l.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,n[9].value),(0,e.tZ)("th",null,n[10].value),(0,e.tZ)("th",null,n[11].value),(0,e.tZ)("th",null,n[12].value),(0,e.tZ)("th",null,n[13].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[14].value),(0,e.tZ)("td",null,n[15].value),(0,e.tZ)("td",null,n[16].value),(0,e.tZ)("td",null,n[17].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[18].value),(0,e.tZ)("td",null,n[19].value),(0,e.tZ)("td",null,n[20].value),(0,e.tZ)("td",null,n[21].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[22].value),(0,e.tZ)("td",null,n[23].value),(0,e.tZ)("td",null,n[24].value),(0,e.tZ)("td",null,n[25].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[26].value),(0,e.tZ)("td",null,n[27].value),(0,e.tZ)("td",null,n[28].value),(0,e.tZ)("td",null,n[29].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[30].value),(0,e.tZ)("td",null,n[31].value),(0,e.tZ)("td",null,n[32].value),(0,e.tZ)("td",null,n[33].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[34].value),(0,e.tZ)("td",null,n[35].value),(0,e.tZ)("td",null,n[36].value),(0,e.tZ)("td",null,n[37].value),(0,e.tZ)("td",null)))),(0,e.tZ)("h4",{id:"checkbox-group"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#checkbox-group"},(0,e.tZ)("span",{className:"icon icon-link"})),"Checkbox Group"),(0,e.tZ)(l.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,n[38].value),(0,e.tZ)("th",null,n[39].value),(0,e.tZ)("th",null,n[40].value),(0,e.tZ)("th",null,n[41].value),(0,e.tZ)("th",null,n[42].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[43].value),(0,e.tZ)("td",null,n[44].value),(0,e.tZ)("td",null,n[45].value),(0,e.tZ)("td",null,n[46].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[47].value),(0,e.tZ)("td",null,n[48].value),(0,e.tZ)("td",null,n[49].value),(0,e.tZ)("td",null,n[50].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[51].value),(0,e.tZ)("td",null,n[52].value,(0,e.tZ)("code",null,n[53].value),n[54].value,(0,e.tZ)("code",null,n[55].value),n[56].value),(0,e.tZ)("td",null,n[57].value),(0,e.tZ)("td",null,n[58].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[59].value),(0,e.tZ)("td",null,n[60].value),(0,e.tZ)("td",null,n[61].value),(0,e.tZ)("td",null,n[62].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[63].value),(0,e.tZ)("td",null,n[64].value),(0,e.tZ)("td",null,n[65].value),(0,e.tZ)("td",null,n[66].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[67].value),(0,e.tZ)("td",null,n[68].value),(0,e.tZ)("td",null,n[69].value),(0,e.tZ)("td",null,n[70].value),(0,e.tZ)("td",null)))),(0,e.tZ)("h5",{id:"option"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#option"},(0,e.tZ)("span",{className:"icon icon-link"})),"Option"),(0,e.tZ)(d.Z,{lang:"typescript"},n[71].value),(0,e.tZ)("h3",{id:"\u65B9\u6CD5"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u65B9\u6CD5"},(0,e.tZ)("span",{className:"icon icon-link"})),"\u65B9\u6CD5"),(0,e.tZ)("h4",{id:"checkbox-1"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#checkbox-1"},(0,e.tZ)("span",{className:"icon icon-link"})),"Checkbox"),(0,e.tZ)(l.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,n[72].value),(0,e.tZ)("th",null,n[73].value),(0,e.tZ)("th",null,n[74].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[75].value),(0,e.tZ)("td",null,n[76].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[77].value),(0,e.tZ)("td",null,n[78].value),(0,e.tZ)("td",null)))))))}a.default=i}}]);
