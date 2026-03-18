import React, { useEffect } from 'react';

import type { ModalProps } from '..';
import Modal from '..';
import type { MaskType } from '../../_util/hooks';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { act, createEvent, fireEvent, render, waitFakeTimer } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

jest.mock('@rc-component/util/lib/Portal');

const ModalTester: React.FC<ModalProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    setOpen(true);
  }, []);
  return (
    <div>
      <div ref={containerRef} />
      <Modal {...props} open={open} getContainer={containerRef.current!}>
        Here is content of Modal
      </Modal>
    </div>
  );
};

describe('Modal', () => {
  mountTest(Modal);
  rtlTest(Modal);

  it('support closeIcon', () => {
    render(<Modal closeIcon={<a>closeIcon</a>} open />);
    expect(document.body.querySelectorAll('.ant-modal-root')[0]).toMatchSnapshot();
  });

  it('support hide close button when setting closeIcon to null or false', () => {
    const { baseElement, rerender } = render(<Modal closeIcon={null} open />);
    expect(baseElement.querySelector('.ant-modal-close')).toBeFalsy();
    rerender(<Modal closeIcon={false} open />);
    expect(baseElement.querySelector('.ant-modal-close')).toBeFalsy();
  });

  it('support disable close button when setting disable to true', () => {
    const { baseElement } = render(<Modal open closable={{ disabled: true }} />);
    expect(baseElement.querySelector('.ant-modal-close')).toHaveAttribute('disabled');
  });

  it('render correctly', () => {
    const { asFragment } = render(<ModalTester />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('render without footer', () => {
    const { asFragment } = render(<ModalTester footer={null} />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('onCancel should be called', () => {
    const onCancel = jest.fn();
    render(<Modal open onCancel={onCancel} />);
    fireEvent.click(document.body.querySelectorAll('.ant-btn')[0]);
    expect(onCancel).toHaveBeenCalled();
  });

  it('onCancel should be called when pressing ESC', () => {
    const onCancel = jest.fn();
    render(<Modal open onCancel={onCancel} />);
    fireEvent.keyDown(document.querySelector('.ant-modal-wrap')!, { key: 'Escape', keyCode: 27 });
    expect(onCancel).toHaveBeenCalled();
  });

  it('onOk should be called', () => {
    const onOk = jest.fn();
    render(<Modal open onOk={onOk} />);
    const btns = document.body.querySelectorAll('.ant-btn');
    fireEvent.click(btns[btns.length - 1]);
    expect(onOk).toHaveBeenCalled();
  });

  it('danger type', () => {
    render(<Modal okType="danger" okText="123" open />);
    const btns = document.body.querySelectorAll('.ant-btn');
    expect(btns[btns.length - 1]).toHaveClass('ant-btn-dangerous');
  });

  it('mouse position', () => {
    const Demo = () => {
      const [open, setOpen] = React.useState(false);
      const containerRef = React.useRef<HTMLDivElement>(null);
      return (
        <div ref={containerRef}>
          <div id="trigger" onClick={() => setOpen(true)}>
            click me
          </div>
          <Modal open={open} getContainer={() => containerRef.current!} />
        </div>
      );
    };
    const { container } = render(<Demo />);
    const triggerEle = container.querySelectorAll('#trigger')[0];
    const clickEvent = createEvent.click(triggerEle);

    Object.defineProperty(clickEvent, 'pageX', { value: 100 });
    Object.defineProperty(clickEvent, 'pageY', { value: 100 });

    fireEvent(triggerEle, clickEvent);

    expect(container.querySelectorAll<HTMLDivElement>('.ant-modal')[0]).toHaveStyle({
      transformOrigin: '100px 100px',
    });
  });

  it('custom mouse position', () => {
    const Demo: React.FC = () => {
      const containerRef = React.useRef<HTMLDivElement>(null);
      return (
        <div ref={containerRef}>
          <Modal
            open
            getContainer={() => containerRef.current!}
            mousePosition={{ x: 100, y: 100 }}
          />
        </div>
      );
    };
    const { container } = render(<Demo />);
    expect(container.querySelectorAll<HTMLDivElement>('.ant-modal')[0]).toHaveStyle({
      transformOrigin: '100px 100px',
    });
  });

  it('should not render footer if null', () => {
    render(<Modal open footer={null} />);
    expect(document.querySelector('.ant-modal-footer')).toBeFalsy();
  });

  it('should render custom footer', () => {
    render(<Modal open footer={<div className="custom-footer">footer</div>} />);
    expect(document.querySelector('.custom-footer')).toBeTruthy();
  });

  it('should custom footer function second param work', () => {
    const footerFn = jest.fn();
    render(<Modal open footer={footerFn} />);

    expect(footerFn).toHaveBeenCalled();
    expect(footerFn.mock.calls[0][0]).toBeTruthy();
    expect(footerFn.mock.calls[0][1]).toEqual({
      OkBtn: expect.any(Function),
      CancelBtn: expect.any(Function),
    });
  });

  it('should custom footer function work', () => {
    render(
      <Modal
        open
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <OkBtn />
            <CancelBtn />
            <div className="custom-footer-ele">footer-ele</div>
          </>
        )}
      />,
    );
    expect(document.querySelector('.custom-footer-ele')).toBeTruthy();
  });

  // https://github.com/ant-design/ant-design/issues/
  it('Both ways should be rendered normally on the page', () => {
    render(
      <Modal
        open
        footer={(origin, { OkBtn, CancelBtn }) => (
          <>
            <div className="first-origin">{origin}</div>
            <div className="second-props-origin">
              <OkBtn />
              <CancelBtn />
            </div>
          </>
        )}
      />,
    );
    expect(document.querySelector('.first-origin')).toMatchSnapshot();
    expect(document.querySelector('.second-props-origin')).toMatchSnapshot();
  });

  it('responsive width', () => {
    render(
      <Modal open width={{ xs: '90%', sm: '80%', md: '70%', lg: '60%', xl: '50%', xxl: '40%' }} />,
    );

    const modalEle = document.querySelector<HTMLDivElement>('.ant-modal')!;
    expect(modalEle).toHaveStyle({
      '--ant-modal-xs-width': '90%',
      '--ant-modal-sm-width': '80%',
      '--ant-modal-md-width': '70%',
      '--ant-modal-lg-width': '60%',
      '--ant-modal-xl-width': '50%',
      '--ant-modal-xxl-width': '40%',
    });
  });

  it('should support centered prop', () => {
    render(<Modal open centered />);
    expect(document.querySelector('.ant-modal-centered')).toBeTruthy();
  });

  it('should support centered global config', () => {
    render(
      <ConfigProvider modal={{ centered: true }}>
        <Modal open />
      </ConfigProvider>,
    );
    expect(document.querySelector('.ant-modal-centered')).toBeTruthy();
  });

  it('should prefer centered prop over centered global config', () => {
    render(
      <ConfigProvider modal={{ centered: true }}>
        <Modal open centered={false} />
      </ConfigProvider>,
    );
    expect(document.querySelector('.ant-modal-centered')).toBeFalsy();
  });

  it('should support cancelButtonProps global config', () => {
    render(
      <ConfigProvider modal={{ cancelButtonProps: { size: 'small' } }}>
        <Modal open />
      </ConfigProvider>,
    );
    expect(document.querySelector('.ant-modal-footer .ant-btn-default.ant-btn-sm')).toBeTruthy();
  });

  it('should prefer cancelButtonProps prop over cancelButtonProps global config', () => {
    render(
      <ConfigProvider modal={{ cancelButtonProps: { size: 'large' } }}>
        <Modal open cancelButtonProps={{ size: 'small' }} />
      </ConfigProvider>,
    );
    expect(document.querySelector('.ant-modal-footer .ant-btn-default.ant-btn-sm')).toBeTruthy();
  });

  it('should support okButtonProps global config', () => {
    render(
      <ConfigProvider modal={{ okButtonProps: { size: 'small' } }}>
        <Modal open />
      </ConfigProvider>,
    );
    expect(document.querySelector('.ant-modal-footer .ant-btn-primary.ant-btn-sm')).toBeTruthy();
  });

  it('should prefer okButtonProps prop over okButtonProps global config', () => {
    render(
      <ConfigProvider modal={{ okButtonProps: { size: 'large' } }}>
        <Modal open okButtonProps={{ size: 'small' }} />
      </ConfigProvider>,
    );
    expect(document.querySelector('.ant-modal-footer .ant-btn-primary.ant-btn-sm')).toBeTruthy();
  });

  it('should not close when mask.closable is false from context', () => {
    const onCancel = jest.fn();
    render(
      <ConfigProvider modal={{ mask: { closable: false } }}>
        <Modal open onCancel={onCancel} />
      </ConfigProvider>,
    );
    const maskElement = document.querySelector('.ant-modal-mask');
    fireEvent.click(maskElement!);
    expect(onCancel).not.toHaveBeenCalled();
  });

  it('should support maskClosable prop over mask.closable global config', async () => {
    jest.useFakeTimers();

    const Demo: React.FC<ModalProps> = ({ onCancel = () => {}, onOk = () => {}, ...restProps }) => {
      const [open, setOpen] = React.useState<boolean>(false);
      useEffect(() => {
        setOpen(true);
      }, []);
      const handleCancel: ModalProps['onCancel'] = (event) => {
        setOpen(false);
        onCancel(event);
      };

      return <Modal open={open} onCancel={handleCancel} onOk={onOk} {...restProps} />;
    };

    const onCancel = jest.fn();
    const onOk = jest.fn();

    render(
      <ConfigProvider modal={{ mask: { closable: false } }}>
        <Demo onCancel={onCancel} onOk={onOk} maskClosable />
      </ConfigProvider>,
    );
    await act(async () => {
      await waitFakeTimer(500);
    });
    const modalWrap = document.body.querySelectorAll('.ant-modal-wrap')[0];
    fireEvent.mouseDown(modalWrap!);
    fireEvent.click(modalWrap!);
    await act(async () => {
      await waitFakeTimer(500);
    });
    expect(onCancel).toHaveBeenCalled();

    jest.useRealTimers();
  });

  it('should not close modal when confirmLoading is loading', async () => {
    jest.useFakeTimers();

    const Demo: React.FC<ModalProps> = ({ onCancel = () => {}, onOk = () => {} }) => {
      const [loading, setLoading] = React.useState<boolean>(false);
      const handleOk = (event: React.MouseEvent<HTMLButtonElement>) => {
        setLoading(true);
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            setLoading(false);
            onOk(event);
            resolve();
          }, 1000);
        });
      };

      return <Modal open confirmLoading={loading} onCancel={onCancel} onOk={handleOk} />;
    };

    const onCancel = jest.fn();
    const onOk = jest.fn();

    render(<Demo onCancel={onCancel} onOk={onOk} />);

    const okButton = document.body.querySelectorAll('.ant-btn')[1];
    fireEvent.click(okButton);
    expect(okButton).toHaveClass('ant-btn-loading');

    const closeButton = document.body.querySelectorAll('.ant-modal-close')[0];
    const modalWrap = document.body.querySelectorAll('.ant-modal-wrap')[0];

    fireEvent.click(closeButton);
    fireEvent.click(modalWrap);

    await act(async () => {
      await waitFakeTimer(500);
    });

    expect(onCancel).not.toHaveBeenCalled();

    await act(async () => {
      await waitFakeTimer(1000);
    });

    fireEvent.click(closeButton);
    fireEvent.click(modalWrap);

    expect(onCancel).toHaveBeenCalled();
    expect(onOk).toHaveBeenCalled();

    jest.useRealTimers();
  });

  it('closable have aria', () => {
    render(<Modal open closable={{ 'aria-label': 'xxx' }} />);
    const element = document.body.querySelector('.ant-modal-close');
    expect(element).toHaveAttribute('aria-label', 'xxx');
  });

  describe('closable onClose and afterClose ', () => {
    const mockFn = {
      afterClose: jest.fn(),
      closableAfterClose: jest.fn(),
      onClose: jest.fn(),
    };

    beforeEach(() => jest.clearAllMocks());

    const ModalTester: React.FC<ModalProps> = (props) => {
      const [open, setOpen] = React.useState(true);
      const close = () => {
        setOpen(false);
      };
      return (
        <div>
          <Modal
            {...props}
            open={open}
            onCancel={close}
            onOk={close}
            visible={open}
            afterClose={mockFn.afterClose}
            transitionName=""
            maskTransitionName=""
            closable={{ onClose: mockFn.onClose, afterClose: mockFn.closableAfterClose }}
          >
            Here is content of Modal
          </Modal>
        </div>
      );
    };
    it('closable.onClose and afterClose', async () => {
      render(<ModalTester />);
      const button = document.body.querySelector('.ant-btn');
      fireEvent.click(button!);
      expect(mockFn.onClose).toHaveBeenCalled();
      expect(mockFn.afterClose).toHaveBeenCalledTimes(1);
      expect(mockFn.closableAfterClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Modal mask blur className', () => {
    const testCases: [
      mask?: MaskType,
      contextMask?: MaskType,
      expectedBlurClass?: boolean,
      openMask?: boolean,
    ][] = [
      // Format: [modalMask, configMask,  expectedBlurClass, openMask]
      [undefined, true, false, true],
      [true, undefined, false, true],
      [undefined, undefined, false, true],
      [false, true, false, false],
      [true, false, false, true],
      [{ enabled: false }, { blur: true }, true, false],
      [{ enabled: true }, { blur: false }, false, true],
      [{ blur: true }, { enabled: false }, true, false],
      [{ blur: false }, { enabled: true, blur: true }, false, true],
      [{ blur: true, enabled: false }, { enabled: true, blur: false }, true, false],
    ];

    it.each(
      testCases,
    )('modalMask = %s configMask = %s ,mask blur = %s', (modalMask, configMask, expectedBlurClass, openMask) => {
      render(
        <ConfigProvider modal={configMask ? { mask: configMask } : undefined}>
          <Modal open mask={modalMask} />
        </ConfigProvider>,
      );

      const maskElement = document.querySelector('.ant-modal-mask');
      if (!openMask) {
        expect(maskElement).toBeNull();
        return;
      }

      expect(maskElement).toBeInTheDocument();
      if (expectedBlurClass) {
        expect(maskElement!.className).toContain('ant-modal-mask-blur');
      } else {
        expect(maskElement!.className).not.toContain('ant-modal-mask-blur');
      }
    });
  });

  it('focusable default config should pass to classNames', () => {
    const classNames = jest.fn(() => ({}));

    render(
      <Modal open getContainer={false} classNames={classNames}>
        Here is content of Modal
      </Modal>,
    );

    expect(classNames).toHaveBeenCalledWith(
      expect.objectContaining({
        props: expect.objectContaining({
          focusable: {
            trap: true,
            focusTriggerAfterClose: true,
          },
        }),
      }),
    );
  });

  it('should warning when using deprecated autoFocusButton', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const Test = () => {
      const [modal, holder] = Modal.useModal();

      React.useEffect(() => {
        modal.confirm({
          autoFocusButton: 'ok',
          content: 'Here is content of Modal',
        });
      }, []);

      return holder;
    };

    render(<Test />);

    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Modal] `autoFocusButton` is deprecated. Please use `focusable.autoFocusButton` instead.',
    );

    errorSpy.mockRestore();
  });

  it('should warning when using deprecated focusTriggerAfterClose', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <Modal open focusTriggerAfterClose={false} getContainer={false}>
        Here is content of Modal
      </Modal>,
    );

    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Modal] `focusTriggerAfterClose` is deprecated. Please use `focusable.focusTriggerAfterClose` instead.',
    );

    errorSpy.mockRestore();
  });
});
