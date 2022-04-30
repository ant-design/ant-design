import React, { useState, useEffect } from 'react';
import Drawer from '..';
import { Button } from '../..';
import { render, fireEvent } from '../../../tests/utils';

const DestroyCallback = ({ callback }) => {
  useEffect(() => callback, []);
  return null;
};

let time = new Date().valueOf();

const Demo = () => {
  const [visible, setVisible] = useState(true);
  const onClose = () => {
    setVisible(false);
  };
  const close = (
    <Button type="primary" onClick={onClose}>
      close
    </Button>
  );

  return (
    <Drawer
      visible={visible}
      destroyOnClose
      getContainer={false}
      footer={close}
      extra={close}
      onClose={onClose}
    >
      {close}
      <DestroyCallback
        callback={() => {
          time = new Date().valueOf() - time;
        }}
      />
    </Drawer>
  );
};

describe('Drawer', () => {
  const getDrawer = props => (
    <Drawer visible getContainer={false} {...props}>
      Here is content of Drawer
    </Drawer>
  );

  it('render correctly', () => {
    const { container, asFragment, rerender } = render(getDrawer());
    expect(container.querySelector('.ant-drawer-body')).toBeTruthy();

    rerender(getDrawer({ visible: false }));

    expect(container.querySelector('.ant-drawer-body').textContent).toEqual(
      'Here is content of Drawer',
    );

    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('mask trigger onClose', () => {
    const onClose = jest.fn();
    const { container } = render(getDrawer({ onClose }));

    fireEvent.click(container.querySelector('.ant-drawer-mask'));
    expect(onClose).toHaveBeenCalled();
  });

  it('close button trigger onClose', () => {
    const onClose = jest.fn();
    const { container } = render(getDrawer({ onClose }));

    fireEvent.click(container.querySelector('.ant-drawer-close'));
    expect(onClose).toHaveBeenCalled();
  });

  it('maskClosable no trigger onClose', () => {
    const onClose = jest.fn();
    const { container } = render(getDrawer({ onClose, maskClosable: false }));

    fireEvent.click(container.querySelector('.ant-drawer-mask'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('dom should be removed after close when destroyOnClose is true', () => {
    const { container, rerender } = render(getDrawer({ destroyOnClose: true }));

    rerender(getDrawer({ destroyOnClose: true, visible: false }));
    fireEvent.transitionEnd(container.querySelector('.ant-drawer-wrapper-body'));

    expect(container.querySelector('.ant-drawer-wrapper-body')).toBeFalsy();
  });

  it('dom should be existed after close when destroyOnClose is false', () => {
    const { container, rerender } = render(getDrawer());
    expect(container.querySelector('.ant-drawer-wrapper-body')).toBeTruthy();

    rerender(getDrawer({ visible: false }));
    fireEvent.transitionEnd(container.querySelector('.ant-drawer-wrapper-body'));

    expect(container.querySelector('.ant-drawer-wrapper-body')).toBeTruthy();
  });
  it('Click the button in the drawer to check the closing speed', () => {
    const wrapper = render(<Demo />);
    fireEvent.click(wrapper.queryAllByText('close')[0]);
    fireEvent.click(wrapper.queryAllByText('close')[1]);
    fireEvent.click(wrapper.queryAllByText('close')[2]);
  });
});
