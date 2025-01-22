import React, { useEffect } from 'react';

import type { ModalProps } from '..';
import Modal from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { createEvent, fireEvent, render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

jest.mock('@rc-component/util/lib/Portal');

const ModalTester: React.FC<ModalProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  const container = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    setOpen(true);
  }, []);
  return (
    <div>
      <div ref={container} />
      <Modal {...props} open={open} getContainer={container.current!}>
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
    expect(btns[btns.length - 1].classList.contains('ant-btn-dangerous')).toBeTruthy();
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
    const clickEvent = createEvent.click(triggerEle) as any;
    clickEvent.pageX = 100;
    clickEvent.pageY = 100;
    fireEvent(triggerEle, clickEvent);

    expect(
      (container.querySelectorAll('.ant-modal')[0] as HTMLDivElement).style.transformOrigin,
    ).toBeTruthy();
  });

  it('custom mouse position', () => {
    const Demo = () => {
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
    expect(
      (container.querySelectorAll('.ant-modal')[0] as HTMLDivElement).style.transformOrigin,
    ).toBe('100px 100px');
  });

  it('should not render footer if null', () => {
    render(<Modal open footer={null} />);
    expect(document.querySelector('.ant-modal-footer')).toBeFalsy();
  });

  it('should render custom footer', () => {
    render(<Modal open footer={<div className="custom-footer">footer</div>} />);
    expect(document.querySelector('.custom-footer')).toBeTruthy();
  });

  it('Should custom footer function second param work', () => {
    const footerFn = jest.fn();
    render(<Modal open footer={footerFn} />);

    expect(footerFn).toHaveBeenCalled();
    expect(footerFn.mock.calls[0][0]).toBeTruthy();
    expect(footerFn.mock.calls[0][1]).toEqual({
      OkBtn: expect.any(Function),
      CancelBtn: expect.any(Function),
    });
  });

  it('Should custom footer function work', () => {
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

  it('Should support centered prop', () => {
    render(<Modal open centered />);
    expect(document.querySelector('.ant-modal-centered')).toBeTruthy();
  });

  it('Should support centered global config', () => {
    render(
      <ConfigProvider modal={{ centered: true }}>
        <Modal open />
      </ConfigProvider>,
    );
    expect(document.querySelector('.ant-modal-centered')).toBeTruthy();
  });

  it('Should prefer centered prop over centered global config', () => {
    render(
      <ConfigProvider modal={{ centered: true }}>
        <Modal open centered={false} />
      </ConfigProvider>,
    );
    expect(document.querySelector('.ant-modal-centered')).toBeFalsy();
  });

  it('should apply custom styles to Modal', () => {
    const customClassNames = {
      root: 'custom-root',
      mask: 'custom-mask',
      wrapper: 'custom-wrapper',
      header: 'custom-header',
      title: 'custom-title',
      body: 'custom-body',
      footer: 'custom-footer',
    };
    const customStyles = {
      root: { color: 'red' },
      mask: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
      wrapper: { padding: '20px' },
      header: { backgroundColor: 'blue' },
      title: { fontSize: '20px' },
      body: { color: 'green' },
      footer: { color: 'yellow' },
    };

    render(<Modal classNames={customClassNames} styles={customStyles} open title="title" />);

    const rootElement = document.querySelector('.ant-modal-root') as HTMLElement;
    const maskElement = document.querySelector('.ant-modal-mask') as HTMLElement;
    const wrapperElement = document.querySelector('.ant-modal-wrap') as HTMLElement;
    const headerElement = document.querySelector('.ant-modal-header') as HTMLElement;
    const titleElement = document.querySelector('.ant-modal-title') as HTMLElement;
    const bodyElement = document.querySelector('.ant-modal-body') as HTMLElement;
    const footerElement = document.querySelector('.ant-modal-footer') as HTMLElement;

    // check classNames
    expect(rootElement.classList).toContain('custom-root');
    expect(maskElement.classList).toContain('custom-mask');
    expect(wrapperElement.classList).toContain('custom-wrapper');
    expect(headerElement.classList).toContain('custom-header');
    expect(titleElement.classList).toContain('custom-title');
    expect(bodyElement.classList).toContain('custom-body');
    expect(footerElement.classList).toContain('custom-footer');

    // check styles
    expect(rootElement.style.color).toBe('red');
    expect(maskElement.style.backgroundColor).toBe('rgba(0, 0, 0, 0.5)');
    expect(wrapperElement.style.padding).toBe('20px');
    expect(headerElement.style.backgroundColor).toBe('blue');
    expect(titleElement.style.fontSize).toBe('20px');
    expect(bodyElement.style.color).toBe('green');
    expect(footerElement.style.color).toBe('yellow');
  });
});
