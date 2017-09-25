---
order: 6
title:
  zh-CN: 滚动加载无限长列表
  en-US: Infinite virtualized List
---

## zh-CN

结合 [react-virtualized](https://github.com/bvaughn/react-virtualized) 实现滚动加载无限长列表，带有虚拟化（[virtualization](https://blog.jscrambler.com/optimizing-react-rendering-through-virtualization/)）功能，能够提高数据量大时候长列表的性能。

## en-US

The example of infinite & virtualized load with [react-virtualized](https://github.com/bvaughn/react-virtualized).

````jsx
import { List, message, Avatar, Spin } from 'antd';

import reqwest from 'reqwest';

import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import VList from 'react-virtualized/dist/commonjs/List';
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';

const fakeDataUrl = 'https://randomapi.com/api/dleyg4om?key=Z51U-D9OX-SXIO-SLJ9&fmt=raw&sole';

class VirtualizedExample extends React.Component {
  state = {
    data: [],
    loading: false,
  }
  loadedRowsMap = {}
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
  componentWillMount() {
    this.getData((res) => {
      this.setState({
        data: res,
      });
    });
  }
  handleInfiniteOnLoad = ({ startIndex, stopIndex }) => {
    let data = this.state.data;
    this.setState({
      loading: true,
    });
    for (let i = startIndex; i <= stopIndex; i++) {
      // 1 means loading
      this.loadedRowsMap[i] = 1;
    }
    if (data.length > 19) {
      message.warning('Virtualized List loaded all');
      this.setState({
        loading: false,
      });
      return;
    }
    this.getData((res) => {
      data = data.concat(res);
      this.setState({
        data,
        loading: false,
      });
    });
  }
  isRowLoaded = ({ index }) => {
    return !!this.loadedRowsMap[index];
  }
  renderItem = ({ index, key, style }) => {
    const { data } = this.state;
    const item = data[index];
    return (
      <List.Item key={key} style={style}>
        <List.Item.Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={<a href="https://ant.design">{item.title}</a>}
          description={item.content}
        />
        <div style={{ padding: 24 }}>Content</div>
      </List.Item>
    );
  }
  render() {
    const { data } = this.state;
    const vlist = ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered, width }) => (
      <VList
        autoHeight
        height={height}
        isScrolling={isScrolling}
        onScroll={onChildScroll}
        overscanRowCount={2}
        rowCount={data.length}
        rowHeight={117}
        rowRenderer={this.renderItem}
        onRowsRendered={onRowsRendered}
        scrollTop={scrollTop}
        width={width}
      />
    );
    const autoSize = ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered }) => (
      <AutoSizer disableHeight>
        {({ width }) => vlist({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered, width })}
      </AutoSizer>
    );
    const infiniteLoader = ({ height, isScrolling, onChildScroll, scrollTop }) => (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.handleInfiniteOnLoad}
        rowCount={data.length}
      >
        {({ onRowsRendered }) => autoSize({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered })}
      </InfiniteLoader>
    );
    return (
      <List>
        <WindowScroller scrollElement={null}>
          {infiniteLoader}
        </WindowScroller>
        {this.state.loading && <Spin style={{ position: 'absolute', bottom: 0, left: '50%' }} />}
      </List>
    );
  }
}

ReactDOM.render(<VirtualizedExample />, mountNode);
````
