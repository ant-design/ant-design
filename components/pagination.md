---
category: Components
group: Navigation
title: Pagination
description: A long list can be divided into several pages, and only one page will be loaded at a time.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*8y_iTJGY_aUAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*WM86SrBC8TsAAAAAAAAAAAAADrJ8AQ/original
---

## When To Use

- When it will take a long time to load/render all items.
- If you want to browse the data by navigating through pages.

## Examples

### Basic

Basic pagination.

```tsx
import React from 'react';
import { Pagination } from 'antd';

const App: React.FC = () => <Pagination defaultCurrent={1} total={50} />;

export default App;
```

### Align



```tsx
import React from 'react';
import { Pagination } from 'antd';

const App: React.FC = () => (
  <>
    <Pagination align="start" defaultCurrent={1} total={50} />
    <br />
    <Pagination align="center" defaultCurrent={1} total={50} />
    <br />
    <Pagination align="end" defaultCurrent={1} total={50} />
  </>
);

export default App;
```

### More

More pages.

```tsx
import React from 'react';
import { Pagination } from 'antd';

const App: React.FC = () => <Pagination defaultCurrent={6} total={500} />;

export default App;
```

### Changer

Change `pageSize`.

```tsx
import React from 'react';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';

const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
  console.log(current, pageSize);
};

const App: React.FC = () => (
  <>
    <Pagination
      showSizeChanger
      onShowSizeChange={onShowSizeChange}
      defaultCurrent={3}
      total={500}
    />
    <br />
    <Pagination
      showSizeChanger
      onShowSizeChange={onShowSizeChange}
      defaultCurrent={3}
      total={500}
      disabled
    />
  </>
);

export default App;
```

### Jumper

Jump to a page directly.

```tsx
import React from 'react';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';

const onChange: PaginationProps['onChange'] = (pageNumber) => {
  console.log('Page: ', pageNumber);
};

const App: React.FC = () => (
  <>
    <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={onChange} />
    <br />
    <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={onChange} disabled />
  </>
);

export default App;
```

### Size

Small and large size pagination.

```tsx
import React from 'react';
import type { PaginationProps } from 'antd';
import { Divider, Flex, Pagination } from 'antd';

const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} items`;

const App: React.FC = () => (
  <Flex vertical gap="middle">
    <Divider titlePlacement="start">Small</Divider>

    <Pagination size="small" total={50} />
    <Pagination size="small" total={50} showSizeChanger showQuickJumper />
    <Pagination size="small" total={50} showTotal={showTotal} />
    <Pagination
      size="small"
      total={50}
      disabled
      showTotal={showTotal}
      showSizeChanger
      showQuickJumper
    />

    <Divider titlePlacement="start">Large</Divider>

    <Pagination size="large" total={50} />
    <Pagination size="large" total={50} showSizeChanger showQuickJumper />
    <Pagination size="large" total={50} showTotal={showTotal} />
    <Pagination
      size="large"
      total={50}
      disabled
      showTotal={showTotal}
      showSizeChanger
      showQuickJumper
    />
  </Flex>
);

export default App;
```

### Simple mode

Simple mode.

```tsx
import React from 'react';
import { Pagination } from 'antd';

const App: React.FC = () => (
  <>
    <Pagination simple defaultCurrent={2} total={50} />
    <br />
    <Pagination simple={{ readOnly: true }} defaultCurrent={2} total={50} />
    <br />
    <Pagination disabled simple defaultCurrent={2} total={50} />
  </>
);

export default App;
```

### Controlled

Controlled page number.

```tsx
import React, { useState } from 'react';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';

const App: React.FC = () => {
  const [current, setCurrent] = useState(3);

  const onChange: PaginationProps['onChange'] = (page) => {
    console.log(page);
    setCurrent(page);
  };

  return <Pagination current={current} onChange={onChange} total={50} />;
};

export default App;
```

### Total number

You can show the total number of data by setting `showTotal`.

```tsx
import React from 'react';
import { Pagination } from 'antd';

const App: React.FC = () => (
  <>
    <Pagination
      total={85}
      showTotal={(total) => `Total ${total} items`}
      defaultPageSize={20}
      defaultCurrent={1}
    />
    <br />
    <Pagination
      total={85}
      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
      defaultPageSize={20}
      defaultCurrent={1}
    />
  </>
);

export default App;
```

### Show All

Show all configured prop.

```tsx
import React from 'react';
import { Pagination } from 'antd';

const App: React.FC = () => (
  <Pagination
    total={85}
    showSizeChanger
    showQuickJumper
    showTotal={(total) => `Total ${total} items`}
  />
);

export default App;
```

### Prev and next

Use text link for prev and next button.

```tsx
import React from 'react';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';

const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
  if (type === 'prev') {
    return <a>Previous</a>;
  }
  if (type === 'next') {
    return <a>Next</a>;
  }
  return originalElement;
};

const App: React.FC = () => <Pagination total={500} itemRender={itemRender} />;

export default App;
```



### Custom semantic dom styling

You can customize the [semantic dom](#semantic-dom) style of Pagination by passing objects/functions through `classNames` and `styles`.

```tsx
import React from 'react';
import { Flex, Pagination } from 'antd';
import type { PaginationProps } from 'antd';
import { createStaticStyles } from 'antd-style';

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    border: 2px dashed #ccc;
    padding: 8px;
  `,
}));

const styleFn: PaginationProps['styles'] = ({ props }) => {
  if (props.size === 'small') {
    return {
      item: {
        backgroundColor: `rgba(200, 200, 200, 0.3)`,
        marginInlineEnd: 4,
      },
    } satisfies PaginationProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const paginationSharedProps: PaginationProps = {
    total: 500,
    classNames: { root: classNames.root },
  };

  return (
    <Flex vertical gap="middle">
      <Pagination {...paginationSharedProps} styles={{ item: { borderRadius: 999 } }} />
      <Pagination {...paginationSharedProps} size="small" styles={styleFn} />
    </Flex>
  );
};

export default App;
```


## API

Common props ref：[Common props](/docs/react/common-props)

```jsx
<Pagination onChange={onChange} total={50} />
```

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| align | Align | start \| center \| end | - | 5.19.0 |
| classNames | Customize class for each semantic structure inside the component. Supports object or function | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), string> | - |  |
| current | Current page number | number | - |  |
| defaultCurrent | Default initial page number | number | 1 |  |
| defaultPageSize | Default number of data items per page | number | 10 |  |
| disabled | Disable pagination | boolean | - |  |
| hideOnSinglePage | Whether to hide pager on single page | boolean | false |  |
| itemRender | To customize item's innerHTML | (page, type: 'page' \| 'prev' \| 'next', originalElement) => React.ReactNode | - |  |
| pageSize | Number of data items per page | number | - |  |
| pageSizeOptions | Specify the sizeChanger options | number\[] | \[`10`, `20`, `50`, `100`] |  |
| responsive | If `size` is not specified, `Pagination` would resize according to the width of the window | boolean | - |  |
| showLessItems | Show less page items | boolean | false |  |
| showQuickJumper | Determine whether you can jump to pages directly | boolean \| { goButton: ReactNode } | false |  |
| showSizeChanger | Determine whether to show `pageSize` select | boolean \| [SelectProps](/components/select#api) | - | SelectProps: 5.21.0 |
| totalBoundaryShowSizeChanger | When `total` larger than it, `showSizeChanger` will be true | number | 50 |  |
| showTitle | Show page item's title | boolean | true |  |
| showTotal | To display the total number and range | function(total, range) | - |  |
| simple | Whether to use simple mode | boolean \| { readOnly?: boolean } | - |  |
| size | Component size | `large` \| `medium` \| `small` | `medium` |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| total | Total number of data items | number | 0 |  |
| onChange | Called when the page number or `pageSize` is changed, and it takes the resulting page number and pageSize as its arguments | function(page, pageSize) | - |  |
| onShowSizeChange | Called when `pageSize` is changed | function(current, size) | - |  |

## Semantic DOM

https://ant.design/components/pagination/semantic.md

## Design Token



## Component Token (Pagination)
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| itemActiveBg | Background color of active Pagination item | string | #ffffff |
| itemActiveBgDisabled | Background color of disabled active Pagination item | string | rgba(0,0,0,0.15) |
| itemActiveColor | Text color of active Pagination item | string | #1677ff |
| itemActiveColorDisabled | Text color of disabled active Pagination item | string | rgba(0,0,0,0.25) |
| itemActiveColorHover | Text color of active Pagination item hover | string | #4096ff |
| itemBg | Background color of Pagination item | string | #ffffff |
| itemInputBg | Background color of input | string | #ffffff |
| itemLinkBg | Background color of Pagination item link | string | #ffffff |
| itemSize | Size of Pagination item | number | 32 |
| itemSizeLG | Size of large Pagination item | number | 40 |
| itemSizeSM | Size of small Pagination item | number | 24 |
| miniOptionsSizeChangerTop | Top of Pagination size changer | number | 0 |

## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| borderRadius | Border radius of base components | number |  |
| borderRadiusLG | LG size border radius, used in some large border radius components, such as Card, Modal and other components. | number |  |
| borderRadiusSM | SM size border radius, used in small size components, such as Button, Input, Select and other input components in small size | number |  |
| colorBgContainer | Container background color, e.g: default button, input box, etc. Be sure not to confuse this with `colorBgElevated`. | string |  |
| colorBgContainerDisabled | Control the background color of container in disabled state. | string |  |
| colorBgTextActive | Control the background color of text in active state. | string |  |
| colorBgTextHover | Control the background color of text in hover state. | string |  |
| colorBorder | Default border color, used to separate different elements, such as: form separator, card separator, etc. | string |  |
| colorPrimary | Brand color is one of the most direct visual elements to reflect the characteristics and communication of the product. After you have selected the brand color, we will automatically generate a complete color palette and assign it effective design semantics. | string |  |
| colorPrimaryBorder | The stroke color under the main color gradient, used on the stroke of components such as Slider. | string |  |
| colorPrimaryHover | Hover state under the main color gradient. | string |  |
| colorText | Default text color which comply with W3C standards, and this color is also the darkest neutral color. | string |  |
| colorTextDisabled | Control the color of text in disabled state. | string |  |
| colorTextPlaceholder | Control the color of placeholder text. | string |  |
| controlHeightLG | LG component height | number |  |
| controlOutline | Control the outline color of input component. | string |  |
| controlOutlineWidth | Control the outline width of input component. | number |  |
| fontFamily | The font family of Ant Design prioritizes the default interface font of the system, and provides a set of alternative font libraries that are suitable for screen display to maintain the readability and readability of the font under different platforms and browsers, reflecting the friendly, stable and professional characteristics. | string |  |
| fontSize | The most widely used font size in the design system, from which the text gradient will be derived. | number |  |
| fontSizeSM | Small font size | number |  |
| fontWeightStrong | Control the font weight of heading components (such as h1, h2, h3) or selected item. | number |  |
| lineHeight | Line height of text. | number |  |
| lineHeightLG | Line height of large text. | number |  |
| lineType | Border style of base components | string |  |
| lineWidth | Border width of base components | number |  |
| lineWidthFocus | Control the width of the line when the component is in focus state. | number |  |
| margin | Control the margin of an element, with a medium size. | number |  |
| marginSM | Control the margin of an element, with a medium-small size. | number |  |
| marginXS | Control the margin of an element, with a small size. | number |  |
| marginXXS | Control the margin of an element, with the smallest size. | number |  |
| motionDurationMid | Motion speed, medium speed. Used for medium element animation interaction. | string |  |
| paddingXXS | Control the extra extra small padding of the element. | number |  |
| screenLG | Control the screen width of large screens. | number |  |
| screenSM | Control the screen width of small screens. | number |  |


