import React from 'react';
import RcQueueAnim from 'rc-queue-anim';
import warning from 'warning';

export default class QueueAnim extends React.Component {
  componentDidMount() {
    warning(false, '`QueueAnim` is deprecated, ' +
      'you can import QueueAnim from \'rc-queue-anim\' directly.' +
      'The Demo will be moved to http://motion.ant.design/#/component/queue-anim');
  }
  render() {
    return <RcQueueAnim {...this.props} />;
  }
}
