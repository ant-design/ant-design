import React from 'react';
import { Radio, Tabs } from 'antd';

const LANGS = {
  tsx: 'TypeScript',
  jsx: 'JavaScript',
};

const CodePreview = ({ toReactComponent, codes }) => {
  const langList = Object.keys(codes);
  const [lang, setLang] = React.useState('jsx');

  React.useEffect(() => {
    if ('tsx' in codes) {
      setLang('tsx');
    }
  }, [langList]);

  return (
    <div className="highlight">
      <div className="lang-list">
        <Radio.Group>
          {langList.map(val => (
            <Radio key={val} value={val}>
              {LANGS[val]}
            </Radio>
          ))}
        </Radio.Group>
      </div>

      {toReactComponent([
        'pre',
        {
          lang,
          highlighted: codes[lang],
        },
      ])}
    </div>
  );
};

export default CodePreview;
