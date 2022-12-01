"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[9884],{95513:function(s,l,e){e.r(l);var p=e(2143),c=e(50250),m=e(59378),_=e(78190),B=e(74775),a=e(5937),v=e(2068),Z=e(74399),h=e(46004),g=e(35708),x=e(30138),f=e(56140),u=e(5388),S=e(49545),y=e(92169),b=e(13140),D=e(95127),P=e(74418),E=e(97119),o=e(28257),i=e(67294),n=e(13946);function d(){var r=(0,o.eL)(),t=r.texts;return(0,n.tZ)(o.dY,null,(0,n.tZ)(i.Fragment,null,(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("p",null,t[0].value),(0,n.tZ)("h2",{id:"\u4F55\u65F6\u4F7F\u7528"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F55\u65F6\u4F7F\u7528"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4F55\u65F6\u4F7F\u7528"),(0,n.tZ)("p",null,t[1].value),(0,n.tZ)("p",null,t[2].value),(0,n.tZ)("ul",null,(0,n.tZ)("li",null,t[3].value),(0,n.tZ)("li",null,t[4].value),(0,n.tZ)("li",null,t[5].value),(0,n.tZ)("li",null,t[6].value),(0,n.tZ)("li",null,t[7].value)),(0,n.tZ)("p",null,t[8].value),(0,n.tZ)("ul",null,(0,n.tZ)("li",null,t[9].value),(0,n.tZ)("li",null,t[10].value),(0,n.tZ)("li",null,t[11].value),(0,n.tZ)("li",null,t[12].value)),(0,n.tZ)("p",null,(0,n.tZ)("a",{href:"https://ant.design/docs/spec/buttons-cn"},t[13].value)),(0,n.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,n.tZ)(u.Z,{items:[{demo:{id:"components-button-demo-basic"},previewerProps:{title:"\u6309\u94AE\u7C7B\u578B",filename:"components/button/demo/basic.tsx",jsx:`import React from 'react';
import { Button, Space } from 'antd';
const App = () => (
  <Space wrap>
    <Button type="primary">Primary Button</Button>
    <Button>Default Button</Button>
    <Button type="dashed">Dashed Button</Button>
    <Button type="text">Text Button</Button>
    <Button type="link">Link Button</Button>
  </Space>
);
export default App;
`,description:"<p>\u6309\u94AE\u6709\u4E94\u79CD\u7C7B\u578B\uFF1A\u4E3B\u6309\u94AE\u3001\u6B21\u6309\u94AE\u3001\u865A\u7EBF\u6309\u94AE\u3001\u6587\u672C\u6309\u94AE\u548C\u94FE\u63A5\u6309\u94AE\u3002\u4E3B\u6309\u94AE\u5728\u540C\u4E00\u4E2A\u64CD\u4F5C\u533A\u57DF\u6700\u591A\u51FA\u73B0\u4E00\u6B21\u3002</p>"}},{demo:{id:"components-button-demo-icon"},previewerProps:{title:"\u56FE\u6807\u6309\u94AE",filename:"components/button/demo/icon.tsx",jsx:`import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Tooltip, Space } from 'antd';
const App = () => (
  <Space direction="vertical">
    <Space wrap>
      <Tooltip title="search">
        <Button type="primary" shape="circle" icon={<SearchOutlined />} />
      </Tooltip>
      <Button type="primary" shape="circle">
        A
      </Button>
      <Button type="primary" icon={<SearchOutlined />}>
        Search
      </Button>
      <Tooltip title="search">
        <Button shape="circle" icon={<SearchOutlined />} />
      </Tooltip>
      <Button icon={<SearchOutlined />}>Search</Button>
    </Space>
    <Space wrap>
      <Tooltip title="search">
        <Button shape="circle" icon={<SearchOutlined />} />
      </Tooltip>
      <Button icon={<SearchOutlined />}>Search</Button>
      <Tooltip title="search">
        <Button type="dashed" shape="circle" icon={<SearchOutlined />} />
      </Tooltip>
      <Button type="dashed" icon={<SearchOutlined />}>
        Search
      </Button>
      <Button icon={<SearchOutlined />} href="https://www.google.com" />
    </Space>
  </Space>
);
export default App;
`,description:`<p>\u5F53\u9700\u8981\u5728 <code>Button</code> \u5185\u5D4C\u5165 <code>Icon</code> \u65F6\uFF0C\u53EF\u4EE5\u8BBE\u7F6E <code>icon</code> \u5C5E\u6027\uFF0C\u6216\u8005\u76F4\u63A5\u5728 <code>Button</code> \u5185\u4F7F\u7528 <code>Icon</code> \u7EC4\u4EF6\u3002</p>
<p>\u5982\u679C\u60F3\u63A7\u5236 <code>Icon</code> \u5177\u4F53\u7684\u4F4D\u7F6E\uFF0C\u53EA\u80FD\u76F4\u63A5\u4F7F\u7528 <code>Icon</code> \u7EC4\u4EF6\uFF0C\u800C\u975E <code>icon</code> \u5C5E\u6027\u3002</p>`}},{demo:{id:"components-button-demo-debug-icon"},previewerProps:{debug:!0,title:"\u8C03\u8BD5\u56FE\u6807\u6309\u94AE",filename:"components/button/demo/debug-icon.tsx",jsx:`import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Tooltip, ConfigProvider, Radio, Divider, Space } from 'antd';
const App = () => {
  const [size, setSize] = useState('large');
  return (
    <>
      <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
        <Radio.Button value="large">Large</Radio.Button>
        <Radio.Button value="default">Default</Radio.Button>
        <Radio.Button value="small">Small</Radio.Button>
      </Radio.Group>
      <Divider orientation="left" plain>
        Preview
      </Divider>
      <ConfigProvider componentSize={size}>
        <Space direction="vertical">
          <Space wrap>
            <Tooltip title="search">
              <Button type="primary" shape="circle" icon={<SearchOutlined />} />
            </Tooltip>
            <Button type="primary" shape="circle">
              A
            </Button>
            <Button type="primary" icon={<SearchOutlined />}>
              Search
            </Button>
            <Tooltip title="search">
              <Button shape="circle" icon={<SearchOutlined />} />
            </Tooltip>
            <Button icon={<SearchOutlined />}>Search</Button>
          </Space>
          <Space wrap>
            <Tooltip title="search">
              <Button shape="circle" icon={<SearchOutlined />} />
            </Tooltip>
            <Button icon={<SearchOutlined />}>Search</Button>
            <Tooltip title="search">
              <Button type="dashed" shape="circle" icon={<SearchOutlined />} />
            </Tooltip>
            <Button type="dashed" icon={<SearchOutlined />}>
              Search
            </Button>
            <Button icon={<SearchOutlined />} href="https://www.google.com" />
          </Space>
        </Space>
      </ConfigProvider>
    </>
  );
};
export default App;
`,description:"<p>\u8C03\u8BD5\u4F7F\u7528</p>"}},{demo:{id:"components-button-demo-size"},previewerProps:{title:"\u6309\u94AE\u5C3A\u5BF8",filename:"components/button/demo/size.tsx",jsx:`import React, { useState } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Radio, Space, Divider } from 'antd';
const App = () => {
  const [size, setSize] = useState('large'); // default is 'middle'

  return (
    <>
      <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
        <Radio.Button value="large">Large</Radio.Button>
        <Radio.Button value="default">Default</Radio.Button>
        <Radio.Button value="small">Small</Radio.Button>
      </Radio.Group>
      <Divider orientation="left" plain>
        Preview
      </Divider>
      <Space direction="vertical">
        <Space wrap>
          <Button type="primary" size={size}>
            Primary
          </Button>
          <Button size={size}>Default</Button>
          <Button type="dashed" size={size}>
            Dashed
          </Button>
        </Space>
        <Button type="link" size={size}>
          Link
        </Button>
        <Space wrap>
          <Button type="primary" icon={<DownloadOutlined />} size={size} />
          <Button type="primary" shape="circle" icon={<DownloadOutlined />} size={size} />
          <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size} />
          <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size}>
            Download
          </Button>
          <Button type="primary" icon={<DownloadOutlined />} size={size}>
            Download
          </Button>
        </Space>
      </Space>
    </>
  );
};
export default App;
`,description:`<p>\u6309\u94AE\u6709\u5927\u3001\u4E2D\u3001\u5C0F\u4E09\u79CD\u5C3A\u5BF8\u3002</p>
<p>\u901A\u8FC7\u8BBE\u7F6E <code>size</code> \u4E3A <code>large</code> <code>small</code> \u5206\u522B\u628A\u6309\u94AE\u8BBE\u4E3A\u5927\u3001\u5C0F\u5C3A\u5BF8\u3002\u82E5\u4E0D\u8BBE\u7F6E <code>size</code>\uFF0C\u5219\u5C3A\u5BF8\u4E3A\u4E2D\u3002</p>`}},{demo:{id:"components-button-demo-disabled"},previewerProps:{title:"\u4E0D\u53EF\u7528\u72B6\u6001",filename:"components/button/demo/disabled.tsx",jsx:`import React from 'react';
import { Button, Space } from 'antd';
const App = () => (
  <Space direction="vertical">
    <Space>
      <Button type="primary">Primary</Button>
      <Button type="primary" disabled>
        Primary(disabled)
      </Button>
    </Space>
    <Space>
      <Button>Default</Button>
      <Button disabled>Default(disabled)</Button>
    </Space>
    <Space>
      <Button type="dashed">Dashed</Button>
      <Button type="dashed" disabled>
        Dashed(disabled)
      </Button>
    </Space>
    <Space>
      <Button type="text">Text</Button>
      <Button type="text" disabled>
        Text(disabled)
      </Button>
    </Space>
    <Space>
      <Button type="link">Link</Button>
      <Button type="link" disabled>
        Link(disabled)
      </Button>
    </Space>
    <Space>
      <Button danger>Danger Default</Button>
      <Button danger disabled>
        Danger Default(disabled)
      </Button>
    </Space>
    <Space>
      <Button danger type="text">
        Danger Text
      </Button>
      <Button danger type="text" disabled>
        Danger Text(disabled)
      </Button>
    </Space>
    <Space>
      <Button type="link" danger>
        Danger Link
      </Button>
      <Button type="link" danger disabled>
        Danger Link(disabled)
      </Button>
    </Space>
    <Space className="site-button-ghost-wrapper">
      <Button ghost>Ghost</Button>
      <Button ghost disabled>
        Ghost(disabled)
      </Button>
    </Space>
  </Space>
);
export default App;
`,description:"<p>\u6DFB\u52A0 <code>disabled</code> \u5C5E\u6027\u5373\u53EF\u8BA9\u6309\u94AE\u5904\u4E8E\u4E0D\u53EF\u7528\u72B6\u6001\uFF0C\u540C\u65F6\u6309\u94AE\u6837\u5F0F\u4E5F\u4F1A\u6539\u53D8\u3002</p>"}},{demo:{id:"components-button-demo-loading"},previewerProps:{title:"\u52A0\u8F7D\u4E2D\u72B6\u6001",filename:"components/button/demo/loading.tsx",jsx:`import React, { useState } from 'react';
import { PoweroffOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
const App = () => {
  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };
  return (
    <Space direction="vertical">
      <Space wrap>
        <Button type="primary" loading>
          Loading
        </Button>
        <Button type="primary" size="small" loading>
          Loading
        </Button>
        <Button type="primary" icon={<PoweroffOutlined />} loading />
      </Space>

      <Space wrap>
        <Button type="primary" loading={loadings[0]} onClick={() => enterLoading(0)}>
          Click me!
        </Button>
        <Button
          type="primary"
          icon={<PoweroffOutlined />}
          loading={loadings[1]}
          onClick={() => enterLoading(1)}
        >
          Click me!
        </Button>
        <Button
          type="primary"
          icon={<PoweroffOutlined />}
          loading={loadings[2]}
          onClick={() => enterLoading(2)}
        />
      </Space>
    </Space>
  );
};
export default App;
`,description:"<p>\u6DFB\u52A0 <code>loading</code> \u5C5E\u6027\u5373\u53EF\u8BA9\u6309\u94AE\u5904\u4E8E\u52A0\u8F7D\u72B6\u6001\uFF0C\u6700\u540E\u4E24\u4E2A\u6309\u94AE\u6F14\u793A\u70B9\u51FB\u540E\u8FDB\u5165\u52A0\u8F7D\u72B6\u6001\u3002</p>"}},{demo:{id:"components-button-demo-multiple"},previewerProps:{title:"\u591A\u4E2A\u6309\u94AE\u7EC4\u5408",filename:"components/button/demo/multiple.tsx",jsx:`import React from 'react';
import { Button, Dropdown, Space } from 'antd';
const onMenuClick = (e) => {
  console.log('click', e);
};
const items = [
  {
    key: '1',
    label: '1st item',
  },
  {
    key: '2',
    label: '2nd item',
  },
  {
    key: '3',
    label: '3rd item',
  },
];
const App = () => (
  <Space direction="vertical">
    <Button type="primary">primary</Button>
    <Button>secondary</Button>
    <Dropdown.Button
      menu={{
        items,
        onClick: onMenuClick,
      }}
    >
      Actions
    </Dropdown.Button>
  </Space>
);
export default App;
`,description:'<p>\u6309\u94AE\u7EC4\u5408\u4F7F\u7528\u65F6\uFF0C\u63A8\u8350\u4F7F\u7528 1 \u4E2A\u4E3B\u64CD\u4F5C + n \u4E2A\u6B21\u64CD\u4F5C\uFF0C3 \u4E2A\u4EE5\u4E0A\u64CD\u4F5C\u65F6\u628A\u66F4\u591A\u64CD\u4F5C\u653E\u5230 <a href="/components/dropdown/#components-dropdown-demo-dropdown-button">Dropdown.Button</a> \u4E2D\u7EC4\u5408\u4F7F\u7528\u3002</p>'}},{demo:{id:"components-button-demo-ghost"},previewerProps:{title:"\u5E7D\u7075\u6309\u94AE",filename:"components/button/demo/ghost.tsx",jsx:`import React from 'react';
import { Button, Space } from 'antd';
const App = () => (
  <Space className="site-button-ghost-wrapper" wrap>
    <Button type="primary" ghost>
      Primary
    </Button>
    <Button ghost>Default</Button>
    <Button type="dashed" ghost>
      Dashed
    </Button>
    <Button type="primary" danger ghost>
      Danger
    </Button>
  </Space>
);
export default App;
`,description:"<p>\u5E7D\u7075\u6309\u94AE\u5C06\u6309\u94AE\u7684\u5185\u5BB9\u53CD\u8272\uFF0C\u80CC\u666F\u53D8\u4E3A\u900F\u660E\uFF0C\u5E38\u7528\u5728\u6709\u8272\u80CC\u666F\u4E0A\u3002</p>"}},{demo:{id:"components-button-demo-danger"},previewerProps:{title:"\u5371\u9669\u6309\u94AE",filename:"components/button/demo/danger.tsx",jsx:`import React from 'react';
import { Button, Space } from 'antd';
const App = () => (
  <Space wrap>
    <Button type="primary" danger>
      Primary
    </Button>
    <Button danger>Default</Button>
    <Button type="dashed" danger>
      Dashed
    </Button>
    <Button type="text" danger>
      Text
    </Button>
    <Button type="link" danger>
      Link
    </Button>
  </Space>
);
export default App;
`,description:"<p>\u5728 4.0 \u4E4B\u540E\uFF0C\u5371\u9669\u6210\u4E3A\u4E00\u79CD\u6309\u94AE\u5C5E\u6027\u800C\u4E0D\u662F\u6309\u94AE\u7C7B\u578B\u3002</p>"}},{demo:{id:"components-button-demo-block"},previewerProps:{title:"Block \u6309\u94AE",filename:"components/button/demo/block.tsx",jsx:`import React from 'react';
import { Button, Space } from 'antd';
const App = () => (
  <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
    <Button type="primary" block>
      Primary
    </Button>
    <Button block>Default</Button>
    <Button type="dashed" block>
      Dashed
    </Button>
    <Button type="link" block>
      Link
    </Button>
  </Space>
);
export default App;
`,description:"<p><code>block</code> \u5C5E\u6027\u5C06\u4F7F\u6309\u94AE\u9002\u5408\u5176\u7236\u5BBD\u5EA6\u3002</p>"}},{demo:{id:"components-button-demo-legacy-group"},previewerProps:{debug:!0,title:"\u5E9F\u5F03\u7684 Block \u7EC4",filename:"components/button/demo/legacy-group.tsx",jsx:`import React from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
const getGroup = (props) => (
  <div>
    <Button.Group {...props}>
      <Button type="primary">Button 1</Button>
      <Button type="primary">Button 2</Button>
      <Tooltip title="Tooltip">
        <Button type="primary" icon={<DownloadOutlined />} disabled />
      </Tooltip>
      <Tooltip title="Tooltip">
        <Button type="primary" icon={<DownloadOutlined />} />
      </Tooltip>
    </Button.Group>
  </div>
);
const App = () => (
  <>
    {getGroup({
      size: 'small',
    })}
    <br />
    {getGroup()}
    <br />
    {getGroup({
      size: 'large',
    })}
  </>
);
export default App;
`,description:"<p>Debug usage</p>"}},{demo:{id:"components-button-demo-chinese-chars-loading"},previewerProps:{debug:!0,title:"\u52A0\u8F7D\u4E2D\u72B6\u6001 bug \u8FD8\u539F",filename:"components/button/demo/chinese-chars-loading.tsx",jsx:`// @ts-nocheck
import React from 'react';
import { PoweroffOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
const Text1 = () => '\u90E8\u7F72';
const Text2 = () => <span>\u90E8\u7F72</span>;
const Text3 = () => 'Submit';
const App = () => (
  <Space wrap>
    <Button loading>\u90E8\u7F72</Button>
    <Button loading>
      <Text1 />
    </Button>
    <Button loading>
      <Text2 />
    </Button>
    <Button loading>
      <Text3 />
    </Button>
    <Button loading icon={<PoweroffOutlined />}>
      <Text1 />
    </Button>
    <Button loading>\u6309\u94AE</Button>
  </Space>
);
export default App;
`,description:'<p><a href="https://github.com/ant-design/ant-design/issues/36165">https://github.com/ant-design/ant-design/issues/36165</a></p>'}}]}),(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("h2",{id:"api"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,n.tZ)("span",{className:"icon icon-link"})),"API"),(0,n.tZ)("p",null,t[14].value,(0,n.tZ)("code",null,t[15].value),t[16].value,(0,n.tZ)("code",null,t[17].value),t[18].value,(0,n.tZ)("code",null,t[19].value),t[20].value,(0,n.tZ)("code",null,t[21].value),t[22].value,(0,n.tZ)("code",null,t[23].value),t[24].value),(0,n.tZ)("p",null,t[25].value),(0,n.tZ)(a.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,t[26].value),(0,n.tZ)("th",null,t[27].value),(0,n.tZ)("th",null,t[28].value),(0,n.tZ)("th",null,t[29].value),(0,n.tZ)("th",null,t[30].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[31].value),(0,n.tZ)("td",null,t[32].value),(0,n.tZ)("td",null,t[33].value),(0,n.tZ)("td",null,t[34].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[35].value),(0,n.tZ)("td",null,t[36].value),(0,n.tZ)("td",null,t[37].value),(0,n.tZ)("td",null,t[38].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[39].value),(0,n.tZ)("td",null,t[40].value),(0,n.tZ)("td",null,t[41].value),(0,n.tZ)("td",null,t[42].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[43].value),(0,n.tZ)("td",null,t[44].value),(0,n.tZ)("td",null,t[45].value),(0,n.tZ)("td",null,t[46].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[47].value),(0,n.tZ)("td",null,t[48].value),(0,n.tZ)("td",null,t[49].value),(0,n.tZ)("td",null,t[50].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[51].value),(0,n.tZ)("td",null,t[52].value,(0,n.tZ)("code",null,t[53].value),t[54].value,(0,n.tZ)("code",null,t[55].value),t[56].value,(0,n.tZ)("a",{href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type"},t[57].value)),(0,n.tZ)("td",null,t[58].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[59].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[60].value),(0,n.tZ)("td",null,t[61].value),(0,n.tZ)("td",null,t[62].value),(0,n.tZ)("td",null,t[63].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[64].value),(0,n.tZ)("td",null,t[65].value),(0,n.tZ)("td",null,t[66].value),(0,n.tZ)("td",null,t[67].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[68].value),(0,n.tZ)("td",null,t[69].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[70].value),t[71].value,(0,n.tZ)("code",null,t[72].value),t[73].value,(0,n.tZ)("code",null,t[74].value)),(0,n.tZ)("td",null,t[75].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[76].value),(0,n.tZ)("td",null,t[77].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[78].value),t[79].value,(0,n.tZ)("code",null,t[80].value),t[81].value,(0,n.tZ)("code",null,t[82].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[83].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[84].value),(0,n.tZ)("td",null,t[85].value),(0,n.tZ)("td",null,t[86].value),(0,n.tZ)("td",null,t[87].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[88].value),(0,n.tZ)("td",null,t[89].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[90].value),t[91].value,(0,n.tZ)("code",null,t[92].value),t[93].value,(0,n.tZ)("code",null,t[94].value),t[95].value,(0,n.tZ)("code",null,t[96].value),t[97].value,(0,n.tZ)("code",null,t[98].value),t[99].value,(0,n.tZ)("code",null,t[100].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[101].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[102].value),(0,n.tZ)("td",null,t[103].value),(0,n.tZ)("td",null,t[104].value),(0,n.tZ)("td",null,t[105].value),(0,n.tZ)("td",null)))),(0,n.tZ)("p",null,t[106].value),(0,n.tZ)("h2",{id:"faq"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#faq"},(0,n.tZ)("span",{className:"icon icon-link"})),"FAQ"),(0,n.tZ)("h3",{id:"\u5982\u4F55\u79FB\u9664\u4E24\u4E2A\u6C49\u5B57\u4E4B\u95F4\u7684\u7A7A\u683C"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u5982\u4F55\u79FB\u9664\u4E24\u4E2A\u6C49\u5B57\u4E4B\u95F4\u7684\u7A7A\u683C"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u5982\u4F55\u79FB\u9664\u4E24\u4E2A\u6C49\u5B57\u4E4B\u95F4\u7684\u7A7A\u683C\uFF1F"),(0,n.tZ)("p",null,t[107].value,(0,n.tZ)(o.rU,{to:"/components/config-provider/#API"},t[108].value),t[109].value,(0,n.tZ)("code",null,t[110].value),t[111].value,(0,n.tZ)("code",null,t[112].value),t[113].value),(0,n.tZ)("img",{src:"https://gw.alipayobjects.com/zos/antfincdn/MY%26THAPZrW/38f06cb9-293a-4b42-b183-9f443e79ffea.png",style:{boxShadow:"none",margin:"0",width:"100px"},alt:"\u79FB\u9664\u4E24\u4E2A\u6C49\u5B57\u4E4B\u95F4\u7684\u7A7A\u683C"}),(0,n.tZ)("style",{dangerouslySetInnerHTML:{__html:`
.site-button-ghost-wrapper {
  padding: 16px;
  background: rgb(190, 200, 200);
}

[data-theme="dark"] .site-button-ghost-wrapper {
  background: rgba(255, 255, 255, 0.2);
}
`}}),(0,n.tZ)("h2",{id:"\u8BBE\u8BA1\u6307\u5F15"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u8BBE\u8BA1\u6307\u5F15"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u8BBE\u8BA1\u6307\u5F15"),(0,n.tZ)("ul",null,(0,n.tZ)("li",null,(0,n.tZ)("a",{href:"https://zhuanlan.zhihu.com/p/109644406"},t[114].value))))))}l.default=d}}]);
