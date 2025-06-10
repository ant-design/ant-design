import { act, fireEvent } from '../../../tests/utils';

export async function awaitPromise() {
  for (let i = 0; i < 10; i += 1) {
    await Promise.resolve();
  }
}

export async function triggerMotionEnd(runAllTimers = true) {
  await awaitPromise();

  if (runAllTimers) {
    // Flush css motion state update
    for (let i = 0; i < 5; i += 1) {
      act(() => {
        jest.runAllTimers();
      });
    }
  }

  // document.querySelectorAll('.ant-notification-fade-leave').forEach(ele => {
  //   fireEvent.animationEnd(ele);
  // });
  document.querySelectorAll('[role="alert"]').forEach((ele) => {
    // close > notice > notice-wrapper
    fireEvent.animationEnd(ele.parentNode?.parentNode?.parentNode!);
  });

  await awaitPromise();
}
