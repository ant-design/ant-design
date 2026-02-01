import React from 'react';
import * as AntdIcons from '@ant-design/icons';
import { App, Badge } from 'antd';
import { createStyles } from 'antd-style';
import copy from 'antd/es/_util/copy';
import { clsx } from 'clsx';

import useLocale from '../../../hooks/useLocale';
import type { ThemeType } from './IconSearch';

const allIcons: { [key: PropertyKey]: any } = AntdIcons;

const useStyle = createStyles(({ cssVar, token, css }) => {
  const { antCls, iconCls } = token;
  return {
    iconItem: css`
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-inline-start: 0 !important;
      margin-inline-end: 0 !important;
      padding-inline-start: 0 !important;
      padding-inline-end: 0 !important;
      position: relative;
      width: 200px;
      height: 100px;
      overflow: hidden;
      color: #555;
      text-align: center;
      list-style: none;
      background-color: inherit;
      border-radius: ${cssVar.borderRadiusSM};
      cursor: pointer;
      transition: all ${cssVar.motionDurationSlow} ease-in-out;
      @media (prefers-reduced-motion: reduce) {
        transition: none;
      }
      ${token.iconCls} {
        margin: ${cssVar.marginXS} 0;
        font-size: 36px;
        transition: transform ${cssVar.motionDurationSlow} ease-in-out;
        will-change: transform;
        @media (prefers-reduced-motion: reduce) {
          transition: none;
        }
      }
      &:hover {
        color: ${cssVar.colorWhite};
        background-color: ${cssVar.colorPrimary};
        ${iconCls} {
          transform: scale(1.3);
        }
        ${antCls}-badge {
          color: ${cssVar.colorWhite};
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
        inset-inline-start: 0;
        width: 100%;
        height: 100%;
        line-height: 100px;
        color: ${cssVar.colorTextLightSolid};
        text-align: center;
        background-color: ${cssVar.colorPrimary};
        opacity: 0;
        transition: all ${cssVar.motionDurationSlow} cubic-bezier(0.18, 0.89, 0.32, 1.28);
        @media (prefers-reduced-motion: reduce) {
          transition: none;
        }
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
        transition: color ${cssVar.motionDurationSlow} ease-in-out;
        @media (prefers-reduced-motion: reduce) {
          transition: none;
        }
      }
    `,
  };
});

const locales = {
  cn: {
    errMessage: '复制名称失败，请重试',
  },
  en: {
    errMessage: 'Copy icon name failed, please try again.',
  },
};

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
  const [locale] = useLocale(locales);
  const { styles } = useStyle();

  const onCopy = async (text: string) => {
    const result = await copy(text);
    if (result) {
      onCopied(name, text);
    } else {
      message.error(locale.errMessage);
    }
  };
  return (
    <li
      className={clsx(theme, styles.iconItem, { copied: justCopied === name })}
      onClick={() => onCopy(`<${name} />`)}
      style={{ cursor: 'pointer' }}
    >
      {React.createElement(allIcons[name])}
      <span className={styles.anticonCls}>
        <Badge dot={isNew}>{name}</Badge>
      </span>
    </li>
  );
};

export default CopyableIcon;
