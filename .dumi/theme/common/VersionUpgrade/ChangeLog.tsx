import React from 'react';
import { createStaticStyles } from 'antd-style';

import useLocale from '../../../hooks/useLocale';
import EN from './en-US.md';
import CN from './zh-CN.md';

const changeLog = { cn: CN, en: EN };

const classNames = createStaticStyles(({ css }) => ({
  container: css`
    max-height: max(62vh, 500px);
    overflow-y: scroll;
    scrollbar-width: thin;
    scrollbar-color: #eaeaea transparent;
    /* 图片铺满 */
    && img {
      display: block;
      width: 100%;
      max-width: 100%;
    }
  `,
}));

const ChangeLog = () => {
  const [, lang] = useLocale();

  const validatedLanguage = Object.keys(changeLog).includes(lang) ? lang : 'en';
  const C = changeLog[validatedLanguage];

  return (
    <div className={classNames.container}>
      <C />
    </div>
  );
};

export default ChangeLog;
