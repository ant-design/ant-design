import { Dom } from 'rc-util';

export let transitionEndEvent = whichTransitionEvent();
export let animationEndEvent = whichAnimationEvent();

function whichTransitionEvent() {
  const transitions = {
    'transition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'MozTransition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd'
  };
  for (let t in transitions) {
    if (t in document.documentElement.style) {
      return transitions[t];
    }
  }
  return false;
}

function whichAnimationEvent() {
  const animation = {
    'animation': 'animationend',
    'OAnimation': 'oAnimationEnd',
    'MozAnimation': 'animationend',
    'WebkitAnimation': 'webkitAnimationEnd'
  };
  for (let t in animation) {
    if (t in document.documentElement.style) {
      return animation[t];
    }
  }
  return false;
}

export let addEventListenerOnce = function(element, type, handler) {
  var eventListener = Dom.addEventListener(element, type, function(event) {
    eventListener && eventListener.remove();
    handler(event);
  });
};
