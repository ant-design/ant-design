import React from 'react';
import { SaveOutlined } from '@ant-design/icons';
import type { TriggerProps } from '@rc-component/trigger';

import type { DropDownProps } from '..';
import Dropdown from '..';
import { resetWarned } from '../../_util/warning';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { act, fireEvent, render, waitFakeTimer } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import type { MenuProps } from '../../menu';

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
  it('support classNames and styles', () => {
    const items: MenuProps['items'] = [
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
            icon: <SaveOutlined />,
          },
        ],
      },
      {
        key: 'SubMenu',
        label: 'SubMenu',
        children: [
          {
            key: 'g1',
            label: 'Item 1',
            type: 'group',
            children: [
              { key: '1', label: 'Option 1' },
              { key: '2', label: 'Option 2' },
            ],
          },
        ],
      },
    ];
    const testClassNames = {
      root: 'test-root',
      itemTitle: 'test-menu-item-title',
      item: 'test-menu-item',
      itemContent: 'test-menu-item-content',
      itemIcon: 'test-menu-item-icon',
    };
    const testStyles = {
      root: { backgroundColor: 'rgb(0, 0, 255)' },
      itemTitle: { color: 'rgb(255, 0, 0)' },
      item: { backgroundColor: 'rgb(0, 255, 0)' },
      itemContent: { color: 'rgb(255, 255, 0)' },
      itemIcon: { fontSize: '20px' },
    };
    const { container } = render(
      <Dropdown menu={{ items }} open classNames={testClassNames} styles={testStyles}>
        <button type="button">button</button>
      </Dropdown>,
    );
    const root = container.querySelector('.ant-dropdown');
    const item = container.querySelector('.ant-dropdown-menu-item');
    const itemIcon = container.querySelector('.ant-dropdown-menu-item-icon');
    const itemContent = container.querySelector('.ant-dropdown-menu-title-content');
    const itemTitle = container.querySelector('.ant-dropdown-menu-item-group-title');

    expect(root).toHaveClass(testClassNames.root);
    expect(root).toHaveStyle(testStyles.root);
    expect(item).toHaveClass(testClassNames.item);
    expect(item).toHaveStyle(testStyles.item);
    expect(itemIcon).toHaveClass(testClassNames.itemIcon);
    expect(itemIcon).toHaveStyle(testStyles.itemIcon);
    expect(itemContent).toHaveClass(testClassNames.itemContent);
    expect(itemContent).toHaveStyle(testStyles.itemContent);
    expect(itemTitle).toHaveClass(testClassNames.itemTitle);
    expect(itemTitle).toHaveStyle(testStyles.itemTitle);
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
});
