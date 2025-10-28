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
      ${token.iconCls} {
        margin: ${cssVar.marginXS} 0;
        font-size: 36px;
        transition: transform ${cssVar.motionDurationSlow} ease-in-out;
        will-change: transform;
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
      }
    `,
    copiedCode: css`
      padding: 0 ${cssVar.paddingXXS};
      font-size: ${cssVar.fontSizeSM};
      background-color: ${cssVar.colorBgLayout};
      border-radius: ${cssVar.borderRadiusXS};
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
}

const CopyableIcon: React.FC<CopyableIconProps> = (props) => {
  const { message } = App.useApp();
  const { name, isNew, theme } = props;
  const [locale] = useLocale(locales);
  const { styles } = useStyle();

  const onCopy = (text: string) => {
    copy(text)
      .then(() => {
        message.success(
          <span>
            <code className={clsx(styles.copiedCode)}>{text}</code> copied 🎉
          </span>,
        );
      })
      .catch(() => {
        message.error(locale.errMessage);
      });
  };

  return (
    <li className={clsx(theme, styles.iconItem)} onClick={() => onCopy(`<${name} />`)}>
      {React.createElement(allIcons[name])}
      <span className={styles.anticonCls}>
        <Badge dot={isNew}>{name}</Badge>
      </span>
    </li>
  );
};

export default CopyableIcon;
