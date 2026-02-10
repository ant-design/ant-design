---
category: Components
group: Feedback
title: Spin
description: Used for the loading status of a page or a block.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*5mC5TomY4B0AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*i43_ToFrL8YAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## When To Use

When part of the page is waiting for asynchronous data or during a rendering process, an appropriate loading animation can effectively alleviate users' inquietude.

## Examples

### Basic Usage

A simple loading status.

```tsx
import React from 'react';
import { Spin } from 'antd';

const App: React.FC = () => <Spin />;

export default App;
```

### Size

A small `Spin` is used for loading text, default sized `Spin` for loading a card-level block, and large `Spin` used for loading a **page**.

```tsx
import React from 'react';
import { Flex, Spin } from 'antd';

const App: React.FC = () => (
  <Flex align="center" gap="middle">
    <Spin size="small" />
    <Spin />
    <Spin size="large" />
  </Flex>
);

export default App;
```

### Embedded mode

Embedding content into `Spin` will set it into loading state.

```tsx
import React from 'react';
import { Alert, Flex, Spin, Switch } from 'antd';

const App: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  return (
    <Flex gap="middle" vertical>
      <Spin spinning={loading}>
        <Alert
          type="info"
          title="Alert message title"
          description="Further details about the context of this alert."
        />
      </Spin>
      <p>
        Loading state：
        <Switch checked={loading} onChange={setLoading} />
      </p>
    </Flex>
  );
};

export default App;
```

### Customized description

Customize the description text.

```tsx
import React from 'react';
import { Alert, Flex, Spin } from 'antd';

const contentStyle: React.CSSProperties = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4,
};

const content = <div style={contentStyle} />;

const App: React.FC = () => (
  <Flex gap="middle" vertical>
    <Flex gap="middle">
      <Spin description="Loading" size="small">
        {content}
      </Spin>
      <Spin description="Loading">{content}</Spin>
      <Spin description="Loading" size="large">
        {content}
      </Spin>
    </Flex>
    <Spin description="Loading...">
      <Alert
        title="Alert message title"
        description="Further details about the context of this alert."
        type="info"
      />
    </Spin>
  </Flex>
);

export default App;
```

### Delay

Specifies a delay for loading state. If `spinning` ends during delay, loading status won't appear.

```tsx
import React from 'react';
import { Alert, Flex, Spin, Switch } from 'antd';

const App: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  return (
    <Flex gap="middle" vertical>
      <Spin spinning={loading} delay={500}>
        <Alert
          type="info"
          title="Alert message title"
          description="Further details about the context of this alert."
        />
      </Spin>
      <p>
        Loading state：
        <Switch checked={loading} onChange={setLoading} />
      </p>
    </Flex>
  );
};

export default App;
```

### Custom spinning indicator

Use custom loading indicator.

```tsx
import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';

const App: React.FC = () => (
  <Flex align="center" gap="middle">
    <Spin indicator={<LoadingOutlined spin />} size="small" />
    <Spin indicator={<LoadingOutlined spin />} />
    <Spin indicator={<LoadingOutlined spin />} size="large" />
    <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
  </Flex>
);

export default App;
```

### Progress

Show the progress. When `percent="auto"` is set, an indeterminate progress will be displayed.

```tsx
import React from 'react';
import { Flex, Spin, Switch } from 'antd';

const App: React.FC = () => {
  const [auto, setAuto] = React.useState(false);
  const [percent, setPercent] = React.useState(-50);
  const timerRef = React.useRef<ReturnType<typeof setTimeout>>(null);

  React.useEffect(() => {
    timerRef.current = setTimeout(() => {
      setPercent((v) => {
        const nextPercent = v + 5;
        return nextPercent > 150 ? -50 : nextPercent;
      });
    }, 100);
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [percent]);

  const mergedPercent = auto ? 'auto' : percent;

  return (
    <Flex align="center" gap="middle">
      <Switch
        checkedChildren="Auto"
        unCheckedChildren="Auto"
        checked={auto}
        onChange={() => {
          setAuto(!auto);
          setPercent(-50);
        }}
      />
      <Spin percent={mergedPercent} size="small" />
      <Spin percent={mergedPercent} />
      <Spin percent={mergedPercent} size="large" />
    </Flex>
  );
};

export default App;
```

### Custom semantic dom styling

You can customize the [semantic dom](#semantic-dom) style of Spin by passing objects/functions through `classNames` and `styles`.

```tsx
import React from 'react';
import { Flex, Spin } from 'antd';
import type { SpinProps } from 'antd';
import { createStaticStyles } from 'antd-style';

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    padding: 8px;
  `,
}));

const stylesObject: SpinProps['styles'] = {
  indicator: {
    color: '#00d4ff',
  },
};

const stylesFn: SpinProps['styles'] = ({ props }) => {
  if (props.size === 'small') {
    return {
      indicator: {
        color: '#722ed1',
      },
    } satisfies SpinProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const sharedProps: SpinProps = {
    spinning: true,
    percent: 0,
    classNames: { root: classNames.root },
  };

  return (
    <Flex align="center" gap="middle">
      <Spin {...sharedProps} styles={stylesObject} />
      <Spin {...sharedProps} styles={stylesFn} size="small" />
    </Flex>
  );
};

export default App;
```

### Fullscreen

The `fullscreen` mode is perfect for creating page loaders. It adds a dimmed overlay with a centered spinner.

```tsx
import React from 'react';
import { Button, Spin } from 'antd';

const App: React.FC = () => {
  const [spinning, setSpinning] = React.useState(false);
  const [percent, setPercent] = React.useState(0);

  const showLoader = () => {
    setSpinning(true);
    let ptg = -10;

    const interval = setInterval(() => {
      ptg += 5;
      setPercent(ptg);

      if (ptg > 120) {
        clearInterval(interval);
        setSpinning(false);
        setPercent(0);
      }
    }, 100);
  };

  return (
    <>
      <Button onClick={showLoader}>Show fullscreen</Button>
      <Spin spinning={spinning} percent={percent} fullscreen />
    </>
  );
};

export default App;
```


## API

Common props ref：[Common props](/docs/react/common-props)

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), string> | - |  |
| delay | Specifies a delay in milliseconds for loading state (prevent flush) | number (milliseconds) | - |  |
| description | Customize description content | ReactNode | - | 6.3.0 |
| fullscreen | Display a backdrop with the `Spin` component | boolean | false | 5.11.0 |
| indicator | React node of the spinning indicator | ReactNode | - |  |
| percent | The progress percentage, when set to `auto`, it will be an indeterminate progress | number \| 'auto' | - | 5.18.0 |
| size | The size of Spin, options: `small`, `default` and `large` | string | `default` |  |
| spinning | Whether Spin is visible | boolean | true |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| ~~tip~~ | Customize description content when Spin has children. Deprecated, use `description` instead | ReactNode | - |  |
| ~~wrapperClassName~~ | The className of wrapper when Spin has children. Deprecated, use `classNames.root` instead | string | - |  |

### Static Method

- `Spin.setDefaultIndicator(indicator: ReactNode)`

  You can define default spin element globally.

## Semantic DOM

https://ant.design/components/spin/semantic.md

## Design Token



## Component Token (Spin)
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| contentHeight | Height of content area | string \| number | 400 |
| dotSize | Loading icon size | number | 20 |
| dotSizeLG | Large loading icon size | number | 32 |
| dotSizeSM | Small loading icon size | number | 14 |

## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| colorBgContainer | Container background color, e.g: default button, input box, etc. Be sure not to confuse this with `colorBgElevated`. | string |  |
| colorBgMask | The background color of the mask, used to cover the content below the mask, Modal, Drawer, Image and other components use this token | string |  |
| colorFillSecondary | The second level of fill color can outline the shape of the element more clearly, such as Rate, Skeleton, etc. It can also be used as the Hover state of the third level of fill color, such as Table, etc. | string |  |
| colorPrimary | Brand color is one of the most direct visual elements to reflect the characteristics and communication of the product. After you have selected the brand color, we will automatically generate a complete color palette and assign it effective design semantics. | string |  |
| colorText | Default text color which comply with W3C standards, and this color is also the darkest neutral color. | string |  |
| colorTextDescription | Control the font color of text description. | string |  |
| colorTextLightSolid | Control the highlight color of text with background color, such as the text in Primary Button components. | string |  |
| colorWhite | Pure white color don't changed by theme | string |  |
| fontFamily | The font family of Ant Design prioritizes the default interface font of the system, and provides a set of alternative font libraries that are suitable for screen display to maintain the readability and readability of the font under different platforms and browsers, reflecting the friendly, stable and professional characteristics. | string |  |
| fontSize | The most widely used font size in the design system, from which the text gradient will be derived. | number |  |
| lineHeight | Line height of text. | number |  |
| marginXXS | Control the margin of an element, with the smallest size. | number |  |
| motionDurationMid | Motion speed, medium speed. Used for medium element animation interaction. | string |  |
| motionDurationSlow | Motion speed, slow speed. Used for large element animation interaction. | string |  |
| paddingSM | Control the small padding of the element. | number |  |
| zIndexPopupBase | Base zIndex of component like FloatButton, Affix which can be cover by large popup | number |  |


