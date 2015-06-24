'use strict';

var React = require('react');


var Steps = React.createClass({
  render() {
    var props = this.props;
    var children = props.children;
    var len = children.length - 1;
    var isCol = [1, 2, 3, 4, 6, 8, 12].indexOf(len) >= 0;

    function _make(ele, idx) {
      var np = {};
      if (!ele.props.stepNumber) {
        np.stepNumber = '' + (idx + 1);
      }
      if (isCol && idx !== len) {
        np.stepColClass = 'col-' + (24 / len).toFixed(0) + ' ';
      } else if (idx !== len) {
        np.stepColStyles = {
          width: (100 / len).toFixed(4) + '%'
        };
      }
      return React.cloneElement(ele, np);
    }

    return (
      <div className='rc-steps row-flex' >
        <div className='rc-steps-start'>
          {React.Children.map(props.children.slice(0, len), _make)}
        </div>
        <div className='rc-steps-end'>
          {_make(props.children[len], len)}
        </div>
      </div>
    );
  }
});

module.exports = Steps;
