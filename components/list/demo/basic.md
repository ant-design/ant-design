---
order: 2
title:
  zh-CN: 基础列表 
  en-US: Basic
---

## zh-CN

基础列表。

## en-US

Basic List.

````jsx
import { List, Avatar, Button, Icon } from 'antd';

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

class BasicList extends React.Component {
  state = {
    loadingMore: false,
    showLoadingMore: true,
  }
  onLoadMore = () => {
    this.setState({
      loadingMore: true,
    });
  }
  render() {
    const { loadingMore, showLoadingMore } = this.state;
    const loadMore = showLoadingMore ? (
      <div style={{ textAlign: 'center', marginTop: 8 }}>
        <Button onClick={this.onLoadMore}>
          {loadingMore && (<span><Icon type="loading" /> 加载中...</span>)}
          {!loadingMore && (<span>加载更多</span>)}
        </Button>
      </div>
    ) : null;
    return (
      <List
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={data}
        renderItem={item => (
          <List.Item actions={[<a>编辑</a>, <a>更多</a>]}>
            <List.Item.Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={<a href="https://ant.design">{item.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
            <div>Content</div>
          </List.Item>
        )}
      />
    );
  }
}

ReactDOM.render(<BasicList />, mountNode);
````
