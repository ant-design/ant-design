import React from 'react';
import Drawer from '..';
import { render, fireEvent, cleanup } from '../../../tests/utils';

describe('Drawer', () => {
  afterEach(() => {
    cleanup();
  });

  const getDrawer = props => (
    <Drawer visible {...props}>
      Here is content of Drawer
    </Drawer>
  );

  it('render correctly', () => {
    render(getDrawer());
    expect(document.body).toMatchSnapshot();
  });

  it('render correctly when set visible false', () => {
    const { rerender } = render(getDrawer());
    expect(document.querySelector('.ant-drawer-body')).toBeTruthy();

    rerender(getDrawer({ visible: false }));

    expect(document.querySelector('.ant-drawer-body').textContent).toEqual(
      'Here is content of Drawer',
    );
    expect(document.body).toMatchSnapshot();
  });

  it('mask trigger onClose', () => {
    const onClose = jest.fn();
    render(getDrawer({ onClose }));

    fireEvent.click(document.querySelector('.ant-drawer-mask'));
    expect(onClose).toHaveBeenCalled();
  });

  it('close button trigger onClose', () => {
    const onClose = jest.fn();
    render(getDrawer({ onClose }));

    fireEvent.click(document.querySelector('.ant-drawer-close'));
    expect(onClose).toHaveBeenCalled();
  });

  it('maskClosable no trigger onClose', () => {
    const onClose = jest.fn();
    render(getDrawer({ onClose, maskClosable: false }));

    fireEvent.click(document.querySelector('.ant-drawer-mask'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('dom should be removed after close when destroyOnClose is true', () => {
    const { rerender } = render(getDrawer({ destroyOnClose: true }));

    rerender(getDrawer({ destroyOnClose: true, visible: false }));
    const ev = new Event('transitionend', { bubbles: true });
    ev.propertyName = 'transform';
    fireEvent(document.querySelector('.ant-drawer-content-wrapper'), ev);

    expect(document.querySelector('.ant-drawer-wrapper-body')).toBeFalsy();
  });

  it('dom should be existed after close when destroyOnClose is false', () => {
    const { rerender } = render(getDrawer());
    expect(document.querySelector('.ant-drawer-wrapper-body')).toBeTruthy();

    rerender(getDrawer({ visible: false }));
    const ev = new Event('transitionend', { bubbles: true });
    ev.propertyName = 'transform';
    fireEvent(document.querySelector('.ant-drawer-content-wrapper'), ev);

    expect(document.querySelector('.ant-drawer-wrapper-body')).toBeTruthy();
  });
  it('test afterVisibleChange', async () => {
    const afterVisibleChange = jest.fn();
    const { rerender } = render(getDrawer({ afterVisibleChange, visible: true }));
    rerender(getDrawer({ afterVisibleChange, visible: false }));
    const ev = new Event('transitionend', { bubbles: true });
    ev.propertyName = 'transform';
    fireEvent(document.querySelector('.ant-drawer-content-wrapper'), ev);
    expect(afterVisibleChange).toBeCalledTimes(1);
  });
});
