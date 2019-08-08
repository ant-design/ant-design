import React from 'react';
import { mount } from 'enzyme';
import ConfigProvider from '..';
import LocaleProvider from '../../locale-provider';
import locale from '../../locale/zh_CN';
import TimePicker from '../../time-picker';

describe('ConfigProvider.Locale', () => {
  it('not throw', () => {
    if (process.env.REACT === '15') {
      return;
    }

    mount(
      <ConfigProvider locale={{}}>
        <span />
        <span />
      </ConfigProvider>,
    );
  });

  describe('support legacy LocaleProvider', () => {
    function testLocale(wrapper) {
      expect(wrapper.find('input').props().placeholder).toBe(locale.TimePicker.placeholder);
    }

    it('LocaleProvider', () => {
      const wrapper = mount(
        <LocaleProvider locale={locale}>
          <TimePicker />
        </LocaleProvider>,
      );

      testLocale(wrapper);
    });

    it('LocaleProvider > ConfigProvider', () => {
      const wrapper = mount(
        <LocaleProvider locale={locale}>
          <ConfigProvider>
            <TimePicker />
          </ConfigProvider>
        </LocaleProvider>,
      );

      testLocale(wrapper);
    });

    it('ConfigProvider > ConfigProvider', () => {
      const wrapper = mount(
        <ConfigProvider locale={locale}>
          <ConfigProvider>
            <TimePicker />
          </ConfigProvider>
        </ConfigProvider>,
      );

      testLocale(wrapper);
    });
  });
});
