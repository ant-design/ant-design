export interface FontMapToken {
  // Font Size
  fontSizeSM: number;
  fontSize: number;
  fontSizeLG: number;
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
  lineHeight: number;
  lineHeightLG: number;
  lineHeightSM: number;

  lineHeightHeading1: number;
  lineHeightHeading2: number;
  lineHeightHeading3: number;
  lineHeightHeading4: number;
  lineHeightHeading5: number;
}
