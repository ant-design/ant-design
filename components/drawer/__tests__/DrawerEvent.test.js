import React from 'react';
import Drawer from '..';
import { act, fireEvent, render } from '../../../tests/utils';

describe('Drawer', () => {
  const getDrawer = props => (
    <Drawer visible getContainer={false} {...props}>
      Here is content of Drawer
    </Drawer>
  );

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

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
    expect(container.querySelector('.ant-drawer')).toBeTruthy();

    rerender(getDrawer({ destroyOnClose: true, visible: false }));
    act(() => {
      jest.runAllTimers();
    });

    expect(container.querySelector('.ant-drawer')).toBeFalsy();
  });

  it('dom should be existed after close when destroyOnClose is false', () => {
    const { container, rerender } = render(getDrawer());
    expect(container.querySelector('.ant-drawer')).toBeTruthy();

    rerender(getDrawer({ visible: false }));
    act(() => {
      jest.runAllTimers();
    });
    fireEvent.animationEnd(container.querySelector('.ant-drawer-content'));

    expect(container.querySelector('.ant-drawer')).toBeTruthy();
  });

  it('dom should be existed after close twice when getContainer is false', () => {
    const { container, rerender } = render(getDrawer({ visible: true, getContainer: false }));
    expect(container.querySelector('.ant-drawer-content')).toBeTruthy();

    // Hide
    rerender(getDrawer({ visible: false, getContainer: false }));
    act(() => {
      jest.runAllTimers();
    });
    fireEvent.animationEnd(container.querySelector('.ant-drawer-content-wrapper'));
    expect(container.querySelector('.ant-drawer-content-wrapper-hidden')).toBeTruthy();

    // Show
    rerender(getDrawer({ visible: true, getContainer: false }));
    expect(container.querySelector('.ant-drawer-content-wrapper')).toBeTruthy();
    expect(container.querySelector('.ant-drawer-content-wrapper-hidden')).toBeFalsy();

    // Hide
    rerender(getDrawer({ visible: false, getContainer: false }));
    act(() => {
      jest.runAllTimers();
    });
    fireEvent.animationEnd(container.querySelector('.ant-drawer-content-wrapper'));
    expect(container.querySelector('.ant-drawer-content-wrapper-hidden')).toBeTruthy();
  });

  it('test afterVisibleChange', async () => {
    const afterVisibleChange = jest.fn();
    const { container, rerender } = render(getDrawer({ afterVisibleChange, visible: true }));
    rerender(getDrawer({ afterVisibleChange, visible: false }));

    act(() => {
      jest.runAllTimers();
    });
    fireEvent.animationEnd(container.querySelector('.ant-drawer-content-wrapper'));

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
