---
group: Feedback
category: Components
title: Result
description: Used to feedback the processing results of a series of operations.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*-e2IRroDJyEAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*-0kxQrbHx2kAAAAAAAAAAAAADrJ8AQ/original
---

## When To Use

Use when important operations need to inform the user to process the results and the feedback is more complicated.

## Examples

### Success

Show successful results.

```tsx
import React from 'react';
import { Button, Result } from 'antd';

const App: React.FC = () => (
  <Result
    status="success"
    title="Successfully Purchased Cloud Server ECS!"
    subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
    extra={[
      <Button type="primary" key="console">
        Go Console
      </Button>,
      <Button key="buy">Buy Again</Button>,
    ]}
  />
);

export default App;
```

### Info

Show processing results.

```tsx
import React from 'react';
import { Button, Result } from 'antd';

const App: React.FC = () => (
  <Result
    title="Your operation has been executed"
    extra={
      <Button type="primary" key="console">
        Go Console
      </Button>
    }
  />
);

export default App;
```

### Warning

The result of the warning.

```tsx
import React from 'react';
import { Button, Result } from 'antd';

const App: React.FC = () => (
  <Result
    status="warning"
    title="There are some problems with your operation."
    extra={
      <Button type="primary" key="console">
        Go Console
      </Button>
    }
  />
);

export default App;
```

### 403

you are not authorized to access this page.

```tsx
import React from 'react';
import { Button, Result } from 'antd';

const App: React.FC = () => (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={<Button type="primary">Back Home</Button>}
  />
);

export default App;
```

### 404

The page you visited does not exist.

```tsx
import React from 'react';
import { Button, Result } from 'antd';

const App: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary">Back Home</Button>}
  />
);

export default App;
```

### 500

Something went wrong on server.

```tsx
import React from 'react';
import { Button, Result } from 'antd';

const App: React.FC = () => (
  <Result
    status="500"
    title="500"
    subTitle="Sorry, something went wrong."
    extra={<Button type="primary">Back Home</Button>}
  />
);

export default App;
```

### Error

Complex error feedback.

```css
.site-result-demo-error-icon {
  color: red;
}
```

```tsx
import React from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Result, Typography } from 'antd';

const { Paragraph, Text } = Typography;

const App: React.FC = () => (
  <Result
    status="error"
    title="Submission Failed"
    subTitle="Please check and modify the following information before resubmitting."
    extra={[
      <Button type="primary" key="console">
        Go Console
      </Button>,
      <Button key="buy">Buy Again</Button>,
    ]}
  >
    <div className="desc">
      <Paragraph>
        <Text
          strong
          style={{
            fontSize: 16,
          }}
        >
          The content you submitted has the following error:
        </Text>
      </Paragraph>
      <Paragraph>
        <CloseCircleOutlined className="site-result-demo-error-icon" /> Your account has been
        frozen. <a>Thaw immediately &gt;</a>
      </Paragraph>
      <Paragraph>
        <CloseCircleOutlined className="site-result-demo-error-icon" /> Your account is not yet
        eligible to apply. <a>Apply Unlock &gt;</a>
      </Paragraph>
    </div>
  </Result>
);

export default App;
```

### Custom icon

Custom icon.

```tsx
import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';

const App: React.FC = () => (
  <Result
    icon={<SmileOutlined />}
    title="Great, we have done all the operations!"
    extra={<Button type="primary">Next</Button>}
  />
);

export default App;
```

### Custom semantic dom styling

You can customize the [semantic dom](#semantic-dom) style of Result by passing objects/functions through `classNames` and `styles`.

```tsx
import React from 'react';
import { Button, Result } from 'antd';
import type { ResultProps } from 'antd';

const classNamesObject: ResultProps['classNames'] = {
  root: 'demo-result-root',
  title: 'demo-result-title',
  subTitle: 'demo-result-subtitle',
  icon: 'demo-result-icon',
  extra: 'demo-result-extra',
  body: 'demo-result-body',
};

const classNamesFn: ResultProps['classNames'] = (info) => {
  if (info.props.status === 'success') {
    return {
      root: 'demo-result-root--success',
    } satisfies ResultProps['classNames'];
  }
  return {
    root: 'demo-result-root--default',
  } satisfies ResultProps['classNames'];
};

const stylesObject: ResultProps['styles'] = {
  root: { borderWidth: 2, borderStyle: 'dashed', padding: 16 },
  title: { fontStyle: 'italic', color: '#1890ff' },
  subTitle: { fontWeight: 'bold' },
  icon: { opacity: 0.8 },
  extra: { backgroundColor: '#f0f0f0', padding: 8 },
  body: { backgroundColor: '#fafafa', padding: 12 },
};

const stylesFn: ResultProps['styles'] = (info) => {
  if (info.props.status === 'error') {
    return {
      root: { backgroundColor: '#fff2f0', borderColor: '#ff4d4f' },
      title: { color: '#ff4d4f' },
    } satisfies ResultProps['styles'];
  } else {
    return {
      root: { backgroundColor: '#f6ffed', borderColor: '#52c41a' },
      title: { color: '#52c41a' },
    } satisfies ResultProps['styles'];
  }
};

const App: React.FC = () => {
  return (
    <>
      <Result
        status="info"
        title="classNames Object"
        subTitle="This is a subtitle"
        styles={stylesObject}
        classNames={classNamesObject}
        extra={<Button type="primary">Action</Button>}
      >
        <div>Content area</div>
      </Result>
      <Result
        status="success"
        title="classNames Function"
        subTitle="Dynamic class names"
        styles={stylesFn}
        classNames={classNamesFn}
        extra={<Button>Action</Button>}
      />
    </>
  );
};

export default App;
```



## API

Common props ref：[Common props](/docs/react/common-props)

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| classNames | Customize class for each semantic structure inside the component. Supports object or function | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), string> | - |  |
| extra | Operating area | ReactNode | - |  |
| icon | Custom back icon | ReactNode | - |  |
| status | Result status, decide icons and colors | `success` \| `error` \| `info` \| `warning` \| `404` \| `403` \| `500` | `info` |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| subTitle | The subTitle | ReactNode | - |  |
| title | The title | ReactNode | - |  |

## Semantic DOM

https://ant.design/components/result/semantic.md

## Design Token



## Component Token (Result)
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| extraMargin | Margin of extra area | Margin<string \| number> \| undefined | 24px 0 0 0 |
| iconFontSize | Icon size | number | 72 |
| subtitleFontSize | Subtitle font size | number | 14 |
| titleFontSize | Title font size | number | 24 |

## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| colorError | Used to represent the visual elements of the operation failure, such as the error Button, error Result component, etc. | string |  |
| colorFillAlter | Control the alternative background color of element. | string |  |
| colorInfo | Used to represent the operation information of the Token sequence, such as Alert, Tag, Progress, and other components use these map tokens. | string |  |
| colorSuccess | Used to represent the token sequence of operation success, such as Result, Progress and other components will use these map tokens. | string |  |
| colorTextDescription | Control the font color of text description. | string |  |
| colorTextHeading | Control the font color of heading. | string |  |
| colorWarning | Used to represent the warning map token, such as Notification, Alert, etc. Alert or Control component(like Input) will use these map tokens. | string |  |
| lineHeight | Line height of text. | number |  |
| lineHeightHeading3 | Line height of h3 tag. | number |  |
| marginXS | Control the margin of an element, with a small size. | number |  |
| padding | Control the padding of the element. | number |  |
| paddingLG | Control the large padding of the element. | number |  |
| paddingXL | Control the extra large padding of the element. | number |  |
| paddingXS | Control the extra small padding of the element. | number |  |


