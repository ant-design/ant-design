/* eslint-disable no-unused-expressions */

import * as React from 'react';
import Form from '..';
import Input from '../../input';

describe('Form.typescript', () => {
  it('Form.Item', () => {
    <Form>
      <Form.Item name="test">
        <Input />
      </Form.Item>
    </Form>;
  });
});

/* eslint-enable */
