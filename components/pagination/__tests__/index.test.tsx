import React from 'react';
import type { OptionFC } from '@rc-component/select/lib/Option';

import type { PaginationProps } from '..';
import Pagination from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import Select from '../../select';

describe('Pagination', () => {
  mountTest(Pagination);
  rtlTest(Pagination);

  it('should pass disabled to prev and next buttons', () => {
    const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
      if (type === 'prev') {
        return <button type="button">prev</button>;
      }
      if (type === 'next') {
        return <button type="button">next</button>;
      }
      return originalElement;
    };
    const { container } = render(
      <Pagination defaultCurrent={1} total={50} itemRender={itemRender} />,
    );
    expect(container.querySelector('button')?.disabled).toBe(true);
  });

  it('should automatically be small when size is not specified', async () => {
    const { container } = render(<Pagination responsive />);
    expect(container.querySelector('ul')?.className.includes('ant-pagination-mini')).toBe(true);
  });

  // https://github.com/ant-design/ant-design/issues/24913
  // https://github.com/ant-design/ant-design/issues/24501
  it('should onChange called when pageSize change', () => {
    const onChange = jest.fn();
    const onShowSizeChange = jest.fn();
    const { container } = render(
      <Pagination
        defaultCurrent={1}
        total={500}
        onChange={onChange}
        onShowSizeChange={onShowSizeChange}
      />,
    );

    fireEvent.mouseDown(container.querySelector('.ant-select-selector')!);

    expect(container.querySelectorAll('.ant-select-item-option').length).toBe(4);
    fireEvent.click(container.querySelectorAll('.ant-select-item-option')[1]);
    expect(onChange).toHaveBeenCalledWith(1, 20);
  });

  it('should support custom selectComponentClass', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const CustomSelect: React.FC<{ className?: string }> & { Option: OptionFC } = ({
      className,
      ...props
    }) => <Select className={`${className} custom-select`} {...props} />;

    CustomSelect.Option = Select.Option;

    const { container } = render(
      <Pagination defaultCurrent={1} total={500} selectComponentClass={CustomSelect} />,
    );
    expect(container.querySelectorAll('.custom-select').length).toBeTruthy();
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Pagination] `selectComponentClass` is not official api which will be removed.',
    );

    errorSpy.mockRestore();
  });

  describe('ConfigProvider', () => {
    it('should be rendered correctly in RTL', () => {
      const { asFragment } = render(
        <ConfigProvider direction="rtl">
          <Pagination defaultCurrent={1} total={50} />
        </ConfigProvider>,
      );
      expect(asFragment().firstChild).toMatchSnapshot();
    });

    it('should be rendered correctly when componentSize is large', () => {
      const { container, asFragment } = render(
        <ConfigProvider componentSize="large">
          <Pagination defaultCurrent={1} total={50} showSizeChanger />
        </ConfigProvider>,
      );
      expect(asFragment().firstChild).toMatchSnapshot();
      expect(container.querySelectorAll('.ant-select-lg').length).toBe(0);
    });
  });

  describe('should support align props', () => {
    it('should support align to start', () => {
      const { container } = render(<Pagination align="start" />);
      expect(container.querySelector('.ant-pagination-start')).toBeTruthy();
    });
    it('should support align to center', () => {
      const { container } = render(<Pagination align="center" />);
      expect(container.querySelector('.ant-pagination-center')).toBeTruthy();
    });
    it('should support align to end', () => {
      const { container } = render(<Pagination align="end" />);
      expect(container.querySelector('.ant-pagination-end')).toBeTruthy();
    });
  });

  it('showSizeChanger support showSearch=false', () => {
    const { container } = render(
      <Pagination
        defaultCurrent={1}
        total={500}
        showSizeChanger={{
          showSearch: false,
        }}
      />,
    );

    // Expect `input` is `readonly`
    expect(container.querySelector('.ant-select input')).toHaveAttribute('readonly');
  });
  it('support classNames and styles', () => {
    const customStyles = {
      root: { color: 'rgb(255, 0, 0)' },
      item: { color: 'rgb(0, 0, 255)' },
    };
    const customClassNames = {
      root: 'custom-root',
      item: 'custom-item',
    };
    const { container } = render(
      <Pagination
        styles={customStyles}
        classNames={customClassNames}
        defaultCurrent={1}
        total={500}
        showSizeChanger={{
          showSearch: false,
        }}
      />,
    );
    const root = container.querySelector('.ant-pagination');
    const item = container.querySelector('.ant-pagination-item');
    expect(root).toHaveClass('custom-root');
    expect(item).toHaveClass('custom-item');
    expect(root).toHaveStyle('color: rgb(255, 0, 0)');
    expect(item).toHaveStyle('color: rgb(0, 0, 255)');
  });

  it('support function classNames and styles', () => {
    const functionClassNames: PaginationProps['classNames'] = (info) => {
      const { props } = info;
      return {
        root: `dynamic-root-${props.size || 'default'}`,
        item: props.disabled ? 'disabled-item' : 'enabled-item',
      };
    };

    const functionStyles: PaginationProps['styles'] = (info) => {
      const { props } = info;
      return {
        root: {
          backgroundColor: props.size === 'small' ? '#e6f7ff' : '#f6ffed',
        },
        item: {
          color: props.disabled ? '#d9d9d9' : '#52c41a',
        },
      };
    };

    const { container, rerender } = render(
      <Pagination
        classNames={functionClassNames}
        styles={functionStyles}
        defaultCurrent={1}
        total={100}
        size="small"
      />,
    );

    const root = container.querySelector('.ant-pagination');
    const item = container.querySelector('.ant-pagination-item');
    expect(root).toHaveClass('dynamic-root-small');
    expect(item).toHaveClass('enabled-item');
    expect(root).toHaveStyle('background-color: rgb(230, 247, 255)');
    expect(item).toHaveStyle('color: rgb(82, 196, 26)');

    // Test disabled state
    rerender(
      <Pagination
        classNames={functionClassNames}
        styles={functionStyles}
        defaultCurrent={1}
        total={100}
        disabled
      />,
    );

    const disabledRoot = container.querySelector('.ant-pagination');
    const disabledItem = container.querySelector('.ant-pagination-item');
    expect(disabledRoot).toHaveClass('dynamic-root-default');
    expect(disabledItem).toHaveClass('disabled-item');
    expect(disabledRoot).toHaveStyle('background-color: rgb(246, 255, 237)');
    expect(disabledItem).toHaveStyle('color: rgb(217, 217, 217)');
  });
});
