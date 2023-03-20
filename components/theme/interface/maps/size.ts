export interface SizeMapToken {
  /**
   * @nameZH XXL
   * @default 48
   */
  sizeXXL: number;
  /**
   * @nameZH XL
   * @default 32
   */
  sizeXL: number;
  /**
   * @nameZH LG
   * @default 24
   */
  sizeLG: number;
  /**
   * @nameZH MD
   * @default 20
   */
  sizeMD: number;
  /** Same as size by default, but could be larger in compact mode */
  sizeMS: number;
  /**
   * @nameZH 默认
   * @desc 默认尺寸
   * @default 16
   */
  size: number;
  /**
   * @nameZH SM
   * @default 12
   */
  sizeSM: number;
  /**
   * @nameZH XS
   * @default 8
   */
  sizeXS: number;
  /**
   * @nameZH XXS
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
   */
  controlHeightXS: number;

  /**
   * @nameZH 较小的组件高度
   * @nameEN SM component height
   */
  controlHeightSM: number;

  /**
   * @nameZH 较高的组件高度
   * @nameEN LG component height
   */
  controlHeightLG: number;
}
