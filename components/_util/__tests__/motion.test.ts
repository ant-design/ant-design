import initCollapseMotion from '../motion';

describe('isTransitionEvent', () => {
  const element = document.createElement('div');

  const createTransitionEndEvent = (propertyName: string) => {
    const event = new Event('transitionend');
    Object.defineProperty(event, 'propertyName', { value: propertyName });
    return event as TransitionEvent;
  };

  it('should check transition event by propertyName', () => {
    const motion = initCollapseMotion();
    const onEnd = motion.onEnterEnd!;
    expect(onEnd(element, createTransitionEndEvent('height'))).toBe(true);
    expect(onEnd(element, createTransitionEndEvent('opacity'))).toBe(false);
    expect(onEnd(element, new Event('animationend') as AnimationEvent)).toBe(false);
    expect(onEnd(element, undefined as any)).toBe(false);
  });

  it('should end motion when deadline event is triggered', () => {
    const motion = initCollapseMotion();
    const onEnd = motion.onEnterEnd!;
    expect(onEnd(element, { deadline: true } as any)).toBe(true);
  });
});
