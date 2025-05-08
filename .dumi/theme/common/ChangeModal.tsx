import React from 'react';
import { FastColor } from '@ant-design/fast-color';
import { Button, version as currentVersion, Flex, Modal, Tooltip } from 'antd';
import { createStyles } from 'antd-style';
import { useNavigate } from 'dumi';
import debounce from 'lodash/debounce';
import { useEvent } from 'rc-util';

import useLocale from '../../hooks/useLocale';
// @ts-ignore
import EN from '../../preset/last-changelog.en-US.md?type=dumi-component';
// @ts-ignore
import CN from '../../preset/last-changelog.zh-CN.md?type=dumi-component';

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
    fullChangeLog: '查看全部日志',
    mirror: '国内镜像',
    mirrorDesc: '前往国内镜像',
  },
  en: {
    title: `v${currentVersion} is released`,
    gettingStarted: 'Getting Started',
    fullChangeLog: 'View Full Change Log',
    mirror: 'Chinese Mirror',
    mirrorDesc: 'Go to mainland China to mirror',
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
      backdrop-filter: blur(0.1px);
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

    const resizeObserver = new ResizeObserver(checkOverflow);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <C />
    </div>
  );
};

const ChangeModal = () => {
  const [locale, lang] = useLocale(locales);
  const navigate = useNavigate();
  const [open, updateOpen] = React.useState(false);

  const hasChinesePreference = navigator.languages.some((lang) => lang.startsWith('zh'));
  const isChineseMirror = ['ant-design.gitee.io', 'ant-design.antgroup.com'].includes(
    window.location.hostname,
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
    let lastVersion: string = '1.0.0';
    let lastVisitedVersion = getLastVisitedVersion();
    try {
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
    function showModal() {
      timer = setTimeout(() => {
        checkVersion().then(updateOpen);
      }, 1000);
    }

    window.addEventListener('load', showModal);
    return function cleanup() {
      window.removeEventListener('load', showModal);
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
