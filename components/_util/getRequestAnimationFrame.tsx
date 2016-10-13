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
    : callback => setTimeout(callback, 1000 / 60);
}
