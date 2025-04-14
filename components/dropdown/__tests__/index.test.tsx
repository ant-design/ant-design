import React from 'react';
import type { TriggerProps } from '@rc-component/trigger';
import ConfigProvider from '../../config-provider';

import type { DropDownProps } from '..';
import Dropdown from '..';
import { resetWarned } from '../../_util/warning';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { act, fireEvent, render, waitFakeTimer } from '../../../tests/utils';

let triggerProps: TriggerProps;

jest.mock('@rc-component/trigger', () => {
  let Trigger = jest.requireActual('@rc-component/trigger/lib/mock');
  Trigger = Trigger.default || Trigger;
  const h: typeof React = jest.requireActual('react');

  return {
    default: h.forwardRef<HTMLElement, TriggerProps>((props, ref) => {
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
      getPopupContainer: (node) => node,
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
    const error = jest.spyOn(console, 'error').mockImplementation(() => {});
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
            adjustX: true,
            adjustY: true,
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

  it('legacy visible', () => {
    resetWarned();
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const onOpenChange = jest.fn();
    const onVisibleChange = jest.fn();

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
      'Warning: [antd: Dropdown] `visible` is deprecated. Please use `open` instead.',
    );
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Dropdown] `onVisibleChange` is deprecated. Please use `onOpenChange` instead.',
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

  it('not block ref', () => {
    const divRef = React.createRef<HTMLDivElement>();
    render(
      <Dropdown open dropdownRender={() => <div ref={divRef} />}>
        <a />
      </Dropdown>,
    );

    expect(divRef.current).toBeTruthy();
  });

  it('should trigger open event when click on item', () => {
    const onOpenChange = jest.fn();
    render(
      <Dropdown
        onOpenChange={onOpenChange}
        open
        menu={{
          items: [
            {
              label: <div className="bamboo" />,
              key: 1,
            },
          ],
        }}
      >
        <a />
      </Dropdown>,
    );

    fireEvent.click(document.body.querySelector('.bamboo')!);
    expect(onOpenChange).toHaveBeenCalledWith(false, { source: 'menu' });
  });

  it('is still open after selection in multiple mode', () => {
    jest.useFakeTimers();
    const { container } = render(
      <Dropdown
        trigger={['click']}
        menu={{
          selectable: true,
          multiple: true,
          items: [
            { label: '1', key: 1 },
            { label: '2', key: 2 },
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

    // Selecting item
    fireEvent.click(container.querySelector('.ant-dropdown-menu-item')!);

    // Force Motion move on
    for (let i = 0; i < 10; i += 1) {
      act(() => {
        jest.runAllTimers();
      });
    }
    expect(container.querySelector('.ant-dropdown-hidden')).toBeFalsy();
    jest.useRealTimers();
  });

  it('should respect trigger disabled prop', () => {
    const { container: container1 } = render(
      <Dropdown menu={{ items }} disabled>
        <button type="button">button</button>
      </Dropdown>,
    );
    expect(container1.querySelector('button')).toHaveAttribute('disabled');

    const { container: container2 } = render(
      <Dropdown menu={{ items }}>
        <button type="button" disabled>
          button
        </button>
      </Dropdown>,
    );
    expect(container2.querySelector('button')).toHaveAttribute('disabled');

    const { container: container3 } = render(
      <Dropdown menu={{ items }} disabled>
        <button type="button" disabled={false}>
          button
        </button>
      </Dropdown>,
    );
    expect(container3.querySelector('button')).not.toHaveAttribute('disabled');
  });

  it('should support Primitive', () => {
    expect(() => {
      render(<Dropdown>antd</Dropdown>);
      render(<Dropdown>{123}</Dropdown>);
      render(<Dropdown>{undefined}</Dropdown>);
      render(<Dropdown>{true}</Dropdown>);
      render(<Dropdown>{false}</Dropdown>);
      render(<Dropdown>{null}</Dropdown>);
    }).not.toThrow();
  });

  it('menu item with extra prop', () => {
    const text = '⌘P';
    const { container } = render(
      <Dropdown menu={{ items: [{ label: 'profile', key: 1, extra: text }] }} open>
        <a />
      </Dropdown>,
    );

    expect(
      container.querySelector('.ant-dropdown-menu-title-content-with-extra'),
    ).toBeInTheDocument();
    expect(container.querySelector('.ant-dropdown-menu-item-extra')?.textContent).toBe(text);
  });

  it('should show correct arrow direction in rtl mode', () => {
    const items = [
      {
        key: '1',
        label: 'sub menu',
        children: [
          {
            key: '1-1',
            label: '1rd menu item',
          },
          {
            key: '1-2',
            label: '2th menu item',
          },
        ],
      },
    ];

    const { container } = render(
      <ConfigProvider direction="rtl">
        <Dropdown menu={{ items, openKeys: ['2'] }} open autoAdjustOverflow={false}>
          <a onClick={(e) => e.preventDefault()}>Cascading menu</a>
        </Dropdown>
      </ConfigProvider>,
    );
    expect(
      container.querySelector(
        '.ant-dropdown-menu-submenu-arrow .ant-dropdown-menu-submenu-arrow-icon',
      ),
    ).toHaveClass('anticon-left');
  });
});
