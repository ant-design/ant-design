import AbstractCalculator from './calculator';

const CALC_UNIT = 'CALC_UNIT';

const regexp = new RegExp(CALC_UNIT, 'g');

function unit(value: string | number) {
  if (typeof value === 'number') {
    return `${value}${CALC_UNIT}`;
  }
  return value;
}

/**
 * For css var, some properties are unitless.
 * The `num` passed to `constructor` will be transformed as `var(--ant-z-index-popup-base)`.
 * We do the key string mapping here to avoid the `unit` transformation.
 *
 * It's a little hack since it deps on the css var name,
 * But currently `token.calc` can not get the real css prop name.
 */
const UNITLESS_LIST = ['z-index'];

export default class CSSCalculator extends AbstractCalculator {
  result: string = '';

  unitless?: boolean;

  lowPriority?: boolean;

  constructor(num: number | string | AbstractCalculator) {
    super();

    const numType = typeof num;

    this.unitless =
      numType === 'string' && UNITLESS_LIST.some((unitless) => (num as string).includes(unitless));

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
      this.result = `${this.result} + ${this.unitless ? num : unit(num)}`;
    }
    this.lowPriority = true;
    return this;
  }

  sub(num: number | string | AbstractCalculator): this {
    if (num instanceof CSSCalculator) {
      this.result = `${this.result} - ${num.getResult()}`;
    } else if (typeof num === 'number' || typeof num === 'string') {
      this.result = `${this.result} - ${this.unitless ? num : unit(num)}`;
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
    const { unit: cssUnit = true } = options || {};
    this.result = this.result.replace(regexp, cssUnit ? 'px' : '');
    if (typeof this.lowPriority !== 'undefined') {
      return `calc(${this.result})`;
    }
    return this.result;
  }
}
