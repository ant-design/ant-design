import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, fireEvent } from '../../../tests/utils';
import Select from '..';
import Icon from '../../icon';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

const { Option } = Select;

describe('Select', () => {
  focusTest(Select, { refFocus: true });
  mountTest(Select);
  rtlTest(Select);

  function toggleOpen(container) {
    act(() => {
      fireEvent.mouseDown(container.querySelector('.ant-select-selector'));
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
    const { container } = render(<Select mode={Select.SECRET_COMBOBOX_MODE_DO_NOT_USE} />);
    toggleOpen(container);
    expect(container.querySelector('.ant-empty')).toBeFalsy();
  });

  it('should not have notFoundContent when mode is combobox and notFoundContent is set', () => {
    const { container } = render(
      <Select mode={Select.SECRET_COMBOBOX_MODE_DO_NOT_USE} notFoundContent="not at all" />,
    );
    toggleOpen(container);
    expect(container.querySelector('.ant-select-item-option')).toBeFalsy();
    expect(container.querySelector('.ant-select-item-empty')).toHaveTextContent('not at all');
  });

  it('should be controlled by open prop', () => {
    const onDropdownVisibleChange = jest.fn();
    const { container, rerender } = render(
      <Select open onDropdownVisibleChange={onDropdownVisibleChange}>
        <Option value="1">1</Option>
      </Select>,
    );
    expect(container.querySelectorAll('.ant-select-dropdown').length).toBe(1);
    toggleOpen(container);
    expect(onDropdownVisibleChange).toHaveBeenLastCalledWith(false);
    expect(container.querySelectorAll('.ant-select-dropdown').length).toBe(1);

    rerender(
      <Select open={false} onDropdownVisibleChange={onDropdownVisibleChange}>
        <Option value="1">1</Option>
      </Select>,
    );
    expect(container.querySelectorAll('.ant-select-dropdown').length).toBe(1); // FIXME

    toggleOpen(container);
    expect(onDropdownVisibleChange).toHaveBeenLastCalledWith(true);
    expect(container.querySelectorAll('.ant-select-dropdown').length).toBe(1);
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
  //
  describe('Select Custom Icons', () => {
    it('should support customized icons', () => {
      const { rerender, asFragment } = render(
        <Select
          removeIcon={<Icon type="close" />}
          clearIcon={<Icon type="close" />}
          menuItemSelectedIcon={<Icon type="close" />}
        >
          <Option value="1">1</Option>
        </Select>,
      );
      rerender(
        <Select
          count={10}
          removeIcon={<Icon type="close" />}
          clearIcon={<Icon type="close" />}
          menuItemSelectedIcon={<Icon type="close" />}
        >
          <Option value="1">1</Option>
        </Select>,
      );
      jest.runAllTimers();
      expect(asFragment().firstChild).toMatchSnapshot();
    });
  });

  describe('Deprecated', () => {
    it('should ignore mode="combobox"', () => {
      const { asFragment } = render(
        <Select mode="combobox">
          <Option value="1">1</Option>
        </Select>,
      );
      expect(asFragment().firstChild).toMatchSnapshot();
    });
  });
});
