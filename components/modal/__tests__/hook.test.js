import React from 'react';
import CSSMotion from 'rc-motion';
import { act } from 'react-dom/test-utils';
import { genCSSMotion } from 'rc-motion/lib/CSSMotion';
import { mount } from 'enzyme';
import Modal from '..';
import Button from '../../button';

jest.mock('rc-util/lib/Portal');
jest.mock('rc-motion');

describe('Modal.hook', () => {
  // Inject CSSMotion to replace with No transition support
  const MockCSSMotion = genCSSMotion(false);
  Object.keys(MockCSSMotion).forEach(key => {
    CSSMotion[key] = MockCSSMotion[key];
  });

  it('hooks support context', () => {
    jest.useFakeTimers();
    const Context = React.createContext('light');
    let instance;

    const Demo = () => {
      const [modal, contextHolder] = Modal.useModal();
      return (
        <Context.Provider value="bamboo">
          <Button
            onClick={() => {
              instance = modal.confirm({
                content: (
                  <Context.Consumer>
                    {name => <div className="test-hook">{name}</div>}
                  </Context.Consumer>
                ),
              });
            }}
          />
          {contextHolder}
        </Context.Provider>
      );
    };

    const wrapper = mount(<Demo />);
    wrapper.find('button').simulate('click');

    expect(wrapper.find('.test-hook').text()).toEqual('bamboo');
    expect(wrapper.find('.ant-btn').length).toBeTruthy();
    expect(wrapper.find('.ant-modal-body').length).toBeTruthy();

    // Update instance
    act(() => {
      instance.update({
        content: <div className="updated-content" />,
      });
    });
    wrapper.update();
    expect(wrapper.find('.updated-content')).toHaveLength(1);

    // Destroy
    act(() => {
      instance.destroy();
      jest.runAllTimers();
    });
    wrapper.update();
    expect(wrapper.find('Modal')).toHaveLength(0);

    jest.useRealTimers();
  });

  it('hooks modal should trigger onCancel', () => {
    let cancelCount = 0;
    const Demo = () => {
      const [modal, contextHolder] = Modal.useModal();

      const openBrokenModal = React.useCallback(() => {
        modal.info({
          okType: 'default',
          maskClosable: true,
          okCancel: true,
          onCancel: () => {
            cancelCount += 1;
          },
          content: 'Hello!',
        });
      }, [modal]);

      return (
        <div className="App">
          {contextHolder}
          <div className="open-hook-modal-btn" onClick={openBrokenModal}>
            Test hook modal
          </div>
        </div>
      );
    };

    const wrapper = mount(<Demo />);

    wrapper.find('.open-hook-modal-btn').simulate('click');
    wrapper.find('.ant-modal-confirm-btns .ant-btn').first().simulate('click');
    expect(cancelCount).toEqual(1); // click cancel btn, trigger onCancel

    wrapper.find('.open-hook-modal-btn').simulate('click');
    wrapper.find('.ant-modal-wrap').simulate('click');
    expect(cancelCount).toEqual(2); // click modal wrapper, trigger onCancel
  });

  it('update before render', () => {
    const Demo = () => {
      const [modal, contextHolder] = Modal.useModal();

      const openBrokenModal = React.useCallback(() => {
        const instance = modal.info({
          title: 'Light',
        });

        instance.update({
          title: 'Bamboo',
        });
      }, [modal]);

      return (
        <div className="App">
          {contextHolder}
          <div className="open-hook-modal-btn" onClick={openBrokenModal}>
            Test hook modal
          </div>
        </div>
      );
    };

    const wrapper = mount(<Demo />);
    wrapper.find('.open-hook-modal-btn').simulate('click');

    expect(wrapper.find('.ant-modal-confirm-title').text()).toEqual('Bamboo');
  });

  it('destroy before render', () => {
    const Demo = () => {
      const [modal, contextHolder] = Modal.useModal();

      const openBrokenModal = React.useCallback(() => {
        const instance = modal.info({
          title: 'Light',
        });

        instance.destroy();
      }, [modal]);

      return (
        <div className="App">
          {contextHolder}
          <div className="open-hook-modal-btn" onClick={openBrokenModal}>
            Test hook modal
          </div>
        </div>
      );
    };

    const wrapper = mount(<Demo />);
    wrapper.find('.open-hook-modal-btn').simulate('click');

    expect(wrapper.exists('.ant-modal-confirm-title')).toBeFalsy();
  });
});
