import React from 'react';
import type { TriggerProps } from 'rc-trigger';
import Dropdown from '..';
import type { DropDownProps } from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { act, fireEvent, render, sleep } from '../../../tests/utils';
import Menu from '../../menu';

let triggerProps: TriggerProps;

jest.mock('rc-trigger', () => {
  let Trigger = jest.requireActual('rc-trigger/lib/mock');
  Trigger = Trigger.default || Trigger;
  const h: typeof React = jest.requireActual('react');

  return {
    default: h.forwardRef<unknown, TriggerProps>((props, ref) => {
      triggerProps = props;
      return h.createElement(Trigger, { ref, ...props });
    }),
    __esModule: true,
  };
});

describe('Dropdown', () => {
  mountTest(() => (
    <Dropdown overlay={<Menu />}>
      <span />
    </Dropdown>
  ));

  rtlTest(() => (
    <Dropdown overlay={<Menu />}>
      <span />
    </Dropdown>
  ));

  it('overlay is function and has custom transitionName', () => {
    const { asFragment } = render(
      <Dropdown overlay={() => <div>menu</div>} transitionName="move-up" open>
        <button type="button">button</button>
      </Dropdown>,
    );
    expect(Array.from(asFragment().childNodes)).toMatchSnapshot();
  });

  it('overlay is string', () => {
    const { asFragment } = render(
      <Dropdown overlay={'string' as any} open>
        <button type="button">button</button>
      </Dropdown>,
    );
    expect(Array.from(asFragment().childNodes)).toMatchSnapshot();
  });

  it('support Menu expandIcon', async () => {
    const props: DropDownProps = {
      overlay: (
        <Menu expandIcon={<span id="customExpandIcon" />}>
          <Menu.Item key="1">foo</Menu.Item>
          <Menu.SubMenu title="SubMenu">
            <Menu.Item key="1">foo</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      ),
      open: true,
      getPopupContainer: node => node,
    };

    const { container } = render(
      <Dropdown {...props}>
        <button type="button">button</button>
      </Dropdown>,
    );
    await sleep(500);
    expect(container.querySelectorAll('#customExpandIcon').length).toBe(1);
  });

  it('should warn if use topCenter or bottomCenter', () => {
    const error = jest.spyOn(console, 'error');
    render(
      <div>
        <Dropdown overlay={'123' as any} placement="bottomCenter">
          <button type="button">bottomCenter</button>
        </Dropdown>
        <Dropdown overlay={'123' as any} placement="topCenter">
          <button type="button">topCenter</button>
        </Dropdown>
      </div>,
    );
    expect(error).toHaveBeenCalledWith(
      expect.stringContaining("[antd: Dropdown] You are using 'bottomCenter'"),
    );
    expect(error).toHaveBeenCalledWith(
      expect.stringContaining("[antd: Dropdown] You are using 'topCenter'"),
    );
    error.mockRestore();
  });

  // zombieJ: when replaced with react test lib, it may be mock fully content
  it('dropdown should support auto adjust placement', () => {
    render(
      <Dropdown overlay={<div>menu</div>} open>
        <button type="button">button</button>
      </Dropdown>,
    );

    expect(triggerProps.builtinPlacements).toEqual(
      expect.objectContaining({
        bottomLeft: expect.objectContaining({
          overflow: {
            adjustX: 1,
            adjustY: 1,
          },
        }),
      }),
    );
  });

  it('menu item with group', () => {
    jest.useFakeTimers();
    const { container } = render(
      <Dropdown
        trigger={['click']}
        overlay={
          <Menu
            items={[
              {
                label: 'grp',
                type: 'group',
                children: [
                  {
                    label: '1',
                    key: 1,
                  },
                ],
              },
            ]}
          />
        }
      >
        <a />
      </Dropdown>,
    );

    // Open
    fireEvent.click(container.querySelector('a')!);
    act(() => {
      jest.runAllTimers();
    });

    // Close
    fireEvent.click(container.querySelector('.ant-dropdown-menu-item')!);

    // Force Motion move on
    for (let i = 0; i < 10; i += 1) {
      act(() => {
        jest.runAllTimers();
      });
    }

    // Motion End
    fireEvent.animationEnd(container.querySelector('.ant-slide-up-leave-active')!);

    expect(container.querySelector('.ant-dropdown-hidden')).toBeTruthy();

    jest.useRealTimers();
  });
});
