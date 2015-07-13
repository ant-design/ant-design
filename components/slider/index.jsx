var React = require('react');
var Slider = require('rc-slider');

var AntSlider = React.createClass({
  getDefaultProps() {
    return {
      className: 'ant-slider'
    };
  },
  render() {
    return <Slider {...this.props}/>;
  }
});

module.exports = AntSlider;
