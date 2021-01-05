export default class UnreachableException {
  constructor(value: never) {
    return new Error(`unreachable case: ${JSON.stringify(value)}`);
  }
}
