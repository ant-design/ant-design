---
group: 反馈
category: Components
title: Result
subtitle: 结果
description: 用于反馈一系列操作任务的处理结果。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*-e2IRroDJyEAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*-0kxQrbHx2kAAAAAAAAAAAAADrJ8AQ/original
---

## 何时使用 {#when-to-use}

当有重要操作需告知用户处理结果，且反馈内容较为复杂时使用。

## 代码演示 {#examples}

### Success

成功的结果。

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

展示处理结果。

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

警告类型的结果。

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

你没有此页面的访问权限。

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

此页面未找到。

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

服务器发生了错误。

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

复杂的错误反馈。

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

### 自定义 icon

自定义 icon。

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

### 自定义语义结构的样式和类

通过 `classNames` 和 `styles` 传入对象/函数可以自定义 Result 的[语义化结构](#semantic-dom)样式。

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

通用属性参考：[通用属性](/docs/react/common-props)

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| classNames | 自定义组件内部各语义化结构的类名。支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), string> | - |  |
| extra | 操作区 | ReactNode | - |  |
| icon | 自定义 icon | ReactNode | - |  |
| status | 结果的状态，决定图标和颜色 | `success` \| `error` \| `info` \| `warning` \| `404` \| `403` \| `500` | `info` |
| styles | 自定义组件内部各语义化结构的内联样式。支持对象或函数 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| subTitle | subTitle 文字 | ReactNode | - |  |
| title | title 文字 | ReactNode | - |  |

## Semantic DOM

https://ant.design/components/result-cn/semantic.md

## 主题变量（Design Token）{#design-token}



## 组件 Token (Result)
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| extraMargin | 额外区域外间距 | Margin<string \| number> \| undefined | 24px 0 0 0 |
| iconFontSize | 图标大小 | number | 72 |
| subtitleFontSize | 副标题字体大小 | number | 14 |
| titleFontSize | 标题字体大小 | number | 24 |

## 全局 Token
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| colorError | 用于表示操作失败的 Token 序列，如失败按钮、错误状态提示（Result）组件等。 | string |  |
| colorFillAlter | 控制元素替代背景色。 | string |  |
| colorInfo | 用于表示操作信息的 Token 序列，如 Alert 、Tag、 Progress 等组件都有用到该组梯度变量。 | string |  |
| colorSuccess | 用于表示操作成功的 Token 序列，如 Result、Progress 等组件会使用该组梯度变量。 | string |  |
| colorTextDescription | 控制文本描述字体颜色。 | string |  |
| colorTextHeading | 控制标题字体颜色。 | string |  |
| colorWarning | 用于表示操作警告的 Token 序列，如 Notification、 Alert等警告类组件或 Input 输入类等组件会使用该组梯度变量。 | string |  |
| lineHeight | 文本行高 | number |  |
| lineHeightHeading3 | h3 标签所使用的行高 | number |  |
| marginXS | 控制元素外边距，小尺寸。 | number |  |
| padding | 控制元素的内间距。 | number |  |
| paddingLG | 控制元素的大内间距。 | number |  |
| paddingXL | 控制元素的特大内间距。 | number |  |
| paddingXS | 控制元素的特小内间距。 | number |  |


