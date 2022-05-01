import React from 'react';

import Drawer from '..';

import { render, screen } from '../../../tests/utils';

jest.mock('..', () => {
  const FakeTransition = jest.fn(({ children }) => children);
  const FakeCSSTransition = jest.fn(props => {
    if (props.afterVisibleChange) {
      props.afterVisibleChange(props.visible);
    }
    if (!props.visible && props.destroyOnClose) {
      return null;
    }
    return <FakeTransition>{props.children}</FakeTransition>;
  });
  return FakeCSSTransition;
});
describe('DrawerEventMock', () => {
  const getDrawer = props => (
    <Drawer visible getContainer={false} {...props}>
      Here is content of Drawer
    </Drawer>
  );

  it('dom should be removed after close when destroyOnClose is true', () => {
    const { rerender } = render(getDrawer({ destroyOnClose: true }));
    rerender(getDrawer({ destroyOnClose: true, visible: false }));
    expect(screen.queryByText(/Here is content of Drawer/)).toBeFalsy();
  });

  it('dom should be existed after close when destroyOnClose is false', () => {
    const { rerender } = render(getDrawer());
    expect(screen.queryByText(/Here is content of Drawer/)).toBeTruthy();
    rerender(getDrawer({ visible: false }));
    expect(screen.queryByText(/Here is content of Drawer/)).toBeTruthy();
  });

  it('After the drawer is closed, you need to execute afterVisibleChange', async () => {
    const afterVisibleChange = jest.fn();
    const { rerender } = render(getDrawer({ afterVisibleChange, visible: true }));
    rerender(getDrawer({ afterVisibleChange, visible: false }));
    expect(afterVisibleChange).toBeCalledTimes(4);
  });
});
