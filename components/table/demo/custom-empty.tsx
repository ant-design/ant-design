import type { GetProp } from 'antd';
import { Button, Empty, ConfigProvider, Table } from 'antd';
import React, { useState } from 'react';

const genFakeData = (count = 5) =>
  Array.from({ length: count }).map((_, index) => ({
    key: index,
    name: `Edward King ${index}`,
    age: 32 + index,
    address: `London, Park Lane no. ${index}`,
  }));

const renderEmpty: GetProp<typeof ConfigProvider, 'renderEmpty'> = (componentName) => {
  if (componentName === 'Table.filter' /** 👈 5.20.0+ */) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Filter(Custom)" />;
  }
};

function App() {
  const [dataSource, setDataSource] = useState(genFakeData);

  const handleToggle = () => {
    setDataSource(dataSource.length ? [] : genFakeData(Math.floor(Math.random() * 10)));
  };

  const columns: GetProp<typeof Table, 'columns'> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      filters: dataSource.length
        ? [
            { text: '>=35', value: 'gte35' },
            { text: '<18', value: 'lt18' },
          ]
        : [],
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const toggleButton = (
    <Button type="primary" onClick={handleToggle}>
      Toggle Data
    </Button>
  );

  return (
    <ConfigProvider renderEmpty={renderEmpty}>
      {dataSource.length ? toggleButton : null}
      <div style={{ marginBlock: 8 }} />
      <Table
        bordered
        dataSource={dataSource}
        columns={columns}
        locale={{
          emptyText: <Empty description="No Data">{toggleButton}</Empty>,
        }}
      />
    </ConfigProvider>
  );
}

export default App;
