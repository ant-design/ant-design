import AbstractCalculator from 'antd/es/theme/util/calc/calculator';
import { unit } from '@ant-design/cssinjs';

export default class CSSCalculator extends AbstractCalculator<string> {
  constructor(num: string | number | CSSCalculator) {
    super();

    if (num instanceof CSSCalculator) {
      this.result = `(${num.result})`;
    } else {
      this.result = unit(num);
    }
  }

  add(num: string | number | CSSCalculator): this {
    if (num instanceof CSSCalculator) {
      this.result = `${this.result} + (${num.result})`;
    } else {
      this.result = `${this.result} + ${unit(num)}`;
    }
    return this;
  }

  div(num: string | number | CSSCalculator): this {
    if (num instanceof CSSCalculator) {
      this.result = `${this.result} / (${num.result})`;
    } else {
      this.result = `${this.result} / ${num}`;
    }
    return this;
  }

  sub(num: string | number | CSSCalculator): this {
    if (num instanceof CSSCalculator) {
      this.result = `${this.result} - (${num.result})`;
    } else {
      this.result = `${this.result} - ${unit(num)}`;
    }
    return this;
  }

  mul(num: string | number | CSSCalculator): this {
    if (num instanceof CSSCalculator) {
      this.result = `${this.result} * (${num.result})`;
    } else {
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
