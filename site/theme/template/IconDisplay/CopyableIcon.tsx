import * as React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Badge, message } from '@allenai/varnish';
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

const CopyableIcon: React.FC<CopyableIconProps> = ({
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
  const onCopy = (text: string, result: boolean) => {
    if (result) {
      onCopied(name, text);
    } else {
      message.error('Copy icon name failed, please try again.');
    }
  };
  return (
    <CopyToClipboard text={`<${name} />`} onCopy={onCopy}>
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
