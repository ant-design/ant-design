import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import ConfigProvider from '..';
import LocaleProvider from '../../locale-provider';
import zhCN from '../../locale/zh_CN';
import enUS from '../../locale/en_US';
import TimePicker from '../../time-picker';
import Modal from '../../modal';
import Form from '../../form';

const delay = (timeout = 0) =>
  new Promise(resolve => {
    setTimeout(resolve, timeout);
  });

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

  describe.only('form validateMessages', () => {
    const wrapperComponent = ({ validateMessages }) => {
      const formRef = React.createRef();

      const wrapper = mount(
        <ConfigProvider locale={zhCN} form={{ validateMessages }}>
          <Form ref={formRef} initialValues={{ age: 18 }}>
            <Form.Item name="test" label="姓名" rules={[{ required: true }]}>
              <input />
            </Form.Item>
            <Form.Item name="age" label="年龄" rules={[{ type: 'number', len: 17 }]}>
              <input />
            </Form.Item>
          </Form>
        </ConfigProvider>,
      );

      return [wrapper, formRef];
    };

    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('set locale zhCN', async () => {
      const [wrapper, formRef] = wrapperComponent({});

      await act(async () => {
        try {
          await formRef.current.validateFields();
        } catch (e) {
          // Do nothing
        }
      });

      await act(async () => {
        jest.runAllTimers();
        wrapper.update();
        await Promise.resolve();
      });

      expect(wrapper.find('.ant-form-item-explain').first().text()).toEqual('请输入姓名');
    });

    it('set locale zhCN and set form validateMessages one item, other use default message', async () => {
      const [wrapper, formRef] = wrapperComponent({ validateMessages: { required: '必须' } });

      await act(async () => {
        try {
          await formRef.current.validateFields();
        } catch (e) {
          // Do nothing
        }
      });

      await act(async () => {
        jest.runAllTimers();
        wrapper.update();
        await Promise.resolve();
      });

      expect(wrapper.find('.ant-form-item-explain').first().text()).toEqual('必须');
      expect(wrapper.find('.ant-form-item-explain').last().text()).toEqual('年龄必须等于17');
    });
  });
});
