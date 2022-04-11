import React from 'react';
import { Popover, Button } from 'antd';

const content = (
  <div>
    {' '}
    <p>Content</p> <p>Content</p>{' '}
  </div>
);
export default () => (
  <Popover content={content} title="Title">
    {' '}
    <Button type="primary">Hover me</Button>{' '}
  </Popover>
);
