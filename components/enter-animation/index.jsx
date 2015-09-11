import React from 'react';
import EnterAnimation from 'enter-animation';

class AntEnterAnimation extends React.Component {
  render() {
    return <EnterAnimation {...this.props} />;
  }
}

AntEnterAnimation.to = EnterAnimation.to;
export default AntEnterAnimation;

