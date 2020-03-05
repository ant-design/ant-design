import * as React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Badge } from 'antd';
import classNames from 'classnames';
import * as AntdIcons from '@ant-design/icons';
import { ThemeType } from './index';

const allIcons: {
  [key: string]: any;
} = AntdIcons;

export interface CopyableIconProps {
  name: string;
  isNew: boolean;
  theme: ThemeType;
  justCopied: string | null;
  onCopied: (type: string, text: string) => any;
}

const CopyableIcon: React.SFC<CopyableIconProps> = ({
  name,
  isNew,
  justCopied,
  onCopied,
  theme,
}) => {
  const className = classNames({
    copied: justCopied === name,
    [theme]: !!theme,
  });
  return (
    <CopyToClipboard text={`<${name} />`} onCopy={(text: string) => onCopied(name, text)}>
      <li className={className}>
        {React.createElement(allIcons[name])}
        <span className="anticon-class">
          <Badge dot={isNew}>{name}</Badge>
        </span>
      </li>
    </CopyToClipboard>
  );
};

export default CopyableIcon;
