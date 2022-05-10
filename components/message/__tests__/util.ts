import { act, fireEvent } from '../../../tests/utils';

/* eslint-disable import/prefer-default-export */
export function triggerMotionEnd(selector: string = '.ant-message-move-up-leave') {
  // Flush css motion state update
  for (let i = 0; i < 5; i += 1) {
    act(() => {
      jest.runAllTimers();
    });
  }

  document.querySelectorAll(selector).forEach(ele => {
    fireEvent.animationEnd(ele);
  });
}
