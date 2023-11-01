import AbstractCalculator from './calculator';
import { unit } from '@ant-design/cssinjs';

export default class CSSCalculator extends AbstractCalculator {
  result: string = '';

  constructor(num: number | CSSCalculator) {
    super();

    if (num instanceof CSSCalculator) {
      this.result = `(${num.result})`;
    } else {
      this.result = unit(num);
    }
  }

  add(num: number | AbstractCalculator): this {
    if (num instanceof CSSCalculator) {
      this.result = `${this.result} + (${num.result})`;
    } else if (typeof num === 'number') {
      this.result = `${this.result} + ${unit(num)}`;
    }
    return this;
  }

  div(num: number | AbstractCalculator): this {
    if (num instanceof CSSCalculator) {
      this.result = `${this.result} / (${num.result})`;
    } else if (typeof num === 'number') {
      this.result = `${this.result} / ${num}`;
    }
    return this;
  }

  sub(num: number | AbstractCalculator): this {
    if (num instanceof CSSCalculator) {
      this.result = `${this.result} - (${num.result})`;
    } else if (typeof num === 'number') {
      this.result = `${this.result} - ${unit(num)}`;
    }
    return this;
  }

  mul(num: number | AbstractCalculator): this {
    if (num instanceof CSSCalculator) {
      this.result = `${this.result} * (${num.result})`;
    } else if (typeof num === 'number') {
      this.result = `${this.result} * ${num}`;
    }
    return this;
  }

  equal(): string {
    if (/\s[*+/-]\s/.test(this.result)) {
      return `calc(${this.result})`;
    }
    return this.result;
  }
}
