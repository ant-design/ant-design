import React from 'react';
import Cascader from 'rc-cascader';
import Input from '../input';
import arrayTreeFilter from 'array-tree-filter';

class AntCascader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
    };
    [
      'handleChange',
      'getLabel',
    ].forEach((method) => this[method] = this[method].bind(this));
  }
  handleChange(value, selectedOptions) {
    this.setState({ value });
    this.props.onChange(value, selectedOptions);
  }
  getLabel() {
    const { options, displayRender } = this.props;
    const label = arrayTreeFilter(options, (o, level) => o.value === this.state.value[level])
      .map(o => o.label);
    return displayRender(label);
  }
  render() {
    const { prefixCls, children, placeholder, style } = this.props;
    return (
      <Cascader {...this.props} onChange={this.handleChange}>
        {children ||
          <Input placeholder={placeholder}
            className={`${prefixCls}-input ant-input`}
            style={style}
            value={this.getLabel()}
            readOnly />}
      </Cascader>
    );
  }
}

AntCascader.defaultProps = {
  prefixCls: 'ant-cascader',
  placeholder: '请选择',
  transitionName: 'slide-up',
  onChange() {},
  options: [],
  displayRender(label) {
    return label.join(' / ');
  },
};

export default AntCascader;
