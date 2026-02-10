---
category: Components
group: Data Display
title: Descriptions
description: Display multiple read-only fields in a group.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*fHdlTpif6XQAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*d27AQJrowGAAAAAAAAAAAAAADrJ8AQ/original
---

## When To Use

Commonly displayed on the details page.

```tsx | pure
// works when >= 5.8.0, recommended ✅

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'UserName',
    children: <p>Zhou Maomao</p>,
  },
  {
    key: '2',
    label: 'Telephone',
    children: <p>1810000000</p>,
  },
  {
    key: '3',
    label: 'Live',
    children: <p>Hangzhou, Zhejiang</p>,
  },
  {
    key: '4',
    label: 'Remark',
    children: <p>empty</p>,
  },
  {
    key: '5',
    label: 'Address',
    children: <p>No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China</p>,
  },
];

<Descriptions title="User Info" items={items} />;

// works when <5.8.0 , deprecated when >=5.8.0 🙅🏻‍♀️

<Descriptions title="User Info">
  <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
  <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
  <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
  <Descriptions.Item label="Remark">empty</Descriptions.Item>
  <Descriptions.Item label="Address">
    No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
  </Descriptions.Item>
</Descriptions>;
```

## Examples

### Basic

Simplest Usage.

```tsx
import React from 'react';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'UserName',
    children: 'Zhou Maomao',
  },
  {
    key: '2',
    label: 'Telephone',
    children: '1810000000',
  },
  {
    key: '3',
    label: 'Live',
    children: 'Hangzhou, Zhejiang',
  },
  {
    key: '4',
    label: 'Remark',
    children: 'empty',
  },
  {
    key: '5',
    label: 'Address',
    children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
  },
];

const App: React.FC = () => <Descriptions title="User Info" items={items} />;

export default App;
```

### border

Descriptions with border and background color.

```tsx
import React from 'react';
import { Badge, Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Product',
    children: 'Cloud Database',
  },
  {
    key: '2',
    label: 'Billing Mode',
    children: 'Prepaid',
  },
  {
    key: '3',
    label: 'Automatic Renewal',
    children: 'YES',
  },
  {
    key: '4',
    label: 'Order time',
    children: '2018-04-24 18:00:00',
  },
  {
    key: '5',
    label: 'Usage Time',
    children: '2019-04-24 18:00:00',
    span: 2,
  },
  {
    key: '6',
    label: 'Status',
    children: <Badge status="processing" text="Running" />,
    span: 3,
  },
  {
    key: '7',
    label: 'Negotiated Amount',
    children: '$80.00',
  },
  {
    key: '8',
    label: 'Discount',
    children: '$20.00',
  },
  {
    key: '9',
    label: 'Official Receipts',
    children: '$60.00',
  },
  {
    key: '10',
    label: 'Config Info',
    children: (
      <>
        Data disk type: MongoDB
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
        <br />
        Storage space: 10 GB
        <br />
        Replication factor: 3
        <br />
        Region: East China 1
        <br />
      </>
    ),
  },
];

const App: React.FC = () => <Descriptions title="User Info" bordered items={items} />;

export default App;
```



### Custom size

Custom sizes to fit in a variety of containers.

```tsx
import React, { useState } from 'react';
import { Button, Descriptions, Radio } from 'antd';
import type { DescriptionsProps, RadioChangeEvent } from 'antd';

const borderedItems: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Product',
    children: 'Cloud Database',
  },
  {
    key: '2',
    label: 'Billing',
    children: 'Prepaid',
  },
  {
    key: '3',
    label: 'Time',
    children: '18:00:00',
  },
  {
    key: '4',
    label: 'Amount',
    children: '$80.00',
  },
  {
    key: '5',
    label: 'Discount',
    children: '$20.00',
  },
  {
    key: '6',
    label: 'Official',
    children: '$60.00',
  },
  {
    key: '7',
    label: 'Config Info',
    children: (
      <>
        Data disk type: MongoDB
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
        <br />
        Storage space: 10 GB
        <br />
        Replication factor: 3
        <br />
        Region: East China 1
        <br />
      </>
    ),
  },
];

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Product',
    children: 'Cloud Database',
  },
  {
    key: '2',
    label: 'Billing',
    children: 'Prepaid',
  },
  {
    key: '3',
    label: 'Time',
    children: '18:00:00',
  },
  {
    key: '4',
    label: 'Amount',
    children: '$80.00',
  },
  {
    key: '5',
    label: 'Discount',
    children: '$20.00',
  },
  {
    key: '6',
    label: 'Official',
    children: '$60.00',
  },
];

const App: React.FC = () => {
  const [size, setSize] = useState<'default' | 'middle' | 'small'>('default');

  const onChange = (e: RadioChangeEvent) => {
    console.log('size checked', e.target.value);
    setSize(e.target.value);
  };

  return (
    <div>
      <Radio.Group onChange={onChange} value={size}>
        <Radio value="default">default</Radio>
        <Radio value="middle">middle</Radio>
        <Radio value="small">small</Radio>
      </Radio.Group>
      <br />
      <br />
      <Descriptions
        bordered
        title="Custom Size"
        size={size}
        extra={<Button type="primary">Edit</Button>}
        items={borderedItems}
      />
      <br />
      <br />
      <Descriptions
        title="Custom Size"
        size={size}
        extra={<Button type="primary">Edit</Button>}
        items={items}
      />
    </div>
  );
};

export default App;
```

### responsive

Responsive configuration enables perfect presentation on small screen devices.

```tsx
import React from 'react';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';

const items: DescriptionsProps['items'] = [
  {
    label: 'Product',
    children: 'Cloud Database',
  },
  {
    label: 'Billing',
    children: 'Prepaid',
  },
  {
    label: 'Time',
    children: '18:00:00',
  },
  {
    label: 'Amount',
    children: '$80.00',
  },
  {
    label: 'Discount',
    span: { xl: 2, xxl: 2 },
    children: '$20.00',
  },
  {
    label: 'Official',
    span: { xl: 2, xxl: 2 },
    children: '$60.00',
  },
  {
    label: 'Config Info',
    span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
    children: (
      <>
        Data disk type: MongoDB
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
      </>
    ),
  },
  {
    label: 'Hardware Info',
    span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
    children: (
      <>
        CPU: 6 Core 3.5 GHz
        <br />
        Storage space: 10 GB
        <br />
        Replication factor: 3
        <br />
        Region: East China 1
      </>
    ),
  },
];

const App: React.FC = () => (
  <Descriptions
    title="Responsive Descriptions"
    bordered
    column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
    items={items}
  />
);

export default App;
```

### Vertical

Simplest Usage.

```tsx
import React from 'react';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'UserName',
    children: 'Zhou Maomao',
  },
  {
    key: '2',
    label: 'Telephone',
    children: '1810000000',
  },
  {
    key: '3',
    label: 'Live',
    children: 'Hangzhou, Zhejiang',
  },
  {
    key: '4',
    label: 'Address',
    span: 2,
    children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
  },
  {
    key: '5',
    label: 'Remark',
    children: 'empty',
  },
];

const App: React.FC = () => <Descriptions title="User Info" layout="vertical" items={items} />;

export default App;
```

### Vertical border

Descriptions with border and background color.

```tsx
import React from 'react';
import { Badge, Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Product',
    children: 'Cloud Database',
  },
  {
    key: '2',
    label: 'Billing Mode',
    children: 'Prepaid',
  },
  {
    key: '3',
    label: 'Automatic Renewal',
    children: 'YES',
  },
  {
    key: '4',
    label: 'Order time',
    children: '2018-04-24 18:00:00',
  },
  {
    key: '5',
    label: 'Usage Time',
    span: 2,
    children: '2019-04-24 18:00:00',
  },
  {
    key: '6',
    label: 'Status',
    span: 3,
    children: <Badge status="processing" text="Running" />,
  },
  {
    key: '7',
    label: 'Negotiated Amount',
    children: '$80.00',
  },
  {
    key: '8',
    label: 'Discount',
    children: '$20.00',
  },
  {
    key: '9',
    label: 'Official Receipts',
    children: '$60.00',
  },
  {
    key: '10',
    label: 'Config Info',
    children: (
      <>
        Data disk type: MongoDB
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
        <br />
        Storage space: 10 GB
        <br />
        Replication factor: 3
        <br />
        Region: East China 1
        <br />
      </>
    ),
  },
];

const App: React.FC = () => (
  <Descriptions title="User Info" layout="vertical" bordered items={items} />
);

export default App;
```


### Custom semantic dom styling

You can customize the [semantic dom](#semantic-dom) style of Descriptions by passing objects/functions through `classNames` and `styles`.

```tsx
import React from 'react';
import { Descriptions, Flex } from 'antd';
import type { DescriptionsProps } from 'antd';
import { createStaticStyles } from 'antd-style';

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    padding: 10px;
  `,
}));

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Product',
    children: 'Cloud Database',
  },
  {
    key: '2',
    label: 'Billing Mode',
    children: 'Prepaid',
  },
  {
    key: '3',
    label: 'Automatic Renewal',
    children: 'YES',
  },
];

const styles: DescriptionsProps['styles'] = {
  label: {
    color: '#000',
  },
};

const stylesFn: DescriptionsProps['styles'] = (info) => {
  if (info.props.size === 'default') {
    return {
      root: {
        borderRadius: 8,
        border: '1px solid #CDC1FF',
      },
      label: { color: '#A294F9' },
    } satisfies DescriptionsProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const descriptionsProps: DescriptionsProps = {
    title: 'User Info',
    items,
    bordered: true,
    classNames,
  };

  return (
    <Flex vertical gap="middle">
      <Descriptions {...descriptionsProps} styles={styles} size="small" />
      <Descriptions {...descriptionsProps} styles={stylesFn} size="default" />
    </Flex>
  );
};

export default App;
```



### row

Display of the entire line.

```tsx
import React from 'react';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';

const items: DescriptionsProps['items'] = [
  {
    label: 'UserName',
    children: 'Zhou Maomao',
  },
  {
    label: 'Live',
    span: 'filled', // span = 2
    children: 'Hangzhou, Zhejiang',
  },
  {
    label: 'Remark',
    span: 'filled', // span = 3
    children: 'empty',
  },
  {
    label: 'Address',
    span: 1, // span will be 3 and warning for span is not align to the end
    children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
  },
];

const App: React.FC = () => <Descriptions bordered title="User Info" items={items} />;

export default App;
```


## API

Common props ref：[Common props](/docs/react/common-props)

### Descriptions

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| bordered | Whether to display the border | boolean | false |  |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| colon | Change default props `colon` value of Descriptions.Item. Indicates whether the colon after the label is displayed | boolean | true |  |
| column | The number of `DescriptionItems` in a row, could be an object (like `{ xs: 8, sm: 16, md: 24}`, but must have `bordered={true}`) or a number | number \| [Record<Breakpoint, number>](https://github.com/ant-design/ant-design/blob/84ca0d23ae52e4f0940f20b0e22eabe743f90dca/components/descriptions/index.tsx#L111C21-L111C56) | 3 |  |
| ~~contentStyle~~ | Customize content style, Please use `styles.content` instead | CSSProperties | - | 4.10.0 |
| extra | The action area of the description list, placed at the top-right | ReactNode | - | 4.5.0 |
| items | Describe the contents of the list item | [DescriptionsItem](#descriptionitem)[] | - | 5.8.0 |
| ~~labelStyle~~ | Customize label style | CSSProperties, Please use `styles.label` instead | - | 4.10.0 |
| layout | Define description layout | `horizontal` \| `vertical` | `horizontal` |  |
| size | Set the size of the list. Can be set to `middle`,`small`, or not filled | `default` \| `middle` \| `small` | - |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| title | The title of the description list, placed at the top | ReactNode | - |  |

### DescriptionItem

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| ~~contentStyle~~ | Customize content style, Please use `styles.content` instead | CSSProperties | - | 4.9.0 |
| label | The description of the content | ReactNode | - |  |
| ~~labelStyle~~ | Customize label style, Please use `styles.label` instead | CSSProperties | - | 4.9.0 |
| span | The number of columns included(`filled` Fill the remaining part of the current row) | number \| `filled` \| [Screens](/components/grid#col) | 1 | `screens: 5.9.0`, `filled: 5.22.0` |

> The number of span Description.Item. Span={2} takes up the width of two DescriptionItems. When both `style` and `labelStyle`(or `contentStyle`) configured, both of them will work. And next one will overwrite first when conflict.

## Semantic DOM

https://ant.design/components/descriptions/semantic.md

## Design Token



## Component Token (Descriptions)
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| colonMarginLeft | Left margin of colon | number | 2 |
| colonMarginRight | Right margin of colon | number | 8 |
| contentColor | Text color of content | string | rgba(0,0,0,0.88) |
| extraColor | Text color of extra area | string | rgba(0,0,0,0.88) |
| itemPaddingBottom | Bottom padding of item | number | 16 |
| itemPaddingEnd | End padding of item | number | 16 |
| labelBg | Background color of label | string | rgba(0,0,0,0.02) |
| labelColor | Text color of label | string | rgba(0,0,0,0.45) |
| titleColor | Text color of title | string | rgba(0,0,0,0.88) |
| titleMarginBottom | Bottom margin of title | number | 20 |

## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| borderRadiusLG | LG size border radius, used in some large border radius components, such as Card, Modal and other components. | number |  |
| colorSplit | Used as the color of separator, this color is the same as colorBorderSecondary but with transparency. | string |  |
| colorText | Default text color which comply with W3C standards, and this color is also the darkest neutral color. | string |  |
| colorTextSecondary | The second level of text color is generally used in scenarios where text color is not emphasized, such as label text, menu text selection state, etc. | string |  |
| fontFamily | The font family of Ant Design prioritizes the default interface font of the system, and provides a set of alternative font libraries that are suitable for screen display to maintain the readability and readability of the font under different platforms and browsers, reflecting the friendly, stable and professional characteristics. | string |  |
| fontSize | The most widely used font size in the design system, from which the text gradient will be derived. | number |  |
| fontSizeLG | Large font size | number |  |
| fontWeightStrong | Control the font weight of heading components (such as h1, h2, h3) or selected item. | number |  |
| lineHeight | Line height of text. | number |  |
| lineHeightLG | Line height of large text. | number |  |
| lineType | Border style of base components | string |  |
| lineWidth | Border width of base components | number |  |
| padding | Control the padding of the element. | number |  |
| paddingLG | Control the large padding of the element. | number |  |
| paddingSM | Control the small padding of the element. | number |  |
| paddingXS | Control the extra small padding of the element. | number |  |


