---
category: Components
title: Button
subtitle: 按钮
description: 按钮用于开始一个即时操作。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*7va7RKs3YzIAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*3T4cRqxH9-8AAAAAAAAAAAAADrJ8AQ/original
designUrl: /docs/spec/buttons-cn
demo:
  cols: 2
group:
  title: 通用
  order: 1
---

## 何时使用 {#when-to-use}

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

在 Ant Design 中我们提供了五种按钮。

- 🔵 主按钮：用于主行动点，一个操作区域只能有一个主按钮。
- ⚪️ 默认按钮：用于没有主次之分的一组行动点。
- 😶 虚线按钮：常用于添加操作。
- 🔤 文本按钮：用于最次级的行动点。
- 🔗 链接按钮：一般用于链接，即导航至某位置。

以及四种状态属性与上面配合使用。

- ⚠️ 危险：删除/移动/修改权限等危险操作，一般需要二次确认。
- 👻 幽灵：用于背景色比较复杂的地方，常用在首页/产品页等展示场景。
- 🚫 禁用：行动点不可用的时候，一般需要文案解释。
- 🔃 加载中：用于异步操作等待反馈的时候，也可以避免多次提交。

## 代码演示 {#examples}

### 语法糖

通过 `type` 语法糖，使用预设的按钮样式：主按钮、次按钮、虚线按钮、文本按钮和链接按钮。推荐主按钮在同一个操作区域最多出现一次。

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

### 颜色与变体

同时设置 `color` 和 `variant` 属性，可以衍生出更多的变体按钮。

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


### 按钮图标

可以通过 `icon`属性添加图标。

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

### 按钮图标位置

通过设置 `iconPlacement` 为 `start` 或 `end` 分别设置按钮图标的位置。

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



### 按钮尺寸

按钮有大、中、小三种尺寸。

通过设置 `size` 为 `large` `small` 分别把按钮设为大、小尺寸。若不设置 `size`，则尺寸默认为中。

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

### 不可用状态

添加 `disabled` 属性即可让按钮处于不可用状态，同时按钮样式也会改变。

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

### 加载中状态

添加 `loading` 属性即可让按钮处于加载状态，`loading.icon` 可以自定义加载图标，最后三个按钮演示点击后进入加载状态。

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

### 多个按钮组合

按钮组合使用时，推荐使用 1 个主操作 + n 个次操作，3 个以上操作时把更多操作放到 [Dropdown](/components/dropdown-cn/#dropdown-demo-dropdown-button) 中组合使用。

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

### 幽灵按钮

幽灵按钮将按钮的内容反色，背景变为透明，常用在有色背景上。

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

### 危险按钮

在 4.0 之后，危险成为一种按钮属性而不是按钮类型。

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

### Block 按钮

`block` 属性将使按钮适合其父宽度。

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




### 渐变按钮

自定义为渐变背景按钮。

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

### 自定义按钮波纹

波纹效果带来了灵动性，你也可以使用 [`@ant-design/happy-work-theme`](https://github.com/ant-design/happy-work-theme) 提供的 HappyProvider 实现动态波纹效果。

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

### 移除两个汉字之间的空格

我们默认在两个汉字之间添加空格，可以通过设置 `autoInsertSpace` 为 `false` 关闭。

```tsx
import React from 'react';
import { Button, Flex } from 'antd';

const App: React.FC = () => (
  <Flex gap="small" wrap>
    <Button type="primary" autoInsertSpace={false}>
      确定
    </Button>
    <Button type="primary" autoInsertSpace>
      确定
    </Button>
  </Flex>
);

export default App;
```

### 自定义禁用样式背景

自定义disable下的背景颜色(适用 `default` 和 `dashed` 类型)

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

### 自定义语义结构的样式和类

通过 `classNames` 和 `styles` 传入对象/函数可以自定义 Button 的[语义化结构](#semantic-dom)样式。

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

通用属性参考：[通用属性](/docs/react/common-props)

通过设置 Button 的属性来产生不同的按钮样式，推荐顺序为：`type` -> `shape` -> `size` -> `loading` -> `disabled`。

按钮的属性说明如下：

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| autoInsertSpace | 我们默认提供两个汉字之间的空格，可以设置 `autoInsertSpace` 为 `false` 关闭 | boolean | `true` | 5.17.0 |
| block | 将按钮宽度调整为其父宽度的选项 | boolean | false |  |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| color | 设置按钮的颜色 | `default` \| `primary` \| `danger` \| [PresetColors](#presetcolors) | - | `default`、`primary` 和 `danger`: 5.21.0, `PresetColors`: 5.23.0 |
| danger | 语法糖，设置危险按钮。当设置 `color` 时会以后者为准 | boolean | false |  |
| disabled | 设置按钮失效状态 | boolean | false |  |
| ghost | 幽灵属性，使按钮背景透明 | boolean | false |  |
| href | 点击跳转的地址，指定此属性 button 的行为和 a 链接一致 | string | - |  |
| htmlType | 设置 `button` 原生的 `type` 值，可选值请参考 [HTML 标准](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/button#type) | `submit` \| `reset` \| `button` | `button` |  |
| icon | 设置按钮的图标组件 | ReactNode | - |  |
| ~~iconPosition~~ | 设置按钮图标组件的位置,请使用 `iconPlacement` 替换 | `start` \| `end` | `start` | 5.17.0 |
| iconPlacement | 设置按钮图标组件的位置 | `start` \| `end` | `start` | - |
| loading | 设置按钮载入状态 | boolean \| { delay: number, icon: ReactNode } | false | icon: 5.23.0 |
| shape | 设置按钮形状 | `default` \| `circle` \| `round` | `default` |  |
| size | 设置按钮大小 | `large` \| `middle` \| `small` | `middle` |  |
| styles | 用于自定义组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| target | 相当于 a 链接的 target 属性，href 存在时生效 | string | - |  |
| type | 语法糖，设置按钮类型。当设置 `variant` 与 `color` 时以后者为准 | `primary` \| `dashed` \| `link` \| `text` \| `default` | `default` |  |
| onClick | 点击按钮时的回调 | (event: React.MouseEvent<HTMLElement, MouseEvent>) => void | - |  |
| variant | 设置按钮的变体 | `outlined` \| `dashed` \| `solid` \| `filled` \| `text` \| `link` | - | 5.21.0 |

支持原生 button 的其他所有属性。

### PresetColors

> type PresetColors = 'blue' | 'purple' | 'cyan' | 'green' | 'magenta' | 'pink' | 'red' | 'orange' | 'yellow' | 'volcano' | 'geekblue' | 'lime' | 'gold';

## Semantic DOM

https://ant.design/components/button-cn/semantic.md

## 主题变量（Design Token）{#design-token}



## 组件 Token (Button)
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| contentFontSize | 按钮内容字体大小 | number | 14 |
| contentFontSizeLG | 大号按钮内容字体大小 | number | 16 |
| contentFontSizeSM | 小号按钮内容字体大小 | number | 14 |
| dangerColor | 危险按钮文本颜色 | string | #fff |
| dangerShadow | 危险按钮阴影 | string | 0 2px 0 rgba(255,38,5,0.06) |
| dashedBgDisabled | type='dashed' 禁用状态下的背景颜色 | string | rgba(0,0,0,0.04) |
| defaultActiveBg | 默认按钮激活态背景色 | string | #ffffff |
| defaultActiveBorderColor | 默认按钮激活态边框颜色 | string | #0958d9 |
| defaultActiveColor | 默认按钮激活态文字颜色 | string | #0958d9 |
| defaultBg | 默认按钮背景色 | string | #ffffff |
| defaultBgDisabled | type='default' 禁用状态下的背景颜色 | string | rgba(0,0,0,0.04) |
| defaultBorderColor | 默认按钮边框颜色 | string | #d9d9d9 |
| defaultColor | 默认按钮文本颜色 | string | rgba(0,0,0,0.88) |
| defaultGhostBorderColor | 默认幽灵按钮边框颜色 | string | #ffffff |
| defaultGhostColor | 默认幽灵按钮文本颜色 | string | #ffffff |
| defaultHoverBg | 默认按钮悬浮态背景色 | string | #ffffff |
| defaultHoverBorderColor | 默认按钮悬浮态边框颜色 | string | #4096ff |
| defaultHoverColor | 默认按钮悬浮态文本颜色 | string | #4096ff |
| defaultShadow | 默认按钮阴影 | string | 0 2px 0 rgba(0,0,0,0.02) |
| fontWeight | 文字字重 | FontWeight \| undefined | 400 |
| ghostBg | 幽灵按钮背景色 | string | transparent |
| iconGap | 图标文字间距 | Gap<string \| number> \| undefined | 8 |
| linkHoverBg | 链接按钮悬浮态背景色 | string | transparent |
| onlyIconSize | 只有图标的按钮图标尺寸 | string \| number | inherit |
| onlyIconSizeLG | 大号只有图标的按钮图标尺寸 | string \| number | inherit |
| onlyIconSizeSM | 小号只有图标的按钮图标尺寸 | string \| number | inherit |
| paddingInline | 按钮横向内间距 | PaddingInline<string \| number> \| undefined | 15 |
| paddingInlineLG | 大号按钮横向内间距 | PaddingInline<string \| number> \| undefined | 15 |
| paddingInlineSM | 小号按钮横向内间距 | PaddingInline<string \| number> \| undefined | 7 |
| primaryColor | 主要按钮文本颜色 | string | #fff |
| primaryShadow | 主要按钮阴影 | string | 0 2px 0 rgba(5,145,255,0.1) |
| solidTextColor | 默认实心按钮的文本色 | string | #fff |
| textHoverBg | 文本按钮悬浮态背景色 | string | rgba(0,0,0,0.04) |
| textTextActiveColor | 默认文本按钮激活态文字颜色 | string | rgba(0,0,0,0.88) |
| textTextColor | 默认文本按钮的文本色 | string | rgba(0,0,0,0.88) |
| textTextHoverColor | 默认文本按钮悬浮态文本颜色 | string | rgba(0,0,0,0.88) |

## 全局 Token
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| borderRadius | 基础组件的圆角大小，例如按钮、输入框、卡片等 | number |  |
| borderRadiusLG | LG号圆角，用于组件中的一些大圆角，如 Card、Modal 等一些组件样式。 | number |  |
| borderRadiusSM | SM号圆角，用于组件小尺寸下的圆角，如 Button、Input、Select 等输入类控件在 small size 下的圆角 | number |  |
| colorBgContainer | 组件的容器背景色，例如：默认按钮、输入框等。务必不要将其与 `colorBgElevated` 混淆。 | string |  |
| colorBgContainerDisabled | 控制容器在禁用状态下的背景色。 | string |  |
| colorBgSolid | 实心的背景颜色，目前只用在默认实心按钮背景色上。 | string |  |
| colorBgSolidActive | 实心的背景颜色激活态，目前只用在默认实心按钮的 active 效果。 | string |  |
| colorBgSolidHover | 实心的背景颜色悬浮态，目前只用在默认实心按钮的 hover 效果。 | string |  |
| colorError | 用于表示操作失败的 Token 序列，如失败按钮、错误状态提示（Result）组件等。 | string |  |
| colorErrorActive | 错误色的深色激活态 | string |  |
| colorErrorBg | 错误色的浅色背景颜色 | string |  |
| colorErrorBgActive | 错误色的浅色背景色激活态 | string |  |
| colorErrorBgFilledHover | 错误色的浅色填充背景色悬浮态，目前只用在危险填充按钮的 hover 效果。 | string |  |
| colorErrorHover | 错误色的深色悬浮态 | string |  |
| colorFill | 最深的填充色，用于拉开与二、三级填充色的区分度，目前只用在 Slider 的 hover 效果。 | string |  |
| colorFillSecondary | 二级填充色可以较为明显地勾勒出元素形体，如 Rate、Skeleton 等。也可以作为三级填充色的 Hover 状态，如 Table 等。 | string |  |
| colorFillTertiary | 三级填充色用于勾勒出元素形体的场景，如 Slider、Segmented 等。如无强调需求的情况下，建议使用三级填色作为默认填色。 | string |  |
| colorLink | 控制超链接的颜色。 | string |  |
| colorLinkActive | 控制超链接被点击时的颜色。 | string |  |
| colorLinkHover | 控制超链接悬浮时的颜色。 | string |  |
| colorPrimary | 品牌色是体现产品特性和传播理念最直观的视觉元素之一。在你完成品牌主色的选取之后，我们会自动帮你生成一套完整的色板，并赋予它们有效的设计语义 | string |  |
| colorPrimaryActive | 主色梯度下的深色激活态。 | string |  |
| colorPrimaryBg | 主色浅色背景颜色，一般用于视觉层级较弱的选中状态。 | string |  |
| colorPrimaryBgHover | 与主色浅色背景颜色相对应的悬浮态颜色。 | string |  |
| colorPrimaryBorder | 主色梯度下的描边用色，用在 Slider 等组件的描边上。 | string |  |
| colorPrimaryHover | 主色梯度下的悬浮态。 | string |  |
| colorTextDisabled | 控制禁用状态下的字体颜色。 | string |  |
| colorTextLightSolid | 控制带背景色的文本，例如 Primary Button 组件中的文本高亮颜色。 | string |  |
| controlHeight | Ant Design 中按钮和输入框等基础控件的高度 | number |  |
| controlHeightLG | 较高的组件高度 | number |  |
| controlHeightSM | 较小的组件高度 | number |  |
| fontSize | 设计系统中使用最广泛的字体大小，文本梯度也将基于该字号进行派生。 | number |  |
| lineWidth | 用于控制组件边框、分割线等的宽度 | number |  |
| lineWidthFocus | 控制线条的宽度，当组件处于聚焦态时。 | number |  |
| motionDurationMid | 动效播放速度，中速。用于中型元素动画交互 | string |  |
| motionDurationSlow | 动效播放速度，慢速。用于大型元素如面板动画交互 | string |  |
| motionEaseInOut | 预设动效曲率 | string |  |
| opacityLoading | 控制加载状态的透明度。 | number |  |
| paddingXS | 控制元素的特小内间距。 | number |  |



## FAQ

### 类型和颜色与变体如何选择？ {#faq-type-color-variant}

类型本质上是颜色与变体的语法糖，内部为其提供了一组颜色与变体的映射关系。如果两者同时存在，优先使用颜色与变体。

```jsx
<Button type="primary">click</Button>
```

等同于

```jsx
<Button color="primary" variant="solid">
  click
</Button>
```

### 如何关闭点击波纹效果？ {#faq-close-wave-effect}

如果你不需要这个特性，可以设置 [ConfigProvider](/components/config-provider-cn#api) 的 `wave` 的 `disabled` 为 `true`。

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

## 设计指引 {#design-guide}

- [我的按钮究竟该放哪儿！？| Ant Design 4.0 系列分享](https://zhuanlan.zhihu.com/p/109644406)
