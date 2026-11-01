const originError = console.error;

/** This function will remove `useLayoutEffect` server side warning. Since it's useless. */
export function excludeWarning() {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation((msg, ...rest) => {
    if (String(msg).includes('useLayoutEffect does nothing on the server')) {
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
