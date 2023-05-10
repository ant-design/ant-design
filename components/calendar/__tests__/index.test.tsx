import Dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import MockDate from 'mockdate';
import { type PickerPanelProps } from 'rc-picker';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import type { Locale } from 'rc-picker/lib/interface';
import { resetWarned } from 'rc-util/lib/warning';
import React from 'react';
import Calendar from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render } from '../../../tests/utils';
import Group from '../../radio/group';
import Button from '../../radio/radioButton';
import Select from '../../select';
import Header, { type CalendarHeaderProps } from '../Header';

const ref: {
  calendarProps?: PickerPanelProps<unknown>;
  calendarHeaderProps?: CalendarHeaderProps<unknown>;
} = {};

jest.mock('../Header', () => {
  const HeaderModule = jest.requireActual('../Header');
  const HeaderComponent = HeaderModule.default;
  return (props: CalendarHeaderProps<any>) => {
    ref.calendarHeaderProps = props;
    return <HeaderComponent {...props} />;
  };
});

jest.mock('rc-picker', () => {
  const RcPicker = jest.requireActual('rc-picker');
  const PickerPanelComponent = RcPicker.PickerPanel;
  return {
    ...RcPicker,
    PickerPanel: (props: PickerPanelProps<unknown>) => {
      ref.calendarProps = props;
      return <PickerPanelComponent {...props} />;
    },
  };
});

describe('Calendar', () => {});
