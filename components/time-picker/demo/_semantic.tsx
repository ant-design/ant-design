import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Flex, Segmented, TimePicker } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    prefix: '前缀元素',
    input: '输入框元素',
    suffix: '后缀元素',
    popup: '弹出框元素',
    popupHeader: '弹出框头部元素',
    popupBody: '弹出框主体元素',
    popupContent: '弹出框内容元素',
    popupItem: '弹出框单项元素',
    popupFooter: '弹出框底部元素',
  },
  en: {
    root: 'Root element',
    prefix: 'Prefix element',
    input: 'Input element',
    suffix: 'Suffix element',
    popup: 'Popup element',
    popupHeader: 'Popup header element',
    popupBody: 'Popup body element',
    popupContent: 'Popup content element',
    popupItem: 'Popup content item element',
    popupFooter: 'Popup footer element',
  },
};

const Block: React.FC<any> = (props) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const config = {
    ...props,
    prefix: <SmileOutlined />,
    zIndex: 1,
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
    <Flex
      vertical
      ref={divRef}
      style={{
        alignSelf: 'flex-start',
      }}
      gap="middle"
      align="center"
    >
      <Segmented
        options={['TimePicker', 'TimePicker.RangePicker']}
        onChange={(name) => props.setComponentName(name)}
      />
      {picker}
    </Flex>
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
        { name: 'popup.root', desc: locale.popup },
        { name: 'popup.header', desc: locale.popupHeader },
        { name: 'popup.body', desc: locale.popupBody },
        { name: 'popup.content', desc: locale.popupContent },
        { name: 'popup.item', desc: locale.popupItem },
        { name: 'popup.footer', desc: locale.popupFooter },
      ]}
    >
      <Block componentName={componentName} setComponentName={setComponentName} />
    </SemanticPreview>
  );
};

export default App;
