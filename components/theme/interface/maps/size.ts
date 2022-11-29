export interface SizeMapToken {
  // Size
  sizeXXL: number;
  sizeXL: number;
  sizeLG: number;
  sizeMD: number;
  /** Same as size by default, but could be larger in compact mode */
  sizeMS: number;
  size: number;
  sizeSM: number;
  sizeXS: number;
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
