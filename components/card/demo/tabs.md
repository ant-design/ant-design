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

```jsx
import React, { useState } from 'react';
import { Card } from 'antd';

const tabList = [
  {
    key: 'tab1',
    tab: 'tab1',
  },
  {
    key: 'tab2',
    tab: 'tab2',
  },
];

const contentList = {
  tab1: <p>content1</p>,
  tab2: <p>content2</p>,
};

const tabListNoTitle = [
  {
    key: 'article',
    tab: 'article',
  },
  {
    key: 'app',
    tab: 'app',
  },
  {
    key: 'project',
    tab: 'project',
  },
];

const contentListNoTitle = {
  article: <p>article content</p>,
  app: <p>app content</p>,
  project: <p>project content</p>,
};

const TabsCard = () => {
  const [activeTabKey1, setActiveTabKey1] = useState('tab1');
  const [activeTabKey2, setActiveTabKey2] = useState('app');

  const onTab1Change = key => {
    setActiveTabKey1(key);
  };
  const onTab2Change = key => {
    setActiveTabKey2(key);
  };

  return (
    <>
      <Card
        style={{ width: '100%' }}
        title="Card title"
        extra={<a href="#">More</a>}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={key => {
          onTab1Change(key);
        }}
      >
        {contentList[activeTabKey1]}
      </Card>
      <br />
      <br />
      <Card
        style={{ width: '100%' }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey2}
        tabBarExtraContent={<a href="#">More</a>}
        onTabChange={key => {
          onTab2Change(key);
        }}
      >
        {contentListNoTitle[activeTabKey2]}
      </Card>
    </>
  );
};

ReactDOM.render(<TabsCard />, mountNode);
```
