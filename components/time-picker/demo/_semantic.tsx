import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Segmented, TimePicker } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    prefix: '前缀元素',
    input: '输入框元素',
    suffix: '后缀元素',
    popup: '弹出元素',
    content: '内容元素',
    item: '条目元素',
  },
  en: {
    root: 'Root element',
    prefix: 'Prefix element',
    input: 'Input element',
    suffix: 'Suffix element',
    popup: 'Popup element',
    content: 'Content element',
    item: 'Item element',
  },
};

const Block: React.FC<any> = (props) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const config = {
    ...props,
    prefix: <SmileOutlined />,
    zIndex: 1,
    style: { marginTop: 20 },
    open: true,
    getPopupContainer: () => divRef!.current!,
  };
  const picker =
    props.componentName === 'TimePicker' ? (
      <TimePicker {...config} />
    ) : (
      <TimePicker.RangePicker {...config} />
    );
  return (
    <div
      ref={divRef}
      style={{
        position: 'absolute',
        top: 20,
      }}
    >
      <Segmented
        options={['TimePicker', 'TimePicker.RangePicker']}
        onChange={(name) => props.setComponentName(name)}
      />
      <br />
      {picker}
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  const [componentName, setComponentName] = React.useState('TimePicker');
  return (
    <SemanticPreview
      componentName={componentName}
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'prefix', desc: locale.prefix },
        { name: 'input', desc: locale.input },
        { name: 'suffix', desc: locale.suffix },
        { name: 'popup', desc: locale.popup },
        { name: 'content', desc: locale.content },
        { name: 'item', desc: locale.item },
      ]}
    >
      <Block componentName={componentName} setComponentName={setComponentName} />
    </SemanticPreview>
  );
};

export default App;
