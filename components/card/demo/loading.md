---
order: 5
title:
  zh-CN: 预加载的卡片
  en-US: Loading card
---

## zh-CN

数据读入前会有文本块样式。

## en-US

Shows a loading indicator while the contents of the card is being fetched.

````jsx
import { Card, Button } from 'antd';

class LoadingCard extends React.Component {
  state = {
    loading: true,
  }

  handleClick = () => {
    this.setState({ loading: !this.state.loading });
  }

  render() {
    return (
      <div>
        <Card loading={this.state.loading} title="Card title">
          Whatever content
        </Card>
        <Button onClick={this.handleClick} style={{ marginTop: 16 }}>Toggle loading</Button>
      </div>
    );
  }
}

ReactDOM.render(
  <LoadingCard />
, mountNode);
````
