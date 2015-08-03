import React from 'react';
import joinClasses from 'react/lib/joinClasses';
import rcUtil from 'rc-util';

var Affix = React.createClass({

  getDefaultProps() {
    return {
      offset: 0
    };
  },

  getInitialState() {
    return {
      affix: false
    };
  },

  handleScroll() {
    var affix = this.state.affix;
    var offset = this.props.offset;
    var scrollTop = (document.documentElement && document.documentElement.scrollTop) ||
    document.body.scrollTop;

    if (!affix && scrollTop >= offset) {
      this.setState({
        affix: true
      });
    }

    if (affix && scrollTop < offset) {
      this.setState({
        affix: false
      });
    }
  },

  componentDidMount() {
    this.scrollEvent = rcUtil.Dom.addEventListener(window, 'scroll', this.handleScroll);
  },

  componentWillUnmount() {
    if (this.scrollEvent) {
      this.scrollEvent.remove();
    }
  },

  render() {
    var affix = this.state.affix ? 'affix' : '';
    var className = this.props.className;

    return (
      <div {...this.props} className={joinClasses(className, affix)}>
        {this.props.children}
      </div>
    );
  }

});

module.exports = Affix;

