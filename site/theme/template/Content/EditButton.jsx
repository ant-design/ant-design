import React from 'react';
import { Tooltip, Icon } from 'antd';

const branchUrl = 'https://github.com/ant-design/ant-design/blob/1.x-stable/';
const linkStyle = { color: 'inherit' };
const iconStyle = { fontSize: 14, marginLeft: 8, cursor: 'pointer' };
export default function EditButton({ title, filename }) {
  return (
    <Tooltip title={title}>
      <a className="edit-button" href={`${branchUrl}${filename}`} style={linkStyle}>
        <Icon type="edit" style={iconStyle} />
      </a>
    </Tooltip>
  );
}
