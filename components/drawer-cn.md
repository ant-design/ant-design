---
group: 反馈
category: Components
title: Drawer
subtitle: 抽屉
description: 屏幕边缘滑出的浮层面板。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*BD2JSKm8I-kAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*r29rQ51bNdwAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## 何时使用 {#when-to-use}

抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到原任务。

- 当需要一个附加的面板来控制父窗体内容，这个面板在需要时呼出。比如，控制界面展示样式，往界面中添加内容。
- 当需要在当前任务流中插入临时任务，创建或预览附加内容。比如展示协议条款，创建子对象。

> 开发者注意事项：
>
> 自 `5.17.0` 版本，我们提供了 `loading` 属性，内置 Spin 组件作为加载状态，但是自 `5.18.0` 版本开始，我们修复了设计失误，将内置的 Spin 组件替换成了 Skeleton 组件，同时收窄了 `loading` api 的类型范围，只能接收 boolean 类型。

## 代码演示 {#examples}

### 基础抽屉

基础抽屉，点击触发按钮抽屉从右滑出，点击遮罩区关闭。

```tsx
import React, { useState } from 'react';
import { Button, Drawer } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer
        title="Basic Drawer"
        closable={{ 'aria-label': 'Close Button' }}
        onClose={onClose}
        open={open}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default App;
```

### 自定义位置

自定义位置，点击触发按钮抽屉从相应的位置滑出，点击遮罩区关闭。

```tsx
import React, { useState } from 'react';
import type { DrawerProps, RadioChangeEvent } from 'antd';
import { Button, Drawer, Radio, Space } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps['placement']>('left');

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onChange = (e: RadioChangeEvent) => {
    setPlacement(e.target.value);
  };

  return (
    <>
      <Space>
        <Radio.Group value={placement} onChange={onChange}>
          <Radio value="top">top</Radio>
          <Radio value="right">right</Radio>
          <Radio value="bottom">bottom</Radio>
          <Radio value="left">left</Radio>
        </Radio.Group>
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
      </Space>
      <Drawer
        title="Basic Drawer"
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default App;
```

### 可调整大小

可调整大小的抽屉，允许通过拖拽边缘来调整抽屉的宽度或高度。

```tsx
import React, { useState } from 'react';
import type { DrawerProps, RadioChangeEvent } from 'antd';
import { Button, Drawer, Radio, Space } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps['placement']>('right');
  const [size, setSize] = useState(256);

  const onChange = (e: RadioChangeEvent) => {
    setSize(256);
    setPlacement(e.target.value);
  };

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Radio.Group
          value={placement}
          onChange={onChange}
          options={['top', 'right', 'bottom', 'left'].map((pos) => ({
            label: pos,
            value: pos,
          }))}
        />
        <Button type="primary" onClick={() => setOpen(true)}>
          Open Drawer
        </Button>
      </Space>
      <div>Current size: {size}px</div>
      <Drawer
        title="Resizable Drawer"
        placement={placement}
        onClose={() => setOpen(false)}
        open={open}
        key={placement}
        size={size}
        resizable={{
          onResize: (newSize) => setSize(newSize),
        }}
      >
        <p>Drag the edge to resize the drawer</p>
        <p>Current size: {size}px</p>
      </Drawer>
    </>
  );
};

export default App;
```

### 加载中

设置抽屉加载状态。

```tsx
import React from 'react';
import { Button, Drawer } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);

  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <Button type="primary" onClick={showLoading}>
        Open Drawer
      </Button>
      <Drawer
        closable
        destroyOnHidden
        title={<p>Loading Drawer</p>}
        placement="right"
        open={open}
        loading={loading}
        onClose={() => setOpen(false)}
      >
        <Button type="primary" style={{ marginBottom: 16 }} onClick={showLoading}>
          Reload
        </Button>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default App;
```

### 额外操作

在 Ant Design 规范中，操作按钮建议放在抽屉的右上角，可以使用 `extra` 属性来实现。

```tsx
import React, { useState } from 'react';
import { Button, Drawer, Radio, Space } from 'antd';
import type { DrawerProps, RadioChangeEvent } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps['placement']>('right');

  const showDrawer = () => {
    setOpen(true);
  };

  const onChange = (e: RadioChangeEvent) => {
    setPlacement(e.target.value);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Space>
        <Radio.Group value={placement} onChange={onChange}>
          <Radio value="top">top</Radio>
          <Radio value="right">right</Radio>
          <Radio value="bottom">bottom</Radio>
          <Radio value="left">left</Radio>
        </Radio.Group>
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
      </Space>
      <Drawer
        title="Drawer with extra actions"
        placement={placement}
        size={500}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default App;
```

### 渲染在当前 DOM

渲染在当前 dom 里。自定义容器，查看 `getContainer`。

> 注意：在 v5 中 `style` 与 `className` 迁移至 Drawer 面板上与 Modal 保持一致，原 `style` 与 `className` 替换为 `rootStyle` 与 `rootClassName`。

> 当 `getContainer` 返回 DOM 节点时，需要手动设置 `rootStyle` 为 `{ position: 'absolute' }`，参考 [#41951](https://github.com/ant-design/ant-design/issues/41951#issuecomment-1521099152)。

```tsx
import React, { useState } from 'react';
import { Button, Drawer, theme } from 'antd';

const App: React.FC = () => {
  const { token } = theme.useToken();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    height: 200,
    padding: 48,
    overflow: 'hidden',
    background: token.colorFillAlter,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  return (
    <div style={containerStyle}>
      Render in this
      <div style={{ marginTop: 16 }}>
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
      </div>
      <Drawer
        title="Basic Drawer"
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
        getContainer={false}
      >
        <p>Some contents...</p>
      </Drawer>
    </div>
  );
};

export default App;
```

### 抽屉表单

在抽屉中使用表单。

```tsx
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import type { InputProps } from 'antd';

const UrlInput: React.FC<InputProps> = (props) => {
  return (
    <Space.Compact>
      <Space.Addon>http://</Space.Addon>
      <Input style={{ width: '100%' }} {...props} />
      <Space.Addon>.com</Space.Addon>
    </Space.Compact>
  );
};

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        New account
      </Button>
      <Drawer
        title="Create a new account"
        size={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" requiredMark={false}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please enter user name' }]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="url"
                label="Url"
                rules={[{ required: true, message: 'Please enter url' }]}
              >
                <UrlInput placeholder="Please enter url" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="owner"
                label="Owner"
                rules={[{ required: true, message: 'Please select an owner' }]}
              >
                <Select
                  placeholder="Please select an owner"
                  options={[
                    { label: 'Xiaoxiao Fu', value: 'xiao' },
                    { label: 'Maomao Zhou', value: 'mao' },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Type"
                rules={[{ required: true, message: 'Please choose the type' }]}
              >
                <Select
                  placeholder="Please choose the type"
                  options={[
                    { label: 'private', value: 'private' },
                    { label: 'public', value: 'public' },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="approver"
                label="Approver"
                rules={[{ required: true, message: 'Please choose the approver' }]}
              >
                <Select
                  placeholder="Please choose the approver"
                  options={[
                    { label: 'Jack Ma', value: 'jack' },
                    { label: 'Tom Liu', value: 'tom' },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateTime"
                label="DateTime"
                rules={[{ required: true, message: 'Please choose the dateTime' }]}
              >
                <DatePicker.RangePicker
                  style={{ width: '100%' }}
                  getPopupContainer={(trigger) => trigger.parentElement!}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: 'please enter url description',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="please enter url description" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default App;
```

### 信息预览抽屉

需要快速预览对象概要时使用，点击遮罩区关闭。

```tsx
import React, { useState } from 'react';
import { Avatar, Col, Divider, Drawer, List, Row } from 'antd';

interface DescriptionItemProps {
  title: string;
  content: React.ReactNode;
}

const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <List
        dataSource={[
          {
            id: 1,
            name: 'Lily',
          },
          {
            id: 2,
            name: 'Lily',
          },
        ]}
        bordered
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <a onClick={showDrawer} key={`a-${item.id}`}>
                View Profile
              </a>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
              }
              title={<a href="https://ant.design/index-cn">{item.name}</a>}
              description="Progresser XTech"
            />
          </List.Item>
        )}
      />
      <Drawer size={640} placement="right" closable={false} onClose={onClose} open={open}>
        <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
          User Profile
        </p>
        <p className="site-description-item-profile-p">Personal</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Full Name" content="Lily" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Account" content="AntDesign@example.com" />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="City" content="HangZhou" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Country" content="China🇨🇳" />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Birthday" content="February 2,1900" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Website" content="-" />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Message"
              content="Make things as simple as possible but no simpler."
            />
          </Col>
        </Row>
        <Divider />
        <p className="site-description-item-profile-p">Company</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Position" content="Programmer" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Responsibilities" content="Coding" />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Department" content="XTech" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Supervisor" content={<a>Lin</a>} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Skills"
              content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
            />
          </Col>
        </Row>
        <Divider />
        <p className="site-description-item-profile-p">Contacts</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Email" content="AntDesign@example.com" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Phone Number" content="+86 181 0000 0000" />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Github"
              content={
                <a href="http://github.com/ant-design/ant-design/" target="_blank" rel="noreferrer">
                  github.com/ant-design/ant-design/
                </a>
              }
            />
          </Col>
        </Row>
      </Drawer>
    </>
  );
};

export default App;
```

### 多层抽屉

在抽屉内打开新的抽屉，用以解决多分支任务的复杂状况。

```tsx
import React, { useState } from 'react';
import { Button, Drawer } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [childrenDrawer, setChildrenDrawer] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };

  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Open drawer
      </Button>
      <Drawer title="Multi-level drawer" size={520} closable={false} onClose={onClose} open={open}>
        <Button type="primary" onClick={showChildrenDrawer}>
          Two-level drawer
        </Button>
        <Drawer
          title="Two-level Drawer"
          size={320}
          closable={false}
          onClose={onChildrenDrawerClose}
          open={childrenDrawer}
        >
          This is two-level drawer
        </Drawer>
      </Drawer>
    </>
  );
};

export default App;
```

### 预设宽度

抽屉的默认宽度为 `378px`，另外还提供一个大号抽屉 `736px`，可以用 `size` 属性来设置。

```tsx
import React, { useState } from 'react';
import { Button, Drawer, Radio, Space } from 'antd';
import type { DrawerProps } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<DrawerProps['size']>();

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Radio.Group
          value={size}
          onChange={(e) => setSize(e.target.value)}
          options={[
            { label: 'Large Size (736px)', value: 'large' },
            { label: 'Default Size (378px)', value: 'default' },
            { label: 256, value: 256 },
            { label: '500px', value: '500px' },
            { label: '50%', value: '50%' },
            { label: '20vw', value: '20vw' },
          ]}
        />
      </Space>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Drawer
      </Button>
      <Drawer
        title={`${size} Drawer`}
        placement="right"
        size={size}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default App;
```

### 遮罩

遮罩效果。

```tsx
import React, { useState } from 'react';
import { Button, Drawer, Space } from 'antd';

type MaskType = 'blur' | 'dimmed' | 'none';
type DrawerConfig = {
  type: MaskType;
  mask: boolean | { blur: boolean };
  title: string;
};

const drawerList: DrawerConfig[] = [
  { type: 'blur', mask: { blur: true }, title: 'blur' },
  { type: 'dimmed', mask: true, title: 'Dimmed mask' },
  { type: 'none', mask: false, title: 'No mask' },
];
const App: React.FC = () => {
  const [open, setOpen] = useState<false | MaskType>(false);

  const showDrawer = (type: MaskType) => {
    setOpen(type);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Space wrap>
      {drawerList.map((item) => (
        <React.Fragment key={item.type}>
          <Button
            onClick={() => {
              showDrawer(item.type);
            }}
          >
            {item.title}
          </Button>
          <Drawer
            title={item.title}
            placement="right"
            mask={item.mask}
            onClose={onClose}
            open={open === item.type}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Drawer>
        </React.Fragment>
      ))}
    </Space>
  );
};

export default App;
```

### 自定义内部样式

通过 `classNames` 属性设置抽屉内部区域（header、body、footer、mask、wrapper）的 `className`。

```tsx
import React, { useState } from 'react';
import { Button, ConfigProvider, Drawer, Space } from 'antd';
import type { DrawerProps } from 'antd';
import { createStyles, useTheme } from 'antd-style';

const useStyle = createStyles(({ token }) => ({
  'my-drawer-body': {
    background: token.blue1,
  },
  'my-drawer-mask': {
    boxShadow: `inset 0 0 15px #fff`,
  },
  'my-drawer-header': {
    background: token.green1,
  },
  'my-drawer-footer': {
    color: token.colorPrimary,
  },
  'my-drawer-section': {
    borderInlineStart: '2px dotted #333',
  },
}));

const App: React.FC = () => {
  const [open, setOpen] = useState([false, false]);
  const { styles } = useStyle();
  const token = useTheme();

  const toggleDrawer = (idx: number, target: boolean) => {
    setOpen((p) => {
      p[idx] = target;
      return [...p];
    });
  };

  const classNames: DrawerProps['classNames'] = {
    body: styles['my-drawer-body'],
    mask: styles['my-drawer-mask'],
    header: styles['my-drawer-header'],
    footer: styles['my-drawer-footer'],
    section: styles['my-drawer-section'],
  };

  const drawerStyles: DrawerProps['styles'] = {
    mask: {
      backdropFilter: 'blur(10px)',
    },
    section: {
      boxShadow: '-10px 0 10px #666',
    },
    header: {
      borderBottom: `1px solid ${token.colorPrimary}`,
    },
    body: {
      fontSize: token.fontSizeLG,
    },
    footer: {
      borderTop: `1px solid ${token.colorBorder}`,
    },
  };

  return (
    <>
      <Space>
        <Button type="primary" onClick={() => toggleDrawer(0, true)}>
          Open
        </Button>
        <Button type="primary" onClick={() => toggleDrawer(1, true)}>
          ConfigProvider
        </Button>
      </Space>
      <Drawer
        title="Basic Drawer"
        placement="right"
        footer="Footer"
        onClose={() => toggleDrawer(0, false)}
        open={open[0]}
        classNames={classNames}
        styles={drawerStyles}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
      <ConfigProvider drawer={{ classNames, styles: drawerStyles }}>
        <Drawer
          title="Basic Drawer"
          placement="right"
          footer="Footer"
          onClose={() => toggleDrawer(1, false)}
          open={open[1]}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </ConfigProvider>
    </>
  );
};

export default App;
```

### 关闭按钮位置

自定义抽屉的关闭按钮位置，放到右侧，默认为左侧。

```tsx
import React, { useState } from 'react';
import { Button, Drawer } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer
        title="Drawer Closable Placement"
        closable={{ placement: 'end' }}
        onClose={onClose}
        open={open}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Take a look at the top-right corner...</p>
      </Drawer>
    </>
  );
};

export default App;
```

### 自定义语义结构的样式和类

通过 `classNames` 和 `styles` 传入对象或者函数可以自定义 Drawer 组件的 [语义化结构](#semantic-dom) 样式。

```tsx
import React, { useState } from 'react';
import { Button, Drawer, Flex } from 'antd';
import type { DrawerProps } from 'antd';
import { createStaticStyles } from 'antd-style';

const lineStyle: React.CSSProperties = {
  lineHeight: '28px',
};

const sharedContent = (
  <>
    <div style={lineStyle}>
      Following the Ant Design specification, we developed a React UI library antd that contains a
      set of high quality components and demos for building rich, interactive user interfaces.
    </div>
    <div style={lineStyle}>🌈 Enterprise-class UI designed for web applications.</div>
    <div style={lineStyle}>📦 A set of high-quality React components out of the box.</div>
    <div style={lineStyle}>🛡 Written in TypeScript with predictable static types.</div>
    <div style={lineStyle}>⚙️ Whole package of design resources and development tools.</div>
    <div style={lineStyle}>🌍 Internationalization support for dozens of languages.</div>
    <div style={lineStyle}>🎨 Powerful theme customization in every detail.</div>
  </>
);

const classNames = createStaticStyles(({ css }) => ({
  container: css`
    border-radius: 10px;
    padding: 10px;
  `,
}));

const styles: DrawerProps['styles'] = {
  mask: {
    backgroundImage: `linear-gradient(to top, #18181b 0, rgba(21, 21, 22, 0.2) 100%)`,
  },
};

const stylesFn: DrawerProps['styles'] = (info) => {
  if (info.props.footer) {
    return {
      header: {
        padding: 16,
      },
      body: {
        padding: 16,
      },
      footer: {
        padding: '16px 10px',
        backgroundColor: '#fafafa',
      },
    } satisfies DrawerProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const [drawerOpen, setOpen] = useState(false);
  const [drawerFnOpen, setFnOpen] = useState(false);

  const sharedProps: DrawerProps = {
    classNames,
    size: 500,
  };

  const footer: React.ReactNode = (
    <Flex gap="middle" justify="flex-end">
      <Button
        onClick={() => setFnOpen(false)}
        styles={{ root: { borderColor: '#ccc', color: '#171717', backgroundColor: '#fff' } }}
      >
        Cancel
      </Button>
      <Button
        type="primary"
        styles={{ root: { backgroundColor: '#171717' } }}
        onClick={() => setOpen(true)}
      >
        Submit
      </Button>
    </Flex>
  );

  return (
    <Flex gap="middle">
      <Button onClick={() => setOpen(true)}>Open Style Drawer</Button>
      <Button type="primary" onClick={() => setFnOpen(true)}>
        Open Function Drawer
      </Button>
      <Drawer
        {...sharedProps}
        footer={null}
        title="Custom Style Drawer"
        styles={styles}
        open={drawerOpen}
        onClose={() => setOpen(false)}
      >
        {sharedContent}
      </Drawer>
      <Drawer
        {...sharedProps}
        footer={footer}
        title="Custom Function drawer"
        styles={stylesFn}
        mask={{ enabled: true, blur: true }}
        open={drawerFnOpen}
        onClose={() => setFnOpen(false)}
      >
        {sharedContent}
      </Drawer>
    </Flex>
  );
};

export default App;
```







## API

通用属性参考：[通用属性](/docs/react/common-props)

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| afterOpenChange | 切换抽屉时动画结束后的回调 | function(open) | - |  |
| className | Drawer 容器外层 className 设置，如果需要设置最外层，请使用 rootClassName | string | - |  |
| classNames | 用于自定义 Drawer 组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| closable | 是否显示关闭按钮。可通过 `placement` 配置其位置 | boolean \| { closeIcon?: React.ReactNode; disabled?: boolean; placement?: 'start' \| 'end' } | true | placement: 5.28.0 |
| ~~destroyOnClose~~ | 关闭时销毁 Drawer 里的子元素 | boolean | false |  |
| destroyOnHidden | 关闭时销毁 Drawer 里的子元素 | boolean | false | 5.25.0 |
| extra | 抽屉右上角的操作区域 | ReactNode | - | 4.17.0 |
| footer | 抽屉的页脚 | ReactNode | - |  |
| forceRender | 预渲染 Drawer 内元素 | boolean | false |  |
| focusable | 抽屉内焦点管理的配置 | `{ trap?: boolean, focusTriggerAfterClose?: boolean }` | - | 6.2.0 |
| getContainer | 指定 Drawer 挂载的节点，**并在容器内展现**，`false` 为挂载在当前位置 | HTMLElement \| () => HTMLElement \| Selectors \| false | body |  |
| ~~headerStyle~~ | 抽屉头部的样式，请使用 `styles.header` 替换 | CSSProperties | - |  |
| ~~height~~ | 高度，在 `placement` 为 `top` 或 `bottom` 时使用，请使用 `size` 替换 | string \| number | 378 |  |
| keyboard | 是否支持键盘 esc 关闭 | boolean | true |  |
| loading | 显示骨架屏 | boolean | false | 5.17.0 |
| mask | 遮罩效果 | boolean \| `{ enabled?: boolean, blur?: boolean, closable?: boolean }` | true | mask.closable: 6.3.0 |
| ~~maskClosable~~ | 点击蒙层是否允许关闭 | boolean | true |  |
| maxSize | 可拖拽的最大尺寸（宽度或高度，取决于 `placement`） | number | - | 6.0.0 |
| open | Drawer 是否可见 | boolean | false |  |
| placement | 抽屉的方向 | `top` \| `right` \| `bottom` \| `left` | `right` |  |
| push | 用于设置多层 Drawer 的推动行为 | boolean \| { distance: string \| number } | { distance: 180 } | 4.5.0+ |
| resizable | 是否启用拖拽改变尺寸 | boolean \| [ResizableConfig](#resizableconfig) | - | boolean: 6.1.0 |
| rootStyle | 可用于设置 Drawer 最外层容器的样式，和 `style` 的区别是作用节点包括 `mask` | CSSProperties | - |  |
| size | 预设抽屉宽度（或高度），default `378px` 和 large `736px`，或自定义数字 | 'default' \| 'large' \| number \| string | 'default' | 4.17.0, string: 6.2.0 |
| style | Drawer 面板的样式，如需仅配置 body 部分，请使用 `styles.body` | CSSProperties | - |  |
| styles | 用于自定义 Drawer 组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| title | 标题 | ReactNode | - |  |
| ~~width~~ | 宽度，请使用 `size` 替换 | string \| number | 378 |  |
| zIndex | 设置 Drawer 的 `z-index` | number | 1000 |  |
| onClose | 点击遮罩层或左上角叉或取消按钮的回调 | function(e) | - |  |
| drawerRender | 自定义渲染抽屉 | (node: ReactNode) => ReactNode | - | 5.18.0 |

### ResizableConfig

| 参数          | 说明                     | 类型                   | 默认值 | 版本  |
| ------------- | ------------------------ | ---------------------- | ------ | ----- |
| onResizeStart | 开始拖拽调整大小时的回调 | () => void             | -      | 6.0.0 |
| onResize      | 拖拽调整大小时的回调     | (size: number) => void | -      | 6.0.0 |
| onResizeEnd   | 结束拖拽调整大小时的回调 | () => void             | -      | 6.0.0 |

## Semantic DOM {#semantic-dom}

https://ant.design/components/drawer-cn/semantic.md

## 主题变量（Design Token）{#design-token}



## 组件 Token (Drawer)
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| draggerSize | 拖拽手柄大小 | number | 4 |
| footerPaddingBlock | 底部区域纵向内间距 | number | 8 |
| footerPaddingInline | 底部区域横向内间距 | number | 16 |
| zIndexPopup | 弹窗 z-index | number | 1000 |

## 全局 Token
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| borderRadiusSM | SM号圆角，用于组件小尺寸下的圆角，如 Button、Input、Select 等输入类控件在 small size 下的圆角 | number |  |
| colorBgElevated | 浮层容器背景色，在暗色模式下该 token 的色值会比 `colorBgContainer` 要亮一些。例如：模态框、弹出框、菜单等。 | string |  |
| colorBgMask | 浮层的背景蒙层颜色，用于遮罩浮层下面的内容，Modal、Drawer、Image 等组件的蒙层使用的是该 token | string |  |
| colorBgTextActive | 控制文本在激活状态下的背景色。 | string |  |
| colorBgTextHover | 控制文本在悬停状态下的背景色。 | string |  |
| colorIcon | 控制弱操作图标的颜色，例如 allowClear 或 Alert 关闭按钮。  * | string |  |
| colorIconHover | 控制弱操作图标在悬浮状态下的颜色，例如 allowClear 或 Alert 关闭按钮。 | string |  |
| colorPrimary | 品牌色是体现产品特性和传播理念最直观的视觉元素之一。在你完成品牌主色的选取之后，我们会自动帮你生成一套完整的色板，并赋予它们有效的设计语义 | string |  |
| colorPrimaryBorder | 主色梯度下的描边用色，用在 Slider 等组件的描边上。 | string |  |
| colorSplit | 用于作为分割线的颜色，此颜色和 colorBorderSecondary 的颜色一致，但是用的是透明色。 | string |  |
| colorText | 最深的文本色。为了符合W3C标准，默认的文本颜色使用了该色，同时这个颜色也是最深的中性色。 | string |  |
| fontSizeLG | 大号字体大小 | number |  |
| fontWeightStrong | 控制标题类组件（如 h1、h2、h3）或选中项的字体粗细。 | number |  |
| lineHeightLG | 大型文本行高 | number |  |
| lineType | 用于控制组件边框、分割线等的样式，默认是实线 | string |  |
| lineWidth | 用于控制组件边框、分割线等的宽度 | number |  |
| lineWidthFocus | 控制线条的宽度，当组件处于聚焦态时。 | number |  |
| marginXS | 控制元素外边距，小尺寸。 | number |  |
| motionDurationMid | 动效播放速度，中速。用于中型元素动画交互 | string |  |
| motionDurationSlow | 动效播放速度，慢速。用于大型元素如面板动画交互 | string |  |
| padding | 控制元素的内间距。 | number |  |
| paddingLG | 控制元素的大内间距。 | number |  |
| paddingXS | 控制元素的特小内间距。 | number |  |


