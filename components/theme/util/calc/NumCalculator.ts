import AbstractCalculator from './calculator';

// TODO: should use RPN to implement this. Bug here but didn't used yet.
export default class NumCalculator extends AbstractCalculator<number> {
  constructor(num: number) {
    super();
    this.result = num;
  }

  add(num: number): this {
    this.result += num;
    return this;
  }

  div(num: number): this {
    this.result /= num;
    return this;
  }

  sub(num: number): this {
    this.result -= num;
    return this;
  }

  mul(num: number): this {
    this.result *= num;
    return this;
  }

  equal(): number {
    return this.result;
  }
}
