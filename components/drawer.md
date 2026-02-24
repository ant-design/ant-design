---
group: Feedback
category: Components
title: Drawer
description: A panel that slides out from the edge of the screen.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*BD2JSKm8I-kAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*r29rQ51bNdwAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## When To Use

A Drawer is a panel that is typically overlaid on top of a page and slides in from the side. It contains a set of information or actions. Since the user can interact with the Drawer without leaving the current page, tasks can be achieved more efficiently within the same context.

- Use a Form to create or edit a set of information.
- Processing subtasks. When subtasks are too heavy for a Popover and we still want to keep the subtasks in the context of the main task, Drawer comes very handy.
- When the same Form is needed in multiple places.

> Notes for developers
>
> Since the `5.17.0`, we provided the `loading` prop by the Spin. However, since the `5.18.0` version, we have fixed this design error and replaced the Spin with the Skeleton, and also modified the type of `loading` prop, which can only accept `boolean` type.

## Examples

### Basic

Basic drawer.

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

### Custom Placement

The Drawer can appear from any edge of the screen.

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

### Resizable

Resizable drawer that allows users to adjust the drawer's width or height by dragging the edge.

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

### Loading

Set the loading status of Drawer.

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

### Extra Actions

Extra actions should be placed at corner of drawer in Ant Design, you can use `extra` prop for that.

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

### Render in current dom

Render in current dom. custom container, check `getContainer`.

> Note: `style` and `className` props are moved to Drawer panel in v5 which is aligned with Modal component. Original `style` and `className` props are replaced by `rootStyle` and `rootClassName`.

> When `getContainer` returns a DOM node, you need to manually set `rootStyle` to `{ position: 'absolute' }`, see [#41951](https://github.com/ant-design/ant-design/issues/41951#issuecomment-1521099152).

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

### Submit form in drawer

Use a form in Drawer with a submit button.

```css
.site-form-in-drawer-wrapper {
  position: absolute;
  inset-inline-end: 0;
  bottom: 0;
  width: 100%;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
  border-top: 1px solid #e9e9e9;
}
```

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

### Preview drawer

Use Drawer to quickly preview details of an object, such as those in a list.

```css
.site-description-item-profile-wrapper {
  margin-bottom: 7px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  line-height: 1.5715;
}

.ant-drawer-body p.site-description-item-profile-p {
  display: block;
  margin-bottom: 16px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 16px;
  line-height: 1.5715;
}

.site-description-item-profile-p-label {
  display: inline-block;
  margin-inline-end: 8px;
  color: rgba(0, 0, 0, 0.85);
}
```

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

### Multi-level drawer

Open a new drawer on top of an existing drawer to handle multi branch tasks.

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

### Preset size

The default width (or height) of Drawer is `378px`, and there is a preset large size `736px`.

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

### mask

mask effect.

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

### Closable placement

Drawer with closable placement, customize the close placement to the `end`, defaults to `start`.

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

### Custom semantic dom styling

You can customize the [semantic dom](#semantic-dom) style of Drawer by passing objects or functions through `classNames` and `styles`.

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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerFnOpen, setDrawerFnOpen] = useState(false);

  const sharedProps: DrawerProps = {
    classNames,
    size: 500,
  };

  const footer: React.ReactNode = (
    <Flex gap="middle" justify="flex-end">
      <Button
        onClick={() => setDrawerFnOpen(false)}
        styles={{ root: { borderColor: '#ccc', color: '#171717', backgroundColor: '#fff' } }}
      >
        Cancel
      </Button>
      <Button
        type="primary"
        styles={{ root: { backgroundColor: '#171717' } }}
        onClick={() => setDrawerOpen(true)}
      >
        Submit
      </Button>
    </Flex>
  );

  return (
    <Flex gap="middle">
      <Button onClick={() => setDrawerOpen(true)}>Open Style Drawer</Button>
      <Button type="primary" onClick={() => setDrawerFnOpen(true)}>
        Open Function Drawer
      </Button>
      <Drawer
        {...sharedProps}
        footer={null}
        title="Custom Style Drawer"
        styles={styles}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
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
        onClose={() => setDrawerFnOpen(false)}
      >
        {sharedContent}
      </Drawer>
    </Flex>
  );
};

export default App;
```







## API

Common props ref：[Common props](/docs/react/common-props)

| Props | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| afterOpenChange | Callback after the animation ends when switching drawers | function(open) | - |  |
| className | Config Drawer Panel className. Use `rootClassName` if want to config top DOM style | string | - |  |
| classNames | Customize class for each semantic structure inside the Drawer component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| closable | Whether to show a close button. The position can be configured with `placement` | boolean \| { closeIcon?: React.ReactNode; disabled?: boolean; placement?: 'start' \| 'end' } | true | placement: 5.28.0 |
| ~~destroyOnClose~~ | Whether to unmount child components on closing drawer or not | boolean | false |  |
| destroyOnHidden | Whether to unmount child components on closing drawer or not | boolean | false | 5.25.0 |
| extra | Extra actions area at corner | ReactNode | - | 4.17.0 |
| footer | The footer for Drawer | ReactNode | - |  |
| forceRender | Pre-render Drawer component forcibly | boolean | false |  |
| focusable | Configuration for focus management in the Drawer | `{ trap?: boolean, focusTriggerAfterClose?: boolean }` | - | 6.2.0 |
| getContainer | mounted node and display window for Drawer | HTMLElement \| () => HTMLElement \| Selectors \| false | body |  |
| ~~headerStyle~~ | Style of the drawer header part, please use `styles.header` instead | CSSProperties | - |  |
| ~~height~~ | Placement is `top` or `bottom`, height of the Drawer dialog, please use `size` instead | string \| number | 378 |  |
| keyboard | Whether support press esc to close | boolean | true |  |
| loading | Show the Skeleton | boolean | false | 5.17.0 |
| mask | Mask effect | boolean \| `{ enabled?: boolean, blur?: boolean, closable?: boolean }` | true | mask.closable: 6.3.0 |
| ~~maskClosable~~ | Clicking on the mask (area outside the Drawer) to close the Drawer or not | boolean | true |  |
| maxSize | Maximum size (width or height depending on `placement`) when resizable | number | - | 6.0.0 |
| open | Whether the Drawer dialog is visible or not | boolean | false |  |
| placement | The placement of the Drawer | `top` \| `right` \| `bottom` \| `left` | `right` |  |
| push | Nested drawers push behavior | boolean \| { distance: string \| number } | { distance: 180 } | 4.5.0+ |
| resizable | Enable resizable by dragging | boolean \| [ResizableConfig](#resizableconfig) | - | boolean: 6.1.0 |
| rootStyle | Style of wrapper element which **contains mask** compare to `style` | CSSProperties | - |  |
| size | preset size of drawer, default `378px` and large `736px`, or a custom number | 'default' \| 'large' \| number \| string | 'default' | 4.17.0, string: 6.2.0 |
| style | Style of Drawer panel. Use `styles.body` if want to config body only | CSSProperties | - |  |
| styles | Customize inline style for each semantic structure inside the Drawer component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| title | The title for Drawer | ReactNode | - |  |
| ~~width~~ | Width of the Drawer dialog, please use `size` instead | string \| number | 378 |  |
| zIndex | The `z-index` of the Drawer | number | 1000 |  |
| onClose | Specify a callback that will be called when a user clicks mask, close button or Cancel button | function(e) | - |  |
| drawerRender | Custom drawer content render | (node: ReactNode) => ReactNode | - | 5.18.0 |

### ResizableConfig

| Props         | Description                 | Type                   | Default | Version |
| ------------- | --------------------------- | ---------------------- | ------- | ------- |
| onResizeStart | Callback when resize starts | () => void             | -       | 6.0.0   |
| onResize      | Callback during resizing    | (size: number) => void | -       | 6.0.0   |
| onResizeEnd   | Callback when resize ends   | () => void             | -       | 6.0.0   |

## Semantic DOM

https://ant.design/components/drawer/semantic.md

## Design Token



## Component Token (Drawer)
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| draggerSize | Size of resize handle | number | 4 |
| footerPaddingBlock | Vertical padding of footer | number | 8 |
| footerPaddingInline | Horizontal padding of footer | number | 16 |
| zIndexPopup | z-index of drawer | number | 1000 |

## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| borderRadiusSM | SM size border radius, used in small size components, such as Button, Input, Select and other input components in small size | number |  |
| colorBgElevated | Container background color of the popup layer, in dark mode the color value of this token will be a little brighter than `colorBgContainer`. E.g: modal, pop-up, menu, etc. | string |  |
| colorBgMask | The background color of the mask, used to cover the content below the mask, Modal, Drawer, Image and other components use this token | string |  |
| colorBgTextActive | Control the background color of text in active state. | string |  |
| colorBgTextHover | Control the background color of text in hover state. | string |  |
| colorIcon | Weak action. Such as `allowClear` or Alert close button | string |  |
| colorIconHover | Weak action hover color. Such as `allowClear` or Alert close button | string |  |
| colorPrimary | Brand color is one of the most direct visual elements to reflect the characteristics and communication of the product. After you have selected the brand color, we will automatically generate a complete color palette and assign it effective design semantics. | string |  |
| colorPrimaryBorder | The stroke color under the main color gradient, used on the stroke of components such as Slider. | string |  |
| colorSplit | Used as the color of separator, this color is the same as colorBorderSecondary but with transparency. | string |  |
| colorText | Default text color which comply with W3C standards, and this color is also the darkest neutral color. | string |  |
| fontSizeLG | Large font size | number |  |
| fontWeightStrong | Control the font weight of heading components (such as h1, h2, h3) or selected item. | number |  |
| lineHeightLG | Line height of large text. | number |  |
| lineType | Border style of base components | string |  |
| lineWidth | Border width of base components | number |  |
| lineWidthFocus | Control the width of the line when the component is in focus state. | number |  |
| marginXS | Control the margin of an element, with a small size. | number |  |
| motionDurationMid | Motion speed, medium speed. Used for medium element animation interaction. | string |  |
| motionDurationSlow | Motion speed, slow speed. Used for large element animation interaction. | string |  |
| padding | Control the padding of the element. | number |  |
| paddingLG | Control the large padding of the element. | number |  |
| paddingXS | Control the extra small padding of the element. | number |  |


