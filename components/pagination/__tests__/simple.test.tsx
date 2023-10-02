import React from 'react';
import Pagination from '..';
import { render } from '../../../tests/utils';

describe('Pagination simple mode', () => {
  it('should support showTotal in simple mode', () => {
    const { container } = render(
      <Pagination
        simple
        total={100}
        showTotal={(total: number, range: number[]) => `${range[0]}-${range[1]} of ${total} items`}
      />,
    );
    expect(container?.querySelector('.ant-pagination-total-text')).toHaveTextContent(
      '1-10 of 100 items',
    );
  });
});
