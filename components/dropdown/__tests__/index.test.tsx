import React from 'react';
import { SaveOutlined } from '@ant-design/icons';
import type { TriggerProps } from '@rc-component/trigger';

import type { DropDownProps } from '..';
import Dropdown from '..';
import { resetWarned } from '../../_util/warning';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { act, fireEvent, render, waitFakeTimer, waitFor } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

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

  it('support custom transitionName', () => {
    const { asFragment } = render(
      <Dropdown menu={{ items }} transitionName="move-up" open>
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
      expect.stringContaining(
        '[antd: Dropdown] `placement: bottomCenter` is deprecated. Please use `placement: bottom` instead.',
      ),
    );
    expect(error).toHaveBeenCalledWith(
      expect.stringContaining(
        '[antd: Dropdown] `placement: topCenter` is deprecated. Please use `placement: top` instead.',
      ),
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

  it('legacy dropdownRender & legacy destroyPopupOnHide', () => {
    resetWarned();
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const dropdownRender = jest.fn((menu) => (
      <div className="custom-dropdown">
        {menu}
        <div className="extra-content">Extra Content</div>
      </div>
    ));

    const { container } = render(
      <Dropdown
        open
        destroyPopupOnHide
        dropdownRender={dropdownRender}
        menu={{
          items: [
            {
              label: <div className="menu-item">Menu Item</div>,
              key: 'item',
            },
          ],
        }}
      >
        <a className="trigger" />
      </Dropdown>,
    );

    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Dropdown] `dropdownRender` is deprecated. Please use `popupRender` instead.',
    );
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Dropdown] `destroyPopupOnHide` is deprecated. Please use `destroyOnHidden` instead.',
    );

    expect(dropdownRender).toHaveBeenCalled();
    expect(container.querySelector('.custom-dropdown')).toBeTruthy();
    expect(container.querySelector('.menu-item')).toBeTruthy();
    expect(container.querySelector('.extra-content')).toBeTruthy();
    expect(container.querySelector('.extra-content')?.textContent).toBe('Extra Content');

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

  it('closure item click', () => {
    let latestCnt = -1;

    const Demo = () => {
      const [cnt, setCnt] = React.useState(0);

      const onOpenChange = () => {
        latestCnt = cnt;
      };

      return (
        <Dropdown
          onOpenChange={onOpenChange}
          menu={{
            items: [
              {
                label: (
                  <span
                    className="bamboo"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCnt((v) => v + 1);
                    }}
                  />
                ),
                key: '1',
              },
              {
                label: <span className="little" />,
                key: '2',
              },
            ],
          }}
          open
        >
          <span />
        </Dropdown>
      );
    };

    const { container } = render(<Demo />);

    // Change
    fireEvent.click(container.querySelector('.bamboo')!);

    // Close
    fireEvent.click(container.querySelector('.little')!);
    expect(latestCnt).toBe(1);
  });
  it('support function classNames and styles', () => {
    const fnClassNames = (info: { props: DropDownProps }) => {
      const { props } = info;
      const { placement } = props;
      return {
        root: `test-root-${placement}`,
        item: 'test-item',
        itemTitle: 'test-item-title',
        itemContent: 'test-item-content',
        itemIcon: 'test-item-icon',
      };
    };
    const fnStyles = (info: { props: DropDownProps }) => {
      const { props } = info;
      const { placement } = props;
      return {
        root: { color: 'rgb(255, 0, 0)' },
        item: { color: 'rgb(0, 255, 0)' },
        itemTitle: { color: placement === 'topCenter' ? 'rgb(255, 0, 0)' : 'rgb(0, 255, 0)' },
        itemContent: { color: 'rgb(0, 255, 0)' },
        itemIcon: { color: 'rgb(255, 0, 0)' },
      };
    };

    const baseProps: DropDownProps = {
      menu: {
        items: [
          {
            key: '1',
            type: 'group',
            label: 'Group title',
            children: [
              {
                key: '1-1',
                label: '1st menu item',
                icon: <SaveOutlined />,
              },
              {
                key: '1-2',
                label: '2nd menu item',
              },
            ],
          },
        ],
      },
      open: true,
      placement: 'topCenter',
    };
    const { container, rerender } = render(
      <Dropdown {...baseProps} classNames={fnClassNames} styles={fnStyles}>
        <button type="button">button</button>
      </Dropdown>,
    );

    const root = container.querySelector('.ant-dropdown');
    const item = container.querySelector('.ant-dropdown-menu-item');
    const itemIcon = container.querySelector('.ant-dropdown-menu-item-icon');
    const itemContent = container.querySelector('.ant-dropdown-menu-title-content');
    const itemTitle = container.querySelector('.ant-dropdown-menu-item-group-title');

    expect(root).toHaveClass('test-root-topCenter');
    expect(item).toHaveClass('test-item');
    expect(itemIcon).toHaveClass('test-item-icon');
    expect(itemContent).toHaveClass('test-item-content');
    expect(itemTitle).toHaveClass('test-item-title');
    expect(root).toHaveStyle('color: rgb(255, 0, 0)');
    expect(item).toHaveStyle('color: rgb(0, 255, 0)');
    expect(itemIcon).toHaveStyle('color: rgb(255, 0, 0)');
    expect(itemContent).toHaveStyle('color: rgb(0, 255, 0)');
    expect(itemTitle).toHaveStyle('color: rgb(255, 0, 0)');

    const objectClassNames = {
      root: 'test-root-object',
      item: 'test-item-object',
      itemTitle: 'test-item-title-object',
      itemContent: 'test-item-content-object',
      itemIcon: 'test-item-icon-object',
    };
    const objectStyles = {
      root: { color: 'rgb(255, 0, 255)' },
      item: { color: 'rgb(255, 255, 0)' },
      itemTitle: { color: 'rgb(255, 255, 0)' },
      itemContent: { color: 'rgb(0, 255, 0)' },
      itemIcon: { color: 'rgb(255, 0, 255)' },
    };

    rerender(
      <Dropdown {...baseProps} classNames={objectClassNames} styles={objectStyles}>
        <button type="button">button</button>
      </Dropdown>,
    );
    expect(root).toHaveClass(objectClassNames.root);
    expect(item).toHaveClass(objectClassNames.item);
    expect(itemIcon).toHaveClass(objectClassNames.itemIcon);
    expect(itemContent).toHaveClass(objectClassNames.itemContent);
    expect(itemTitle).toHaveClass(objectClassNames.itemTitle);
    expect(root).toHaveStyle(objectStyles.root);
    expect(item).toHaveStyle(objectStyles.item);
    expect(itemIcon).toHaveStyle(objectStyles.itemIcon);
    expect(itemContent).toHaveStyle(objectStyles.itemContent);
    expect(itemTitle).toHaveStyle(objectStyles.itemTitle);
  });

  it('should dynamically set maxHeight - dropdown menu renders on top', () => {
    const rectSpy = jest
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockReturnValue({ top: 900, bottom: 922 } as DOMRect);

    Object.defineProperty(window, 'innerHeight', { value: 1000, writable: true });
    const { container } = render(
      <Dropdown open menu={{ items: [{ key: '1', label: 'Test item' }] }}>
        <button type="button">button</button>
      </Dropdown>,
    );

    const dropdown = container.querySelector('.ant-dropdown-menu') as HTMLElement;
    expect(dropdown).not.toBeNull();

    //because the dropdown menu will render above (if overflowing), calculate (totalViewportHeight - top - 16)
    expect(dropdown).toHaveStyle({ maxHeight: '884px' });

    rectSpy.mockRestore();
  });

  it('should dynamically set maxHeight - dropdown menu renders on bottom', () => {
    const rectSpy = jest
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockReturnValue({ top: 100, bottom: 122 } as DOMRect);

    Object.defineProperty(window, 'innerHeight', { value: 1000, writable: true });
    const { container } = render(
      <Dropdown open menu={{ items: [{ key: '1', label: 'Test item' }] }}>
        <button type="button">button</button>
      </Dropdown>,
    );

    const dropdown = container.querySelector('.ant-dropdown-menu') as HTMLElement;
    expect(dropdown).not.toBeNull();

    //because the dropdown menu will render below, calculate (window.innerHeight - rect.bottom - 16)
    expect(dropdown).toHaveStyle({ maxHeight: '862px' });

    rectSpy.mockRestore();
  });

  it('should dynamically set maxHeight - dropdown on bottom of viewport with autoAdjustOverflow={false}', () => {
    const rectSpy = jest
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockReturnValue({ top: 950, bottom: 972 } as DOMRect);

    Object.defineProperty(window, 'innerHeight', { value: 1000, writable: true });
    const { container } = render(
      <Dropdown
        open
        menu={{ items: [{ key: '1', label: 'Test item' }] }}
        autoAdjustOverflow={false}
      >
        <button type="button">button</button>
      </Dropdown>,
    );

    const dropdown = container.querySelector('.ant-dropdown-menu') as HTMLElement;
    expect(dropdown).not.toBeNull();

    //The dropdown menu will render on bottom because autoAdjustOverflow={false}, but there is not enough space, so default 35vh should be set
    expect(dropdown).toHaveStyle({ maxHeight: '35vh' });

    rectSpy.mockRestore();
  });

  it('should successfully set maxHeight on submenu', async () => {
    const rectSpy = jest
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockReturnValue({ top: 400, bottom: 422 } as DOMRect);

    Object.defineProperty(window, 'innerHeight', { value: 1000, writable: true });
    render(
      <Dropdown
        forceRender
        open
        menu={{
          triggerSubMenuAction: 'click',
          forceSubMenuRender: true,

          items: [
            {
              key: '1',
              label: 'Test item',
              children: [
                {
                  key: '1-1',
                  label: '1st menu item',
                },
                {
                  key: '1-2',
                  label: '2nd menu item',
                },
              ],
            },
          ],
          openKeys: ['1'],
        }}
        autoAdjustOverflow={false}
      >
        <button type="button">button</button>
      </Dropdown>,
    );

    const submenu = await waitFor(
      () => document.querySelector('ul.ant-dropdown-menu-sub') as HTMLElement,
    );

    expect(submenu).toHaveStyle({ maxHeight: '35vh' });

    rectSpy.mockRestore();
  });
});
