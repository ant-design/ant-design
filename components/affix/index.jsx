import React from 'react';
import ReactDOM from 'react-dom';
import rcUtil from 'rc-util';
import classNames from 'classnames';

function getScroll(w, top) {
  let ret = w['page' + (top ? 'Y' : 'X') + 'Offset'];
  let method = 'scroll' + (top ? 'Top' : 'Left');
  if (typeof ret !== 'number') {
    let d = w.document;
    //ie6,7,8 standard mode
    ret = d.documentElement[method];
    if (typeof ret !== 'number') {
      //quirks mode
      ret = d.body[method];
    }
  }
  return ret;
}

function getOffset(element) {
  let rect = element.getBoundingClientRect();
  let body = document.body;
  let clientTop = element.clientTop || body.clientTop || 0;
  let clientLeft = element.clientLeft || body.clientLeft || 0;
  let scrollTop = getScroll(window, true);
  let scrollLeft = getScroll(window);

  return {
    top: rect.top + scrollTop - clientTop,
    left: rect.left + scrollLeft - clientLeft
  };
}

let Affix = React.createClass({

  getDefaultProps() {
    return {
      offset: 0
    };
  },

  propTypes: {
    offset: React.PropTypes.number
  },

  getInitialState() {
    return {
      affix: false,
      affixStyle: null
    };
  },

  handleScroll() {
    let affix = this.state.affix;
    let scrollTop = getScroll(window, true);
    let elemOffset = getOffset(ReactDOM.findDOMNode(this));

    if (!affix && (elemOffset.top - this.props.offset) < scrollTop) {
      this.setState({
        affix: true,
        affixStyle: {
          top: this.props.offset,
          left: elemOffset.left,
          width: ReactDOM.findDOMNode(this).offsetWidth
        }
      });
    }

    if (affix && (elemOffset.top - this.props.offset) > scrollTop) {
      this.setState({
        affix: false,
        affixStyle: null
      });
    }
  },

  componentDidMount() {
    this.scrollEvent = rcUtil.Dom.addEventListener(window, 'scroll', this.handleScroll);
    this.resizeEvent = rcUtil.Dom.addEventListener(window, 'resize', this.handleScroll);
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
      'ant-affix': this.state.affix
    });

    return (
      <div {...this.props}>
        <div className={className} style={this.state.affixStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }

});

module.exports = Affix;
