import React from 'react';
import ReactDOM from 'react-dom';
import { Dom } from 'rc-util';
import classNames from 'classnames';
import warning from 'warning';

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
    };
  }

  handleScroll = () => {
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
      if (!this.state.affixStyle) {
        this.setState({
          affixStyle: {
            position: 'fixed',
            top: offsetTop,
            left: elemOffset.left,
            width: ReactDOM.findDOMNode(this).offsetWidth,
          },
        }, () => this.props.onChange(!!this.state.affixStyle));
      }
    } else if (scrollTop < elemOffset.top + elemSize.height + offsetBottom - window.innerHeight &&
               offsetMode.bottom) {
      // Fixed Bottom
      if (!this.state.affixStyle) {
        this.setState({
          affixStyle: {
            position: 'fixed',
            bottom: offsetBottom,
            left: elemOffset.left,
            width: ReactDOM.findDOMNode(this).offsetWidth,
          },
        }, () => this.props.onChange(!!this.state.affixStyle));
      }
    } else if (this.state.affixStyle) {
      this.setState({
        affixStyle: null,
      }, () => this.props.onChange(!!this.state.affixStyle));
    }
  }

  componentDidMount() {
    warning(!('offset' in this.props), '`offset` prop of Affix is deprecated, use `offsetTop` instead.');
    this.scrollEvent = Dom.addEventListener(window, 'scroll', this.handleScroll);
    this.resizeEvent = Dom.addEventListener(window, 'resize', this.handleScroll);
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

    return (
      <div {...this.props}>
        <div className={className} ref="fixedNode" style={this.state.affixStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
