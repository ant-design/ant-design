import * as React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Icon as AntdIcon, Badge } from 'antd';
const Icon = AntdIcon;
const CopyableIcon = ({ type, theme, isNew, justCopied, onCopied, }) => {
    return (<CopyToClipboard text={`<Icon type="${type}" theme="${theme}" />`} onCopy={() => onCopied(type)}>
      <li className={justCopied === type ? 'copied' : ''}>
        <Icon type={type} theme={theme}/>
        <span className="anticon-class">
          <Badge dot={isNew}>
            {type}
          </Badge>
        </span>
      </li>
    </CopyToClipboard>);
};
export default CopyableIcon;
