import AbstractCalculator from './calculator';
import { unit } from '@ant-design/cssinjs';

export default class CSSCalculator extends AbstractCalculator<string> {
  result: string = '';

  constructor(num: string | number | CSSCalculator) {
    super();

    if (num instanceof CSSCalculator) {
      this.result = `(${num.result})`;
    } else {
      this.result = unit(num);
    }
  }

  add(num: string | number | AbstractCalculator<any>): this {
    if (num instanceof CSSCalculator) {
      this.result = `${this.result} + (${num.result})`;
    } else if (typeof num === 'number' || typeof num === 'string') {
      this.result = `${this.result} + ${unit(num)}`;
    }
    return this;
  }

  div(num: string | number | AbstractCalculator<any>): this {
    if (num instanceof CSSCalculator) {
      this.result = `${this.result} / (${num.result})`;
    } else if (typeof num === 'number' || typeof num === 'string') {
      this.result = `${this.result} / ${num}`;
    }
    return this;
  }

  sub(num: string | number | AbstractCalculator<any>): this {
    if (num instanceof CSSCalculator) {
      this.result = `${this.result} - (${num.result})`;
    } else if (typeof num === 'number' || typeof num === 'string') {
      this.result = `${this.result} - ${unit(num)}`;
    }
    return this;
  }

  mul(num: string | number | AbstractCalculator<any>): this {
    if (num instanceof CSSCalculator) {
      this.result = `${this.result} * (${num.result})`;
    } else if (typeof num === 'number' || typeof num === 'string') {
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
