"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[7729],{37182:function(u,a,t){t.r(a);var c=t(2143),p=t(50250),_=t(59378),g=t(78190),m=t(74775),o=t(5937),v=t(2068),h=t(74399),B=t(46004),x=t(35708),b=t(30138),Z=t(56140),d=t(5388),f=t(49545),A=t(92169),C=t(13140),P=t(95127),w=t(74418),E=t(97119),l=t(28257),s=t(67294),e=t(13946);function r(){var i=(0,l.eL)(),n=i.texts;return(0,e.tZ)(l.dY,null,(0,e.tZ)(s.Fragment,null,(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)("p",null,n[0].value),(0,e.tZ)("h2",{id:"\u4F55\u65F6\u4F7F\u7528"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F55\u65F6\u4F7F\u7528"},(0,e.tZ)("span",{className:"icon icon-link"})),"\u4F55\u65F6\u4F7F\u7528"),(0,e.tZ)("p",null,n[1].value),(0,e.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,e.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,e.tZ)(d.Z,{items:[{demo:{id:"components-badge-demo-basic"},previewerProps:{title:"\u57FA\u672C",filename:"components/badge/demo/basic.tsx",jsx:`import React from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Avatar, Badge, Space } from 'antd';
const App = () => (
  <Space size="middle">
    <Badge count={5}>
      <Avatar shape="square" size="large" />
    </Badge>
    <Badge count={0} showZero>
      <Avatar shape="square" size="large" />
    </Badge>
    <Badge
      count={
        <ClockCircleOutlined
          style={{
            color: '#f5222d',
          }}
        />
      }
    >
      <Avatar shape="square" size="large" />
    </Badge>
  </Space>
);
export default App;
`,description:"<p>\u7B80\u5355\u7684\u5FBD\u7AE0\u5C55\u793A\uFF0C\u5F53 <code>count</code> \u4E3A <code>0</code> \u65F6\uFF0C\u9ED8\u8BA4\u4E0D\u663E\u793A\uFF0C\u4F46\u662F\u53EF\u4EE5\u4F7F\u7528 <code>showZero</code> \u4FEE\u6539\u4E3A\u663E\u793A\u3002</p>"}},{demo:{id:"components-badge-demo-no-wrapper"},previewerProps:{title:"\u72EC\u7ACB\u4F7F\u7528",filename:"components/badge/demo/no-wrapper.tsx",jsx:`import React, { useState } from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Badge, Space, Switch } from 'antd';
const App = () => {
  const [show, setShow] = useState(true);
  return (
    <Space>
      <Switch checked={show} onChange={() => setShow(!show)} />
      <Badge count={show ? 11 : 0} showZero color="#faad14" />
      <Badge count={show ? 25 : 0} />
      <Badge
        count={
          show ? (
            <ClockCircleOutlined
              style={{
                color: '#f5222d',
              }}
            />
          ) : (
            0
          )
        }
      />
      <Badge
        className="site-badge-count-109"
        count={show ? 109 : 0}
        style={{
          backgroundColor: '#52c41a',
        }}
      />
    </Space>
  );
};
export default App;
`,description:`<p>\u4E0D\u5305\u88F9\u4EFB\u4F55\u5143\u7D20\u5373\u662F\u72EC\u7ACB\u4F7F\u7528\uFF0C\u53EF\u81EA\u5B9A\u6837\u5F0F\u5C55\u73B0\u3002</p>
<blockquote>
<p>\u5728\u53F3\u4E0A\u89D2\u7684 badge \u5219\u9650\u5B9A\u4E3A\u7EA2\u8272\u3002</p>
</blockquote>`}},{demo:{id:"components-badge-demo-overflow"},previewerProps:{title:"\u5C01\u9876\u6570\u5B57",filename:"components/badge/demo/overflow.tsx",jsx:`import React from 'react';
import { Avatar, Badge, Space } from 'antd';
const App = () => (
  <Space size="large">
    <Badge count={99}>
      <Avatar shape="square" size="large" />
    </Badge>
    <Badge count={100}>
      <Avatar shape="square" size="large" />
    </Badge>
    <Badge count={99} overflowCount={10}>
      <Avatar shape="square" size="large" />
    </Badge>
    <Badge count={1000} overflowCount={999}>
      <Avatar shape="square" size="large" />
    </Badge>
  </Space>
);
export default App;
`,description:"<p>\u8D85\u8FC7 <code>overflowCount</code> \u7684\u4F1A\u663E\u793A\u4E3A <code>${overflowCount}+</code>\uFF0C\u9ED8\u8BA4\u7684 <code>overflowCount</code> \u4E3A <code>99</code>\u3002</p>"}},{demo:{id:"components-badge-demo-dot"},previewerProps:{title:"\u8BA8\u5ACC\u7684\u5C0F\u7EA2\u70B9",filename:"components/badge/demo/dot.tsx",jsx:`import React from 'react';
import { NotificationOutlined } from '@ant-design/icons';
import { Badge, Space } from 'antd';
const App = () => (
  <Space>
    <Badge dot>
      <NotificationOutlined
        style={{
          fontSize: 16,
        }}
      />
    </Badge>
    <Badge dot>
      <a href="#">Link something</a>
    </Badge>
  </Space>
);
export default App;
`,description:"<p>\u6CA1\u6709\u5177\u4F53\u7684\u6570\u5B57\u3002</p>"}},{demo:{id:"components-badge-demo-change"},previewerProps:{title:"\u52A8\u6001",filename:"components/badge/demo/change.tsx",jsx:`import React, { useState } from 'react';
import { MinusOutlined, PlusOutlined, QuestionOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Switch, Space } from 'antd';
const ButtonGroup = Button.Group;
const App = () => {
  const [count, setCount] = useState(5);
  const [show, setShow] = useState(true);
  const increase = () => {
    setCount(count + 1);
  };
  const decline = () => {
    let newCount = count - 1;
    if (newCount < 0) {
      newCount = 0;
    }
    setCount(newCount);
  };
  const random = () => {
    const newCount = Math.floor(Math.random() * 100);
    setCount(newCount);
  };
  const onChange = (checked) => {
    setShow(checked);
  };
  return (
    <Space direction="vertical">
      <Space size="large">
        <Badge count={count}>
          <Avatar shape="square" size="large" />
        </Badge>
        <ButtonGroup>
          <Button onClick={decline} icon={<MinusOutlined />} />
          <Button onClick={increase} icon={<PlusOutlined />} />
          <Button onClick={random} icon={<QuestionOutlined />} />
        </ButtonGroup>
      </Space>
      <Space size="large">
        <Badge dot={show}>
          <Avatar shape="square" size="large" />
        </Badge>
        <Switch onChange={onChange} checked={show} />
      </Space>
    </Space>
  );
};
export default App;
`,description:"<p>\u5C55\u793A\u52A8\u6001\u53D8\u5316\u7684\u6548\u679C\u3002</p>"}},{demo:{id:"components-badge-demo-link"},previewerProps:{title:"\u53EF\u70B9\u51FB",filename:"components/badge/demo/link.tsx",jsx:`import React from 'react';
import { Avatar, Badge } from 'antd';
const App = () => (
  <a href="#">
    <Badge count={5}>
      <Avatar shape="square" size="large" />
    </Badge>
  </a>
);
export default App;
`,description:"<p>\u7528 a \u6807\u7B7E\u8FDB\u884C\u5305\u88F9\u5373\u53EF\u3002</p>"}},{demo:{id:"components-badge-demo-offset"},previewerProps:{title:"\u81EA\u5B9A\u4E49\u4F4D\u7F6E\u504F\u79FB",filename:"components/badge/demo/offset.tsx",jsx:`import React from 'react';
import { Avatar, Badge } from 'antd';
const App = () => (
  <Badge count={5} offset={[10, 10]}>
    <Avatar shape="square" size="large" />
  </Badge>
);
export default App;
`,description:"<p>\u8BBE\u7F6E\u72B6\u6001\u70B9\u7684\u4F4D\u7F6E\u504F\u79FB\uFF0C\u683C\u5F0F\u4E3A <code>[left, top]</code>\uFF0C\u8868\u793A\u72B6\u6001\u70B9\u8DDD\u9ED8\u8BA4\u4F4D\u7F6E\u5DE6\u4FA7\u3001\u4E0A\u65B9\u7684\u504F\u79FB\u91CF\u3002</p>"}},{demo:{id:"components-badge-demo-size"},previewerProps:{title:"\u5927\u5C0F",filename:"components/badge/demo/size.tsx",jsx:`import React from 'react';
import { Avatar, Badge, Space } from 'antd';
const App = () => (
  <Space size="middle">
    <Badge size="default" count={5}>
      <Avatar shape="square" size="large" />
    </Badge>
    <Badge size="small" count={5}>
      <Avatar shape="square" size="large" />
    </Badge>
  </Space>
);
export default App;
`,description:"<p>\u53EF\u4EE5\u8BBE\u7F6E\u6709\u6570\u5B57\u5FBD\u6807\u7684\u5927\u5C0F\u3002</p>"}},{demo:{id:"components-badge-demo-status"},previewerProps:{title:"\u72B6\u6001\u70B9",filename:"components/badge/demo/status.tsx",jsx:`import React from 'react';
import { Badge, Space } from 'antd';
const App = () => (
  <>
    <Space>
      <Badge status="success" />
      <Badge status="error" />
      <Badge status="default" />
      <Badge status="processing" />
      <Badge status="warning" />
    </Space>
    <br />
    <Space direction="vertical">
      <Badge status="success" text="Success" />
      <Badge status="error" text="Error" />
      <Badge status="default" text="Default" />
      <Badge status="processing" text="Processing" />
      <Badge status="warning" text="Warning" />
    </Space>
  </>
);
export default App;
`,description:"<p>\u7528\u4E8E\u8868\u793A\u72B6\u6001\u7684\u5C0F\u5706\u70B9\u3002</p>"}},{demo:{id:"components-badge-demo-colorful"},previewerProps:{title:"\u591A\u5F69\u5FBD\u6807",filename:"components/badge/demo/colorful.tsx",jsx:`import React from 'react';
import { Badge, Divider, Space } from 'antd';
const colors = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
];
const App = () => (
  <>
    <Divider orientation="left">Presets</Divider>
    <Space direction="vertical">
      {colors.map((color) => (
        <Badge key={color} color={color} text={color} />
      ))}
    </Space>
    <Divider orientation="left">Custom</Divider>
    <Space direction="vertical">
      <Badge color="#f50" text="#f50" />
      <Badge color="rgb(45, 183, 245)" text="rgb(45, 183, 245)" />
      <Badge color="hsl(102, 53%, 61%)" text="hsl(102, 53%, 61%)" />
      <Badge color="hwb(205 6% 9%)" text="hwb(205 6% 9%)" />
    </Space>
  </>
);
export default App;
`,description:"<p>\u6211\u4EEC\u6DFB\u52A0\u4E86\u591A\u79CD\u9884\u8BBE\u8272\u5F69\u7684\u5FBD\u6807\u6837\u5F0F\uFF0C\u7528\u4F5C\u4E0D\u540C\u573A\u666F\u4F7F\u7528\u3002\u5982\u679C\u9884\u8BBE\u503C\u4E0D\u80FD\u6EE1\u8DB3\u4F60\u7684\u9700\u6C42\uFF0C\u53EF\u4EE5\u8BBE\u7F6E\u4E3A\u5177\u4F53\u7684\u8272\u503C\u3002</p>"}},{demo:{id:"components-badge-demo-ribbon"},previewerProps:{title:"\u7F0E\u5E26",filename:"components/badge/demo/ribbon.tsx",jsx:`import React from 'react';
import { Badge, Card, Space } from 'antd';
const App = () => (
  <Space
    direction="vertical"
    size="middle"
    style={{
      width: '100%',
    }}
  >
    <Badge.Ribbon text="Hippies">
      <Card title="Pushes open the window" size="small">
        and raises the spyglass.
      </Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="Hippies" color="pink">
      <Card title="Pushes open the window" size="small">
        and raises the spyglass.
      </Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="Hippies" color="red">
      <Card title="Pushes open the window" size="small">
        and raises the spyglass.
      </Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="Hippies" color="cyan">
      <Card title="Pushes open the window" size="small">
        and raises the spyglass.
      </Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="Hippies" color="green">
      <Card title="Pushes open the window" size="small">
        and raises the spyglass.
      </Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="Hippies" color="purple">
      <Card title="Pushes open the window" size="small">
        and raises the spyglass.
      </Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="Hippies" color="volcano">
      <Card title="Pushes open the window" size="small">
        and raises the spyglass.
      </Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="Hippies" color="magenta">
      <Card title="Pushes open the window" size="small">
        and raises the spyglass.
      </Card>
    </Badge.Ribbon>
  </Space>
);
export default App;
`}},{demo:{id:"components-badge-demo-ribbon-debug"},previewerProps:{debug:!0,title:"Ribbon Debug",filename:"components/badge/demo/ribbon-debug.tsx",jsx:`import React from 'react';
import { Badge, Card, Space } from 'antd';
const App = () => (
  <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
    <Badge.Ribbon text="\u5566\u5566\u5566\u5566">
      <Card>\u63A8\u5F00\u7A97\u6237\u4E3E\u8D77\u671B\u8FDC\u955C</Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="\u5566\u5566\u5566\u5566" color="purple">
      <Card>\u63A8\u5F00\u7A97\u6237\u4E3E\u8D77\u671B\u8FDC\u955C</Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="\u5566\u5566\u5566\u5566" color="#2db7f5">
      <Card>\u63A8\u5F00\u7A97\u6237\u4E3E\u8D77\u671B\u8FDC\u955C</Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="\u5566\u5566\u5566\u5566" color="#2db7f5" placement="start">
      <Card>\u63A8\u5F00\u7A97\u6237\u4E3E\u8D77\u671B\u8FDC\u955C</Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="\u5566\u5566\u5566\u5566" color="#2db7f5" placement="end">
      <Card>\u63A8\u5F00\u7A97\u6237\u4E3E\u8D77\u671B\u8FDC\u955C</Card>
    </Badge.Ribbon>
  </Space>
);
export default App;
`,description:"<p>Buggy!</p>"}},{demo:{id:"components-badge-demo-mix"},previewerProps:{debug:!0,title:"\u5404\u79CD\u6DF7\u7528\u7684\u60C5\u51B5",filename:"components/badge/demo/mix.tsx",jsx:`import React from 'react';
import { Avatar, Badge, Space } from 'antd';
const App = () => (
  <Space size="middle" wrap>
    <Space size="middle" wrap>
      <Badge count={5} status="success">
        <Avatar shape="square" size="large" />
      </Badge>
      <Badge count={5} status="warning">
        <Avatar shape="square" size="large" />
      </Badge>
      <Badge count={5} color="blue">
        <Avatar shape="square" size="large" />
      </Badge>
      <Badge count={5} color="#fa541c">
        <Avatar shape="square" size="large" />
      </Badge>
      <Badge dot status="success">
        <Avatar shape="square" size="large" />
      </Badge>
      <Badge dot status="warning">
        <Avatar shape="square" size="large" />
      </Badge>
      <Badge dot color="blue">
        <Avatar shape="square" size="large" />
      </Badge>
      <Badge dot color="#fa541c">
        <Avatar shape="square" size="large" />
      </Badge>
    </Space>

    <Space size="middle" wrap>
      <Badge count={0} showZero />
      <Badge count={0} showZero color="blue" />
      <Badge count={0} showZero color="#f0f" />
      <Badge count={0} showZero>
        <Avatar shape="square" size="large" />
      </Badge>
      <Badge count={0} showZero color="blue">
        <Avatar shape="square" size="large" />
      </Badge>
    </Space>
  </Space>
);
export default App;
`,description:"<p>\u6D4B\u8BD5 <code>count</code> <code>stauts</code> <code>color</code> <code>dot</code> \u5171\u7528\u7684\u60C5\u51B5\u3002</p>"}},{demo:{id:"components-badge-demo-title"},previewerProps:{debug:!0,title:"\u81EA\u5B9A\u4E49\u6807\u9898",filename:"components/badge/demo/title.tsx",jsx:`import React from 'react';
import { Avatar, Badge, Space } from 'antd';
const App = () => (
  <Space size="large">
    <Badge count={5} title="Custom hover text">
      <Avatar shape="square" size="large" />
    </Badge>
    <Badge count={-5} title="Negative">
      <Avatar shape="square" size="large" />
    </Badge>
  </Space>
);
export default App;
`,description:"<p>\u8BBE\u7F6E\u9F20\u6807\u653E\u5728\u72B6\u6001\u70B9\u4E0A\u65F6\u663E\u793A\u7684\u6587\u5B57\u3002</p>"}},{demo:{id:"components-badge-demo-colorful-with-count-debug"},previewerProps:{debug:!0,title:"\u591A\u5F69\u5FBD\u6807\u652F\u6301 count \u663E\u793A Debug",filename:"components/badge/demo/colorful-with-count-debug.tsx",jsx:`import React from 'react';
import { Badge, Space } from 'antd';
const colors = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
];
const App = () => (
  <Space wrap size={['large', 'middle']}>
    {colors.map((color) => (
      <Badge color={color} count={44} key={color}>
        <div
          style={{
            width: 90,
            height: 90,
            lineHeight: '90px',
            background: '#ccc',
            textAlign: 'center',
          }}
        >
          {color}
        </div>
      </Badge>
    ))}
  </Space>
);
export default App;
`,description:"<p>\u5728\u4F7F\u7528\u591A\u5F69\u5FBD\u6807\u7684\u540C\u65F6\uFF0C\u652F\u6301 count \u5C5E\u6027\u663E\u793A</p>"}}]}),(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)("h2",{id:"api"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,e.tZ)("span",{className:"icon icon-link"})),"API"),(0,e.tZ)("h3",{id:"badge"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#badge"},(0,e.tZ)("span",{className:"icon icon-link"})),"Badge"),(0,e.tZ)(o.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,n[2].value),(0,e.tZ)("th",null,n[3].value),(0,e.tZ)("th",null,n[4].value),(0,e.tZ)("th",null,n[5].value),(0,e.tZ)("th",null,n[6].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[7].value),(0,e.tZ)("td",null,n[8].value),(0,e.tZ)("td",null,n[9].value),(0,e.tZ)("td",null,n[10].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[11].value),(0,e.tZ)("td",null,n[12].value,(0,e.tZ)("code",null,n[13].value),n[14].value),(0,e.tZ)("td",null,n[15].value),(0,e.tZ)("td",null,n[16].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[17].value),(0,e.tZ)("td",null,n[18].value),(0,e.tZ)("td",null,n[19].value),(0,e.tZ)("td",null,n[20].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[21].value),(0,e.tZ)("td",null,n[22].value),(0,e.tZ)("td",null,n[23].value),(0,e.tZ)("td",null,n[24].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[25].value),(0,e.tZ)("td",null,n[26].value),(0,e.tZ)("td",null,n[27].value),(0,e.tZ)("td",null,n[28].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[29].value),(0,e.tZ)("td",null,n[30].value),(0,e.tZ)("td",null,n[31].value),(0,e.tZ)("td",null,n[32].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[33].value),(0,e.tZ)("td",null,n[34].value,(0,e.tZ)("code",null,n[35].value),n[36].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,n[37].value),n[38].value,(0,e.tZ)("code",null,n[39].value)),(0,e.tZ)("td",null,n[40].value),(0,e.tZ)("td",null,n[41].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[42].value),(0,e.tZ)("td",null,n[43].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,n[44].value),n[45].value,(0,e.tZ)("code",null,n[46].value),n[47].value,(0,e.tZ)("code",null,n[48].value),n[49].value,(0,e.tZ)("code",null,n[50].value),n[51].value,(0,e.tZ)("code",null,n[52].value)),(0,e.tZ)("td",null,n[53].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[54].value),(0,e.tZ)("td",null,n[55].value,(0,e.tZ)("code",null,n[56].value),n[57].value),(0,e.tZ)("td",null,n[58].value),(0,e.tZ)("td",null,n[59].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[60].value),(0,e.tZ)("td",null,n[61].value),(0,e.tZ)("td",null,n[62].value),(0,e.tZ)("td",null,n[63].value),(0,e.tZ)("td",null)))),(0,e.tZ)("h3",{id:"badgeribbon-450"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#badgeribbon-450"},(0,e.tZ)("span",{className:"icon icon-link"})),"Badge.Ribbon (4.5.0+)"),(0,e.tZ)(o.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,n[64].value),(0,e.tZ)("th",null,n[65].value),(0,e.tZ)("th",null,n[66].value),(0,e.tZ)("th",null,n[67].value),(0,e.tZ)("th",null,n[68].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[69].value),(0,e.tZ)("td",null,n[70].value),(0,e.tZ)("td",null,n[71].value),(0,e.tZ)("td",null,n[72].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[73].value),(0,e.tZ)("td",null,n[74].value,(0,e.tZ)("code",null,n[75].value),n[76].value,(0,e.tZ)("code",null,n[77].value),n[78].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,n[79].value),n[80].value,(0,e.tZ)("code",null,n[81].value)),(0,e.tZ)("td",null,(0,e.tZ)("code",null,n[82].value)),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[83].value),(0,e.tZ)("td",null,n[84].value),(0,e.tZ)("td",null,n[85].value),(0,e.tZ)("td",null,n[86].value),(0,e.tZ)("td",null)))))))}a.default=r}}]);
