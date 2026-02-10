---
category: Components
group: General
title: FloatButton
description: A button that floats at the top of the page.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*tXAoQqyr-ioAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*hSAwR7cnabwAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## When To Use

- For global functionality on the site.
- Buttons that can be seen wherever you browse.

## Examples

### Basic

The most basic usage.

```tsx
import React from 'react';
import { FloatButton } from 'antd';

const App: React.FC = () => <FloatButton onClick={() => console.log('onClick')} />;

export default App;
```

### Type

Change the type of the FloatButton with the `type` property.

```tsx
import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <>
    <FloatButton icon={<QuestionCircleOutlined />} type="primary" style={{ insetInlineEnd: 24 }} />
    <FloatButton icon={<QuestionCircleOutlined />} type="default" style={{ insetInlineEnd: 94 }} />
  </>
);

export default App;
```

### Shape

Change the shape of the FloatButton with the `shape` property.

```tsx
import React from 'react';
import { CustomerServiceOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <>
    <FloatButton
      shape="circle"
      type="primary"
      style={{ insetInlineEnd: 94 }}
      icon={<CustomerServiceOutlined />}
    />
    <FloatButton
      shape="square"
      type="primary"
      style={{ insetInlineEnd: 24 }}
      icon={<CustomerServiceOutlined />}
    />
  </>
);

export default App;
```

### Content

Setting the `content` property allows you to show a FloatButton with a description.

> supported only when `shape` is `square`. Due to narrow space for text, short sentence is recommended.

```tsx
import React from 'react';
import { FileTextOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <>
    <FloatButton
      icon={<FileTextOutlined />}
      content="HELP INFO"
      shape="square"
      style={{ insetInlineEnd: 24 }}
    />
    <FloatButton content="HELP INFO" shape="square" style={{ insetInlineEnd: 94 }} />
    <FloatButton
      icon={<FileTextOutlined />}
      content="HELP"
      shape="square"
      style={{ insetInlineEnd: 164 }}
    />
  </>
);

export default App;
```

### FloatButton with tooltip

Setting the `tooltip` property shows the FloatButton with a tooltip.

```tsx
import React from 'react';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <>
    <FloatButton
      style={{ insetBlockEnd: 108 }}
      tooltip={{
        // tooltipProps is supported starting from version 5.25.0.
        title: 'Since 5.25.0+',
        color: 'blue',
        placement: 'top',
      }}
    />
    <FloatButton tooltip={<div>Documents</div>} />
  </>
);

export default App;
```

### FloatButton Group

When multiple buttons are used together, `<FloatButton.Group />` is recommended. By setting the `shape` property of FloatButton.Group, you can change the shape of group. The `shape` of the FloatButton.Group will override the `shape` of FloatButtons inside.

```tsx
import React from 'react';
import { QuestionCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <>
    <FloatButton.Group shape="circle" style={{ insetInlineEnd: 24 }}>
      <FloatButton icon={<QuestionCircleOutlined />} />
      <FloatButton />
      <FloatButton.BackTop visibilityHeight={0} />
    </FloatButton.Group>
    <FloatButton.Group shape="square" style={{ insetInlineEnd: 94 }}>
      <FloatButton icon={<QuestionCircleOutlined />} />
      <FloatButton />
      <FloatButton icon={<SyncOutlined />} />
      <FloatButton.BackTop visibilityHeight={0} />
    </FloatButton.Group>
  </>
);

export default App;
```

### Menu mode

Open menu mode with `trigger`, which could be `hover` or `click`.

```tsx
import React from 'react';
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <>
    <FloatButton.Group
      trigger="click"
      type="primary"
      style={{ insetInlineEnd: 24 }}
      icon={<CustomerServiceOutlined />}
    >
      <FloatButton />
      <FloatButton icon={<CommentOutlined />} />
    </FloatButton.Group>
    <FloatButton.Group
      trigger="hover"
      type="primary"
      style={{ insetInlineEnd: 94 }}
      icon={<CustomerServiceOutlined />}
    >
      <FloatButton />
      <FloatButton icon={<CommentOutlined />} />
    </FloatButton.Group>
  </>
);

export default App;
```

### Controlled mode

Set the component to controlled mode through `open`, which need to be used together with `trigger`.

```tsx
import React, { useState } from 'react';
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { FloatButton, Switch } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <>
      <Switch onChange={setOpen} checked={open} style={{ margin: 16 }} />
      <FloatButton.Group
        open={open}
        trigger="click"
        style={{ insetInlineEnd: 24 }}
        icon={<CustomerServiceOutlined />}
      >
        <FloatButton />
        <FloatButton />
        <FloatButton icon={<CommentOutlined />} />
      </FloatButton.Group>
      <FloatButton.Group
        open={open}
        shape="square"
        trigger="click"
        style={{ insetInlineEnd: 88 }}
        icon={<CustomerServiceOutlined />}
      >
        <FloatButton />
        <FloatButton />
        <FloatButton icon={<CommentOutlined />} />
      </FloatButton.Group>
    </>
  );
};

export default App;
```

### placement

Customize animation placement, providing four preset placement: `top`, `right`, `bottom`, `left`, the `top` position by default.

```tsx
import React from 'react';
import {
  CommentOutlined,
  DownOutlined,
  LeftOutlined,
  RightOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { Flex, FloatButton } from 'antd';

const BOX_SIZE = 100;
const BUTTON_SIZE = 40;

const wrapperStyle: React.CSSProperties = {
  width: '100%',
  height: '100vh',
  overflow: 'hidden',
  position: 'relative',
};

const boxStyle: React.CSSProperties = {
  width: BOX_SIZE,
  height: BOX_SIZE,
  position: 'relative',
};

const insetInlineEnd: React.CSSProperties['insetInlineEnd'][] = [
  (BOX_SIZE - BUTTON_SIZE) / 2,
  -(BUTTON_SIZE / 2),
  (BOX_SIZE - BUTTON_SIZE) / 2,
  BOX_SIZE - BUTTON_SIZE / 2,
];

const bottom: React.CSSProperties['bottom'][] = [
  BOX_SIZE - BUTTON_SIZE / 2,
  (BOX_SIZE - BUTTON_SIZE) / 2,
  -BUTTON_SIZE / 2,
  (BOX_SIZE - BUTTON_SIZE) / 2,
];

const icons = [
  <UpOutlined key="up" />,
  <RightOutlined key="right" />,
  <DownOutlined key="down" />,
  <LeftOutlined key="left" />,
];

const App: React.FC = () => (
  <Flex justify="space-evenly" align="center" style={wrapperStyle}>
    <div style={boxStyle}>
      {(['top', 'right', 'bottom', 'left'] as const).map((placement, i) => {
        const style: React.CSSProperties = {
          position: 'absolute',
          insetInlineEnd: insetInlineEnd[i],
          bottom: bottom[i],
        };
        return (
          <FloatButton.Group
            key={placement}
            trigger="click"
            placement={placement}
            style={style}
            icon={icons[i]}
          >
            <FloatButton />
            <FloatButton icon={<CommentOutlined />} />
          </FloatButton.Group>
        );
      })}
    </div>
  </Flex>
);

export default App;
```

### BackTop

`BackTop` makes it easy to go back to the top of the page.

```tsx
import React from 'react';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <div style={{ height: '300vh', padding: 10 }}>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <FloatButton.BackTop />
  </div>
);

export default App;
```

### badge

FloatButton with Badge.

```tsx
import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <>
    <FloatButton shape="circle" style={{ insetInlineEnd: 24 + 70 + 70 }} badge={{ dot: true }} />
    <FloatButton.Group shape="circle" style={{ insetInlineEnd: 24 + 70 }}>
      <FloatButton
        href="https://ant.design/index-cn"
        tooltip={<div>custom badge color</div>}
        badge={{ count: 5, color: 'blue' }}
      />
      <FloatButton badge={{ count: 5 }} />
    </FloatButton.Group>
    <FloatButton.Group shape="circle">
      <FloatButton badge={{ count: 12 }} icon={<QuestionCircleOutlined />} />
      <FloatButton badge={{ count: 123, overflowCount: 999 }} />
      <FloatButton.BackTop visibilityHeight={0} />
    </FloatButton.Group>
  </>
);

export default App;
```


### Custom semantic dom styling

You can customize the [semantic dom](#semantic-dom) style of FloatButton by passing objects/functions through `classNames` and `styles`.

```tsx
import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import type { FloatButtonProps } from 'antd';
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

const stylesObject: FloatButtonProps['styles'] = {
  root: {
    boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
  },
};

const stylesFn: FloatButtonProps['styles'] = (info) => {
  if (info.props.type === 'primary') {
    return {
      root: {
        backgroundColor: '#171717',
      },
      content: {
        color: '#fff',
      },
    } satisfies FloatButtonProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const { styles: classNames } = useStyles();
  return (
    <FloatButton.Group shape="circle" style={{ insetInlineEnd: 24 + 70 }}>
      <FloatButton
        type="primary"
        classNames={classNames}
        href="https://ant.design/index-cn"
        styles={stylesFn}
        tooltip={<div>custom style class</div>}
      />
      <FloatButton
        type="default"
        classNames={classNames}
        styles={stylesObject}
        icon={<QuestionCircleOutlined />}
      />
    </FloatButton.Group>
  );
};

export default App;
```



## API

Common props ref：[Common props](/docs/react/common-props)

> This component is available since `antd@5.0.0`.

### common API

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| icon | Set the icon component of button | ReactNode | - |  |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| content | Text and other | ReactNode | - |  |
| ~~description~~ | Please use `content` instead | ReactNode | - |  |
| tooltip | The text shown in the tooltip | ReactNode \| [TooltipProps](/components/tooltip#api) | - | TooltipProps: 5.25.0 |
| type | Setting button type | `default` \| `primary` | `default` |  |
| shape | Setting button shape | `circle` \| `square` | `circle` |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| onClick | Set the handler to handle `click` event | (event) => void | - |  |
| href | The target of hyperlink | string | - |  |
| target | Specifies where to display the linked URL | string | - |  |
| htmlType | Set the original html `type` of `button`, see: [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#type) | `submit` \| `reset` \| `button` | `button` | 5.21.0 |
| badge | Attach Badge to FloatButton. `status` and other props related are not supported. | [BadgeProps](/components/badge#api) | - | 5.4.0 |

### FloatButton.Group

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| open | Whether the menu is visible or not, use it with trigger | boolean | - |  |
| closeIcon | Customize close button icon | React.ReactNode | `<CloseOutlined />` |  |
| placement | Customize menu animation placement | `top` \| `left` \| `right` \| `bottom` | `top` | 5.21.0 |
| shape | Setting button shape of children | `circle` \| `square` | `circle` |  |
| trigger | Which action can trigger menu open/close | `click` \| `hover` | - |  |
| onOpenChange | Callback executed when active menu is changed, use it with trigger | (open: boolean) => void | - |  |
| onClick | Set the handler to handle `click` event (only work in `Menu mode`) | (event) => void | - | 5.3.0 |

### FloatButton.BackTop

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| duration | Time to return to top（ms） | number | 450 |  |
| target | Specifies the scrollable area dom node | () => HTMLElement | () => window |  |
| visibilityHeight | The BackTop button will not show until the scroll height reaches this value | number | 400 |  |
| onClick | A callback function, which can be executed when you click the button | () => void | - |  |

## Semantic DOM

### FloatButton

https://ant.design/components/float-button/semantic.md

### FloatButton.Group

https://ant.design/components/float-button/semantic_group.md

## Design Token



## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| borderRadius | Border radius of base components | number |  |
| borderRadiusLG | LG size border radius, used in some large border radius components, such as Card, Modal and other components. | number |  |
| boxShadowSecondary | Control the secondary box shadow style of an element. | string |  |
| colorText | Default text color which comply with W3C standards, and this color is also the darkest neutral color. | string |  |
| controlHeight | The height of the basic controls such as buttons and input boxes in Ant Design | number |  |
| controlHeightLG | LG component height | number |  |
| fontFamily | The font family of Ant Design prioritizes the default interface font of the system, and provides a set of alternative font libraries that are suitable for screen display to maintain the readability and readability of the font under different platforms and browsers, reflecting the friendly, stable and professional characteristics. | string |  |
| fontSize | The most widely used font size in the design system, from which the text gradient will be derived. | number |  |
| fontSizeIcon | Control the font size of operation icon in Select, Cascader, etc. Normally same as fontSizeSM. | number |  |
| fontSizeSM | Small font size | number |  |
| lineHeight | Line height of text. | number |  |
| marginLG | Control the margin of an element, with a large size. | number |  |
| marginXXL | Control the margin of an element, with the largest size. | number |  |
| motionDurationMid | Motion speed, medium speed. Used for medium element animation interaction. | string |  |
| motionDurationSlow | Motion speed, slow speed. Used for large element animation interaction. | string |  |
| padding | Control the padding of the element. | number |  |
| paddingXXS | Control the extra extra small padding of the element. | number |  |
| zIndexPopupBase | Base zIndex of component like FloatButton, Affix which can be cover by large popup | number |  |


