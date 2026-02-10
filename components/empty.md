---
category: Components
group: Data Display
title: Empty
description: Empty state placeholder.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*ZdiZSLzEV0wAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*obM7S5lIxeMAAAAAAAAAAAAADrJ8AQ/original
---

## When To Use

- When there is no data provided, display for friendly tips.
- User tutorial to create something in fresh new situation.

## Examples

### Basic

Simplest Usage.

```tsx
import React from 'react';
import { Empty } from 'antd';

const App: React.FC = () => <Empty />;

export default App;
```

### Choose image

You can choose another style of `image` by setting image to `Empty.PRESENTED_IMAGE_SIMPLE`.

```tsx
import React from 'react';
import { Empty } from 'antd';

const App: React.FC = () => <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;

export default App;
```

### Customize

Customize image source, image size, description and extra content.

```tsx
import React from 'react';
import { Button, Empty, Typography } from 'antd';

const App: React.FC = () => (
  <Empty
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    styles={{ image: { height: 60 } }}
    description={
      <Typography.Text>
        Customize <a href="#API">Description</a>
      </Typography.Text>
    }
  >
    <Button type="primary">Create Now</Button>
  </Empty>
);

export default App;
```

### ConfigProvider

Use ConfigProvider set global Empty style.

```tsx
import React, { useState } from 'react';
import { SmileOutlined } from '@ant-design/icons';
import {
  Cascader,
  ConfigProvider,
  Divider,
  List,
  Select,
  Space,
  Switch,
  Table,
  Transfer,
  TreeSelect,
} from 'antd';

const customizeRenderEmpty = () => (
  <div style={{ textAlign: 'center' }}>
    <SmileOutlined style={{ fontSize: 20 }} />
    <p>Data Not Found</p>
  </div>
);

const style: React.CSSProperties = { width: 200 };

const App: React.FC = () => {
  const [customize, setCustomize] = useState(true);
  return (
    <>
      <Switch
        unCheckedChildren="default"
        checkedChildren="customize"
        checked={customize}
        onChange={setCustomize}
      />
      <Divider />
      <ConfigProvider renderEmpty={customize ? customizeRenderEmpty : undefined}>
        <Space vertical style={{ width: '100%' }}>
          <h4>Select</h4>
          <Select style={style} />
          <h4>TreeSelect</h4>
          <TreeSelect style={style} treeData={[]} />
          <h4>Cascader</h4>
          <Cascader style={style} options={[]} showSearch />
          <h4>Transfer</h4>
          <Transfer />
          <h4>Table</h4>
          <Table
            style={{ marginTop: 8 }}
            columns={[
              { title: 'Name', dataIndex: 'name', key: 'name' },
              { title: 'Age', dataIndex: 'age', key: 'age' },
            ]}
          />
          <h4>List</h4>
          <List />
        </Space>
      </ConfigProvider>
    </>
  );
};

export default App;
```

### Custom semantic dom styling

You can customize the [semantic dom](#semantic-dom) style of Empty by passing objects/functions through `classNames` and `styles`.

```tsx
import React from 'react';
import { Button, Empty, Flex } from 'antd';
import { createStaticStyles } from 'antd-style';

import type { EmptyProps } from '..';

const emptySharedProps: EmptyProps = {
  image: Empty.PRESENTED_IMAGE_SIMPLE,
  children: <Button type="primary">Create Now</Button>,
};

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    border: 1px dashed #ccc;
    padding: 16px;
  `,
}));

const stylesObject: EmptyProps['styles'] = {
  root: { backgroundColor: '#f5f5f5', borderRadius: '8px' },
  image: { filter: 'grayscale(100%)' },
  description: { color: '#1890ff', fontWeight: 'bold' },
  footer: { marginTop: '16px' },
};

const stylesFn: EmptyProps['styles'] = ({ props }) => {
  if (props.description) {
    return {
      root: { backgroundColor: '#e6f7ff', border: '1px solid #91d5ff' },
      description: { color: '#1890ff', fontWeight: 'bold' },
      image: { filter: 'hue-rotate(180deg)' },
    } satisfies EmptyProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const emptyClassNames: EmptyProps['classNames'] = {
    root: classNames.root,
  };

  return (
    <Flex vertical gap="middle">
      <Empty
        {...emptySharedProps}
        description="Object styles"
        classNames={emptyClassNames}
        styles={stylesObject}
      />
      <Empty
        {...emptySharedProps}
        description="Function styles"
        classNames={emptyClassNames}
        styles={stylesFn}
      />
    </Flex>
  );
};

export default App;
```

### No description

Simplest Usage with no description.

```tsx
import React from 'react';
import { Empty } from 'antd';

const App: React.FC = () => <Empty description={false} />;

export default App;
```


## API

Common props ref：[Common props](/docs/react/common-props)

```jsx
<Empty>
  <Button>Create</Button>
</Empty>
```

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| description | Customize description | ReactNode | - |  |
| image | Customize image. Will treat as image url when string provided | ReactNode | `Empty.PRESENTED_IMAGE_DEFAULT` |  |
| imageStyle | The style of image | CSSProperties | - |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |

## Built-in images

- Empty.PRESENTED_IMAGE_SIMPLE

  <div class="site-empty-buildIn-img site-empty-buildIn-simple"><div>

- Empty.PRESENTED_IMAGE_DEFAULT

  <div class="site-empty-buildIn-img site-empty-buildIn-default"></div>

<style>
  .site-empty-buildIn-img {
    background-repeat: no-repeat;
    background-size: contain;
  }
  .site-empty-buildIn-simple {
    width: 55px;
    height: 35px;
    background-image: url("https://user-images.githubusercontent.com/507615/54591679-b0ceb580-4a65-11e9-925c-ad15b4eae93d.png");
  }
  .site-empty-buildIn-default {
    width: 121px;
    height: 116px;
    background-image: url("https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png");
  }
</style>

## Semantic DOM

https://ant.design/components/empty/semantic.md

## Design Token



## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| colorTextDescription | Control the font color of text description. | string |  |
| controlHeightLG | LG component height | number |  |
| fontSize | The most widely used font size in the design system, from which the text gradient will be derived. | number |  |
| lineHeight | Line height of text. | number |  |
| margin | Control the margin of an element, with a medium size. | number |  |
| marginXL | Control the margin of an element, with an extra-large size. | number |  |
| marginXS | Control the margin of an element, with a small size. | number |  |
| opacityImage | Control image opacity | number |  |


