export default function raf(callback: Function) {
  return window.setTimeout(callback);
}

raf.cancel = window.clearTimeout;
