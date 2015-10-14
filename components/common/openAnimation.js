let velocity;
if (typeof document !== 'undefined' && typeof window !== 'undefined') {
  velocity = require('velocity-animate');
}

function animate(node, show, transitionName, done) {
  let ok;

  function complete() {
    if (!ok) {
      ok = true;
      done();
    }
  }

  // Fix safari flash bug
  node.style.display = show ? 'block' : 'none';
  velocity(node, transitionName, {
    duration: 240,
    complete: complete,
    easing: 'easeInOutQuad'
  });
  return {
    stop() {
      velocity(node, 'finish');
      complete();
    }
  };
}

const animation = {
  enter(node, done) {
    return animate(node, false, 'slideDown', done);
  },
  leave(node, done) {
    return animate(node, true, 'slideUp', done);
  },
  appear(node, done) {
    return animate(node, false, 'slideDown', done);
  },
};

module.exports = animation;
