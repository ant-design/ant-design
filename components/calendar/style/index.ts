import type { CSSObject } from '@ant-design/cssinjs';
import type { PickerPanelToken } from '../../date-picker/style';
import { genPanelStyle, initPickerPanelToken } from '../../date-picker/style';
import type { InputToken } from '../../input/style';
import { initInputToken } from '../../input/style';
import { resetComponent } from '../../style';
import type { FullToken } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

export interface ComponentToken {
  yearControlWidth: number;
  monthControlWidth: number;
  miniContentHeight: number;
  fullBg: string;
  fullPanelBg: string;
  itemActiveBg: string;
}

interface CalendarToken extends InputToken<FullToken<'Calendar'>>, PickerPanelToken {
  calendarCls: string;
  dateValueHeight: number;
  weekHeight: number;
  dateContentHeight: number;
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
        padding: `${token.paddingSM}px 0`,

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
      borderTop: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
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
      borderRadius: token.borderRadiusLG,
      [`${calendarCls}-header`]: {
        paddingInlineEnd: token.paddingXS,
        paddingInlineStart: token.paddingXS,
      },
      [`${componentCls}-panel`]: {
        borderRadius: `0 0 ${token.borderRadiusLG}px ${token.borderRadiusLG}px`,
      },
      [`${componentCls}-content`]: {
        height: token.miniContentHeight,
        th: {
          height: 'auto',
          padding: 0,
          lineHeight: `${token.weekHeight}px`,
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
            lineHeight: `${token.weekHeight}px`,
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
        margin: `0 ${token.marginXS / 2}px`,
        padding: `${token.paddingXS / 2}px ${token.paddingXS}px 0`,
        border: 0,
        borderTop: `${token.lineWidthBold}px ${token.lineType} ${token.colorSplit}`,
        borderRadius: 0,
        transition: `background ${token.motionDurationSlow}`,
        '&-value': {
          lineHeight: `${token.dateValueHeight}px`,
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
  (token) => {
    const calendarCls = `${token.componentCls}-calendar`;
    const calendarToken = mergeToken<CalendarToken>(
      initInputToken<FullToken<'Calendar'>>(token),
      initPickerPanelToken(token),
      {
        calendarCls,
        pickerCellInnerCls: `${token.componentCls}-cell-inner`,
        dateValueHeight: token.controlHeightSM,
        weekHeight: token.controlHeightSM * 0.75,
        dateContentHeight:
          (token.fontSizeSM * token.lineHeightSM + token.marginXS) * 3 + token.lineWidth * 2,
      },
    );

    return [genCalendarStyles(calendarToken)];
  },
  (token) => ({
    fullBg: token.colorBgContainer,
    fullPanelBg: token.colorBgContainer,
    itemActiveBg: token.controlItemBgActive,
    yearControlWidth: 80,
    monthControlWidth: 70,
    miniContentHeight: 256,
  }),
);
