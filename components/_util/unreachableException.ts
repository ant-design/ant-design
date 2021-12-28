export default class UnreachableException {
  error: Error;

  constructor(value: never) {
    this.error = new Error(`unreachable case: ${JSON.stringify(value)}`);
  }
}
