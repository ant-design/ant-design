function requestAnimationFramePolyfill() {
  let lastTime = 0;
  return function(callback) {
    const currTime = new Date().getTime();
    const timeToCall = Math.max(0, 16 - (currTime - lastTime));
    const id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
}

export default function getRequestAnimationFrame() {
  if (typeof window === 'undefined') {
    return () => {};
  }
  if (window.requestAnimationFrame) {
    return window.requestAnimationFrame;
  }
  const prefix = ['moz', 'ms', 'webkit'].filter(key => `${key}RequestAnimationFrame` in window)[0];
  return prefix
    ? window[`${prefix}RequestAnimationFrame`]
    : requestAnimationFramePolyfill();
}
