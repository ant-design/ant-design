import * as React from 'react';
import { Space } from 'antd';
import { createStyles, useTheme } from 'antd-style';
import classNames from 'classnames';

import useLocale from '../../../../hooks/useLocale';

export const THEMES = {
  default: 'https://gw.alipayobjects.com/zos/bmw-prod/ae669a89-0c65-46db-b14b-72d1c7dd46d6.svg',
  dark: 'https://gw.alipayobjects.com/zos/bmw-prod/0f93c777-5320-446b-9bb7-4d4b499f346d.svg',
  lark: 'https://gw.alipayobjects.com/zos/bmw-prod/3e899b2b-4eb4-4771-a7fc-14c7ff078aed.svg',
  comic: 'https://gw.alipayobjects.com/zos/bmw-prod/ed9b04e8-9b8d-4945-8f8a-c8fc025e846f.svg',
  v4: 'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*bOiWT4-34jkAAAAAAAAAAAAADrJ8AQ/original',
} as const;

export type THEME = keyof typeof THEMES;

const locales = {
  cn: {
    default: '默认',
    dark: '暗黑',
    lark: '知识协作',
    comic: '桃花缘',
    v4: 'V4 主题',
  },
  en: {
    default: 'Default',
    dark: 'Dark',
    lark: 'Document',
    comic: 'Blossom',
    v4: 'V4 Theme',
  },
};

const useStyle = createStyles(({ token, css }) => ({
  themeCard: css`
    border-radius: ${token.borderRadius}px;
    cursor: pointer;
    transition: all ${token.motionDurationSlow};
    overflow: hidden;
    display: inline-block;

    & > input[type='radio'] {
      width: 0;
      height: 0;
      opacity: 0;
      position: absolute;
    }

    img {
      vertical-align: top;
      box-shadow:
        0 3px 6px -4px rgba(0, 0, 0, 0.12),
        0 6px 16px 0 rgba(0, 0, 0, 0.08),
        0 9px 28px 8px rgba(0, 0, 0, 0.05);
    }

    &:focus-within,
    &:hover {
      transform: scale(1.04);
    }
  `,

  themeCardActive: css`
    box-shadow:
      0 0 0 1px ${token.colorBgContainer},
      0 0 0 ${token.controlOutlineWidth * 2 + 1}px ${token.colorPrimary};

    &,
    &:hover:not(:focus-within) {
      transform: scale(1);
    }
  `,
}));

export interface ThemePickerProps {
  id?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function ThemePicker(props: ThemePickerProps) {
  const { value, onChange, id } = props;

  const token = useTheme();
  const { styles } = useStyle();

  const [locale] = useLocale(locales);

  return (
    <Space size={token.paddingLG}>
      {Object.keys(THEMES).map((theme, index) => {
        const url = THEMES[theme as THEME];

        return (
          <Space key={theme} direction="vertical" align="center">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label
              className={classNames(styles.themeCard, value === theme && styles.themeCardActive)}
              onClick={() => {
                onChange?.(theme);
              }}
            >
              <input type="radio" name="theme" id={index === 0 ? id : undefined} />
              <img src={url} alt={theme} />
            </label>
            <span>{locale[theme as keyof typeof locale]}</span>
          </Space>
        );
      })}
    </Space>
  );
}
