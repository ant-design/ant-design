# Result — 结果

## 功能概述

用于反馈一系列操作任务的处理结果。

## 输入字段

### 必填

- `status`: string，结果状态，可选 `success` | `error` | `info` | `warning` | `404` | `403` | `500`。

### 可选

- `title`: ReactNode，标题。
- `subTitle`: ReactNode，副标题。
- `icon`: ReactNode，自定义图标。
- `extra`: ReactNode，操作区。
- `children`: ReactNode，自定义内容区。

## 使用建议

操作成功/失败反馈使用 Result；配合 extra 提供后续操作；页面级错误使用 404/403/500 状态。

## 示例代码

```tsx
import { CloseCircleOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Result, Typography } from 'antd';

const { Paragraph, Text } = Typography;

const App: React.FC = () => (
  <>
    {/* 成功 */}
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

    {/* 失败 */}
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

    {/* 信息 */}
    <Result
      title="Your operation has been executed"
      extra={<Button type="primary">Go Console</Button>}
    />

    {/* 警告 */}
    <Result
      status="warning"
      title="There are some problems with your operation."
      extra={<Button type="primary">Go Console</Button>}
    />

    {/* 404 */}
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary">Back Home</Button>}
    />

    {/* 403 */}
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={<Button type="primary">Back Home</Button>}
    />

    {/* 500 */}
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={<Button type="primary">Back Home</Button>}
    />

    {/* 自定义图标 */}
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
