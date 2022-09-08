import React from 'react';
import { render } from '../../../tests/utils';
import List from '../list';

const listCommonProps = {
  prefixCls: 'ant-transfer-list',
  dataSource: [
    {
      key: 'a',
      title: 'a',
    },
    {
      key: 'b',
      title: 'b',
    },
    {
      key: 'c',
      title: 'c',
      disabled: true,
    },
  ],
  checkedKeys: ['a'],
  notFoundContent: 'Not Found',
};

describe('Transfer.List', () => {
  it('should render correctly', () => {
    const { container } = render(<List {...listCommonProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should check top Checkbox while all available items are checked', () => {
    const { container } = render(<List {...listCommonProps} checkedKeys={['a', 'b']} />);

    expect(
      container.querySelector('.ant-transfer-list-header input[type="checkbox"]').checked,
    ).toBeTruthy();
  });

  it('when component has been unmounted, componentWillUnmount should be called', () => {
    let instance;
    const wrapper = render(
      <List
        ref={node => {
          instance = node;
        }}
        {...listCommonProps}
      />,
    );
    const willUnmount = jest.spyOn(instance, 'componentWillUnmount');
    wrapper.unmount();
    expect(willUnmount).toHaveBeenCalled();
  });

  it('when value is not exists, handleFilter should return', () => {
    const handleFilter = jest.fn();
    let instance;
    render(
      <List
        ref={node => {
          instance = node;
        }}
        {...listCommonProps}
        handleFilter={handleFilter}
      />,
    );

    expect(instance.handleFilter({ target: 'test' })).toBe(undefined);
    expect(handleFilter).toHaveBeenCalled();
  });
});
