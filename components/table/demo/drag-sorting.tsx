import React, { useState, type DragEvent } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

interface dargRowType {
  key: string;
  clientY: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

let dragRow: dargRowType;

const App: React.FC = () => {
  const [data, setData] = useState([
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Eric Xu',
      age: 33,
      address: 'Beijing No. 1 Lake Park',
    },
  ]);

  const setBorderStyle = (e: DragEvent, active: boolean) => {
    const borderStyle = e.clientY < dragRow.clientY ? 'border-top' : 'border-bottom';
    if (active) {
      e.currentTarget.classList.add(borderStyle);
    } else {
      e.currentTarget.classList.remove(borderStyle);
    }
  };

  const onRow = (state: DataType[], setState: (sta: DataType[]) => void) => ({
    draggable: true,
    style: { cursor: 'move' },
    onDragStart: (e: DragEvent) => {
      e.dataTransfer.effectAllowed = 'move';
      dragRow = {
        key: e.currentTarget.getAttribute('data-row-key') as string,
        clientY: e.clientY,
      };
    },
    onDrop: (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const dropKey = e.currentTarget.getAttribute('data-row-key');
      if (dragRow.key === dropKey) {
        return;
      }
      const dragIndex = state.findIndex((item: DataType) => item.key === dragRow.key);
      const dropIndex = state.findIndex((item: DataType) => item.key === dropKey);
      const tableData = [...state];
      const item = tableData.splice(dragIndex, 1);
      tableData.splice(dropIndex, 0, item[0]);
      setState(tableData);
      setBorderStyle(e, false);
    },
    onDragEnter: (e: DragEvent) => {
      if (dragRow.key !== e.currentTarget.getAttribute('data-row-key')) {
        setBorderStyle(e, true);
      }
    },
    onDragLeave: (e: DragEvent) => setBorderStyle(e, false),
    onDragOver: (e: DragEvent) => e.preventDefault(),
  });

  return <Table columns={columns} dataSource={data} onRow={() => onRow(data, setData)} />;
};

export default App;
