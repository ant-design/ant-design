import * as React from 'react';
import { createStyles } from 'antd-style';
import { removeCSS, updateCSS } from 'rc-util/lib/Dom/dynamicCSS';

import useLocale from '../../../hooks/useLocale';

const whereCls = 'ant-where-checker';

const locales = {
  cn: {
    whereNotSupport: `你的浏览器不支持现代 CSS Selector，请使用现代浏览器（如 Chrome、Firefox 等等）查看官网。如果需要对旧版浏览器进行样式支持，欢迎查阅配置文档：`,
    whereDocTitle: '兼容性调整（请使用现代浏览器访问）',
    whereDocUrl: '/docs/react/customize-theme-cn#兼容性调整',
  },
  en: {
    whereNotSupport:
      'Your browser not support modern CSS Selector. Please use modern browser to view (e.g. Chrome, Firefox, etc). If you want to compatible style with legacy browser, please refer to the configuration document:',
    whereDocTitle: 'Compatible adjustment (Please use modern browser to visit)',
    whereDocUrl: '/docs/react/customize-theme#compatible-adjustment',
  },
};

const useStyle = createStyles(({ css, token }) => ({
  container: css`
    position: fixed;
    inset-inline-start: 0;
    inset-inline-end: 0;
    top: 0;
    bottom: 0;
    z-index: 99999999;
    background-color: ${token.colorTextSecondary};
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  alertBox: css`
    border: 1px solid ${token.colorWarningBorder};
    background-color: ${token.colorWarningBg};
    color: ${token.colorTextHeading};
    padding: ${token.paddingXS}px ${token.paddingSM}px;
    border-radius: ${token.borderRadiusLG}px;
    z-index: 9999999999;
    line-height: 22px;
    width: 520px;
    a {
      color: ${token.colorPrimary};
      text-decoration-line: none;
    }
  `,
}));

// Check for browser support `:where` or not
// Warning user if not support to modern browser
const InfoNewVersion: React.FC = () => {
  const [location] = useLocale(locales);
  const [supportWhere, setSupportWhere] = React.useState(true);

  React.useEffect(() => {
    const p = document.createElement('p');
    p.className = whereCls;
    p.style.position = 'fixed';
    p.style.pointerEvents = 'none';
    p.style.visibility = 'hidden';
    p.style.width = '0';
    document.body.appendChild(p);
    updateCSS(
      `
:where(.${whereCls}) {
  content: "__CHECK__";
}
    `,
      whereCls,
    );

    // Check style
    const { content } = getComputedStyle(p);
    setSupportWhere(String(content).includes('CHECK'));

    document.body.removeChild(p);
    removeCSS(whereCls);
  }, []);

  const { styles } = useStyle();

  if (supportWhere) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.alertBox}>
        {location.whereNotSupport} <a href={location.whereDocUrl}>{location.whereDocTitle}</a>
      </div>
    </div>
  );
};

export default InfoNewVersion;
