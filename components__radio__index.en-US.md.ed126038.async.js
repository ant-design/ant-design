"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[1214],{26372:function(r,o,e){e.r(o);var p=e(2143),_=e(50250),v=e(59378),m=e(78190),c=e(74775),a=e(5937),R=e(2068),h=e(74399),Z=e(46004),g=e(35708),x=e(30138),B=e(56140),d=e(5388),b=e(49545),f=e(92169),C=e(13140),P=e(95127),E=e(74418),A=e(97119),l=e(28257),u=e(67294),n=e(13946);function i(){var s=(0,l.eL)(),t=s.texts;return(0,n.tZ)(l.dY,null,(0,n.tZ)(u.Fragment,null,(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("p",null,t[0].value),(0,n.tZ)("h2",{id:"when-to-use"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#when-to-use"},(0,n.tZ)("span",{className:"icon icon-link"})),"When To Use"),(0,n.tZ)("ul",null,(0,n.tZ)("li",null,t[1].value),(0,n.tZ)("li",null,t[2].value)),(0,n.tZ)("h2",{id:"examples"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#examples"},(0,n.tZ)("span",{className:"icon icon-link"})),"Examples")),(0,n.tZ)(d.Z,{items:[{demo:{id:"components-radio-demo-basic"},previewerProps:{title:"Basic",filename:"components/radio/demo/basic.tsx",jsx:`import React from 'react';
import { Radio } from 'antd';
const App = () => <Radio>Radio</Radio>;
export default App;
`,description:"<p>The simplest use.</p>"}},{demo:{id:"components-radio-demo-disabled"},previewerProps:{title:"disabled",filename:"components/radio/demo/disabled.tsx",jsx:`import React, { useState } from 'react';
import { Button, Radio } from 'antd';
const App = () => {
  const [disabled, setDisabled] = useState(true);
  const toggleDisabled = () => {
    setDisabled(!disabled);
  };
  return (
    <>
      <Radio defaultChecked={false} disabled={disabled}>
        Disabled
      </Radio>
      <Radio defaultChecked disabled={disabled}>
        Disabled
      </Radio>
      <br />
      <Button
        type="primary"
        onClick={toggleDisabled}
        style={{
          marginTop: 16,
        }}
      >
        Toggle disabled
      </Button>
    </>
  );
};
export default App;
`,description:"<p>Radio unavailable.</p>"}},{demo:{id:"components-radio-demo-radiogroup"},previewerProps:{title:"Radio Group",filename:"components/radio/demo/radiogroup.tsx",jsx:`import React, { useState } from 'react';
import { Radio } from 'antd';
const App = () => {
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  return (
    <Radio.Group onChange={onChange} value={value}>
      <Radio value={1}>A</Radio>
      <Radio value={2}>B</Radio>
      <Radio value={3}>C</Radio>
      <Radio value={4}>D</Radio>
    </Radio.Group>
  );
};
export default App;
`,description:"<p>A group of radio components.</p>"}},{demo:{id:"components-radio-demo-radiogroup-more"},previewerProps:{title:"Vertical Radio.Group",filename:"components/radio/demo/radiogroup-more.tsx",jsx:`import React, { useState } from 'react';
import { Input, Radio, Space } from 'antd';
const App = () => {
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  return (
    <Radio.Group onChange={onChange} value={value}>
      <Space direction="vertical">
        <Radio value={1}>Option A</Radio>
        <Radio value={2}>Option B</Radio>
        <Radio value={3}>Option C</Radio>
        <Radio value={4}>
          More...
          {value === 4 ? (
            <Input
              style={{
                width: 100,
                marginLeft: 10,
              }}
            />
          ) : null}
        </Radio>
      </Space>
    </Radio.Group>
  );
};
export default App;
`,description:"<p>Vertical Radio.Group, with more radios.</p>"}},{demo:{id:"components-radio-demo-radiogroup-options"},previewerProps:{title:"Radio.Group group - optional",filename:"components/radio/demo/radiogroup-options.tsx",jsx:`import React, { useState } from 'react';
import { Radio } from 'antd';
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
    disabled: true,
  },
];
const App = () => {
  const [value1, setValue1] = useState('Apple');
  const [value2, setValue2] = useState('Apple');
  const [value3, setValue3] = useState('Apple');
  const [value4, setValue4] = useState('Apple');
  const onChange1 = ({ target: { value } }) => {
    console.log('radio1 checked', value);
    setValue1(value);
  };
  const onChange2 = ({ target: { value } }) => {
    console.log('radio2 checked', value);
    setValue2(value);
  };
  const onChange3 = ({ target: { value } }) => {
    console.log('radio3 checked', value);
    setValue3(value);
  };
  const onChange4 = ({ target: { value } }) => {
    console.log('radio4 checked', value);
    setValue4(value);
  };
  return (
    <>
      <Radio.Group options={plainOptions} onChange={onChange1} value={value1} />
      <br />
      <Radio.Group options={optionsWithDisabled} onChange={onChange2} value={value2} />
      <br />
      <br />
      <Radio.Group options={options} onChange={onChange3} value={value3} optionType="button" />
      <br />
      <br />
      <Radio.Group
        options={optionsWithDisabled}
        onChange={onChange4}
        value={value4}
        optionType="button"
        buttonStyle="solid"
      />
    </>
  );
};
export default App;
`,description:"<p>Render radios by configuring <code>options</code>. Radio type can also be set through the <code>optionType</code> parameter.</p>"}},{demo:{id:"components-radio-demo-radiobutton"},previewerProps:{title:"radio style",filename:"components/radio/demo/radiobutton.tsx",jsx:`import React from 'react';
import { Radio } from 'antd';
const onChange = (e) => {
  console.log(\`radio checked:\${e.target.value}\`);
};
const App = () => (
  <>
    <Radio.Group onChange={onChange} defaultValue="a">
      <Radio.Button value="a">Hangzhou</Radio.Button>
      <Radio.Button value="b">Shanghai</Radio.Button>
      <Radio.Button value="c">Beijing</Radio.Button>
      <Radio.Button value="d">Chengdu</Radio.Button>
    </Radio.Group>
    <Radio.Group
      onChange={onChange}
      defaultValue="a"
      style={{
        marginTop: 16,
      }}
    >
      <Radio.Button value="a">Hangzhou</Radio.Button>
      <Radio.Button value="b" disabled>
        Shanghai
      </Radio.Button>
      <Radio.Button value="c">Beijing</Radio.Button>
      <Radio.Button value="d">Chengdu</Radio.Button>
    </Radio.Group>
    <Radio.Group
      disabled
      onChange={onChange}
      defaultValue="a"
      style={{
        marginTop: 16,
      }}
    >
      <Radio.Button value="a">Hangzhou</Radio.Button>
      <Radio.Button value="b">Shanghai</Radio.Button>
      <Radio.Button value="c">Beijing</Radio.Button>
      <Radio.Button value="d">Chengdu</Radio.Button>
    </Radio.Group>
  </>
);
export default App;
`,description:"<p>The combination of radio button style.</p>"}},{demo:{id:"components-radio-demo-radiogroup-with-name"},previewerProps:{title:"Radio.Group with name",filename:"components/radio/demo/radiogroup-with-name.tsx",jsx:`import React from 'react';
import { Radio } from 'antd';
const App = () => (
  <Radio.Group name="radiogroup" defaultValue={1}>
    <Radio value={1}>A</Radio>
    <Radio value={2}>B</Radio>
    <Radio value={3}>C</Radio>
    <Radio value={4}>D</Radio>
  </Radio.Group>
);
export default App;
`,description:'<p>Passing the <code>name</code> property to all <code>input[type="radio"]</code> that are in the same Radio.Group. It is usually used to let the browser see your Radio.Group as a real "group" and keep the default behavior. For example, using left/right keyboard arrow to change your selection that in the same Radio.Group.</p>'}},{demo:{id:"components-radio-demo-size"},previewerProps:{title:"Size",filename:"components/radio/demo/size.tsx",jsx:`import React from 'react';
import { Radio } from 'antd';
const App = () => (
  <>
    <Radio.Group defaultValue="a" size="large">
      <Radio.Button value="a">Hangzhou</Radio.Button>
      <Radio.Button value="b">Shanghai</Radio.Button>
      <Radio.Button value="c">Beijing</Radio.Button>
      <Radio.Button value="d">Chengdu</Radio.Button>
    </Radio.Group>
    <Radio.Group
      defaultValue="a"
      style={{
        marginTop: 16,
      }}
    >
      <Radio.Button value="a">Hangzhou</Radio.Button>
      <Radio.Button value="b">Shanghai</Radio.Button>
      <Radio.Button value="c">Beijing</Radio.Button>
      <Radio.Button value="d">Chengdu</Radio.Button>
    </Radio.Group>
    <Radio.Group
      defaultValue="a"
      size="small"
      style={{
        marginTop: 16,
      }}
    >
      <Radio.Button value="a">Hangzhou</Radio.Button>
      <Radio.Button value="b">Shanghai</Radio.Button>
      <Radio.Button value="c">Beijing</Radio.Button>
      <Radio.Button value="d">Chengdu</Radio.Button>
    </Radio.Group>
  </>
);
export default App;
`,description:"<p>There are three sizes available: large, medium, and small. It can coordinate with input box.</p>"}},{demo:{id:"components-radio-demo-radiobutton-solid"},previewerProps:{title:"Solid radio button",filename:"components/radio/demo/radiobutton-solid.tsx",jsx:`import React from 'react';
import { Radio } from 'antd';
const App = () => (
  <>
    <Radio.Group defaultValue="a" buttonStyle="solid">
      <Radio.Button value="a">Hangzhou</Radio.Button>
      <Radio.Button value="b">Shanghai</Radio.Button>
      <Radio.Button value="c">Beijing</Radio.Button>
      <Radio.Button value="d">Chengdu</Radio.Button>
    </Radio.Group>
    <Radio.Group
      defaultValue="c"
      buttonStyle="solid"
      style={{
        marginTop: 16,
      }}
    >
      <Radio.Button value="a">Hangzhou</Radio.Button>
      <Radio.Button value="b" disabled>
        Shanghai
      </Radio.Button>
      <Radio.Button value="c">Beijing</Radio.Button>
      <Radio.Button value="d">Chengdu</Radio.Button>
    </Radio.Group>
  </>
);
export default App;
`,description:"<p>Solid radio button style.</p>"}},{demo:{id:"components-radio-demo-badge"},previewerProps:{debug:!0,title:"\u6D4B\u8BD5 Badge \u7684\u6837\u5F0F",filename:"components/radio/demo/badge.tsx",jsx:`import React from 'react';
import { Badge, Radio } from 'antd';
const App = () => (
  <Radio.Group buttonStyle="solid">
    <Badge count={1}>
      <Radio.Button value={1}>Click Me</Radio.Button>
    </Badge>
    <Badge count={2}>
      <Radio.Button value={2}>Not Me</Radio.Button>
    </Badge>
  </Radio.Group>
);
export default App;
`,description:"<p>Test Badge style.</p>"}}]}),(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("h2",{id:"api"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,n.tZ)("span",{className:"icon icon-link"})),"API"),(0,n.tZ)("h3",{id:"radioradiobutton"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#radioradiobutton"},(0,n.tZ)("span",{className:"icon icon-link"})),"Radio/Radio.Button"),(0,n.tZ)(a.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,t[3].value),(0,n.tZ)("th",null,t[4].value),(0,n.tZ)("th",null,t[5].value),(0,n.tZ)("th",null,t[6].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[7].value),(0,n.tZ)("td",null,t[8].value),(0,n.tZ)("td",null,t[9].value),(0,n.tZ)("td",null,t[10].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[11].value),(0,n.tZ)("td",null,t[12].value),(0,n.tZ)("td",null,t[13].value),(0,n.tZ)("td",null,t[14].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[15].value),(0,n.tZ)("td",null,t[16].value),(0,n.tZ)("td",null,t[17].value),(0,n.tZ)("td",null,t[18].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[19].value),(0,n.tZ)("td",null,t[20].value),(0,n.tZ)("td",null,t[21].value),(0,n.tZ)("td",null,t[22].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[23].value),(0,n.tZ)("td",null,t[24].value),(0,n.tZ)("td",null,t[25].value),(0,n.tZ)("td",null,t[26].value)))),(0,n.tZ)("h3",{id:"radiogroup"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#radiogroup"},(0,n.tZ)("span",{className:"icon icon-link"})),"RadioGroup"),(0,n.tZ)("p",null,t[27].value,(0,n.tZ)("code",null,t[28].value),t[29].value),(0,n.tZ)(a.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,t[30].value),(0,n.tZ)("th",null,t[31].value),(0,n.tZ)("th",null,t[32].value),(0,n.tZ)("th",null,t[33].value),(0,n.tZ)("th",null,t[34].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[35].value),(0,n.tZ)("td",null,t[36].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[37].value),t[38].value,(0,n.tZ)("code",null,t[39].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[40].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[41].value),(0,n.tZ)("td",null,t[42].value),(0,n.tZ)("td",null,t[43].value),(0,n.tZ)("td",null,t[44].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[45].value),(0,n.tZ)("td",null,t[46].value),(0,n.tZ)("td",null,t[47].value),(0,n.tZ)("td",null,t[48].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[49].value),(0,n.tZ)("td",null,t[50].value,(0,n.tZ)("code",null,t[51].value),t[52].value,(0,n.tZ)("code",null,t[53].value),t[54].value),(0,n.tZ)("td",null,t[55].value),(0,n.tZ)("td",null,t[56].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[57].value),(0,n.tZ)("td",null,t[58].value),(0,n.tZ)("td",null,t[59].value),(0,n.tZ)("td",null,t[60].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[61].value),(0,n.tZ)("td",null,t[62].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[63].value),t[64].value,(0,n.tZ)("code",null,t[65].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[66].value)),(0,n.tZ)("td",null,t[67].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[68].value),(0,n.tZ)("td",null,t[69].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[70].value),t[71].value,(0,n.tZ)("code",null,t[72].value),t[73].value,(0,n.tZ)("code",null,t[74].value)),(0,n.tZ)("td",null,t[75].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[76].value),(0,n.tZ)("td",null,t[77].value),(0,n.tZ)("td",null,t[78].value),(0,n.tZ)("td",null,t[79].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[80].value),(0,n.tZ)("td",null,t[81].value),(0,n.tZ)("td",null,t[82].value),(0,n.tZ)("td",null,t[83].value),(0,n.tZ)("td",null)))),(0,n.tZ)("h2",{id:"methods"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#methods"},(0,n.tZ)("span",{className:"icon icon-link"})),"Methods"),(0,n.tZ)("h3",{id:"radio"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#radio"},(0,n.tZ)("span",{className:"icon icon-link"})),"Radio"),(0,n.tZ)(a.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,t[84].value),(0,n.tZ)("th",null,t[85].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[86].value),(0,n.tZ)("td",null,t[87].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[88].value),(0,n.tZ)("td",null,t[89].value)))))))}o.default=i}}]);
