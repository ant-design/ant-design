import React from 'react';
import { Button, Flex, Modal, version } from 'antd';
import { useLocation } from 'dumi';

import useLocale from '../../../hooks/useLocale';
import * as utils from '../../utils';
import ChangeLog from './ChangeLog';

const [major] = version.split('.');
const STORAGE_KEY = `antd${major}-version-upgrade-notify`;

// 弹窗截止日期
const NOTIFICATION_DEADLINE = new Date('2026/02/01').getTime();

const locales = {
  cn: {
    title: 'Ant Design 6.0 现已发布  🎉',
    fullChangeLog: '🔥 完整更新日志',
    previousVersion: '查看 v5 文档',
  },
  en: {
    title: 'Ant Design 6.0 has been released  🎉',
    fullChangeLog: '🔥 Full Changelog',
    previousVersion: 'View v5 Docs',
  },
};

const VersionUpgradeModal = () => {
  const [locale, lang] = useLocale(locales);
  const { pathname } = useLocation();

  const [open, updateOpen] = React.useState(false);

  const isCN = lang === 'cn' || utils.isZhCN(pathname);

  function handleClose() {
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    updateOpen(false);
  }

  React.useEffect(() => {
    const lastTime = localStorage.getItem(STORAGE_KEY);
    const now = Date.now();

    if (now > NOTIFICATION_DEADLINE) {
      return;
    }

    if (!lastTime) {
      const timer = setTimeout(() => {
        updateOpen(true);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, []);

  return (
    <Modal
      title={locale.title}
      open={open}
      width={`min(90vw, 800px)`}
      centered
      onCancel={handleClose}
      styles={{
        body: {
          padding: 0,
        },
      }}
      footer={() => (
        <Flex align="center" gap="middle" justify="flex-end">
          <Button
            variant="filled"
            color="default"
            type="link"
            href="https://5x.ant.design"
            target="_blank"
          >
            {locale.previousVersion}
          </Button>
          <Flex gap="middle">
            <Button
              color="primary"
              variant="solid"
              href={`https://github.com/ant-design/ant-design/issues/${isCN ? '55805' : '55804'}`}
              target="_blank"
            >
              {locale.fullChangeLog}
            </Button>
          </Flex>
        </Flex>
      )}
    >
      <ChangeLog />
    </Modal>
  );
};

export default VersionUpgradeModal;
