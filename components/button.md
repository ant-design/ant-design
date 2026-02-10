---
category: Components
title: Button
description: To trigger an operation.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*7va7RKs3YzIAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*3T4cRqxH9-8AAAAAAAAAAAAADrJ8AQ/original
designUrl: /docs/spec/buttons
demo:
  cols: 2
group:
  title: General
  order: 1
---

## When To Use

A button means an operation (or a series of operations). Clicking a button will trigger its corresponding business logic.

In Ant Design we provide 5 types of button.

- 🔵 Primary button: used for the main action, there can be at most one primary button in a section.
- ⚪️ Default button: used for a series of actions without priority.
- 😶 Dashed button: commonly used for adding more actions.
- 🔤 Text button: used for the most secondary action.
- 🔗 Link button: used for external links.

And 4 other properties additionally.

- 🔴 `danger`: used for actions of risk, like deletion or authorization.
- 👻 `ghost`: used in situations with complex background, home pages usually.
- 🚫 `disabled`: used when actions are not available.
- 🔃 `loading`: adds a loading spinner in button, avoids multiple submits too.

## Examples

### Syntactic sugar

Through the `type` syntactic sugar, use the preset button styles: `primary` buttons, `default` buttons, `dashed` buttons, `text` buttons, and `link` buttons.

```tsx
import React from 'react';
import { Button, Flex } from 'antd';

const App: React.FC = () => (
  <Flex gap="small" wrap>
    <Button type="primary">Primary Button</Button>
    <Button>Default Button</Button>
    <Button type="dashed">Dashed Button</Button>
    <Button type="text">Text Button</Button>
    <Button type="link">Link Button</Button>
  </Flex>
);

export default App;
```

### Color & Variant

You can set the `color` and `variant` attributes at the same time can derive more variant buttons.

```tsx
import React from 'react';
import { Button, ConfigProvider, Flex } from 'antd';
import { useResponsive } from 'antd-style';

const App: React.FC = () => {
  const { xxl } = useResponsive();

  return (
    <ConfigProvider componentSize={xxl ? 'middle' : 'small'}>
      <Flex vertical gap="small">
        <Flex gap="small" wrap>
          <Button color="default" variant="solid">
            Solid
          </Button>
          <Button color="default" variant="outlined">
            Outlined
          </Button>
          <Button color="default" variant="dashed">
            Dashed
          </Button>
          <Button color="default" variant="filled">
            Filled
          </Button>
          <Button color="default" variant="text">
            Text
          </Button>
          <Button color="default" variant="link">
            Link
          </Button>
        </Flex>
        <Flex gap="small" wrap>
          <Button color="primary" variant="solid">
            Solid
          </Button>
          <Button color="primary" variant="outlined">
            Outlined
          </Button>
          <Button color="primary" variant="dashed">
            Dashed
          </Button>
          <Button color="primary" variant="filled">
            Filled
          </Button>
          <Button color="primary" variant="text">
            Text
          </Button>
          <Button color="primary" variant="link">
            Link
          </Button>
        </Flex>
        <Flex gap="small" wrap>
          <Button color="danger" variant="solid">
            Solid
          </Button>
          <Button color="danger" variant="outlined">
            Outlined
          </Button>
          <Button color="danger" variant="dashed">
            Dashed
          </Button>
          <Button color="danger" variant="filled">
            Filled
          </Button>
          <Button color="danger" variant="text">
            Text
          </Button>
          <Button color="danger" variant="link">
            Link
          </Button>
        </Flex>
        <Flex gap="small" wrap>
          <Button color="pink" variant="solid">
            Solid
          </Button>
          <Button color="pink" variant="outlined">
            Outlined
          </Button>
          <Button color="pink" variant="dashed">
            Dashed
          </Button>
          <Button color="pink" variant="filled">
            Filled
          </Button>
          <Button color="pink" variant="text">
            Text
          </Button>
          <Button color="pink" variant="link">
            Link
          </Button>
        </Flex>
        <Flex gap="small" wrap>
          <Button color="purple" variant="solid">
            Solid
          </Button>
          <Button color="purple" variant="outlined">
            Outlined
          </Button>
          <Button color="purple" variant="dashed">
            Dashed
          </Button>
          <Button color="purple" variant="filled">
            Filled
          </Button>
          <Button color="purple" variant="text">
            Text
          </Button>
          <Button color="purple" variant="link">
            Link
          </Button>
        </Flex>
        <Flex gap="small" wrap>
          <Button color="cyan" variant="solid">
            Solid
          </Button>
          <Button color="cyan" variant="outlined">
            Outlined
          </Button>
          <Button color="cyan" variant="dashed">
            Dashed
          </Button>
          <Button color="cyan" variant="filled">
            Filled
          </Button>
          <Button color="cyan" variant="text">
            Text
          </Button>
          <Button color="cyan" variant="link">
            Link
          </Button>
        </Flex>
      </Flex>
    </ConfigProvider>
  );
};

export default App;
```


### Icon

You can add an icon using the `icon` property.

```tsx
import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Flex, Tooltip } from 'antd';

const App: React.FC = () => (
  <Flex gap="small" vertical>
    <Flex wrap gap="small">
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
    </Flex>
    <Flex wrap gap="small">
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
      <Button icon={<SearchOutlined />} href="https://www.google.com" target="_blank" />
    </Flex>
  </Flex>
);

export default App;
```

### Icon Placement

You can set the position of a button's icon by setting the `iconPlacement` to `start` or `end` respectively.

```tsx
import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Radio, Space, Tooltip } from 'antd';

const App: React.FC = () => {
  const [position, setPosition] = useState<'start' | 'end'>('end');

  return (
    <>
      <Space>
        <Radio.Group value={position} onChange={(e) => setPosition(e.target.value)}>
          <Radio.Button value="start">start</Radio.Button>
          <Radio.Button value="end">end</Radio.Button>
        </Radio.Group>
      </Space>
      <Divider titlePlacement="start" plain>
        Preview
      </Divider>
      <Flex gap="small" vertical>
        <Flex wrap gap="small">
          <Tooltip title="search">
            <Button type="primary" shape="circle" icon={<SearchOutlined />} />
          </Tooltip>
          <Button type="primary" shape="circle">
            A
          </Button>
          <Button type="primary" icon={<SearchOutlined />} iconPlacement={position}>
            Search
          </Button>
          <Tooltip title="search">
            <Button shape="circle" icon={<SearchOutlined />} />
          </Tooltip>
          <Button icon={<SearchOutlined />} iconPlacement={position}>
            Search
          </Button>
        </Flex>
        <Flex wrap gap="small">
          <Tooltip title="search">
            <Button shape="circle" icon={<SearchOutlined />} />
          </Tooltip>
          <Button icon={<SearchOutlined />} type="text" iconPlacement={position}>
            Search
          </Button>
          <Tooltip title="search">
            <Button type="dashed" shape="circle" icon={<SearchOutlined />} />
          </Tooltip>
          <Button type="dashed" icon={<SearchOutlined />} iconPlacement={position}>
            Search
          </Button>
          <Button
            icon={<SearchOutlined />}
            href="https://www.google.com"
            target="_blank"
            iconPlacement={position}
          />
          <Button type="primary" loading iconPlacement={position}>
            Loading
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default App;
```



### Size

Ant Design supports three sizes of buttons: small, default and large.

If a large or small button is desired, set the `size` property to either `large` or `small` respectively. Omit the `size` property for a button with the default size.

```tsx
import React, { useState } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Radio } from 'antd';
import type { ConfigProviderProps } from 'antd';

type SizeType = ConfigProviderProps['componentSize'];

const App: React.FC = () => {
  const [size, setSize] = useState<SizeType>('large'); // default is 'middle'
  return (
    <>
      <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
        <Radio.Button value="large">Large</Radio.Button>
        <Radio.Button value="default">Default</Radio.Button>
        <Radio.Button value="small">Small</Radio.Button>
      </Radio.Group>
      <Divider titlePlacement="start" plain>
        Preview
      </Divider>
      <Flex gap="small" align="flex-start" vertical>
        <Flex gap="small" wrap>
          <Button type="primary" size={size}>
            Primary
          </Button>
          <Button size={size}>Default</Button>
          <Button type="dashed" size={size}>
            Dashed
          </Button>
        </Flex>
        <Button type="link" size={size}>
          Link
        </Button>
        <Flex gap="small" wrap>
          <Button type="primary" icon={<DownloadOutlined />} size={size} />
          <Button type="primary" shape="circle" icon={<DownloadOutlined />} size={size} />
          <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size} />
          <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size}>
            Download
          </Button>
          <Button type="primary" icon={<DownloadOutlined />} size={size}>
            Download
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default App;
```

### Disabled

To mark a button as disabled, add the `disabled` property to the `Button`.

```tsx
import React from 'react';
import { Button, Flex } from 'antd';

const App: React.FC = () => (
  <Flex gap="small" align="flex-start" vertical>
    <Flex gap="small">
      <Button type="primary">Primary</Button>
      <Button type="primary" disabled>
        Primary(disabled)
      </Button>
    </Flex>
    <Flex gap="small">
      <Button>Default</Button>
      <Button disabled>Default(disabled)</Button>
    </Flex>
    <Flex gap="small">
      <Button type="dashed">Dashed</Button>
      <Button type="dashed" disabled>
        Dashed(disabled)
      </Button>
    </Flex>
    <Flex gap="small">
      <Button type="text">Text</Button>
      <Button type="text" disabled>
        Text(disabled)
      </Button>
    </Flex>
    <Flex gap="small">
      <Button type="link">Link</Button>
      <Button type="link" disabled>
        Link(disabled)
      </Button>
    </Flex>
    <Flex gap="small">
      <Button type="primary" href="https://ant.design/index-cn">
        Href Primary
      </Button>
      <Button type="primary" href="https://ant.design/index-cn" disabled>
        Href Primary(disabled)
      </Button>
    </Flex>
    <Flex gap="small">
      <Button danger>Danger Default</Button>
      <Button danger disabled>
        Danger Default(disabled)
      </Button>
    </Flex>
    <Flex gap="small">
      <Button danger type="text">
        Danger Text
      </Button>
      <Button danger type="text" disabled>
        Danger Text(disabled)
      </Button>
    </Flex>
    <Flex gap="small">
      <Button type="link" danger>
        Danger Link
      </Button>
      <Button type="link" danger disabled>
        Danger Link(disabled)
      </Button>
    </Flex>
    <Flex gap="small" className="site-button-ghost-wrapper">
      <Button ghost>Ghost</Button>
      <Button ghost disabled>
        Ghost(disabled)
      </Button>
    </Flex>
  </Flex>
);

export default App;
```

### Loading

A loading indicator can be added to a button by setting the `loading` property on the `Button`. The `loading.icon` can be used to customize the loading icon.

```tsx
import React, { useState } from 'react';
import { PoweroffOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';

const App: React.FC = () => {
  const [loadings, setLoadings] = useState<boolean[]>([]);

  const enterLoading = (index: number) => {
    console.log('Start loading:', index);

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
    }, 3000);
  };

  return (
    <Flex gap="small" vertical>
      <Flex gap="small" align="center" wrap>
        <Button type="primary" loading>
          Loading
        </Button>
        <Button type="primary" size="small" loading>
          Loading
        </Button>
        <Button type="primary" icon={<PoweroffOutlined />} loading />
        <Button type="primary" loading={{ icon: <SyncOutlined spin /> }}>
          Loading Icon
        </Button>
      </Flex>
      <Flex gap="small" wrap>
        <Button type="primary" loading={loadings[0]} onClick={() => enterLoading(0)}>
          Icon Start
        </Button>
        <Button
          type="primary"
          loading={loadings[2]}
          onClick={() => enterLoading(2)}
          iconPlacement="end"
        >
          Icon End
        </Button>
        <Button
          type="primary"
          icon={<PoweroffOutlined />}
          loading={loadings[1]}
          onClick={() => enterLoading(1)}
        >
          Icon Replace
        </Button>
        <Button
          type="primary"
          icon={<PoweroffOutlined />}
          loading={loadings[3]}
          onClick={() => enterLoading(3)}
        />
        <Button
          type="primary"
          icon={<PoweroffOutlined />}
          loading={loadings[3] && { icon: <SyncOutlined spin /> }}
          onClick={() => enterLoading(3)}
        >
          Loading Icon
        </Button>
      </Flex>
    </Flex>
  );
};

export default App;
```

### Multiple Buttons

If you need several buttons, we recommend that you use 1 primary button + n secondary buttons. If there are more than three operations, you can group some of them into a [Dropdown](/components/dropdown/#dropdown-demo-dropdown-button).

```tsx
import React from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Flex, Space } from 'antd';

const onMenuClick: MenuProps['onClick'] = (e) => {
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

const App: React.FC = () => (
  <Flex align="flex-start" gap="small" vertical>
    <Button type="primary">primary</Button>
    <Button>secondary</Button>
    <Space.Compact>
      <Button>Actions</Button>
      <Dropdown menu={{ items, onClick: onMenuClick }} placement="bottomRight">
        <Button icon={<EllipsisOutlined />} />
      </Dropdown>
    </Space.Compact>
  </Flex>
);

export default App;
```

### Ghost Button

The `ghost` property will make a button's background transparent, this is commonly used in colored background.

```tsx
import React from 'react';
import { Button, Flex } from 'antd';

const App: React.FC = () => (
  <Flex wrap gap="small" className="site-button-ghost-wrapper">
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
  </Flex>
);

export default App;
```

### Danger Buttons

The `danger` is a property of buttons after antd 4.0.

```tsx
import React from 'react';
import { Button, Flex } from 'antd';

const App: React.FC = () => (
  <Flex wrap gap="small">
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
  </Flex>
);

export default App;
```

### Block Button

The `block` property will make a button fit to its parent width.

```tsx
import React from 'react';
import { Button, Flex } from 'antd';

const App: React.FC = () => (
  <Flex vertical gap="small" style={{ width: '100%' }}>
    <Button type="primary" block>
      Primary
    </Button>
    <Button block>Default</Button>
    <Button type="dashed" block>
      Dashed
    </Button>
    <Button disabled block>
      disabled
    </Button>
    <Button type="text" block>
      text
    </Button>
    <Button type="link" block>
      Link
    </Button>
  </Flex>
);

export default App;
```




### Gradient Button

Buttons with a gradient background.

```tsx
import React from 'react';
import { AntDesignOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Space } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: -1px;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `,
}));

const App: React.FC = () => {
  const { styles } = useStyle();

  return (
    <ConfigProvider
      button={{
        className: styles.linearGradientButton,
      }}
    >
      <Space>
        <Button type="primary" size="large" icon={<AntDesignOutlined />}>
          Gradient Button
        </Button>
        <Button size="large">Button</Button>
      </Space>
    </ConfigProvider>
  );
};

export default App;
```

### Custom Wave

Wave effect brings dynamic. You can also use HappyProvider from [`@ant-design/happy-work-theme`](https://github.com/ant-design/happy-work-theme) to implement dynamic wave effect.

```tsx
import React from 'react';
import { HappyProvider } from '@ant-design/happy-work-theme';
import { Button, ConfigProvider, Flex } from 'antd';
import type { ConfigProviderProps, GetProp } from 'antd';

type WaveConfig = GetProp<ConfigProviderProps, 'wave'>;

// Prepare effect holder
const createHolder = (node: HTMLElement) => {
  const { borderWidth } = getComputedStyle(node);
  const borderWidthNum = Number.parseInt(borderWidth, 10);

  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.inset = `-${borderWidthNum}px`;
  div.style.borderRadius = 'inherit';
  div.style.background = 'transparent';
  div.style.zIndex = '999';
  div.style.pointerEvents = 'none';
  div.style.overflow = 'hidden';
  node.appendChild(div);

  return div;
};

const createDot = (holder: HTMLElement, color: string, left: number, top: number, size = 0) => {
  const dot = document.createElement('div');
  dot.style.position = 'absolute';
  dot.style.left = `${left}px`;
  dot.style.top = `${top}px`;
  dot.style.width = `${size}px`;
  dot.style.height = `${size}px`;
  dot.style.borderRadius = '50%';
  dot.style.background = color;
  dot.style.transform = 'translate3d(-50%, -50%, 0)';
  dot.style.transition = 'all 1s ease-out';
  holder.appendChild(dot);
  return dot;
};

// Inset Effect
const showInsetEffect: WaveConfig['showEffect'] = (node, { event, component }) => {
  if (component !== 'Button') {
    return;
  }

  const holder = createHolder(node);

  const rect = holder.getBoundingClientRect();

  const left = event.clientX - rect.left;
  const top = event.clientY - rect.top;

  const dot = createDot(holder, 'rgba(255, 255, 255, 0.65)', left, top);

  // Motion
  requestAnimationFrame(() => {
    dot.ontransitionend = () => {
      holder.remove();
    };

    dot.style.width = '200px';
    dot.style.height = '200px';
    dot.style.opacity = '0';
  });
};

// Shake Effect
const showShakeEffect: WaveConfig['showEffect'] = (node, { component }) => {
  if (component !== 'Button') {
    return;
  }

  const seq = [0, -15, 15, -5, 5, 0];
  const itv = 10;

  let steps = 0;

  const loop = () => {
    cancelAnimationFrame((node as any).effectTimeout);

    (node as any).effectTimeout = requestAnimationFrame(() => {
      const currentStep = Math.floor(steps / itv);
      const current = seq[currentStep];
      const next = seq[currentStep + 1];

      if (next === undefined || next === null) {
        node.style.transform = '';
        node.style.transition = '';
        return;
      }

      // Trans from current to next by itv
      const angle = current + ((next - current) / itv) * (steps % itv);

      node.style.transform = `rotate(${angle}deg)`;
      node.style.transition = 'none';

      steps += 1;
      loop();
    });
  };

  loop();
};

// Component
const Wrapper: React.FC<WaveConfig & { name: string }> = ({ name, ...wave }) => (
  <ConfigProvider wave={wave}>
    <Button type="primary">{name}</Button>
  </ConfigProvider>
);

const Demo: React.FC = () => (
  <Flex gap="large" wrap>
    <Wrapper name="Disabled" disabled />
    <Wrapper name="Default" />
    <Wrapper name="Inset" showEffect={showInsetEffect} />
    <Wrapper name="Shake" showEffect={showShakeEffect} />
    <HappyProvider>
      <Button type="primary">Happy Work</Button>
    </HappyProvider>
  </Flex>
);

export default Demo;
```

### Custom disabled backgroundColor

Customize the background color with disable (applicable to type `default` and `dashed`)

```tsx
import React from 'react';
import { Button, ConfigProvider, Flex } from 'antd';

const App: React.FC = () => (
  <Flex gap="small" wrap>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultBgDisabled: 'rgba(0,0,0,0.1)',
            dashedBgDisabled: 'rgba(0,0,0,0.4)',
          },
        },
      }}
    >
      <Button type="primary" disabled>
        Primary Button
      </Button>
      <Button disabled>Default Button</Button>
      <Button type="dashed" disabled>
        Dashed Button
      </Button>
    </ConfigProvider>
  </Flex>
);

export default App;
```

### Custom semantic dom styling

You can customize the [semantic dom](#semantic-dom) style of Button by passing objects/functions through `classNames` and `styles`.

```tsx
import React from 'react';
import { Button, Flex } from 'antd';
import type { ButtonProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  root: {
    border: `1px solid ${token.colorBorder}`,
    borderRadius: token.borderRadius,
    padding: `${token.paddingXS}px ${token.padding}px`,
    height: 'auto',
  },
  content: {
    color: token.colorText,
  },
}));

const stylesObject: ButtonProps['styles'] = {
  root: {
    boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
  },
};

const stylesFn: ButtonProps['styles'] = (info) => {
  if (info.props.type === 'primary') {
    return {
      root: {
        backgroundColor: '#171717',
      },
      content: {
        color: '#fff',
      },
    } satisfies ButtonProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const { styles: classNames } = useStyles();
  return (
    <Flex gap="small">
      <Button type="default" classNames={classNames} styles={stylesObject}>
        Object
      </Button>
      <Button type="primary" classNames={classNames} styles={stylesFn}>
        Function
      </Button>
    </Flex>
  );
};

export default App;
```


## API

Common props ref：[Common props](/docs/react/common-props)

Different button styles generated by setting Button properties. The recommended order is: `type` -> `shape` -> `size` -> `loading` -> `disabled`.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| autoInsertSpace | We add a space between two Chinese characters by default, which removed by setting `autoInsertSpace` to `false`. | boolean | `true` | 5.17.0 |
| block | Option to fit button width to its parent width | boolean | false |  |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| color | Set button color | `default` \| `primary` \| `danger` \| [PresetColors](#presetcolors) | - | `default`, `primary` and `danger`: 5.21.0, `PresetColors`: 5.23.0 |
| danger | Syntactic sugar. Set the danger status of button. will follow `color` if provided | boolean | false |  |
| disabled | Disabled state of button | boolean | false |  |
| ghost | Make background transparent and invert text and border colors | boolean | false |  |
| href | Redirect url of link button | string | - |  |
| htmlType | Set the original html `type` of `button`, see: [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#type) | `submit` \| `reset` \| `button` | `button` |  |
| icon | Set the icon component of button | ReactNode | - |  |
| ~~iconPosition~~ | Set the icon position of button, please use `iconPlacement` instead | `start` \| `end` | `start` | 5.17.0 |
| iconPlacement | Set the icon position of button | `start` \| `end` | `start` | - |
| loading | Set the loading status of button | boolean \| { delay: number, icon: ReactNode } | false | icon: 5.23.0 |
| shape | Can be used to set button shape | `default` \| `circle` \| `round` | `default` |  |
| size | Set the size of button | `large` \| `middle` \| `small` | `middle` |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| target | Same as target attribute of a, works when href is specified | string | - |  |
| type | Syntactic sugar. Set button type. Will follow `variant` & `color` if provided | `primary` \| `dashed` \| `link` \| `text` \| `default` | `default` |  |
| onClick | Set the handler to handle `click` event | (event: React.MouseEvent<HTMLElement, MouseEvent>) => void | - |  |
| variant | Set button variant | `outlined` \| `dashed` \| `solid` \| `filled` \| `text` \| `link` | - | 5.21.0 |

It accepts all props which native buttons support.

### PresetColors

> type PresetColors = 'blue' | 'purple' | 'cyan' | 'green' | 'magenta' | 'pink' | 'red' | 'orange' | 'yellow' | 'volcano' | 'geekblue' | 'lime' | 'gold';

## Semantic DOM

https://ant.design/components/button/semantic.md

## Design Token



## Component Token (Button)
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| contentFontSize | Font size of button content | number | 14 |
| contentFontSizeLG | Font size of large button content | number | 16 |
| contentFontSizeSM | Font size of small button content | number | 14 |
| dangerColor | Text color of danger button | string | #fff |
| dangerShadow | Shadow of danger button | string | 0 2px 0 rgba(255,38,5,0.06) |
| dashedBgDisabled |  | string | rgba(0,0,0,0.04) |
| defaultActiveBg | Background color of default button when active | string | #ffffff |
| defaultActiveBorderColor | Border color of default button when active | string | #0958d9 |
| defaultActiveColor | Text color of default button when active | string | #0958d9 |
| defaultBg | Background color of default button | string | #ffffff |
| defaultBgDisabled |  | string | rgba(0,0,0,0.04) |
| defaultBorderColor | Border color of default button | string | #d9d9d9 |
| defaultColor | Text color of default button | string | rgba(0,0,0,0.88) |
| defaultGhostBorderColor | Border color of default ghost button | string | #ffffff |
| defaultGhostColor | Text color of default ghost button | string | #ffffff |
| defaultHoverBg | Background color of default button when hover | string | #ffffff |
| defaultHoverBorderColor | Border color of default button | string | #4096ff |
| defaultHoverColor | Text color of default button when hover | string | #4096ff |
| defaultShadow | Shadow of default button | string | 0 2px 0 rgba(0,0,0,0.02) |
| fontWeight | Font weight of text | FontWeight \| undefined | 400 |
| ghostBg | Background color of ghost button | string | transparent |
| iconGap | Gap between icon and text | Gap<string \| number> \| undefined | 8 |
| linkHoverBg | Background color of link button when hover | string | transparent |
| onlyIconSize | Icon size of button which only contains icon | string \| number | inherit |
| onlyIconSizeLG | Icon size of large button which only contains icon | string \| number | inherit |
| onlyIconSizeSM | Icon size of small button which only contains icon | string \| number | inherit |
| paddingInline | Horizontal padding of button | PaddingInline<string \| number> \| undefined | 15 |
| paddingInlineLG | Horizontal padding of large button | PaddingInline<string \| number> \| undefined | 15 |
| paddingInlineSM | Horizontal padding of small button | PaddingInline<string \| number> \| undefined | 7 |
| primaryColor | Text color of primary button | string | #fff |
| primaryShadow | Shadow of primary button | string | 0 2px 0 rgba(5,145,255,0.1) |
| solidTextColor | Default text color for solid buttons. | string | #fff |
| textHoverBg | Background color of text button when hover | string | rgba(0,0,0,0.04) |
| textTextActiveColor | Default text color for text buttons on active | string | rgba(0,0,0,0.88) |
| textTextColor | Default text color for text buttons | string | rgba(0,0,0,0.88) |
| textTextHoverColor | Default text color for text buttons on hover | string | rgba(0,0,0,0.88) |

## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| borderRadius | Border radius of base components | number |  |
| borderRadiusLG | LG size border radius, used in some large border radius components, such as Card, Modal and other components. | number |  |
| borderRadiusSM | SM size border radius, used in small size components, such as Button, Input, Select and other input components in small size | number |  |
| colorBgContainer | Container background color, e.g: default button, input box, etc. Be sure not to confuse this with `colorBgElevated`. | string |  |
| colorBgContainerDisabled | Control the background color of container in disabled state. | string |  |
| colorBgSolid | Solid background color, currently only used for the default solid button background color. | string |  |
| colorBgSolidActive | Solid background color active state, currently only used in the active effect of the default solid button. | string |  |
| colorBgSolidHover | Solid background color hover state, currently only used in the hover effect of the default solid button. | string |  |
| colorError | Used to represent the visual elements of the operation failure, such as the error Button, error Result component, etc. | string |  |
| colorErrorActive | The active state of the error color. | string |  |
| colorErrorBg | The background color of the error state. | string |  |
| colorErrorBgActive | The active state background color of the error state. | string |  |
| colorErrorBgFilledHover | The wrong color fills the background color of the suspension state, which is currently only used in the hover effect of the dangerous filled button. | string |  |
| colorErrorHover | The hover state of the error color. | string |  |
| colorFill | The darkest fill color is used to distinguish between the second and third level of fill color, and is currently only used in the hover effect of Slider. | string |  |
| colorFillSecondary | The second level of fill color can outline the shape of the element more clearly, such as Rate, Skeleton, etc. It can also be used as the Hover state of the third level of fill color, such as Table, etc. | string |  |
| colorFillTertiary | The third level of fill color is used to outline the shape of the element, such as Slider, Segmented, etc. If there is no emphasis requirement, it is recommended to use the third level of fill color as the default fill color. | string |  |
| colorLink | Control the color of hyperlink. | string |  |
| colorLinkActive | Control the color of hyperlink when clicked. | string |  |
| colorLinkHover | Control the color of hyperlink when hovering. | string |  |
| colorPrimary | Brand color is one of the most direct visual elements to reflect the characteristics and communication of the product. After you have selected the brand color, we will automatically generate a complete color palette and assign it effective design semantics. | string |  |
| colorPrimaryActive | Dark active state under the main color gradient. | string |  |
| colorPrimaryBg | Light background color of primary color, usually used for weak visual level selection state. | string |  |
| colorPrimaryBgHover | The hover state color corresponding to the light background color of the primary color. | string |  |
| colorPrimaryBorder | The stroke color under the main color gradient, used on the stroke of components such as Slider. | string |  |
| colorPrimaryHover | Hover state under the main color gradient. | string |  |
| colorTextDisabled | Control the color of text in disabled state. | string |  |
| colorTextLightSolid | Control the highlight color of text with background color, such as the text in Primary Button components. | string |  |
| controlHeight | The height of the basic controls such as buttons and input boxes in Ant Design | number |  |
| controlHeightLG | LG component height | number |  |
| controlHeightSM | SM component height | number |  |
| fontSize | The most widely used font size in the design system, from which the text gradient will be derived. | number |  |
| lineWidth | Border width of base components | number |  |
| lineWidthFocus | Control the width of the line when the component is in focus state. | number |  |
| motionDurationMid | Motion speed, medium speed. Used for medium element animation interaction. | string |  |
| motionDurationSlow | Motion speed, slow speed. Used for large element animation interaction. | string |  |
| motionEaseInOut | Preset motion curve. | string |  |
| opacityLoading | Control the opacity of the loading state. | number |  |
| paddingXS | Control the extra small padding of the element. | number |  |



## FAQ

### How to choose type and color & variant? {#faq-type-color-variant}

Type is essentially syntactic sugar for colors and variants. It internally provides a set of mapping relationships between colors and variants for the type. If both exist at the same time, the colors and variants will be used first.

```jsx
<Button type="primary">click</Button>
```

Equivalent

```jsx
<Button color="primary" variant="solid">
  click
</Button>
```

### How to close the click wave effect? {#faq-close-wave-effect}

If you don't need this feature, you can set `disabled` of `wave` in [ConfigProvider](/components/config-provider#api) as `true`.

```jsx
<ConfigProvider wave={{ disabled: true }}>
  <Button>click</Button>
</ConfigProvider>
```

<style>
.site-button-ghost-wrapper {
  padding: 16px;
  background: rgb(190, 200, 200);
}
</style>
