---
order: 1
title:
  zh-CN: 包含子组件
  en-US: Contains sub component
---

## zh-CN

加载占位图包含子组件

## en-US

Skeleton contains sub component

````jsx
import { Skeleton, Button } from 'antd';

class Demo extends React.Component {
  state = {
    loading: false,
  };

  showSkeleton = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 3000);
  };

  render() {
    return (
      <Skeleton loading={this.state.loading} active>
        <Button onClick={this.showSkeleton}>Show Skeleton</Button>
      </Skeleton>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
````
