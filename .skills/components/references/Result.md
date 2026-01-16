# Result — 结果

## 功能概述

用于反馈一系列操作任务的处理结果。

## 应用场景

- 当有重要操作需告知用户处理结果，且反馈内容较为复杂时使用。

## 输入字段

### Result 属性

#### 必填

- 无必填属性。

#### 可选

- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props }) => Record<[SemanticDOM](#semantic-dom), string>，自定义组件内部各语义化结构的类名。支持对象或函数。
- `extra`: ReactNode，操作区。
- `icon`: ReactNode，自定义 icon。
- `status`: `success` | `error` | `info` | `warning` | `404` | `403` | `500`，结果的状态，决定图标和颜色，默认 `info`。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props }) => Record<[SemanticDOM](#semantic-dom), CSSProperties>，自定义组件内部各语义化结构的内联样式。支持对象或函数。
- `subTitle`: ReactNode，subTitle 文字。
- `title`: ReactNode，title 文字。

## 方法

无公开方法。

## 使用建议

操作成功/失败反馈使用 Result；配合 extra 提供后续操作；页面级错误使用 404/403/500 状态。

## 示例代码

```tsx
import { CloseCircleOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Result, Typography } from 'antd';

const { Paragraph, Text } = Typography;

const App: React.FC = () => (
  <>
    <Result
      status="success"
      title="Successfully Purchased Cloud Server ECS!"
      subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes."
      extra={[
        <Button type="primary" key="console">
          Go Console
        </Button>,
        <Button key="buy">Buy Again</Button>,
      ]}
    />

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
      <div>
        <Paragraph>
          <Text strong style={{ fontSize: 16 }}>
            The content you submitted has the following error:
          </Text>
        </Paragraph>
        <Paragraph>
          <CloseCircleOutlined style={{ color: 'red' }} /> Your account has been frozen.
        </Paragraph>
        <Paragraph>
          <CloseCircleOutlined style={{ color: 'red' }} /> Your account is not yet eligible.
        </Paragraph>
      </div>
    </Result>

    <Result
      title="Your operation has been executed"
      extra={<Button type="primary">Go Console</Button>}
    />

    <Result
      status="warning"
      title="There are some problems with your operation."
      extra={<Button type="primary">Go Console</Button>}
    />

    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary">Back Home</Button>}
    />

    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={<Button type="primary">Back Home</Button>}
    />

    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={<Button type="primary">Back Home</Button>}
    />

    <Result
      icon={<SmileOutlined />}
      title="Great, we have done all the operations!"
      extra={<Button type="primary">Next</Button>}
    />
  </>
);
```

## 返回结果

渲染一个结果反馈组件，用于展示操作结果。
