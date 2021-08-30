/**
 * This function will remove `useLayoutEffect` server side warning.
 * Since it's useless.
 */
export default function excludeWarning() {
  beforeAll(() => {
    const originError = console.error;

    jest.spyOn(console, 'error').mockImplementation((msg, ...rest) => {
      if (String(msg).includes('useLayoutEffect does nothing on the server')) {
        return;
      }
      originError(msg, ...rest);
    });
  });
}
