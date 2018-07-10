---
order: 1
title:
  zh-CN: 基础列表样例
  en-US: Basic List Sample
---

## zh-CN

在基础列表组件中使用加载占位符。

## en-US

Use skeleton in basic list component.

````jsx
import { Skeleton, Switch, List, Avatar } from 'antd';

const listData = [];
for (let i = 0; i < 9; i++) {
  listData.push({
    title: `ant design ${i}`,
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  });
}

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

        <List
          itemLayout="horizontal"
          dataSource={listData}
          renderItem={item => (
            <List.Item>
              <Skeleton avatar title={false} loading={loading}>
                <List.Item.Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={item.title}
                  description={item.description}
                />
              </Skeleton>
            </List.Item>
          )}
        />
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
