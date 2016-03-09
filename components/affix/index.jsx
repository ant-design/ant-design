import React from 'react';
import ReactDOM from 'react-dom';
import { Dom } from 'rc-util';
import classNames from 'classnames';

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

const Affix = React.createClass({
  propTypes: {
    offsetTop: React.PropTypes.number,
    offsetBottom: React.PropTypes.number,
  },

  getInitialState() {
    return {
      affixStyle: null,
    };
  },

  handleScroll() {
    let { offsetTop, offsetBottom } = this.props;
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
          },
        });
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
          },
        });
      }
    } else if (this.state.affixStyle) {
      this.setState({
        affixStyle: null,
      });
    }
  },

  componentDidMount() {
    this.scrollEvent = Dom.addEventListener(window, 'scroll', this.handleScroll);
    this.resizeEvent = Dom.addEventListener(window, 'resize', this.handleScroll);
  },

  componentWillUnmount() {
    if (this.scrollEvent) {
      this.scrollEvent.remove();
    }
    if (this.resizeEvent) {
      this.resizeEvent.remove();
    }
  },

  render() {
    const className = classNames({
      [this.props.className]: this.props.className,
      'ant-affix': this.state.affixStyle,
    });

    return (
      <div {...this.props}>
        <div className={className} ref="fixedNode" style={this.state.affixStyle}>
          {this.props.children}
        </div>
      </div>
    );
  },

});

module.exports = Affix;
