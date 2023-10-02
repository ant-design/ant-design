import React from 'react';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render, waitFakeTimer } from '../../../tests/utils';
import type { DropdownProps } from '../dropdown';
import DropdownButton from '../dropdown-button';

let dropdownProps: DropdownProps;

jest.mock('../dropdown', () => {
  const ActualDropdown = jest.requireActual('../dropdown');
  const ActualDropdownComponent = ActualDropdown.default;
  const h: typeof React = jest.requireActual('react');

  const MockedDropdown: React.FC<DropdownProps> & {
    Button: typeof ActualDropdownComponent.Button;
  } = (props) => {
    const clone: Record<string, any> = {};
    Object.keys(props).forEach((key: keyof typeof props) => {
      clone[key] = props[key];
    });

    dropdownProps = clone;
    const { children, ...restProps } = props;
    return h.createElement(ActualDropdownComponent, { ...restProps }, children);
  };
  MockedDropdown.Button = ActualDropdownComponent.Button;

  return {
    ...ActualDropdown,
    __esModule: true,
    default: MockedDropdown,
  };
});

describe('DropdownButton', () => {
  mountTest(DropdownButton);
  rtlTest(DropdownButton);

  it('pass appropriate props to Dropdown', () => {
    const items = [
      {
        label: 'foo',
        key: '1',
      },
    ];

    const props: DropdownProps = {
      align: {
        offset: [10, 20],
      },
      menu: { items },
      disabled: false,
      trigger: ['hover'],
      open: true,
      onOpenChange: () => {},
    };

    const { rerender } = render(<DropdownButton {...props} />);

    Object.keys(props).forEach((key: keyof DropdownProps) => {
      expect(dropdownProps[key]).toBe(props[key]);
    });

    rerender(<DropdownButton menu={{ items }} open />);
    expect(dropdownProps.open).toBe(true);
  });

  it("don't pass open to Dropdown if it's not exits", () => {
    const items = [
      {
        label: 'foo',
        key: '1',
      },
    ];
    render(<DropdownButton menu={{ items }} />);
    expect('open' in dropdownProps).toBe(false);
  });

  it('should support href like Button', () => {
    const items = [
      {
        label: 'foo',
        key: '1',
      },
    ];
    const { asFragment } = render(<DropdownButton menu={{ items }} href="https://ant.design" />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('have static property for type detecting', () => {
    expect(DropdownButton.__ANT_BUTTON).toBe(true);
  });

  it('should pass mouseEnterDelay and mouseLeaveDelay to Dropdown', () => {
    const items = [
      {
        label: 'foo',
        key: '1',
      },
    ];
    render(<DropdownButton mouseEnterDelay={1} mouseLeaveDelay={2} menu={{ items }} />);
    expect(dropdownProps.mouseEnterDelay).toBe(1);
    expect(dropdownProps.mouseLeaveDelay).toBe(2);
  });

  it('should support overlayClassName and overlayStyle', () => {
    const items = [
      {
        label: 'foo',
        key: '1',
      },
    ];
    const { container } = render(
      <DropdownButton
        overlayClassName="className"
        overlayStyle={{ color: 'red' }}
        menu={{ items }}
        open
      />,
    );
    expect(container.querySelector('.ant-dropdown')?.classList).toContain('className');
    expect((container.querySelector('.ant-dropdown') as HTMLElement).style.color).toContain('red');
  });

  it('should support loading', () => {
    const items = [
      {
        label: 'foo',
        key: '1',
      },
    ];
    const { container } = render(<DropdownButton menu={{ items }} loading />);

    expect(container.querySelector('.ant-dropdown-button .ant-btn-loading')?.classList).toContain(
      'ant-btn',
    );
  });
  it('should console Error when `overlay` in props', () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<DropdownButton overlay={<div>test</div>} />);
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: Dropdown] `overlay` is deprecated. Please use `menu` instead.',
    );
    errSpy.mockRestore();
  });
  it('should not console Error when `overlay` not in props', () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<DropdownButton />);
    expect(errSpy).not.toHaveBeenCalled();
    errSpy.mockRestore();
  });

  it('should support dropdownRender', () => {
    const dropdownRender = jest.fn((menu) => <div>Custom Menu {menu}</div>);
    render(<DropdownButton open dropdownRender={dropdownRender} />);
    expect(dropdownRender).toHaveBeenCalled();
  });

  it('should support focus menu when set autoFocus', async () => {
    jest.useFakeTimers();
    const items = [
      {
        label: 'foo',
        key: '1',
      },
    ];
    const { container } = render(<DropdownButton open autoFocus menu={{ items }} />);
    await waitFakeTimer();
    expect(container.querySelector('.ant-dropdown-menu-item-active')).toBeTruthy();
  });
});
