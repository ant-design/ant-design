import React from 'react';
import Drawer from '..';
import { fireEvent, render } from '../../../tests/utils';

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
    const ev = new TransitionEvent('transitionend', { bubbles: true });
    ev.propertyName = 'transform';
    fireEvent(document.querySelector('.ant-drawer-content-wrapper'), ev);

    expect(container.querySelector('.ant-drawer-wrapper-body')).toBeFalsy();
  });

  it('dom should be existed after close when destroyOnClose is false', () => {
    const { container, rerender } = render(getDrawer());
    expect(container.querySelector('.ant-drawer-wrapper-body')).toBeTruthy();

    rerender(getDrawer({ visible: false }));
    const ev = new TransitionEvent('transitionend', { bubbles: true });
    ev.propertyName = 'transform';
    fireEvent(document.querySelector('.ant-drawer-content-wrapper'), ev);

    expect(container.querySelector('.ant-drawer-wrapper-body')).toBeTruthy();
  });
  it('dom should be existed after close twice when getContainer is false', () => {
    const { container, rerender } = render(getDrawer({ visible: true, getContainer: false }));
    rerender(getDrawer({ visible: false, getContainer: false }));
    const ev = new TransitionEvent('transitionend', { bubbles: true });
    ev.propertyName = 'transform';
    fireEvent(document.querySelector('.ant-drawer-content-wrapper'), ev);

    rerender(getDrawer({ visible: true, getContainer: false }));
    const ev2 = new TransitionEvent('transitionend', { bubbles: true });
    ev2.propertyName = 'transform';
    fireEvent(document.querySelector('.ant-drawer-content-wrapper'), ev2);

    rerender(getDrawer({ visible: false, getContainer: false }));
    const ev3 = new TransitionEvent('transitionend', { bubbles: true });
    ev3.propertyName = 'transform';
    fireEvent(document.querySelector('.ant-drawer-content-wrapper'), ev3);

    expect(container.querySelector('.ant-drawer-wrapper-body')).toBeTruthy();
  });
  it('test afterVisibleChange', async () => {
    const afterVisibleChange = jest.fn();
    const { rerender } = render(getDrawer({ afterVisibleChange, visible: true }));
    rerender(getDrawer({ afterVisibleChange, visible: false }));
    const ev = new TransitionEvent('transitionend', { bubbles: true });
    ev.propertyName = 'transform';
    fireEvent(document.querySelector('.ant-drawer-content-wrapper'), ev);
    expect(afterVisibleChange).toBeCalledTimes(1);
  });
  it('should support children ref', () => {
    const fn = jest.fn();

    const refCallback = ref => {
      expect(typeof ref).toBe('object');
      fn();
    };

    const RefDemo = () => {
      const ref = React.useRef();
      const [visible, setVisible] = React.useState(false);

      React.useEffect(() => {
        if (visible) {
          refCallback(ref.current);
        }
      }, [visible]);

      return (
        <>
          <a onClick={() => setVisible(true)}>open</a>
          <Drawer visible={visible}>
            <div ref={ref} />
          </Drawer>
        </>
      );
    };
    const { container } = render(<RefDemo />);
    fireEvent.click(container.querySelector('a'));
    expect(fn).toBeCalled();
  });
});
