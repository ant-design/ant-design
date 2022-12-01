"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[8529],{29350:function(r,l,t){t.r(l);var u=t(2143),_=t(50250),p=t(59378),c=t(78190),v=t(74775),d=t(5937),x=t(2068),g=t(74399),Z=t(46004),f=t(35708),E=t(30138),O=t(56140),s=t(5388),y=t(49545),D=t(92169),h=t(13140),P=t(95127),M=t(74418),S=t(97119),o=t(28257),i=t(67294),e=t(13946);function a(){var m=(0,o.eL)(),n=m.texts;return(0,e.tZ)(o.dY,null,(0,e.tZ)(i.Fragment,null,(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)("p",null,n[0].value,(0,e.tZ)("code",null,n[1].value),n[2].value),(0,e.tZ)("h2",{id:"\u4F55\u65F6\u4F7F\u7528"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F55\u65F6\u4F7F\u7528"},(0,e.tZ)("span",{className:"icon icon-link"})),"\u4F55\u65F6\u4F7F\u7528"),(0,e.tZ)("ul",null,(0,e.tZ)("li",null,n[3].value),(0,e.tZ)("li",null,n[4].value)),(0,e.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,e.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,e.tZ)(s.Z,{items:[{demo:{id:"components-segmented-demo-basic"},previewerProps:{title:"\u57FA\u672C",filename:"components/segmented/demo/basic.tsx",jsx:`import React from 'react';
import { Segmented } from 'antd';
export default () => <Segmented options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']} />;
`,description:"<p>\u6700\u7B80\u5355\u7684\u7528\u6CD5\u3002</p>",style:`.code-box-demo {
  overflow-x: auto;
}

.code-box-demo .ant-segmented {
  margin-bottom: 10px;
}`}},{demo:{id:"components-segmented-demo-block"},previewerProps:{title:"Block \u5206\u6BB5\u9009\u62E9\u5668",filename:"components/segmented/demo/block.tsx",jsx:`import React from 'react';
import { Segmented } from 'antd';
export default () => (
  <Segmented block options={[123, 456, 'longtext-longtext-longtext-longtext']} />
);
`,description:"<p><code>block</code> \u5C5E\u6027\u4F7F\u5176\u9002\u5408\u7236\u5143\u7D20\u5BBD\u5EA6\u3002</p>"}},{demo:{id:"components-segmented-demo-disabled"},previewerProps:{title:"\u4E0D\u53EF\u7528",filename:"components/segmented/demo/disabled.tsx",jsx:`import React from 'react';
import { Segmented } from 'antd';
export default () => (
  <>
    <Segmented options={['Map', 'Transit', 'Satellite']} disabled />
    <br />
    <Segmented
      options={[
        'Daily',
        {
          label: 'Weekly',
          value: 'Weekly',
          disabled: true,
        },
        'Monthly',
        {
          label: 'Quarterly',
          value: 'Quarterly',
          disabled: true,
        },
        'Yearly',
      ]}
    />
  </>
);
`,description:"<p>Segmented \u4E0D\u53EF\u7528\u3002</p>"}},{demo:{id:"components-segmented-demo-controlled"},previewerProps:{title:"\u53D7\u63A7\u6A21\u5F0F",filename:"components/segmented/demo/controlled.tsx",jsx:`import React, { useState } from 'react';
import { Segmented } from 'antd';
const Demo = () => {
  const [value, setValue] = useState('Map');
  return <Segmented options={['Map', 'Transit', 'Satellite']} value={value} onChange={setValue} />;
};
export default Demo;
`,description:"<p>\u53D7\u63A7\u7684 Segmented\u3002</p>"}},{demo:{id:"components-segmented-demo-custom"},previewerProps:{title:"\u81EA\u5B9A\u4E49\u6E32\u67D3",filename:"components/segmented/demo/custom.tsx",jsx:`import React from 'react';
import { Avatar, Segmented } from 'antd';
import { UserOutlined } from '@ant-design/icons';
export default () => (
  <>
    <Segmented
      options={[
        {
          label: (
            <div
              style={{
                padding: 4,
              }}
            >
              <Avatar src="https://joeschmoe.io/api/v1/random" />
              <div>User 1</div>
            </div>
          ),
          value: 'user1',
        },
        {
          label: (
            <div
              style={{
                padding: 4,
              }}
            >
              <Avatar
                style={{
                  backgroundColor: '#f56a00',
                }}
              >
                K
              </Avatar>
              <div>User 2</div>
            </div>
          ),
          value: 'user2',
        },
        {
          label: (
            <div
              style={{
                padding: 4,
              }}
            >
              <Avatar
                style={{
                  backgroundColor: '#87d068',
                }}
                icon={<UserOutlined />}
              />
              <div>User 3</div>
            </div>
          ),
          value: 'user3',
        },
      ]}
    />
    <br />
    <Segmented
      options={[
        {
          label: (
            <div
              style={{
                padding: 4,
              }}
            >
              <div>Spring</div>
              <div>Jan-Mar</div>
            </div>
          ),
          value: 'spring',
        },
        {
          label: (
            <div
              style={{
                padding: 4,
              }}
            >
              <div>Summer</div>
              <div>Apr-Jun</div>
            </div>
          ),
          value: 'summer',
        },
        {
          label: (
            <div
              style={{
                padding: 4,
              }}
            >
              <div>Autumn</div>
              <div>Jul-Sept</div>
            </div>
          ),
          value: 'autumn',
        },
        {
          label: (
            <div
              style={{
                padding: 4,
              }}
            >
              <div>Winter</div>
              <div>Oct-Dec</div>
            </div>
          ),
          value: 'winter',
        },
      ]}
    />
  </>
);
`,description:"<p>\u4F7F\u7528 ReactNode \u81EA\u5B9A\u4E49\u6E32\u67D3\u6BCF\u4E00\u4E2A Segmented Item\u3002</p>"}},{demo:{id:"components-segmented-demo-dynamic"},previewerProps:{title:"\u52A8\u6001\u6570\u636E",filename:"components/segmented/demo/dynamic.tsx",jsx:`import React, { useState } from 'react';
import { Segmented, Button } from 'antd';
const defaultOptions = ['Daily', 'Weekly', 'Monthly'];
const Demo = () => {
  const [options, setOptions] = useState(defaultOptions);
  const [moreLoaded, setMoreLoaded] = useState(false);
  const handleLoadOptions = () => {
    setOptions([...defaultOptions, 'Quarterly', 'Yearly']);
    setMoreLoaded(true);
  };
  return (
    <>
      <Segmented options={options} />
      <br />
      <Button type="primary" disabled={moreLoaded} onClick={handleLoadOptions}>
        Load more options
      </Button>
    </>
  );
};
export default Demo;
`,description:"<p>\u52A8\u6001\u52A0\u8F7D\u6570\u636E\u3002</p>"}},{demo:{id:"components-segmented-demo-size"},previewerProps:{title:"\u4E09\u79CD\u5927\u5C0F",filename:"components/segmented/demo/size.tsx",jsx:`import React from 'react';
import { Segmented } from 'antd';
export default () => (
  <>
    <Segmented size="large" options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']} />
    <br />
    <Segmented options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']} />
    <br />
    <Segmented size="small" options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']} />
  </>
);
`,description:"<p>\u6211\u4EEC\u4E3A <code>&#x3C;Segmented /></code> \u7EC4\u4EF6\u5B9A\u4E49\u4E86\u4E09\u79CD\u5C3A\u5BF8\uFF08\u5927\u3001\u9ED8\u8BA4\u3001\u5C0F\uFF09\uFF0C\u9AD8\u5EA6\u5206\u522B\u4E3A <code>40px</code>\u3001<code>32px</code> \u548C <code>24px</code>\u3002</p>"}},{demo:{id:"components-segmented-demo-with-icon"},previewerProps:{title:"\u8BBE\u7F6E\u56FE\u6807",filename:"components/segmented/demo/with-icon.tsx",jsx:`import React from 'react';
import { Segmented } from 'antd';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
export default () => (
  <Segmented
    options={[
      {
        label: 'List',
        value: 'List',
        icon: <BarsOutlined />,
      },
      {
        label: 'Kanban',
        value: 'Kanban',
        icon: <AppstoreOutlined />,
      },
    ]}
  />
);
`,description:"<p>\u7ED9 Segmented Item \u8BBE\u7F6E Icon\u3002</p>"}},{demo:{id:"components-segmented-demo-icon-only"},previewerProps:{title:"\u53EA\u8BBE\u7F6E\u56FE\u6807",filename:"components/segmented/demo/icon-only.tsx",jsx:`import React from 'react';
import { Segmented } from 'antd';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
export default () => (
  <Segmented
    options={[
      {
        value: 'List',
        icon: <BarsOutlined />,
      },
      {
        value: 'Kanban',
        icon: <AppstoreOutlined />,
      },
    ]}
  />
);
`,description:"<p>\u5728 Segmented Item \u9009\u9879\u4E2D\u53EA\u8BBE\u7F6E Icon\u3002</p>"}},{demo:{id:"components-segmented-demo-controlled-two"},previewerProps:{debug:!0,title:"\u53D7\u63A7\u540C\u6B65\u6A21\u5F0F",filename:"components/segmented/demo/controlled-two.tsx",jsx:`import React, { useState } from 'react';
import { Segmented } from 'antd';
const Demo = () => {
  const [foo, setFoo] = useState('AND');
  return (
    <>
      <Segmented value={foo} options={['AND', 'OR', 'NOT']} onChange={setFoo} />
      &nbsp;&nbsp;
      <Segmented value={foo} options={['AND', 'OR', 'NOT']} onChange={setFoo} />
    </>
  );
};
export default Demo;
`,description:"<p>\u6D4B\u8BD5\u53D7\u63A7\u6A21\u5F0F\u4E0B\u4E24\u4E2A Segmented \u540C\u6B65 state\u3002</p>"}},{demo:{id:"components-segmented-demo-size-consistent"},previewerProps:{debug:!0,title:"\u7EDF\u4E00\u9AD8\u5EA6",filename:"components/segmented/demo/size-consistent.tsx",jsx:`import React from 'react';
import { Button, Input, Select, Segmented } from 'antd';
export default () => (
  <>
    <div>
      <Segmented
        style={{
          marginRight: 6,
        }}
        size="large"
        options={['Daily', 'Weekly', 'Monthly']}
      />
      <Button type="primary" size="large">
        Button
      </Button>
    </div>
    <div>
      <Segmented
        style={{
          marginRight: 6,
        }}
        options={['Daily', 'Weekly', 'Monthly']}
      />
      <Input
        placeholder="default size"
        style={{
          width: 150,
        }}
      />
    </div>
    <div>
      <Segmented
        style={{
          marginRight: 6,
        }}
        size="small"
        options={['Daily', 'Weekly', 'Monthly']}
      />
      <Select
        size="small"
        defaultValue="lucy"
        style={{
          width: 150,
        }}
      >
        <Select.Option value="lucy">Lucy</Select.Option>
      </Select>
    </div>
  </>
);
`,description:"<p>\u4E0E\u5176\u4ED6\u7EC4\u4EF6\u4FDD\u6301\u7EDF\u4E00\u9AD8\u5EA6\u3002</p>"}}]}),(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)("h2",{id:"api"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,e.tZ)("span",{className:"icon icon-link"})),"API"),(0,e.tZ)("blockquote",null,(0,e.tZ)("p",null,n[5].value,(0,e.tZ)("code",null,n[6].value),n[7].value)),(0,e.tZ)("h3",{id:"segmented"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#segmented"},(0,e.tZ)("span",{className:"icon icon-link"})),"Segmented"),(0,e.tZ)(d.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,n[8].value),(0,e.tZ)("th",null,n[9].value),(0,e.tZ)("th",null,n[10].value),(0,e.tZ)("th",null,n[11].value),(0,e.tZ)("th",null,n[12].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[13].value),(0,e.tZ)("td",null,n[14].value),(0,e.tZ)("td",null,n[15].value),(0,e.tZ)("td",null,n[16].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[17].value),(0,e.tZ)("td",null,n[18].value),(0,e.tZ)("td",null,n[19].value),(0,e.tZ)("td",null),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[20].value),(0,e.tZ)("td",null,n[21].value),(0,e.tZ)("td",null,n[22].value),(0,e.tZ)("td",null,n[23].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[24].value),(0,e.tZ)("td",null,n[25].value),(0,e.tZ)("td",null,n[26].value),(0,e.tZ)("td",null),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[27].value),(0,e.tZ)("td",null,n[28].value),(0,e.tZ)("td",null,n[29].value),(0,e.tZ)("td",null,n[30].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[31].value),(0,e.tZ)("td",null,n[32].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,n[33].value),n[34].value,(0,e.tZ)("code",null,n[35].value),n[36].value,(0,e.tZ)("code",null,n[37].value)),(0,e.tZ)("td",null,n[38].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[39].value),(0,e.tZ)("td",null,n[40].value),(0,e.tZ)("td",null,n[41].value),(0,e.tZ)("td",null),(0,e.tZ)("td",null)))))))}l.default=a}}]);
