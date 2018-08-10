import TransitionEvents from 'css-animation/lib/Event';

const clickAnimation = (node: HTMLElement) => {
  function handler() {
    node.removeAttribute('ant-click-animating');
    node.setAttribute('ant-click-animating', 'true');
    TransitionEvents.addEndEventListener(node, () => {
      node.removeAttribute('ant-click-animating');
      TransitionEvents.removeEndEventListener(node);
    });
  }
  node.addEventListener('click', handler, false);
  return {
    cancel: () => {
      node.removeEventListener('click', handler, false);
    },
  };
};

export default clickAnimation;
