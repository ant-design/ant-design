import React from 'react';
import { EditOutlined } from '@ant-design/icons';
import { createStyles } from 'antd-style';
import { Tooltip } from 'antd';

const branchUrl = 'https://github.com/ant-design/ant-design/edit/master/';

export interface EditButtonProps {
  title: React.ReactNode;
  filename?: string;
}

const useStyle = createStyles(({ token, css }) => {
  const { colorIcon, colorText, iconCls } = token;

  return {
    editButton: css`
      a& {
        position: relative;
        top: -2px;
        display: inline-block;
        text-decoration: none;
        vertical-align: middle;
        margin-inline-start: 6px;

        ${iconCls} {
          display: block;
          color: ${colorIcon};
          font-size: 16px;
          transition: all 0.3s;

          &:hover {
            color: ${colorText};
          }
        }
      }
    `,
  };
});

export default function EditButton({ title, filename }: EditButtonProps) {
  const { styles } = useStyle();

  return (
    <Tooltip title={title}>
      <a
        className={styles.editButton}
        href={`${branchUrl}${filename}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <EditOutlined />
      </a>
    </Tooltip>
  );
}
