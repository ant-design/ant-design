var React = require('react');

var Step = React.createClass({
  getInitialState() {
    return {
      status: this.props.status ? this.props.status : 'waiting'
    };
  },
  render() {
    var props = this.props;
    var cls = 'border'; // fill / none
    return (<li className={(props.stepColClass ? props.stepColClass : '') + 'rc-steps-item'} style={props.stepColStyles}>
      <span className={'rc-steps-icon ' + cls + ' ' + this.state.status}>
        <span className='num'>{props.stepIndex}</span>
        <i icon={props.icon}></i>
      </span>
      <span className='rc-steps-title'>{props.title}</span>
      {
        props.description &&
          <span className='rc-steps-description'>{props.description}</span>
      }
    </li>);
  }
});

module.exports = Step;
