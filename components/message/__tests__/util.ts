import { act, fireEvent } from '../../../tests/utils';

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

export async function awaitPromise() {
  for (let i = 0; i < 10; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await Promise.resolve();
  }
}
