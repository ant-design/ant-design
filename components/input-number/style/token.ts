import { FastColor } from '@ant-design/fast-color';

import type { SharedComponentToken, SharedInputToken } from '../../input/style/token';
import { initComponentToken } from '../../input/style/token';
import type { FullToken, GetDefaultToken } from '../../theme/internal';

export interface ComponentToken extends SharedComponentToken {
  /**
   * @desc 输入框宽度
   * @descEN Width of input
   */
  controlWidth: number;
  /**
   * @desc 操作按钮宽度
   * @descEN Width of control button
   */
  handleWidth: number;
  /**
   * @desc 操作按钮图标大小
   * @descEN Icon size of control button
   */
  handleFontSize: number;
  /**
   * Default `auto`. Set `true` will always show the handle
   * @desc 操作按钮可见性
   * @descEN Handle visible
   */
  handleVisible: 'auto' | true;
  /**
   * @desc 操作按钮背景色
   * @descEN Background color of handle
   */
  handleBg: string;
  /**
   * @desc 操作按钮激活背景色
   * @descEN Active background color of handle
   */
  handleActiveBg: string;
  /**
   * @desc 操作按钮悬浮颜色
   * @descEN Hover color of handle
   */
  handleHoverColor: string;
  /**
   * @desc 操作按钮边框颜色
   * @descEN Border color of handle
   */
  handleBorderColor: string;
  /**
   * @desc 面性变体操作按钮背景色
   * @descEN Background color of handle in filled variant
   */
  filledHandleBg: string;
  /**
   * @internal
   */
  handleOpacity: number;
  /**
   * @internal
   */
  handleVisibleWidth: number;
}

export type InputNumberToken = FullToken<'InputNumber'> & SharedInputToken;

export const prepareComponentToken: GetDefaultToken<'InputNumber'> = (token) => {
  const handleVisible = token.handleVisible ?? 'auto';
  const handleWidth = token.controlHeightSM - token.lineWidth * 2;

  return {
    ...initComponentToken(token),
    controlWidth: 90,
    handleWidth,
    handleFontSize: token.fontSize / 2,
    handleVisible,
    handleActiveBg: token.colorFillAlter,
    handleBg: token.colorBgContainer,
    filledHandleBg: new FastColor(token.colorFillSecondary)
      .onBackground(token.colorBgContainer)
      .toHexString(),
    handleHoverColor: token.colorPrimary,
    handleBorderColor: token.colorBorder,
    handleOpacity: handleVisible === true ? 1 : 0,
    handleVisibleWidth: handleVisible === true ? handleWidth : 0,
  };
};
