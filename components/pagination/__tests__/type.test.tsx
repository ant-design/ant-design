import React from 'react';

import type { PaginationProps } from '..';
import Pagination from '..';

describe('Pagination types', () => {
  it('Pagination showSizeChanger could accept SelectProps', () => {
    const sizeChangerRenderExcluded: 'sizeChangerRender' extends keyof PaginationProps
      ? false
      : true = true;
    const Demo = () => (
      <Pagination
        showSizeChanger={{
          notFoundContent: <div />,
          className: 'cls',
          popupMatchSelectWidth: true,
          onChange: (value) => {
            console.log(value);
          },
        }}
        components={{
          sizeChanger: ({ value, onChange }) => (
            <input
              type="number"
              value={value}
              onChange={(event) => onChange(event.target.valueAsNumber)}
            />
          ),
        }}
      />
    );
    expect(Demo).toBeTruthy();
    expect(sizeChangerRenderExcluded).toBe(true);
  });
});
