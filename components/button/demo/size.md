---
order: 2
title:
  zh-CN: 按钮尺寸
  en-US: Size
---

## zh-CN

按钮有大、中、小三种尺寸。

通过设置 `size` 为 `large` `small` 分别把按钮设为大、小尺寸。若不设置 `size`，则尺寸为中。

## en-US

Ant Design supports a default button size as well as a large and small size.

If a large or small button is desired, set the `size` property to either `large` or `small` respectively. Omit the `size` property for a button with the default size.

````jsx
import { Button, Radio, Icon } from 'antd';

class ButtonSize extends React.Component {
  state = {
    size: 'large',
  };

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  }

  render() {
    const size = this.state.size;
    return (
      <div>
        <Radio.Group value={size} onChange={this.handleSizeChange}>
          <Radio.Button value="large">Large</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="small">Small</Radio.Button>
        </Radio.Group>
        <br /><br />
        <Button type="primary" size={size}>Primary</Button>
        <Button size={size}>Normal</Button>
        <Button type="dashed" size={size}>Dashed</Button>
        <Button type="danger" size={size}>Danger</Button>
        <br />
        <Button type="primary" shape="circle" icon="download" size={size} />
        <Button type="primary" shape="round" icon="download" size={size}>Download</Button>
        <Button type="primary" icon="download" size={size}>Download</Button>
        <br />
        <Button.Group size={size}>
          <Button type="primary">
            <Icon type="left" />Backward
          </Button>
          <Button type="primary">
            Forward<Icon type="right" />
          </Button>
        </Button.Group>
      </div>
    );
  }
}

ReactDOM.render(<ButtonSize />, mountNode);
````
