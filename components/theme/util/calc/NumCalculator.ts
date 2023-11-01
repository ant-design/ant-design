import AbstractCalculator from './calculator';

enum Operator {
  ADD = '+',
  SUB = '-',
  MUL = '*',
  DIV = '/',
}

export default class NumCalculator extends AbstractCalculator<number> {
  expression: (number | Operator)[] = [];

  operators: Operator[] = [];

  constructor(num: number | AbstractCalculator<any>) {
    super();
    if (num instanceof NumCalculator) {
      this.expression.push(num.equal());
    } else if (typeof num === 'number') {
      this.expression.push(num);
    }
  }

  add(num: number | AbstractCalculator<any>): this {
    const number = num instanceof AbstractCalculator ? num.equal() : num;
    this.expression.push(...this.operators.reverse());
    this.expression.push(number);
    this.operators = [Operator.ADD];
    return this;
  }

  sub(num: number | AbstractCalculator<any>): this {
    const number = num instanceof AbstractCalculator ? num.equal() : num;
    this.expression.push(...this.operators.reverse());
    this.expression.push(number);
    this.operators = [Operator.SUB];
    return this;
  }

  div(num: number | AbstractCalculator<any>): this {
    const number = num instanceof AbstractCalculator ? num.equal() : num;
    while (this.operators.length) {
      const operator = this.operators.pop()!;
      if (operator === Operator.MUL || operator === Operator.DIV) {
        this.expression.push(operator);
      } else {
        this.operators.push(operator, Operator.DIV);
        break;
      }
    }
    if (this.operators.length === 0) {
      this.operators.push(Operator.DIV);
    }
    this.expression.push(number);
    return this;
  }

  mul(num: number | AbstractCalculator<any>): this {
    const number = num instanceof AbstractCalculator ? num.equal() : num;
    while (this.operators.length) {
      const operator = this.operators.pop()!;
      if (operator === Operator.MUL || operator === Operator.DIV) {
        this.expression.push(operator);
      } else {
        this.operators.push(operator, Operator.MUL);
        break;
      }
    }
    if (this.operators.length === 0) {
      this.operators.push(Operator.MUL);
    }
    this.expression.push(number);
    return this;
  }

  equal(): number {
    const finalExp = [...this.expression];
    finalExp.push(...this.operators.reverse());
    this.calc(finalExp);
    return finalExp[0] as number;
  }

  private calc(exp: (number | Operator)[]) {
    for (let i = 0; i < exp.length; i++) {
      if (typeof exp[i] === 'string') {
        let tempResult = 0;
        const num1 = exp[i - 2] as number;
        const num2 = exp[i - 1] as number;
        switch (exp[i]) {
          case Operator.ADD:
            tempResult = num1 + num2;
            break;
          case Operator.SUB:
            tempResult = num1 - num2;
            break;
          case Operator.MUL:
            tempResult = num1 * num2;
            break;
          case Operator.DIV:
            tempResult = num1 / num2;
            break;
          default:
            break;
        }
        exp.splice(i - 2, 3, tempResult);
        break;
      }
    }
    if (exp.length > 2) {
      this.calc(exp);
    }
  }
}
