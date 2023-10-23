import React, { useEffect, useState } from 'react';
import ConfigProvider from '..';
import { act, fireEvent, render } from '../../../tests/utils';
import DatePicker from '../../date-picker';
import { closePicker, openPicker, selectCell } from '../../date-picker/__tests__/utils';
import type { Locale } from '../../locale';
import LocaleProvider from '../../locale';
import enUS from '../../locale/en_US';
import zhCN from '../../locale/zh_CN';
import Modal from '../../modal';
import Pagination from '../../pagination';
import TimePicker from '../../time-picker';

describe('ConfigProvider.Locale', () => {
  function $$(selector: string): NodeListOf<Element> {
    return document.body.querySelectorAll(selector);
  }

  it('not throw', () => {
    render(
      <ConfigProvider locale={{} as Locale}>
        <span />
        <span />
      </ConfigProvider>,
    );
  });

  // https://github.com/ant-design/ant-design/issues/18731
  it('should not reset locale for Modal', () => {
    const App: React.FC = () => {
      const [showButton, setShowButton] = useState<boolean>(false);
      useEffect(() => {
        setShowButton(true);
      }, []);
      const openConfirm = () => {
        jest.useFakeTimers();
        Modal.confirm({ title: 'title', content: 'Some descriptions' });
        act(() => {
          jest.runAllTimers();
        });
        jest.useRealTimers();
      };
      return (
        <ConfigProvider locale={zhCN}>
          {showButton ? (
            <ConfigProvider locale={enUS}>
              <button type="button" onClick={openConfirm}>
                open
              </button>
            </ConfigProvider>
          ) : null}
        </ConfigProvider>
      );
    };
    const wrapper = render(<App />);
    fireEvent.click(wrapper.container.querySelector('button')!);
    expect($$('.ant-btn-primary')[0].textContent).toBe('OK');
  });

  // https://github.com/ant-design/ant-design/issues/31592
  it('should not reset the component state when switching locale', () => {
    const wrapper = render(
      <ConfigProvider locale={zhCN}>
        <DatePicker />
        <Pagination total={50} />
      </ConfigProvider>,
    );

    const datepicke = wrapper.container.querySelector<HTMLInputElement>('.ant-picker-input input');
    expect(datepicke?.value).toBe('');
    expect(datepicke?.placeholder).toBe('请选择日期');
    expect(wrapper.container.querySelector('.ant-pagination-item-1')?.className).toContain(
      'ant-pagination-item-active',
    );

    openPicker(wrapper);
    selectCell(wrapper, 10);
    closePicker(wrapper);

    expect(
      wrapper.container.querySelector<HTMLInputElement>('.ant-picker-input input')?.value,
    ).not.toBe('');
    wrapper.rerender(
      <ConfigProvider locale={{} as Locale}>
        <DatePicker />
        <Pagination total={50} />
      </ConfigProvider>,
    );

    fireEvent.click(wrapper.container.querySelector('.ant-pagination-item-3')!);

    const datepicker = wrapper.container.querySelector<HTMLInputElement>('.ant-picker-input input');

    expect(datepicker?.placeholder).not.toBe('请选择日期');
    expect(datepicker?.value).not.toBe('');
    expect(datepicker?.value).toContain('-10');

    expect(wrapper.container.querySelector('.ant-pagination-item-3')?.className).toContain(
      'ant-pagination-item-active',
    );
  });

  describe('support legacy LocaleProvider', () => {
    function testLocale(wrapper: ReturnType<typeof render>): void {
      expect(wrapper.container.querySelector('input')?.placeholder).toBe(
        zhCN.TimePicker?.placeholder,
      );
    }

    it('LocaleProvider', () => {
      testLocale(
        render(
          <LocaleProvider locale={zhCN}>
            <TimePicker />
          </LocaleProvider>,
        ),
      );
    });

    it('LocaleProvider > ConfigProvider', () => {
      testLocale(
        render(
          <LocaleProvider locale={zhCN}>
            <ConfigProvider>
              <TimePicker />
            </ConfigProvider>
          </LocaleProvider>,
        ),
      );
    });

    it('ConfigProvider > ConfigProvider', () => {
      testLocale(
        render(
          <ConfigProvider locale={zhCN}>
            <ConfigProvider>
              <TimePicker />
            </ConfigProvider>
          </ConfigProvider>,
        ),
      );
    });
  });
});
