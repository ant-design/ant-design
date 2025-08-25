export interface SizeMapToken {
  /**
   * @nameZH XXL
   * @desc 最大尺寸
   * @descEN Largest size
   * @default 48
   */
  sizeXXL: number;
  /**
   * @nameZH XL
   * @desc 超大尺寸
   * @descEN Extra-large size
   * @default 32
   */
  sizeXL: number;
  /**
   * @nameZH LG
   * @desc 大尺寸
   * @descEN Large size
   * @default 24
   */
  sizeLG: number;
  /**
   * @nameZH MD
   * @desc 中大尺寸
   * @descEN Medium-large size
   * @default 20
   */
  sizeMD: number;
  /**
   * @nameZH MS
   * @desc 与size大小相同，但在紧凑模式下可能更大
   * @descEN Same as `size`, but could be larger in compact mode
   */
  sizeMS: number;
  /**
   * @nameZH 默认
   * @desc 中等尺寸
   * @descEN Medium size
   * @default 16
   */
  size: number;
  /**
   * @nameZH SM
   * @desc 中小尺寸
   * @descEN Medium-small size
   * @default 12
   */
  sizeSM: number;
  /**
   * @nameZH XS
   * @desc 小尺寸
   * @descEN Small size
   * @default 8
   */
  sizeXS: number;
  /**
   * @nameZH XXS
   * @desc 最小尺寸
   * @descEN Smallest size
   * @default 4
   */
  sizeXXS: number;
}

export interface HeightMapToken {
  // Control
  /** Only Used for control inside component like Multiple Select inner selection item */

  /**
   * @nameZH 更小的组件高度
   * @nameEN XS component height
   * @desc 更小的组件高度
   * @descEN XS component height
   */
  controlHeightXS: number;

  /**
   * @nameZH 较小的组件高度
   * @nameEN SM component height
   * @desc 较小的组件高度
   * @descEN SM component height
   */
  controlHeightSM: number;

  /**
   * @nameZH 较高的组件高度
   * @nameEN LG component height
   * @desc 较高的组件高度
   * @descEN LG component height
   */
  controlHeightLG: number;
}
