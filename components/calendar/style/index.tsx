import type { CSSObject } from '@ant-design/cssinjs';
import { resetComponent } from '../../style';
import type { PickerPanelToken } from '../../date-picker/style';
import { genPanelStyle, initPickerPanelToken } from '../../date-picker/style';
import type { InputToken } from '../../input/style';
import { initInputToken } from '../../input/style';
import type { FullToken } from '../../theme';
import { genComponentStyleHook, mergeToken } from '../../theme';

export interface ComponentToken {
  yearControlWidth: number;
  monthControlWidth: number;
  miniContentHeight: number;
}

interface CalendarToken extends InputToken<FullToken<'Calendar'>>, PickerPanelToken {
  calendarCls: string;
  calendarFullBg: string;
  calendarFullPanelBg: string;
  calendarItemActiveBg: string;
  dateValueHeight: number;
  weekHeight: number;
  dateContentHeight: number;
}

export const genCalendarStyles = (token: CalendarToken): CSSObject => {
  const {
    calendarCls,
    componentCls,
    paddingSM,
    yearControlWidth,
    monthControlWidth,
    calendarFullBg,
    calendarFullPanelBg,
    calendarItemActiveBg,
    marginXS,
    lineWidth,
    lineType,
    colorSplit,
    paddingXS,
    borderRadiusLG,
    miniContentHeight,
    weekHeight,
    paddingXXS,
    controlItemBgHover,
    colorPrimary,
    lineWidthBold,
    motionDurationSlow,
    dateValueHeight,
    dateContentHeight,
    colorText,
    lineHeight,
    screenXS,
  } = token;
  return {
    [calendarCls]: {
      ...genPanelStyle(token),
      ...resetComponent(token),
      background: calendarFullBg,
      '&-rtl': {
        direction: 'rtl',
      },
      [`${calendarCls}-header`]: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: `${paddingSM}px 0`,

        [`${calendarCls}-year-select`]: {
          minWidth: yearControlWidth,
        },
        [`${calendarCls}-month-select`]: {
          minWidth: monthControlWidth,
          marginInlineStart: marginXS,
        },
        [`${calendarCls}-mode-switch`]: {
          marginInlineStart: marginXS,
        },
      },
    },
    [`${calendarCls} ${componentCls}-panel`]: {
      background: calendarFullPanelBg,
      border: 0,
      borderTop: `${lineWidth}px ${lineType} ${colorSplit}`,
      borderRadius: 0,
      [`${componentCls}-month-panel, ${componentCls}-date-panel`]: {
        width: 'auto',
      },
      [`${componentCls}-body`]: {
        padding: `${paddingXS}px 0`,
      },
      [`${componentCls}-content`]: {
        width: '100%',
      },
    },
    [`${calendarCls}-mini`]: {
      borderRadius: borderRadiusLG,
      [`${calendarCls}-header`]: {
        paddingInlineEnd: paddingXS,
        paddingInlineStart: paddingXS,
      },
      [`${componentCls}-panel`]: {
        borderRadius: `0 0 ${borderRadiusLG}px ${borderRadiusLG}px`,
      },
      [`${componentCls}-content`]: {
        height: miniContentHeight,
        th: {
          height: 'auto',
          padding: 0,
          lineHeight: `${weekHeight}px`,
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
            paddingInlineEnd: paddingSM,
            paddingBottom: paddingXXS,
            lineHeight: `${weekHeight}px`,
          },
        },
      },
      [`${componentCls}-cell`]: {
        '&::before': {
          display: 'none',
        },
        '&:hover': {
          [`${calendarCls}-date`]: {
            background: controlItemBgHover,
          },
        },
        [`${calendarCls}-date-today::before`]: {
          display: 'none',
        },
        // >>> Selected
        '&-in-view:is(&-selected)': {
          [`${calendarCls}-date, ${calendarCls}-date-today`]: {
            background: calendarItemActiveBg,
          },
        },
        '&-selected, &-selected:hover': {
          [`${calendarCls}-date, ${calendarCls}-date-today`]: {
            [`${calendarCls}-date-value`]: {
              color: colorPrimary,
            },
          },
        },
      },
      [`${calendarCls}-date`]: {
        display: 'block',
        width: 'auto',
        height: 'auto',
        margin: `0 ${marginXS / 2}px`,
        padding: `${paddingXS / 2}px ${paddingXS}px 0`,
        border: 0,
        borderTop: `${lineWidthBold}px ${lineType} ${colorSplit}`,
        borderRadius: 0,
        transition: `background ${motionDurationSlow}`,
        '&-value': {
          lineHeight: `${dateValueHeight}px`,
          transition: `color ${motionDurationSlow}`,
        },
        '&-content': {
          position: 'static',
          width: 'auto',
          height: dateContentHeight,
          overflowY: 'auto',
          color: colorText,
          lineHeight,
          textAlign: 'start',
        },
        '&-today': {
          borderColor: colorPrimary,
          [`${calendarCls}-date-value`]: {
            color: colorText,
          },
        },
      },
    },
    [`@media only screen and (max-width: ${screenXS}px) `]: {
      [`${calendarCls}`]: {
        [`${calendarCls}-header`]: {
          display: 'block',
          [`${calendarCls}-year-select`]: {
            width: '50%',
          },
          [`${calendarCls}-month-select`]: {
            width: `calc(50% - ${paddingXS}px)`,
          },
          [`${calendarCls}-mode-switch`]: {
            width: '100%',
            marginTop: marginXS,
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
    const {
      componentCls,
      colorBgContainer,
      controlItemBgActive,
      controlHeightSM,
      fontSizeSM,
      lineHeightSM,
      marginXS,
      lineWidth,
    } = token;
    const calendarCls = `${componentCls}-calendar`;
    const calendarToken = mergeToken<CalendarToken>(
      initInputToken<FullToken<'Calendar'>>(token),
      initPickerPanelToken(token),
      {
        calendarCls,
        pickerCellInnerCls: `${componentCls}-cell-inner`,
        calendarFullBg: colorBgContainer,
        calendarFullPanelBg: colorBgContainer,
        calendarItemActiveBg: controlItemBgActive,
        dateValueHeight: controlHeightSM,
        weekHeight: controlHeightSM * 0.75,
        dateContentHeight: (fontSizeSM * lineHeightSM + marginXS) * 3 + lineWidth * 2,
      },
    );

    return [genCalendarStyles(calendarToken)];
  },
  {
    yearControlWidth: 80,
    monthControlWidth: 70,
    miniContentHeight: 256,
  },
);
