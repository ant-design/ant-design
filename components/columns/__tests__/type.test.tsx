import * as React from 'react';
import Columns from '..';

describe('Columns.typescript', () => {
  it('Columns', () => {
    const wrapper = (
      <div>
        <Columns>test</Columns>
      </div>
    );
    expect(wrapper).toBeTruthy();
  });
});
