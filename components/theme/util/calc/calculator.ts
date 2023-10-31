export default abstract class AbstractCalculator<T> {
  abstract add(num: T): this;

  abstract sub(num: T): this;

  abstract mul(num: T): this;

  abstract div(num: T): this;

  abstract equal(): T;
}
