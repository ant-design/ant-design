import React from 'react';
import { FastColor } from '@ant-design/fast-color';
import { Button, version as currentVersion, Flex, Modal, Tooltip } from 'antd';
import { createStyles } from 'antd-style';
import { useLocation, useNavigate } from 'dumi';
import debounce from 'lodash/debounce';
import { useEvent } from 'rc-util';

import useLocale from '../../hooks/useLocale';
// @ts-ignore
import EN from '../../preset/latest-changelog.en-US.md';
// @ts-ignore
import CN from '../../preset/latest-changelog.zh-CN.md';
import * as utils from '../utils';

const changeLog = { cn: CN, en: EN };

const STORAGE_KEY = 'ANT_DESIGN_LAST_VISITED_VERSION';
const VER_REGEX = /^\d+\.\d+\.\d+$/;

function getLastVisitedVersion() {
  const fallbackVersion = '1.0.0';
  const lastVisitedVersion = localStorage.getItem(STORAGE_KEY);
  if (lastVisitedVersion && VER_REGEX.test(lastVisitedVersion)) {
    return lastVisitedVersion;
  }
  localStorage.setItem(STORAGE_KEY, fallbackVersion);
  return fallbackVersion;
}

function versionToWeight(version: string) {
  if (VER_REGEX.test(version)) {
    const [major, minor, patch] = version.split('.').map(Number);
    return major * 1_000_000 + minor * 1_000 + patch;
  }
  return 0;
}

const locales = {
  cn: {
    title: `v${currentVersion} 现已发布`,
    gettingStarted: '开始使用',
    fullChangeLog: '查看完整日志',
    mirror: '国内镜像',
    mirrorDesc: '前往中国大陆镜像站点',
  },
  en: {
    title: `v${currentVersion} has been released`,
    gettingStarted: 'Get Started',
    fullChangeLog: 'View Complete Changelog',
    mirror: 'China Mirror',
    mirrorDesc: 'Visit Mainland China Mirror Site',
  },
};

const useStyle = createStyles(({ css, token }, { isOverflowing }: any) => ({
  container: css`
    max-height: max(62vh, 500px);
    overflow: hidden;
    position: relative;

    ::after {
      opacity: ${isOverflowing ? 1 : 0};
      content: '';
      position: absolute;
      inset-block-end: 0;
      inset-inline-start: 0;
      width: 100%;
      height: 30%;
      pointer-events: none;
      background: linear-gradient(
        to top,
        ${token.colorBgElevated} 0%,
        ${new FastColor(token.colorBgElevated).setA(0.25).toHexString()} 100%
      );
    }
  `,
}));

const ChangeLog = () => {
  const [, lang] = useLocale();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [isOverflowing, setIsOverflowing] = React.useState(false);
  const { styles } = useStyle({ isOverflowing });

  const validatedLanguage = Object.keys(changeLog).includes(lang) ? lang : 'en';
  const C = changeLog[validatedLanguage];

  const checkOverflow = React.useMemo(
    () =>
      debounce(() => {
        const hasOverflow =
          containerRef.current?.scrollHeight! > containerRef.current?.clientHeight!;
        setIsOverflowing(hasOverflow);
      }),
    [],
  );

  // 检测溢出状态
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    checkOverflow();

    // eslint-disable-next-line compat/compat
    const resizeObserver = new ResizeObserver(checkOverflow);
    resizeObserver.observe(container);

    return function cleanup() {
      resizeObserver.disconnect();
      checkOverflow.cancel();
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <C />
    </div>
  );
};

const ChangeModal = () => {
  const [locale, lang] = useLocale(locales);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [open, updateOpen] = React.useState(false);

  const isBrowser = typeof window !== 'undefined' && typeof navigator !== 'undefined';

  const hasChinesePreference = isBrowser
    ? navigator.languages.some((lang) => lang.startsWith('zh')) || utils.isZhCN(pathname)
    : false;
  const isChineseMirror = ['ant-design.gitee.io', 'ant-design.antgroup.com'].includes(
    isBrowser ? window.location.hostname : '',
  );
  const showMirror = hasChinesePreference && !isChineseMirror;

  function handleClose() {
    localStorage.setItem(STORAGE_KEY, currentVersion);
    updateOpen(false);
  }

  const fullChangeLog = () => {
    handleClose();
    navigate(`/changelog${lang === 'cn' ? '-cn' : ''}`);
  };

  const checkVersion = useEvent(async () => {
    // The current focus is on the change log page.
    if (pathname.startsWith('/changelog')) return false;

    let lastVersion = '1.0.0';
    const lastVisitedVersion = getLastVisitedVersion();
    try {
      // eslint-disable-next-line compat/compat
      await fetch(
        isChineseMirror
          ? 'https://registry.npmmirror.com/antd/latest'
          : 'https://registry.npmjs.org/antd/latest',
      )
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error('Network response was not ok');
        })
        .then((data) => {
          if (typeof data?.version === 'string' && VER_REGEX.test(data.version)) {
            lastVersion = data.version;
          }
        });
    } catch {
      lastVersion = '1.0.0';
    }

    const currentVarWeight = versionToWeight(currentVersion);
    const lastVarWeight = versionToWeight(lastVersion);
    const lastVisitedVarWeight = versionToWeight(lastVisitedVersion);

    // If the latest version is less than the latest accessed version.
    // it indicates that the latest accessed version is invalid.
    if (lastVarWeight < lastVisitedVarWeight) {
      return true;
    }

    return currentVarWeight > lastVisitedVarWeight;
  });

  React.useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    let isLoadListenerAttached = false;
    function showModal() {
      timer = setTimeout(() => {
        checkVersion().then(updateOpen);
      }, 1000);
    }

    if (typeof window !== 'undefined') {
      if (document.readyState === 'complete') {
        showModal();
      } else {
        isLoadListenerAttached = true;
        window.addEventListener('load', showModal);
      }
    }
    return function cleanup() {
      isLoadListenerAttached && window.removeEventListener('load', showModal);
      timer && clearTimeout(timer);
    };
  }, []);

  return (
    <Modal
      title={[locale.title, ' 🎉']}
      open={open}
      width={`min(90vw, 800px)`}
      centered
      onCancel={handleClose}
      onOk={handleClose}
      styles={{
        mask: {
          backdropFilter: 'blur(2px)',
        },
        body: {
          padding: 0,
        },
      }}
      okText={locale.gettingStarted}
      footer={(_, { OkBtn }) => (
        <Flex align="center" gap="middle" justify="space-between">
          {showMirror ? (
            <Tooltip title={locale.mirrorDesc}>
              <Button
                variant="filled"
                color="default"
                icon={'🇨🇳'}
                onClick={() => {
                  window.location.href = window.location.href.replace(
                    window.location.host,
                    'ant-design.antgroup.com',
                  );
                }}
              >
                {locale.mirror}
              </Button>
            </Tooltip>
          ) : (
            <span style={{ visibility: 'hidden' }} />
          )}
          <Flex gap="middle">
            <Button variant="filled" color="default" onClick={fullChangeLog}>
              {locale.fullChangeLog}
            </Button>
            <OkBtn />
          </Flex>
        </Flex>
      )}
    >
      <ChangeLog />
    </Modal>
  );
};

export default ChangeModal;
