export interface FontMapToken {
  // Font Size
  /**
   * @desc 小号字体大小
   * @descEN Small font size
   */
  fontSizeSM: number;
  /**
   * @desc 标准字体大小
   * @descEN Standard font size
   */
  fontSize: number;
  /**
   * @desc 大号字体大小
   * @descEN Large font size
   */
  fontSizeLG: number;
  /**
   * @desc 超大号字体大小
   * @descEN Super large font size
   */
  fontSizeXL: number;

  /**
   * @nameZH 一级标题字号
   * @desc H1 标签所使用的字号
   * @default 38
   */
  fontSizeHeading1: number;
  /**
   * @nameZH 二级标题字号
   * @desc h2 标签所使用的字号
   * @default 30
   */
  fontSizeHeading2: number;
  /**
   * @nameZH 三级标题字号
   * @desc h3 标签使用的字号
   * @default 24
   */
  fontSizeHeading3: number;
  /**
   * @nameZH 四级标题字号
   * @desc h4 标签使用的字号
   * @default 20
   */
  fontSizeHeading4: number;
  /**
   * @nameZH 五级标题字号
   * @desc h5 标签使用的字号
   * @default 16
   */
  fontSizeHeading5: number;

  // LineHeight
  /**
   * @desc 文本行高
   * @descEN Line height of text.
   */
  lineHeight: number;
  /**
   * @desc 大型文本行高
   * @descEN Line height of large text.
   */
  lineHeightLG: number;
  /**
   * @desc 小型文本行高
   * @descEN Line height of small text.
   */
  lineHeightSM: number;

  lineHeightHeading1: number;
  lineHeightHeading2: number;
  lineHeightHeading3: number;
  lineHeightHeading4: number;
  lineHeightHeading5: number;
}
