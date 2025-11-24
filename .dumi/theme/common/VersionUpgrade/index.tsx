import React from 'react';
import { Button, Flex, Modal } from 'antd';
import { useLocation, useNavigate } from 'dumi';

import useLocale from '../../../hooks/useLocale';
import * as utils from '../../utils';
import ChangeLog from './ChangeLog';

const STORAGE_KEY = 'antd-version-upgrade-notify-timestamp';
// 弹窗提醒间隔（建议以天为单位）
const NOTIFICATION_DIFF = 3 * 24 * 60 * 60 * 1000;
// 弹窗截止日期
const NOTIFICATION_DEADLINE = new Date('2025/12/01').getTime();

const locales = {
  cn: {
    title: 'Ant Design v6 现已发布',
    gettingStarted: '开始使用',
    fullChangeLog: '完整发布日志',
    v5: 'v5 文档',
  },
  en: {
    title: 'Ant Design v6 has been released',
    gettingStarted: 'Get Started',
    fullChangeLog: 'Full Changelog',
    v5: 'v5 Documentation',
  },
};

const VersionUpgradeModal = () => {
  const [locale, lang] = useLocale(locales);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [open, updateOpen] = React.useState(false);

  const isCN = lang === 'cn' || utils.isZhCN(pathname);

  function handleClose() {
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    updateOpen(false);
  }

  const onFullChangeLog = () => {
    window.open(
      isCN
        ? 'https://github.com/ant-design/ant-design/issues/55805'
        : 'https://github.com/ant-design/ant-design/issues/55804',
      '_blank',
    );
  };

  const onV5 = () => {
    window.open('https://5x.ant.design', '_blank');
  };

  const gettingStarted = () => {
    handleClose();
    navigate(utils.getLocalizedPathname('components/overview', isCN));
  };

  React.useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    let isLoadListenerAttached = false;
    function showModal() {
      const lastTime = localStorage.getItem(STORAGE_KEY);
      const now = Date.now();

      if (now > NOTIFICATION_DEADLINE) {
        return;
      }

      // If you want to disable this notification, you can set the storage key to a large number.
      // localStorage.setItem('antd-version-upgrade-notify-timestamp', Number.MAX_SAFE_INTEGER.toString());
      if (!lastTime || now - Number(lastTime) > NOTIFICATION_DIFF) {
        timer = setTimeout(() => {
          updateOpen(true);
        }, 1000);
      }
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
      onOk={gettingStarted}
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
          <Button variant="filled" color="default" onClick={onV5}>
            {locale.v5}
          </Button>
          <Flex gap="middle">
            <Button variant="filled" color="default" onClick={onFullChangeLog}>
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

export default VersionUpgradeModal;
