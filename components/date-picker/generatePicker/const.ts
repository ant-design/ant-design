import moment, { Moment } from 'moment';

export enum SelectItemType {
  quick = 'quick',
  choose = 'choose',
}
export type PickerTypes = 'date' | 'week' | 'month' | 'quarter' | 'year';
interface IGetRange {
  (time?: Moment | null): {
    value: Moment | [Moment, Moment];
    inputText?: string;
  };
}
export interface IQuickItem {
  id: string;
  type: SelectItemType;
  picker: PickerTypes;
  text: string;
  label?: string;
  getRange: IGetRange;
}
export function getRelativeList(formatter = 'YYYY/MM/DD'): IQuickItem[] {
  return [
    {
      id: 'realTime',
      type: SelectItemType.quick,
      picker: 'date',
      text: 'Real-time',
      getRange: () => ({
        value: moment(),
        inputText: moment().format(formatter),
      }),
    },
    {
      id: 'yesterday',
      type: SelectItemType.quick,
      picker: 'date',
      text: 'Yesterday',
      getRange: () => {
        const t = moment().subtract(1, 'days');
        return {
          value: t,
          inputText: t.format(formatter),
        };
      },
    },
    {
      id: 'last7days',
      type: SelectItemType.quick,
      picker: 'date',
      text: 'Last 7 Days',
      getRange: () => {
        const t = moment().subtract(7, 'days');

        return {
          value: t,
          inputText: `${t.format(formatter)}-${moment().format(formatter)}`,
        };
      },
    },
    {
      id: 'last30days',
      type: SelectItemType.quick,
      picker: 'date',
      text: 'Last 30 Days',
      getRange: () => {
        const t = moment().subtract(30, 'days');
        return {
          value: t,
          inputText: `${t.format(formatter)}-${moment().format(formatter)}`,
        };
      },
    },
  ];
}
export function getQuickList(formatter = 'YYYY/MM/DD'): IQuickItem[] {
  return [
    {
      id: 'byDay',
      type: SelectItemType.choose,
      picker: 'date',
      text: 'By Day',
      label: 'Day',
      getRange: time => {
        const t = time || moment();
        return {
          value: t,
          inputText: t.format(formatter),
        };
      },
    },
    {
      id: 'byWeek',
      type: SelectItemType.choose,
      picker: 'week',
      text: 'By Week',
      label: 'Week',
      getRange: time => {
        const t = time || moment();
        return {
          value: t,
          inputText: `${t.day(0).format(formatter)}-${t.day(6).format(formatter)}`,
        };
      },
    },
    {
      id: 'byMonth',
      type: SelectItemType.choose,
      picker: 'month',
      text: 'By Month',
      label: 'Month',
      getRange: time => {
        const t = time || moment();
        return {
          value: t,
          inputText: `${t.startOf('month').format(formatter)}-${t
            .endOf('month')
            .format(formatter)}`,
        };
      },
    },
  ];
}
