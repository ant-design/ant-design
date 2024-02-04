import type { HTMLAttributes } from 'react';
import React, { useState } from 'react';
import type { TableProps } from 'antd';
import { Form, Switch, Table } from 'antd';
import Selectable, { useSelectable } from 'react-selectable-box';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Full Name',
    width: 150,
    dataIndex: 'name',
  },
  {
    title: 'Age',
    width: 150,
    dataIndex: 'age',
  },
  {
    title: 'Column 1',
    dataIndex: 'column-1',
    width: 150,
  },
  {
    title: 'Column 2',
    dataIndex: 'column-2',
    width: 150,
  },
  {
    title: 'Column 3',
    dataIndex: 'column-3',
    width: 150,
  },
  {
    title: 'Column 4',
    dataIndex: 'column-4',
    width: 150,
  },
  {
    title: 'Column 5',
    dataIndex: 'column-5',
    width: 150,
  },
  {
    title: 'Column 6',
    dataIndex: 'column-6',
    width: 150,
  },
  {
    title: 'Column 7',
    dataIndex: 'column-7',
    width: 150,
  },
  {
    title: 'Column 8',
    dataIndex: 'column-8',
    width: 150,
  },
  {
    title: 'Column 9',
    dataIndex: 'column-9',
    width: 150,
  },
];

const data: DataType[] = [];
for (let i = 0; i < 10; i++) {
  data.push({
    key: i,
    name: `Edward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

interface CellProps extends HTMLAttributes<HTMLTableCellElement> {
  rowKey: React.Key;
  dataIndex: string;
}

const Cell = ({ rowKey, dataIndex, ...props }: CellProps) => {
  const { setNodeRef, isAdding, isSelected } = useSelectable({
    value: { rowKey, dataIndex },
  });

  let backgroundColor;
  if (isSelected) {
    backgroundColor = '#d9dff0';
  } else if (isAdding) {
    backgroundColor = '#e3f2ff';
  }

  return (
    <td
      ref={setNodeRef}
      {...props}
      style={{
        ...props.style,
        backgroundColor,
      }}
    />
  );
};

type ValueType = { rowKey: React.Key; dataIndex: string };

const compareFn = (a: ValueType, b: ValueType) =>
  a.rowKey === b.rowKey && a.dataIndex === b.dataIndex;

const App: React.FC = () => {
  const [value, setValue] = React.useState<ValueType[]>([]);
  const [showMouseBox, setShowMouseBox] = React.useState(true);
  const [disabled, setDisabled] = React.useState(false);
  const [continueSelect, setContinueSelect] = useState(false);
  const tblRef: Parameters<typeof Table>[0]['ref'] = React.useRef(null);

  return (
    <>
      <Form layout="inline">
        <Form.Item label="showMouseBox">
          <Switch checked={showMouseBox} onChange={setShowMouseBox} />
        </Form.Item>
        <Form.Item label="disabled">
          <Switch checked={disabled} onChange={setDisabled} />
        </Form.Item>
        <Form.Item label="continueSelect">
          <Switch checked={continueSelect} onChange={setContinueSelect} />
        </Form.Item>
      </Form>
      <Selectable
        value={value}
        disabled={disabled}
        boxStyle={{ display: showMouseBox ? undefined : 'none' }}
        scrollContainer={() => tblRef.current?.nativeElement.querySelector('.ant-table-content')!}
        // because item value is an object, so you need to customize the comparison
        compareFn={compareFn}
        onStart={() => {
          if (!continueSelect) {
            setValue([]);
          }
        }}
        onEnd={(selectingValue, { added }) => {
          console.log('selectingValue:', selectingValue, 'added:', added);
          if (continueSelect) {
            setValue(value.concat(added));
          } else {
            setValue(selectingValue);
          }
        }}
      >
        <Table
          ref={tblRef}
          bordered
          // because table is scrollable, so you should set scrollContainer to Selectable
          scroll={{ x: 1650 }}
          columns={columns.map((col) => ({
            ...col,
            onCell: (record: DataType) =>
              ({
                rowKey: record.key,
                dataIndex: (col as any).dataIndex,
              }) as any,
          }))}
          dataSource={data}
          components={{ body: { cell: Cell } }}
        />
      </Selectable>
    </>
  );
};

export default App;
