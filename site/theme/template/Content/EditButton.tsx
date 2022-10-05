import React from 'react';
import { Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const branchUrl = 'https://github.com/ant-design/ant-design/edit/master/';

export interface EditButtonProps {
  title: React.ReactNode;
  filename?: string;
}

const EditButton: React.FC<EditButtonProps> = ({ title, filename }) => (
  <Tooltip title={title}>
    <a
      className="edit-button"
      href={`${branchUrl}${filename}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <EditOutlined />
    </a>
  </Tooltip>
);

export default EditButton;
