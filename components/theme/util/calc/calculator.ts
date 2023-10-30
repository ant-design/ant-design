export default abstract class AbstractCalculator<T> {
  result: T;

  protected dirty: boolean = false;

  abstract add(num: T): this;

  abstract sub(num: T): this;

  abstract mul(num: T): this;

  abstract div(num: T): this;

  abstract equal(): T;
}
