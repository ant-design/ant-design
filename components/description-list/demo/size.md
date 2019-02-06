---
order: 0
title:
  zh-CN: 自定义尺寸
  en-US: Custom size
---

## zh-CN

自定义尺寸，适应在各种容器中展示

## en-US

Custom sizes to fit in a variety of containers

```jsx
import { DescriptionList, Radio } from 'antd';

const RadioGroup = Radio.Group;

const DescriptionListItem = DescriptionList.Item;

class Demo extends React.Component {
  state = {
    size: 'default',
  };

  onChange = e => {
    console.log('size checked', e.target.value);
    this.setState({
      size: e.target.value,
    });
  };
  
  render() {
    return (
      <div>
        <RadioGroup onChange={this.onChange} value={this.state.size}>
          <Radio value="default">default</Radio>
          <Radio value="middle">middle</Radio>
          <Radio value="small">small</Radio>
        </RadioGroup>
        <br />
        <br />
        <DescriptionList title="Custom Size" border size={this.state.size}>
          <DescriptionListItem label="Product">
            Cloud Database
          </DescriptionListItem>
          <DescriptionListItem label="Billing">Prepaid</DescriptionListItem>
          <DescriptionListItem label="time">18:00:00</DescriptionListItem>
          <DescriptionListItem label="Amount">$80.00</DescriptionListItem>
          <DescriptionListItem label="Discount">$20.00</DescriptionListItem>
          <DescriptionListItem label="Official">$60.00</DescriptionListItem>
          <DescriptionListItem label="Info">
            Data disk type: MongoDB
            <br />
            Database version: 3.4
            <br />
            Package: dds.mongo.mid
            <br />
            Storage space: 10 GB
            <br />
            Replication_factor:3
            <br />
            Region: East China 1<br />
          </DescriptionListItem>
        </DescriptionList>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);

```
