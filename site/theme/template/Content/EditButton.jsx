import React from 'react';
import { Tooltip } from 'antd';
import { Edit } from '@ant-design/icons';

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
        <Edit />
      </a>
    </Tooltip>
  );
}
