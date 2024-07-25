import React from 'react';
import * as AntdIcons from '@ant-design/icons';
import { Badge, App } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import CopyToClipboard from 'react-copy-to-clipboard';

import type { ThemeType } from './IconSearch';

const allIcons: { [key: PropertyKey]: any } = AntdIcons;

const useStyle = createStyles(({ token, css }) => {
  const { antCls, iconCls } = token;
  return {
    item: css`
      &:hover {
        color: #fff;
        background-color: ${token.colorPrimary};
        ${iconCls} {
          transform: scale(1.3);
        }
        ${antCls}-badge {
          color: #fff;
        }
      }
      &.TwoTone:hover {
        background-color: #8ecafe;
      }
      &.copied:hover {
        color: rgba(255, 255, 255, 0.2);
      }
      &::after {
        content: 'Copied!';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        color: #fff;
        line-height: 110px;
        text-align: center;
        background-color: #1677ff;
        opacity: 0;
        transition: all ${token.motionDurationSlow} cubic-bezier(0.18, 0.89, 0.32, 1.28);
      }
      &.copied::after {
        opacity: 1;
      }
    `,
    anticonCls: css`
      display: block;
      font-family: 'Lucida Console', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
      white-space: nowrap;
      text-align: center;
      transform: scale(0.8);
      ${antCls}-badge {
        transition: color ${token.motionDurationSlow} ease-in-out;
      }
    `,
  };
});

export interface CopyableIconProps {
  name: string;
  isNew: boolean;
  theme: ThemeType;
  justCopied: string | null;
  onCopied: (type: string, text: string) => void;
}

const CopyableIcon: React.FC<CopyableIconProps> = (props) => {
  const { message } = App.useApp();
  const { name, isNew, justCopied, theme, onCopied } = props;
  const { styles } = useStyle();
  const onCopy = (text: string, result: boolean) => {
    if (result) {
      onCopied(name, text);
    } else {
      message.error('Copy icon name failed, please try again.');
    }
  };
  return (
    <CopyToClipboard text={`<${name} />`} onCopy={onCopy}>
      <li className={classNames(theme, styles.item, { copied: justCopied === name })}>
        {React.createElement(allIcons[name])}
        <span className={styles.anticonCls}>
          <Badge dot={isNew}>{name}</Badge>
        </span>
      </li>
    </CopyToClipboard>
  );
};

export default CopyableIcon;
