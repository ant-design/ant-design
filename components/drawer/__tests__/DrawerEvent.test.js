import React from 'react';
import Drawer from '..';
import { act, fireEvent, render } from '../../../tests/utils';

describe('Drawer', () => {
  const getDrawer = props => (
    <Drawer open getContainer={false} {...props}>
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

    rerender(getDrawer({ open: false }));

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

    rerender(getDrawer({ destroyOnClose: true, open: false }));
    act(() => {
      jest.runAllTimers();
    });

    expect(container.querySelector('.ant-drawer')).toBeFalsy();
  });

  it('dom should be existed after close when destroyOnClose is false', () => {
    const { container, rerender } = render(getDrawer());
    expect(container.querySelector('.ant-drawer')).toBeTruthy();

    rerender(getDrawer({ open: false }));
    act(() => {
      jest.runAllTimers();
    });
    fireEvent.animationEnd(container.querySelector('.ant-drawer-content'));

    expect(container.querySelector('.ant-drawer')).toBeTruthy();
  });

  it('dom should be existed after close twice when getContainer is false', () => {
    const { container, rerender } = render(getDrawer({ open: true, getContainer: false }));
    expect(container.querySelector('.ant-drawer-content')).toBeTruthy();

    // Hide
    rerender(getDrawer({ open: false, getContainer: false }));
    act(() => {
      jest.runAllTimers();
    });
    fireEvent.animationEnd(container.querySelector('.ant-drawer-content-wrapper'));
    expect(container.querySelector('.ant-drawer-content-wrapper-hidden')).toBeTruthy();

    // Show
    rerender(getDrawer({ open: true, getContainer: false }));
    expect(container.querySelector('.ant-drawer-content-wrapper')).toBeTruthy();
    expect(container.querySelector('.ant-drawer-content-wrapper-hidden')).toBeFalsy();

    // Hide
    rerender(getDrawer({ open: false, getContainer: false }));
    act(() => {
      jest.runAllTimers();
    });
    fireEvent.animationEnd(container.querySelector('.ant-drawer-content-wrapper'));
    expect(container.querySelector('.ant-drawer-content-wrapper-hidden')).toBeTruthy();
  });

  it('test afterOpenChange', async () => {
    const afterOpenChange = jest.fn();
    const { container, rerender } = render(getDrawer({ afterOpenChange, open: true }));
    rerender(getDrawer({ afterOpenChange, open: false }));

    act(() => {
      jest.runAllTimers();
    });
    fireEvent.animationEnd(container.querySelector('.ant-drawer-content-wrapper'));

    expect(afterOpenChange).toBeCalledTimes(1);
  });

  it('should support children ref', () => {
    const fn = jest.fn();

    const refCallback = ref => {
      expect(typeof ref).toBe('object');
      fn();
    };

    const RefDemo = () => {
      const ref = React.useRef();
      const [open, setOpen] = React.useState(false);

      React.useEffect(() => {
        if (open) {
          refCallback(ref.current);
        }
      }, [open]);

      return (
        <>
          <a onClick={() => setOpen(true)}>open</a>
          <Drawer open={open}>
            <div ref={ref} />
          </Drawer>
        </>
      );
    };
    const { container } = render(<RefDemo />);
    fireEvent.click(container.querySelector('a'));
    expect(fn).toHaveBeenCalled();
  });
});
