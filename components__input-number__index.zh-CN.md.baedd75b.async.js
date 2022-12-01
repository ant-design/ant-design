"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[6767],{13119:function(s,l,t){t.r(l);var p=t(2143),m=t(50250),c=t(59378),_=t(78190),v=t(74775),u=t(5937),Z=t(2068),x=t(74399),b=t(46004),f=t(35708),h=t(30138),E=t(56140),o=t(5388),g=t(49545),I=t(92169),A=t(13140),C=t(95127),P=t(74418),O=t(97119),a=t(28257),d=t(67294),n=t(13946);function r(){var i=(0,a.eL)(),e=i.texts;return(0,n.tZ)(a.dY,null,(0,n.tZ)(d.Fragment,null,(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("p",null,e[0].value),(0,n.tZ)("h2",{id:"\u4F55\u65F6\u4F7F\u7528"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F55\u65F6\u4F7F\u7528"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4F55\u65F6\u4F7F\u7528"),(0,n.tZ)("p",null,e[1].value),(0,n.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,n.tZ)(o.Z,{items:[{demo:{id:"components-input-number-demo-basic"},previewerProps:{title:"\u57FA\u672C",filename:"components/input-number/demo/basic.tsx",jsx:`import React from 'react';
import { InputNumber } from 'antd';
const onChange = (value) => {
  console.log('changed', value);
};
const App = () => <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />;
export default App;
`,description:"<p>\u6570\u5B57\u8F93\u5165\u6846\u3002</p>"}},{demo:{id:"components-input-number-demo-size"},previewerProps:{title:"\u4E09\u79CD\u5927\u5C0F",filename:"components/input-number/demo/size.tsx",jsx:`import React from 'react';
import { InputNumber, Space } from 'antd';
const onChange = (value) => {
  console.log('changed', value);
};
const App = () => (
  <Space>
    <InputNumber size="large" min={1} max={100000} defaultValue={3} onChange={onChange} />
    <InputNumber min={1} max={100000} defaultValue={3} onChange={onChange} />
    <InputNumber size="small" min={1} max={100000} defaultValue={3} onChange={onChange} />
  </Space>
);
export default App;
`,description:"<p>\u4E09\u79CD\u5927\u5C0F\u7684\u6570\u5B57\u8F93\u5165\u6846\uFF0C\u5F53 size \u5206\u522B\u4E3A <code>large</code> \u548C <code>small</code> \u65F6\uFF0C\u8F93\u5165\u6846\u9AD8\u5EA6\u4E3A <code>40px</code> \u548C <code>24px</code> \uFF0C\u9ED8\u8BA4\u9AD8\u5EA6\u4E3A <code>32px</code>\u3002</p>"}},{demo:{id:"components-input-number-demo-addon"},previewerProps:{title:"\u524D\u7F6E/\u540E\u7F6E\u6807\u7B7E",filename:"components/input-number/demo/addon.tsx",jsx:`import React from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Cascader, InputNumber, Select, Space } from 'antd';
const { Option } = Select;
const selectBefore = (
  <Select
    defaultValue="add"
    style={{
      width: 60,
    }}
  >
    <Option value="add">+</Option>
    <Option value="minus">-</Option>
  </Select>
);
const selectAfter = (
  <Select
    defaultValue="USD"
    style={{
      width: 60,
    }}
  >
    <Option value="USD">$</Option>
    <Option value="EUR">\u20AC</Option>
    <Option value="GBP">\xA3</Option>
    <Option value="CNY">\xA5</Option>
  </Select>
);
const App = () => (
  <Space direction="vertical">
    <InputNumber addonBefore="+" addonAfter="$" defaultValue={100} />
    <InputNumber addonBefore={selectBefore} addonAfter={selectAfter} defaultValue={100} />
    <InputNumber addonAfter={<SettingOutlined />} defaultValue={100} />
    <InputNumber
      addonBefore={
        <Cascader
          placeholder="cascader"
          style={{
            width: 150,
          }}
        />
      }
      defaultValue={100}
    />
  </Space>
);
export default App;
`,description:"<p>\u7528\u4E8E\u914D\u7F6E\u4E00\u4E9B\u56FA\u5B9A\u7EC4\u5408\u3002</p>"}},{demo:{id:"components-input-number-demo-disabled"},previewerProps:{title:"\u4E0D\u53EF\u7528",filename:"components/input-number/demo/disabled.tsx",jsx:`import React, { useState } from 'react';
import { Button, InputNumber } from 'antd';
const App = () => {
  const [disabled, setDisabled] = useState(true);
  const toggle = () => {
    setDisabled(!disabled);
  };
  return (
    <>
      <InputNumber min={1} max={10} disabled={disabled} defaultValue={3} />
      <div
        style={{
          marginTop: 20,
        }}
      >
        <Button onClick={toggle} type="primary">
          Toggle disabled
        </Button>
      </div>
    </>
  );
};
export default App;
`,description:"<p>\u70B9\u51FB\u6309\u94AE\u5207\u6362\u53EF\u7528\u72B6\u6001\u3002</p>"}},{demo:{id:"components-input-number-demo-digit"},previewerProps:{title:"\u9AD8\u7CBE\u5EA6\u5C0F\u6570",filename:"components/input-number/demo/digit.tsx",jsx:`import React from 'react';
import { InputNumber } from 'antd';
const onChange = (value) => {
  console.log('changed', value);
};
const App = () => (
  <InputNumber
    style={{
      width: 200,
    }}
    defaultValue="1"
    min="0"
    max="10"
    step="0.00000000000001"
    onChange={onChange}
    stringMode
  />
);
export default App;
`,description:"<p>\u901A\u8FC7 <code>stringMode</code> \u5F00\u542F\u9AD8\u7CBE\u5EA6\u5C0F\u6570\u652F\u6301\uFF0C<code>onChange</code> \u4E8B\u4EF6\u5C06\u8FD4\u56DE string \u7C7B\u578B\u3002\u5BF9\u4E8E\u65E7\u7248\u6D4F\u89C8\u5668\uFF0C\u4F60\u9700\u8981 BigInt polyfill\u3002</p>"}},{demo:{id:"components-input-number-demo-formatter"},previewerProps:{title:"\u683C\u5F0F\u5316\u5C55\u793A",filename:"components/input-number/demo/formatter.tsx",jsx:`import React from 'react';
import { InputNumber, Space } from 'antd';
const onChange = (value) => {
  console.log('changed', value);
};
const App = () => (
  <Space>
    <InputNumber
      defaultValue={1000}
      formatter={(value) => \`$ \${value}\`.replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',')}
      parser={(value) => value.replace(/\\$\\s?|(,*)/g, '')}
      onChange={onChange}
    />
    <InputNumber
      defaultValue={100}
      min={0}
      max={100}
      formatter={(value) => \`\${value}%\`}
      parser={(value) => value.replace('%', '')}
      onChange={onChange}
    />
  </Space>
);
export default App;
`,description:`<p>\u901A\u8FC7 <code>formatter</code> \u683C\u5F0F\u5316\u6570\u5B57\uFF0C\u4EE5\u5C55\u793A\u5177\u6709\u5177\u4F53\u542B\u4E49\u7684\u6570\u636E\uFF0C\u5F80\u5F80\u9700\u8981\u914D\u5408 <code>parser</code> \u4E00\u8D77\u4F7F\u7528\u3002</p>
<blockquote>
<p>\u8FD9\u91CC\u6709\u4E00\u4E2A\u66F4\u590D\u6742\u7684\u8D27\u5E01\u683C\u5F0F\u5316\u8F93\u5165\u6846\uFF1A<a href="https://codesandbox.io/s/currency-wrapper-antd-input-3ynzo">https://codesandbox.io/s/currency-wrapper-antd-input-3ynzo</a></p>
</blockquote>`}},{demo:{id:"components-input-number-demo-keyboard"},previewerProps:{title:"\u952E\u76D8\u884C\u4E3A",filename:"components/input-number/demo/keyboard.tsx",jsx:`import React, { useState } from 'react';
import { Checkbox, InputNumber, Space } from 'antd';
const App = () => {
  const [keyboard, setKeyboard] = useState(true);
  return (
    <Space>
      <InputNumber min={1} max={10} keyboard={keyboard} defaultValue={3} />
      <Checkbox
        onChange={() => {
          setKeyboard(!keyboard);
        }}
        checked={keyboard}
      >
        Toggle keyboard
      </Checkbox>
    </Space>
  );
};
export default App;
`,description:"<p>\u4F7F\u7528 <code>keyboard</code> \u5C5E\u6027\u53EF\u4EE5\u63A7\u5236\u952E\u76D8\u884C\u4E3A\u3002</p>"}},{demo:{id:"components-input-number-demo-borderless"},previewerProps:{title:"\u65E0\u8FB9\u6846",filename:"components/input-number/demo/borderless.tsx",jsx:`import React from 'react';
import { InputNumber } from 'antd';
const App = () => <InputNumber min={1} max={10} defaultValue={3} bordered={false} />;
export default App;
`,description:"<p>\u6CA1\u6709\u8FB9\u6846\u3002</p>"}},{demo:{id:"components-input-number-demo-out-of-range"},previewerProps:{title:"\u8D85\u51FA\u8FB9\u754C",filename:"components/input-number/demo/out-of-range.tsx",jsx:`import React, { useState } from 'react';
import { Button, InputNumber, Space } from 'antd';
const App = () => {
  const [value, setValue] = useState('99');
  return (
    <Space>
      <InputNumber min={1} max={10} value={value} onChange={setValue} />
      <Button
        type="primary"
        onClick={() => {
          setValue(99);
        }}
      >
        Reset
      </Button>
    </Space>
  );
};
export default App;
`,description:"<p>\u5F53\u901A\u8FC7\u53D7\u63A7\u5C06 <code>value</code> \u8D85\u51FA\u8FB9\u754C\u65F6\uFF0C\u63D0\u4F9B\u8B66\u544A\u6837\u5F0F\u3002</p>"}},{demo:{id:"components-input-number-demo-prefix"},previewerProps:{title:"\u524D\u7F00",filename:"components/input-number/demo/prefix.tsx",jsx:`import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { InputNumber } from 'antd';
const App = () => (
  <>
    <InputNumber
      prefix="\uFFE5"
      style={{
        width: '100%',
      }}
    />
    <br />
    <br />
    <InputNumber
      addonBefore={<UserOutlined />}
      prefix="\uFFE5"
      style={{
        width: '100%',
      }}
    />
    <br />
    <br />
    <InputNumber
      prefix="\uFFE5"
      disabled
      style={{
        width: '100%',
      }}
    />
  </>
);
export default App;
`,description:"<p>\u5728\u8F93\u5165\u6846\u4E0A\u6DFB\u52A0\u524D\u7F00\u56FE\u6807\u3002</p>"}},{demo:{id:"components-input-number-demo-status"},previewerProps:{title:"\u81EA\u5B9A\u4E49\u72B6\u6001",filename:"components/input-number/demo/status.tsx",jsx:`import React from 'react';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import { InputNumber, Space } from 'antd';
const App = () => (
  <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
    <InputNumber
      status="error"
      style={{
        width: '100%',
      }}
    />
    <InputNumber
      status="warning"
      style={{
        width: '100%',
      }}
    />
    <InputNumber
      status="error"
      style={{
        width: '100%',
      }}
      prefix={<ClockCircleOutlined />}
    />
    <InputNumber
      status="warning"
      style={{
        width: '100%',
      }}
      prefix={<ClockCircleOutlined />}
    />
  </Space>
);
export default App;
`,description:"<p>\u4F7F\u7528 <code>status</code> \u4E3A InputNumber \u6DFB\u52A0\u72B6\u6001\uFF0C\u53EF\u9009 <code>error</code> \u6216\u8005 <code>warning</code>\u3002</p>"}},{demo:{id:"components-input-number-demo-controls"},previewerProps:{debug:!0,title:"\u56FE\u6807\u6309\u94AE",filename:"components/input-number/demo/controls.tsx",jsx:`import React from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { InputNumber } from 'antd';
const App = () => (
  <InputNumber
    controls={{
      upIcon: <ArrowUpOutlined />,
      downIcon: <ArrowDownOutlined />,
    }}
  />
);
export default App;
`,description:"<p>\u53EF\u4EE5\u6269\u5C55 <code>controls</code> \u5C5E\u6027\u7528\u4EE5\u8BBE\u7F6E\u81EA\u5B9A\u4E49\u56FE\u6807\u3002</p>"}},{demo:{id:"components-input-number-demo-render-panel"},previewerProps:{debug:!0,title:"_InternalPanelDoNotUseOrYouWillBeFired",filename:"components/input-number/demo/render-panel.tsx",jsx:`import React from 'react';
import { InputNumber } from 'antd';

/** Test usage. Do not use in your production. */
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalInputNumber } = InputNumber;
export default () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      rowGap: 16,
    }}
  >
    <InternalInputNumber
      style={{
        width: '100%',
      }}
    />
  </div>
);
`,description:"<p>\u8C03\u8BD5\u7528\u7EC4\u4EF6\uFF0C\u8BF7\u52FF\u76F4\u63A5\u4F7F\u7528\u3002</p>"}},{demo:{id:"components-input-number-demo-debug-token"},previewerProps:{debug:!0,title:"\u8986\u76D6\u7EC4\u4EF6\u6837\u5F0F",filename:"components/input-number/demo/debug-token.tsx",jsx:`import React from 'react';
import { ConfigProvider, InputNumber, Space } from 'antd';
export default () => (
  <ConfigProvider
    theme={{
      components: {
        InputNumber: {
          handleWidth: 50,
        },
      },
    }}
  >
    <Space>
      <InputNumber />

      <ConfigProvider
        theme={{
          components: {
            InputNumber: {
              handleWidth: 25,
            },
          },
        }}
      >
        <InputNumber />
      </ConfigProvider>
    </Space>
  </ConfigProvider>
);
`}}]}),(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("h2",{id:"api"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,n.tZ)("span",{className:"icon icon-link"})),"API"),(0,n.tZ)("p",null,e[2].value),(0,n.tZ)(u.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[3].value),(0,n.tZ)("th",null,e[4].value),(0,n.tZ)("th",null,e[5].value),(0,n.tZ)("th",null,e[6].value),(0,n.tZ)("th",null,e[7].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[8].value),(0,n.tZ)("td",null,e[9].value),(0,n.tZ)("td",null,e[10].value),(0,n.tZ)("td",null,e[11].value),(0,n.tZ)("td",null,e[12].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[13].value),(0,n.tZ)("td",null,e[14].value),(0,n.tZ)("td",null,e[15].value),(0,n.tZ)("td",null,e[16].value),(0,n.tZ)("td",null,e[17].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[18].value),(0,n.tZ)("td",null,e[19].value),(0,n.tZ)("td",null,e[20].value),(0,n.tZ)("td",null,e[21].value),(0,n.tZ)("td",null,e[22].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[23].value),(0,n.tZ)("td",null,e[24].value),(0,n.tZ)("td",null,e[25].value),(0,n.tZ)("td",null,e[26].value),(0,n.tZ)("td",null,e[27].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[28].value),(0,n.tZ)("td",null,e[29].value),(0,n.tZ)("td",null,e[30].value),(0,n.tZ)("td",null,e[31].value),(0,n.tZ)("td",null,e[32].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[33].value),(0,n.tZ)("td",null,e[34].value),(0,n.tZ)("td",null,e[35].value),(0,n.tZ)("td",null,e[36].value),(0,n.tZ)("td",null,e[37].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[38].value),(0,n.tZ)("td",null,e[39].value),(0,n.tZ)("td",null,e[40].value),(0,n.tZ)("td",null,e[41].value),(0,n.tZ)("td",null,e[42].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[43].value),(0,n.tZ)("td",null,e[44].value),(0,n.tZ)("td",null,e[45].value),(0,n.tZ)("td",null,e[46].value),(0,n.tZ)("td",null,e[47].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[48].value),(0,n.tZ)("td",null,e[49].value),(0,n.tZ)("td",null,e[50].value),(0,n.tZ)("td",null,e[51].value),(0,n.tZ)("td",null,e[52].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[53].value),(0,n.tZ)("td",null,e[54].value),(0,n.tZ)("td",null,e[55].value),(0,n.tZ)("td",null,e[56].value),(0,n.tZ)("td",null,e[57].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[58].value),(0,n.tZ)("td",null,e[59].value),(0,n.tZ)("td",null,e[60].value),(0,n.tZ)("td",null,(0,n.tZ)("a",{href:"https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER"},e[61].value)),(0,n.tZ)("td",null,e[62].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[63].value),(0,n.tZ)("td",null,e[64].value),(0,n.tZ)("td",null,e[65].value),(0,n.tZ)("td",null,(0,n.tZ)("a",{href:"https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER"},e[66].value)),(0,n.tZ)("td",null,e[67].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[68].value),(0,n.tZ)("td",null,e[69].value,(0,n.tZ)("code",null,e[70].value),e[71].value,(0,n.tZ)("code",null,e[72].value),e[73].value),(0,n.tZ)("td",null,e[74].value),(0,n.tZ)("td",null,e[75].value),(0,n.tZ)("td",null,e[76].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[77].value),(0,n.tZ)("td",null,e[78].value,(0,n.tZ)("code",null,e[79].value),e[80].value,(0,n.tZ)("code",null,e[81].value),e[82].value),(0,n.tZ)("td",null,e[83].value),(0,n.tZ)("td",null,e[84].value),(0,n.tZ)("td",null,e[85].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[86].value),(0,n.tZ)("td",null,e[87].value),(0,n.tZ)("td",null,e[88].value),(0,n.tZ)("td",null,e[89].value),(0,n.tZ)("td",null,e[90].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[91].value),(0,n.tZ)("td",null,e[92].value),(0,n.tZ)("td",null,e[93].value),(0,n.tZ)("td",null,e[94].value),(0,n.tZ)("td",null,e[95].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[96].value),(0,n.tZ)("td",null,e[97].value),(0,n.tZ)("td",null,e[98].value),(0,n.tZ)("td",null,e[99].value),(0,n.tZ)("td",null,e[100].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[101].value),(0,n.tZ)("td",null,e[102].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[103].value),e[104].value,(0,n.tZ)("code",null,e[105].value),e[106].value,(0,n.tZ)("code",null,e[107].value)),(0,n.tZ)("td",null,e[108].value),(0,n.tZ)("td",null,e[109].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[110].value),(0,n.tZ)("td",null,e[111].value),(0,n.tZ)("td",null,e[112].value),(0,n.tZ)("td",null,e[113].value),(0,n.tZ)("td",null,e[114].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[115].value),(0,n.tZ)("td",null,e[116].value,(0,n.tZ)("code",null,e[117].value),e[118].value),(0,n.tZ)("td",null,e[119].value),(0,n.tZ)("td",null,e[120].value),(0,n.tZ)("td",null,e[121].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[122].value),(0,n.tZ)("td",null,e[123].value),(0,n.tZ)("td",null,e[124].value),(0,n.tZ)("td",null,e[125].value),(0,n.tZ)("td",null,e[126].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[127].value),(0,n.tZ)("td",null,e[128].value),(0,n.tZ)("td",null,e[129].value),(0,n.tZ)("td",null,e[130].value),(0,n.tZ)("td",null,e[131].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[132].value),(0,n.tZ)("td",null,e[133].value),(0,n.tZ)("td",null,e[134].value),(0,n.tZ)("td",null,e[135].value),(0,n.tZ)("td",null,e[136].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[137].value),(0,n.tZ)("td",null,e[138].value),(0,n.tZ)("td",null,e[139].value),(0,n.tZ)("td",null,e[140].value),(0,n.tZ)("td",null,e[141].value)))),(0,n.tZ)("h2",{id:"\u65B9\u6CD5"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u65B9\u6CD5"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u65B9\u6CD5"),(0,n.tZ)(u.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[142].value),(0,n.tZ)("th",null,e[143].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[144].value),(0,n.tZ)("td",null,e[145].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[146].value),(0,n.tZ)("td",null,e[147].value)))),(0,n.tZ)("h2",{id:"faq"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#faq"},(0,n.tZ)("span",{className:"icon icon-link"})),"FAQ"),(0,n.tZ)("h3",{id:"\u4E3A\u4F55\u53D7\u63A7\u6A21\u5F0F\u4E0Bvalue-\u53EF\u4EE5\u8D85\u51FA-min-\u548C-max-\u8303\u56F4"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4E3A\u4F55\u53D7\u63A7\u6A21\u5F0F\u4E0Bvalue-\u53EF\u4EE5\u8D85\u51FA-min-\u548C-max-\u8303\u56F4"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4E3A\u4F55\u53D7\u63A7\u6A21\u5F0F\u4E0B\uFF0C",(0,n.tZ)("code",null,e[148].value)," \u53EF\u4EE5\u8D85\u51FA ",(0,n.tZ)("code",null,e[149].value)," \u548C ",(0,n.tZ)("code",null,e[150].value)," \u8303\u56F4\uFF1F"),(0,n.tZ)("p",null,e[151].value),(0,n.tZ)("h3",{id:"\u4E3A\u4F55\u52A8\u6001\u4FEE\u6539-min-\u548C-max-\u8BA9-value-\u8D85\u51FA\u8303\u56F4\u4E0D\u4F1A\u89E6\u53D1-onchange-\u4E8B\u4EF6"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4E3A\u4F55\u52A8\u6001\u4FEE\u6539-min-\u548C-max-\u8BA9-value-\u8D85\u51FA\u8303\u56F4\u4E0D\u4F1A\u89E6\u53D1-onchange-\u4E8B\u4EF6"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4E3A\u4F55\u52A8\u6001\u4FEE\u6539 ",(0,n.tZ)("code",null,e[152].value)," \u548C ",(0,n.tZ)("code",null,e[153].value)," \u8BA9 ",(0,n.tZ)("code",null,e[154].value)," \u8D85\u51FA\u8303\u56F4\u4E0D\u4F1A\u89E6\u53D1 ",(0,n.tZ)("code",null,e[155].value)," \u4E8B\u4EF6\uFF1F"),(0,n.tZ)("p",null,(0,n.tZ)("code",null,e[156].value),e[157].value))))}l.default=r}}]);
