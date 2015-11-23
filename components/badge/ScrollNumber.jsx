import React, { createElement } from 'react';
import assign from 'object-assign';

function getNumberArray(num) {
  return num ?
    num.toString().split('').map(i => Number(i)) : [];
}

class AntScrollNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animated: true
    };
  }

  getPositionByNum(num, i) {
    if (this.state.animated) {
      return 10 + num;
    }
    const currentDigit = getNumberArray(this.props.count)[i];
    const lastDigit = getNumberArray(this.lastCount)[i];
    // 同方向则在同一侧切换数字
    if (this.props.count > this.lastCount) {
      if (currentDigit >= lastDigit) {
        return 10 + num;
      } else {
        return 20 + num;
      }
    } else {
      if (currentDigit <= lastDigit) {
        return 10 + num;
      } else {
        return num;
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('count' in nextProps && nextProps.count) {
      if (this.lastCount !== this.props.count) {
        this.lastCount = this.props.count;
        this.setState({
          animated: false
        }, () => {
          setTimeout(() => {
            this.setState({
              animated: true
            });
            this.props.callback();
          }, 300);
        });
      }
    }
  }

  renderNumberList() {
    const childrenToReturn = [];
    for (let i = 0; i < 30; i++) {
      childrenToReturn.push(<p key={i}>{i % 10}</p>);
    }
    return childrenToReturn;
  }

  renderCurrentNumber(num, i) {
    const position = this.getPositionByNum(num, i);
    const height = this.props.height;
    return createElement('span', {
      className: `${this.props.prefixCls}-only`,
      style: {
        transition: this.state.animated && 'none',
        transform: 'translate3d(0, ' + (-position * height) + 'px, 0)',
        height: height,
      },
      key: i,
    }, this.renderNumberList());
  }

  renderNumberElement() {
    const props = this.props;
    if (!props.count || isNaN(props.count)) {
      return props.count;
    }
    return getNumberArray(props.count)
      .map((num, i) => this.renderCurrentNumber(num, i));
  }

  render() {
    const props = assign({}, this.props, {
      className: `${this.props.prefixCls} ${this.props.className}`
    });
    return createElement(
      this.props.component,
      props,
      this.renderNumberElement()
    );
  }
}

AntScrollNumber.defaultProps = {
  prefixCls: 'ant-scroll-number',
  count: null,
  component: 'sup',
  callback: function() {},
  height: 20
};

AntScrollNumber.propTypes = {
  count: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  component: React.PropTypes.string,
  callback: React.PropTypes.func,
  height: React.PropTypes.number,
};

export default AntScrollNumber;
