import React from 'react';
import ReactDOM from 'react-dom';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import classNames from 'classnames';
import warning from 'warning';
import shallowequal from 'shallowequal';

function getScroll(w, top) {
  let ret = w[`page${top ? 'Y' : 'X'}Offset`];
  const method = `scroll${top ? 'Top' : 'Left'}`;
  if (typeof ret !== 'number') {
    const d = w.document;
    // ie6,7,8 standard mode
    ret = d.documentElement[method];
    if (typeof ret !== 'number') {
      // quirks mode
      ret = d.body[method];
    }
  }
  return ret;
}

function getOffset(element) {
  const rect = element.getBoundingClientRect();
  const body = document.body;
  const clientTop = element.clientTop || body.clientTop || 0;
  const clientLeft = element.clientLeft || body.clientLeft || 0;
  const scrollTop = getScroll(window, true);
  const scrollLeft = getScroll(window);

  return {
    top: rect.top + scrollTop - clientTop,
    left: rect.left + scrollLeft - clientLeft,
  };
}

export default class Affix extends React.Component {
  static propTypes = {
    offsetTop: React.PropTypes.number,
    offsetBottom: React.PropTypes.number,
  }

  static defaultProps = {
    onChange() {},
  }

  constructor(props) {
    super(props);
    this.state = {
      affixStyle: null,
      placeholderStyle: null,
    };
  }

  setAffixStyle(e, affixStyle) {
    const originalAffixStyle = this.state.affixStyle;
    if (e.type === 'scroll' && originalAffixStyle && affixStyle) {
      return;
    }
    if (shallowequal(affixStyle, originalAffixStyle)) {
      return;
    }
    this.setState({ affixStyle }, () => {
      const affixed = !!this.state.affixStyle;
      if ((affixStyle && !originalAffixStyle) ||
          (!affixStyle && originalAffixStyle)) {
        this.props.onChange(affixed);
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

  handleScroll = (e) => {
    let { offsetTop, offsetBottom, offset } = this.props;

    // Backwards support
    offsetTop = offsetTop || offset;
    const scrollTop = getScroll(window, true);
    const elemOffset = getOffset(ReactDOM.findDOMNode(this));
    const elemSize = {
      width: ReactDOM.findDOMNode(this.refs.fixedNode).offsetWidth,
      height: ReactDOM.findDOMNode(this.refs.fixedNode).offsetHeight,
    };

    const offsetMode = {};
    if (typeof offsetTop !== 'number' && typeof offsetBottom !== 'number') {
      offsetMode.top = true;
      offsetTop = 0;
    } else {
      offsetMode.top = typeof offsetTop === 'number';
      offsetMode.bottom = typeof offsetBottom === 'number';
    }

    if (scrollTop > elemOffset.top - offsetTop && offsetMode.top) {
      // Fixed Top
      this.setAffixStyle(e, {
        position: 'fixed',
        top: offsetTop,
        left: elemOffset.left,
        width: ReactDOM.findDOMNode(this).offsetWidth,
      });
      this.setPlaceholderStyle(e, {
        width: ReactDOM.findDOMNode(this).offsetWidth,
        height: ReactDOM.findDOMNode(this).offsetHeight,
      });
    } else if (scrollTop < elemOffset.top + elemSize.height + offsetBottom - window.innerHeight &&
               offsetMode.bottom) {
      // Fixed Bottom
      this.setAffixStyle(e, {
        position: 'fixed',
        bottom: offsetBottom,
        left: elemOffset.left,
        width: ReactDOM.findDOMNode(this).offsetWidth,
      });
      this.setPlaceholderStyle(e, {
        width: ReactDOM.findDOMNode(this).offsetWidth,
        height: ReactDOM.findDOMNode(this).offsetHeight,
      });
    } else {
      this.setAffixStyle(e, null);
      this.setPlaceholderStyle(e, null);
    }
  }

  componentDidMount() {
    warning(!('offset' in this.props), '`offset` prop of Affix is deprecated, use `offsetTop` instead.');
    this.scrollEvent = addEventListener(window, 'scroll', this.handleScroll);
    this.resizeEvent = addEventListener(window, 'resize', this.handleScroll);
  }

  componentWillUnmount() {
    if (this.scrollEvent) {
      this.scrollEvent.remove();
    }
    if (this.resizeEvent) {
      this.resizeEvent.remove();
    }
  }

  render() {
    const className = classNames({
      'ant-affix': this.state.affixStyle,
    });

    const props = { ...this.props };
    delete props.offsetTop;
    delete props.offsetBottom;

    return (
      <div {...props} style={this.state.placeholderStyle}>
        <div className={className} ref="fixedNode" style={this.state.affixStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
