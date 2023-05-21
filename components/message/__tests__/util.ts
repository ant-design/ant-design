import { vi } from 'vitest';
import { fireEvent } from '../../../tests/utils';

export async function awaitPromise() {
  for (let i = 0; i < 10; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await Promise.resolve();
  }
}

export async function triggerMotionEnd(selector: string = '.ant-message-move-up-leave') {
  await awaitPromise();
  await vi.runAllTimersAsync();

  document.querySelectorAll(selector).forEach((ele) => {
    fireEvent.animationEnd(ele);
  });

  await awaitPromise();
}
