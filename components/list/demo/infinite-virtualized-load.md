---
order: 6
title:
  zh-CN: Virtualized 无限加载
  en-US: infinite VirtualizedExample load
---

## zh-CN

结合 [react-virtualized](https://github.com/bvaughn/react-virtualized) 实现 virtualized 和 infinite。

## en-US

The example of infinite & virtualized load with [react-virtualized](https://github.com/bvaughn/react-virtualized).

````jsx
import { List, message, Avatar, Spin } from 'antd';

import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import VList from 'react-virtualized/dist/commonjs/List';
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';

let countId = 1;

function mockData() {
  const data = [];
  for (let i = 0; i < 5; i++) {
    const id = countId;
    data.push({
      id: `id-${id}`,
      title: `List Item Title ${id}`,
      content: `List Item Content ${id}`,
    });
    countId++;
  }
  return data;
}

class VirtualizedExample extends React.Component {
  state = {
    data: mockData(),
    loading: false,
  }
  loadedRowsMap = {}
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
      message.warning('Loaded All');
      this.setState({
        loading: false,
      });
      return;
    }
    // mock delay
    setTimeout(() => {
      data = data.concat(mockData());
      this.setState({
        data,
        loading: false,
      });
    }, 2000);
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
