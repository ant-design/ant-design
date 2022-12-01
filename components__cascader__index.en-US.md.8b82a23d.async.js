"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[3891],{11570:function(c,o,l){l.r(o);var p=l(2143),v=l(50250),h=l(59378),Z=l(78190),u=l(74775),a=l(5937),m=l(2068),g=l(74399),_=l(46004),b=l(35708),x=l(30138),C=l(56140),d=l(5388),f=l(49545),j=l(92169),P=l(13140),O=l(95127),z=l(74418),A=l(97119),t=l(28257),s=l(67294),n=l(13946);function i(){var r=(0,t.eL)(),e=r.texts;return(0,n.tZ)(t.dY,null,(0,n.tZ)(s.Fragment,null,(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("p",null,e[0].value),(0,n.tZ)("h2",{id:"when-to-use"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#when-to-use"},(0,n.tZ)("span",{className:"icon icon-link"})),"When To Use"),(0,n.tZ)("ul",null,(0,n.tZ)("li",null,e[1].value),(0,n.tZ)("li",null,e[2].value),(0,n.tZ)("li",null,e[3].value)),(0,n.tZ)("h2",{id:"examples"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#examples"},(0,n.tZ)("span",{className:"icon icon-link"})),"Examples")),(0,n.tZ)(d.Z,{items:[{demo:{id:"components-cascader-demo-basic"},previewerProps:{title:"Basic",filename:"components/cascader/demo/basic.tsx",jsx:`import React from 'react';
import { Cascader } from 'antd';
const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
const onChange = (value) => {
  console.log(value);
};
const App = () => <Cascader options={options} onChange={onChange} placeholder="Please select" />;
export default App;
`,description:"<p>Cascade selection box for selecting province/city/district.</p>"}},{demo:{id:"components-cascader-demo-default-value"},previewerProps:{title:"Default value",filename:"components/cascader/demo/default-value.tsx",jsx:`import React from 'react';
import { Cascader } from 'antd';
const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
const onChange = (value) => {
  console.log(value);
};
const App = () => (
  <Cascader defaultValue={['zhejiang', 'hangzhou', 'xihu']} options={options} onChange={onChange} />
);
export default App;
`,description:"<p>Specifies default value by an array.</p>"}},{demo:{id:"components-cascader-demo-custom-trigger"},previewerProps:{title:"Custom trigger",filename:"components/cascader/demo/custom-trigger.tsx",jsx:`import React, { useState } from 'react';
import { Cascader } from 'antd';
const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
      },
    ],
  },
];
const App = () => {
  const [text, setText] = useState('Unselect');
  const onChange = (_, selectedOptions) => {
    setText(selectedOptions.map((o) => o.label).join(', '));
  };
  return (
    <span>
      {text}
      &nbsp;
      <Cascader options={options} onChange={onChange}>
        <a href="#">Change city</a>
      </Cascader>
    </span>
  );
};
export default App;
`,description:"<p>Separate trigger button and result.</p>"}},{demo:{id:"components-cascader-demo-hover"},previewerProps:{title:"Hover",filename:"components/cascader/demo/hover.tsx",jsx:`import React from 'react';
import { Cascader } from 'antd';
const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
const onChange = (value) => {
  console.log(value);
};

// Just show the latest item.
const displayRender = (labels) => labels[labels.length - 1];
const App = () => (
  <Cascader
    options={options}
    expandTrigger="hover"
    displayRender={displayRender}
    onChange={onChange}
  />
);
export default App;
`,description:"<p>Hover to expand sub menu, click to select option.</p>"}},{demo:{id:"components-cascader-demo-disabled-option"},previewerProps:{title:"Disabled option",filename:"components/cascader/demo/disabled-option.tsx",jsx:`import React from 'react';
import { Cascader } from 'antd';
const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    disabled: true,
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
const onChange = (value) => {
  console.log(value);
};
const App = () => <Cascader options={options} onChange={onChange} />;
export default App;
`,description:"<p>Disable option by specifying the <code>disabled</code> property in <code>options</code>.</p>"}},{demo:{id:"components-cascader-demo-change-on-select"},previewerProps:{title:"Change on select",filename:"components/cascader/demo/change-on-select.tsx",jsx:`import React from 'react';
import { Cascader } from 'antd';
const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hanzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
const onChange = (value) => {
  console.log(value);
};
const App = () => <Cascader options={options} onChange={onChange} changeOnSelect />;
export default App;
`,description:"<p>Allow only select parent options.</p>"}},{demo:{id:"components-cascader-demo-multiple"},previewerProps:{title:"Multiple",filename:"components/cascader/demo/multiple.tsx",jsx:`import React from 'react';
import { Cascader } from 'antd';
const options = [
  {
    label: 'Light',
    value: 'light',
    children: new Array(20).fill(null).map((_, index) => ({
      label: \`Number \${index}\`,
      value: index,
    })),
  },
  {
    label: 'Bamboo',
    value: 'bamboo',
    children: [
      {
        label: 'Little',
        value: 'little',
        children: [
          {
            label: 'Toy Fish',
            value: 'fish',
          },
          {
            label: 'Toy Cards',
            value: 'cards',
          },
          {
            label: 'Toy Bird',
            value: 'bird',
          },
        ],
      },
    ],
  },
];
const onChange = (value) => {
  console.log(value);
};
const App = () => (
  <Cascader
    style={{
      width: '100%',
    }}
    options={options}
    onChange={onChange}
    multiple
    maxTagCount="responsive"
  />
);
export default App;
`,description:"<p>Select multiple options</p>"}},{demo:{id:"components-cascader-demo-showcheckedstrategy"},previewerProps:{title:"ShowCheckedStrategy",filename:"components/cascader/demo/showCheckedStrategy.tsx",jsx:`import React from 'react';
import { Cascader } from 'antd';
const { SHOW_CHILD } = Cascader;
const options = [
  {
    label: 'Light',
    value: 'light',
    children: new Array(20).fill(null).map((_, index) => ({
      label: \`Number \${index}\`,
      value: index,
    })),
  },
  {
    label: 'Bamboo',
    value: 'bamboo',
    children: [
      {
        label: 'Little',
        value: 'little',
        children: [
          {
            label: 'Toy Fish',
            value: 'fish',
          },
          {
            label: 'Toy Cards',
            value: 'cards',
          },
          {
            label: 'Toy Bird',
            value: 'bird',
          },
        ],
      },
    ],
  },
];
const App = () => {
  const onChange = (value) => {
    console.log(value);
  };
  return (
    <>
      <Cascader
        style={{
          width: '100%',
        }}
        options={options}
        onChange={onChange}
        multiple
        maxTagCount="responsive"
        showCheckedStrategy={SHOW_CHILD}
        defaultValue={[
          ['bamboo', 'little', 'fish'],
          ['bamboo', 'little', 'cards'],
          ['bamboo', 'little', 'bird'],
        ]}
      />
      <br />
      <br />
      <Cascader
        style={{
          width: '100%',
        }}
        options={options}
        onChange={onChange}
        multiple
        maxTagCount="responsive"
        defaultValue={['bamboo']}
      />
    </>
  );
};
export default App;
`,description:"<p>The way show selected item in box using <code>ShowCheckedStrategy</code>.</p>"}},{demo:{id:"components-cascader-demo-size"},previewerProps:{title:"Size",filename:"components/cascader/demo/size.tsx",jsx:`import React from 'react';
import { Cascader } from 'antd';
const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
const onChange = (value) => {
  console.log(value);
};
const App = () => (
  <>
    <Cascader size="large" options={options} onChange={onChange} />
    <br />
    <br />
    <Cascader options={options} onChange={onChange} />
    <br />
    <br />
    <Cascader size="small" options={options} onChange={onChange} />
    <br />
    <br />
  </>
);
export default App;
`,description:"<p>Cascade selection box of different sizes.</p>"}},{demo:{id:"components-cascader-demo-custom-render"},previewerProps:{title:"Custom render",filename:"components/cascader/demo/custom-render.tsx",jsx:`import React from 'react';
import { Cascader } from 'antd';
const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
            code: 752100,
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
            code: 453400,
          },
        ],
      },
    ],
  },
];
const handleAreaClick = (e, label, option) => {
  e.stopPropagation();
  console.log('clicked', label, option);
};
const displayRender = (labels, selectedOptions) =>
  labels.map((label, i) => {
    const option = selectedOptions[i];
    if (i === labels.length - 1) {
      return (
        <span key={option.value}>
          {label} (<a onClick={(e) => handleAreaClick(e, label, option)}>{option.code}</a>)
        </span>
      );
    }
    return <span key={option.value}>{label} / </span>;
  });
const App = () => (
  <Cascader
    options={options}
    defaultValue={['zhejiang', 'hangzhou', 'xihu']}
    displayRender={displayRender}
    style={{
      width: '100%',
    }}
  />
);
export default App;
`,description:"<p>For instance, add an external link after the selected value.</p>"}},{demo:{id:"components-cascader-demo-search"},previewerProps:{title:"Search",filename:"components/cascader/demo/search.tsx",jsx:`import React from 'react';
import { Cascader } from 'antd';
const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
          {
            value: 'xiasha',
            label: 'Xia Sha',
            disabled: true,
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua men',
          },
        ],
      },
    ],
  },
];
const onChange = (value, selectedOptions) => {
  console.log(value, selectedOptions);
};
const filter = (inputValue, path) =>
  path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
const App = () => (
  <Cascader
    options={options}
    onChange={onChange}
    placeholder="Please select"
    showSearch={{
      filter,
    }}
    onSearch={(value) => console.log(value)}
  />
);
export default App;
`,description:`<p>Search and select options directly.</p>
<blockquote>
<p>Now, <code>Cascader[showSearch]</code> doesn't support search on server, more info <a href="https://github.com/ant-design/ant-design/issues/5547">#5547</a></p>
</blockquote>`}},{demo:{id:"components-cascader-demo-lazy"},previewerProps:{title:"Load Options Lazily",filename:"components/cascader/demo/lazy.tsx",jsx:`import React, { useState } from 'react';
import { Cascader } from 'antd';
const optionLists = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    isLeaf: false,
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    isLeaf: false,
  },
];
const App = () => {
  const [options, setOptions] = useState(optionLists);
  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };
  const loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    // load options lazily
    setTimeout(() => {
      targetOption.loading = false;
      targetOption.children = [
        {
          label: \`\${targetOption.label} Dynamic 1\`,
          value: 'dynamic1',
        },
        {
          label: \`\${targetOption.label} Dynamic 2\`,
          value: 'dynamic2',
        },
      ];
      setOptions([...options]);
    }, 1000);
  };
  return <Cascader options={options} loadData={loadData} onChange={onChange} changeOnSelect />;
};
export default App;
`,description:`<p>Load options lazily with <code>loadData</code>.</p>
<blockquote>
<p>Note: <code>loadData</code> cannot work with <code>showSearch</code>.</p>
</blockquote>`}},{demo:{id:"components-cascader-demo-fields-name"},previewerProps:{title:"Custom Field Names",filename:"components/cascader/demo/fields-name.tsx",jsx:`import React from 'react';
import { Cascader } from 'antd';
const options = [
  {
    code: 'zhejiang',
    name: 'Zhejiang',
    items: [
      {
        code: 'hangzhou',
        name: 'Hangzhou',
        items: [
          {
            code: 'xihu',
            name: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    code: 'jiangsu',
    name: 'Jiangsu',
    items: [
      {
        code: 'nanjing',
        name: 'Nanjing',
        items: [
          {
            code: 'zhonghuamen',
            name: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
const onChange = (value) => {
  console.log(value);
};
const App = () => (
  <Cascader
    fieldNames={{
      label: 'name',
      value: 'code',
      children: 'items',
    }}
    options={options}
    onChange={onChange}
    placeholder="Please select"
  />
);
export default App;
`,description:"<p>Custom field names.</p>"}},{demo:{id:"components-cascader-demo-suffix"},previewerProps:{debug:!0,title:"Custom Icons",filename:"components/cascader/demo/suffix.tsx",jsx:`import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Cascader } from 'antd';
const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
const onChange = (value) => {
  console.log(value);
};
const App = () => (
  <>
    <Cascader
      suffixIcon={<SmileOutlined />}
      options={options}
      onChange={onChange}
      placeholder="Please select"
    />
    <br />
    <br />
    <Cascader suffixIcon="ab" options={options} onChange={onChange} placeholder="Please select" />
    <br />
    <br />
    <Cascader
      expandIcon={<SmileOutlined />}
      options={options}
      onChange={onChange}
      placeholder="Please select"
    />
    <br />
    <br />
    <Cascader expandIcon="ab" options={options} onChange={onChange} placeholder="Please select" />
  </>
);
export default App;
`,description:"<p>Use <code>suffixIcon</code> to customize the selection box suffix icon, and use <code>expandIcon</code> to customize the current item expand icon.</p>"}},{demo:{id:"components-cascader-demo-custom-dropdown"},previewerProps:{title:"Custom dropdown",filename:"components/cascader/demo/custom-dropdown.tsx",jsx:`import React from 'react';
import { Cascader, Divider } from 'antd';
const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
const dropdownRender = (menus) => (
  <div>
    {menus}
    <Divider
      style={{
        margin: 0,
      }}
    />
    <div
      style={{
        padding: 8,
      }}
    >
      The footer is not very short.
    </div>
  </div>
);
const App = () => (
  <Cascader options={options} dropdownRender={dropdownRender} placeholder="Please select" />
);
export default App;
`,description:"<p>Customize the dropdown menu via <code>dropdownRender</code>.</p>"}},{demo:{id:"components-cascader-demo-placement"},previewerProps:{title:"Placement",filename:"components/cascader/demo/placement.tsx",jsx:`import React, { useState } from 'react';
import { Cascader, Radio } from 'antd';
const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
const App = () => {
  const [placement, SetPlacement] = useState('topLeft');
  const placementChange = (e) => {
    SetPlacement(e.target.value);
  };
  return (
    <>
      <Radio.Group value={placement} onChange={placementChange}>
        <Radio.Button value="topLeft">topLeft</Radio.Button>
        <Radio.Button value="topRight">topRight</Radio.Button>
        <Radio.Button value="bottomLeft">bottomLeft</Radio.Button>
        <Radio.Button value="bottomRight">bottomRight</Radio.Button>
      </Radio.Group>
      <br />
      <br />
      <Cascader options={options} placeholder="Please select" placement={placement} />
    </>
  );
};
export default App;
`,description:"<p>You can manually specify the position of the popup via <code>placement</code>.</p>"}},{demo:{id:"components-cascader-demo-status"},previewerProps:{title:"Status",filename:"components/cascader/demo/status.tsx",jsx:`import React from 'react';
import { Cascader, Space } from 'antd';
const App = () => (
  <Space direction="vertical">
    <Cascader status="error" placeholder="Error" />
    <Cascader status="warning" multiple placeholder="Warning multiple" />
  </Space>
);
export default App;
`,description:"<p>Add status to Cascader with <code>status</code>, which could be <code>error</code> or <code>warning</code>.</p>"}},{demo:{id:"components-cascader-demo-render-panel"},previewerProps:{debug:!0,title:"_InternalPanelDoNotUseOrYouWillBeFired",filename:"components/cascader/demo/render-panel.tsx",jsx:`import React from 'react';
import { Cascader } from 'antd';
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalCascader } = Cascader;
const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
const App = () => <InternalCascader options={options} placeholder="Please select" />;
export default App;
`,description:"<p>Debug usage. Do not use in your production.</p>"}}]}),(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("h2",{id:"api"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,n.tZ)("span",{className:"icon icon-link"})),"API"),(0,n.tZ)(u.Z,{lang:"jsx"},e[4].value),(0,n.tZ)(a.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[5].value),(0,n.tZ)("th",null,e[6].value),(0,n.tZ)("th",null,e[7].value),(0,n.tZ)("th",null,e[8].value),(0,n.tZ)("th",null,e[9].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[10].value),(0,n.tZ)("td",null,e[11].value),(0,n.tZ)("td",null,e[12].value),(0,n.tZ)("td",null,e[13].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[14].value),(0,n.tZ)("td",null,e[15].value),(0,n.tZ)("td",null,e[16].value),(0,n.tZ)("td",null,e[17].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[18].value),(0,n.tZ)("td",null,e[19].value),(0,n.tZ)("td",null,e[20].value),(0,n.tZ)("td",null,e[21].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[22].value),(0,n.tZ)("td",null,e[23].value),(0,n.tZ)("td",null,e[24].value),(0,n.tZ)("td",null,e[25].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[26].value),(0,n.tZ)("td",null,e[27].value),(0,n.tZ)("td",null,e[28].value),(0,n.tZ)("td",null,e[29].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[30].value),(0,n.tZ)("td",null,e[31].value),(0,n.tZ)("td",null,e[32].value),(0,n.tZ)("td",null,e[33].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[34].value),(0,n.tZ)("td",null,e[35].value),(0,n.tZ)("td",null,e[36].value),(0,n.tZ)("td",null,e[37].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[38].value),(0,n.tZ)("td",null,e[39].value),(0,n.tZ)("td",null,e[40].value),(0,n.tZ)("td",null,e[41].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[42].value),(0,n.tZ)("td",null,e[43].value),(0,n.tZ)("td",null,e[44].value),(0,n.tZ)("td",null,e[45].value,(0,n.tZ)("code",null,e[46].value),e[47].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[48].value),e[49].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[50].value),(0,n.tZ)("td",null,e[51].value),(0,n.tZ)("td",null,e[52].value),(0,n.tZ)("td",null,e[53].value),(0,n.tZ)("td",null,e[54].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[55].value),(0,n.tZ)("td",null,e[56].value),(0,n.tZ)("td",null,e[57].value),(0,n.tZ)("td",null,e[58].value),(0,n.tZ)("td",null,e[59].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[60].value),(0,n.tZ)("td",null,e[61].value),(0,n.tZ)("td",null,e[62].value),(0,n.tZ)("td",null,e[63].value),(0,n.tZ)("td",null,e[64].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[65].value),(0,n.tZ)("td",null,e[66].value,(0,n.tZ)("code",null,e[67].value),e[68].value,(0,n.tZ)("code",null,e[69].value)),(0,n.tZ)("td",null,e[70].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[71].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[72].value),(0,n.tZ)("td",null,e[73].value),(0,n.tZ)("td",null,e[74].value),(0,n.tZ)("td",null,e[75].value,(0,n.tZ)("code",null,e[76].value),e[77].value,(0,n.tZ)("code",null,e[78].value),e[79].value,(0,n.tZ)("code",null,e[80].value),e[81].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[82].value),(0,n.tZ)("td",null,e[83].value,(0,n.tZ)("code",null,e[84].value),e[85].value,(0,n.tZ)("a",{href:"https://codepen.io/afc163/pen/zEjNOy?editors=0010"},e[86].value)),(0,n.tZ)("td",null,e[87].value),(0,n.tZ)("td",null,e[88].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[89].value),(0,n.tZ)("td",null,e[90].value,(0,n.tZ)("code",null,e[91].value)),(0,n.tZ)("td",null,e[92].value),(0,n.tZ)("td",null,e[93].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[94].value),(0,n.tZ)("td",null,e[95].value,(0,n.tZ)("code",null,e[96].value),e[97].value),(0,n.tZ)("td",null,e[98].value,(0,n.tZ)("code",null,e[99].value)),(0,n.tZ)("td",null,e[100].value),(0,n.tZ)("td",null,e[101].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[102].value),(0,n.tZ)("td",null,e[103].value),(0,n.tZ)("td",null,e[104].value),(0,n.tZ)("td",null,e[105].value),(0,n.tZ)("td",null,e[106].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[107].value),(0,n.tZ)("td",null,e[108].value),(0,n.tZ)("td",null,e[109].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[110].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[111].value),(0,n.tZ)("td",null,e[112].value),(0,n.tZ)("td",null,e[113].value),(0,n.tZ)("td",null,e[114].value),(0,n.tZ)("td",null,e[115].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[116].value),(0,n.tZ)("td",null,e[117].value),(0,n.tZ)("td",null,(0,n.tZ)(t.rU,{to:"#Option"},e[118].value),e[119].value),(0,n.tZ)("td",null,e[120].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[121].value),(0,n.tZ)("td",null,e[122].value),(0,n.tZ)("td",null,e[123].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[124].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[125].value),(0,n.tZ)("td",null,e[126].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[127].value),e[128].value,(0,n.tZ)("code",null,e[129].value),e[130].value,(0,n.tZ)("code",null,e[131].value),e[132].value,(0,n.tZ)("code",null,e[133].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[134].value)),(0,n.tZ)("td",null,e[135].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[136].value),(0,n.tZ)("td",null,e[137].value),(0,n.tZ)("td",null,e[138].value,(0,n.tZ)(t.rU,{to:"#showSearch"},e[139].value)),(0,n.tZ)("td",null,e[140].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[141].value),(0,n.tZ)("td",null,e[142].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[143].value),e[144].value,(0,n.tZ)("code",null,e[145].value),e[146].value,(0,n.tZ)("code",null,e[147].value)),(0,n.tZ)("td",null,e[148].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[149].value),(0,n.tZ)("td",null,e[150].value),(0,n.tZ)("td",null,e[151].value),(0,n.tZ)("td",null,e[152].value),(0,n.tZ)("td",null,e[153].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[154].value),(0,n.tZ)("td",null,e[155].value),(0,n.tZ)("td",null,e[156].value),(0,n.tZ)("td",null,e[157].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[158].value),(0,n.tZ)("td",null,e[159].value),(0,n.tZ)("td",null,e[160].value),(0,n.tZ)("td",null,e[161].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[162].value),(0,n.tZ)("td",null,e[163].value),(0,n.tZ)("td",null,e[164].value),(0,n.tZ)("td",null,e[165].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[166].value),(0,n.tZ)("td",null,e[167].value),(0,n.tZ)("td",null,e[168].value),(0,n.tZ)("td",null,e[169].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[170].value),(0,n.tZ)("td",null,e[171].value),(0,n.tZ)("td",null,e[172].value),(0,n.tZ)("td",null,e[173].value),(0,n.tZ)("td",null,e[174].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[175].value),(0,n.tZ)("td",null,e[176].value),(0,n.tZ)("td",null,e[177].value),(0,n.tZ)("td",null,e[178].value),(0,n.tZ)("td",null,e[179].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[180].value),(0,n.tZ)("td",null,e[181].value),(0,n.tZ)("td",null,e[182].value),(0,n.tZ)("td",null,e[183].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[184].value),(0,n.tZ)("td",null,e[185].value,(0,n.tZ)("code",null,e[186].value),e[187].value,(0,n.tZ)("strong",null,(0,n.tZ)("code",null,e[188].value),e[189].value),e[190].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[191].value),e[192].value,(0,n.tZ)("code",null,e[193].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[194].value)),(0,n.tZ)("td",null,e[195].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[196].value),(0,n.tZ)("td",null,e[197].value,(0,n.tZ)("code",null,e[198].value)),(0,n.tZ)("td",null,e[199].value),(0,n.tZ)("td",null,e[200].value),(0,n.tZ)("td",null,e[201].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[202].value),(0,n.tZ)("td",null,e[203].value),(0,n.tZ)("td",null,e[204].value),(0,n.tZ)("td",null,e[205].value),(0,n.tZ)("td",null,e[206].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[207].value),(0,n.tZ)("td",null,e[208].value),(0,n.tZ)("td",null,e[209].value),(0,n.tZ)("td",null,e[210].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[211].value),(0,n.tZ)("td",null,e[212].value),(0,n.tZ)("td",null,e[213].value),(0,n.tZ)("td",null,e[214].value),(0,n.tZ)("td",null)))),(0,n.tZ)("h3",{id:"showsearch"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#showsearch"},(0,n.tZ)("span",{className:"icon icon-link"})),"showSearch"),(0,n.tZ)(a.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[215].value),(0,n.tZ)("th",null,e[216].value),(0,n.tZ)("th",null,e[217].value),(0,n.tZ)("th",null,e[218].value),(0,n.tZ)("th",null,e[219].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[220].value),(0,n.tZ)("td",null,e[221].value),(0,n.tZ)("td",null,e[222].value),(0,n.tZ)("td",null,e[223].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[224].value),(0,n.tZ)("td",null,e[225].value),(0,n.tZ)("td",null,e[226].value),(0,n.tZ)("td",null,e[227].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[228].value),(0,n.tZ)("td",null,e[229].value,(0,n.tZ)("a",{href:"https://github.com/ant-design/ant-design/issues/25779"},e[230].value),e[231].value),(0,n.tZ)("td",null,e[232].value),(0,n.tZ)("td",null,e[233].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[234].value),(0,n.tZ)("td",null,e[235].value),(0,n.tZ)("td",null,e[236].value),(0,n.tZ)("td",null,e[237].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[238].value),(0,n.tZ)("td",null,e[239].value),(0,n.tZ)("td",null,e[240].value),(0,n.tZ)("td",null,e[241].value),(0,n.tZ)("td",null)))),(0,n.tZ)("h3",{id:"option"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#option"},(0,n.tZ)("span",{className:"icon icon-link"})),"Option"),(0,n.tZ)(u.Z,{lang:"typescript"},e[242].value),(0,n.tZ)("h2",{id:"methods"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#methods"},(0,n.tZ)("span",{className:"icon icon-link"})),"Methods"),(0,n.tZ)(a.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[243].value),(0,n.tZ)("th",null,e[244].value),(0,n.tZ)("th",null,e[245].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[246].value),(0,n.tZ)("td",null,e[247].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[248].value),(0,n.tZ)("td",null,e[249].value),(0,n.tZ)("td",null)))))))}o.default=i}}]);
