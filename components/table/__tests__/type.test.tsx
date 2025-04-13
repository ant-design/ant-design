import * as React from 'react';

import type { ColumnProps } from '..';
import Table from '..';

const { Column, ColumnGroup } = Table;

describe('Table.typescript', () => {
  it('Column', () => {
    const table = (
      <Table>
        <Column dataIndex="test" title="test" sorter />
      </Table>
    );
    expect(table).toBeTruthy();
  });
  it('ColumnGroup', () => {
    const table = (
      <Table>
        <Column dataIndex="test" title="test" sorter />
        <ColumnGroup>
          <Column dataIndex="test" title="test" sorter />
        </ColumnGroup>
      </Table>
    );
    expect(table).toBeTruthy();
  });
  it('selections', () => {
    const table = <Table rowSelection={{ selections: [Table.SELECTION_ALL] }} />;
    expect(table).toBeTruthy();
  });

  it('generic', () => {
    interface RecordType {
      key: string;
    }
    const table = <Table<RecordType> dataSource={[{ key: 'Bamboo' }]} />;
    expect(table).toBeTruthy();
  });

  it('ColumnProps', () => {
    interface User {
      name: string;
    }

    const columns: ColumnProps<User>[] = [
      {
        title: 'Name',
        dataIndex: 'name',
        filterSearch: (input, record) => ((record as any).title as string).includes(input),
      },
    ];

    expect(columns).toBeTruthy();
  });

  it('table pagination position support none', () => {
    const table = <Table pagination={{ position: ['none', 'none'] }} />;
    expect(table).toBeTruthy();
  });
});
