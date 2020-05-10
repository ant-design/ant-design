declare namespace jest {
  interface Matchers<R> {
    toMatchRenderedSnapshot(): R;
  }
}
