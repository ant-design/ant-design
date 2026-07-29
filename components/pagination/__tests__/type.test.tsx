import React from 'react';

import Pagination from '..';

describe('Pagination types', () => {
  it('Pagination showSizeChanger could accept SelectProps', () => {
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
        sizeChangerRender={({ size, onSizeChange }) => (
          <input
            type="number"
            value={size}
            onChange={(event) => onSizeChange(event.target.value)}
          />
        )}
      />
    );
    expect(Demo).toBeTruthy();
  });
});
