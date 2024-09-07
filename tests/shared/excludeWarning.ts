// eslint-disable-next-line no-console
const originError = console.error;

export function isSafeWarning(message: boolean, all = false) {
  const list = ['useLayoutEffect does nothing on the server'];

  if (all) {
    list.push('is deprecated in StrictMode');
  }

  return list.some((msg) => String(message).includes(msg));
}

/** This function will remove `useLayoutEffect` server side warning. Since it's useless. */
export function excludeWarning() {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation((msg, ...rest) => {
    if (isSafeWarning(msg)) {
      return;
    }
    originError(msg, ...rest);
  });

  return errorSpy;
}

export default function excludeAllWarning() {
  let cleanUp: () => void;

  beforeAll(() => {
    cleanUp = excludeWarning().mockRestore;
  });

  afterAll(() => {
    cleanUp();
  });
}
