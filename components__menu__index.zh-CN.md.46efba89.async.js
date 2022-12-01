"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[9527],{7015:function(p,a,t){t.r(a);var c=t(2143),Z=t(50250),v=t(59378),g=t(78190),u=t(74775),i=t(5937),o=t(2068),_=t(74399),h=t(46004),O=t(35708),I=t(30138),b=t(56140),d=t(5388),M=t(49545),f=t(92169),y=t(13140),x=t(95127),k=t(74418),C=t(97119),l=t(28257),s=t(67294),n=t(13946);function m(){var r=(0,l.eL)(),e=r.texts;return(0,n.tZ)(l.dY,null,(0,n.tZ)(s.Fragment,null,(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("p",null,e[0].value),(0,n.tZ)("h2",{id:"\u4F55\u65F6\u4F7F\u7528"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F55\u65F6\u4F7F\u7528"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4F55\u65F6\u4F7F\u7528"),(0,n.tZ)("p",null,e[1].value),(0,n.tZ)("p",null,e[2].value,(0,n.tZ)(l.rU,{to:"/components/layout-cn"},e[3].value),e[4].value),(0,n.tZ)("h2",{id:"\u5F00\u53D1\u8005\u6CE8\u610F\u4E8B\u9879"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u5F00\u53D1\u8005\u6CE8\u610F\u4E8B\u9879"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u5F00\u53D1\u8005\u6CE8\u610F\u4E8B\u9879"),(0,n.tZ)("ul",null,(0,n.tZ)("li",null,e[5].value,(0,n.tZ)("code",null,e[6].value),e[7].value,(0,n.tZ)("a",{href:"https://html.spec.whatwg.org/multipage/grouping-content.html#the-ul-element"},(0,n.tZ)("code",null,e[8].value),e[9].value,(0,n.tZ)("code",null,e[10].value),e[11].value),e[12].value,(0,n.tZ)("code",null,e[13].value),e[14].value),(0,n.tZ)("li",null,e[15].value,(0,n.tZ)("code",null,e[16].value),e[17].value)),(0,n.tZ)("h3",{id:"4200-\u7528\u6CD5\u5347\u7EA7"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#4200-\u7528\u6CD5\u5347\u7EA7"},(0,n.tZ)("span",{className:"icon icon-link"})),"4.20.0 \u7528\u6CD5\u5347\u7EA7")),(0,n.tZ)(o.Z,{message:"\u5728 4.20.0 \u7248\u672C\u540E\uFF0C\u6211\u4EEC\u63D0\u4F9B\u4E86 <Menu items={[...]} /> \u7684\u7B80\u5199\u65B9\u5F0F\uFF0C\u6709\u66F4\u597D\u7684\u6027\u80FD\u548C\u66F4\u65B9\u4FBF\u7684\u6570\u636E\u7EC4\u7EC7\u65B9\u5F0F\uFF0C\u5F00\u53D1\u8005\u4E0D\u518D\u9700\u8981\u81EA\u884C\u62FC\u63A5 JSX\u3002\u540C\u65F6\u6211\u4EEC\u5E9F\u5F03\u4E86\u539F\u5148\u7684\u5199\u6CD5\uFF0C\u4F60\u8FD8\u662F\u53EF\u4EE5\u5728 4.x \u7EE7\u7EED\u4F7F\u7528\uFF0C\u4F46\u4F1A\u5728\u63A7\u5236\u53F0\u770B\u5230\u8B66\u544A\uFF0C\u5E76\u4F1A\u5728 5.0 \u540E\u79FB\u9664\u3002"}),(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)(u.Z,{lang:"jsx"},e[18].value),(0,n.tZ)("p",null,(0,n.tZ)("code",null,e[19].value),e[20].value,(0,n.tZ)("a",{href:"https://github.com/ant-design/ant-design/tree/4.19.5/components/menu/demo"},e[21].value),e[22].value),(0,n.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,n.tZ)(d.Z,{items:[{demo:{id:"components-menu-demo-deprecated"},previewerProps:{title:"\u57FA\u7840\u7528\u6CD5\uFF08\u5E9F\u5F03\u7684\u8BED\u6CD5\u7CD6\uFF09",filename:"components/menu/demo/deprecated.tsx",jsx:`import React from 'react';
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
const App = () => (
  <Menu mode="horizontal" defaultSelectedKeys={['mail']}>
    <Menu.Item key="mail" icon={<MailOutlined />}>
      Navigation One
    </Menu.Item>
    <Menu.SubMenu key="SubMenu" title="Navigation Two - Submenu" icon={<SettingOutlined />}>
      <Menu.Item key="two" icon={<AppstoreOutlined />}>
        Navigation Two
      </Menu.Item>
      <Menu.Item key="three" icon={<AppstoreOutlined />}>
        Navigation Three
      </Menu.Item>
      <Menu.ItemGroup title="Item Group">
        <Menu.Item key="four" icon={<AppstoreOutlined />}>
          Navigation Four
        </Menu.Item>
        <Menu.Item key="five" icon={<AppstoreOutlined />}>
          Navigation Five
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu.SubMenu>
  </Menu>
);
export default App;
`,description:"<p>\u901A\u8FC7\u8BED\u6CD5\u7CD6\u7684\u65B9\u5F0F\u7EC4\u7EC7\u83DC\u5355\u76EE\u5F55\u6811\uFF0C\u5728 <code>4.20.0</code> \u4E4B\u540E\u63A8\u8350\u901A\u8FC7 <code>items</code> \u5C5E\u6027\u5B9E\u73B0\u3002\u5728\u4E0B\u4E2A\u5927\u7248\u672C\u4E2D\u8BED\u6CD5\u7CD6\u7528\u6CD5\u5C06\u88AB\u79FB\u9664\u4ECE\u800C\u8BA9 Menu \u53EF\u4EE5\u83B7\u5F97\u66F4\u597D\u7684\u6027\u80FD\u4F18\u5316\u3002</p>"}},{demo:{id:"components-menu-demo-horizontal"},previewerProps:{title:"\u9876\u90E8\u5BFC\u822A",filename:"components/menu/demo/horizontal.tsx",jsx:`import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
const items = [
  {
    label: 'Navigation One',
    key: 'mail',
    icon: <MailOutlined />,
  },
  {
    label: 'Navigation Two',
    key: 'app',
    icon: <AppstoreOutlined />,
    disabled: true,
  },
  {
    label: 'Navigation Three - Submenu',
    key: 'SubMenu',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
  {
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
      </a>
    ),
    key: 'alipay',
  },
];
const App = () => {
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default App;
`,description:"<p>\u6C34\u5E73\u7684\u9876\u90E8\u5BFC\u822A\u83DC\u5355\u3002</p>"}},{demo:{id:"components-menu-demo-inline"},previewerProps:{title:"\u5185\u5D4C\u83DC\u5355",filename:"components/menu/demo/inline.tsx",jsx:`import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
    getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
  ]),
  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),
  getItem('Navigation Three', 'sub4', <SettingOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),
  getItem('Group', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
];
const App = () => {
  const onClick = (e) => {
    console.log('click ', e);
  };
  return (
    <Menu
      onClick={onClick}
      style={{
        width: 256,
      }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
};
export default App;
`,description:"<p>\u5782\u76F4\u83DC\u5355\uFF0C\u5B50\u83DC\u5355\u5185\u5D4C\u5728\u83DC\u5355\u533A\u57DF\u3002</p>"}},{demo:{id:"components-menu-demo-inline-collapsed"},previewerProps:{title:"\u7F29\u8D77\u5185\u5D4C\u83DC\u5355",filename:"components/menu/demo/inline-collapsed.tsx",jsx:`import React, { useState } from 'react';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('Option 3', '3', <ContainerOutlined />),
  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Option 7', '7'),
    getItem('Option 8', '8'),
  ]),
  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
  ]),
];
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div
      style={{
        width: 256,
      }}
    >
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};
export default App;
`,description:`<p>\u5185\u5D4C\u83DC\u5355\u53EF\u4EE5\u88AB\u7F29\u8D77/\u5C55\u5F00\u3002</p>
<p>\u4F60\u53EF\u4EE5\u5728 <a href="/components/layout/#components-layout-demo-side">Layout</a> \u91CC\u67E5\u770B\u4FA7\u8FB9\u5E03\u5C40\u7ED3\u5408\u7684\u5B8C\u6574\u793A\u4F8B\u3002</p>`}},{demo:{id:"components-menu-demo-sider-current"},previewerProps:{title:"\u53EA\u5C55\u5F00\u5F53\u524D\u7236\u7EA7\u83DC\u5355",filename:"components/menu/demo/sider-current.tsx",jsx:`import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem('Option 1', '1'),
    getItem('Option 2', '2'),
    getItem('Option 3', '3'),
    getItem('Option 4', '4'),
  ]),
  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),
  getItem('Navigation Three', 'sub4', <SettingOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),
];

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
const App = () => {
  const [openKeys, setOpenKeys] = useState(['sub1']);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{
        width: 256,
      }}
      items={items}
    />
  );
};
export default App;
`,description:"<p>\u70B9\u51FB\u83DC\u5355\uFF0C\u6536\u8D77\u5176\u4ED6\u5C55\u5F00\u7684\u6240\u6709\u83DC\u5355\uFF0C\u4FDD\u6301\u83DC\u5355\u805A\u7126\u7B80\u6D01\u3002</p>"}},{demo:{id:"components-menu-demo-vertical"},previewerProps:{title:"\u5782\u76F4\u83DC\u5355",filename:"components/menu/demo/vertical.tsx",jsx:`import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem('Item 1', null, null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
    getItem('Item 2', null, null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
  ]),
  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),
  getItem('Navigation Three', 'sub4', <SettingOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),
];
const onClick = (e) => {
  console.log('click', e);
};
const App = () => (
  <Menu
    onClick={onClick}
    style={{
      width: 256,
    }}
    mode="vertical"
    items={items}
  />
);
export default App;
`,description:"<p>\u5B50\u83DC\u5355\u662F\u5F39\u51FA\u7684\u5F62\u5F0F\u3002</p>"}},{demo:{id:"components-menu-demo-theme"},previewerProps:{title:"\u4E3B\u9898",filename:"components/menu/demo/theme.tsx",jsx:`import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, Switch } from 'antd';
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem('Option 1', '1'),
    getItem('Option 2', '2'),
    getItem('Option 3', '3'),
    getItem('Option 4', '4'),
  ]),
  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),
  getItem('Navigation Three', 'sub4', <SettingOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),
];
const App = () => {
  const [theme, setTheme] = useState('dark');
  const [current, setCurrent] = useState('1');
  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <>
      <Switch
        checked={theme === 'dark'}
        onChange={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />
      <br />
      <br />
      <Menu
        theme={theme}
        onClick={onClick}
        style={{
          width: 256,
        }}
        defaultOpenKeys={['sub1']}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
    </>
  );
};
export default App;
`,description:"<p>\u5185\u5EFA\u4E86\u4E24\u5957\u4E3B\u9898 <code>light</code> \u548C <code>dark</code>\uFF0C\u9ED8\u8BA4 <code>light</code>\u3002</p>"}},{demo:{id:"components-menu-demo-submenu-theme"},previewerProps:{title:"\u5B50\u83DC\u5355\u4E3B\u9898",filename:"components/menu/demo/submenu-theme.tsx",jsx:`import React, { useState } from 'react';
import { MailOutlined } from '@ant-design/icons';
import { Menu, Switch } from 'antd';
function getItem(label, key, icon, children, theme) {
  return {
    key,
    icon,
    children,
    label,
    theme,
  };
}
const App = () => {
  const [theme, setTheme] = useState('light');
  const [current, setCurrent] = useState('1');
  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };
  const onClick = (e) => {
    setCurrent(e.key);
  };
  const items = [
    getItem(
      'Navigation One',
      'sub1',
      <MailOutlined />,
      [getItem('Option 1', '1'), getItem('Option 2', '2'), getItem('Option 3', '3')],
      theme,
    ),
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
  ];
  return (
    <>
      <Switch
        checked={theme === 'dark'}
        onChange={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />
      <br />
      <br />
      <Menu
        onClick={onClick}
        style={{
          width: 256,
        }}
        openKeys={['sub1']}
        selectedKeys={[current]}
        mode="vertical"
        theme="dark"
        items={items}
      />
    </>
  );
};
export default App;
`,description:"<p>\u4F60\u53EF\u4EE5\u901A\u8FC7 <code>theme</code> \u5C5E\u6027\u6765\u8BBE\u7F6E SubMenu \u7684\u4E3B\u9898\u4ECE\u800C\u8FBE\u5230\u4E0D\u540C\u76EE\u5F55\u6811\u4E0B\u4E0D\u540C\u4E3B\u9898\u8272\u7684\u6548\u679C\u3002\u8BE5\u4F8B\u5B50\u9ED8\u8BA4\u4E3A\u6839\u76EE\u5F55\u6DF1\u8272\uFF0C\u5B50\u76EE\u5F55\u6D45\u8272\u6548\u679C\u3002</p>"}},{demo:{id:"components-menu-demo-switch-mode"},previewerProps:{title:"\u5207\u6362\u83DC\u5355\u7C7B\u578B",filename:"components/menu/demo/switch-mode.tsx",jsx:`import React, { useState } from 'react';
import {
  AppstoreOutlined,
  CalendarOutlined,
  LinkOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Divider, Menu, Switch } from 'antd';
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Navigation One', '1', <MailOutlined />),
  getItem('Navigation Two', '2', <CalendarOutlined />),
  getItem('Navigation Two', 'sub1', <AppstoreOutlined />, [
    getItem('Option 3', '3'),
    getItem('Option 4', '4'),
    getItem('Submenu', 'sub1-2', null, [getItem('Option 5', '5'), getItem('Option 6', '6')]),
  ]),
  getItem('Navigation Three', 'sub2', <SettingOutlined />, [
    getItem('Option 7', '7'),
    getItem('Option 8', '8'),
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
  ]),
  getItem(
    <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
      Ant Design
    </a>,
    'link',
    <LinkOutlined />,
  ),
];
const App = () => {
  const [mode, setMode] = useState('inline');
  const [theme, setTheme] = useState('light');
  const changeMode = (value) => {
    setMode(value ? 'vertical' : 'inline');
  };
  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };
  return (
    <>
      <Switch onChange={changeMode} /> Change Mode
      <Divider type="vertical" />
      <Switch onChange={changeTheme} /> Change Style
      <br />
      <br />
      <Menu
        style={{
          width: 256,
        }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode={mode}
        theme={theme}
        items={items}
      />
    </>
  );
};
export default App;
`,description:"<p>\u5C55\u793A\u52A8\u6001\u5207\u6362\u6A21\u5F0F\u3002</p>"}},{demo:{id:"components-menu-demo-style-debug"},previewerProps:{debug:!0,title:"Style debug",filename:"components/menu/demo/style-debug.tsx",jsx:`import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import { Menu, Switch } from 'antd';
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Navigation One Long Long Long Long', 'sub1', <MailOutlined />, [
    getItem('Option 1', '1'),
    getItem('Option 2', '2'),
    getItem('Option 3', '3'),
    getItem('Option 4', '4'),
  ]),
  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),
  getItem('Option 11', '11'),
  getItem('Option 12', '12'),
];
const App = () => {
  const [theme, setTheme] = useState('dark');
  const [current, setCurrent] = useState('1');
  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <>
      <Switch
        checked={theme === 'dark'}
        onChange={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />
      <br />
      <br />
      <Menu
        theme={theme}
        onClick={onClick}
        selectedKeys={[current]}
        mode="inline"
        items={items}
        inlineCollapsed
        // Test only. Remove in future.
        _internalRenderMenuItem={(node) =>
          React.cloneElement(node, {
            style: {
              ...node.props.style,
              textDecoration: 'underline',
            },
          })
        }
        // Test only. Remove in future.
        _internalRenderSubMenuItem={(node) =>
          React.cloneElement(node, {
            style: {
              ...node.props.style,
              background: 'rgba(255,255,255,0.3)',
            },
          })
        }
        // Test only. Remove in future.
        _internalDisableMenuItemTitleTooltip
      />
    </>
  );
};
export default App;
`,description:"<p>buggy!</p>"}},{demo:{id:"components-menu-demo-menu-v4"},previewerProps:{debug:!0,title:"v4 \u7248\u672C Menu",filename:"components/menu/demo/menu-v4.tsx",jsx:`import React, { useState } from 'react';
import {
  AppstoreOutlined,
  CalendarOutlined,
  LinkOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Menu, Switch, ConfigProvider } from 'antd';
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Navigation One', '1', <MailOutlined />),
  getItem('Navigation Two', '2', <CalendarOutlined />),
  getItem('Navigation Two', 'sub1', <AppstoreOutlined />, [
    getItem('Option 3', '3'),
    getItem('Option 4', '4'),
    getItem('Submenu', 'sub1-2', null, [getItem('Option 5', '5'), getItem('Option 6', '6')]),
  ]),
  getItem('Navigation Three', 'sub2', <SettingOutlined />, [
    getItem('Option 7', '7'),
    getItem('Option 8', '8'),
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
  ]),
  getItem(
    <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
      Ant Design
    </a>,
    'link',
    <LinkOutlined />,
  ),
];
const App = () => {
  const [mode, setMode] = useState('inline');
  const changeMode = (value) => {
    setMode(value ? 'vertical' : 'inline');
  };
  return (
    <>
      <Switch onChange={changeMode} /> Change Mode
      <br />
      <br />
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              radiusItem: 0,
              radiusSubMenuItem: 0,
              colorItemTextHover: '#1890ff',
              colorItemTextSelected: '#1890ff',
              colorItemBgSelected: '#e6f7ff',
              colorActiveBarWidth: 3,
              itemMarginInline: 0,
              colorItemBgHover: 'transparent',
            },
          },
        }}
      >
        <Menu
          style={{
            width: 256,
          }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode={mode}
          items={items}
        />
      </ConfigProvider>
    </>
  );
};
export default App;
`,description:"<p>V4 \u6837\u5F0F\u7684 Menu \u7EC4\u4EF6\u3002</p>"}}]}),(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("h2",{id:"api"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,n.tZ)("span",{className:"icon icon-link"})),"API"),(0,n.tZ)("h3",{id:"menu"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#menu"},(0,n.tZ)("span",{className:"icon icon-link"})),"Menu"),(0,n.tZ)(i.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[23].value),(0,n.tZ)("th",null,e[24].value),(0,n.tZ)("th",null,e[25].value),(0,n.tZ)("th",null,e[26].value),(0,n.tZ)("th",null,e[27].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[28].value),(0,n.tZ)("td",null,e[29].value),(0,n.tZ)("td",null,e[30].value),(0,n.tZ)("td",null,e[31].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[32].value),(0,n.tZ)("td",null,e[33].value),(0,n.tZ)("td",null,e[34].value),(0,n.tZ)("td",null,e[35].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[36].value),(0,n.tZ)("td",null,e[37].value),(0,n.tZ)("td",null,e[38].value,(0,n.tZ)("code",null,e[39].value)),(0,n.tZ)("td",null,e[40].value),(0,n.tZ)("td",null,e[41].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[42].value),(0,n.tZ)("td",null,e[43].value),(0,n.tZ)("td",null,e[44].value),(0,n.tZ)("td",null,e[45].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[46].value),(0,n.tZ)("td",null,e[47].value),(0,n.tZ)("td",null,e[48].value),(0,n.tZ)("td",null,e[49].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[50].value),(0,n.tZ)("td",null,e[51].value),(0,n.tZ)("td",null,e[52].value),(0,n.tZ)("td",null,e[53].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[54].value),(0,n.tZ)("td",null,e[55].value),(0,n.tZ)("td",null,(0,n.tZ)(l.rU,{to:"#ItemType"},e[56].value)),(0,n.tZ)("td",null,e[57].value),(0,n.tZ)("td",null,e[58].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[59].value),(0,n.tZ)("td",null,e[60].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[61].value),e[62].value,(0,n.tZ)("code",null,e[63].value),e[64].value,(0,n.tZ)("code",null,e[65].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[66].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[67].value),(0,n.tZ)("td",null,e[68].value),(0,n.tZ)("td",null,e[69].value),(0,n.tZ)("td",null,e[70].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[71].value),(0,n.tZ)("td",null,e[72].value),(0,n.tZ)("td",null,e[73].value),(0,n.tZ)("td",null,e[74].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[75].value),(0,n.tZ)("td",null,e[76].value),(0,n.tZ)("td",null,e[77].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[78].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[79].value),(0,n.tZ)("td",null,e[80].value),(0,n.tZ)("td",null,e[81].value),(0,n.tZ)("td",null,e[82].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[83].value),(0,n.tZ)("td",null,e[84].value),(0,n.tZ)("td",null,e[85].value),(0,n.tZ)("td",null,e[86].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[87].value),(0,n.tZ)("td",null,e[88].value),(0,n.tZ)("td",null,e[89].value),(0,n.tZ)("td",null,e[90].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[91].value),(0,n.tZ)("td",null,e[92].value),(0,n.tZ)("td",null,e[93].value),(0,n.tZ)("td",null,e[94].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[95].value),(0,n.tZ)("td",null,e[96].value),(0,n.tZ)("td",null,e[97].value),(0,n.tZ)("td",null,e[98].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[99].value),(0,n.tZ)("td",null,e[100].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[101].value),e[102].value,(0,n.tZ)("code",null,e[103].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[104].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[105].value),(0,n.tZ)("td",null,e[106].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[107].value),e[108].value,(0,n.tZ)("code",null,e[109].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[110].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[111].value),(0,n.tZ)("td",null,e[112].value),(0,n.tZ)("td",null,e[113].value),(0,n.tZ)("td",null,e[114].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[115].value),(0,n.tZ)("td",null,e[116].value),(0,n.tZ)("td",null,e[117].value),(0,n.tZ)("td",null,e[118].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[119].value),(0,n.tZ)("td",null,e[120].value),(0,n.tZ)("td",null,e[121].value),(0,n.tZ)("td",null,e[122].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[123].value),(0,n.tZ)("td",null,e[124].value),(0,n.tZ)("td",null,e[125].value),(0,n.tZ)("td",null,e[126].value),(0,n.tZ)("td",null)))),(0,n.tZ)("blockquote",null,(0,n.tZ)("p",null,e[127].value,(0,n.tZ)("a",{href:"https://github.com/react-component/menu#api"},e[128].value))),(0,n.tZ)("h3",{id:"itemtype"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#itemtype"},(0,n.tZ)("span",{className:"icon icon-link"})),"ItemType"),(0,n.tZ)("blockquote",null,(0,n.tZ)("p",null,e[129].value,(0,n.tZ)(l.rU,{to:"#MenuItemType"},e[130].value),e[131].value,(0,n.tZ)(l.rU,{to:"#SubMenuType"},e[132].value),e[133].value,(0,n.tZ)(l.rU,{to:"#MenuItemGroupType"},e[134].value),e[135].value,(0,n.tZ)(l.rU,{to:"#MenuDividerType"},e[136].value),e[137].value)),(0,n.tZ)("h4",{id:"menuitemtype"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#menuitemtype"},(0,n.tZ)("span",{className:"icon icon-link"})),"MenuItemType"),(0,n.tZ)(i.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[138].value),(0,n.tZ)("th",null,e[139].value),(0,n.tZ)("th",null,e[140].value),(0,n.tZ)("th",null,e[141].value),(0,n.tZ)("th",null,e[142].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[143].value),(0,n.tZ)("td",null,e[144].value),(0,n.tZ)("td",null,e[145].value),(0,n.tZ)("td",null,e[146].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[147].value),(0,n.tZ)("td",null,e[148].value),(0,n.tZ)("td",null,e[149].value),(0,n.tZ)("td",null,e[150].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[151].value),(0,n.tZ)("td",null,e[152].value),(0,n.tZ)("td",null,e[153].value),(0,n.tZ)("td",null,e[154].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[155].value),(0,n.tZ)("td",null,e[156].value),(0,n.tZ)("td",null,e[157].value),(0,n.tZ)("td",null,e[158].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[159].value),(0,n.tZ)("td",null,e[160].value),(0,n.tZ)("td",null,e[161].value),(0,n.tZ)("td",null,e[162].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[163].value),(0,n.tZ)("td",null,e[164].value),(0,n.tZ)("td",null,e[165].value),(0,n.tZ)("td",null,e[166].value),(0,n.tZ)("td",null)))),(0,n.tZ)("blockquote",null,(0,n.tZ)("p",null,e[167].value,(0,n.tZ)("code",null,e[168].value),e[169].value,(0,n.tZ)("code",null,e[170].value),e[171].value),(0,n.tZ)(u.Z,{lang:"jsx"},e[172].value)),(0,n.tZ)("h4",{id:"submenutype"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#submenutype"},(0,n.tZ)("span",{className:"icon icon-link"})),"SubMenuType"),(0,n.tZ)(i.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[173].value),(0,n.tZ)("th",null,e[174].value),(0,n.tZ)("th",null,e[175].value),(0,n.tZ)("th",null,e[176].value),(0,n.tZ)("th",null,e[177].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[178].value),(0,n.tZ)("td",null,e[179].value),(0,n.tZ)("td",null,(0,n.tZ)(l.rU,{to:"#ItemType"},e[180].value)),(0,n.tZ)("td",null,e[181].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[182].value),(0,n.tZ)("td",null,e[183].value),(0,n.tZ)("td",null,e[184].value),(0,n.tZ)("td",null,e[185].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[186].value),(0,n.tZ)("td",null,e[187].value),(0,n.tZ)("td",null,e[188].value),(0,n.tZ)("td",null,e[189].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[190].value),(0,n.tZ)("td",null,e[191].value),(0,n.tZ)("td",null,e[192].value),(0,n.tZ)("td",null,e[193].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[194].value),(0,n.tZ)("td",null,e[195].value),(0,n.tZ)("td",null,e[196].value),(0,n.tZ)("td",null,e[197].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[198].value),(0,n.tZ)("td",null,e[199].value,(0,n.tZ)("code",null,e[200].value),e[201].value),(0,n.tZ)("td",null,e[202].value),(0,n.tZ)("td",null,e[203].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[204].value),(0,n.tZ)("td",null,e[205].value,(0,n.tZ)("code",null,e[206].value),e[207].value),(0,n.tZ)("td",null,e[208].value),(0,n.tZ)("td",null,e[209].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[210].value),(0,n.tZ)("td",null,e[211].value),(0,n.tZ)("td",null,e[212].value),(0,n.tZ)("td",null,e[213].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[214].value),(0,n.tZ)("td",null,e[215].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[216].value),e[217].value,(0,n.tZ)("code",null,e[218].value)),(0,n.tZ)("td",null,e[219].value),(0,n.tZ)("td",null)))),(0,n.tZ)("h4",{id:"menuitemgrouptype"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#menuitemgrouptype"},(0,n.tZ)("span",{className:"icon icon-link"})),"MenuItemGroupType"),(0,n.tZ)("p",null,e[220].value,(0,n.tZ)("code",null,e[221].value),e[222].value),(0,n.tZ)(u.Z,{lang:"ts"},e[223].value),(0,n.tZ)(i.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[224].value),(0,n.tZ)("th",null,e[225].value),(0,n.tZ)("th",null,e[226].value),(0,n.tZ)("th",null,e[227].value),(0,n.tZ)("th",null,e[228].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[229].value),(0,n.tZ)("td",null,e[230].value),(0,n.tZ)("td",null,(0,n.tZ)(l.rU,{to:"#MenuItemType"},e[231].value)),(0,n.tZ)("td",null,e[232].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[233].value),(0,n.tZ)("td",null,e[234].value),(0,n.tZ)("td",null,e[235].value),(0,n.tZ)("td",null,e[236].value),(0,n.tZ)("td",null)))),(0,n.tZ)("h4",{id:"menudividertype"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#menudividertype"},(0,n.tZ)("span",{className:"icon icon-link"})),"MenuDividerType"),(0,n.tZ)("p",null,e[237].value,(0,n.tZ)("code",null,e[238].value),e[239].value),(0,n.tZ)(u.Z,{lang:"ts"},e[240].value),(0,n.tZ)(i.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[241].value),(0,n.tZ)("th",null,e[242].value),(0,n.tZ)("th",null,e[243].value),(0,n.tZ)("th",null,e[244].value),(0,n.tZ)("th",null,e[245].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[246].value),(0,n.tZ)("td",null,e[247].value),(0,n.tZ)("td",null,e[248].value),(0,n.tZ)("td",null,e[249].value),(0,n.tZ)("td",null)))),(0,n.tZ)("h2",{id:"faq"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#faq"},(0,n.tZ)("span",{className:"icon icon-link"})),"FAQ"),(0,n.tZ)("h3",{id:"\u4E3A\u4F55-menu-\u7684\u5B50\u5143\u7D20\u4F1A\u6E32\u67D3\u4E24\u6B21"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4E3A\u4F55-menu-\u7684\u5B50\u5143\u7D20\u4F1A\u6E32\u67D3\u4E24\u6B21"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4E3A\u4F55 Menu \u7684\u5B50\u5143\u7D20\u4F1A\u6E32\u67D3\u4E24\u6B21\uFF1F"),(0,n.tZ)("p",null,e[250].value,(0,n.tZ)("a",{href:"https://github.com/react-component/menu/blob/f4684514096d6b7123339cbe72e7b0f68db0bce2/src/Menu.tsx#L543"},e[251].value),e[252].value),(0,n.tZ)("h3",{id:"\u5728-flex-\u5E03\u5C40\u4E2Dmenu-\u6CA1\u6709\u6309\u7167\u9884\u671F\u54CD\u5E94\u5F0F\u7701\u7565\u83DC\u5355"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u5728-flex-\u5E03\u5C40\u4E2Dmenu-\u6CA1\u6709\u6309\u7167\u9884\u671F\u54CD\u5E94\u5F0F\u7701\u7565\u83DC\u5355"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u5728 Flex \u5E03\u5C40\u4E2D\uFF0CMenu \u6CA1\u6709\u6309\u7167\u9884\u671F\u54CD\u5E94\u5F0F\u7701\u7565\u83DC\u5355\uFF1F"),(0,n.tZ)("p",null,e[253].value,(0,n.tZ)("a",{href:"https://codesandbox.io/s/ding-bu-dao-hang-antd-4-21-7-forked-5e3imy?file=/demo.js"},e[254].value),e[255].value),(0,n.tZ)(u.Z,{lang:"jsx"},e[256].value))))}a.default=m}}]);
