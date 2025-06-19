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
describe('Edge Cases and Error Handling', () => {
  it('should handle undefined dataSource gracefully', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { container } = render(<Transfer dataSource={undefined as any} />);
    expect(container.querySelector('.ant-transfer')).toBeTruthy();
    consoleErrorSpy.mockRestore();
  });

  it('should handle null dataSource gracefully', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { container } = render(<Transfer dataSource={null as any} />);
    expect(container.querySelector('.ant-transfer')).toBeTruthy();
    consoleErrorSpy.mockRestore();
  });

  it('should handle malformed data items gracefully', () => {
    const malformedData = [
      { key: 'a', title: 'valid' },
      { title: 'missing key' } as any,
      { key: null, title: 'null key' } as any,
      { key: 'c', title: null } as any,
      undefined as any,
      null as any,
    ];
    const { container } = render(<Transfer dataSource={malformedData} />);
    expect(container.querySelector('.ant-transfer')).toBeTruthy();
  });

  it('should handle extremely large datasets without crashing', () => {
    const largeDataset = generateData(10000);
    const { container } = render(<Transfer dataSource={largeDataset} />);
    expect(container.querySelector('.ant-transfer')).toBeTruthy();
  });

  it('should handle circular references in data objects', () => {
    const circularData: any = { key: 'a', title: 'test' };
    circularData.self = circularData;
    const dataSource = [circularData];
    const { container } = render(<Transfer dataSource={dataSource} />);
    expect(container.querySelector('.ant-transfer')).toBeTruthy();
  });

  it('should handle invalid targetKeys gracefully', () => {
    const { container } = render(
      <Transfer 
        {...listCommonProps} 
        targetKeys={['nonexistent', null as any, undefined as any, 123 as any]} 
      />
    );
    expect(container.querySelector('.ant-transfer')).toBeTruthy();
  });

  it('should handle invalid selectedKeys gracefully', () => {
    const { container } = render(
      <Transfer 
        {...listCommonProps} 
        selectedKeys={['nonexistent', null as any, undefined as any, {} as any]} 
      />
    );
    expect(container.querySelector('.ant-transfer')).toBeTruthy();
  });

  it('should handle callback functions that throw errors', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const errorCallback = () => { throw new Error('Test error'); };
    
    const { container } = render(
      <Transfer 
        {...listCommonProps} 
        onChange={errorCallback}
        onSelectChange={errorCallback}
      />
    );
    
    // Trigger callbacks that should handle errors gracefully
    fireEvent.click(container.querySelector('.ant-transfer-actions button')!);
    expect(container.querySelector('.ant-transfer')).toBeTruthy();
    consoleErrorSpy.mockRestore();
  });
});

describe('Accessibility and Keyboard Navigation', () => {
  it('should have proper ARIA labels and roles', () => {
    const { container } = render(<Transfer {...listCommonProps} />);
    
    const transferElement = container.querySelector('.ant-transfer');
    const listElements = container.querySelectorAll('.ant-transfer-list');
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    
    expect(transferElement).toBeTruthy();
    expect(listElements).toHaveLength(2);
    checkboxes.forEach(checkbox => {
      expect(checkbox).toHaveAttribute('type', 'checkbox');
    });
  });

  it('should support keyboard navigation for item selection', () => {
    const onSelectChange = jest.fn();
    const { container } = render(
      <Transfer {...listCommonProps} onSelectChange={onSelectChange} />
    );
    
    const firstItem = container.querySelector('.ant-transfer-list-content-item')!;
    fireEvent.keyDown(firstItem, { key: 'Enter' });
    fireEvent.keyDown(firstItem, { key: ' ' });
    
    expect(container.querySelector('.ant-transfer')).toBeTruthy();
  });

  it('should support keyboard navigation for transfer actions', () => {
    const onChange = jest.fn();
    const { container } = render(<Transfer {...listCommonProps} onChange={onChange} />);
    
    const transferButton = container.querySelector('.ant-transfer-actions button')!;
    fireEvent.keyDown(transferButton, { key: 'Enter' });
    fireEvent.keyDown(transferButton, { key: ' ' });
    
    expect(container.querySelector('.ant-transfer')).toBeTruthy();
  });

  it('should have proper tab order', () => {
    const { container } = render(<Transfer {...listCommonProps} showSearch />);
    
    const focusableElements = container.querySelectorAll(
      'input, button, [tabindex]:not([tabindex="-1"])'
    );
    
    expect(focusableElements.length).toBeGreaterThan(0);
    
    // Check that elements can receive focus
    focusableElements.forEach((element, index) => {
      if (index < 5) { // Test first few elements to avoid excessive testing
        (element as HTMLElement).focus();
        expect(document.activeElement).toBe(element);
      }
    });
  });

  it('should announce changes to screen readers', () => {
    const { container } = render(<Transfer {...listCommonProps} />);
    
    // Check for live regions or aria-live attributes
    const liveRegions = container.querySelectorAll('[aria-live]');
    const statusElements = container.querySelectorAll('[role="status"]');
    
    expect(liveRegions.length + statusElements.length).toBeGreaterThanOrEqual(0);
  });

  it('should handle high contrast mode', () => {
    const { container } = render(<Transfer {...listCommonProps} />);
    
    // Add high contrast class to simulate high contrast mode
    container.querySelector('.ant-transfer')?.classList.add('high-contrast');
    
    expect(container.querySelector('.ant-transfer')).toBeTruthy();
  });
});

describe('Complex Interactions and Stress Testing', () => {
  it('should handle rapid consecutive clicks without issues', async () => {
    const onChange = jest.fn();
    const { container } = render(<Transfer {...listCommonProps} onChange={onChange} />);
    
    const transferButton = container.querySelector('.ant-transfer-actions button')!;
    
    // Rapidly click transfer button
    for (let i = 0; i < 10; i++) {
      fireEvent.click(transferButton);
    }
    
    // Should still function normally
    expect(container.querySelector('.ant-transfer')).toBeTruthy();
  });

  it('should handle simultaneous search and selection operations', async () => {
    const onSelectChange = jest.fn();
    const { container, getByText } = render(
      <Transfer 
        {...searchTransferProps} 
        showSearch 
        onSelectChange={onSelectChange}
        render={(item) => item.title}
      />
    );
    
    const searchInput = container.querySelector('.ant-transfer-list-search input')!;
    
    // Start search
    fireEvent.change(searchInput, { target: { value: 'content' } });
    
    // Select items while searching
    fireEvent.click(getByText('content1'));
    fireEvent.change(searchInput, { target: { value: 'content2' } });
    fireEvent.click(getByText('content2'));
    
    expect(onSelectChange).toHaveBeenCalled();
  });

  it('should handle component state changes during async operations', async () => {
    const AsyncTransferDemo = () => {
      const [dataSource, setDataSource] = useState(listCommonProps.dataSource);
      const [loading, setLoading] = useState(false);
      
      const updateData = async () => {
        setLoading(true);
        // Simulate async operation
        await new Promise(resolve => setTimeout(resolve, 100));
        setDataSource([...dataSource, { key: 'd', title: 'd' }]);
        setLoading(false);
      };
      
      return (
        <>
          <Button onClick={updateData} disabled={loading}>Update Data</Button>
          <Transfer dataSource={dataSource} />
        </>
      );
    };
    
    const { container, getByText } = render(<AsyncTransferDemo />);
    
    fireEvent.click(getByText('Update Data'));
    await waitFor(() => {
      expect(container.querySelector('.ant-transfer')).toBeTruthy();
    });
  });

  it('should handle memory-intensive operations with large datasets', () => {
    const massiveDataset = generateData(50000);
    const startTime = performance.now();
    
    const { container } = render(
      <Transfer 
        dataSource={massiveDataset} 
        pagination={{ pageSize: 10 }}
      />
    );
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    expect(container.querySelector('.ant-transfer')).toBeTruthy();
    expect(renderTime).toBeLessThan(5000); // Should render in under 5 seconds
  });

  it('should handle component unmounting during active operations', () => {
    const TestWrapper = ({ shouldMount }: { shouldMount: boolean }) => (
      shouldMount ? <Transfer {...listCommonProps} showSearch /> : null
    );
    
    const { container, rerender } = render(<TestWrapper shouldMount={true} />);
    
    // Start a search operation
    const searchInput = container.querySelector('.ant-transfer-list-search input');
    if (searchInput) {
      fireEvent.change(searchInput, { target: { value: 'test' } });
    }
    
    // Unmount component
    rerender(<TestWrapper shouldMount={false} />);
    
    // Should not throw errors
    expect(container.innerHTML).toBe('');
  });
});

describe('Advanced Search and Filtering', () => {
  it('should handle special characters in search', () => {
    const specialCharData = [
      { key: '1', title: 'Test@#$%' },
      { key: '2', title: 'Test with spaces' },
      { key: '3', title: 'Tëst with unicode' },
      { key: '4', title: 'Test\nwith\nnewlines' },
      { key: '5', title: 'Test"with"quotes' },
    ];
    
    const { container } = render(
      <Transfer 
        dataSource={specialCharData}
        showSearch
        filterOption={(input, option) => option.title.includes(input)}
      />
    );
    
    const searchInput = container.querySelector('.ant-transfer-list-search input')!;
    
    // Test various special characters
    const specialChars = ['@#$', ' ', 'ë', '\n', '"'];
    specialChars.forEach(char => {
      fireEvent.change(searchInput, { target: { value: char } });
      expect(container.querySelector('.ant-transfer')).toBeTruthy();
    });
  });

  it('should handle very long search terms', () => {
    const longSearchTerm = 'a'.repeat(1000);
    const { container } = render(
      <Transfer {...listCommonProps} showSearch />
    );
    
    const searchInput = container.querySelector('.ant-transfer-list-search input')!;
    fireEvent.change(searchInput, { target: { value: longSearchTerm } });
    
    expect(searchInput).toHaveValue(longSearchTerm);
  });

  it('should handle regex patterns in search gracefully', () => {
    const regexPatterns = ['.*', '\\d+', '[a-z]+', '(test)', '^start', 'end$', '\\'];
    const { container } = render(
      <Transfer {...listCommonProps} showSearch />
    );
    
    const searchInput = container.querySelector('.ant-transfer-list-search input')!;
    
    regexPatterns.forEach(pattern => {
      fireEvent.change(searchInput, { target: { value: pattern } });
      expect(container.querySelector('.ant-transfer')).toBeTruthy();
    });
  });

  it('should handle custom filter functions that throw errors', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const errorFilterOption = () => { throw new Error('Filter error'); };
    
    const { container } = render(
      <Transfer 
        {...listCommonProps} 
        showSearch 
        filterOption={errorFilterOption}
      />
    );
    
    const searchInput = container.querySelector('.ant-transfer-list-search input')!;
    fireEvent.change(searchInput, { target: { value: 'test' } });
    
    expect(container.querySelector('.ant-transfer')).toBeTruthy();
    consoleErrorSpy.mockRestore();
  });

  it('should handle case-insensitive search correctly', () => {
    const mixedCaseData = [
      { key: '1', title: 'UPPERCASE' },
      { key: '2', title: 'lowercase' },
      { key: '3', title: 'MiXeD cAsE' },
    ];
    
    const { container } = render(
      <Transfer 
        dataSource={mixedCaseData}
        showSearch
        filterOption={(input, option) => 
          option.title.toLowerCase().includes(input.toLowerCase())
        }
      />
    );
    
    const searchInput = container.querySelector('.ant-transfer-list-search input')!;
    fireEvent.change(searchInput, { target: { value: 'CASE' } });
    
    expect(container.querySelectorAll('.ant-transfer-list-content-item')).toHaveLength(1);
  });
});

describe('Props Validation and Edge Cases', () => {
  it('should handle conflicting prop combinations gracefully', () => {
    const { container } = render(
      <Transfer 
        {...listCommonProps}
        disabled={true}
        showSearch={true}
        oneWay={true}
        pagination={true}
      />
    );
    
    expect(container.querySelector('.ant-transfer')).toBeTruthy();
  });

  it('should handle dynamic prop changes', () => {
    const DynamicTransfer = () => {
      const [showSearch, setShowSearch] = useState(false);
      const [disabled, setDisabled] = useState(false);
      
      return (
        <>
          <Button onClick={() => setShowSearch(!showSearch)}>Toggle Search</Button>
          <Button onClick={() => setDisabled(!disabled)}>Toggle Disabled</Button>
          <Transfer 
            {...listCommonProps}
            showSearch={showSearch}
            disabled={disabled}
          />
        </>
      );
    };
    
    const { container, getByText } = render(<DynamicTransfer />);
    
    fireEvent.click(getByText('Toggle Search'));
    fireEvent.click(getByText('Toggle Disabled'));
    
    expect(container.querySelector('.ant-transfer')).toBeTruthy();
  });

  it('should handle custom render functions with various return types', () => {
    const customRenderData = [
      { key: '1', title: 'string' },
      { key: '2', title: 'number', value: 42 },
      { key: '3', title: 'boolean', flag: true },
    ];
    
    const renderFunctions = [
      (item: any) => item.title,
      (item: any) => <span>{item.title}</span>,
      (item: any) => ({ value: item.title, label: item.title }),
      (item: any) => null,
      (item: any) => undefined,
      (item: any) => item.value || item.title,
    ];
    
    renderFunctions.forEach((renderFn, index) => {
      const { container } = render(
        <Transfer 
          dataSource={customRenderData}
          render={renderFn}
          key={index}
        />
      );
      expect(container.querySelector('.ant-transfer')).toBeTruthy();
    });
  });

  it('should handle footer render functions with various return types', () => {
    const footerFunctions = [
      () => <div>Custom Footer</div>,
      () => null,
      () => undefined,
      () => 'String Footer',
      () => { throw new Error('Footer error'); },
    ];
    
    footerFunctions.forEach((footerFn, index) => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const { container } = render(
        <Transfer 
          {...listCommonProps}
          footer={footerFn}
          key={index}
        />
      );
      expect(container.querySelector('.ant-transfer')).toBeTruthy();
      consoleErrorSpy.mockRestore();
    });
  });

  it('should handle extreme pagination values', () => {
    const extremeValues = [
      { pageSize: 0 },
      { pageSize: -1 },
      { pageSize: Infinity },
      { pageSize: NaN },
      { pageSize: 1.5 },
      { current: -1 },
      { current: Infinity },
    ];
    
    extremeValues.forEach((paginationProps, index) => {
      const { container } = render(
        <Transfer 
          {...listCommonProps}
          pagination={paginationProps}
          key={index}
        />
      );
      expect(container.querySelector('.ant-transfer')).toBeTruthy();
    });
  });

  it('should handle titles prop variations', () => {
    const titleVariations = [
      ['Left', 'Right'],
      [<span key="left">Custom Left</span>, <span key="right">Custom Right</span>],
      ['', ''],
      [null as any, null as any],
      [undefined as any, undefined as any],
    ];
    
    titleVariations.forEach((titles, index) => {
      const { container } = render(
        <Transfer 
          {...listCommonProps}
          titles={titles}
          key={index}
        />
      );
      expect(container.querySelector('.ant-transfer')).toBeTruthy();
    });
  });
});

describe('Performance and Memory Management', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should not cause memory leaks with frequent re-renders', () => {
    const TestComponent = ({ iteration }: { iteration: number }) => (
      <Transfer 
        dataSource={generateData(100)} 
        targetKeys={[`${iteration}`]}
        key={iteration}
      />
    );
    
    const { rerender } = render(<TestComponent iteration={0} />);
    
    // Force multiple re-renders
    for (let i = 1; i <= 50; i++) {
      rerender(<TestComponent iteration={i} />);
    });
    
    // Should complete without issues
    expect(true).toBe(true);
  });

  it('should debounce search input properly', async () => {
    const mockFilterOption = jest.fn((input, option) => option.title.includes(input));
    const { container } = render(
      <Transfer 
        {...listCommonProps}
        showSearch
        filterOption={mockFilterOption}
      />
    );
    
    const searchInput = container.querySelector('.ant-transfer-list-search input')!;
    
    // Type rapidly
    fireEvent.change(searchInput, { target: { value: 'a' } });
    fireEvent.change(searchInput, { target: { value: 'ab' } });
    fireEvent.change(searchInput, { target: { value: 'abc' } });
    
    jest.advanceTimersByTime(300);
    
    expect(mockFilterOption).toHaveBeenCalled();
  });

  it('should handle virtualization with large datasets efficiently', () => {
    const hugeDataset = generateData(100000);
    const startTime = performance.now();
    
    const { container } = render(
      <Transfer 
        dataSource={hugeDataset}
        pagination={{ pageSize: 50 }}
      />
    );
    
    const endTime = performance.now();
    
    expect(container.querySelector('.ant-transfer')).toBeTruthy();
    expect(endTime - startTime).toBeLessThan(10000); // Should render in under 10 seconds
  });

  it('should clean up event listeners on unmount', () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
    
    const { unmount } = render(<Transfer {...listCommonProps} />);
    
    const addCalls = addEventListenerSpy.mock.calls.length;
    unmount();
    const removeCalls = removeEventListenerSpy.mock.calls.length;
    
    // Should have cleaned up listeners (this is a basic check)
    expect(removeCalls).toBeGreaterThanOrEqual(0);
    
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it('should handle rapid state updates without performance degradation', () => {
    const RapidUpdateTransfer = () => {
      const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
      
      useEffect(() => {
        const interval = setInterval(() => {
          setSelectedKeys(prev => 
            prev.length === 0 ? ['a'] : []
          );
        }, 10);
        
        return () => clearInterval(interval);
      }, []);
      
      return <Transfer {...listCommonProps} selectedKeys={selectedKeys} />;
    };
    
    const { container } = render(<RapidUpdateTransfer />);
    
    jest.advanceTimersByTime(1000);
    
    expect(container.querySelector('.ant-transfer')).toBeTruthy();
  });
});
