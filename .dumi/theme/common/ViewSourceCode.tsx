import React from 'react';
import { Button } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import useLocale from '../../hooks/useLocale';

interface SourceCodeProps {
  pathname: string;
}

const REPO_BASE = 'https://github.com/ant-design/ant-design/blob/master';
const SOURCE_BASE = `${REPO_BASE}/components`;

export default function ViewSourceCode(props: SourceCodeProps) {
  const { pathname = '' } = props;
  const [, lang] = useLocale();
  const isZhCN = lang === 'cn';

  const componentPath = pathname.match(/\/components\/([^/]+)/)?.[1] || '';

  return (
    <Button icon={<GithubOutlined />} href={`${SOURCE_BASE}/${componentPath}/index.ts`}>
      {isZhCN ? '查看源码' : 'View Source Code'}
    </Button>
  );
}
