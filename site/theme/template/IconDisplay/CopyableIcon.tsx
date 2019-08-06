import * as React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Badge } from 'antd';
import classNames from 'classnames';
import * as AntdIcons from '@ant-design/icons/es/icons';

export interface CopyableIconProps {
  name: string;
  isNew: boolean;
  justCopied: string | null;
  onCopied: (type: string, text: string) => any;
}

const CopyableIcon: React.SFC<CopyableIconProps> = ({ name, isNew, justCopied, onCopied }) => {
  const className = classNames({
    copied: justCopied === name,
  });
  return (
    <CopyToClipboard text={`<${name} />`} onCopy={(text: string) => onCopied(name, text)}>
      <li className={className}>
        {React.createElement(AntdIcons[name])}
        <span className="anticon-class">
          <Badge dot={isNew}>{name}</Badge>
        </span>
      </li>
    </CopyToClipboard>
  );
};

export default CopyableIcon;
