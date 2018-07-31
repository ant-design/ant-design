import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Icon, Badge } from 'antd';

const CopyableIcon = ({ type, isNew, justCopied, onCopied }) => (
  <CopyToClipboard
    text={`<Icon type="${type}" />`}
    onCopy={() => onCopied(type)}
  >
    <li className={justCopied === type ? 'copied' : ''}>
      <Icon type={type} />
      <span className="anticon-class">
        <Badge dot={isNew}>
          {type}
        </Badge>
      </span>
    </li>
  </CopyToClipboard>
);

export default CopyableIcon;
