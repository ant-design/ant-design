import { fireEvent, render, waitFor } from '@testing-library/react';
import type { DefaultRecordType } from 'rc-table/lib/interface';
import React, { useCallback, useEffect, useState } from 'react';
import type { SelectAllLabel, TransferProps } from '..';
import Transfer from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import Button from '../../button';

const listCommonProps: {
  dataSource: { key: string; title: string; disabled?: boolean }[];
  selectedKeys?: string[];
  targetKeys?: string[];
} = {
  dataSource: [
    { key: 'a', title: 'a' },
    { key: 'b', title: 'b' },
    { key: 'c', title: 'c', disabled: true },
  ],
  selectedKeys: ['a'],
  targetKeys: ['b'],
};

const listDisabledProps = {
  dataSource: [
    { key: 'a', title: 'a', disabled: true },
    { key: 'b', title: 'b' },
  ],
  selectedKeys: ['a', 'b'],
  targetKeys: [],
};

const searchTransferProps = {
  dataSource: [
    {
      key: '0',
      title: 'content1',
      description: 'description of content1',
      chosen: false,
    },
    {
      key: '1',
      title: 'content2',
      description: 'description of content2',
      chosen: false,
    },
    {
      key: '2',
      title: 'content3',
      description: 'description of content3',
      chosen: false,
    },
    {
      key: '3',
      title: 'content4',
      description: 'description of content4',
      chosen: false,
    },
    {
      key: '4',
      title: 'content5',
      description: 'description of content5',
      chosen: false,
    },
    {
      key: '5',
      title: 'content6',
      description: 'description of content6',
      chosen: false,
    },
  ],
  selectedKeys: [],
  targetKeys: ['3', '4'],
};

describe('Transfer', () => {
  mountTest(Transfer);
  rtlTest(Transfer);

  it('should render correctly', () => {
    const wrapper = render(<Transfer {...listCommonProps} />);
    expect(wrapper.container.firstChild).toMatchSnapshot();
  });

  it('should move selected keys to corresponding list', () => {
    const handleChange = jest.fn();
    const { container } = render(<Transfer {...listCommonProps} onChange={handleChange} />);
    fireEvent.click(container.querySelector('.ant-transfer-operation')?.querySelector('button')!); // move selected keys to right list
    expect(handleChange).toHaveBeenCalledWith(['a', 'b'], 'right', ['a']);
  });

  it('should move selected keys to left list', () => {
    const handleChange = jest.fn();
    const { container } = render(
      <Transfer
        {...listCommonProps}
        selectedKeys={['a']}
        targetKeys={['a']}
        onChange={handleChange}
      />,
    );
    fireEvent.click(
      container.querySelector('.ant-transfer-operation')?.querySelectorAll('button')?.[1]!,
    ); // move selected keys to left list
    expect(handleChange).toHaveBeenCalledWith([], 'left', ['a']);
  });

  it('should move selected keys expect disabled to corresponding list', () => {
    const handleChange = jest.fn();
    const { container } = render(<Transfer {...listDisabledProps} onChange={handleChange} />);
    fireEvent.click(container.querySelector('.ant-transfer-operation')?.querySelector('button')!); // move selected keys to right list
    expect(handleChange).toHaveBeenCalledWith(['b'], 'right', ['b']);
  });

  it('should uncheck checkbox when click on checked item', () => {
    const handleSelectChange = jest.fn();
    const { getByTitle } = render(
      <Transfer
        {...listCommonProps}
        onSelectChange={handleSelectChange}
        render={(item) => item.title}
      />,
    );
    getByTitle('a').click();
    expect(handleSelectChange).toHaveBeenLastCalledWith([], []);
  });

  it('should check checkbox when click on unchecked item', () => {
    const handleSelectChange = jest.fn();
    const { getByText } = render(
      <Transfer
        {...listCommonProps}
        onSelectChange={handleSelectChange}
        render={(item) => item.title}
      />,
    );
    getByText('b').click();
    expect(handleSelectChange).toHaveBeenLastCalledWith(['a'], ['b']);
  });

  it('should not check checkbox when component disabled', () => {
    const handleSelectChange = jest.fn();
    const { getByText } = render(
      <Transfer
        {...listCommonProps}
        disabled
        onSelectChange={handleSelectChange}
        render={(item) => item.title}
      />,
    );
    getByText('a').click();
    expect(handleSelectChange).not.toHaveBeenCalled();
  });

  it('should not check checkbox when click on disabled item', () => {
    const handleSelectChange = jest.fn();
    const { getByText } = render(
      <Transfer
        {...listCommonProps}
        onSelectChange={handleSelectChange}
        render={(item) => item.title}
      />,
    );

    getByText('c').click();
    expect(handleSelectChange).not.toHaveBeenCalled();
  });

  it('should check all item when click on check all', () => {
    const handleSelectChange = jest.fn();
    const { container } = render(
      <Transfer {...listCommonProps} onSelectChange={handleSelectChange} />,
    );

    fireEvent.click(
      container
        ?.querySelectorAll('.ant-transfer-list-header')
        ?.item(1)
        ?.querySelector('input[type="checkbox"]')!,
    );

    expect(handleSelectChange).toHaveBeenCalledWith(['a'], ['b']);
  });

  it('should uncheck all item when click on uncheck all', () => {
    const handleSelectChange = jest.fn();
    const { container } = render(
      <Transfer {...listCommonProps} onSelectChange={handleSelectChange} />,
    );

    fireEvent.click(
      container
        ?.querySelectorAll('.ant-transfer-list-header')
        ?.item(0)
        ?.querySelector('input[type="checkbox"]')!,
    );

    expect(handleSelectChange).toHaveBeenCalledWith([], []);
  });

  it('should call `filterOption` when use input in search box', () => {
    const filterOption: TransferProps<any>['filterOption'] = (inputValue, option) =>
      inputValue === option.title;
    const { container } = render(
      <Transfer
        {...listCommonProps}
        showSearch
        filterOption={filterOption}
        render={(item) => item.title}
      />,
    );

    fireEvent.change(
      container
        ?.querySelectorAll('.ant-transfer-list')
        ?.item(0)
        ?.querySelector('input[type="text"]')!,
      { target: { value: 'a' } },
    );

    expect(
      container
        .querySelectorAll('.ant-transfer-list')
        .item(0)
        .querySelectorAll('.ant-transfer-list-content input[type="checkbox"]'),
    ).toHaveLength(1);
  });

  it('should display the correct count of items when filter by input', () => {
    const filterOption: TransferProps<any>['filterOption'] = (inputValue, option) =>
      option.description.includes(inputValue);
    const renderFunc: TransferProps<any>['render'] = (item) => item.title;
    const { container, getByText } = render(
      <Transfer
        {...searchTransferProps}
        showSearch
        filterOption={filterOption}
        render={renderFunc}
      />,
    );
    fireEvent.change(
      container
        ?.querySelectorAll('.ant-transfer-list')
        ?.item(0)
        ?.querySelector('input[type="text"]')!,
      { target: { value: 'content2' } },
    );

    expect(getByText('1 item')).toBeTruthy();
  });

  it('should display the correct locale', () => {
    const emptyProps = { dataSource: [], selectedKeys: [], targetKeys: [] };
    const locale = { itemUnit: 'Person', notFoundContent: 'Nothing', searchPlaceholder: 'Search' };
    const { getAllByText, getAllByPlaceholderText } = render(
      <Transfer {...listCommonProps} {...emptyProps} showSearch locale={locale} />,
    );

    expect(getAllByText('0 Person')).toHaveLength(2);

    expect(getAllByPlaceholderText('Search')).toHaveLength(2);

    expect(getAllByText('Nothing')).toHaveLength(2);
  });

  it('should display the correct locale and ignore old API', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const emptyProps = { dataSource: [], selectedKeys: [], targetKeys: [] };
    const locale = { notFoundContent: 'old1', searchPlaceholder: 'old2' };
    const newLocalProp = { notFoundContent: 'new1', searchPlaceholder: 'new2' };
    const { getAllByPlaceholderText, getAllByText } = render(
      <Transfer
        {...listCommonProps}
        {...emptyProps}
        {...locale}
        locale={newLocalProp}
        showSearch
      />,
    );

    expect(getAllByPlaceholderText('new2')).toHaveLength(2);

    expect(getAllByText('new1')).toHaveLength(2);

    expect(consoleErrorSpy).not.toHaveBeenCalledWith(
      'Warning: [antd: Transfer] `notFoundContent` and `searchPlaceholder` will be removed, please use `locale` instead.',
    );
    consoleErrorSpy.mockRestore();
  });

  it('should display the correct items unit', () => {
    const { getByText } = render(
      <Transfer {...listCommonProps} locale={{ itemsUnit: 'People' }} />,
    );

    expect(getByText('1/2 People')).toBeTruthy();
  });

  it('should display the correct notFoundContent', () => {
    const { getByText } = render(
      <Transfer dataSource={[]} locale={{ notFoundContent: ['No Source', 'No Target'] }} />,
    );

    expect(getByText('No Source')).toBeTruthy();
    expect(getByText('No Target')).toBeTruthy();
  });

  it('should just check the filtered item when click on check all after search by input', () => {
    const filterOption: TransferProps<any>['filterOption'] = (inputValue, option) =>
      option.description.includes(inputValue);
    const renderFunc: TransferProps<any>['render'] = (item) => item.title;
    const handleSelectChange = jest.fn();
    const { container, getByTitle } = render(
      <Transfer
        {...searchTransferProps}
        showSearch
        filterOption={filterOption}
        render={renderFunc}
        onSelectChange={handleSelectChange}
      />,
    );
    fireEvent.change(
      container
        ?.querySelectorAll('.ant-transfer-list')
        ?.item(0)
        ?.querySelector('input[type="text"]')!,
      { target: { value: 'content2' } },
    );
    getByTitle('content2').click();
    expect(handleSelectChange).toHaveBeenCalledWith(['1'], []);
  });

  it('should transfer just the filtered item after search by input', () => {
    const filterOption: TransferProps<any>['filterOption'] = (inputValue, option) =>
      option.description.includes(inputValue);
    const renderFunc: TransferProps<any>['render'] = (item) => item.title;
    const handleChange = jest.fn();
    const TransferDemo = () => {
      const [selectedKeys, setSelectedKeys] = useState<string[]>(searchTransferProps.selectedKeys);
      const handleSelectChange: TransferProps<any>['onSelectChange'] = (
        sourceSelectedKeys,
        targetSelectedKeys,
      ) => {
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
      };

      return (
        <Transfer
          {...searchTransferProps}
          showSearch
          filterOption={filterOption}
          render={renderFunc}
          onSelectChange={handleSelectChange}
          onChange={handleChange}
          selectedKeys={selectedKeys}
        />
      );
    };
    const { container } = render(<TransferDemo />);
    fireEvent.change(
      container.querySelector('.ant-transfer-list-search')?.querySelector('input')!,
      { target: { value: 'content2' } },
    );
    fireEvent.click(
      container
        ?.querySelector('.ant-transfer-list')
        ?.querySelector('.ant-transfer-list-header input[type="checkbox"]')!,
    );
    fireEvent.click(container.querySelector('.ant-transfer-operation')?.querySelector('button')!);
    expect(handleChange).toHaveBeenCalledWith(['1', '3', '4'], 'right', ['1']);
  });

  it('should check correctly when there is a search text', () => {
    const newProps = { ...listCommonProps };
    delete newProps.targetKeys;
    delete newProps.selectedKeys;
    const handleSelectChange = jest.fn();
    const { container, getByText } = render(
      <Transfer
        {...newProps}
        showSearch
        onSelectChange={handleSelectChange}
        render={(item) => item.title}
      />,
    );

    getByText('b').click();
    expect(handleSelectChange).toHaveBeenLastCalledWith(['b'], []);

    fireEvent.change(
      container
        ?.querySelectorAll('.ant-transfer-list')
        ?.item(0)
        ?.querySelector('input[type="text"]')!,
      { target: { value: 'a' } },
    );
    fireEvent.click(
      container
        ?.querySelectorAll('.ant-transfer-list')
        ?.item(0)
        ?.querySelector('.ant-transfer-list-header input[type="checkbox"]')!,
    );

    expect(handleSelectChange).toHaveBeenLastCalledWith(['b', 'a'], []);

    fireEvent.click(
      container
        ?.querySelectorAll('.ant-transfer-list')
        ?.item(0)
        ?.querySelector('.ant-transfer-list-header input[type="checkbox"]')!,
    );

    expect(handleSelectChange).toHaveBeenLastCalledWith(['b'], []);
  });

  it('should show sorted targetKey', () => {
    const sortedTargetKeyProps = {
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
        },
      ],
      targetKeys: ['c', 'b'],
      lazy: false,
    };
    const { container } = render(
      <Transfer {...sortedTargetKeyProps} render={(item) => item.title} />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should add custom styles when their props are provided', () => {
    const style = {
      backgroundColor: 'red',
    };
    const leftStyle = {
      backgroundColor: 'blue',
    };
    const rightStyle = {
      backgroundColor: 'red',
    };
    const operationStyle = {
      backgroundColor: 'yellow',
    };

    const { container } = render(
      <Transfer
        {...listCommonProps}
        style={style}
        listStyle={({ direction }) => (direction === 'left' ? leftStyle : rightStyle)}
        operationStyle={operationStyle}
      />,
    );

    const wrapper = container.querySelector<HTMLDivElement>('.ant-transfer');
    const listSource = container.querySelectorAll<HTMLDivElement>('.ant-transfer-list').item(0);
    const listTarget = container.querySelectorAll<HTMLDivElement>('.ant-transfer-list').item(1);
    const operation = container.querySelectorAll<HTMLDivElement>('.ant-transfer-operation').item(0);

    expect(wrapper?.style.backgroundColor).toEqual('red');
    expect(listSource.style.backgroundColor).toEqual('blue');
    expect(listTarget.style.backgroundColor).toEqual('red');
    expect(operation.style.backgroundColor).toEqual('yellow');
  });

  it('should support onScroll', () => {
    const onScroll = jest.fn();
    const { container } = render(<Transfer {...listCommonProps} onScroll={onScroll} />);

    fireEvent.scroll(
      container
        .querySelectorAll('.ant-transfer-list')
        .item(0)
        .querySelectorAll('.ant-transfer-list-content')
        .item(0),
    );
    expect(onScroll).toHaveBeenLastCalledWith('left', expect.anything());

    fireEvent.scroll(
      container
        .querySelectorAll('.ant-transfer-list')
        .item(1)
        .querySelectorAll('.ant-transfer-list-content')
        .item(0),
    );
    expect(onScroll).toHaveBeenLastCalledWith('right', expect.anything());
  });

  it('support rowKey', () => {
    const onSelectChange = jest.fn();

    const Demo = () => {
      const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

      return (
        <Transfer
          {...listCommonProps}
          selectedKeys={selectedKeys}
          rowKey={(record) => `key_${record.key}`}
          onSelectChange={(keys) => {
            onSelectChange(keys);
            setSelectedKeys(keys);
          }}
        />
      );
    };

    const { container } = render(<Demo />);

    fireEvent.click(container.querySelector('.ant-transfer-list-content input')!);
    expect(onSelectChange).toHaveBeenCalledWith(['key_a']);
    expect(
      container.querySelector<HTMLInputElement>('.ant-transfer-list-content input')!.checked,
    ).toBeTruthy();
  });

  it('should support render value and label in item', () => {
    const { container } = render(
      <Transfer
        dataSource={[{ key: 'a', title: 'title' }]}
        render={(record) => ({
          value: `${record.title} value`,
          label: 'label' as unknown as React.ReactElement,
        })}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render correct checkbox label when checkboxLabel is defined', () => {
    const selectAllLabels = ['Checkbox Label'];
    const { getByText } = render(
      <Transfer {...listCommonProps} selectAllLabels={selectAllLabels} />,
    );
    expect(getByText('Checkbox Label')).toBeTruthy();
  });

  it('should render correct checkbox label when checkboxLabel is a function', () => {
    const selectAllLabels: SelectAllLabel[] = [
      ({ selectedCount, totalCount }) => (
        <span>
          {selectedCount} of {totalCount}
        </span>
      ),
    ];
    const { getByText } = render(
      <Transfer {...listCommonProps} selectAllLabels={selectAllLabels} />,
    );

    expect(getByText('1 of 2')).toBeTruthy();
  });

  describe('pagination', () => {
    it('boolean', async () => {
      const { getByTitle } = render(<Transfer {...listDisabledProps} pagination />);
      await waitFor(() => getByTitle('1/1'));
    });

    it('object', async () => {
      const { container, getByTitle } = render(
        <Transfer {...listDisabledProps} pagination={{ pageSize: 1 }} />,
      );
      expect(
        container
          .querySelectorAll('.ant-transfer-list')
          .item(0)
          .querySelectorAll('.ant-transfer-list-content-item'),
      ).toHaveLength(1);
      await waitFor(() => getByTitle('1/2'));
    });

    it('not exceed max size', async () => {
      const { container, getByTitle, getAllByTitle, rerender } = render(
        <Transfer {...listDisabledProps} pagination={{ pageSize: 1 }} />,
      );
      fireEvent.click(container.querySelector('.ant-pagination-next .ant-pagination-item-link')!);

      await waitFor(() => getByTitle('2/2'));

      rerender(
        <Transfer
          {...{ ...listDisabledProps, targetKeys: ['b', 'c'] }}
          pagination={{ pageSize: 1 }}
        />,
      );
      await waitFor(() => expect(getAllByTitle('1/1')).toHaveLength(2));
    });
  });

  it('remove by click icon', () => {
    const onChange = jest.fn();
    const { container } = render(<Transfer {...listCommonProps} onChange={onChange} oneWay />);
    fireEvent.click(container.querySelectorAll('.ant-transfer-list-content-item-remove')[0]);
    expect(onChange).toHaveBeenCalledWith([], 'left', ['b']);
  });

  it('control mode select all should not throw warning', () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const App = () => {
      const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

      const onSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
      };

      return (
        <Transfer
          dataSource={[
            {
              key: 'a',
              title: 'a',
            },
          ]}
          selectedKeys={selectedKeys}
          onSelectChange={onSelectChange}
        />
      );
    };

    const { container } = render(<App />);

    fireEvent.click(container.querySelector('.ant-transfer-list-header input[type="checkbox"]')!);

    expect(errSpy).not.toHaveBeenCalled();

    errSpy.mockRestore();
  });
});

describe('immutable data', () => {
  // https://github.com/ant-design/ant-design/issues/28662
  it('dataSource is frozen', () => {
    const mockData = [Object.freeze({ id: '0', title: `title`, description: `description` })];
    const { container } = render(<Transfer rowKey={(item) => item.id} dataSource={mockData} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('prevent error when reset data in some cases', () => {
    const App = () => {
      const [mockData, setMockData] = useState<DefaultRecordType[]>([]);
      const [targetKeys, setTargetKeys] = useState<string[]>([]);

      const getMock = () => {
        const tempTargetKeys = [];
        const tempMockData = [];
        for (let i = 0; i < 2; i++) {
          const data = {
            key: i.toString(),
            title: `content${i + 1}`,
            description: `description of content${i + 1}`,
            chosen: i % 2 === 0,
          };
          if (data.chosen) {
            tempTargetKeys.push(data.key);
          }
          tempMockData.push(data);
        }
        setMockData(tempMockData);
        setTargetKeys(tempTargetKeys);
      };

      useEffect(() => {
        getMock();
      }, []);

      const handleChange = (newTargetKeys: string[]) => {
        setTargetKeys(newTargetKeys);
      };

      const ButtonRender = useCallback(
        () => <Button onClick={getMock}>Right button reload</Button>,
        [getMock],
      );

      return (
        <Transfer
          dataSource={mockData}
          operations={['to right', 'to left']}
          targetKeys={targetKeys}
          onChange={handleChange}
          render={(item) => `test-${item}`}
          footer={ButtonRender}
        />
      );
    };

    const { container } = render(<App />);
    fireEvent.click(container.querySelector('.ant-transfer-list-header input[type="checkbox"]')!);
    fireEvent.click(container.querySelector('.ant-transfer-operation .ant-btn')!);
    expect(container.querySelectorAll('.ant-transfer-list')[1]).toBeTruthy();
    expect(
      container
        .querySelectorAll('.ant-transfer-list')[1]
        .querySelectorAll('.ant-transfer-list-content-item').length,
    ).toBe(2);

    fireEvent.click(
      container.querySelectorAll('.ant-transfer-list-header input[type="checkbox"]')![1],
    );
    expect(container.querySelectorAll('.ant-transfer-list-header-selected')[1]).toContainHTML(
      '2/2',
    );
    fireEvent.click(container.querySelector('.ant-transfer-list-footer .ant-btn')!);
    expect(container.querySelectorAll('.ant-transfer-list-header-selected')[1]).toContainHTML(
      '1/1',
    );
  });
});
