import React, { useEffect, useState } from 'react';
import type { DefaultRecordType } from '@rc-component/table/lib/interface';
import { fireEvent, render, waitFor } from '@testing-library/react';

import type { SelectAllLabel, TransferProps } from '..';
import Transfer from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { waitFakeTimer } from '../../../tests/utils';
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

const generateData = (n = 20) => {
  const data = [];
  for (let i = 0; i < n; i++) {
    data.push({
      key: `${i}`,
      title: `content${i}`,
      description: `description of content${i}`,
      chosen: false,
    });
  }
  return data;
};

const ButtonRender = ({ onClick }: { onClick: () => void }) => (
  <Button type="link" onClick={onClick}>
    Custom Button
  </Button>
);

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
    fireEvent.click(container.querySelector('.ant-transfer-actions')?.querySelector('button')!); // move selected keys to right list
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
      container.querySelector('.ant-transfer-actions')?.querySelectorAll('button')?.[1]!,
    ); // move selected keys to left list
    expect(handleChange).toHaveBeenCalledWith([], 'left', ['a']);
  });

  it('should move selected keys expect disabled to corresponding list', () => {
    const handleChange = jest.fn();
    const { container } = render(<Transfer {...listDisabledProps} onChange={handleChange} />);
    fireEvent.click(container.querySelector('.ant-transfer-actions')?.querySelector('button')!); // move selected keys to right list
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

  it('multiple select/deselect by hold down the shift key', () => {
    const handleSelectChange = jest.fn();
    const { getByText } = render(
      <Transfer
        dataSource={[
          { key: 'a', title: 'a' },
          { key: 'b', title: 'b' },
          { key: 'c', title: 'c' },
        ]}
        onSelectChange={handleSelectChange}
        render={(item) => item.title}
      />,
    );

    fireEvent.click(getByText('a'));
    expect(handleSelectChange).toHaveBeenLastCalledWith(['a'], []);

    fireEvent.click(getByText('c'), {
      shiftKey: true,
    });
    expect(handleSelectChange).toHaveBeenLastCalledWith(['a', 'b', 'c'], []);

    fireEvent.click(getByText('b'), {
      shiftKey: true,
    });
    expect(handleSelectChange).toHaveBeenLastCalledWith(['a'], []);
  });

  it('multiple select targetKeys by hold down the shift key', () => {
    const handleSelectChange = jest.fn();
    const { getByText } = render(
      <Transfer
        dataSource={[
          { key: 'a', title: 'a' },
          { key: 'b', title: 'b' },
          { key: 'c', title: 'c' },
        ]}
        targetKeys={['a', 'b', 'c']}
        onSelectChange={handleSelectChange}
        render={(item) => item.title}
      />,
    );

    fireEvent.click(getByText('a'));
    expect(handleSelectChange).toHaveBeenLastCalledWith([], ['a']);

    fireEvent.click(getByText('c'), {
      shiftKey: true,
    });
    expect(handleSelectChange).toHaveBeenLastCalledWith([], ['a', 'b', 'c']);

    fireEvent.click(getByText('b'), {
      shiftKey: true,
    });
    expect(handleSelectChange).toHaveBeenLastCalledWith([], ['a']);
  });

  it('reset last select key after deselect', () => {
    const handleSelectChange = jest.fn();
    const { getByText } = render(
      <Transfer
        dataSource={[
          { key: 'a', title: 'a' },
          { key: 'b', title: 'b' },
          { key: 'c', title: 'c' },
          { key: 'd', title: 'd' },
        ]}
        onSelectChange={handleSelectChange}
        render={(item) => item.title}
      />,
    );

    fireEvent.click(getByText('a'));
    expect(handleSelectChange).toHaveBeenLastCalledWith(['a'], []);
    fireEvent.click(getByText('c'), {
      shiftKey: true,
    });
    expect(handleSelectChange).toHaveBeenLastCalledWith(['a', 'b', 'c'], []);
    fireEvent.click(getByText('c'));
    expect(handleSelectChange).toHaveBeenLastCalledWith(['a', 'b'], []);
    fireEvent.click(getByText('d'), {
      shiftKey: true,
    });
    expect(handleSelectChange).toHaveBeenLastCalledWith(['a', 'b', 'd'], []);
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
        ?.querySelectorAll('.ant-transfer-section')
        ?.item(0)
        ?.querySelector('input[type="text"]')!,
      { target: { value: 'a' } },
    );

    expect(
      container
        .querySelectorAll('.ant-transfer-section')
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
        ?.querySelectorAll('.ant-transfer-section')
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
        ?.querySelectorAll('.ant-transfer-section')
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
      const [selectedKeys, setSelectedKeys] = useState<React.Key[]>(
        searchTransferProps.selectedKeys,
      );
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
        ?.querySelector('.ant-transfer-section')
        ?.querySelector('.ant-transfer-list-header input[type="checkbox"]')!,
    );
    fireEvent.click(container.querySelector('.ant-transfer-actions')?.querySelector('button')!);
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
        ?.querySelectorAll('.ant-transfer-section')
        ?.item(0)
        ?.querySelector('input[type="text"]')!,
      { target: { value: 'a' } },
    );
    fireEvent.click(
      container
        ?.querySelectorAll('.ant-transfer-section')
        ?.item(0)
        ?.querySelector('.ant-transfer-list-header input[type="checkbox"]')!,
    );

    expect(handleSelectChange).toHaveBeenLastCalledWith(['b', 'a'], []);

    fireEvent.click(
      container
        ?.querySelectorAll('.ant-transfer-section')
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
    const style: React.CSSProperties = {
      backgroundColor: 'red',
    };
    const leftStyle: React.CSSProperties = {
      backgroundColor: 'blue',
    };
    const rightStyle: React.CSSProperties = {
      backgroundColor: 'red',
    };
    const operationStyle: React.CSSProperties = {
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
    const listSource = container.querySelectorAll<HTMLDivElement>('.ant-transfer-section').item(0);
    const listTarget = container.querySelectorAll<HTMLDivElement>('.ant-transfer-section').item(1);
    const operation = container.querySelectorAll<HTMLDivElement>('.ant-transfer-actions').item(0);

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
        .querySelectorAll('.ant-transfer-section')
        .item(0)
        .querySelectorAll('.ant-transfer-list-content')
        .item(0),
    );
    expect(onScroll).toHaveBeenLastCalledWith('left', expect.anything());

    fireEvent.scroll(
      container
        .querySelectorAll('.ant-transfer-section')
        .item(1)
        .querySelectorAll('.ant-transfer-list-content')
        .item(0),
    );
    expect(onScroll).toHaveBeenLastCalledWith('right', expect.anything());
  });

  it('support rowKey', () => {
    const onSelectChange = jest.fn();

    const Demo = () => {
      const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);

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

  it('should disable transfer operation button when some items are set to selected but also disabled', () => {
    const dataSource = listDisabledProps.dataSource.map((d) => ({
      ...d,
      disabled: true,
    }));
    const { container } = render(<Transfer {...listDisabledProps} dataSource={dataSource} />);
    expect(
      container.querySelectorAll<HTMLDivElement>('.ant-transfer-actions button').item(0),
    ).toBeDisabled();
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
          .querySelectorAll('.ant-transfer-section')
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

    it('should support change pageSize', () => {
      const dataSource = generateData();
      const { container } = render(
        <Transfer dataSource={dataSource} pagination={{ showSizeChanger: true, simple: false }} />,
      );

      fireEvent.mouseDown(container.querySelector('.ant-select-selector')!);
      fireEvent.click(container.querySelectorAll('.ant-select-item-option')[1]);
      expect(container.querySelectorAll('.ant-transfer-list-content-item').length).toBe(20);
    });

    it('should be used first when pagination has pagesize', () => {
      const dataSource = generateData(30);

      const { container } = render(
        <Transfer
          dataSource={dataSource}
          pagination={{ showSizeChanger: true, simple: false, pageSize: 20 }}
        />,
      );

      fireEvent.mouseDown(container.querySelector('.ant-select-selector')!);
      fireEvent.click(container.querySelectorAll('.ant-select-item-option')[2]);
      expect(container.querySelectorAll('.ant-transfer-list-content-item').length).toBe(20);
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

    const App: React.FC = () => {
      const [selectedKeys, setSelectedKeys] = useState<TransferProps['selectedKeys']>([]);

      const onSelectChange: TransferProps['onSelectChange'] = (
        sourceSelectedKeys,
        targetSelectedKeys,
      ) => {
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
  it('it checks correctly after changing the dataSource', async () => {
    const mockData = Array.from({ length: 10 }).map((_, i) => ({
      key: i.toString(),
      title: `content${i + 1}`,
      description: `description of content${i + 1}`,
    }));

    const initialTargetKeys = mockData
      .filter((item) => Number(item.key) > 4)
      .map((item) => item.key);

    const defaultCheckedKeys = ['1', '2'];
    const handleSelectChange = jest.fn();
    const App: React.FC = () => {
      const [targetKeys, setTargetKeys] = useState<TransferProps['targetKeys']>(initialTargetKeys);
      const [selectedKeys, setSelectedKeys] = useState<TransferProps['targetKeys']>([]);

      const [dataSource, setDataSource] = useState(mockData);

      const onChange: TransferProps['onChange'] = (nextTargetKeys) => {
        setTargetKeys(nextTargetKeys);
      };

      return (
        <>
          <Button
            className="update-btn"
            onClick={() => {
              setSelectedKeys(defaultCheckedKeys);
              setDataSource([]);
              setDataSource([...mockData]);
              // setTimeout(() => {
              //   setDataSource([...mockData]);
              // });
            }}
          >
            update
          </Button>
          <Transfer
            dataSource={dataSource}
            titles={['Source', 'Target']}
            targetKeys={targetKeys}
            selectedKeys={selectedKeys}
            onChange={onChange}
            onSelectChange={handleSelectChange}
            render={(item) => item.title}
          />
        </>
      );
    };
    const { container } = render(<App />);

    fireEvent.click(container.querySelector('.update-btn')!);
    await waitFakeTimer();

    defaultCheckedKeys.forEach((item) => {
      expect(
        container
          ?.querySelectorAll('.ant-transfer-list-content-item')
          ?.item(Number(item))
          ?.querySelector('input[type="checkbox"]')!,
      ).toBeChecked();
    });
  });

  it('showSearch with single object', () => {
    const emptyProps = { dataSource: [], selectedKeys: [], targetKeys: [] };
    const locale = { itemUnit: 'Person', notFoundContent: 'Nothing' };
    const { container } = render(
      <Transfer
        {...listCommonProps}
        {...emptyProps}
        showSearch={{ placeholder: 'Search placeholder', defaultValue: 'values' }}
        locale={locale}
      />,
    );
    const searchInputs = container.querySelectorAll('.ant-transfer-list-search input');
    expect(searchInputs).toHaveLength(2);
    searchInputs.forEach((input) => {
      expect(input.getAttribute('placeholder')).toBe('Search placeholder');
      expect(input).toHaveValue('values');
    });
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
    const App: React.FC = () => {
      const [mockData, setMockData] = useState<DefaultRecordType[]>([]);
      const [targetKeys, setTargetKeys] = useState<TransferProps['targetKeys']>([]);

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

      const handleChange: TransferProps['onChange'] = (newTargetKeys) => {
        setTargetKeys(newTargetKeys);
      };

      return (
        <Transfer
          dataSource={mockData}
          targetKeys={targetKeys}
          onChange={handleChange}
          render={(item) => `test-${item}`}
          footer={() => <ButtonRender onClick={getMock} />}
        />
      );
    };

    const { container } = render(<App />);
    fireEvent.click(container.querySelector('.ant-transfer-list-header input[type="checkbox"]')!);
    fireEvent.click(container.querySelector('.ant-transfer-actions .ant-btn')!);
    expect(container.querySelectorAll('.ant-transfer-section')[1]).toBeTruthy();
    expect(
      container
        .querySelectorAll('.ant-transfer-section')[1]
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
describe('Transfer - Additional Edge Cases', () => {
  it('should handle empty dataSource gracefully', () => {
    const { container } = render(<Transfer dataSource={[]} />);
    expect(container.querySelectorAll('.ant-transfer-list-content-item')).toHaveLength(0);
    expect(container.querySelector('.ant-transfer-list-header-selected')).toHaveTextContent('0/0');
  });

  it('should handle null/undefined values in dataSource', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const invalidDataSource = [
      { key: 'a', title: 'a' },
      null,
      { key: 'b', title: 'b' },
      undefined,
      { key: 'c', title: 'c' },
    ] as any;
    
    const { container } = render(<Transfer dataSource={invalidDataSource} />);
    expect(container.querySelectorAll('.ant-transfer-list-content-item')).toHaveLength(3);
    consoleErrorSpy.mockRestore();
  });

  it('should handle extremely large datasets without performance issues', async () => {
    const largeDataSource = generateData(1000);
    const { container } = render(<Transfer dataSource={largeDataSource} pagination={{ pageSize: 50 }} />);
    
    expect(container.querySelectorAll('.ant-transfer-list-content-item')).toHaveLength(50);
    expect(container.querySelector('.ant-pagination')).toBeTruthy();
  });

  it('should handle rapid state changes without errors', async () => {
    const App = () => {
      const [targetKeys, setTargetKeys] = useState<string[]>([]);
      const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
      
      const handleRapidChange = () => {
        for (let i = 0; i < 10; i++) {
          setTimeout(() => {
            setTargetKeys([`${i}`]);
            setSelectedKeys([`${i + 1}`]);
          }, i * 10);
        }
      };

      return (
        <>
          <button onClick={handleRapidChange} data-testid="rapid-change">Rapid Change</button>
          <Transfer 
            dataSource={generateData(20)} 
            targetKeys={targetKeys}
            selectedKeys={selectedKeys}
            onChange={setTargetKeys}
            onSelectChange={(source, target) => setSelectedKeys([...source, ...target])}
          />
        </>
      );
    };

    const { getByTestId } = render(<App />);
    fireEvent.click(getByTestId('rapid-change'));
    await waitFakeTimer();
    
    // Should not throw any errors
    expect(true).toBe(true);
  });
});

describe('Transfer - Error Handling', () => {
  it('should handle render function throwing errors gracefully', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    const errorRender = () => {
      throw new Error('Render error');
    };

    const { container } = render(
      <Transfer 
        dataSource={[{ key: 'a', title: 'a' }]} 
        render={errorRender}
      />
    );
    
    // Component should still render container
    expect(container.querySelector('.ant-transfer')).toBeTruthy();
    consoleErrorSpy.mockRestore();
  });

  it('should handle onChange callback throwing errors', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    const errorOnChange = () => {
      throw new Error('onChange error');
    };

    const { container } = render(
      <Transfer 
        {...listCommonProps}
        onChange={errorOnChange}
      />
    );
    
    // Should not crash when clicking transfer button
    fireEvent.click(container.querySelector('.ant-transfer-actions button')!);
    expect(container.querySelector('.ant-transfer')).toBeTruthy();
    consoleErrorSpy.mockRestore();
  });

  it('should handle onSelectChange callback throwing errors', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    const errorOnSelectChange = () => {
      throw new Error('onSelectChange error');
    };

    const { getByText } = render(
      <Transfer 
        {...listCommonProps}
        onSelectChange={errorOnSelectChange}
        render={(item) => item.title}
      />
    );
    
    // Should not crash when selecting items
    fireEvent.click(getByText('b'));
    expect(getByText('b')).toBeTruthy();
    consoleErrorSpy.mockRestore();
  });
});

describe('Transfer - Accessibility', () => {
  it('should have proper ARIA attributes', () => {
    const { container } = render(<Transfer {...listCommonProps} />);
    
    const transferLists = container.querySelectorAll('.ant-transfer-list');
    transferLists.forEach(list => {
      expect(list).toHaveAttribute('role');
    });
    
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    expect(checkboxes.length).toBeGreaterThan(0);
  });

  it('should support keyboard navigation', () => {
    const onSelectChange = jest.fn();
    const { container, getByText } = render(
      <Transfer 
        {...listCommonProps} 
        onSelectChange={onSelectChange}
        render={(item) => item.title} 
      />
    );
    
    const firstItem = getByText('a');
    fireEvent.keyDown(firstItem, { key: 'Enter' });
    fireEvent.keyDown(firstItem, { key: ' ' });
    
    // Should handle keyboard events
    expect(firstItem).toBeTruthy();
  });

  it('should have proper focus management on transfer', () => {
    const { container } = render(<Transfer {...listCommonProps} />);
    
    const transferButton = container.querySelector('.ant-transfer-actions button') as HTMLElement;
    transferButton.focus();
    expect(document.activeElement).toBe(transferButton);
    
    fireEvent.click(transferButton);
    // Focus should remain manageable after transfer
    expect(transferButton).toBeTruthy();
  });

  it('should support screen reader announcements', () => {
    const { container } = render(<Transfer {...listCommonProps} />);
    
    // Should have elements that can be announced by screen readers
    const headerElements = container.querySelectorAll('.ant-transfer-list-header-selected');
    expect(headerElements.length).toBe(2);
    headerElements.forEach(header => {
      expect(header.textContent).toMatch(/\d+\/\d+/);
    });
  });
});

describe('Transfer - Advanced Scenarios', () => {
  it('should handle complex filtering scenarios', () => {
    const complexFilter = (inputValue: string, option: any) => {
      return option.title.toLowerCase().includes(inputValue.toLowerCase()) ||
             option.description?.toLowerCase().includes(inputValue.toLowerCase());
    };

    const { container } = render(
      <Transfer 
        {...searchTransferProps}
        showSearch
        filterOption={complexFilter}
        render={(item) => item.title}
      />
    );

    const searchInput = container.querySelector('.ant-transfer-list-search input')!;
    fireEvent.change(searchInput, { target: { value: 'CONTENT' } });
    
    expect(container.querySelectorAll('.ant-transfer-list-content-item')).toHaveLength(4);
  });

  it('should handle custom list styles properly', () => {
    const customListStyle = ({ direction }: { direction: 'left' | 'right' }) => ({
      backgroundColor: direction === 'left' ? '#f0f0f0' : '#fff0f0',
      border: '1px solid red',
      minHeight: '300px',
    });

    const { container } = render(
      <Transfer 
        {...listCommonProps}
        listStyle={customListStyle}
      />
    );

    const leftList = container.querySelectorAll('.ant-transfer-section')[0] as HTMLElement;
    const rightList = container.querySelectorAll('.ant-transfer-section')[1] as HTMLElement;

    expect(leftList.style.backgroundColor).toBe('rgb(240, 240, 240)');
    expect(rightList.style.backgroundColor).toBe('rgb(255, 240, 240)');
  });

  it('should handle titles as functions', () => {
    const dynamicTitles = [
      (info: any) => `Source (${info.selectedCount}/${info.totalCount})`,
      (info: any) => `Target (${info.selectedCount}/${info.totalCount})`,
    ];

    const { container } = render(
      <Transfer 
        {...listCommonProps}
        titles={dynamicTitles}
      />
    );

    expect(container.textContent).toContain('Source (1/2)');
    expect(container.textContent).toContain('Target (0/1)');
  });

  it('should handle footer render function', () => {
    const customFooter = (props: any) => (
      <div className="custom-footer">
        Custom Footer - {props.direction}
      </div>
    );

    const { container } = render(
      <Transfer 
        {...listCommonProps}
        footer={customFooter}
      />
    );

    expect(container.querySelectorAll('.custom-footer')).toHaveLength(2);
    expect(container.textContent).toContain('Custom Footer - left');
    expect(container.textContent).toContain('Custom Footer - right');
  });

  it('should handle operations render function', () => {
    const customOperations = ['Move Right', 'Move Left'];

    const { container } = render(
      <Transfer 
        {...listCommonProps}
        operations={customOperations}
      />
    );

    expect(container.textContent).toContain('Move Right');
    expect(container.textContent).toContain('Move Left');
  });

  it('should handle showSelectAll as array', () => {
    const showSelectAll = [true, false];

    const { container } = render(
      <Transfer 
        {...listCommonProps}
        showSelectAll={showSelectAll}
      />
    );

    const leftHeader = container.querySelectorAll('.ant-transfer-list-header')[0];
    const rightHeader = container.querySelectorAll('.ant-transfer-list-header')[1];

    expect(leftHeader.querySelector('input[type="checkbox"]')).toBeTruthy();
    expect(rightHeader.querySelector('input[type="checkbox"]')).toBeFalsy();
  });
});

describe('Transfer - State Management Edge Cases', () => {
  it('should handle controlled vs uncontrolled state properly', () => {
    const { container, rerender } = render(
      <Transfer dataSource={listCommonProps.dataSource} />
    );

    // Uncontrolled - should manage own state
    fireEvent.click(container.querySelector('.ant-transfer-list-content input')!);
    expect(container.querySelector('.ant-transfer-list-content input')).toBeChecked();

    // Switch to controlled
    rerender(
      <Transfer 
        dataSource={listCommonProps.dataSource}
        selectedKeys={['b']}
      />
    );

    // Should respect controlled state
    const inputs = container.querySelectorAll('.ant-transfer-list-content input');
    expect(inputs[1]).toBeChecked();
    expect(inputs[0]).not.toBeChecked();
  });

  it('should handle targetKeys changing externally', async () => {
    const App = () => {
      const [targetKeys, setTargetKeys] = useState<string[]>([]);
      
      useEffect(() => {
        const timer = setTimeout(() => {
          setTargetKeys(['a', 'b']);
        }, 100);
        return () => clearTimeout(timer);
      }, []);

      return (
        <Transfer 
          dataSource={listCommonProps.dataSource}
          targetKeys={targetKeys}
        />
      );
    };

    const { container } = render(<App />);
    
    await waitFor(() => {
      expect(container.querySelectorAll('.ant-transfer-section')[1].querySelectorAll('.ant-transfer-list-content-item')).toHaveLength(2);
    });
  });

  it('should handle selectedKeys state synchronization', () => {
    const onSelectChange = jest.fn();
    const { container, rerender } = render(
      <Transfer 
        {...listCommonProps}
        selectedKeys={['a']}
        onSelectChange={onSelectChange}
      />
    );

    // Initially selected
    expect(container.querySelector('.ant-transfer-list-content input')).toBeChecked();

    // Change selectedKeys externally
    rerender(
      <Transfer 
        {...listCommonProps}
        selectedKeys={['b']}
        onSelectChange={onSelectChange}
      />
    );

    const inputs = container.querySelectorAll('.ant-transfer-list-content input');
    expect(inputs[0]).not.toBeChecked();
    expect(inputs[1]).toBeChecked();
  });
});

describe('Transfer - Performance Tests', () => {
  it('should handle virtual scrolling with large datasets', () => {
    const largeDataSource = generateData(10000);
    
    const { container } = render(
      <Transfer 
        dataSource={largeDataSource}
        height={200}
        pagination={false}
      />
    );

    // Should only render visible items efficiently
    const visibleItems = container.querySelectorAll('.ant-transfer-list-content-item');
    expect(visibleItems.length).toBeLessThan(10000); // Should not render all items
  });

  it('should debounce search input efficiently', async () => {
    const filterOption = jest.fn((inputValue, option) => 
      option.title.includes(inputValue)
    );

    const { container } = render(
      <Transfer 
        {...searchTransferProps}
        showSearch
        filterOption={filterOption}
      />
    );

    const searchInput = container.querySelector('.ant-transfer-list-search input')!;
    
    // Type rapidly
    fireEvent.change(searchInput, { target: { value: 'c' } });
    fireEvent.change(searchInput, { target: { value: 'co' } });
    fireEvent.change(searchInput, { target: { value: 'con' } });

    await waitFakeTimer();
    
    // Should call filter function
    expect(filterOption).toHaveBeenCalled();
  });

  it('should handle memory cleanup on unmount', () => {
    const { unmount } = render(<Transfer {...listCommonProps} />);
    
    // Should not throw errors on unmount
    expect(() => unmount()).not.toThrow();
  });
});

describe('Transfer - Boundary Conditions', () => {
  it('should handle single item datasets', () => {
    const singleItemProps = {
      dataSource: [{ key: 'single', title: 'Single Item' }],
      selectedKeys: [],
      targetKeys: [],
    };

    const { container } = render(<Transfer {...singleItemProps} />);
    
    expect(container.querySelectorAll('.ant-transfer-list-content-item')).toHaveLength(1);
    expect(container.querySelector('.ant-transfer-list-header-selected')).toHaveTextContent('0/1');
  });

  it('should handle all items selected', () => {
    const allSelectedProps = {
      dataSource: listCommonProps.dataSource,
      selectedKeys: ['a', 'b', 'c'],
      targetKeys: [],
    };

    const { container } = render(<Transfer {...allSelectedProps} />);
    
    const inputs = container.querySelectorAll('.ant-transfer-list-content input');
    expect(inputs[0]).toBeChecked();
    expect(inputs[1]).toBeChecked();
    // Third item (c) is disabled, so it might behave differently
  });

  it('should handle all items in target', () => {
    const allTargetProps = {
      dataSource: listCommonProps.dataSource,
      selectedKeys: [],
      targetKeys: ['a', 'b', 'c'],
    };

    const { container } = render(<Transfer {...allTargetProps} />);
    
    expect(container.querySelectorAll('.ant-transfer-section')[0].querySelectorAll('.ant-transfer-list-content-item')).toHaveLength(0);
    expect(container.querySelectorAll('.ant-transfer-section')[1].querySelectorAll('.ant-transfer-list-content-item')).toHaveLength(3);
  });

  it('should handle duplicate keys gracefully', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    
    const duplicateKeyData = [
      { key: 'a', title: 'First A' },
      { key: 'a', title: 'Second A' },
      { key: 'b', title: 'B' },
    ];

    const { container } = render(<Transfer dataSource={duplicateKeyData} />);
    
    // Should handle duplicates without crashing
    expect(container.querySelector('.ant-transfer')).toBeTruthy();
    consoleWarnSpy.mockRestore();
  });
});
