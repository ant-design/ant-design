// deps-lint-skip-all

import type { CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import type { FullToken } from '../../_util/theme';
import { genComponentStyleHook, mergeToken, resetComponent } from '../../_util/theme';
import type { ComponentToken as DatePickerComponentToken } from '../../date-picker/style';
import { genPanelStyle } from '../../date-picker/style';
import type { InputToken } from '../../input/style';
import { initInputToken } from '../../input/style';

export interface ComponentToken extends Omit<DatePickerComponentToken, 'zIndexPopup'> {
  calendarFullBg: string;
  calendarFullPanelBg: string;
  calendarItemActiveBg: string;
}

interface CalendarToken extends InputToken<FullToken<'Calendar'>> {
  calendarCls: string;
  // date-picker token
  pickerCellInnerCls: string;
}

export const genCalendarStyles = (token: CalendarToken): CSSObject => {
  const { calendarCls, componentCls, calendarFullBg, calendarFullPanelBg, calendarItemActiveBg } =
    token;
  return {
    [calendarCls]: {
      ...genPanelStyle(token, calendarItemActiveBg),
      ...resetComponent(token),
      background: calendarFullBg,
      '&-rtl': {
        direction: 'rtl',
      },
      [`${calendarCls}-header`]: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: `${token.paddingSM}px 0`,

        [`${calendarCls}-year-select`]: {
          // FIXME hardcode in v4
          minWidth: 80,
        },
        [`${calendarCls}-month-select`]: {
          // FIXME hardcode in v4
          minWidth: 70,
          // FIXME hardcode in v4
          marginInlineStart: token.marginXS,
        },
        [`${calendarCls}-mode-switch`]: {
          // FIXME hardcode in v4
          marginInlineStart: token.marginXS,
        },
      },
    },
    [`${calendarCls} ${componentCls}-panel`]: {
      background: calendarFullPanelBg,
      border: 0,
      borderTop: `${token.controlLineWidth}px ${token.controlLineType} ${token.colorSplit}`,
      borderRadius: 0,
      [`${componentCls}-month-panel, ${componentCls}-date-panel`]: {
        width: 'auto',
      },
      [`${componentCls}-body`]: {
        padding: `${token.paddingXS}px 0`,
      },
      [`${componentCls}-content`]: {
        width: '100%',
      },
    },
    [`${calendarCls}-mini`]: {
      // FIXME hardcode in v4
      borderRadius: token.radiusBase,
      [`${calendarCls}-header`]: {
        // FIXME hardcode in v4
        paddingInlineEnd: token.paddingXS,
        // FIXME hardcode in v4
        paddingInlineStart: token.paddingXS,
      },
      [`${componentCls}-panel`]: {
        borderRadius: `0 0 ${token.radiusBase}px ${token.radiusBase}px`,
      },
      [`${componentCls}-content`]: {
        // FIXME hardcode in v4
        height: 256,
        th: {
          height: 'auto',
          padding: 0,
          lineHeight: '18px',
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
        background: calendarFullBg,
        border: 0,
        [`${componentCls}-body`]: {
          'th, td': {
            padding: 0,
          },
          th: {
            height: 'auto',
            // FIXME hardcode in v4
            paddingInlineEnd: 12,
            // FIXME hardcode in v4
            paddingBottom: 5,
            lineHeight: '18px',
          },
        },
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
        '&-selected, &-selected:hover': {
          [`${calendarCls}-date, ${calendarCls}-date-today`]: {
            background: calendarItemActiveBg,
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
        margin: `0 ${token.marginXS / 2}px`,
        padding: `${token.paddingXS / 2}px ${token.paddingXS}px 0`,
        border: 0,
        // FIXME hardcode in v4
        borderTop: `2px solid ${token.colorSplit}`,
        borderRadius: 0,
        transition: `background ${token.motionDurationSlow}`,
        '&-value': {
          // FIXME hardcode in v4
          lineHeight: '24px',
          transition: `color ${token.motionDurationSlow}`,
        },
        '&-content': {
          position: 'static',
          width: 'auto',
          // FIXME hardcode in v4
          height: 86,
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
    [`@media only screen and (max-width: ${token.screenXS}px) `]: {
      [`${calendarCls}`]: {
        [`${calendarCls}-header`]: {
          display: 'block',
          [`${calendarCls}-year-select`]: {
            width: '50%',
          },
          [`${calendarCls}-month-select`]: {
            width: `calc(50% - ${token.paddingXS}px)`,
          },
          [`${calendarCls}-mode-switch`]: {
            width: '100%',
            // FIXME hardcode in v4
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

export default genComponentStyleHook(
  'Calendar',
  token => {
    const calendarCls = `${token.componentCls}-calendar`;
    const calendarToken = mergeToken<CalendarToken>(initInputToken<FullToken<'Calendar'>>(token), {
      calendarCls,
      pickerCellInnerCls: `${token.componentCls}-cell-inner`,
    });

    return [genCalendarStyles(calendarToken)];
  },
  token => ({
    calendarFullBg: token.colorBgComponent,
    calendarFullPanelBg: token.colorBgComponent,
    calendarItemActiveBg: token.controlItemBgActive,

    // FIXME: date-picker token
    pickerTextHeight: 40,
    pickerPanelCellWidth: 36,
    pickerPanelCellHeight: 24,
    pickerDateHoverRangeBorderColor: new TinyColor(token.colorPrimary).lighten(20).toRgbString(),
    pickerBasicCellHoverWithRangeColor: new TinyColor(token.colorPrimary).lighten(35).toRgbString(),
    pickerPanelWithoutTimeCellHeight: 66,
    pickerTimePanelColumnHeight: 224,
    pickerTimePanelColumnWidth: 56,
    pickerTimePanelCellHeight: 28,
  }),
);
