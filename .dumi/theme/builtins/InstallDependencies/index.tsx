import { Tabs } from 'antd';
import SourceCode from 'dumi/theme-default/builtins/SourceCode';
import React from 'react';
import NpmLogo from './npm';
import PnpmLogo from './pnpm';
import YarnLogo from './yarn';

interface InstallProps {
  npm?: string;
  yarn?: string;
  pnpm?: string;
}

const InstallDependencies: React.FC<InstallProps> = (props) => {
  const { npm, yarn, pnpm } = props;
  return (
    <Tabs
      className="antd-site-snippet"
      defaultActiveKey="npm"
      items={[
        {
          key: 'npm',
          children: <SourceCode lang="bash">{npm}</SourceCode>,
          label: (
            <div className="snippet-label">
              <NpmLogo />
              <span>npm</span>
            </div>
          ),
        },
        {
          key: 'yarn',
          children: <SourceCode lang="bash">{yarn}</SourceCode>,
          label: (
            <div className="snippet-label">
              <YarnLogo />
              <span>yarn</span>
            </div>
          ),
        },
        {
          key: 'pnpm',
          children: <SourceCode lang="bash">{pnpm}</SourceCode>,
          label: (
            <div className="snippet-label">
              <PnpmLogo />
              <span>pnpm</span>
            </div>
          ),
        },
      ]}
    />
  );
};

export default InstallDependencies;
