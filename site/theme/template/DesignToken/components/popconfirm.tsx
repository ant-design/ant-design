import React from 'react';
import { Popconfirm, message } from 'antd';

function confirm() {
  message.success('Click on Yes');
}
function cancel() {
  message.error('Click on No');
}
export default () => (
  <Popconfirm
    title="Are you sure to delete this task?"
    onConfirm={confirm}
    onCancel={cancel}
    okText="Yes"
    cancelText="No"
  >
    {' '}
    <a href="#">Delete</a>{' '}
  </Popconfirm>
);
