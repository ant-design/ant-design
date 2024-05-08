import React from 'react';

import Table from '..';
import { render } from '../../../tests/utils';

describe('Table.Virtual', () => {
  it('should work', () => {
    const { container } = render(
      <Table
        virtual
        scroll={{ x: 100, y: 100 }}
        columns={[
          {
            dataIndex: 'key',
          },
        ]}
        dataSource={[
          {
            key: 'bamboo',
          },
        ]}
      />,
    );

    expect(
      container.querySelectorAll(
        '.ant-table-wrapper .ant-table-tbody-virtual .ant-table-row:not(tr)',
      ),
    ).toHaveLength(1);
    expect(
      container.querySelectorAll('.ant-table-tbody-virtual-holder .ant-table-cell'),
    ).toHaveLength(1);
    expect(
      container.querySelector('.ant-table-tbody-virtual-holder .ant-table-cell')?.textContent,
    ).toEqual('bamboo');
  });

  // warning from `rc-table`
  it('warning if no scroll', () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<Table virtual />);

    expect(errSpy).toHaveBeenCalledWith('Warning: `scroll.y` in virtual table must be number.');
    errSpy.mockRestore();
  });
});
