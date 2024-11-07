import { act, fireEvent } from '../../../tests/utils';

export async function awaitPromise() {
  for (let i = 0; i < 10; i += 1) {
    await Promise.resolve();
  }
}

export async function triggerMotionEnd(selector = '.ant-message-move-up-leave') {
  await awaitPromise();

  // Flush css motion state update
  for (let i = 0; i < 5; i += 1) {
    act(() => {
      jest.runAllTimers();
    });
  }

  document.querySelectorAll(selector).forEach((ele) => {
    fireEvent.animationEnd(ele);
  });

  await awaitPromise();
}
