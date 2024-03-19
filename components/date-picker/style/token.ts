import { TinyColor } from '@ctrl/tinycolor';

import type { SharedComponentToken, SharedInputToken } from '../../input/style/token';
import { initComponentToken } from '../../input/style/token';
import type { MultipleSelectorToken, SelectorToken } from '../../select/style/token';
import type { ArrowToken } from '../../style/roundedArrow';
import { getArrowToken } from '../../style/roundedArrow';
import type { GlobalToken } from '../../theme/interface';
import type {
  FullToken,
  GetDefaultToken,
  TokenWithCommonCls,
} from '../../theme/util/genComponentStyleHook';

export interface PanelComponentToken extends MultipleSelectorToken {
  /**
   * @desc 单元格悬浮态背景色
   * @descEN Background color of cell hover state
   */
  cellHoverBg: string;
  /**
   * @desc 选取范围内的单元格背景色
   * @descEN Background color of cell in range
   */
  cellActiveWithRangeBg: string;
  /**
   * @desc 选取范围内的单元格悬浮态背景色
   * @descEN Background color of hovered cell in range
   */
  cellHoverWithRangeBg: string;
  /**
   * @desc 单元格禁用态背景色
   * @descEN Background color of disabled cell
   */
  cellBgDisabled: string;
  /**
   * @desc 选取范围时单元格边框色
   * @descEN Border color of cell in range when picking
   */
  cellRangeBorderColor: string;
  /**
   * @desc 时间列宽度
   * @descEN Width of time column
   */
  timeColumnWidth: number;
  /**
   * @desc 时间列高度
   * @descEN Height of time column
   */
  timeColumnHeight: number;
  /**
   * @desc 时间单元格高度
   * @descEN Height of time cell
   */
  timeCellHeight: number;
  /**
   * @desc 单元格高度
   * @descEN Height of cell
   */
  cellHeight: number;
  /**
   * @desc 单元格宽度
   * @descEN Width of cell
   */
  cellWidth: number;
  /**
   * @desc 单元格文本高度
   * @descEN Height of cell text
   */
  textHeight: number;
  /**
   * @desc 十年/年/季/月/周单元格高度
   * @descEN Height of decade/year/quarter/month/week cell
   */
  withoutTimeCellHeight: number;
}

export interface ComponentToken
  extends Exclude<SharedComponentToken, 'addonBg'>,
    PanelComponentToken,
    ArrowToken {
  /**
   * @desc 预设区域宽度
   * @descEN Width of preset area
   */
  presetsWidth: number;
  /**
   * @desc 预设区域最大宽度
   * @descEN Max width of preset area
   */
  presetsMaxWidth: number;
  /**
   * @desc 弹窗 z-index
   * @descEN z-index of popup
   */
  zIndexPopup: number;
}

export type PickerPanelToken = {
  pickerCellCls: string;
  pickerCellInnerCls: string;
  pickerDatePanelPaddingHorizontal: number | string;
  pickerYearMonthCellWidth: number | string;
  pickerCellPaddingVertical: number | string;
  pickerQuarterPanelContentHeight: number | string;
  pickerCellBorderGap: number;
  pickerControlIconSize: number;
  pickerControlIconMargin: number;
  pickerControlIconBorderWidth: number;
};

export type PickerToken = FullToken<'DatePicker'> &
  PickerPanelToken &
  SharedInputToken &
  SelectorToken;

export type SharedPickerToken = TokenWithCommonCls<GlobalToken> &
  PickerPanelToken &
  PanelComponentToken;

export const initPickerPanelToken = (token: TokenWithCommonCls<GlobalToken>): PickerPanelToken => {
  const { componentCls, controlHeightLG, paddingXXS, padding } = token;

  return {
    pickerCellCls: `${componentCls}-cell`,
    pickerCellInnerCls: `${componentCls}-cell-inner`,
    pickerYearMonthCellWidth: token.calc(controlHeightLG).mul(1.5).equal(),
    pickerQuarterPanelContentHeight: token.calc(controlHeightLG).mul(1.4).equal(),
    pickerCellPaddingVertical: token.calc(paddingXXS).add(token.calc(paddingXXS).div(2)).equal(),
    pickerCellBorderGap: 2, // Magic for gap between cells
    pickerControlIconSize: 7,
    pickerControlIconMargin: 4,
    pickerControlIconBorderWidth: 1.5,
    pickerDatePanelPaddingHorizontal: token
      .calc(padding)
      .add(token.calc(paddingXXS).div(2))
      .equal(), // 18 in normal
  };
};

export const initPanelComponentToken = (token: GlobalToken): PanelComponentToken => {
  const { colorBgContainerDisabled, controlHeight, controlHeightSM, controlHeightLG, paddingXXS } =
    token;

  return {
    cellHoverBg: token.controlItemBgHover,
    cellActiveWithRangeBg: token.controlItemBgActive,
    cellHoverWithRangeBg: new TinyColor(token.colorPrimary).lighten(35).toHexString(),
    cellRangeBorderColor: new TinyColor(token.colorPrimary).lighten(20).toHexString(),
    cellBgDisabled: colorBgContainerDisabled,
    timeColumnWidth: controlHeightLG * 1.4,
    timeColumnHeight: 28 * 8,
    timeCellHeight: 28,
    cellWidth: controlHeightSM * 1.5,
    cellHeight: controlHeightSM,
    textHeight: controlHeightLG,
    withoutTimeCellHeight: controlHeightLG * 1.65,
    multipleItemBg: token.colorFillSecondary,
    multipleItemBorderColor: 'transparent',
    multipleItemHeight: controlHeight - paddingXXS * 2,
    multipleItemHeightSM: controlHeightSM - paddingXXS * 2,
    multipleItemHeightLG: controlHeightLG - paddingXXS * 2,
    multipleSelectorBgDisabled: colorBgContainerDisabled,
    multipleItemColorDisabled: token.colorTextDisabled,
    multipleItemBorderColorDisabled: 'transparent',
  };
};

export const prepareComponentToken: GetDefaultToken<'DatePicker'> = (token) => ({
  ...initComponentToken(token),
  ...initPanelComponentToken(token),
  ...getArrowToken(token),
  presetsWidth: 120,
  presetsMaxWidth: 200,
  zIndexPopup: token.zIndexPopupBase + 50,
});
