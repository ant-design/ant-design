import type { OptionFC } from 'rc-select/lib/Option';
import React from 'react';
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
    const CustomSelect: React.FC<{ className?: string }> & { Option: OptionFC } = ({
      className,
      ...props
    }) => <Select className={`${className} custom-select`} {...props} />;

    CustomSelect.Option = Select.Option;

    const { container } = render(
      <Pagination defaultCurrent={1} total={500} selectComponentClass={CustomSelect} />,
    );
    expect(container.querySelectorAll('.custom-select').length).toBeTruthy();
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
});
