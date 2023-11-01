export default abstract class AbstractCalculator {
  abstract add(num: number | AbstractCalculator): this;

  abstract sub(num: number | AbstractCalculator): this;

  abstract mul(num: number | AbstractCalculator): this;

  abstract div(num: number | AbstractCalculator): this;

  abstract equal(): string | number;
}
