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

  getDefaultProps() {
    return {
      offset: 0,
    };
  },

  propTypes: {
    offset: React.PropTypes.number,
  },

  getInitialState() {
    return {
      affix: false,
      affixStyle: null,
    };
  },

  handleScroll() {
    const affix = this.state.affix;
    const scrollTop = getScroll(window, true);
    const elemOffset = getOffset(ReactDOM.findDOMNode(this));

    if (!affix && (elemOffset.top - this.props.offset) < scrollTop) {
      this.setState({
        affix: true,
        affixStyle: {
          top: this.props.offset,
          left: elemOffset.left,
          width: ReactDOM.findDOMNode(this).offsetWidth,
        },
      });
    }

    if (affix && (elemOffset.top - this.props.offset) > scrollTop) {
      this.setState({
        affix: false,
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
      'ant-affix': this.state.affix,
    });

    return (
      <div {...this.props}>
        <div className={className} style={this.state.affixStyle}>
          {this.props.children}
        </div>
      </div>
    );
  },

});

module.exports = Affix;
