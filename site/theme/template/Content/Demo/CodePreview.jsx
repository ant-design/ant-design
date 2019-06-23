import React from 'react';
import { Radio, Tabs } from 'antd';

const { TabPane } = Tabs;

const LANGS = {
  tsx: 'TypeScript',
  jsx: 'JavaScript',
};

const CodePreview = ({ toReactComponent, codes }) => {
  const langList = Object.keys(codes).sort();

  return (
    <div className="highlight">
      <Tabs>
        {langList.map(lang => (
          <TabPane tab={LANGS[lang]} key={lang}>
            {toReactComponent([
              'pre',
              {
                lang,
                highlighted: codes[lang],
              },
            ])}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default CodePreview;
