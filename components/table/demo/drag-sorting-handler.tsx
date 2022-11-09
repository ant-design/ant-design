// import React, { useState } from 'react';
// import { MenuOutlined } from '@ant-design/icons';
// import { Table } from 'antd';
// import type { ColumnsType } from 'antd/es/table';
// import { arrayMoveImmutable } from 'array-move';
// import type { SortableContainerProps, SortEnd } from 'react-sortable-hoc';
// import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
//
// interface DataType {
//   key: string;
//   name: string;
//   age: number;
//   address: string;
//   index: number;
// }
//
// const DragHandle = SortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />);
//
// const columns: ColumnsType<DataType> = [
//   {
//     title: 'Sort',
//     dataIndex: 'sort',
//     width: 30,
//     className: 'drag-visible',
//     render: () => <DragHandle />,
//   },
//   {
//     title: 'Name',
//     dataIndex: 'name',
//     className: 'drag-visible',
//   },
//   {
//     title: 'Age',
//     dataIndex: 'age',
//   },
//   {
//     title: 'Address',
//     dataIndex: 'address',
//   },
// ];
//
// const data: DataType[] = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     index: 0,
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//     index: 1,
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sidney No. 1 Lake Park',
//     index: 2,
//   },
// ];
//
// const SortableItem = SortableElement((props: React.HTMLAttributes<HTMLTableRowElement>) => (
//   <tr {...props} />
// ));
// const SortableBody = SortableContainer((props: React.HTMLAttributes<HTMLTableSectionElement>) => (
//   <tbody {...props} />
// ));
//
// const App: React.FC = () => {
//   const [dataSource, setDataSource] = useState(data);
//
//   const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
//     if (oldIndex !== newIndex) {
//       const newData = arrayMoveImmutable(dataSource.slice(), oldIndex, newIndex).filter(
//         (el: DataType) => !!el,
//       );
//       console.log('Sorted items: ', newData);
//       setDataSource(newData);
//     }
//   };
//
//   const DraggableContainer = (props: SortableContainerProps) => (
//     <SortableBody
//       useDragHandle
//       disableAutoscroll
//       helperClass="row-dragging"
//       onSortEnd={onSortEnd}
//       {...props}
//     />
//   );
//
//   const DraggableBodyRow: React.FC<any> = ({ className, style, ...restProps }) => {
//     // function findIndex base on Table rowKey props and should always be a right array index
//     const index = dataSource.findIndex(x => x.index === restProps['data-row-key']);
//     return <SortableItem index={index} {...restProps} />;
//   };
//
//   return (
//     <Table
//       pagination={false}
//       dataSource={dataSource}
//       columns={columns}
//       rowKey="index"
//       components={{
//         body: {
//           wrapper: DraggableContainer,
//           row: DraggableBodyRow,
//         },
//       }}
//     />
//   );
// };
//
// export default App;

export default () => {};
