export default abstract class AbstractCalculator {
  abstract add(num: number | string | AbstractCalculator): this;

  abstract sub(num: number | string | AbstractCalculator): this;

  abstract mul(num: number | string | AbstractCalculator): this;

  abstract div(num: number | string | AbstractCalculator): this;

  abstract equal(): string | number;
}
