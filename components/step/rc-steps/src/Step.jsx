var React = require('react');

var Step = React.createClass({
  getInitialState() {
    return {
      status: this.props.status ? this.props.status : 'waiting'
    };
  },
  render() {
    console.log('step render');
    var props = this.props;
    return (<div className={'rc-steps-item rc-steps-status-' + this.state.status }>

      <div className='rc-steps-head'>
        <i className='anticon anticon-check'></i>
      </div>
      <div className='rc-steps-main'>
        <div className='rc-steps-title'>{props.title}</div>
        <div className='rc-steps-description'>
          {props.description}
        </div>
      </div>
      {!props.stepLast ? <div className='rc-steps-tail' style={{width: props.tailWidth}}>
        <i></i>
      </div> : ''}
    </div>);
  }
});

module.exports = Step;
