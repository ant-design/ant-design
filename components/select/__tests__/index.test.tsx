import { CloseOutlined } from '@ant-design/icons';
import React from 'react';
import type { SelectProps } from '..';
import Select from '..';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { act, fireEvent, render } from '../../../tests/utils';
import { resetWarned } from '../../_util/warning';

const { Option } = Select;

describe('Select', () => {
  focusTest(Select, { refFocus: true });
  mountTest(Select);
  rtlTest(Select);

  function toggleOpen(container: ReturnType<typeof render>['container']): void {
    fireEvent.mouseDown(container.querySelector('.ant-select-selector')!);
    act(() => {
      jest.runAllTimers();
    });
  }

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should have default notFoundContent', () => {
    const { container } = render(<Select mode="multiple" />);
    toggleOpen(container);
    expect(container.querySelectorAll('.ant-select-item-option').length).toBe(0);
    expect(container.querySelectorAll('.ant-empty').length).toBeTruthy();
  });

  it('should support set notFoundContent to null', () => {
    const { container } = render(<Select mode="multiple" notFoundContent={null} />);
    toggleOpen(container);
    expect(container.querySelectorAll('.ant-empty').length).toBe(0);
  });

  it('should not have default notFoundContent when mode is combobox', () => {
    const { container } = render(
      <Select mode={Select.SECRET_COMBOBOX_MODE_DO_NOT_USE as SelectProps['mode']} />,
    );
    toggleOpen(container);
    expect(container.querySelector('.ant-empty')).toBeFalsy();
  });

  it('should not have notFoundContent when mode is combobox and notFoundContent is set', () => {
    const { container } = render(
      <Select
        mode={Select.SECRET_COMBOBOX_MODE_DO_NOT_USE as SelectProps['mode']}
        notFoundContent="not at all"
      />,
    );
    toggleOpen(container);
    expect(container.querySelector('.ant-select-item-option')).toBeFalsy();
    expect(container.querySelector('.ant-select-item-empty')).toHaveTextContent('not at all');
  });

  it('should be controlled by open prop', () => {
    const onDropdownVisibleChange = jest.fn();
    const TestComponent: React.FC = () => {
      const [open, setOpen] = React.useState(false);
      const handleChange: SelectProps['onDropdownVisibleChange'] = (value) => {
        onDropdownVisibleChange(value);
        setOpen(value);
      };
      return (
        <Select open={open} onDropdownVisibleChange={handleChange}>
          <Option value="1">1</Option>
        </Select>
      );
    };
    const { container } = render(<TestComponent />);
    expect(container.querySelector('.ant-select-dropdown')).toBeFalsy();
    toggleOpen(container);
    expect(container.querySelectorAll('.ant-select-dropdown').length).toBe(1);
    expect(onDropdownVisibleChange).toHaveBeenLastCalledWith(true);
  });

  it('should show search icon when showSearch and open', () => {
    jest.useFakeTimers();
    const { container } = render(
      <Select showSearch>
        <Option value="1">1</Option>
      </Select>,
    );
    expect(container.querySelectorAll('.anticon-down').length).toBe(1);
    expect(container.querySelectorAll('.anticon-search').length).toBe(0);
    toggleOpen(container);
    expect(container.querySelectorAll('.anticon-down').length).toBe(0);
    expect(container.querySelectorAll('.anticon-search').length).toBe(1);
  });

  describe('Select Custom Icons', () => {
    it('should support customized icons', () => {
      const { rerender, asFragment } = render(
        <Select
          removeIcon={<CloseOutlined />}
          clearIcon={<CloseOutlined />}
          menuItemSelectedIcon={<CloseOutlined />}
        >
          <Option value="1">1</Option>
        </Select>,
      );
      rerender(
        <Select
          removeIcon={<CloseOutlined />}
          clearIcon={<CloseOutlined />}
          menuItemSelectedIcon={<CloseOutlined />}
        >
          <Option value="1">1</Option>
        </Select>,
      );
      act(() => {
        jest.runAllTimers();
      });
      expect(asFragment().firstChild).toMatchSnapshot();
    });
  });

  describe('Deprecated', () => {
    it('should ignore mode="combobox"', () => {
      const { asFragment } = render(
        <Select mode={'combobox' as SelectProps['mode']}>
          <Option value="1">1</Option>
        </Select>,
      );
      expect(asFragment().firstChild).toMatchSnapshot();
    });

    it('dropdownClassName', () => {
      resetWarned();

      const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const { container } = render(<Select dropdownClassName="legacy" open />);
      expect(errSpy).toHaveBeenCalledWith(
        'Warning: [antd: Select] `dropdownClassName` is deprecated. Please use `popupClassName` instead.',
      );
      expect(container.querySelector('.legacy')).toBeTruthy();

      errSpy.mockRestore();
    });

    it('warning for legacy dropdownMatchSelectWidth', () => {
      resetWarned();

      const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      render(<Select dropdownMatchSelectWidth open />);
      expect(errSpy).toHaveBeenCalledWith(
        'Warning: [antd: Select] `dropdownMatchSelectWidth` is deprecated. Please use `popupMatchSelectWidth` instead.',
      );

      errSpy.mockRestore();
    });

    it('deprecate showArrow', () => {
      resetWarned();

      const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const { container } = render(<Select showArrow />);
      expect(errSpy).toHaveBeenCalledWith(
        'Warning: [antd: Select] `showArrow` is deprecated which will be removed in next major version. It will be a default behavior, you can hide it by setting `suffixIcon` to null.',
      );
      expect(container.querySelector('.ant-select-show-arrow')).toBeTruthy();

      errSpy.mockRestore();
    });
  });
});
