/* eslint-disable no-unused-expressions */

import * as React from 'react';
import Table from '../Table';

const { Column, ColumnGroup } = Table;

describe('Table.typescript', () => {
  it('Column', () => {
    <Table>
      <Column dataIndex="test" title="test" sorter />
    </Table>;
  });
  it('ColumnGroup', () => {
    <Table>
      <Column dataIndex="test" title="test" sorter />
      <ColumnGroup>
        <Column dataIndex="test" title="test" sorter />
      </ColumnGroup>
    </Table>;
  });
});

/* eslint-enable */
