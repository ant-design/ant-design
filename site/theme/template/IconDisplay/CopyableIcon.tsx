import * as React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Icon, Badge } from 'antd';
import { ThemeType } from '../../../../components/icon';

export interface CopyableIconProps {
  type: string;
  theme: ThemeType;
  isNew: boolean;
  justCopied: string | null;
  onCopied: (type: string) => any;
}

const CopyableIcon: React.SFC<CopyableIconProps> = ({
  type, theme, isNew, justCopied, onCopied,
}) => {
  return (
    <CopyToClipboard
      text={`<Icon type="${type}" theme="${theme}" />`}
      onCopy={() => onCopied(type)}
    >
      <li className={justCopied === type ? 'copied' : ''}>
        <Icon type={type} theme={theme} />
        <span className="anticon-class">
          <Badge dot={isNew}>
            {type}
          </Badge>
        </span>
      </li>
    </CopyToClipboard>
  );
};

export default CopyableIcon;
