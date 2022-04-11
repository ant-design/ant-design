import React from 'react';
import { Tag } from 'antd';

function log() {}
function preventDefault(e: React.MouseEvent) {
  e.preventDefault();
}
export default () => (
  <>
    <Tag>Tag 1</Tag>
    <Tag>
      <a href="https://github.com/ant-design/ant-design/issues/1862">Link</a>
    </Tag>
    <Tag closable onClose={log}>
      Tag 2
    </Tag>
    <Tag closable onClose={preventDefault}>
      Prevent Default
    </Tag>
  </>
);
