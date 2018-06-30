---
order: 5
title:
  zh-CN: 多层抽屉
  en-US: Multi-level drawer
---

## zh-CN

在抽屉内打开新的抽屉，用以解决多分支任务的复杂状况。

## en-US

Open a new drawer on top of an existing drawer to handle multi branch tasks

```jsx
import { Drawer, List, Form, Button, Input, Tag } from 'antd';

const vegetables = ['asparagus', 'bamboo', 'potato', 'carrot', 'cilantro', 'potato', 'eggplant'];

const TagList = ({ value, onChange, show }) => {
  return (
    <div>
      {value.map(item => {
        return <Tag>{item}</Tag>;
      })}
      <Tag onClick={() => show()}>+</Tag>
    </div>
  );
};

class App extends React.Component {
  state = { visible: false, childrenDrawer: false };
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };
  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  showChildrenDrawer = () => {
    this.setState({
      childrenDrawer: true,
    });
  };
  onChildrenDrawerClose = () => {
    this.setState({
      childrenDrawer: false,
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          New Cookbook
        </Button>
        <Drawer
          title="Cookbook"
          width={520}
          closable={false}
          onClose={this.onClose}
          wrapperClassName="cookbook"
          visible={this.state.visible}
        >
          <Form hideRequiredMark>
            <Form.Item label="Name">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'please enter cookbook name' }],
              })(<Input placeholder="please enter cookbook name" />)}
            </Form.Item>
            <Form.Item label="Food">
              {getFieldDecorator('Food', {
                rules: [{ required: true, message: 'please enter food' }],
                initialValue: ['potato', 'eggplant'],
              })(<TagList show={this.showChildrenDrawer} />)}
            </Form.Item>
          </Form>
          <Drawer
            title="Food"
            width={320}
            closable={false}
            wrapperClassName="cookbook_children"
            onClose={this.onChildrenDrawerClose}
            visible={this.state.childrenDrawer}
            levelMove={250}
            level=".cookbook"
          >
            <List
              size="small"
              header={<div>Vegetables</div>}
              dataSource={vegetables}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Drawer>
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e8e8e8',
              padding: '10px 16px',
              textAlign: 'right',
              left: 0,
              background: '#fff',
              borderRadius: '0 0 4px 4px',
            }}
          >
            <Button
              style={{
                marginRight: 8,
              }}
              onClick={this.onClose}
            >
              Cancel
            </Button>
            <Button onClick={this.onClose} type="primary">
              Submit
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}
const WarpApp = Form.create()(App);

ReactDOM.render(<WarpApp />, mountNode);
```

<style>
#_hj_feedback_container{
  display:none
}
.cookbook,.cookbook_children{
   position: fixed;
   top: 0;
   width: 100%;
   height: 100%;
   z-index: 9999;
   pointer-events: none;
}
</style>
