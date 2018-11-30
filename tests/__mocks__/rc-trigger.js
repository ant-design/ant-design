import React from 'react';

let Trigger; // eslint-disable-line

if (process.env.REACT === '15') {
  const ActualTrigger = require.requireActual('rc-trigger');
  // cannot use object destruction, cause react 15 test cases fail
  const render = ActualTrigger.prototype.render; // eslint-disable-line

  ActualTrigger.prototype.render = () => {
    const { popupVisible } = this.state; // eslint-disable-line
    let component;

    if (popupVisible || this._component) { // eslint-disable-line
      component = this.getComponent(); // eslint-disable-line
    }

    return (
      <div id="TriggerContainer">
        {render.call(this)}
        {component}
      </div>
    );
  };
  Trigger = ActualTrigger;
} else {
  const TriggerMock = require('rc-trigger/lib/mock'); // eslint-disable-line
  Trigger = TriggerMock;
}

export default Trigger;
