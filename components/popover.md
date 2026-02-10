---
category: Components
group: Data Display
title: Popover
description: The floating card pops up when clicking/mouse hovering over an element.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*kfW5RrfF4L8AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*6b8fSKVVtXIAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## When To Use

A simple popup menu to provide extra information or operations.

Comparing with `Tooltip`, besides information `Popover` card can also provide action elements like links and buttons.

## Examples

### Basic

The most basic example. The size of the floating layer depends on the contents region.

<style>
.ant-popover-content p {
  margin: 0;
}
</style>

```tsx
import React from 'react';
import { Button, Popover } from 'antd';

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const App: React.FC = () => (
  <Popover content={content} title="Title">
    <Button type="primary">Hover me</Button>
  </Popover>
);

export default App;
```

### Three ways to trigger

Mouse to click, focus and move in.

```tsx
import React from 'react';
import { Button, Popover, Space } from 'antd';

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const App: React.FC = () => (
  <Space wrap>
    <Popover content={content} title="Title" trigger="hover">
      <Button>Hover me</Button>
    </Popover>
    <Popover content={content} title="Title" trigger="focus">
      <Button>Focus me</Button>
    </Popover>
    <Popover content={content} title="Title" trigger="click">
      <Button>Click me</Button>
    </Popover>
  </Space>
);

export default App;
```

### Placement

There are 12 `placement` options available.

```tsx
import React from 'react';
import { Button, ConfigProvider, Flex, Popover } from 'antd';

const text = <span>Title</span>;

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const buttonWidth = 80;

const App: React.FC = () => (
  <ConfigProvider button={{ style: { width: buttonWidth, margin: 4 } }}>
    <Flex vertical justify="center" align="center" className="demo">
      <Flex justify="center" align="center" style={{ whiteSpace: 'nowrap' }}>
        <Popover placement="topLeft" title={text} content={content}>
          <Button>TL</Button>
        </Popover>
        <Popover placement="top" title={text} content={content}>
          <Button>Top</Button>
        </Popover>
        <Popover placement="topRight" title={text} content={content}>
          <Button>TR</Button>
        </Popover>
      </Flex>
      <Flex style={{ width: buttonWidth * 5 + 32 }} justify="space-between" align="center">
        <Flex align="center" vertical>
          <Popover placement="leftTop" title={text} content={content}>
            <Button>LT</Button>
          </Popover>
          <Popover placement="left" title={text} content={content}>
            <Button>Left</Button>
          </Popover>
          <Popover placement="leftBottom" title={text} content={content}>
            <Button>LB</Button>
          </Popover>
        </Flex>
        <Flex align="center" vertical>
          <Popover placement="rightTop" title={text} content={content}>
            <Button>RT</Button>
          </Popover>
          <Popover placement="right" title={text} content={content}>
            <Button>Right</Button>
          </Popover>
          <Popover placement="rightBottom" title={text} content={content}>
            <Button>RB</Button>
          </Popover>
        </Flex>
      </Flex>
      <Flex justify="center" align="center" style={{ whiteSpace: 'nowrap' }}>
        <Popover placement="bottomLeft" title={text} content={content}>
          <Button>BL</Button>
        </Popover>
        <Popover placement="bottom" title={text} content={content}>
          <Button>Bottom</Button>
        </Popover>
        <Popover placement="bottomRight" title={text} content={content}>
          <Button>BR</Button>
        </Popover>
      </Flex>
    </Flex>
  </ConfigProvider>
);

export default App;
```

### Arrow

Hide arrow by `arrow`.

```tsx
import React, { useMemo, useState } from 'react';
import { Button, ConfigProvider, Flex, Popover, Segmented } from 'antd';
import type { PopoverProps } from 'antd';

const text = <span>Title</span>;

const buttonWidth = 80;

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const App: React.FC = () => {
  const [arrow, setArrow] = useState<'Show' | 'Hide' | 'Center'>('Show');

  const mergedArrow = useMemo<PopoverProps['arrow']>(() => {
    if (arrow === 'Hide') {
      return false;
    }

    if (arrow === 'Show') {
      return true;
    }

    return {
      pointAtCenter: true,
    };
  }, [arrow]);

  return (
    <ConfigProvider button={{ style: { width: buttonWidth, margin: 4 } }}>
      <Segmented
        options={['Show', 'Hide', 'Center']}
        onChange={setArrow}
        style={{ marginBottom: 24 }}
      />
      <Flex vertical justify="center" align="center" className="demo">
        <Flex justify="center" align="center" style={{ whiteSpace: 'nowrap' }}>
          <Popover placement="topLeft" title={text} content={content} arrow={mergedArrow}>
            <Button>TL</Button>
          </Popover>
          <Popover placement="top" title={text} content={content} arrow={mergedArrow}>
            <Button>Top</Button>
          </Popover>
          <Popover placement="topRight" title={text} content={content} arrow={mergedArrow}>
            <Button>TR</Button>
          </Popover>
        </Flex>
        <Flex style={{ width: buttonWidth * 5 + 32 }} justify="space-between" align="center">
          <Flex align="center" vertical>
            <Popover placement="leftTop" title={text} content={content} arrow={mergedArrow}>
              <Button>LT</Button>
            </Popover>
            <Popover placement="left" title={text} content={content} arrow={mergedArrow}>
              <Button>Left</Button>
            </Popover>
            <Popover placement="leftBottom" title={text} content={content} arrow={mergedArrow}>
              <Button>LB</Button>
            </Popover>
          </Flex>
          <Flex align="center" vertical>
            <Popover placement="rightTop" title={text} content={content} arrow={mergedArrow}>
              <Button>RT</Button>
            </Popover>
            <Popover placement="right" title={text} content={content} arrow={mergedArrow}>
              <Button>Right</Button>
            </Popover>
            <Popover placement="rightBottom" title={text} content={content} arrow={mergedArrow}>
              <Button>RB</Button>
            </Popover>
          </Flex>
        </Flex>
        <Flex justify="center" align="center" style={{ whiteSpace: 'nowrap' }}>
          <Popover placement="bottomLeft" title={text} content={content} arrow={mergedArrow}>
            <Button>BL</Button>
          </Popover>
          <Popover placement="bottom" title={text} content={content} arrow={mergedArrow}>
            <Button>Bottom</Button>
          </Popover>
          <Popover placement="bottomRight" title={text} content={content} arrow={mergedArrow}>
            <Button>BR</Button>
          </Popover>
        </Flex>
      </Flex>
    </ConfigProvider>
  );
};

export default App;
```


### Auto Shift

Auto adjust Popup and arrow position when Popover is close to the edge of the screen. Will be out of screen when exceed limitation.

```tsx
import React from 'react';
import { Button, Popover } from 'antd';

const style: React.CSSProperties = {
  width: '300vw',
  height: '300vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const App: React.FC = () => {
  React.useEffect(() => {
    document.documentElement.scrollTop = document.documentElement.clientHeight;
    document.documentElement.scrollLeft = document.documentElement.clientWidth;
  }, []);
  return (
    <div style={style}>
      <Popover content="Thanks for using antd. Have a nice day !" open>
        <Button type="primary">Scroll The Window</Button>
      </Popover>
    </div>
  );
};

export default App;
```

### Controlling the close of the dialog

Use `open` prop to control the display of the card.

```tsx
import React, { useState } from 'react';
import { Button, Popover } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <Popover
      content={<a onClick={hide}>Close</a>}
      title="Title"
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Button type="primary">Click me</Button>
    </Popover>
  );
};

export default App;
```

### Hover with click popover

The following example shows how to create a popover which can be hovered and clicked.

```tsx
import React, { useState } from 'react';
import { Button, Popover } from 'antd';

const hoverContent = <div>This is hover content.</div>;

const clickContent = <div>This is click content.</div>;

const App: React.FC = () => {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const hide = () => {
    setClicked(false);
    setHovered(false);
  };

  const handleHoverChange = (open: boolean) => {
    setHovered(open);
    setClicked(false);
  };

  const handleClickChange = (open: boolean) => {
    setHovered(false);
    setClicked(open);
  };

  return (
    <Popover
      style={{ width: 500 }}
      content={hoverContent}
      title="Hover title"
      trigger="hover"
      open={hovered}
      onOpenChange={handleHoverChange}
    >
      <Popover
        content={
          <div>
            {clickContent}
            <a onClick={hide}>Close</a>
          </div>
        }
        title="Click title"
        trigger="click"
        open={clicked}
        onOpenChange={handleClickChange}
      >
        <Button>Hover and click</Button>
      </Popover>
    </Popover>
  );
};

export default App;
```

### Custom semantic dom styling

You can customize the [semantic dom](#semantic-dom) style of Popover by passing objects/functions through `classNames` and `styles`.

```tsx
import React from 'react';
import { Button, Flex, Popover } from 'antd';
import type { PopoverProps } from 'antd';
import { createStaticStyles } from 'antd-style';

const classNames = createStaticStyles(({ css }) => ({
  container: css`
    padding: 10px;
  `,
}));

const styles: PopoverProps['styles'] = {
  container: {
    background: '#eee',
    boxShadow: 'inset 5px 5px 3px #fff, inset -5px -5px 3px #ddd, 0 0 3px rgba(0,0,0,0.2)',
  },
  content: {
    color: '#262626',
  },
};

const stylesFn: PopoverProps['styles'] = (info) => {
  if (!info.props.arrow) {
    return {
      container: {
        backgroundColor: 'rgba(53, 71, 125, 0.8)',
        padding: 12,
        borderRadius: 4,
      },
      content: {
        color: '#fff',
      },
    } satisfies PopoverProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  return (
    <Flex gap="middle">
      <Popover content="Object text" classNames={classNames} styles={styles} arrow={false}>
        <Button>Object Style</Button>
      </Popover>
      <Popover content="Function text" classNames={classNames} styles={stylesFn} arrow={false}>
        <Button type="primary">Function Style</Button>
      </Popover>
    </Flex>
  );
};

export default App;
```





## API

Common props ref：[Common props](/docs/react/common-props)

| Param | Description | Type | Default value | Version |
| --- | --- | --- | --- | --- |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| content | Content of the card | ReactNode \| () => ReactNode | - |  |
| title | Title of the card | ReactNode \| () => ReactNode | - |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |

<!-- Common API -->

<embed src="../tooltip/shared/sharedProps.en-US.md"></embed>

## Note

Please ensure that the child node of `Popover` accepts `onMouseEnter`, `onMouseLeave`, `onFocus`, `onClick` events.

## Semantic DOM

https://ant.design/components/popover/semantic.md

## Design Token



## Component Token (Popover)
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| titleMinWidth | Min width of Popover title | string \| number | 177 |
| zIndexPopup | z-index of Popover | number | 1030 |

## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| borderRadiusLG | LG size border radius, used in some large border radius components, such as Card, Modal and other components. | number |  |
| borderRadiusXS | XS size border radius, used in some small border radius components, such as Segmented, Arrow and other components with small border radius. | number |  |
| boxShadowSecondary | Control the secondary box shadow style of an element. | string |  |
| colorBgElevated | Container background color of the popup layer, in dark mode the color value of this token will be a little brighter than `colorBgContainer`. E.g: modal, pop-up, menu, etc. | string |  |
| colorText | Default text color which comply with W3C standards, and this color is also the darkest neutral color. | string |  |
| colorTextHeading | Control the font color of heading. | string |  |
| fontFamily | The font family of Ant Design prioritizes the default interface font of the system, and provides a set of alternative font libraries that are suitable for screen display to maintain the readability and readability of the font under different platforms and browsers, reflecting the friendly, stable and professional characteristics. | string |  |
| fontSize | The most widely used font size in the design system, from which the text gradient will be derived. | number |  |
| fontWeightStrong | Control the font weight of heading components (such as h1, h2, h3) or selected item. | number |  |
| lineHeight | Line height of text. | number |  |
| motionDurationMid | Motion speed, medium speed. Used for medium element animation interaction. | string |  |
| motionEaseInOutCirc | Preset motion curve. | string |  |
| motionEaseOutCirc | Preset motion curve. | string |  |
| sizePopupArrow | The size of the component arrow | number |  |



## FAQ

<embed src="../tooltip/shared/sharedFAQ.en-US.md"></embed>

For more questions, please refer to [Tooltip FAQ](/components/tooltip#faq).
