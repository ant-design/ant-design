import React, { createContext, useContext, useState } from 'react';
import type { DragEndEvent, DragOverEvent, UniqueIdentifier } from '@dnd-kit/core';
import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';

interface DataType {
  key: string;
  name: string;
  gender: string;
  age: number;
  email: string;
  address: string;
}

interface HeaderCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  id: string;
}

interface BodyCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  id: string;
}
type DragIndexState = {
  active: UniqueIdentifier;
  over: UniqueIdentifier | undefined;
};
const DragIndexContext = createContext<DragIndexState>({ active: -1, over: -1 });

const dragActiveStyle = (active: UniqueIdentifier, over: unknown, id: string) =>
  // eslint-disable-next-line no-nested-ternary
  over && id === over && active !== over
    ? { borderLeft: '1px dashed gray' }
    : active && active === id
      ? { backgroundColor: 'gray', opacity: 0.5 }
      : {};

const TableBodyCell = (props: BodyCellProps) => {
  const { active, over } = useContext<DragIndexState>(DragIndexContext);
  return (
    <td
      {...props}
      style={{
        ...props.style,
        ...dragActiveStyle(active, over, props.id),
      }}
    />
  );
};

const TableHeaderCell = (props: HeaderCellProps) => {
  const { active, over } = useContext(DragIndexContext);
  const { attributes, listeners, setNodeRef, isDragging } = useSortable({
    id: props.id,
  });

  const style: React.CSSProperties = {
    ...props.style,
    cursor: 'move',
    ...(isDragging ? { position: 'relative', zIndex: 9999, userSelect: 'none' } : {}),
    // eslint-disable-next-line no-nested-ternary
    ...(over && props.id === over && active !== over
      ? { borderLeft: '1px dashed gray' }
      : active && active === props.id
        ? { backgroundColor: 'gray', opacity: 0.5 }
        : {}),
  };

  return <th {...props} ref={setNodeRef} style={style} {...attributes} {...listeners} />;
};

const dataSource: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    gender: 'male',
    age: 32,
    email: 'John Brown@example.com',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    gender: 'female',
    age: 42,
    email: 'jimGreen@example.com',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    gender: 'female',
    age: 32,
    email: 'JoeBlack@example.com',
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'George Hcc',
    gender: 'male',
    age: 20,
    email: 'george@example.com',
    address: 'Sidney No. 1 Lake Park',
  },
];
const baseColumns: TableColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const App: React.FC = () => {
  const [dragIndex, setDragIndex] = useState<DragIndexState>({ active: -1, over: -1 });

  const [columns, setColumns] = useState(() =>
    baseColumns.map((column, i) => ({
      ...column,
      key: `${i}`,
      onHeaderCell: () => ({
        id: `${i}`,
      }),
      onCell: () => ({
        id: `${i}`,
      }),
    })),
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // https://docs.dndkit.com/api-documentation/sensors/pointer#activation-constraints
        distance: 1,
      },
    }),
  );

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setColumns((prev) => {
        const activeIndex = prev.findIndex((i) => i.key === active.id);
        const overIndex = prev.findIndex((i) => i.key === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
    setDragIndex({ active: -1, over: -1 });
  };

  const onDrageOver = ({ active, over }: DragOverEvent) => {
    console.log(active, over);
    setDragIndex({ active: active.id, over: over?.id });
  };

  return (
    <DndContext
      sensors={sensors}
      modifiers={[restrictToHorizontalAxis]}
      onDragEnd={onDragEnd}
      onDragOver={onDrageOver}
      collisionDetection={closestCenter}
    >
      <SortableContext items={columns.map((i) => i.key)} strategy={horizontalListSortingStrategy}>
        <DragIndexContext.Provider value={dragIndex}>
          <Table
            components={{
              header: {
                cell: TableHeaderCell,
              },
              body: {
                cell: TableBodyCell,
              },
            }}
            rowKey="key"
            columns={columns}
            dataSource={dataSource}
          />
        </DragIndexContext.Provider>
      </SortableContext>
      <DragOverlay>
        {/* TODO:  Since the tableheadercell custom component uses antd to render the cell style, it is currently not possible to copy the same component as tableheadercell. */}
        <th style={{ backgroundColor: 'gray', padding: 16, opacity: 0.5 }}>
          {columns[columns.findIndex((i) => i.key === dragIndex.active)]?.title as React.ReactNode}
        </th>
      </DragOverlay>
    </DndContext>
  );
};

export default App;
