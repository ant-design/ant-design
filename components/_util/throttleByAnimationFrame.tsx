import getRequestAnimationFrame from '../_util/getRequestAnimationFrame';

const reqAnimFrame = getRequestAnimationFrame();

export default function throttleByAnimationFrame(fn, threshhold = 250) {
  let last;
  return function() {
    const self = this;
    const args = arguments;
    reqAnimFrame(timestamp => {
      if (!last || timestamp - last > threshhold) {
        last = timestamp;
        fn.apply(self, args);
      }
    });
  };
}

export function throttleByAnimationFrameDecorator(threshhold = 250) {
  return function(target, key, descriptor) {
    let fn = descriptor.value;
    let definingProperty = false;
    return {
      configurable: true,
      get() {
        if (definingProperty || this === target.prototype || this.hasOwnProperty(key)) {
          return fn;
        }

        let boundFn = throttleByAnimationFrame(fn.bind(this), threshhold);
        definingProperty = true;
        Object.defineProperty(this, key, {
          value: boundFn,
          configurable: true,
          writable: true,
        });
        definingProperty = false;
        return boundFn;
      },
    };
  };
}
