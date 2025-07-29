import React from 'react';
import KeyCode from 'rc-util/lib/KeyCode';

import Modal from '..';
import { act, fireEvent, render, waitFakeTimer } from '../../../tests/utils';
import Button from '../../button';
import ConfigProvider, { ConfigProviderProps } from '../../config-provider';
import Input from '../../input';
import zhCN from '../../locale/zh_CN';
import type { ModalFunc } from '../confirm';

jest.mock('rc-util/lib/Portal');

// TODO: Remove this. Mock for React 19
jest.mock('react-dom', () => {
  const realReactDOM = jest.requireActual('react-dom');

  if (realReactDOM.version.startsWith('19')) {
    const realReactDOMClient = jest.requireActual('react-dom/client');
    realReactDOM.createRoot = realReactDOMClient.createRoot;
  }

  return realReactDOM;
});

describe('Modal.hook', () => {
  const ConfigWarp = (conf?: ConfigProviderProps) => {
    return <ConfigProvider {...conf} theme={{ token: { motion: false } }} />;
  };

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
                zIndex: 903,
                content: (
                  <Context.Consumer>
                    {(name) => <div className="test-hook">{name}</div>}
                  </Context.Consumer>
                ),
              });
            }}
          />
          {contextHolder}
        </Context.Provider>
      );
    };

    const { container } = render(
      <ConfigWarp>
        <Demo />
      </ConfigWarp>,
    );
    fireEvent.click(container.querySelectorAll('button')[0]);

    expect(document.body.querySelectorAll('.test-hook')[0].textContent).toBe('bamboo');
    expect(document.body.querySelectorAll('.ant-btn').length).toBeTruthy();
    expect(document.body.querySelectorAll('.ant-modal-body').length).toBeTruthy();

    expect(document.querySelector('.ant-modal-wrap')).toHaveStyle({
      zIndex: '903',
    });

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

  it('destroyAll works with contextHolder', () => {
    const modalTypes = ['info', 'success', 'warning', 'error'] as const;

    const Demo = () => {
      const [modal, contextHolder] = Modal.useModal();

      function showConfirm() {
        modalTypes.forEach((type) => {
          modal[type]({
            title: 'title',
            content: 'content',
          });
        });
      }

      return (
        <ConfigWarp>
          {contextHolder}
          <div className="open-hook-modal-btn" onClick={showConfirm}>
            confirm
          </div>
        </ConfigWarp>
      );
    };

    const { container } = render(<Demo />);
    fireEvent.click(container.querySelectorAll('.open-hook-modal-btn')[0]);

    expect(document.body.querySelectorAll('.ant-modal')).toHaveLength(modalTypes.length);

    // Update instance
    act(() => {
      Modal.destroyAll();
    });
    expect(document.body.querySelectorAll('.ant-modal')).toHaveLength(0);
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
      <ConfigWarp direction="rtl">
        <Demo />
      </ConfigWarp>,
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
        <ConfigWarp>
          {contextHolder}
          <div className="open-hook-modal-btn" onClick={openBrokenModal}>
            Test hook modal
          </div>
        </ConfigWarp>
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

      const openBrokenModal = () => {
        const instance = modal.info({
          title: 'Light',
        });

        instance.update({
          title: 'Bamboo',
        });

        instance.update((ori) => ({
          ...ori,
          content: 'Little',
        }));
      };

      return (
        <ConfigWarp>
          {contextHolder}
          <div className="open-hook-modal-btn" onClick={openBrokenModal}>
            Test hook modal
          </div>
        </ConfigWarp>
      );
    };

    const { container } = render(<Demo />);
    fireEvent.click(container.querySelectorAll('.open-hook-modal-btn')[0]);
    expect(document.body.querySelector('.ant-modal-confirm-title')!.textContent).toEqual('Bamboo');
    expect(document.body.querySelector('.ant-modal-confirm-content')!.textContent).toEqual(
      'Little',
    );
  });

  it('support update config', () => {
    const Demo = () => {
      const [modal, contextHolder] = Modal.useModal();

      const openBrokenModal = () => {
        const instance = modal.info({
          title: 'Light',
          content: 'Little',
        });

        instance.update(() => ({
          title: 'Bamboo',
        }));
      };

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
    fireEvent.click(container.querySelector('.open-hook-modal-btn')!);
    expect(document.body.querySelector('.ant-modal-confirm-title')!.textContent).toEqual('Bamboo');
    expect(document.body.querySelector('.ant-modal-confirm-content')!.textContent).toEqual(
      'Little',
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

  it('the callback close should be a method when onCancel has a close parameter', async () => {
    jest.useFakeTimers();

    const mockFn = jest.fn();

    const Demo = () => {
      const [modal, contextHolder] = Modal.useModal();

      const openBrokenModal = React.useCallback(() => {
        modal.confirm({
          closable: true,
          keyboard: true,
          maskClosable: true,
          onCancel: (close) => mockFn(close),
        });
      }, [modal]);

      return (
        <ConfigWarp>
          {contextHolder}
          <div className="open-hook-modal-btn" onClick={openBrokenModal}>
            Test hook modal
          </div>
        </ConfigWarp>
      );
    };

    const { container } = render(<Demo />);

    await waitFakeTimer();

    expect(document.body.querySelectorAll('.ant-modal-confirm-confirm')).toHaveLength(0);
    // First open
    fireEvent.click(container.querySelectorAll('.open-hook-modal-btn')[0]);
    await waitFakeTimer();

    expect(document.body.querySelectorAll('.ant-modal-confirm-confirm')).toHaveLength(1);
    // Click mask to close
    fireEvent.click(document.body.querySelectorAll('.ant-modal-wrap')[0]);

    await waitFakeTimer();

    expect(document.body.querySelectorAll('.ant-modal-confirm-confirm')).toHaveLength(0);
    // Second open
    fireEvent.click(container.querySelectorAll('.open-hook-modal-btn')[0]);

    await waitFakeTimer();

    expect(document.body.querySelectorAll('.ant-modal-confirm-confirm')).toHaveLength(1);
    // Press ESC to turn off
    fireEvent.keyDown(document.body.querySelectorAll('.ant-modal')[0], {
      keyCode: KeyCode.ESC,
    });

    await waitFakeTimer();

    expect(document.body.querySelectorAll('.ant-modal-confirm-confirm')).toHaveLength(0);
    // Third open
    fireEvent.click(container.querySelectorAll('.open-hook-modal-btn')[0]);

    await waitFakeTimer();

    expect(document.body.querySelectorAll('.ant-modal-confirm-confirm')).toHaveLength(1);
    // Click the close icon to close
    fireEvent.click(document.body.querySelectorAll('.ant-modal-close')[0]);

    await waitFakeTimer();

    expect(document.body.querySelectorAll('.ant-modal-confirm-confirm')).toHaveLength(0);
    // Last open
    fireEvent.click(container.querySelectorAll('.open-hook-modal-btn')[0]);

    await waitFakeTimer();

    expect(document.body.querySelectorAll('.ant-modal-confirm-confirm')).toHaveLength(1);

    // Click the Cancel button to close (invalid)
    fireEvent.click(document.body.querySelectorAll('.ant-modal-confirm-btns > .ant-btn')[0]);

    await waitFakeTimer();

    expect(document.body.querySelectorAll('.ant-modal-confirm-confirm')).toHaveLength(1);

    mockFn.mockImplementation((close) => close());

    // Click the Cancel button to close (valid)
    fireEvent.click(document.body.querySelectorAll('.ant-modal-confirm-btns > .ant-btn')[0]);

    await waitFakeTimer();

    expect(document.body.querySelectorAll('.ant-modal-confirm-confirm')).toHaveLength(0);

    // Close called 5 times
    expect(mockFn).toHaveBeenCalledTimes(5);

    expect(mockFn.mock.calls).toEqual(Array.from({ length: 5 }, () => [expect.any(Function)]));

    jest.useRealTimers();
  });

  it('not block origin ConfigProvider config', () => {
    const Demo = () => {
      const [modal, contextHolder] = Modal.useModal();

      React.useEffect(() => {
        modal.confirm({
          content: <Button className="bamboo">好的</Button>,
        });
      }, []);

      return <ConfigWarp autoInsertSpaceInButton={false}>{contextHolder}</ConfigWarp>;
    };

    render(<Demo />);

    expect(document.body.querySelector('.bamboo')?.textContent).toEqual('好的');
  });

  it('it should call forwarded afterClose', () => {
    const afterClose = jest.fn();
    const Demo = () => {
      const [modal, contextHolder] = Modal.useModal();
      React.useEffect(() => {
        modal.confirm({ title: 'Confirm', afterClose });
      }, []);
      return <ConfigWarp>{contextHolder}</ConfigWarp>;
    };

    render(<Demo />);
    const btns = document.body.querySelectorAll('.ant-btn');
    fireEvent.click(btns[btns.length - 1]);

    expect(afterClose).toHaveBeenCalledTimes(1);
  });

  it('should be applied correctly locale', async () => {
    jest.useFakeTimers();

    const Demo: React.FC<{ zh?: boolean }> = ({ zh }) => {
      const [modal, contextHolder] = Modal.useModal();

      React.useEffect(() => {
        const instance = modal.confirm({});
        return () => instance.destroy();
      }, []);

      return <ConfigWarp locale={zh ? zhCN : undefined}>{contextHolder}</ConfigWarp>;
    };

    const { unmount } = render(<Demo zh />);
    await waitFakeTimer();
    expect(document.body.querySelector('.ant-btn-primary')!.textContent).toEqual('确 定');
    unmount();

    render(<Demo />);
    await waitFakeTimer();
    expect(document.body.querySelector('.ant-btn-primary')!.textContent).toEqual('OK');

    jest.useRealTimers();
  });

  describe('support await', () => {
    it('click', async () => {
      jest.useFakeTimers();

      let notReady = true;
      let lastResult: boolean | null = null;

      const Demo: React.FC = () => {
        const [modal, contextHolder] = Modal.useModal();

        React.useEffect(() => {
          (async () => {
            lastResult = await modal.confirm({
              content: <Input />,
              onOk: async () => {
                if (notReady) {
                  notReady = false;
                  return Promise.reject();
                }
              },
            });
          })();
        }, []);

        return <ConfigWarp>{contextHolder}</ConfigWarp>;
      };

      render(<Demo />);

      // Wait for modal show
      await waitFakeTimer();

      // First time click should not close
      fireEvent.click(document.querySelector('.ant-btn-primary')!);
      await waitFakeTimer();
      expect(lastResult).toBeFalsy();

      // Second time click to close
      fireEvent.click(document.querySelector('.ant-btn-primary')!);
      await waitFakeTimer();
      expect(lastResult).toBeTruthy();

      jest.useRealTimers();
    });
  });

  it('esc', async () => {
    jest.useFakeTimers();

    let lastResult: boolean | null = null;

    const Demo: React.FC = () => {
      const [modal, contextHolder] = Modal.useModal();

      React.useEffect(() => {
        (async () => {
          lastResult = await modal.confirm({
            content: <Input />,
          });
        })();
      }, []);

      return <ConfigWarp>{contextHolder}</ConfigWarp>;
    };

    render(<Demo />);

    // Wait for modal show
    await waitFakeTimer();

    // ESC to close
    fireEvent.keyDown(document.querySelector('.ant-modal')!, {
      key: 'Esc',
      keyCode: KeyCode.ESC,
    });
    await waitFakeTimer();

    expect(lastResult).toBe(false);
  });
});
