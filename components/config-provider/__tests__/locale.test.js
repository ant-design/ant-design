import React from 'react';
import { mount } from 'enzyme';
import ConfigProvider from '..';
import LocaleProvider from '../../locale-provider';
import zhCN from '../../locale/zh_CN';
import enUS from '../../locale/en_US';
import TimePicker from '../../time-picker';
import Modal from '../../modal';

describe('ConfigProvider.Locale', () => {
  function $$(className) {
    return document.body.querySelectorAll(className);
  }

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

  // https://github.com/ant-design/ant-design/issues/18731
  it('should not reset locale for Modal', () => {
    class App extends React.Component {
      state = {
        showButton: false,
      };

      componentDidMount() {
        this.setState({
          showButton: true,
        });
      }

      openConfirm = () => {
        jest.useFakeTimers();
        Modal.confirm({
          title: 'title',
          content: 'Some descriptions',
        });
        jest.runAllTimers();
        jest.useRealTimers();
      };

      render() {
        return (
          <ConfigProvider locale={zhCN}>
            {this.state.showButton ? (
              <ConfigProvider locale={enUS}>
                <button type="button" onClick={this.openConfirm}>
                  open
                </button>
              </ConfigProvider>
            ) : null}
          </ConfigProvider>
        );
      }
    }

    const wrapper = mount(<App />);
    wrapper.find('button').simulate('click');
    expect($$('.ant-btn-primary')[0].textContent).toBe('OK');
  });

  describe('support legacy LocaleProvider', () => {
    function testLocale(wrapper) {
      expect(wrapper.find('input').props().placeholder).toBe(zhCN.TimePicker.placeholder);
    }

    it('LocaleProvider', () => {
      const wrapper = mount(
        <LocaleProvider locale={zhCN}>
          <TimePicker />
        </LocaleProvider>,
      );

      testLocale(wrapper);
    });

    it('LocaleProvider > ConfigProvider', () => {
      const wrapper = mount(
        <LocaleProvider locale={zhCN}>
          <ConfigProvider>
            <TimePicker />
          </ConfigProvider>
        </LocaleProvider>,
      );

      testLocale(wrapper);
    });

    it('ConfigProvider > ConfigProvider', () => {
      const wrapper = mount(
        <ConfigProvider locale={zhCN}>
          <ConfigProvider>
            <TimePicker />
          </ConfigProvider>
        </ConfigProvider>,
      );

      testLocale(wrapper);
    });
  });
});
