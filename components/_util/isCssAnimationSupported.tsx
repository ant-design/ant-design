let animation: boolean;

function isCssAnimationSupported() {
  if (animation !== undefined) {
    return animation;
  }
  const domPrefixes = 'Webkit Moz O ms Khtml'.split(' ');
  const elm = document.createElement('div');
  if (elm.style.animationName !== undefined) {
    animation = true;
  }
  if (animation !== undefined) {
    for (let i = 0; i < domPrefixes.length; i++) {
      if ((elm.style as any)[`${domPrefixes[i]}AnimationName`] !== undefined) {
        animation = true;
        break;
      }
    }
  }
  animation = animation || false;
  return animation;
}

export default isCssAnimationSupported;
