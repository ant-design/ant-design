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

const InstallDependencies: React.FC<InstallProps> = ({ npm, yarn, pnpm }) => {
  const options = [
    { key: 'npm', value: npm, label: 'npm', icon: <NpmLogo /> },
    { key: 'yarn', value: yarn, label: 'yarn', icon: <YarnLogo /> },
    { key: 'pnpm', value: pnpm, label: 'pnpm', icon: <PnpmLogo /> },
  ];

  const filteredOptions = options.filter((option) => option.value);

  if (filteredOptions.length === 0) return null;

  const renderTabPane = (option) => (
    <Tabs.TabPane
      key={option.key}
      tab={
        <span className="snippet-label">
          {option.icon}
          {option.label}
        </span>
      }
    >
      <SourceCode lang="bash">{option.value}</SourceCode>
    </Tabs.TabPane>
  );

  const tabPanes = filteredOptions.map(renderTabPane);

  return (
    <Tabs className="antd-site-snippet" defaultActiveKey={filteredOptions[0].key}>
      {tabPanes}
    </Tabs>
  );
};

export default InstallDependencies;
