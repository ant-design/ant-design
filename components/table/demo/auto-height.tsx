import React, { useEffect, useRef, useState } from 'react';
import { Flex, Switch, Table } from 'antd';
import type { GetRef, TableColumnsType, TableProps } from 'antd';

// ===================== HOC =====================
const measureClassNames = {
  header: 'measure-header',
  pagination: 'measure-pagination',
};

const tableClassNames = {
  header: {
    wrapper: measureClassNames.header,
  },
  pagination: {
    root: measureClassNames.pagination,
  },
};

type AutoHeightTableProps<RecordType extends object> = Omit<
  TableProps<RecordType>,
  'styles' | 'classNames'
>;

const AutoHeightTable = <RecordType extends object>(props: AutoHeightTableProps<RecordType>) => {
  const { scroll, style, ...restProps } = props;
  const rootRef = useRef<GetRef<typeof Table>>(null);
  const [scrollY, setScrollY] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(0);

  const getHeight = (className: string | HTMLElement) => {
    const ele =
      typeof className === 'string'
        ? rootRef.current?.nativeElement?.querySelector<HTMLElement>(`.${className}`)
        : className;

    if (ele) {
      return (
        (ele?.getBoundingClientRect().height ?? 0) +
        Number.parseFloat(getComputedStyle(ele as Element).marginTop)
      );
    }

    return 0;
  };

  useEffect(() => {
    if (rootRef.current) {
      const totalHeight = getHeight(rootRef.current.nativeElement);
      const headerHeight = getHeight(measureClassNames.header);
      const paginationHeight = getHeight(measureClassNames.pagination);

      setScrollY(Math.max(0, Math.floor(totalHeight - headerHeight - paginationHeight)));
      setSectionHeight(totalHeight - paginationHeight);
    }
  });

  return (
    <Table<RecordType>
      {...restProps}
      ref={rootRef}
      scroll={{ ...scroll, y: scrollY }}
      style={{ ...style, height: '100%' }}
      styles={{
        section: {
          height: sectionHeight,
        },
      }}
      classNames={tableClassNames}
    />
  );
};

// ==================== Usage ====================

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: '20%',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: '20%',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    width: '60%',
  },
];

const genData = (length: number): DataType[] => {
  return Array.from({ length }).map<DataType>((_, index) => ({
    key: index,
    name: `Edward King ${index}`,
    age: 32 + index,
    address: `London, Park Lane no. ${index}`,
  }));
};

const dataMore = genData(30);
const dataLess = genData(2);

const App: React.FC = () => {
  const [hasData, setHasData] = useState(true);

  const mergedData = hasData ? dataMore : dataLess;

  return (
    <Flex vertical gap="middle" align="start">
      <Switch
        checked={hasData}
        checkedChildren="More Data"
        unCheckedChildren="More Data"
        onChange={setHasData}
      />
      <div
        style={{
          height: 400,
          boxSizing: 'border-box',
          background: 'rgba(140, 140, 140, 0.03)',
          padding: 16,
          alignSelf: 'stretch',
        }}
      >
        <AutoHeightTable<DataType> columns={columns} dataSource={mergedData} />
      </div>
    </Flex>
  );
};

export default App;
