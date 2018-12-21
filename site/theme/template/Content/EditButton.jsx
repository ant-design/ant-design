import React from 'react';
import { Tooltip, Icon } from 'antd';

const branchUrl = 'https://github.com/ant-design/ant-design/edit/master/';

export default function EditButton({ title, filename }) {
  return (
    <Tooltip title={title}>
      <a
        className="edit-button"
        href={`${branchUrl}${filename}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon type="edit" />
      </a>
    </Tooltip>
  );
}
