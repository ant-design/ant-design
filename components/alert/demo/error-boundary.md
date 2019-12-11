---
order: 8
title:
  zh-CN: ErrorBoundary
  en-US: React 错误处理
---

## zh-CN

友好的 [React 错误处理](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html) 包裹组件。

## en-US

ErrorBoundary Component for making error handling easier in [React](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html).

```jsx
import { Button, Alert } from 'antd';

const { ErrorBoundary } = Alert;

class ThrowError extends React.Component {
  state = {
    error: null,
  };

  onClick = () => {
    this.setState({
      error: new Error('An Uncaught Error'),
    });
  };

  render() {
    const { error } = this.state;
    if (error) {
      throw error;
    }
    return (
      <Button type="danger" onClick={this.onClick}>
        Click me to throw a error
      </Button>
    );
  }
}

ReactDOM.render(
  <ErrorBoundary>
    <ThrowError />
  </ErrorBoundary>,
  mountNode,
);
```
