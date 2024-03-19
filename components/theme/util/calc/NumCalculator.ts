import AbstractCalculator from './calculator';

export default class NumCalculator extends AbstractCalculator {
  result: number = 0;

  constructor(num: number | string | AbstractCalculator) {
    super();
    if (num instanceof NumCalculator) {
      this.result = num.result;
    } else if (typeof num === 'number') {
      this.result = num;
    }
  }

  add(num: number | string | AbstractCalculator): this {
    if (num instanceof NumCalculator) {
      this.result += num.result;
    } else if (typeof num === 'number') {
      this.result += num;
    }
    return this;
  }

  sub(num: number | string | AbstractCalculator): this {
    if (num instanceof NumCalculator) {
      this.result -= num.result;
    } else if (typeof num === 'number') {
      this.result -= num;
    }
    return this;
  }

  mul(num: number | string | AbstractCalculator): this {
    if (num instanceof NumCalculator) {
      this.result *= num.result;
    } else if (typeof num === 'number') {
      this.result *= num;
    }
    return this;
  }

  div(num: number | string | AbstractCalculator): this {
    if (num instanceof NumCalculator) {
      this.result /= num.result;
    } else if (typeof num === 'number') {
      this.result /= num;
    }
    return this;
  }

  equal(): number {
    return this.result;
  }
}
