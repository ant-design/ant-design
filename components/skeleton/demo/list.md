---
order: 0
title:
  zh-CN: 基本使用
  en-US: Basic Usage
---

## zh-CN

在卡片组件中使用加载占位符。

## en-US

Use skeleton in card component.

````jsx
import { Skeleton, Switch, Card, Icon, Avatar } from 'antd';

const { Meta } = Card;

class App extends React.Component {
  state = {
    loading: true,
  }

  onChange = (checked) => {
    this.setState({ loading: !checked });
  }

  render() {
    const { loading } = this.state;

    return (
      <div>
        <Switch checked={!loading} onChange={this.onChange} />

        <Card
          style={{ width: 300, marginTop: 16 }}
          actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
        >
          <Skeleton loading={loading} avatar>
            <Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title="Card title"
              description="This is the description"
            />
          </Skeleton>
        </Card>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
````

<style>
.skeleton-demo {
  border: 1px solid #f4f4f4;
}
</style>
