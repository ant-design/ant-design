---
order: 22
title:
  zh-CN: 已隐藏已选中
  en-US: Hide Already Selected
---

## zh-CN

隐藏下拉列表中已选择的选项。

## en-US

Hide already selected options in the dropdown.

````jsx
import { Select } from 'antd';

const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];

class SelectWithHiddenSelectedOptions extends React.Component {
  state = {
    selectedItems: [],
  };

  handleChange = selectedItems => {
    this.setState({ selectedItems });
  };

  render() {
    const { selectedItems } = this.state;
    const filteredOptions = OPTIONS.filter(o => !selectedItems.includes(o));
    return (
      <Select
        mode="multiple"
        placeholder="Inserted are removed"
        value={selectedItems}
        onChange={this.handleChange}
        style={{ width: '100%' }}
      >
        {filteredOptions.map(o => (
          <Select.Option key={o} value={o}>
            {o}
          </Select.Option>
        ))}
      </Select>
    );
  }
}

ReactDOM.render(<SelectWithHiddenSelectedOptions />, mountNode);
````
