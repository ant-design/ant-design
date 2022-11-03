import React, { type FC, useEffect, useMemo, useRef } from 'react';
import { useOutlet, useSearchParams, history } from 'dumi';
import Header from 'dumi/theme/slots/Header';
import Content from 'dumi/theme/slots/Content';
import Sidebar from 'dumi/theme/slots/Sidebar';
import Footer from 'dumi/theme/slots/Footer';
import '../../static/style';
import useLocation from '../../../hooks/useLocation';
import SiteContext from '../../slots/SiteContext';
import ConfigProvider, { DirectionType } from 'antd/es/config-provider';
import classNames from 'classnames';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import useLocale from '../../../hooks/useLocale';
import zhCN from 'antd/lib/locale/zh_CN';
import { createCache, StyleProvider } from '@ant-design/cssinjs';

const styleCache = createCache();
if (typeof global !== 'undefined') {
  (global as any).styleCache = styleCache;
}

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

const RESPONSIVE_MOBILE = 768;

const DocLayout: FC = () => {
  const outlet = useOutlet();
  const location = useLocation();
  const { pathname, search } = location;
  const [searchParams, setSearchParams] = useSearchParams();
  const [locale, lang] = useLocale(locales);

  // TODO: place doc layout here, apply for all docs route paths
  // migrate from: https://github.com/ant-design/ant-design/blob/eb9179464b9c4a93c856e1e70ddbdbaaf3f3371f/site/theme/template/Layout/index.tsx

  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  const [direction, setDirection] = React.useState<DirectionType>('ltr');

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const updateMobileMode = () => {
    setIsMobile(window.innerWidth < RESPONSIVE_MOBILE);
  };

  useEffect(() => {
    const nprogressHiddenStyle = document.getElementById('nprogress-style');
    if (nprogressHiddenStyle) {
      timerRef.current = setTimeout(() => {
        nprogressHiddenStyle.parentNode?.removeChild(nprogressHiddenStyle);
      }, 0);
    }

    // Handle direction
    const queryDirection = searchParams.get('direction');
    setDirection(queryDirection === 'rtl' ? 'rtl' : 'ltr');

    // Handle mobile mode
    updateMobileMode();
    window.addEventListener('resize', updateMobileMode);
    return () => {
      window.removeEventListener('resize', updateMobileMode);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  React.useEffect(() => {
    if (typeof (window as any).ga !== 'undefined') {
      (window as any).ga('send', 'pageview', pathname + search);
    }
    if (typeof (window as any)._hmt !== 'undefined') {
      (window as any)._hmt.push(['_trackPageview', pathname + search]);
    }
  }, [location]);

  const changeDirection = (direction: DirectionType): void => {
    setDirection(direction);
    if (direction === 'ltr') {
      searchParams.delete('direction');
    } else {
      searchParams.set('direction', 'rtl');
    }
    setSearchParams(searchParams);
  };

  const selfRender = useMemo(() => {
    return (
      ['', '/'].some(path => path === pathname) ||
      ['/index', '/resource'].some(path => pathname.startsWith(path))
    );
  }, [pathname]);

  return (
    <StyleProvider cache={styleCache}>
      <SiteContext.Provider value={{ isMobile, direction }}>
        <HelmetProvider context={{}}>
          <Helmet encodeSpecialCharacters={false}>
            <html
              lang={lang}
              data-direction={direction}
              className={classNames({ [`rtl`]: direction === 'rtl' })}
            />
            <title>{locale.title}</title>
            <link
              sizes="144x144"
              href="https://gw.alipayobjects.com/zos/antfincdn/UmVnt3t4T0/antd.png"
            />
            <meta name="description" content={locale.description} />
            <meta property="og:title" content={locale.title} />
            <meta property="og:type" content="website" />
            <meta
              property="og:image"
              content="https://gw.alipayobjects.com/zos/rmsportal/rlpTLlbMzTNYuZGGCVYM.png"
            />
          </Helmet>
          <ConfigProvider locale={lang === 'cn' ? zhCN : undefined} direction={direction}>
            <Header changeDirection={changeDirection} />
            {selfRender ? (
              <>
                {outlet}
                <Footer />
              </>
            ) : (
              <main style={{ display: 'flex', marginTop: 40 }}>
                <Sidebar />
                <Content>{outlet}</Content>
              </main>
            )}
          </ConfigProvider>
        </HelmetProvider>
      </SiteContext.Provider>
    </StyleProvider>
  );
};

export default DocLayout;
