abstract class AbstractCalculator {
  /**
   * 加
   */
  abstract add(num: number | string | AbstractCalculator): this;

  /**
   * 减
   */
  abstract sub(num: number | string | AbstractCalculator): this;

  /**
   * 乘
   */
  abstract mul(num: number | string | AbstractCalculator): this;

  /**
   * 除
   */
  abstract div(num: number | string | AbstractCalculator): this;

  /**
   * 等于
   */
  abstract equal(options?: { unit?: boolean }): string | number;
}

export default AbstractCalculator;
