---
order: 4
title:
  zh-CN: 附加内容
  en-US: Extra content
---

## zh-CN

可以在页签两边添加附加操作。

## en-US

You can add extra actions to the right or left or even both side of Tabs.

```jsx
import { Tabs, Button, Divider, Checkbox } from 'antd';

const { TabPane } = Tabs;

const CheckboxGroup = Checkbox.Group;

const operations = <Button>Extra Action</Button>;

const OperationsSlot = {
  left: <Button style={{ marginRight: 15 }}>Left Extra Action</Button>,
  right: <Button>Right Extra Action</Button>,
};

const options = ['left', 'right'];

const Demo = () => {
  const [position, setPosition] = React.useState(['left', 'right']);

  const slot = React.useMemo(() => {
    if (position.length === 0) return null;

    return position.reduce(
      (acc, direction) => ({ ...acc, [direction]: OperationsSlot[direction] }),
      {},
    );
  }, [position]);

  return (
    <>
      <Tabs tabBarExtraContent={operations}>
        <TabPane tab="Tab 1" key="1">
          Content of tab 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of tab 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of tab 3
        </TabPane>
      </Tabs>
      <br />
      <br />
      <br />
      <div>You can also specify its direction or both side</div>
      <Divider />
      <CheckboxGroup
        options={options}
        value={positon}
        onChange={value => {
          setPosition(value);
        }}
      />
      <br />
      <br />
      <Tabs tabBarExtraContent={slot}>
        <TabPane tab="Tab 1" key="1">
          Content of tab 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of tab 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of tab 3
        </TabPane>
      </Tabs>
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```
