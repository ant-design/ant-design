jest.dontMock('../index');

import React from 'react';
import antd, {
  Button,
} from '../index';

describe('antd', function() {
  it('antd and components should be existd', function() {
    expect(antd).toBeTruthy();
    expect(Button).toBeTruthy();
  });
});
