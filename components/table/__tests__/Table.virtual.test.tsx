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

    expect(container.querySelectorAll('.rc-virtual-list-holder .ant-table-cell')).toHaveLength(1);
    expect(container.querySelector('.rc-virtual-list-holder .ant-table-cell')?.textContent).toEqual(
      'bamboo',
    );
  });

  // warning from `rc-table`
  it('warning if no scroll', () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<Table virtual />);

    expect(errSpy).toHaveBeenCalledWith('Warning: `scroll.y` in virtual table must be number.');
    errSpy.mockRestore();
  });
});
