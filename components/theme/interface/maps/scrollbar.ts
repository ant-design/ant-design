export interface ScrollBarToken {
  /**
   * @desc 滚动条颜色
   * @descEN Scrollbar color
   * @default auto
   * @since 5.16.0
   */
  scrollbarColor: string;
  /**
   * @desc 滚动条宽度
   * @descEN Scrollbar width
   * @default auto
   * @since 5.16.0
   */
  scrollbarWidth: string;
  /**
   * @desc 预留的滚动条空间，以避免滚动条出现时布局变化
   * @descEN Reserved space for scrollbar to avoid layout changes when scrollbar appears
   * @default auto
   * @since 5.16.0
   */
  scrollbarGutter: string;
}
