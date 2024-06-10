import AbstractCalculator from './calculator';

const CALC_UNIT = 'CALC_UNIT';

const regexp = new RegExp(CALC_UNIT, 'g');

function unit(value: string | number) {
  if (typeof value === 'number') {
    return `${value}${CALC_UNIT}`;
  }
  return value;
}

export default class CSSCalculator extends AbstractCalculator {
  result: string = '';

  unitlessCssVar: Set<string>;

  lowPriority?: boolean;

  constructor(num: number | string | AbstractCalculator, unitlessCssVar: Set<string>) {
    super();

    const numType = typeof num;

    this.unitlessCssVar = unitlessCssVar;

    if (num instanceof CSSCalculator) {
      this.result = `(${num.result})`;
    } else if (numType === 'number') {
      this.result = unit(num as number);
    } else if (numType === 'string') {
      this.result = num as string;
    }
  }

  add(num: number | string | AbstractCalculator): this {
    if (num instanceof CSSCalculator) {
      this.result = `${this.result} + ${num.getResult()}`;
    } else if (typeof num === 'number' || typeof num === 'string') {
      this.result = `${this.result} + ${unit(num)}`;
    }
    this.lowPriority = true;
    return this;
  }

  sub(num: number | string | AbstractCalculator): this {
    if (num instanceof CSSCalculator) {
      this.result = `${this.result} - ${num.getResult()}`;
    } else if (typeof num === 'number' || typeof num === 'string') {
      this.result = `${this.result} - ${unit(num)}`;
    }
    this.lowPriority = true;
    return this;
  }

  mul(num: number | string | AbstractCalculator): this {
    if (this.lowPriority) {
      this.result = `(${this.result})`;
    }
    if (num instanceof CSSCalculator) {
      this.result = `${this.result} * ${num.getResult(true)}`;
    } else if (typeof num === 'number' || typeof num === 'string') {
      this.result = `${this.result} * ${num}`;
    }
    this.lowPriority = false;
    return this;
  }

  div(num: number | string | AbstractCalculator): this {
    if (this.lowPriority) {
      this.result = `(${this.result})`;
    }
    if (num instanceof CSSCalculator) {
      this.result = `${this.result} / ${num.getResult(true)}`;
    } else if (typeof num === 'number' || typeof num === 'string') {
      this.result = `${this.result} / ${num}`;
    }
    this.lowPriority = false;
    return this;
  }

  getResult(force?: boolean): string {
    return this.lowPriority || force ? `(${this.result})` : this.result;
  }

  equal(options?: { unit?: boolean }): string {
    const { unit: cssUnit } = options || {};

    let mergedUnit: boolean = true;
    if (typeof cssUnit === 'boolean') {
      mergedUnit = cssUnit;
    } else if (Array.from(this.unitlessCssVar).some((cssVar) => this.result.includes(cssVar))) {
      mergedUnit = false;
    }

    this.result = this.result.replace(regexp, mergedUnit ? 'px' : '');
    if (typeof this.lowPriority !== 'undefined') {
      return `calc(${this.result})`;
    }
    return this.result;
  }
}
