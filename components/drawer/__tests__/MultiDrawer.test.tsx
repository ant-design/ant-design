import type { DrawerPopupProps } from 'rc-drawer/lib/DrawerPopup';
import React, { useState } from 'react';
import Drawer from '..';
import { fireEvent, render } from '../../../tests/utils';
import Button from '../../button';

interface DrawerPropsType {
  push?: DrawerPopupProps['push'];
  placement?: DrawerPopupProps['placement'];
}

const MultiDrawer: React.FC<DrawerPropsType> = (props) => {
  const { placement, push } = props;

  const [open, setOpen] = useState<boolean>(false);
  const [hasChildren, setHasChildren] = useState<boolean>(true);
  const [childrenDrawer, setChildrenDrawer] = useState<boolean>(false);

  const showDrawer = () => {
    setOpen(true);
    setHasChildren(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
    setHasChildren(true);
  };

  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };

  const onRemoveChildDrawer = () => {
    setHasChildren(false);
  };

  return (
    <div>
      <Button type="primary" id="open_drawer" onClick={showDrawer}>
        Open drawer
      </Button>
      <Button type="primary" id="remove_drawer" onClick={onRemoveChildDrawer}>
        rm child drawer
      </Button>
      <Drawer
        title="Multi-level drawer"
        className="test_drawer"
        width={520}
        onClose={onClose}
        getContainer={false}
        placement={placement}
        open={open}
        push={push}
      >
        <Button type="primary" id="open_two_drawer" onClick={showChildrenDrawer}>
          Two-level drawer
        </Button>
        {hasChildren && (
          <Drawer
            title="Two-level Drawer"
            width={320}
            className="Two-level"
            getContainer={false}
            placement={placement}
            onClose={onChildrenDrawerClose}
            open={childrenDrawer}
          >
            <div id="two_drawer_text">This is two-level drawer</div>
          </Drawer>
        )}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e8e8e8',
            padding: '10px 16px',
            textAlign: 'right',
            left: 0,
            backgroundColor: '#fff',
            borderRadius: '0 0 4px 4px',
          }}
        >
          <Button style={{ marginRight: 8 }} onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose} type="primary">
            Submit
          </Button>
        </div>
      </Drawer>
      <div className="childrenDrawer">{String(childrenDrawer)}</div>
    </div>
  );
};

describe('Drawer', () => {
  it('render right MultiDrawer', () => {
    const { container } = render(<MultiDrawer placement="right" />);
    fireEvent.click(container.querySelector('button#open_drawer')!);
    fireEvent.click(container.querySelector('button#open_two_drawer')!);

    expect(container.querySelector('.ant-drawer-content-wrapper')).toHaveStyle({
      transform: 'translateX(-180px)',
    });
    expect(container.querySelectorAll('#two_drawer_text').length).toBe(1);
  });

  it('render left MultiDrawer', () => {
    const { container } = render(<MultiDrawer placement="left" />);
    fireEvent.click(container.querySelector('button#open_drawer')!);
    fireEvent.click(container.querySelector('button#open_two_drawer')!);

    expect(container.querySelector('.ant-drawer-content-wrapper')).toHaveStyle({
      transform: 'translateX(180px)',
    });
    expect(container.querySelectorAll('#two_drawer_text').length).toBe(1);
    fireEvent.click(container.querySelector('.Two-level .ant-drawer-close')!);
    expect(container.querySelector('.childrenDrawer')?.innerHTML).toEqual('false');
  });

  it('render top MultiDrawer', () => {
    const { container } = render(<MultiDrawer placement="top" />);
    fireEvent.click(container.querySelector('button#open_drawer')!);
    fireEvent.click(container.querySelector('button#open_two_drawer')!);
    expect(container.querySelector('.ant-drawer-content-wrapper')).toHaveStyle({
      transform: 'translateY(180px)',
    });
    expect(container.querySelectorAll('#two_drawer_text').length).toBe(1);
  });

  it('render MultiDrawer is child in unmount', () => {
    const { container: wrapper } = render(<MultiDrawer placement="top" />);
    fireEvent.click(wrapper.querySelector('button#open_drawer')!);
    fireEvent.click(wrapper.querySelector('button#open_two_drawer')!);
    fireEvent.click(wrapper.querySelector('button#remove_drawer')!);

    // Strange, testing-lib get wrong style in next branch.
    expect((wrapper.querySelector('.ant-drawer-content-wrapper') as any).style).toEqual(
      expect.objectContaining({
        transform: '',
      }),
    );

    fireEvent.click(wrapper.querySelector('button#open_two_drawer')!);
    expect(wrapper.querySelector('.ant-drawer-content-wrapper')).toHaveStyle({
      transform: 'translateY(180px)',
    });
    expect(wrapper.querySelectorAll('#two_drawer_text').length).toBe(1);
  });

  it('custom MultiDrawer push distance', () => {
    const { container } = render(<MultiDrawer push={{ distance: 256 }} />);
    fireEvent.click(container.querySelector('button#open_drawer')!);
    fireEvent.click(container.querySelector('button#open_two_drawer')!);
    expect(container.querySelector('.ant-drawer-content-wrapper')).toHaveStyle({
      transform: 'translateX(-256px)',
    });
  });

  it('custom MultiDrawer push with true', () => {
    const { container } = render(<MultiDrawer push />);
    fireEvent.click(container.querySelector('button#open_drawer')!);
    fireEvent.click(container.querySelector('button#open_two_drawer')!);
    expect(container.querySelector('.ant-drawer-content-wrapper')).toHaveStyle({
      transform: 'translateX(-180px)',
    });
  });

  it('custom MultiDrawer push with false', () => {
    const { container: wrapper } = render(<MultiDrawer push={false} />);
    fireEvent.click(wrapper.querySelector('button#open_drawer')!);
    fireEvent.click(wrapper.querySelector('button#open_two_drawer')!);
    expect((wrapper.querySelector('.ant-drawer-content-wrapper') as any).style).toEqual(
      expect.objectContaining({
        transform: '',
      }),
    );
  });
});
