import { removeCSS, updateCSS } from 'rc-util/lib/Dom/dynamicCSS';
import * as React from 'react';
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

// Check for browser support `:where` or not
// Warning user if not support to modern browser
export default function InfoNewVersion() {
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

    return () => {
      document.body.removeChild(p);
      removeCSS(whereCls);
    };
  }, []);

  return supportWhere ? null : (
    <div
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 99999999,
        background: 'rgba(0,0,0,0.65)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          border: `1px solid #ffe58f`,
          background: '#fffbe6',
          color: 'rgba(0,0,0,0.88)',
          padding: '8px 12px',
          borderRadius: '8px',
          zIndex: 9999999999,
          lineHeight: '22px',
          width: 520,
        }}
      >
        {location.whereNotSupport}{' '}
        <a style={{ color: '#1677ff', textDecoration: 'none' }} href={location.whereDocUrl}>
          {location.whereDocTitle}
        </a>
      </div>
    </div>
  );
}
