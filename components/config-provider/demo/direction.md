---
order: 2
title:
  zh-CN: 方向
  en-US: Direction
---

## zh-CN

这里列出了支持 `rtl` 方向的组件，您可以在演示中切换方向。

## en-US

Components which support rtl direction are listed here, you can toggle the direction in the demo.

```jsx
import { ConfigProvider, Cascader, Radio, Icon } from 'antd';

const cascaderOptions = [
  {
    value: 'tehran',
    label: 'تهران',
    children: [
      {
        value: 'tehran-c',
        label: 'تهران',
        children: [
          {
            value: 'saadat-abad',
            label: 'سعادت آیاد',
          },
        ],
      },
    ],
  },
  {
    value: 'ardabil',
    label: 'اردبیل',
    children: [
      {
        value: 'ardabil-c',
        label: 'اردبیل',
        children: [
          {
            value: 'primadar',
            label: 'پیرمادر',
          },
        ],
      },
    ],
  },
  {
    value: 'gilan',
    label: 'گیلان',
    children: [
      {
        value: 'rasht',
        label: 'رشت',
        children: [
          {
            value: 'district-3',
            label: 'منطقه ۳',
          },
        ],
      },
    ],
  },
];

class Page extends React.Component {
  onCascaderChange = value => {
    console.log(value);
  };

  cascaderFilter = (inputValue, path) => {
    return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  };

  render() {
    return (
      <div className="direction-components example">
        <Cascader
          suffixIcon={<Icon type="smile" />}
          options={cascaderOptions}
          onChange={this.onCascaderChange}
          placeholder="یک مورد انتخاب کنید"
          popupPlacement={this.props.popupPlacement}
        />
        &nbsp;&nbsp;&nbsp;&nbsp; With search:
        <Cascader
          suffixIcon={<Icon type="search" />}
          options={cascaderOptions}
          onChange={this.onCascaderChange}
          placeholder="Select an item"
          popupPlacement={this.props.popupPlacement}
          showSearch={this.cascaderFilter}
        />
      </div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    state = {
      direction: 'ltr',
      popupPlacement: 'bottomLeft',
    };

  changeDirection = e => {
    const directionValue = e.target.value;
    this.setState({ direction: directionValue });
    if (directionValue === 'rtl') {
      this.setState({ popupPlacement: 'bottomRight' });
    } else {
      this.setState({ popupPlacement: 'bottomLeft' });
    }
  };

  render() {
    const { direction } = this.state;
    return (
      <div>
        <div className="change-direction">
          <span style={{ marginRight: 16 }}>Change direction of components: </span>
          <Radio.Group defaultValue="ltr" onChange={this.changeDirection}>
            <Radio.Button key="ltr" value="ltr">
              LTR
            </Radio.Button>
            <Radio.Button key="rtl" value="rtl">
              RTL
            </Radio.Button>
          </Radio.Group>
        </div>
        <ConfigProvider direction={direction}>
          <Page popupPlacement={this.state.popupPlacement} />
        </ConfigProvider>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```

```css
.direction-components {
  border-top: 1px solid #d9d9d9;
  padding-top: 16px;
}

.example {
  margin: 16px 0;
}

.example > * {
  margin-right: 8px;
}

[dir='rtl'] .example > * {
  margin-right: auto;
  margin-left: 8px;
}

.change-direction {
  margin-bottom: 16px;
}
```
