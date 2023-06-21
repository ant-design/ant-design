import { render as testLibRender } from '@testing-library/react';
import React from 'react';
import { fireEvent, render } from '../../../tests/utils';
import Transfer from '../index';
import Search from '../search';

describe('Transfer.Search', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  const dataSource = [
    {
      key: 'a',
      title: 'a',
      description: 'a',
    },
    {
      key: 'b',
      title: 'b',
      description: 'b',
    },
    {
      key: 'c',
      title: 'c',
      description: 'c',
    },
  ];

  afterEach(() => {
    errorSpy.mockReset();
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });

  it('should show cross icon when input value exists', () => {
    const { container, rerender } = render(<Search value="" />);
    expect(container.firstChild).toMatchSnapshot();
    rerender(<Search value="a" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('onSearch', () => {
    jest.useFakeTimers();

    const onSearch = jest.fn();
    const { container } = render(
      <Transfer
        dataSource={dataSource}
        selectedKeys={[]}
        targetKeys={[]}
        render={(item) => item.title}
        onSearch={onSearch}
        showSearch
      />,
    );
    fireEvent.change(container.querySelectorAll('.ant-input').item(0), { target: { value: 'a' } });

    expect(onSearch).toHaveBeenCalledWith('left', 'a');
    onSearch.mockReset();
    fireEvent.click(container.querySelectorAll('.ant-input-clear-icon').item(0));
    expect(onSearch).toHaveBeenCalledWith('left', '');
    jest.useRealTimers();
  });

  it('legacy props#onSearchChange does not work anymore', () => {
    const onSearchChange = jest.fn();
    const props = { onSearchChange };
    const { container } = render(<Transfer render={(item) => item.title!} {...props} showSearch />);
    fireEvent.change(container.querySelector('.ant-input')!, { target: { value: 'a' } });
    expect(errorSpy).not.toHaveBeenCalled();
    expect(onSearchChange).not.toHaveBeenCalled();
  });

  // https://github.com/ant-design/ant-design/issues/26208
  it('typing space should trigger filterOption', () => {
    const filterOption = jest.fn();

    // We use origin testing lib here since StrictMode will render multiple times
    const { container } = testLibRender(
      <Transfer filterOption={filterOption} dataSource={dataSource} showSearch />,
    );

    fireEvent.change(container.querySelector('.ant-input')!, { target: { value: ' ' } });

    expect(filterOption).toHaveBeenCalledTimes(dataSource.length);
  });
});
