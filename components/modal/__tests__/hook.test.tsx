import CSSMotion from 'rc-motion';
import { genCSSMotion } from 'rc-motion/lib/CSSMotion';
import React from 'react';
import { act } from 'react-dom/test-utils';
import Modal from '..';
import { fireEvent, render } from '../../../tests/utils';
import Button from '../../button';
import ConfigProvider from '../../config-provider';
import Input from '../../input';
import type { ModalFunc } from '../confirm';

jest.mock('rc-util/lib/Portal');
jest.mock('rc-motion');

describe('Modal.hook', () => {
  // Inject CSSMotion to replace with No transition support
  const MockCSSMotion = genCSSMotion(false);
  Object.keys(MockCSSMotion).forEach(key => {
    // @ts-ignore
    CSSMotion[key] = MockCSSMotion[key];
  });

  it('hooks support context', () => {
    jest.useFakeTimers();
    const Context = React.createContext('light');
    let instance: ReturnType<ModalFunc>;

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

    const { container } = render(<Demo />);
    fireEvent.click(container.querySelectorAll('button')[0]);

    expect(document.body.querySelectorAll('.test-hook')[0].textContent).toBe('bamboo');
    expect(document.body.querySelectorAll('.ant-btn').length).toBeTruthy();
    expect(document.body.querySelectorAll('.ant-modal-body').length).toBeTruthy();

    // Update instance
    act(() => {
      instance.update({
        content: <div className="updated-content" />,
      });
    });
    expect(document.body.querySelectorAll('.updated-content')).toHaveLength(1);

    // Destroy
    act(() => {
      instance.destroy();
      jest.runAllTimers();
    });
    expect(document.body.querySelectorAll('Modal')).toHaveLength(0);

    jest.useRealTimers();
  });

  it('context support config direction', () => {
    jest.useFakeTimers();
    const Demo = () => {
      const [modal, contextHolder] = Modal.useModal();
      return (
        <>
          <Button
            onClick={() => {
              modal.confirm({
                content: <Input />,
              });
            }}
          />
          {contextHolder}
        </>
      );
    };

    const { container } = render(
      <ConfigProvider direction="rtl">
        <Demo />
      </ConfigProvider>,
    );

    fireEvent.click(container.querySelectorAll('button')[0]);
    expect(document.body.querySelectorAll('.ant-input-rtl').length).toBeTruthy();
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

    const { container } = render(<Demo />);

    fireEvent.click(container.querySelectorAll('.open-hook-modal-btn')[0]);
    fireEvent.click(document.body.querySelectorAll('.ant-modal-confirm-btns .ant-btn')[0]);
    expect(cancelCount).toEqual(1); // click cancel btn, trigger onCancel

    fireEvent.click(container.querySelectorAll('.open-hook-modal-btn')[0]);
    fireEvent.click(document.body.querySelectorAll('.ant-modal-wrap')[0]);
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

    const { container } = render(<Demo />);
    fireEvent.click(container.querySelectorAll('.open-hook-modal-btn')[0]);
    expect(document.body.querySelectorAll('.ant-modal-confirm-title')[0].textContent).toEqual(
      'Bamboo',
    );
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

    const { container } = render(<Demo />);
    fireEvent.click(container.querySelectorAll('.open-hook-modal-btn')[0]);
    expect(document.body.classList.contains('ant-modal-confirm-title')).toBeFalsy();
  });
});
