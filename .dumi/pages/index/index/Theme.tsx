import * as React from 'react';
import { css } from '@emotion/react';
import useLocale from '../../../locales';
import useSiteToken from '../../../hooks/useSiteToken';
import { Typography } from 'antd';

const locales = {
  cn: {
    titlePrimaryColor: '主色',
    titleBorderRadius: '圆角',
    titleTheme: '主题',
  },
  default: { titlePrimaryColor: '主色', titleBorderRadius: '圆角', titleTheme: '主题' },
};

const useStyle = () => {
  const { token } = useSiteToken();

  return {
    theme: css`
      background: #e9e9e9;
      border-radius: ${token.radiusLG}px;
      padding: ${token.paddingXL}px ${token.paddingTmp * 2}px;
      display: flex;
      flex-wrap: nowrap;
      column-gap: ${token.paddingXL}px;
      align-items: stretch;
    `,

    pickers: css`
      flex: 0;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      row-gap: ${token.padding}px;
    `,

    picker: css`
      background: #fff;
      border-radius: ${token.radiusLG}px;
      padding: ${token.paddingSM}px;
      width: 240px;

      h4${token.antCls}-typography {
        margin: 0;
        font-weight: normal;
      }
    `,

    preview: css`
      flex: 1;
      background: #fff;
      border-radius: ${token.radiusLG}px;
      padding: ${token.paddingSM}px;
    `,
  };
};

interface PickerProps {
  title: React.ReactNode;
}

function Picker({ title }: PickerProps) {
  const style = useStyle();

  return (
    <div css={style.picker}>
      <Typography.Title level={4}>{title}</Typography.Title>
    </div>
  );
}

export default function Theme() {
  const style = useStyle();
  const locale = useLocale(locales);

  return (
    <div css={style.theme}>
      {/* Picker Part */}
      <div css={style.pickers}>
        <Picker title={locale.titlePrimaryColor} />
        <Picker title={locale.titleBorderRadius} />
        <Picker title={locale.titleTheme} />
      </div>

      {/* Preview */}
      <div css={style.preview} />
    </div>
  );
}
