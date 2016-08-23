import * as React from 'react';
import * as ReactDOM from 'react-dom';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import classNames from 'classnames';
import warning from 'warning';
import assign from 'object-assign';
import shallowequal from 'shallowequal';

function getScroll(target, top) {
  const prop = top ? 'pageYOffset' : 'pageXOffset';
  const method = top ? 'scrollTop' : 'scrollLeft';
  const isWindow = target === window;

  let ret = isWindow ? target[prop] : target[method];
  // ie6,7,8 standard mode
  if (isWindow && typeof ret !== 'number') {
    ret = window.document.documentElement[method];
  }

  return ret;
}

function getTargetRect(target): any {
  return target !== window ?
    target.getBoundingClientRect() :
    { top: 0, left: 0, bottom: 0 };
}

function getOffset(element, target) {
  const elemRect = element.getBoundingClientRect();
  const targetRect = getTargetRect(target);

  const scrollTop = getScroll(target, true);
  const scrollLeft = getScroll(target, false);

  const docElem = window.document.body;
  const clientTop = docElem.clientTop || 0;
  const clientLeft = docElem.clientLeft || 0;

  return {
    top: elemRect.top - targetRect.top +
      scrollTop - clientTop,
    left: elemRect.left - targetRect.left +
      scrollLeft - clientLeft,
  };
}

// Affix
export interface AffixProps {
  /**
   * 距离窗口顶部达到指定偏移量后触发
   */
  offsetTop?: number;
  offset?: number;
  offsetBottom?: number;
  style?: React.CSSProperties;
  onChange?: (affixed?: boolean) => any;
  target?: () => Window | HTMLElement;
}

export default class Affix extends React.Component<AffixProps, any> {
  static propTypes = {
    offsetTop: React.PropTypes.number,
    offsetBottom: React.PropTypes.number,
    target: React.PropTypes.func,
  };

  static defaultProps = {
    target() {
      return window;
    },
    onChange() {},
  };

  scrollEvent: any;
  resizeEvent: any;
  refs: {
    [key: string]: any;
    fixedNode: HTMLElement;
  };

  constructor(props) {
    super(props);
    this.state = {
      affixStyle: null,
      placeholderStyle: null,
    };
  }

  setAffixStyle(e, affixStyle) {
    const { onChange, target } = this.props;
    const originalAffixStyle = this.state.affixStyle;
    const isWindow = target() === window;
    if (e.type === 'scroll' && originalAffixStyle && affixStyle && isWindow) {
      return;
    }
    if (shallowequal(affixStyle, originalAffixStyle)) {
      return;
    }
    this.setState({ affixStyle }, () => {
      const affixed = !!this.state.affixStyle;
      if ((affixStyle && !originalAffixStyle) ||
          (!affixStyle && originalAffixStyle)) {
        onChange(affixed);
      }
    });
  }

  setPlaceholderStyle(e, placeholderStyle) {
    const originalPlaceholderStyle = this.state.placeholderStyle;
    if (e.type === 'resize') {
      return;
    }
    if (shallowequal(placeholderStyle, originalPlaceholderStyle)) {
      return;
    }
    this.setState({ placeholderStyle });
  }

  updatePosition = (e) => {
    let { offsetTop, offsetBottom, offset, target } = this.props;
    const targetNode = target();

    // Backwards support
    offsetTop = offsetTop || offset;
    const scrollTop = getScroll(targetNode, true);
    const affixNode = ReactDOM.findDOMNode(this) as HTMLElement;
    const elemOffset = getOffset(affixNode, targetNode);
    const elemSize = {
      width: this.refs.fixedNode.offsetWidth,
      height: this.refs.fixedNode.offsetHeight,
    };

    const offsetMode = {
      top: null as boolean,
      bottom: null as boolean,
    };
    // Default to `offsetTop=0`.
    if (typeof offsetTop !== 'number' && typeof offsetBottom !== 'number') {
      offsetMode.top = true;
      offsetTop = 0;
    } else {
      offsetMode.top = typeof offsetTop === 'number';
      offsetMode.bottom = typeof offsetBottom === 'number';
    }

    const targetRect = getTargetRect(targetNode);
    const targetInnerHeight = targetNode.innerHeight || targetNode.clientHeight;
    if (scrollTop > elemOffset.top - offsetTop && offsetMode.top) {
      // Fixed Top
      this.setAffixStyle(e, {
        position: 'fixed',
        top: targetRect.top + offsetTop,
        left: targetRect.left + elemOffset.left,
        width: affixNode.offsetWidth,
      });
      this.setPlaceholderStyle(e, {
        width: affixNode.offsetWidth,
        height: affixNode.offsetHeight,
      });
    } else if (
      scrollTop < elemOffset.top + elemSize.height + offsetBottom - targetInnerHeight &&
        offsetMode.bottom
    ) {
      // Fixed Bottom
      const targetBottomOffet = targetNode === window ? 0 : (window.innerHeight - targetRect.bottom);
      this.setAffixStyle(e, {
        position: 'fixed',
        bottom: targetBottomOffet + offsetBottom,
        left: targetRect.left + elemOffset.left,
        width: affixNode.offsetWidth,
      });
      this.setPlaceholderStyle(e, {
        width: affixNode.offsetWidth,
        height: affixNode.offsetHeight,
      });
    } else {
      this.setAffixStyle(e, null);
      this.setPlaceholderStyle(e, null);
    }
  }

  componentDidMount() {
    warning(!('offset' in this.props), '`offset` prop of Affix is deprecated, use `offsetTop` instead.');

    const target = this.props.target;
    this.setTargetEventListeners(target);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.target !== nextProps.target) {
      this.clearScrollEventListeners();
      this.setTargetEventListeners(nextProps.target);

      // Mock Event object.
      this.updatePosition({});
    }
  }

  componentWillUnmount() {
    this.clearScrollEventListeners();
  }

  setTargetEventListeners(getTarget) {
    const target = getTarget();
    this.scrollEvent = addEventListener(target, 'scroll', this.updatePosition);
    this.resizeEvent = addEventListener(target, 'resize', this.updatePosition);
  }

  clearScrollEventListeners() {
    ['scrollEvent', 'resizeEvent'].forEach((name) => {
      if (this[name]) {
        this[name].remove();
      }
    });
  }

  render() {
    const className = classNames({
      'ant-affix': this.state.affixStyle,
    });

    const props = assign({}, this.props);
    delete props.offsetTop;
    delete props.offsetBottom;
    delete props.target;

    return (
      <div {...props} style={this.state.placeholderStyle}>
        <div className={className} ref="fixedNode" style={this.state.affixStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
