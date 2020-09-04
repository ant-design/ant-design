import * as React from 'react';
import Popconfirm from '..';

describe('Popconfirm.typescript', () => {
  it('Popconfirm.okType', () => {
    const form = <Popconfirm title="" okType="danger" />;

    expect(form).toBeTruthy();
  });
});
