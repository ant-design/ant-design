import React, {createElement, cloneElement} from 'react';
import {findDOMNode} from 'react-dom';
import {toArrayChildren} from './utils';
import assign from 'object-assign';

class AntNumber extends React.Component {
  constructor(props) {
    super(props);
    const children = toArrayChildren(this.props.children);
    this.state = {
      children,
    };
  }

  getNumberOnly(c) {
    const childrenToReturn = [];
    for (let i = -1; i < 11; i++) {
      let count = i >= 10 ? i - 10 : i;
      count = i === -1 ? 9 : count;
      const children = <p key={i}>{count}</p>;
      childrenToReturn.push(children);
    }
    const key = 'only_' + c;
    return createElement('span', {className: `${this.props.prefixCls}-only`, key: key}, childrenToReturn);
  }

  getNumberElement(props) {
    const count = props.count;
    if (!count || count === '') {
      return null;
    }
    let length = count.toString().length;
    let childrenWap = [];
    let i = 0;
    while (i < length) {
      const children = this.getNumberOnly(i);
      childrenWap.unshift(children);
      i++;
    }
    const height = findDOMNode(this).offsetHeight;
    childrenWap = childrenWap.map((child, j)=> {
      let oneData = Number(count.toString()[j]);
      let offsetTop = -(oneData + 1) * height;
      return cloneElement(child, {style: {transform: 'translateY(' + offsetTop + 'px)'}});
    });
    return childrenWap;
  }

  updateChildren(props) {
    if (typeof props.count === 'string') {
      return this.setState({
        children: [props.count]
      });
    }
    let newChildren = this.getNumberElement(props);
    //newChildren = this.addStyle(props, newChildren);
    if (newChildren && newChildren.length) {
      this.setState({
        children: newChildren
      });
    }
  }

  componentDidMount() {
    this.updateChildren(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateChildren(nextProps);
  }

  render() {
    const childrenToRender = this.state.children;
    const props = assign({}, this.props, {className: this.props.prefixCls + ' ' + this.props.className});
    return createElement(this.props.component, props, childrenToRender);
  }
}
AntNumber.defaultProps = {
  prefixCls: 'ant-number',
  count: null,
  component: 'sup'
};

AntNumber.propTypes = {
  count: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  component: React.PropTypes.string
};

export default AntNumber;
