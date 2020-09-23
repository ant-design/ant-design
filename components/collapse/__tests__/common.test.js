import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import Collapse from '..';
import openAnimation from '../openAnimation';

describe('Collapse', () => {
  mountTest(Collapse);
  rtlTest(Collapse);
});

describe('openAnimation', () => {
  it('should support openAnimation', () => {
    const done = jest.fn();
    const domNode = document.createElement('div');
    expect(typeof openAnimation.enter).toBe('function');
    expect(typeof openAnimation.leave).toBe('function');
    expect(typeof openAnimation.appear).toBe('function');
    const appear = openAnimation.appear(domNode, done);
    const enter = openAnimation.enter(domNode, done);
    const leave = openAnimation.leave(domNode, done);
    expect(typeof appear.stop).toBe('function');
    expect(typeof enter.stop).toBe('function');
    expect(typeof leave.stop).toBe('function');
    expect(done).toHaveBeenCalled();
  });
});
