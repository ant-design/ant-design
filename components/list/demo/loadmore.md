---
order: 2
title:
  zh-CN: 加载更多
  en-US: loadmore 
---

## zh-CN

可通过 `loadMore` 属性实现加载更多功能。

## en-US

To show how to realize a loading more list with `loadMore` prop.

````jsx
import { List, Avatar, Button, Spin } from 'antd';

import reqwest from 'reqwest';

const fakeDataUrl = 'https://randomapi.com/api/dleyg4om?key=Z51U-D9OX-SXIO-SLJ9&fmt=raw&sole';

class BasicList extends React.Component {
  state = {
    loadingMore: false,
    showLoadingMore: true,
    data: [],
  }
  componentDidMount() {
    this.getData((res) => {
      this.setState({
        data: res,
      });
    });
  }
  getData = (callback) => {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: (res) => {
        callback(res);
      },
    });
  }
  onLoadMore = () => {
    this.setState({
      loadingMore: true,
    });
    this.getData((res) => {
      const data = this.state.data.concat(res);
      this.setState({
        data,
        loadingMore: false,
      });
    });
  }
  render() {
    const { loadingMore, showLoadingMore, data } = this.state;
    const loadMore = showLoadingMore ? (
      <div style={{ textAlign: 'center', marginTop: 8 }}>
        {loadingMore && <Spin />}
        {!loadingMore && <Button onClick={this.onLoadMore}>加载更多</Button>}
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
            <div>content</div>
          </List.Item>
        )}
      />
    );
  }
}

ReactDOM.render(<BasicList />, mountNode);
````
