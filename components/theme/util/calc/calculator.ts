abstract class AbstractCalculator {
  /**
   * @descCN 计算两数的和，例如：1 + 2
   * @descEN Calculate the sum of two numbers, e.g. 1 + 2
   */
  abstract add(num: number | string | AbstractCalculator): this;

  /**
   * @descCN 计算两数的差，例如：1 - 2
   * @descEN Calculate the difference between two numbers, e.g. 1 - 2
   */
  abstract sub(num: number | string | AbstractCalculator): this;

  /**
   * @descCN 计算两数的积，例如：1 * 2
   * @descEN Calculate the product of two numbers, e.g. 1 * 2
   */
  abstract mul(num: number | string | AbstractCalculator): this;

  /**
   * @descCN 计算两数的商，例如：1 / 2
   * @descEN Calculate the quotient of two numbers, e.g. 1 / 2
   */
  abstract div(num: number | string | AbstractCalculator): this;

  /**
   * @descCN 获取计算结果
   * @descEN Get the calculation result
   */
  abstract equal(options?: { unit?: boolean }): string | number;
}

export default AbstractCalculator;
