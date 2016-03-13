# 可以自定义显示

- order: 1

切换按钮和结果分开。

---

````jsx
import { Cascader } from 'antd';

const options = [{
  value: 'zhejiang',
  label: '浙江',
  children: [{
    value: 'hangzhou',
    label: '杭州',
  }],
}, {
  value: 'jiangsu',
  label: '江苏',
  children: [{
    value: 'nanjing',
    label: '南京',
  }],
}];

class CitySwitcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '未选择',
    };
  }
  onChange(value, selectedOptions) {
    this.setState({
      text: selectedOptions.map(o => o.label).join(', '),
    });
  }
  render() {
    return (
      <span>
        {this.state.text}
        &nbsp;
        <Cascader options={options} onChange={this.onChange.bind(this)}>
          <a href="#">切换城市</a>
        </Cascader>
      </span>
    );
  }
}

ReactDOM.render(<CitySwitcher />, mountNode);
````
