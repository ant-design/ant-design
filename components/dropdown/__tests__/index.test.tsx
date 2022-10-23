import React from 'react';
import type { TriggerProps } from 'rc-trigger';
import Dropdown from '..';
import Menu from '../../menu';
import type { DropDownProps } from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { act, fireEvent, render, waitFakeTimer } from '../../../tests/utils';

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
  const items = [
    {
      label: 'foo',
      key: '1',
    },
  ];

  mountTest(() => (
    <Dropdown menu={{ items }}>
      <span />
    </Dropdown>
  ));

  rtlTest(() => (
    <Dropdown menu={{ items }}>
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

  it('should render custom dropdown correctly', () => {
    const { asFragment } = render(
      <Dropdown
        open
        menu={{ items }}
        dropdownRender={menu => (
          <div>
            {menu}
            <div className="dropdown-custom-node">CUSTOM NODE</div>
          </div>
        )}
      >
        <button type="button">button</button>
      </Dropdown>,
    );
    expect(Array.from(asFragment().childNodes)).toMatchSnapshot();
  });

  it('support Menu expandIcon', async () => {
    jest.useFakeTimers();
    const props: DropDownProps = {
      menu: {
        items: [
          {
            label: 'foo',
            key: '1',
          },
          {
            label: 'SubMenu',
            key: 'submenu',
            children: [
              {
                label: 'foo',
                key: '1',
              },
            ],
          },
        ],
        expandIcon: <span id="customExpandIcon" />,
      },
      open: true,
      getPopupContainer: node => node,
    };

    const { container } = render(
      <Dropdown {...props}>
        <button type="button">button</button>
      </Dropdown>,
    );
    await waitFakeTimer();
    expect(container.querySelectorAll('#customExpandIcon').length).toBe(1);
    jest.useRealTimers();
  });

  it('should warn if use topCenter or bottomCenter', () => {
    const error = jest.spyOn(console, 'error');
    render(
      <div>
        <Dropdown menu={{ items }} placement="bottomCenter">
          <button type="button">bottomCenter</button>
        </Dropdown>
        <Dropdown menu={{ items }} placement="topCenter">
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
      <Dropdown menu={{ items }} open>
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
        menu={{
          items: [
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
          ],
        }}
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

  it('deprecated warning', () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { rerender } = render(
      <Dropdown
        visible
        menu={{
          items: [
            {
              label: <div className="bamboo" />,
              key: 'bamboo',
            },
          ],
        }}
      >
        <a />
      </Dropdown>,
    );
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: Dropdown] `visible` is deprecated which will be removed in next major version, please use `open` instead.',
    );
    rerender(
      <Dropdown
        onVisibleChange={() => {}}
        menu={{
          items: [
            {
              label: <div className="bamboo" />,
              key: 'bamboo',
            },
          ],
        }}
      >
        <a />
      </Dropdown>,
    );
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: Dropdown] `onVisibleChange` is deprecated which will be removed in next major version, please use `onOpenChange` instead.',
    );
    rerender(
      <Dropdown overlay={<div>menu</div>}>
        <a />
      </Dropdown>,
    );
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: Dropdown] `overlay` is deprecated. Please use `menu` instead.',
    );

    errSpy.mockRestore();
  });

  it('control dropdown visibility by menu keys when click menu item', () => {
    jest.useFakeTimers();
    const { container } = render(
      <Dropdown
        trigger={['click']}
        closeOnSelectKeys={['close']}
        overlay={
          <Menu
            items={[
              {
                key: '1',
                label: 'menu item 1',
                title: 'menu item 1',
              },
              {
                key: '2',
                label: 'menu item 2',
                title: 'menu item 2',
              },
              {
                key: '3',
                label: 'menu item 3',
                title: 'menu item 3',
              },
              {
                key: 'close',
                danger: true,
                label: 'close',
                title: 'close',
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

    // do not close when click item's key is not include in closeOnSelectKeys
    fireEvent.click(container.querySelector('[title="menu item 1"]')!);

    expect(container.querySelector('.ant-dropdown-hidden')).toBeFalsy();

    // Open
    fireEvent.click(container.querySelector('a')!);
    act(() => {
      jest.runAllTimers();
    });

    // dropdown should be closed when click item's key is include closeOnSelectKeys
    fireEvent.click(container.querySelector('[title="close"]')!);

    // Force Motion move on
    for (let i = 0; i < 10; i += 1) {
      act(() => {
        jest.runAllTimers();
      });
    }

    // Motion End
    fireEvent.animationEnd(container.querySelector('.ant-slide-up-leave-active')!);

    expect(container.querySelector('.ant-dropdown-hidden')).toBeTruthy();

    // =========================================
    // if closeOnSelectKeys pass with empty array,dropdown will not close when click menu item
    const { container: container2 } = render(
      <Dropdown
        trigger={['click']}
        closeOnSelectKeys={[]}
        overlay={
          <Menu
            items={[
              {
                key: '1',
                label: 'menu item 1',
                title: 'menu item 1',
              },
              {
                key: '2',
                label: 'menu item 2',
                title: 'menu item 2',
              },
              {
                key: '3',
                label: 'menu item 3',
                title: 'menu item 3',
              },
              {
                key: 'close',
                danger: true,
                label: 'close',
                title: 'close',
              },
            ]}
          />
        }
      >
        <a />
      </Dropdown>,
    );
    // Open
    fireEvent.click(container2.querySelector('a')!);
    act(() => {
      jest.runAllTimers();
    });

    // do not close when click item's key is not include in closeOnSelectKeys
    fireEvent.click(container2.querySelector('[title="menu item 1"]')!);
    expect(container2.querySelector('.ant-dropdown-hidden')).toBeFalsy();
    fireEvent.click(container2.querySelector('[title="close"]')!);
    expect(container2.querySelector('.ant-dropdown-hidden')).toBeFalsy();
    jest.useRealTimers();
  });
});
