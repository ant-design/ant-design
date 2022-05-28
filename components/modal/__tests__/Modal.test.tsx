import React from 'react';
import Modal from '..';
import type { ModalProps } from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render, fireEvent } from '../../../tests/utils';

jest.mock('rc-util/lib/Portal');

class ModalTester extends React.Component<ModalProps, { visible: boolean }> {
  state = { visible: false };

  componentDidMount() {
    this.setState({ visible: true }); // eslint-disable-line react/no-did-mount-set-state
  }

  container = React.createRef<HTMLDivElement>();

  getContainer = () => this.container?.current!;

  render() {
    const { visible } = this.state;
    return (
      <div>
        <div ref={this.container} />
        <Modal {...this.props} visible={visible} getContainer={this.getContainer}>
          Here is content of Modal
        </Modal>
      </div>
    );
  }
}

describe('Modal', () => {
  mountTest(Modal);
  rtlTest(Modal);

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
    render(<Modal visible onCancel={onCancel} />);
    fireEvent.click(document.body.querySelectorAll('.ant-btn')[0]);
    expect(onCancel).toHaveBeenCalled();
  });

  it('onOk should be called', () => {
    const onOk = jest.fn();
    render(<Modal visible onOk={onOk} />);
    const btns = document.body.querySelectorAll('.ant-btn');
    fireEvent.click(btns[btns.length - 1]);
    expect(onOk).toHaveBeenCalled();
  });

  it('support closeIcon', () => {
    render(<Modal closeIcon={<a>closeIcon</a>} visible />);
    expect(document.body.querySelectorAll('.ant-modal-root')[0]).toMatchSnapshot();
  });

  it('danger type', () => {
    render(<Modal okType="danger" okText="123" visible />);
    const btns = document.body.querySelectorAll('.ant-btn');
    expect(btns[btns.length - 1].classList.contains('ant-btn-dangerous')).toBeTruthy();
  });
});
