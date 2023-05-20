import React from 'react';
import type { DropDownProps } from '..';
import Dropdown from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { act, fireEvent, render, waitFakeTimer } from '../../../tests/utils';
import { resetWarned } from '../../_util/warning';

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
        dropdownRender={(menu) => (
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
    vi.useFakeTimers();
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
      getPopupContainer: (node) => node,
    };

    const { container } = render(
      <Dropdown {...props}>
        <button type="button">button</button>
      </Dropdown>,
    );
    await waitFakeTimer();
    expect(container.querySelectorAll('#customExpandIcon').length).toBe(1);
    vi.useRealTimers();
  });

  it('should warn if use topCenter or bottomCenter', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
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

    expect(globalThis.triggerProps.builtinPlacements).toEqual(
      expect.objectContaining({
        bottomLeft: expect.objectContaining({
          overflow: {
            adjustX: true,
            adjustY: true,
          },
        }),
      }),
    );
  });

  it('menu item with group', async () => {
    vi.useFakeTimers();
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
      vi.runAllTimers();
    });

    // Close
    fireEvent.click(container.querySelector('.ant-dropdown-menu-item')!);

    // Force Motion move on
    await waitFakeTimer(0);

    // Motion End
    fireEvent.animationEnd(container.querySelector('.ant-slide-up-leave-active')!);

    expect(container.querySelector('.ant-dropdown-hidden')).toBeTruthy();

    vi.useRealTimers();
  });

  it('legacy visible', () => {
    resetWarned();
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const onOpenChange = vi.fn();
    const onVisibleChange = vi.fn();

    const { container, rerender } = render(
      <Dropdown
        visible
        onOpenChange={onOpenChange}
        onVisibleChange={onVisibleChange}
        trigger={['click']}
        menu={{
          items: [
            {
              label: <div className="bamboo" />,
              key: 'bamboo',
            },
          ],
        }}
      >
        <a className="little" />
      </Dropdown>,
    );

    expect(document.querySelector('.bamboo')).toBeTruthy();
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Dropdown] `visible` is deprecated, please use `open` instead.',
    );
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Dropdown] `onVisibleChange` is deprecated, please use `onOpenChange` instead.',
    );

    fireEvent.click(container.querySelector('.little')!);
    expect(onOpenChange).toHaveBeenCalled();
    expect(onVisibleChange).toHaveBeenCalled();

    rerender(
      <Dropdown overlay={<div>menu</div>}>
        <a className="little" />
      </Dropdown>,
    );
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Dropdown] `overlay` is deprecated. Please use `menu` instead.',
    );

    errorSpy.mockRestore();
  });
});
