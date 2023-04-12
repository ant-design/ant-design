import React, { useEffect } from 'react';
import type { ModalProps } from '..';
import Modal from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render } from '../../../tests/utils';
import { resetWarned } from '../../_util/warning';

jest.mock('rc-util/lib/Portal');

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
    fireEvent.click(container.querySelectorAll('#trigger')[0]);
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

  it('deprecated warning', () => {
    resetWarned();
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<Modal visible />);
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: Modal] `visible` is deprecated, please use `open` instead.',
    );

    expect(document.querySelector('.ant-modal')).toBeTruthy();

    errSpy.mockRestore();
  });

  it('should not render footer if null', () => {
    render(<Modal open footer={null} />);
    expect(document.querySelector('.ant-modal-footer')).toBeFalsy();
  });

  it('should render custom footer', () => {
    render(<Modal open footer={<div className="custom-footer">footer</div>} />);
    expect(document.querySelector('.custom-footer')).toBeTruthy();
  });
});
