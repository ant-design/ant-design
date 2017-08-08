---
order: 8
title:
  zh-CN: 带页签的卡片
  en-US: With tabs
---

## zh-CN

可承载更多内容。

## en-US

More content can be hosted.

````jsx
import { Card } from 'antd';

const tabList = [{
  key: 'tab1',
  tab: 'tab1',
}, {
  key: 'tab2',
  tab: 'tab2',
}];

const contentList = {
  tab1: <p>content1</p>,
  tab2: <p>content2</p>,
};

class TabsCard extends React.Component {
  state = {
    key: 'tab1',
  }
  onTabChange = (key) => {
    this.setState({ key });
  }
  render() {
    return (
      <Card
        style={{ width: 300 }}
        title="Card title"
        extra={<a href="#">More</a>}
        tabList={tabList}
        onTabChange={this.onTabChange}
      >
        {contentList[this.state.key]}
      </Card>
    );
  }
}

ReactDOM.render(
  <TabsCard />
, mountNode);
````
