import React from 'react';

const Trigger = require.requireActual('rc-trigger');

const render = Trigger.prototype.render;

Trigger.prototype.render = function () { // eslint-disable-line
  const { popupVisible } = this.state;
  return (
    <div id="TriggerContainer">
      {render.call(this)}
      {popupVisible && this.getComponent()}
    </div>
  );
};

export default Trigger;
