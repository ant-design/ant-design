"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[2361],{19056:function(s,l,t){t.r(l);var c=t(2143),w=t(50250),_=t(59378),g=t(78190),a=t(74775),r=t(5937),d=t(2068),v=t(74399),f=t(46004),h=t(35708),b=t(30138),Z=t(56140),i=t(5388),D=t(49545),x=t(92169),k=t(13140),y=t(95127),O=t(74418),B=t(97119),o=t(28257),u=t(67294),n=t(13946);function p(){var m=(0,o.eL)(),e=m.texts;return(0,n.tZ)(o.dY,null,(0,n.tZ)(u.Fragment,null,(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("p",null,e[0].value),(0,n.tZ)("h2",{id:"when-to-use"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#when-to-use"},(0,n.tZ)("span",{className:"icon icon-link"})),"When To Use"),(0,n.tZ)("p",null,e[1].value,(0,n.tZ)("code",null,e[2].value),e[3].value),(0,n.tZ)("h3",{id:"usage-upgrade-after-4240"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#usage-upgrade-after-4240"},(0,n.tZ)("span",{className:"icon icon-link"})),"Usage upgrade after 4.24.0")),(0,n.tZ)(d.Z,{message:"After version 4.24.0, we provide a simpler usage <Dropdown menu={{ items: [...] }} /> with better performance and potential of writing simpler code style in your applications. Meanwhile, we deprecated the old usage in browser console, we will remove it in antd 5.0."}),(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)(a.Z,{lang:"jsx"},e[4].value),(0,n.tZ)("h2",{id:"examples"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#examples"},(0,n.tZ)("span",{className:"icon icon-link"})),"Examples")),(0,n.tZ)(i.Z,{items:[{demo:{id:"components-dropdown-demo-deprecated"},previewerProps:{title:"Basic usage (deprecated syntactic sugar)",filename:"components/dropdown/demo/deprecated.tsx",jsx:`import React from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
const menu = (
  <Menu
    items={[
      {
        key: '1',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            1st menu item
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
            2nd menu item (disabled)
          </a>
        ),
        icon: <SmileOutlined />,
        disabled: true,
      },
      {
        key: '3',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
            3rd menu item (disabled)
          </a>
        ),
        disabled: true,
      },
      {
        key: '4',
        danger: true,
        label: 'a danger item',
      },
    ]}
  />
);
const App = () => (
  <Dropdown overlay={menu}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Hover me
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);
export default App;
`,description:"<p>The most basic dropdown menu.</p>"}},{demo:{id:"components-dropdown-demo-basic"},previewerProps:{title:"Basic",filename:"components/dropdown/demo/basic.tsx",jsx:`import React from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
const items = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item (disabled)
      </a>
    ),
    icon: <SmileOutlined />,
    disabled: true,
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: '4',
    danger: true,
    label: 'a danger item',
  },
];
const App = () => (
  <Dropdown
    menu={{
      items,
    }}
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Hover me
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);
export default App;
`,description:"<p>The most basic dropdown menu.</p>"}},{demo:{id:"components-dropdown-demo-placement"},previewerProps:{title:"Placement",filename:"components/dropdown/demo/placement.tsx",jsx:`import React from 'react';
import { Button, Dropdown, Space } from 'antd';
const items = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item
      </a>
    ),
  },
];
const App = () => (
  <Space direction="vertical">
    <Space wrap>
      <Dropdown
        menu={{
          items,
        }}
        placement="bottomLeft"
      >
        <Button>bottomLeft</Button>
      </Dropdown>
      <Dropdown
        menu={{
          items,
        }}
        placement="bottom"
      >
        <Button>bottom</Button>
      </Dropdown>
      <Dropdown
        menu={{
          items,
        }}
        placement="bottomRight"
      >
        <Button>bottomRight</Button>
      </Dropdown>
    </Space>
    <Space wrap>
      <Dropdown
        menu={{
          items,
        }}
        placement="topLeft"
      >
        <Button>topLeft</Button>
      </Dropdown>
      <Dropdown
        menu={{
          items,
        }}
        placement="top"
      >
        <Button>top</Button>
      </Dropdown>
      <Dropdown
        menu={{
          items,
        }}
        placement="topRight"
      >
        <Button>topRight</Button>
      </Dropdown>
    </Space>
  </Space>
);
export default App;
`,description:"<p>Support 6 placements.</p>"}},{demo:{id:"components-dropdown-demo-arrow"},previewerProps:{title:"Arrow",filename:"components/dropdown/demo/arrow.tsx",jsx:`import React from 'react';
import { Button, Dropdown } from 'antd';
const items = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item
      </a>
    ),
  },
];
const App = () => (
  <>
    <Dropdown
      menu={{
        items,
      }}
      placement="bottomLeft"
      arrow
    >
      <Button>bottomLeft</Button>
    </Dropdown>
    <Dropdown
      menu={{
        items,
      }}
      placement="bottom"
      arrow
    >
      <Button>bottom</Button>
    </Dropdown>
    <Dropdown
      menu={{
        items,
      }}
      placement="bottomRight"
      arrow
    >
      <Button>bottomRight</Button>
    </Dropdown>
    <br />
    <Dropdown
      menu={{
        items,
      }}
      placement="topLeft"
      arrow
    >
      <Button>topLeft</Button>
    </Dropdown>
    <Dropdown
      menu={{
        items,
      }}
      placement="top"
      arrow
    >
      <Button>top</Button>
    </Dropdown>
    <Dropdown
      menu={{
        items,
      }}
      placement="topRight"
      arrow
    >
      <Button>topRight</Button>
    </Dropdown>
  </>
);
export default App;
`,description:"<p>You could display an arrow.</p>",style:`#components-dropdown-demo-arrow .ant-btn {
  margin-right: 8px;
  margin-bottom: 8px;
}
.ant-row-rtl #components-dropdown-demo-arrow .ant-btn {
  margin-right: 0;
  margin-bottom: 8px;
  margin-left: 8px;
}`}},{demo:{id:"components-dropdown-demo-item"},previewerProps:{title:"Other elements",filename:"components/dropdown/demo/item.tsx",jsx:`import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
const items = [
  {
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
    key: '0',
  },
  {
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    ),
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: '3rd menu item\uFF08disabled\uFF09',
    key: '3',
    disabled: true,
  },
];
const App = () => (
  <Dropdown
    menu={{
      items,
    }}
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Hover me
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);
export default App;
`,description:"<p>Divider and disabled menu item.</p>"}},{demo:{id:"components-dropdown-demo-arrow-center"},previewerProps:{title:"Arrow pointing at the center",filename:"components/dropdown/demo/arrow-center.tsx",jsx:`import React from 'react';
import { Button, Dropdown } from 'antd';
const items = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item
      </a>
    ),
  },
];
const App = () => (
  <>
    <Dropdown
      menu={{
        items,
      }}
      placement="bottomLeft"
      arrow={{
        pointAtCenter: true,
      }}
    >
      <Button>bottomLeft</Button>
    </Dropdown>
    <Dropdown
      menu={{
        items,
      }}
      placement="bottom"
      arrow={{
        pointAtCenter: true,
      }}
    >
      <Button>bottom</Button>
    </Dropdown>
    <Dropdown
      menu={{
        items,
      }}
      placement="bottomRight"
      arrow={{
        pointAtCenter: true,
      }}
    >
      <Button>bottomRight</Button>
    </Dropdown>
    <br />
    <Dropdown
      menu={{
        items,
      }}
      placement="topLeft"
      arrow={{
        pointAtCenter: true,
      }}
    >
      <Button>topLeft</Button>
    </Dropdown>
    <Dropdown
      menu={{
        items,
      }}
      placement="top"
      arrow={{
        pointAtCenter: true,
      }}
    >
      <Button>top</Button>
    </Dropdown>
    <Dropdown
      menu={{
        items,
      }}
      placement="topRight"
      arrow={{
        pointAtCenter: true,
      }}
    >
      <Button>topRight</Button>
    </Dropdown>
  </>
);
export default App;
`,description:"<p>By specifying <code>arrow</code> prop with <code>{ pointAtCenter: true }</code>, the arrow will point to the center of the target element.</p>",style:`#components-dropdown-demo-arrow-center .ant-btn {
  margin-right: 8px;
  margin-bottom: 8px;
}
.ant-row-rtl #components-dropdown-demo-arrow-center .ant-btn {
  margin-right: 0;
  margin-bottom: 8px;
  margin-left: 8px;
}`}},{demo:{id:"components-dropdown-demo-trigger"},previewerProps:{title:"Trigger mode",filename:"components/dropdown/demo/trigger.tsx",jsx:`import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
const items = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: '0',
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: '3rd menu item',
    key: '3',
  },
];
const App = () => (
  <Dropdown
    menu={{
      items,
    }}
    trigger={['click']}
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Click me
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);
export default App;
`,description:"<p>The default trigger mode is <code>hover</code>, you can change it to <code>click</code>.</p>"}},{demo:{id:"components-dropdown-demo-event"},previewerProps:{title:"Click event",filename:"components/dropdown/demo/event.tsx",jsx:`import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, message, Space } from 'antd';
const onClick = ({ key }) => {
  message.info(\`Click on item \${key}\`);
};
const items = [
  {
    label: '1st menu item',
    key: '1',
  },
  {
    label: '2nd menu item',
    key: '2',
  },
  {
    label: '3rd menu item',
    key: '3',
  },
];
const App = () => (
  <Dropdown
    menu={{
      items,
      onClick,
    }}
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Hover me, Click menu item
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);
export default App;
`,description:"<p>An event will be triggered when you click menu items, in which you can make different operations according to item's key.</p>"}},{demo:{id:"components-dropdown-demo-dropdown-button"},previewerProps:{title:"Button with dropdown menu",filename:"components/dropdown/demo/dropdown-button.tsx",jsx:`import React from 'react';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';
const handleButtonClick = (e) => {
  message.info('Click on left button.');
  console.log('click left button', e);
};
const handleMenuClick = (e) => {
  message.info('Click on menu item.');
  console.log('click', e);
};
const items = [
  {
    label: '1st menu item',
    key: '1',
    icon: <UserOutlined />,
  },
  {
    label: '2nd menu item',
    key: '2',
    icon: <UserOutlined />,
  },
  {
    label: '3rd menu item',
    key: '3',
    icon: <UserOutlined />,
  },
];
const menuProps = {
  items,
  onClick: handleMenuClick,
};
const App = () => (
  <Space wrap>
    <Dropdown.Button menu={menuProps} onClick={handleButtonClick}>
      Dropdown
    </Dropdown.Button>
    <Dropdown.Button menu={menuProps} placement="bottom" icon={<UserOutlined />}>
      Dropdown
    </Dropdown.Button>
    <Dropdown.Button menu={menuProps} onClick={handleButtonClick} disabled>
      Dropdown
    </Dropdown.Button>
    <Dropdown.Button
      menu={menuProps}
      buttonsRender={([leftButton, rightButton]) => [
        <Tooltip title="tooltip" key="leftButton">
          {leftButton}
        </Tooltip>,
        React.cloneElement(rightButton, {
          loading: true,
        }),
      ]}
    >
      With Tooltip
    </Dropdown.Button>
    <Dropdown menu={menuProps}>
      <Button>
        <Space>
          Button
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
    <Dropdown.Button menu={menuProps} onClick={handleButtonClick} danger>
      Danger
    </Dropdown.Button>
  </Space>
);
export default App;
`,description:"<p>A button is on the left, and a related functional menu is on the right. You can set the icon property to modify the icon of right.</p>"}},{demo:{id:"components-dropdown-demo-custom-dropdown"},previewerProps:{title:"Custom dropdown",filename:"components/dropdown/demo/custom-dropdown.tsx",jsx:`import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Divider, Button } from 'antd';
const items = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
];
const App = () => (
  <Dropdown
    menu={{
      items,
    }}
    dropdownRender={(menu) => (
      <div className="dropdown-content">
        {menu}
        <Divider
          style={{
            margin: 0,
          }}
        />
        <Space
          style={{
            padding: 8,
          }}
        >
          <Button type="primary">Click me!</Button>
        </Space>
      </div>
    )}
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Hover me
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);
export default App;
`,description:"<p>Customize the dropdown menu via <code>dropdownRender</code>. If you don't need the Menu content, use the Popover component directly.</p>",style:`.dropdown-content {
  background: #fff;
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%),
    0 9px 28px 8px rgb(0 0 0 / 5%);
}
.dropdown-content .ant-dropdown-menu {
  box-shadow: none;
}`}},{demo:{id:"components-dropdown-demo-sub-menu"},previewerProps:{title:"Cascading menu",filename:"components/dropdown/demo/sub-menu.tsx",jsx:`import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
const items = [
  {
    key: '1',
    type: 'group',
    label: 'Group title',
    children: [
      {
        key: '1-1',
        label: '1st menu item',
      },
      {
        key: '1-2',
        label: '2nd menu item',
      },
    ],
  },
  {
    key: '2',
    label: 'sub menu',
    children: [
      {
        key: '2-1',
        label: '3rd menu item',
      },
      {
        key: '2-2',
        label: '4th menu item',
      },
    ],
  },
  {
    key: '3',
    label: 'disabled sub menu',
    disabled: true,
    children: [
      {
        key: '3-1',
        label: '5d menu item',
      },
      {
        key: '3-2',
        label: '6th menu item',
      },
    ],
  },
];
const App = () => (
  <Dropdown
    menu={{
      items,
    }}
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Cascading menu
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);
export default App;
`,description:"<p>The menu has multiple levels.</p>"}},{demo:{id:"components-dropdown-demo-overlay-open"},previewerProps:{title:"The way of hiding menu.",filename:"components/dropdown/demo/overlay-open.tsx",jsx:`import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
const App = () => {
  const [open, setOpen] = useState(false);
  const handleMenuClick = (e) => {
    if (e.key === '3') {
      setOpen(false);
    }
  };
  const handleOpenChange = (flag) => {
    setOpen(flag);
  };
  const items = [
    {
      label: 'Clicking me will not close the menu.',
      key: '1',
    },
    {
      label: 'Clicking me will not close the menu also.',
      key: '2',
    },
    {
      label: 'Clicking me will close the menu.',
      key: '3',
    },
  ];
  return (
    <Dropdown
      menu={{
        items,
        onClick: handleMenuClick,
      }}
      onOpenChange={handleOpenChange}
      open={open}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Hover me
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};
export default App;
`,description:"<p>The default is to close the menu when you click on menu items, this feature can be turned off.</p>"}},{demo:{id:"components-dropdown-demo-context-menu"},previewerProps:{title:"Context Menu",filename:"components/dropdown/demo/context-menu.tsx",jsx:`import React from 'react';
import { Dropdown } from 'antd';
const items = [
  {
    label: '1st menu item',
    key: '1',
  },
  {
    label: '2nd menu item',
    key: '2',
  },
  {
    label: '3rd menu item',
    key: '3',
  },
];
const App = () => (
  <Dropdown
    menu={{
      items,
    }}
    trigger={['contextMenu']}
  >
    <div
      className="site-dropdown-context-menu"
      style={{
        textAlign: 'center',
        height: 200,
        lineHeight: '200px',
      }}
    >
      Right Click on here
    </div>
  </Dropdown>
);
export default App;
`,description:"<p>The default trigger mode is <code>hover</code>, you can change it to <code>contextMenu</code>.</p>",style:`.site-dropdown-context-menu {
  color: #777;
  background: #f7f7f7;
}`}},{demo:{id:"components-dropdown-demo-loading"},previewerProps:{title:"Loading",filename:"components/dropdown/demo/loading.tsx",jsx:`import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
const items = [
  {
    label: 'Submit and continue',
    key: '1',
  },
];
const App = () => {
  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((state) => {
      const newLoadings = [...state];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((state) => {
        const newLoadings = [...state];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };
  return (
    <Space direction="vertical">
      <Dropdown.Button
        type="primary"
        loading
        menu={{
          items,
        }}
      >
        Submit
      </Dropdown.Button>
      <Dropdown.Button
        type="primary"
        size="small"
        loading
        menu={{
          items,
        }}
      >
        Submit
      </Dropdown.Button>
      <Dropdown.Button
        type="primary"
        loading={loadings[0]}
        menu={{
          items,
        }}
        onClick={() => enterLoading(0)}
      >
        Submit
      </Dropdown.Button>
      <Dropdown.Button
        icon={<DownOutlined />}
        loading={loadings[1]}
        menu={{
          items,
        }}
        onClick={() => enterLoading(1)}
      >
        Submit
      </Dropdown.Button>
    </Space>
  );
};
export default App;
`,description:"<p>A loading indicator can be added to a button by setting the <code>loading</code> property on the <code>Dropdown.Button</code>.</p>"}},{demo:{id:"components-dropdown-demo-selectable"},previewerProps:{title:"Selectable Menu",filename:"components/dropdown/demo/selectable.tsx",jsx:`import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Typography } from 'antd';
const items = [
  {
    key: '1',
    label: 'Item 1',
  },
  {
    key: '2',
    label: 'Item 2',
  },
  {
    key: '3',
    label: 'Item 3',
  },
];
const App = () => (
  <Dropdown
    menu={{
      items,
      selectable: true,
      defaultSelectedKeys: ['3'],
    }}
  >
    <Typography.Link>
      <Space>
        Selectable
        <DownOutlined />
      </Space>
    </Typography.Link>
  </Dropdown>
);
export default App;
`,description:"<p>Configure the <code>selectable</code> property in <code>menu</code> to enable selectable ability.</p>"}},{demo:{id:"components-dropdown-demo-menu-full"},previewerProps:{debug:!0,title:"Menu full styles",filename:"components/dropdown/demo/menu-full.tsx",jsx:`import React from 'react';
import { AppstoreOutlined, DownOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
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
  getItem(
    'Item Group',
    'group',
    null,
    [getItem('Option 0', '01'), getItem('Option 0', '02')],
    'group',
  ),
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
  // Not crash
  null,
];
const App = () => (
  <Dropdown
    menu={{
      items,
      selectedKeys: ['1'],
      openKeys: ['sub1'],
    }}
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Hover to check menu style
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);
export default App;
`,description:`<p>This demo was created for debugging Menu styles inside Dropdown.</p>
<p><a href="https://github.com/ant-design/ant-design/pull/19150">#19150</a></p>`}},{demo:{id:"components-dropdown-demo-render-panel"},previewerProps:{debug:!0,title:"_InternalPanelDoNotUseOrYouWillBeFired",filename:"components/dropdown/demo/render-panel.tsx",jsx:`import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalDropdown } = Dropdown;
const menu = (
  <Menu
    items={[
      {
        key: '1',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            1st menu item
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
            2nd menu item (disabled)
          </a>
        ),
        icon: <SmileOutlined />,
        disabled: true,
      },
      {
        key: '3',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
            3rd menu item (disabled)
          </a>
        ),
        disabled: true,
      },
      {
        key: '4',
        danger: true,
        label: 'a danger item',
      },
    ]}
  />
);
const App = () => <InternalDropdown overlay={menu} />;
export default App;
`,description:"<p>Debug usage. Do not use in your production.</p>"}}]}),(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("h2",{id:"api"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,n.tZ)("span",{className:"icon icon-link"})),"API"),(0,n.tZ)("h3",{id:"dropdown"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#dropdown"},(0,n.tZ)("span",{className:"icon icon-link"})),"Dropdown"),(0,n.tZ)(r.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[5].value),(0,n.tZ)("th",null,e[6].value),(0,n.tZ)("th",null,e[7].value),(0,n.tZ)("th",null,e[8].value),(0,n.tZ)("th",null,e[9].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[10].value),(0,n.tZ)("td",null,e[11].value),(0,n.tZ)("td",null,e[12].value),(0,n.tZ)("td",null,e[13].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[14].value),(0,n.tZ)("td",null,e[15].value,(0,n.tZ)("code",null,e[16].value),e[17].value),(0,n.tZ)("td",null,e[18].value),(0,n.tZ)("td",null,e[19].value),(0,n.tZ)("td",null,e[20].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[21].value),(0,n.tZ)("td",null,e[22].value),(0,n.tZ)("td",null,e[23].value),(0,n.tZ)("td",null,e[24].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[25].value),(0,n.tZ)("td",null,e[26].value),(0,n.tZ)("td",null,e[27].value),(0,n.tZ)("td",null,e[28].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[29].value),(0,n.tZ)("td",null,e[30].value),(0,n.tZ)("td",null,e[31].value),(0,n.tZ)("td",null,e[32].value),(0,n.tZ)("td",null,e[33].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[34].value),(0,n.tZ)("td",null,e[35].value,(0,n.tZ)("a",{href:"https://codepen.io/afc163/pen/zEjNOy?editors=0010"},e[36].value)),(0,n.tZ)("td",null,e[37].value),(0,n.tZ)("td",null,e[38].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[39].value),(0,n.tZ)("td",null,e[40].value),(0,n.tZ)("td",null,(0,n.tZ)(o.rU,{to:"/components/menu/#API"},e[41].value)),(0,n.tZ)("td",null,e[42].value),(0,n.tZ)("td",null,e[43].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[44].value),(0,n.tZ)("td",null,e[45].value),(0,n.tZ)("td",null,e[46].value),(0,n.tZ)("td",null,e[47].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[48].value),(0,n.tZ)("td",null,e[49].value),(0,n.tZ)("td",null,e[50].value),(0,n.tZ)("td",null,e[51].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[52].value),(0,n.tZ)("td",null,e[53].value,(0,n.tZ)("code",null,e[54].value),e[55].value,(0,n.tZ)("code",null,e[56].value),e[57].value,(0,n.tZ)("code",null,e[58].value),e[59].value,(0,n.tZ)("code",null,e[60].value),e[61].value,(0,n.tZ)("code",null,e[62].value),e[63].value,(0,n.tZ)("code",null,e[64].value)),(0,n.tZ)("td",null,e[65].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[66].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[67].value),(0,n.tZ)("td",null,e[68].value),(0,n.tZ)("td",null,e[69].value,(0,n.tZ)("code",null,e[70].value),e[71].value,(0,n.tZ)("code",null,e[72].value),e[73].value,(0,n.tZ)("code",null,e[74].value),e[75].value),(0,n.tZ)("td",null,e[76].value,(0,n.tZ)("code",null,e[77].value),e[78].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[79].value),(0,n.tZ)("td",null,e[80].value,(0,n.tZ)("code",null,e[81].value),e[82].value,(0,n.tZ)(o.rU,{to:"/docs/react/faq#why-open"},e[83].value),e[84].value),(0,n.tZ)("td",null,e[85].value),(0,n.tZ)("td",null,e[86].value),(0,n.tZ)("td",null,e[87].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[88].value),(0,n.tZ)("td",null,e[89].value,(0,n.tZ)("code",null,e[90].value),e[91].value,(0,n.tZ)(o.rU,{to:"/docs/react/faq#why-open"},e[92].value),e[93].value),(0,n.tZ)("td",null,e[94].value),(0,n.tZ)("td",null,e[95].value),(0,n.tZ)("td",null,e[96].value)))),(0,n.tZ)("h3",{id:"dropdownbutton"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#dropdownbutton"},(0,n.tZ)("span",{className:"icon icon-link"})),"Dropdown.Button"),(0,n.tZ)("p",null,e[97].value),(0,n.tZ)(r.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[98].value),(0,n.tZ)("th",null,e[99].value),(0,n.tZ)("th",null,e[100].value),(0,n.tZ)("th",null,e[101].value),(0,n.tZ)("th",null,e[102].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[103].value),(0,n.tZ)("td",null,e[104].value),(0,n.tZ)("td",null,e[105].value),(0,n.tZ)("td",null,e[106].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[107].value),(0,n.tZ)("td",null,e[108].value),(0,n.tZ)("td",null,e[109].value),(0,n.tZ)("td",null,e[110].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[111].value),(0,n.tZ)("td",null,e[112].value),(0,n.tZ)("td",null,e[113].value),(0,n.tZ)("td",null,e[114].value),(0,n.tZ)("td",null,e[115].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[116].value),(0,n.tZ)("td",null,e[117].value),(0,n.tZ)("td",null,e[118].value),(0,n.tZ)("td",null,e[119].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[120].value),(0,n.tZ)("td",null,e[121].value,(0,n.tZ)(o.rU,{to:"/components/button/#API"},e[122].value)),(0,n.tZ)("td",null,e[123].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[124].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[125].value),(0,n.tZ)("td",null,e[126].value,(0,n.tZ)(o.rU,{to:"/components/button/#API"},e[127].value)),(0,n.tZ)("td",null,e[128].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[129].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[130].value),(0,n.tZ)("td",null,e[131].value,(0,n.tZ)(o.rU,{to:"/components/button/#API"},e[132].value),e[133].value),(0,n.tZ)("td",null,e[134].value),(0,n.tZ)("td",null,e[135].value),(0,n.tZ)("td",null)))))))}l.default=p}}]);
