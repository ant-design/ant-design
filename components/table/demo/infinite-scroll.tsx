import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';

interface DataType {
  key: string;
  name: string;
  age: string;
  address: string;
  phone: string;
  height: string;
  weight: string;
}

const fetchData = async (page: number, pageSize: number) => {
  await new Promise((r) => setTimeout(r, 1000)); // simulate network delay
  if (page > 5) return []; // only 5 pages of data
  return Array.from({ length: pageSize }, (_, i) => ({
    key: `${page}-${i}`,
    name: `Na${page}me Sur${i}name`,
    age: `${20 + (((page - 1) * pageSize + i) % 10)} yrs`,
    address: `Room No - ${27 + page - i}, Tower ${
      i + 1
    }, One Manhattan West, 395 9th Ave, New York, NY, 10001`,
    phone: `(555) 112-3344-${page}${i}0`,
    height: `${page + 4}'${i}"`,
    weight: `${50 + page + i} kg`,
  }));
};

const COLUMNS: TableProps<DataType>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 160,
    align: 'center',
    fixed: 'left',
  },
  { title: 'Age', dataIndex: 'age', key: 'age', width: 80, align: 'center' },
  {
    title: 'Height',
    dataIndex: 'height',
    key: 'height',
    width: 80,
    align: 'center',
  },
  {
    title: 'Weight',
    dataIndex: 'weight',
    key: 'weight',
    width: 100,
    align: 'center',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    width: 350,
    align: 'center',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
    width: 200,
    align: 'center',
  },
];

const App: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const newData = await fetchData(page, 10);
    setData((prev) => [...prev, ...newData]);
    setHasMore(newData.length > 0);
    setPage((p) => p + 1);
    setLoading(false);
  };

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <Table
      bordered
      columns={COLUMNS}
      loading={loading}
      dataSource={data}
      pagination={false} //👈 disable pagination
      infiniteScroll={{
        enabled: true, // 👈 enable infinite-scroll (also enables virtual scroll)
        onLoadMore: loadMore,
        hasMore,
        scrollbarSelector:
          '#table-demo-infinite-scroll .ant-table-tbody-virtual-scrollbar-vertical', //👈 this need not be specified unless multiple antd tables on the same page
      }}
      scroll={{ y: 400 }} // 👈 mandatory to set the height of table
    />
  );
};

export default App;
