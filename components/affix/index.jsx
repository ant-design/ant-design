import React from 'react';
import joinClasses from 'react/lib/joinClasses';
import rcUtil from 'rc-util';

function getScroll(w, top) {
  var ret = w['page' + (top ? 'Y' : 'X') + 'Offset'];
  var method = 'scroll' + (top ? 'Top' : 'Left');
  if (typeof ret !== 'number') {
    var d = w.document;
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
  var rect = element.getBoundingClientRect();
  var body = document.body;
  var clientTop = element.clientTop || body.clientTop || 0;
  var clientLeft = element.clientLeft || body.clientLeft || 0;
  var scrollTop = getScroll(window, true);
  var scrollLeft = getScroll(window);

  return {
    top: rect.top + scrollTop - clientTop,
    left: rect.left + scrollLeft - clientLeft
  };
}

var Affix = React.createClass({

  getDefaultProps() {
    return {
      offset: 0
    };
  },

  getInitialState() {
    return {
      affix: false,
      affixStyle: null
    };
  },

  handleScroll() {
    var affix = this.state.affix;
    var scrollTop = getScroll(window, true);
    var elemOffset = getOffset(this.getDOMNode());

    if (!affix && (elemOffset.top - this.props.offset) < scrollTop) {
      this.setState({
        affix: true,
        affixStyle: {
          top: this.props.offset,
          left: elemOffset.left,
          width: this.getDOMNode().offsetWidth
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
    var affix = this.state.affix ? 'affix' : '';
    var className = this.props.className;

    return (
      <div {...this.props}>
        <div className={joinClasses(className, affix)} style={this.state.affixStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }

});

module.exports = Affix;
