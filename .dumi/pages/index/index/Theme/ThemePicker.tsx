import { css } from '@emotion/react';
import { Space } from 'antd';
import * as React from 'react';
import useSiteToken from '../../../../hooks/useSiteToken';

export const THEMES: Record<string, string> = {
  default: 'https://gw.alipayobjects.com/zos/bmw-prod/ae669a89-0c65-46db-b14b-72d1c7dd46d6.svg',
  dark: 'https://gw.alipayobjects.com/zos/bmw-prod/0f93c777-5320-446b-9bb7-4d4b499f346d.svg',
  lark: 'https://gw.alipayobjects.com/zos/bmw-prod/3e899b2b-4eb4-4771-a7fc-14c7ff078aed.svg',
  comic: 'https://gw.alipayobjects.com/zos/bmw-prod/ed9b04e8-9b8d-4945-8f8a-c8fc025e846f.svg',
};

const useStyle = () => {
  const { token } = useSiteToken();

  return {
    themeCard: css`
      border-radius: ${token.radiusBase}px;
      cursor: pointer;
      outline-offset: 1px;
      transition: all ${token.motionDurationSlow};
      box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),
        0 9px 28px 8px rgba(0, 0, 0, 0.05);
    `,

    themeCardActive: css`
      outline: ${token.controlOutlineWidth * 2}px solid ${token.colorPrimary};
    `,
  };
};

export interface ThemePickerProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function ThemePicker({ value, onChange }: ThemePickerProps) {
  const { token } = useSiteToken();
  const style = useStyle();

  return (
    <Space size={token.paddingLG}>
      {Object.keys(THEMES).map(theme => {
        const url = THEMES[theme];

        return (
          <img
            key={theme}
            src={url}
            css={[style.themeCard, value === theme && style.themeCardActive]}
            onClick={() => {
              onChange?.(theme);
            }}
          />
        );
      })}
    </Space>
  );
}
