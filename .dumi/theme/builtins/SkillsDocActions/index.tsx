import React from 'react';
import { DownloadOutlined, GithubOutlined } from '@ant-design/icons';
import { Button, Divider, Space, Typography } from 'antd';

import useLocale from '../../../hooks/useLocale';

const { Text } = Typography;
export const skillsDocLocales = {
  cn: {
    downloadButton: '下载 .skills',
    githubButton: 'GitHub',
    downloadNotePrefix: '下载为仓库压缩包，请解压后获取 ',
    downloadNoteSuffix: ' 目录。',
  },
  en: {
    downloadButton: 'Download .skills',
    githubButton: 'GitHub',
    downloadNotePrefix: 'Download provides the repository zip. Extract ',
    downloadNoteSuffix: ' after downloading.',
  },
};

const SkillsDocActions: React.FC = () => {
  const [locale] = useLocale(skillsDocLocales);

  return (
    <>
      <Space direction="vertical" size="small">
        <Space wrap>
          <Button type="primary" icon={<DownloadOutlined />} target="_blank" rel="noreferrer">
            {locale.downloadButton}
          </Button>
          <Button icon={<GithubOutlined />} target="_blank" rel="noreferrer">
            {locale.githubButton}
          </Button>
        </Space>
        <Text type="secondary">
          {locale.downloadNotePrefix}
          <Text code>.skills</Text>
          {locale.downloadNoteSuffix}
        </Text>
      </Space>
      <Divider />
    </>
  );
};

export default SkillsDocActions;
