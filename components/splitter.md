---
category: Components
group: Layout
title: Splitter
description: Split panels to isolate
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*f0SISaETY0wAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*y92yRYhObU8AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 1
---

## When To Use

Can be used to separate areas horizontally or vertically. When you need to freely drag and adjust the size of each area. When you need to specify the maximum and minimum width and height of an area.

## Examples

### Basic

Initialize panel size, panel size limit.

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

### Control mode

Control the size of the splitter. When one of the panels disables `resizable`, dragging will be disabled.

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

### Vertical

Use vertical layout.

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

### Collapsible

Set `collapsible` to enable collapse. Can through `min` to limit dragging to expand when collapsed.

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

### Control collapsible icons

Set `collapsible.showCollapsibleIcon` to control the display mode of collapsible icons.

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

### Multiple panels

Multiple panels.

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

### Complex combination

Complex combination panel, quick folding, prohibited from changing size

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

### Lazy

Lazy mode, dragging does not update the size immediately, but updates when released.

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

### Customize

customize handle elements and style

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

### Custom semantic dom styling

You can customize the [semantic dom](#semantic-dom) style of Splitter by passing objects/functions through `classNames` and `styles`.

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

### Double-clicked reset

Double-click the dragger to reset the Splitter.Panel to its default size.

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

Common props ref：[Common props](/docs/react/common-props)

> The Splitter component needs to calculate the panel size through its child elements, so its child elements only support `Splitter.Panel`.

### Splitter

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| collapsibleIcon | custom collapsible icon | `{start: ReactNode; end: ReactNode}` | - | 6.0.0 |
| draggerIcon | custom dragger icon | `ReactNode` | - | 6.0.0 |
| ~~layout~~ | Layout direction | `horizontal` \| `vertical` | `horizontal` | - |
| lazy | Lazy mode | `boolean` | `false` | 5.23.0 |
| onCollapse | Callback when expanding or collapsing | `(collapsed: boolean[], sizes: number[]) => void` | - | 5.28.0 |
| orientation | Orientation direction | `horizontal` \| `vertical` | `horizontal` |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| vertical | Orientation，Simultaneously existing with `orientation`, `orientation` takes priority | boolean | `false` |  |
| onDraggerDoubleClick | Callback triggered when the dragger is double-clicked | `(index: number) => void` | - | 6.3.0 |
| onResize | Panel size change callback | `(sizes: number[]) => void` | - | - |
| onResizeEnd | Drag end callback | `(sizes: number[]) => void` | - | - |
| onResizeStart | Callback before dragging starts | `(sizes: number[]) => void` | - | - |

### Panel

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| collapsible | Quick folding | `boolean \| { start?: boolean; end?: boolean; showCollapsibleIcon?: boolean \| 'auto' }` | `false` | showCollapsibleIcon: 5.27.0 |
| defaultSize | Initial panel size support number for px or 'percent%' usage | `number \| string` | - | - |
| max | Maximum threshold support number for px or 'percent%' usage | `number \| string` | - | - |
| min | Minimum threshold support number for px or 'percent%' usage | `number \| string` | - | - |
| resizable | Whether to enable drag and drop | `boolean` | `true` | - |
| size | Controlled panel size support number for px or 'percent%' usage | `number \| string` | - | - |

## Semantic DOM

https://ant.design/components/splitter/semantic.md

## Design Token

<ComponentTokenTable component='Splitter'></ComponentTokenTable>
