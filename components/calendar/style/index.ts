import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import type { PanelComponentToken, PickerPanelToken } from '../../date-picker/style';
import {
  genPanelStyle,
  initPanelComponentToken,
  initPickerPanelToken,
} from '../../date-picker/style';
import { resetComponent } from '../../style';
import type { FullToken, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';

export interface ComponentToken {
  /**
   * @desc 年选择器宽度
   * @descEN Width of year select
   */
  yearControlWidth: number | string;
  /**
   * @desc 月选择器宽度
   * @descEN Width of month select
   */
  monthControlWidth: number | string;
  /**
   * @desc 迷你日历内容高度
   * @descEN Height of mini calendar content
   */
  miniContentHeight: number | string;
  /**
   * @desc 完整日历背景色
   * @descEN Background color of full calendar
   */
  fullBg: string;
  /**
   * @desc 完整日历面板背景色
   * @descEN Background color of full calendar panel
   */
  fullPanelBg: string;
  /**
   * @desc 日期项选中背景色
   * @descEN Background color of selected date item
   */
  itemActiveBg: string;
}

interface CalendarToken extends FullToken<'Calendar'>, PickerPanelToken, PanelComponentToken {
  /**
   * @desc 日历类名
   * @descEN Calendar class name
   */
  calendarCls: string;
  /**
   * @desc 日期值高度
   * @descEN Date value height
   */
  dateValueHeight: number | string;
  /**
   * @desc 周高度
   * @descEN Week height
   */
  weekHeight: number | string;
  /**
   * @desc 日期内容高度
   * @descEN Date content height
   */
  dateContentHeight: number | string;
}

export const genCalendarStyles = (token: CalendarToken): CSSObject => {
  const { calendarCls, componentCls, fullBg, fullPanelBg, itemActiveBg } = token;
  return {
    [calendarCls]: {
      ...genPanelStyle(token),
      ...resetComponent(token),
      background: fullBg,
      '&-rtl': {
        direction: 'rtl',
      },
      [`${calendarCls}-header`]: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: `${unit(token.paddingSM)} 0`,

        [`${calendarCls}-year-select`]: {
          minWidth: token.yearControlWidth,
        },
        [`${calendarCls}-month-select`]: {
          minWidth: token.monthControlWidth,
          marginInlineStart: token.marginXS,
        },
        [`${calendarCls}-mode-switch`]: {
          marginInlineStart: token.marginXS,
        },
      },
    },
    [`${calendarCls} ${componentCls}-panel`]: {
      background: fullPanelBg,
      border: 0,
      borderTop: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
      borderRadius: 0,
      [`${componentCls}-month-panel, ${componentCls}-date-panel`]: {
        width: 'auto',
      },
      [`${componentCls}-body`]: {
        padding: `${unit(token.paddingXS)} 0`,
      },
      [`${componentCls}-content`]: {
        width: '100%',
      },
    },
    [`${calendarCls}-mini`]: {
      borderRadius: token.borderRadiusLG,
      [`${calendarCls}-header`]: {
        paddingInlineEnd: token.paddingXS,
        paddingInlineStart: token.paddingXS,
      },
      [`${componentCls}-panel`]: {
        borderRadius: `0 0 ${unit(token.borderRadiusLG)} ${unit(token.borderRadiusLG)}`,
      },
      [`${componentCls}-content`]: {
        height: token.miniContentHeight,
        th: {
          height: 'auto',
          padding: 0,
          lineHeight: unit(token.weekHeight),
        },
      },
      [`${componentCls}-cell::before`]: {
        pointerEvents: 'none',
      },
    },
    [`${calendarCls}${calendarCls}-full`]: {
      [`${componentCls}-panel`]: {
        display: 'block',
        width: '100%',
        textAlign: 'end',
        background: fullBg,
        border: 0,
        [`${componentCls}-body`]: {
          'th, td': {
            padding: 0,
          },
          th: {
            height: 'auto',
            paddingInlineEnd: token.paddingSM,
            paddingBottom: token.paddingXXS,
            lineHeight: unit(token.weekHeight),
          },
        },
      },
      [`${componentCls}-cell-week ${componentCls}-cell-inner`]: {
        display: 'block',
        borderRadius: 0,
        borderTop: `${unit(token.lineWidthBold)} ${token.lineType} ${token.colorSplit}`,
        width: '100%',
        height: token
          .calc(token.dateValueHeight)
          .add(token.dateContentHeight)
          .add(token.calc(token.paddingXS).div(2))
          .add(token.lineWidthBold)
          .equal(),
      },
      [`${componentCls}-cell`]: {
        '&::before': {
          display: 'none',
        },
        '&:hover': {
          [`${calendarCls}-date`]: {
            background: token.controlItemBgHover,
          },
        },
        [`${calendarCls}-date-today::before`]: {
          display: 'none',
        },
        // >>> Selected
        [`&-in-view${componentCls}-cell-selected`]: {
          [`${calendarCls}-date, ${calendarCls}-date-today`]: {
            background: itemActiveBg,
          },
        },
        '&-selected, &-selected:hover': {
          [`${calendarCls}-date, ${calendarCls}-date-today`]: {
            [`${calendarCls}-date-value`]: {
              color: token.colorPrimary,
            },
          },
        },
      },
      [`${calendarCls}-date`]: {
        display: 'block',
        width: 'auto',
        height: 'auto',
        margin: `0 ${unit(token.calc(token.marginXS).div(2).equal())}`,
        padding: `${unit(token.calc(token.paddingXS).div(2).equal())} ${unit(token.paddingXS)} 0`,
        border: 0,
        borderTop: `${unit(token.lineWidthBold)} ${token.lineType} ${token.colorSplit}`,
        borderRadius: 0,
        transition: `background ${token.motionDurationSlow}`,
        '&-value': {
          lineHeight: unit(token.dateValueHeight),
          transition: `color ${token.motionDurationSlow}`,
        },
        '&-content': {
          position: 'static',
          width: 'auto',
          height: token.dateContentHeight,
          overflowY: 'auto',
          color: token.colorText,
          lineHeight: token.lineHeight,
          textAlign: 'start',
        },
        '&-today': {
          borderColor: token.colorPrimary,
          [`${calendarCls}-date-value`]: {
            color: token.colorText,
          },
        },
      },
    },
    [`@media only screen and (max-width: ${unit(token.screenXS)}) `]: {
      [calendarCls]: {
        [`${calendarCls}-header`]: {
          display: 'block',
          [`${calendarCls}-year-select`]: {
            width: '50%',
          },
          [`${calendarCls}-month-select`]: {
            width: `calc(50% - ${unit(token.paddingXS)})`,
          },
          [`${calendarCls}-mode-switch`]: {
            width: '100%',
            marginTop: token.marginXS,
            marginInlineStart: 0,
            '> label': {
              width: '50%',
              textAlign: 'center',
            },
          },
        },
      },
    },
  };
};

export const prepareComponentToken: GetDefaultToken<'Calendar'> = (token) => ({
  fullBg: token.colorBgContainer,
  fullPanelBg: token.colorBgContainer,
  itemActiveBg: token.controlItemBgActive,
  yearControlWidth: 80,
  monthControlWidth: 70,
  miniContentHeight: 256,
  ...initPanelComponentToken(token),
});

export default genStyleHooks(
  'Calendar',
  (token) => {
    const calendarCls = `${token.componentCls}-calendar`;
    const calendarToken = mergeToken<CalendarToken>(token, initPickerPanelToken(token), {
      calendarCls,
      pickerCellInnerCls: `${token.componentCls}-cell-inner`,
      dateValueHeight: token.controlHeightSM,
      weekHeight: token.calc(token.controlHeightSM).mul(0.75).equal() as number,
      dateContentHeight: token
        .calc(token.calc(token.fontHeightSM).add(token.marginXS))
        .mul(3)
        .add(token.calc(token.lineWidth).mul(2))
        .equal() as number,
    });

    return [genCalendarStyles(calendarToken)];
  },
  prepareComponentToken,
);
