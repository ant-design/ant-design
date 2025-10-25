import React, { useEffect, useState } from 'react';
import { Alert, ConfigProvider } from 'antd';
import { createStyles } from 'antd-style';
import dayjs from 'dayjs';

import { useAntdSiteConfig } from '../../../pages/index/components/util';
import { ANT_DESIGN_NOT_SHOW_BANNER } from '../../layouts/GlobalLayout';
import * as utils from '../../utils';
import SiteContext from '../SiteContext';

const useStyle = createStyles(({ token, css }) => ({
  banner: css`
    width: 100%;
    text-align: center;
    word-break: keep-all;
    user-select: none;
  `,
  link: css`
    margin-inline-start: 10px;
    @media only screen and (max-width: ${token.mobileMaxWidth}px) {
      margin-inline-start: 0;
    }
  `,
}));

interface DelayAlertProps {
  lang: 'cn' | 'en';
}

const DelayAlert: React.FC<DelayAlertProps> = ({ lang }) => {
  const { styles } = useStyle();
  const { data: siteData } = useAntdSiteConfig();
  const { bannerVisible, updateSiteConfig } = React.use(SiteContext);

  // SSR 阶段总是不显示
  const [shouldShowBanner, setShouldShowBanner] = useState(false);

  // Get banner data from site config
  const bannerData = siteData?.headingBanner?.[lang];
  const bannerTitle = bannerData?.title || '';
  const bannerHref = bannerData?.href || '';

  const onBannerClose = () => {
    updateSiteConfig({ bannerVisible: false });

    if (utils.isLocalStorageNameSupported()) {
      localStorage.setItem(ANT_DESIGN_NOT_SHOW_BANNER, dayjs().toISOString());
    }
  };

  useEffect(() => {
    // 只有在客户端才决定是否显示 banner
    const shouldShow = Boolean(lang === 'cn' && bannerVisible && bannerTitle && bannerHref);
    setShouldShowBanner(shouldShow);
  }, [lang, bannerVisible, bannerTitle, bannerHref]);

  // SSR 阶段或不应该显示时返回 null
  if (!shouldShowBanner) {
    return null;
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorInfoBg: 'linear-gradient(90deg, #84fab0, #8fd3f4)',
          colorTextBase: '#000',
        },
      }}
    >
      <Alert
        className={styles.banner}
        message={
          <>
            <span>{bannerTitle}</span>
            <a
              className={styles.link}
              href={bannerHref}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                window.gtag?.('event', '点击', {
                  event_category: 'top_banner',
                  event_label: bannerHref,
                });
              }}
            >
              前往了解
            </a>
          </>
        }
        type="info"
        banner
        closable
        showIcon={false}
        onClose={onBannerClose}
      />
    </ConfigProvider>
  );
};

export default DelayAlert;
