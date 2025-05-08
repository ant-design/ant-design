import React from 'react';
import { Button, version as currentVersion, Flex, Modal } from 'antd';
import { useNavigate } from 'dumi';

import useLocale from '../../hooks/useLocale';

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
    return major * 10000 + minor * 100 + patch;
  }
  return 0;
}

const locales = {
  cn: {
    title: `v${currentVersion} 现已发布`,
    gettingStarted: '开始使用',
    fullChangeLog: '完整更新日志',
  },
  en: {
    title: `v${currentVersion} is released`,
    gettingStarted: 'Getting Started',
    fullChangeLog: 'Full Change Log',
  },
};

const ChangeModal = () => {
  const [lastVisitedVersion] = React.useState(getLastVisitedVersion);
  const [locale, lang] = useLocale(locales);
  const navigate = useNavigate();

  const hasNewVersion = React.useMemo(() => {
    const currentWeight = versionToWeight(currentVersion);
    const lastVisitedWeight = versionToWeight(lastVisitedVersion);
    return currentWeight > lastVisitedWeight;
  }, [currentVersion, lastVisitedVersion]);

  const [open, updateOpen] = React.useState(hasNewVersion);

  function handleClose() {
    localStorage.setItem(STORAGE_KEY, currentVersion);

    updateOpen(false);
  }

  const fullChangeLog = () => {
    handleClose();
    navigate(`/changelog${lang === 'cn' ? '-cn' : ''}`);
  };

  // ========== render ==========
  if (!hasNewVersion) return null;

  return (
    <Modal
      title={[locale.title, ' 🎉']}
      open={open}
      centered
      onCancel={handleClose}
      onOk={handleClose}
      styles={{
        mask: {
          backdropFilter: 'blur(4px)',
        },
      }}
      okText={locale.gettingStarted}
      footer={(_, { OkBtn }) => (
        <Flex align="center" gap={8} justify="end">
          <Button onClick={fullChangeLog}>{locale.fullChangeLog}</Button>
          <OkBtn />
        </Flex>
      )}
    >
      TODO: changelog
    </Modal>
  );
};

export default ChangeModal;
