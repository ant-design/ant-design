// eslint-disable-next-line no-console
const originError = console.error;

export function isSafeWarning(message: boolean) {
  return String(message).includes('useLayoutEffect does nothing on the server');
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
  let cleanUp: Function;

  beforeAll(() => {
    cleanUp = excludeWarning().mockRestore;
  });

  afterAll(() => {
    cleanUp();
  });
}
