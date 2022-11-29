export interface SizeMapToken {
  /**
   * @name XXL
   * @default 48
   */
  sizeXXL: number;
  /**
   * @name XL
   * @default 32
   */
  sizeXL: number;
  /**
   * @name LG
   * @default 24
   */
  sizeLG: number;
  /**
   * @name MD
   * @default 20
   */
  sizeMD: number;
  /** Same as size by default, but could be larger in compact mode */
  sizeMS: number;
  /**
   * @name 默认
   * @desc 默认尺寸
   * @default 16
   */
  size: number;
  /**
   * @name SM
   * @default 12
   */
  sizeSM: number;
  /**
   * @name XS
   * @default 8
   */
  sizeXS: number;
  /**
   * @name XXS
   * @default 4
   */
  sizeXXS: number;
}

export interface HeightMapToken {
  // Control
  /** @private Only Used for control inside component like Multiple Select inner selection item */
  controlHeightXS: number;
  controlHeightSM: number;
  controlHeightLG: number;
}

// Font
export interface FontSizeMapToken {
  /**
   * @internal
   */
  fontSizes: number[];
  /**
   * @internal
   */
  lineHeights: number[];
}
