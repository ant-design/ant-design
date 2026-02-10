---
category: Components
title: Alert
subtitle: 警告提示
description: 警告提示，展现需要关注的信息。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*QsvtS41m45UAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*gOTISoMFZV0AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
group:
  title: 反馈
  order: 6
---

## 何时使用 {#when-to-use}

- 当某个页面需要向用户显示警告的信息时。
- 非浮层的静态展现形式，始终展现，不会自动消失，用户可以点击关闭。

## 代码演示 {#examples}

### 基本

最简单的用法，适用于简短的警告提示。

```tsx
import React from 'react';
import { Alert } from 'antd';

const App: React.FC = () => <Alert title="Success Text" type="success" />;

export default App;
```

### 四种样式

共有四种样式 `success`、`info`、`warning`、`error`。

```tsx
import React from 'react';
import { Alert } from 'antd';

const App: React.FC = () => (
  <>
    <Alert title="Success Text" type="success" />
    <br />
    <Alert title="Info Text" type="info" />
    <br />
    <Alert title="Warning Text" type="warning" />
    <br />
    <Alert title="Error Text" type="error" />
  </>
);

export default App;
```

### 可关闭的警告提示

显示关闭按钮，点击可关闭警告提示。

```tsx
import React from 'react';
import { Alert } from 'antd';

const onClose: React.MouseEventHandler<HTMLButtonElement> = (e) => {
  console.log(e, 'I was closed.');
};

const App: React.FC = () => (
  <>
    <Alert
      title="Warning Title"
      type="warning"
      closable={{ closeIcon: true, onClose, 'aria-label': 'close' }}
    />
    <br />
    <Alert
      title="Success Title"
      type="success"
      closable={{ closeIcon: true, onClose, 'aria-label': 'close' }}
    />
    <br />
    <Alert
      title="Info Title"
      type="info"
      closable={{ closeIcon: true, onClose, 'aria-label': 'close' }}
    />
    <br />
    <Alert
      title="Error Title"
      type="error"
      closable={{ closeIcon: true, onClose, 'aria-label': 'close' }}
    />
  </>
);

export default App;
```

### 含有辅助性文字介绍

含有辅助性文字介绍的警告提示。

```tsx
import React from 'react';
import { Alert } from 'antd';

const App: React.FC = () => (
  <>
    <Alert
      title="Success Text"
      description="Success Description Success Description Success Description"
      type="success"
    />
    <br />
    <Alert
      title="Info Text"
      description="Info Description Info Description Info Description Info Description"
      type="info"
    />
    <br />
    <Alert
      title="Warning Text"
      description="Warning Description Warning Description Warning Description Warning Description"
      type="warning"
    />
    <br />
    <Alert
      title="Error Text"
      description="Error Description Error Description Error Description Error Description"
      type="error"
    />
  </>
);

export default App;
```

### 图标

可口的图标让信息类型更加醒目。

```tsx
import React from 'react';
import { Alert } from 'antd';

const App: React.FC = () => (
  <>
    <Alert title="Success Tips" type="success" showIcon />
    <br />
    <Alert title="Informational Notes" type="info" showIcon />
    <br />
    <Alert title="Warning" type="warning" showIcon closable />
    <br />
    <Alert title="Error" type="error" showIcon />
    <br />
    <Alert
      title="Success Tips"
      description="Detailed description and advice about successful copywriting."
      type="success"
      showIcon
    />
    <br />
    <Alert
      title="Informational Notes"
      description="Additional description and information about copywriting."
      type="info"
      showIcon
    />
    <br />
    <Alert
      title="Warning"
      description="This is a warning notice about copywriting."
      type="warning"
      showIcon
      closable
    />
    <br />
    <Alert
      title="Error"
      description="This is an error message about copywriting."
      type="error"
      showIcon
    />
  </>
);

export default App;
```

### 顶部公告

页面顶部通告形式，默认有图标且 `type` 为 'warning'。

```tsx
import React from 'react';
import { Alert } from 'antd';

const App: React.FC = () => (
  <>
    <Alert title="Warning text" banner />
    <br />
    <Alert
      title="Very long warning text warning text text text text text text text"
      banner
      closable
    />
    <br />
    <Alert showIcon={false} title="Warning text without icon" banner />
    <br />
    <Alert type="error" title="Error text" banner />
  </>
);

export default App;
```

### 轮播的公告

配合 [react-text-loop-next](https://npmjs.com/package/react-text-loop-next) 或 [react-fast-marquee](https://npmjs.com/package/react-fast-marquee) 实现消息轮播通知栏。

```tsx
import React from 'react';
import { Alert } from 'antd';
import Marquee from 'react-fast-marquee';

const App: React.FC = () => (
  <Alert
    banner
    title={
      <Marquee pauseOnHover gradient={false}>
        I can be a React component, multiple React components, or just some text.
      </Marquee>
    }
  />
);

export default App;
```

### 平滑地卸载

平滑、自然的卸载提示。

```tsx
import React, { useState } from 'react';
import { Alert, Switch } from 'antd';

const App: React.FC = () => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      {visible && (
        <Alert
          title="Alert Message Text"
          type="success"
          closable={{ closeIcon: true, afterClose: handleClose }}
        />
      )}
      <p>click the close button to see the effect</p>
      <Switch onChange={setVisible} checked={visible} disabled={visible} />
    </>
  );
};

export default App;
```

### React 错误处理

友好的 [React 错误处理](https://zh-hans.react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary) 包裹组件。

```tsx
import React, { useState } from 'react';
import { Alert, Button } from 'antd';

const { ErrorBoundary } = Alert;

const ThrowError: React.FC = () => {
  const [error, setError] = useState<Error>();
  const onClick = () => {
    setError(new Error('An Uncaught Error'));
  };

  if (error) {
    throw error;
  }
  return (
    <Button danger onClick={onClick}>
      Click me to throw a error
    </Button>
  );
};

const App: React.FC = () => (
  <ErrorBoundary>
    <ThrowError />
  </ErrorBoundary>
);

export default App;
```


### 操作

可以在右上角自定义操作项。

```tsx
import React from 'react';
import { Alert, Button, Space } from 'antd';

const App: React.FC = () => (
  <>
    <Alert
      title="Success Tips"
      type="success"
      showIcon
      action={
        <Button size="small" type="text">
          UNDO
        </Button>
      }
      closable
    />
    <br />
    <Alert
      title="Error Text"
      showIcon
      description="Error Description Error Description Error Description Error Description"
      type="error"
      action={
        <Button size="small" danger>
          Detail
        </Button>
      }
    />
    <br />
    <Alert
      title="Warning Text"
      type="warning"
      action={
        <Space>
          <Button type="text" size="small">
            Done
          </Button>
        </Space>
      }
      closable
    />
    <br />
    <Alert
      title="Info Text"
      description="Info Description Info Description Info Description Info Description"
      type="info"
      action={
        <Space vertical>
          <Button size="small" type="primary">
            Accept
          </Button>
          <Button size="small" danger ghost>
            Decline
          </Button>
        </Space>
      }
      closable
    />
  </>
);

export default App;
```


### 自定义语义结构的样式和类

通过 `classNames` 和 `styles` 传入对象/函数可以自定义 Alert 的[语义化结构](#semantic-dom)样式。

```tsx
import React from 'react';
import { Alert, Button, Flex } from 'antd';
import type { AlertProps, AlertSemanticType } from 'antd';
import { createStaticStyles } from 'antd-style';

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    border: 2px dashed #ccc;
    border-radius: 8px;
    padding: 12px;
  `,
}));

const styleFn: AlertProps['styles'] = ({ props: { type } }): AlertSemanticType['styles'] => {
  if (type === 'success') {
    return {
      root: {
        backgroundColor: 'rgba(82, 196, 26, 0.1)',
        borderColor: '#b7eb8f',
      },
      icon: {
        color: '#52c41a',
      },
    };
  }

  if (type === 'warning') {
    return {
      root: {
        backgroundColor: 'rgba(250, 173, 20, 0.1)',
        borderColor: '#ffe58f',
      },
      icon: {
        color: '#faad14',
      },
    };
  }

  return {};
};

const App: React.FC = () => {
  const alertSharedProps: AlertProps = {
    showIcon: true,
    classNames: {
      root: classNames.root,
    },
  };

  return (
    <Flex vertical gap="middle">
      <Alert
        {...alertSharedProps}
        title="Object styles"
        type="info"
        styles={{
          icon: {
            fontSize: 18,
          },
          section: {
            fontWeight: 500,
          },
        }}
        action={<Button size="small">Action</Button>}
      />
      <Alert {...alertSharedProps} title="Function styles" type="success" styles={styleFn} />
    </Flex>
  );
};

export default App;
```


## API

通用属性参考：[通用属性](/docs/react/common-props)

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| action | 自定义操作项 | ReactNode | - | 4.9.0 |
| ~~afterClose~~ | 关闭动画结束后触发的回调函数，请使用 `closable.afterClose` 替换 | () => void | - |  |
| banner | 是否用作顶部公告 | boolean | false |  |
| classNames | 自定义组件内部各语义化结构的类名。支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), string> | - |  |
| closable | 可关闭配置，>=5.15.0: 支持 `aria-*` | boolean \| [ClosableType](#closabletype) & React.AriaAttributes | `false` |  |
| description | 警告提示的辅助性文字介绍 | ReactNode | - |  |
| icon | 自定义图标，`showIcon` 为 true 时有效 | ReactNode | - |  |
| ~~message~~ | 警告提示内容，请使用 `title` 替换 | ReactNode | - |  |
| title | 警告提示内容 | ReactNode | - |  |
| showIcon | 是否显示辅助图标 | boolean | false，`banner` 模式下默认值为 true |  |
| styles | 自定义组件内部各语义化结构的内联样式。支持对象或函数 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| type | 指定警告提示的样式，有四种选择 `success`、`info`、`warning`、`error` | string | `info`，`banner` 模式下默认值为 `warning` |  |
| ~~onClose~~ | 关闭时触发的回调函数，请使用 `closable.onClose` 替换 | (e: MouseEvent) => void | - |  |

### ClosableType

| 参数       | 说明                         | 类型                    | 默认值 | 版本 |
| ---------- | ---------------------------- | ----------------------- | ------ | ---- |
| afterClose | 关闭动画结束后触发的回调函数 | function                | -      | -    |
| closeIcon  | 自定义关闭图标               | ReactNode               | -      | -    |
| onClose    | 关闭时触发的回调函数         | (e: MouseEvent) => void | -      | -    |

### Alert.ErrorBoundary

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| description | 自定义错误内容，如果未指定会展示报错堆栈 | ReactNode | {{ error stack }} |  |
| ~~message~~ | 自定义错误标题，如果未指定会展示原生报错信息，请使用 `title` 替换 | ReactNode | {{ error }} |  |
| title | 自定义错误标题，如果未指定会展示原生报错信息 | ReactNode | {{ error }} |  |

## Semantic DOM

https://ant.design/components/alert-cn/semantic.md

## Design Token



## 组件 Token (Alert)
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultPadding | 默认内间距 | Padding<string \| number> \| undefined | 8px 12px |
| withDescriptionIconSize | 带有描述时的图标尺寸 | number | 24 |
| withDescriptionPadding | 带有描述的内间距 | Padding<string \| number> \| undefined | 20px 24px |

## 全局 Token
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| borderRadiusLG | LG号圆角，用于组件中的一些大圆角，如 Card、Modal 等一些组件样式。 | number |  |
| colorError | 用于表示操作失败的 Token 序列，如失败按钮、错误状态提示（Result）组件等。 | string |  |
| colorErrorBg | 错误色的浅色背景颜色 | string |  |
| colorErrorBorder | 错误色的描边色 | string |  |
| colorIcon | 控制弱操作图标的颜色，例如 allowClear 或 Alert 关闭按钮。  * | string |  |
| colorIconHover | 控制弱操作图标在悬浮状态下的颜色，例如 allowClear 或 Alert 关闭按钮。 | string |  |
| colorInfo | 用于表示操作信息的 Token 序列，如 Alert 、Tag、 Progress 等组件都有用到该组梯度变量。 | string |  |
| colorInfoBg | 信息色的浅色背景颜色。 | string |  |
| colorInfoBorder | 信息色的描边色。 | string |  |
| colorSuccess | 用于表示操作成功的 Token 序列，如 Result、Progress 等组件会使用该组梯度变量。 | string |  |
| colorSuccessBg | 成功色的浅色背景颜色，用于 Tag 和 Alert 的成功态背景色 | string |  |
| colorSuccessBorder | 成功色的描边色，用于 Tag 和 Alert 的成功态描边色 | string |  |
| colorText | 最深的文本色。为了符合W3C标准，默认的文本颜色使用了该色，同时这个颜色也是最深的中性色。 | string |  |
| colorTextHeading | 控制标题字体颜色。 | string |  |
| colorWarning | 用于表示操作警告的 Token 序列，如 Notification、 Alert等警告类组件或 Input 输入类等组件会使用该组梯度变量。 | string |  |
| colorWarningBg | 警戒色的浅色背景颜色 | string |  |
| colorWarningBorder | 警戒色的描边色 | string |  |
| fontFamily | Ant Design 的字体家族中优先使用系统默认的界面字体，同时提供了一套利于屏显的备用字体库，来维护在不同平台以及浏览器的显示下，字体始终保持良好的易读性和可读性，体现了友好、稳定和专业的特性。 | string |  |
| fontSize | 设计系统中使用最广泛的字体大小，文本梯度也将基于该字号进行派生。 | number |  |
| fontSizeIcon | 控制选择器、级联选择器等中的操作图标字体大小。正常情况下与 fontSizeSM 相同。 | number |  |
| fontSizeLG | 大号字体大小 | number |  |
| lineHeight | 文本行高 | number |  |
| lineType | 用于控制组件边框、分割线等的样式，默认是实线 | string |  |
| lineWidth | 用于控制组件边框、分割线等的宽度 | number |  |
| marginSM | 控制元素外边距，中小尺寸。 | number |  |
| marginXS | 控制元素外边距，小尺寸。 | number |  |
| motionDurationMid | 动效播放速度，中速。用于中型元素动画交互 | string |  |
| motionDurationSlow | 动效播放速度，慢速。用于大型元素如面板动画交互 | string |  |
| motionEaseInOutCirc | 预设动效曲率 | string |  |


