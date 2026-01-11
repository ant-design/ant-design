import { clsx } from 'clsx';
import dayjs from 'dayjs';

import 'dayjs/locale/zh-cn';

import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { Helmet, useOutlet, useSearchParams, useSiteData } from 'dumi';

import useLocale from '../../../hooks/useLocale';
import useLocation from '../../../hooks/useLocation';
import GlobalStyles from '../../common/GlobalStyles';
import Header from '../../slots/Header';
import SiteContext from '../../slots/SiteContext';
import IndexLayout from '../IndexLayout';
import ResourceLayout from '../ResourceLayout';
import SidebarLayout from '../SidebarLayout';
import VersionUpgrade from '../../common/VersionUpgrade';

const locales = {
  cn: {
    title: 'Ant Design - 一套企业级 UI 设计语言和 React 组件库',
    description: '基于 Ant Design 设计体系的 React UI 组件库，用于研发企业级中后台产品。',
  },
  en: {
    title: "Ant Design - The world's second most popular React UI framework",
    description:
      'An enterprise-class UI design language and React UI library with a set of high-quality React components, one of best React UI library for enterprises',
  },
};

const DocLayout: React.FC = () => {
  const outlet = useOutlet();
  const location = useLocation();
  const { pathname, search, hash } = location;
  const [locale, lang] = useLocale(locales);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null!);
  const { direction } = React.use(SiteContext);
  const { loading } = useSiteData();
  const { token } = theme.useToken();
  const [searchParams] = useSearchParams();
  const hideLayout = searchParams.get('layout') === 'false';

  useLayoutEffect(() => {
    if (lang === 'cn') {
      dayjs.locale('zh-cn');
    } else {
      dayjs.locale('en');
    }
  }, [lang]);

  const nprogressStyleRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    nprogressStyleRef.current = document.getElementById('nprogress-style');
  }, []);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      nprogressStyleRef.current?.remove();
      nprogressStyleRef.current = null;
    }, 0);
    return () => clearTimeout(timerRef.current);
  }, []);

  // handle hash change or visit page hash from Link component, and jump after async chunk loaded
  useEffect(() => {
    const id = hash.replace('#', '');
    if (id) {
      document.getElementById(decodeURIComponent(id))?.scrollIntoView();
    }
  }, [loading, hash]);

  useEffect(() => {
    if (typeof (window as any).ga !== 'undefined') {
      (window as any).ga('send', 'pageview', pathname + search);
    }
  }, [pathname, search]);

  const content = React.useMemo<React.ReactNode>(() => {
    if (['', '/'].includes(pathname) || ['/index'].some((path) => pathname.startsWith(path))) {
      return (
        <IndexLayout title={locale.title} desc={locale.description}>
          {outlet}
        </IndexLayout>
      );
    }
    if (pathname.startsWith('/docs/resource')) {
      return <ResourceLayout>{outlet}</ResourceLayout>;
    }
    if (pathname.startsWith('/theme-editor') || pathname.startsWith('/theme-market')) {
      return outlet;
    }
    return <SidebarLayout>{outlet}</SidebarLayout>;
  }, [pathname, outlet, locale.title, locale.description]);

  return (
    <>
      <Helmet encodeSpecialCharacters={false}>
        <html
          lang={lang === 'cn' ? 'zh-CN' : lang}
          data-direction={direction}
          className={clsx({ rtl: direction === 'rtl' })}
        />
        <link
          sizes="144x144"
          href="https://gw.alipayobjects.com/zos/antfincdn/UmVnt3t4T0/antd.png"
        />
        <meta property="og:description" content={locale.description} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://gw.alipayobjects.com/zos/rmsportal/rlpTLlbMzTNYuZGGCVYM.png"
        />
      </Helmet>
      <ConfigProvider
        direction={direction}
        locale={lang === 'cn' ? zhCN : undefined}
        theme={{ token: { fontFamily: `AlibabaSans, ${token.fontFamily}` } }}
      >
        <GlobalStyles />
        {!hideLayout && <Header />}
        <VersionUpgrade />
        {content}
      </ConfigProvider>
    </>
  );
};

export default DocLayout;
