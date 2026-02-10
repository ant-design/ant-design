---
category: Components
group: 布局
title: Splitter
subtitle: 分隔面板
description: 自由切分指定区域
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*f0SISaETY0wAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*y92yRYhObU8AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 1
---

## 何时使用 {#when-to-use}

- 可以水平或垂直地分隔区域。
- 当需要自由拖拽调整各区域大小。
- 当需要指定区域的最大最小宽高时。

## 代码演示 {#examples}

### 基本用法

初始化面板大小，面板大小限制。

```tsx
import React from 'react';
import { Flex, Splitter, Typography } from 'antd';

export const Desc: React.FC<Readonly<{ text?: string | number }>> = (props) => (
  <Flex justify="center" align="center" style={{ height: '100%' }}>
    <Typography.Title type="secondary" level={5} style={{ whiteSpace: 'nowrap' }}>
      {props.text}
    </Typography.Title>
  </Flex>
);

const App: React.FC = () => (
  <Splitter style={{ height: 200, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
    <Splitter.Panel defaultSize="40%" min="20%" max="70%">
      <Desc text="First" />
    </Splitter.Panel>
    <Splitter.Panel>
      <Desc text="Second" />
    </Splitter.Panel>
  </Splitter>
);

export default App;
```

### 受控模式

受控调整尺寸。当 Panel 之间任意一方禁用 `resizable`，则其拖拽将被禁用。

```tsx
import React from 'react';
import { Button, Flex, Splitter, Switch, Typography } from 'antd';

const Desc: React.FC<Readonly<{ text?: string | number }>> = (props) => (
  <Flex justify="center" align="center" style={{ height: '100%' }}>
    <Typography.Title type="secondary" level={5} style={{ whiteSpace: 'nowrap' }}>
      {props.text}
    </Typography.Title>
  </Flex>
);

const App: React.FC = () => {
  const [sizes, setSizes] = React.useState<(number | string)[]>(['50%', '50%']);
  const [enabled, setEnabled] = React.useState(true);
  return (
    <Flex vertical gap="middle">
      <Splitter
        onResize={setSizes}
        style={{ height: 200, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
      >
        <Splitter.Panel size={sizes[0]} resizable={enabled}>
          <Desc text="First" />
        </Splitter.Panel>
        <Splitter.Panel size={sizes[1]}>
          <Desc text="Second" />
        </Splitter.Panel>
      </Splitter>
      <Flex gap="middle" justify="space-between">
        <Switch
          value={enabled}
          onChange={() => setEnabled(!enabled)}
          checkedChildren="Enabled"
          unCheckedChildren="Disabled"
        />
        <Button onClick={() => setSizes(['50%', '50%'])}>Reset</Button>
      </Flex>
    </Flex>
  );
};

export default App;
```

### 垂直方向

使用垂直布局。

```tsx
import React from 'react';
import { Flex, Splitter, Typography } from 'antd';

const Desc: React.FC<Readonly<{ text?: string | number }>> = (props) => (
  <Flex justify="center" align="center" style={{ height: '100%' }}>
    <Typography.Title type="secondary" level={5} style={{ whiteSpace: 'nowrap' }}>
      {props.text}
    </Typography.Title>
  </Flex>
);

const App: React.FC = () => (
  <Splitter vertical style={{ height: 300, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
    <Splitter.Panel>
      <Desc text="First" />
    </Splitter.Panel>
    <Splitter.Panel>
      <Desc text="Second" />
    </Splitter.Panel>
  </Splitter>
);

export default App;
```

### 可折叠

配置 `collapsible` 提供快捷收缩能力。可以通过 `min` 限制收缩后不能通过拖拽展开。

```tsx
import React from 'react';
import { Flex, Splitter, Typography } from 'antd';
import type { SplitterProps } from 'antd';

const Desc: React.FC<Readonly<{ text?: string | number }>> = (props) => (
  <Flex justify="center" align="center" style={{ height: '100%' }}>
    <Typography.Title type="secondary" level={5} style={{ whiteSpace: 'nowrap' }}>
      {props.text}
    </Typography.Title>
  </Flex>
);

const CustomSplitter: React.FC<Readonly<SplitterProps>> = ({ style, ...restProps }) => (
  <Splitter style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', ...style }} {...restProps}>
    <Splitter.Panel collapsible min="20%">
      <Desc text="First" />
    </Splitter.Panel>
    <Splitter.Panel collapsible>
      <Desc text="Second" />
    </Splitter.Panel>
  </Splitter>
);

const App: React.FC = () => (
  <Flex gap="middle" vertical>
    <CustomSplitter style={{ height: 200 }} />
    <CustomSplitter style={{ height: 300 }} orientation="vertical" />
  </Flex>
);

export default App;
```

### 可折叠图标显示

配置 `collapsible.showCollapsibleIcon` 控制可折叠图标的显示方式。

```tsx
import React, { useState } from 'react';
import { Flex, Radio, Splitter, Typography } from 'antd';
import type { RadioChangeEvent } from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox';

const Desc: React.FC<Readonly<{ text?: string | number }>> = (props) => (
  <Flex justify="center" align="center" style={{ height: '100%' }}>
    <Typography.Title type="secondary" level={5} style={{ whiteSpace: 'nowrap' }}>
      {props.text}
    </Typography.Title>
  </Flex>
);

const options: CheckboxGroupProps<'auto' | boolean>['options'] = [
  { label: 'Auto', value: 'auto' },
  { label: 'True', value: true },
  { label: 'False', value: false },
];

const App: React.FC = () => {
  const [showIconMode, setShowIconMode] = useState<'auto' | boolean>(true);

  const onChange = (e: RadioChangeEvent) => {
    setShowIconMode(e.target.value);
  };

  return (
    <Flex vertical gap={20}>
      <Flex gap={5}>
        <p>ShowCollapsibleIcon: </p>
        <Radio.Group options={options} value={showIconMode} onChange={onChange} />
      </Flex>
      <Splitter style={{ height: 200, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <Splitter.Panel
          collapsible={{ start: true, end: true, showCollapsibleIcon: showIconMode }}
          min="20%"
        >
          <Desc text="First" />
        </Splitter.Panel>
        <Splitter.Panel collapsible={{ start: true, end: true, showCollapsibleIcon: showIconMode }}>
          <Desc text="Second" />
        </Splitter.Panel>
        <Splitter.Panel collapsible={{ start: true, end: true, showCollapsibleIcon: showIconMode }}>
          <Desc text="Third" />
        </Splitter.Panel>
      </Splitter>
    </Flex>
  );
};

export default App;
```

### 多面板

多面板

```tsx
import React from 'react';
import { Flex, Splitter, Typography } from 'antd';

const Desc: React.FC<Readonly<{ text?: string | number }>> = (props) => (
  <Flex justify="center" align="center" style={{ height: '100%' }}>
    <Typography.Title type="secondary" level={5} style={{ whiteSpace: 'nowrap' }}>
      Panel {props.text}
    </Typography.Title>
  </Flex>
);

const App: React.FC = () => (
  <Splitter style={{ height: 200, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
    <Splitter.Panel collapsible>
      <Desc text={1} />
    </Splitter.Panel>
    <Splitter.Panel collapsible={{ start: true }}>
      <Desc text={2} />
    </Splitter.Panel>
    <Splitter.Panel>
      <Desc text={3} />
    </Splitter.Panel>
  </Splitter>
);

export default App;
```

### 复杂组合

复杂组合面板，快捷折叠，禁止改变大小

```tsx
import React from 'react';
import { Flex, Splitter, Typography } from 'antd';

const Desc: React.FC<Readonly<{ text?: string | number }>> = (props) => (
  <Flex justify="center" align="center" style={{ height: '100%' }}>
    <Typography.Title type="secondary" level={5} style={{ whiteSpace: 'nowrap' }}>
      {props.text}
    </Typography.Title>
  </Flex>
);

const App: React.FC = () => (
  <Splitter style={{ height: 300, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
    <Splitter.Panel collapsible>
      <Desc text="Left" />
    </Splitter.Panel>
    <Splitter.Panel>
      <Splitter orientation="vertical">
        <Splitter.Panel>
          <Desc text="Top" />
        </Splitter.Panel>
        <Splitter.Panel>
          <Desc text="Bottom" />
        </Splitter.Panel>
      </Splitter>
    </Splitter.Panel>
  </Splitter>
);

export default App;
```

### 延迟渲染模式

延迟渲染模式，拖拽时不会立即更新大小，而是等到松手时才更新。

```tsx
import React from 'react';
import { Flex, Space, Splitter, Typography } from 'antd';

const Desc: React.FC<Readonly<{ text?: string | number }>> = (props) => (
  <Flex justify="center" align="center" style={{ height: '100%' }}>
    <Typography.Title type="secondary" level={5} style={{ whiteSpace: 'nowrap' }}>
      {props.text}
    </Typography.Title>
  </Flex>
);

const App: React.FC = () => (
  <Space vertical style={{ width: '100%' }}>
    <Splitter lazy style={{ height: 200, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <Splitter.Panel defaultSize="40%" min="20%" max="70%">
        <Desc text="First" />
      </Splitter.Panel>
      <Splitter.Panel>
        <Desc text="Second" />
      </Splitter.Panel>
    </Splitter>
    <Splitter
      lazy
      orientation="vertical"
      style={{ height: 200, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
    >
      <Splitter.Panel defaultSize="40%" min="30%" max="70%">
        <Desc text="First" />
      </Splitter.Panel>
      <Splitter.Panel>
        <Desc text="Second" />
      </Splitter.Panel>
    </Splitter>
  </Space>
);

export default App;
```

### 自定义样式

自定义操作元素样式

```tsx
import React from 'react';
import {
  CaretDownOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
  CaretUpOutlined,
  ColumnWidthOutlined,
} from '@ant-design/icons';
import { ConfigProvider, Divider, Flex, Splitter, Typography } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  dragger: {
    '&::before': {
      backgroundColor: 'transparent !important',
      border: `1px dashed ${token.controlItemBgHover}`,
    },
    '&:hover::before': {
      border: `1px dashed ${token.colorPrimary}`,
    },
  },
  draggerActive: {
    '&::before': {
      border: `1px dashed ${token.colorPrimary}`,
    },
  },
  draggerIcon: {
    '&:hover': {
      color: token.colorPrimary,
    },
  },
  collapsibleIcon: {
    fontSize: 16,
    color: token.colorTextDescription,

    '&:hover': {
      color: token.colorPrimary,
    },
  },
}));

const Desc: React.FC<Readonly<{ text?: string | number }>> = (props) => (
  <Flex justify="center" align="center" style={{ height: '100%' }}>
    <Typography.Title type="secondary" level={5} style={{ whiteSpace: 'nowrap' }}>
      {props.text}
    </Typography.Title>
  </Flex>
);

const App: React.FC = () => {
  const { styles } = useStyles();

  return (
    <ConfigProvider
      theme={{
        components: {
          Splitter: { splitBarSize: 1, splitTriggerSize: 16 },
        },
      }}
    >
      <Splitter
        style={{ height: 200, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
        draggerIcon={<ColumnWidthOutlined className={styles.draggerIcon} />}
        collapsibleIcon={{
          start: <CaretLeftOutlined className={styles.collapsibleIcon} />,
          end: <CaretRightOutlined className={styles.collapsibleIcon} />,
        }}
      >
        <Splitter.Panel defaultSize="40%" min="20%" max="70%" collapsible>
          <Desc text="Panel 1" />
        </Splitter.Panel>

        <Splitter.Panel collapsible>
          <Desc text="Panel 2" />
        </Splitter.Panel>

        <Splitter.Panel resizable={false}>
          <Desc text="Panel 3" />
        </Splitter.Panel>
      </Splitter>

      <Divider />

      <Splitter
        orientation="vertical"
        classNames={{ dragger: { default: styles.dragger, active: styles.draggerActive } }}
        style={{ height: 200, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
        draggerIcon={null}
        collapsibleIcon={{
          start: <CaretUpOutlined className={styles.collapsibleIcon} />,
          end: <CaretDownOutlined className={styles.collapsibleIcon} />,
        }}
      >
        <Splitter.Panel defaultSize="40%" min="30%" max="70%" collapsible>
          <Desc text="First" />
        </Splitter.Panel>

        <Splitter.Panel collapsible>
          <Desc text="Second" />
        </Splitter.Panel>
      </Splitter>
    </ConfigProvider>
  );
};

export default App;
```

### 自定义语义结构的样式和类

通过 `classNames` 和 `styles` 传入对象/函数可以自定义 Splitter 的[语义化结构](#semantic-dom)样式。

```tsx
import React from 'react';
import { Flex, Splitter, Typography } from 'antd';
import type { SplitterProps } from 'antd';
import { createStaticStyles } from 'antd-style';

const Desc: React.FC<Readonly<{ text?: string | number; style?: React.CSSProperties }>> = (
  props,
) => {
  return (
    <Flex justify="center" align="center" style={{ height: '100%' }}>
      <Typography.Title type="secondary" level={5} style={props.style}>
        {props.text}
      </Typography.Title>
    </Flex>
  );
};

const styles = createStaticStyles(({ css, cssVar }) => ({
  boxShadow: css`
    box-shadow: ${cssVar.boxShadowSecondary};
  `,
}));

const stylesObject: SplitterProps['styles'] = {
  root: { backgroundColor: '#fffbe6' },
  dragger: { backgroundColor: 'rgba(194,223,252,0.4)' },
};

const stylesFn: SplitterProps['styles'] = ({ props }) => {
  if (props.orientation === 'horizontal') {
    return {
      root: {
        borderWidth: 2,
        borderStyle: 'dashed',
        marginBottom: 10,
      },
    } satisfies SplitterProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const splitSharedProps: SplitterProps = {
    style: { height: 200 },
    classNames: { root: styles.boxShadow },
  };

  return (
    <Flex vertical gap="large">
      <Splitter {...splitSharedProps} styles={stylesObject}>
        <Splitter.Panel>
          <Desc text="First" style={{ color: '#000' }} />
        </Splitter.Panel>
        <Splitter.Panel>
          <Desc text="Second" style={{ color: '#000' }} />
        </Splitter.Panel>
      </Splitter>
      <Splitter {...splitSharedProps} styles={stylesFn}>
        <Splitter.Panel>
          <Desc text="First" />
        </Splitter.Panel>
        <Splitter.Panel>
          <Desc text="Second" />
        </Splitter.Panel>
      </Splitter>
    </Flex>
  );
};

export default App;
```

### 双击重置

双击拖拽条 Splitter.Panel 重置为默认大小。

```tsx
import React, { useState } from 'react';
import { Flex, Splitter, Typography } from 'antd';

const defaultSizes = ['30%', '40%', '30%'];

const Desc: React.FC<Readonly<{ text?: string | number }>> = (props) => (
  <Flex justify="center" align="center" style={{ height: '100%' }}>
    <Typography.Title type="secondary" level={5} style={{ whiteSpace: 'nowrap' }}>
      Panel {props.text}
    </Typography.Title>
  </Flex>
);

const App: React.FC = () => {
  const [sizes, setSizes] = useState<(number | string)[]>(defaultSizes);

  const handleDoubleClick = () => {
    setSizes(defaultSizes);
  };

  return (
    <Splitter
      style={{ height: 200, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
      onResize={setSizes}
      onDraggerDoubleClick={handleDoubleClick}
    >
      <Splitter.Panel size={sizes[0]}>
        <Desc text={1} />
      </Splitter.Panel>

      <Splitter.Panel size={sizes[1]}>
        <Desc text={2} />
      </Splitter.Panel>

      <Splitter.Panel size={sizes[2]}>
        <Desc text={3} />
      </Splitter.Panel>
    </Splitter>
  );
};

export default App;
```





## API

通用属性参考：[通用属性](/docs/react/common-props)

> Splitter 组件需要通过子元素计算面板大小，因而其子元素仅支持 `Splitter.Panel`。

### Splitter

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| collapsibleIcon | 折叠图标 | `{start?: ReactNode; end?: ReactNode}` | - | 6.0.0 |
| draggerIcon | 拖拽图标 | `ReactNode` | - | 6.0.0 |
| ~~layout~~ | 布局方向 | `horizontal` \| `vertical` | `horizontal` | - |
| lazy | 延迟渲染模式 | `boolean` | `false` | 5.23.0 |
| onCollapse | 展开-收起时回调 | `(collapsed: boolean[], sizes: number[]) => void` | - | 5.28.0 |
| orientation | 布局方向 | `horizontal` \| `vertical` | `horizontal` | - |
| styles | 用于自定义组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| vertical | 排列方向，与 `orientation` 同时存在，以 `orientation` 优先 | boolean | `false` |  |
| onDraggerDoubleClick | 双击拖拽条回调 | `(index: number) => void` | - | 6.3.0 |
| onResize | 面板大小变化回调 | `(sizes: number[]) => void` | - | - |
| onResizeEnd | 拖拽结束回调 | `(sizes: number[]) => void` | - | - |
| onResizeStart | 开始拖拽之前回调 | `(sizes: number[]) => void` | - | - |

### Panel

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| collapsible | 快速折叠 | `boolean \| { start?: boolean; end?: boolean; showCollapsibleIcon?: boolean \| 'auto' }` | `false` | showCollapsibleIcon: 5.27.0 |
| defaultSize | 初始面板大小，支持数字 px 或者文字 '百分比%' 类型 | `number \| string` | - | - |
| max | 最大阈值，支持数字 px 或者文字 '百分比%' 类型 | `number \| string` | - | - |
| min | 最小阈值，支持数字 px 或者文字 '百分比%' 类型 | `number \| string` | - | - |
| resizable | 是否开启拖拽伸缩 | `boolean` | `true` | - |
| size | 受控面板大小，支持数字 px 或者文字 '百分比%' 类型 | `number \| string` | - | - |

## Semantic DOM

https://ant.design/components/splitter-cn/semantic.md

## 主题变量（Design Token）{#design-token}

<ComponentTokenTable component='Splitter'></ComponentTokenTable>
