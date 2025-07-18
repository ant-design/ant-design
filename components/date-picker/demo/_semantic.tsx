import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { DatePicker, Flex, Segmented } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    prefix: '前缀元素',
    input: '输入框元素',
    suffix: '后缀元素',
    popup: '弹出框元素',
    'popup.header': '弹出框头部元素',
    'popup.body': '弹出框主体元素',
    'popup.content': '弹出框内容元素',
    'popup.item': '弹出框单项元素',
    'popup.footer': '弹出框底部元素',
  },
  en: {
    root: 'Root element',
    prefix: 'Prefix element',
    input: 'Input element',
    suffix: 'Suffix element',
    popup: 'Popup element',
    'popup.header': 'Popup header element',
    'popup.body': 'Popup body element',
    'popup.content': 'Popup content element',
    'popup.item': 'Popup content item element',
    'popup.footer': 'Popup footer element',
  },
};

interface BlockProps {
  singleComponent: React.ComponentType<any>;
  multipleComponent: React.ComponentType<any>;
  type: 'Single' | 'Multiple';
  setType: (type: 'Single' | 'Multiple') => void;
}

const Block = (props: BlockProps) => {
  const {
    singleComponent: SingleComponent,
    multipleComponent: MultipleComponent,
    type,
    setType,
    ...restProps
  } = props;

  const divRef = React.useRef<HTMLDivElement>(null);
  const config = {
    ...restProps,
    prefix: <SmileOutlined />,
    zIndex: 1,
    open: true,
    getPopupContainer: () => divRef!.current!,
    needConfirm: true,
  };
  const picker =
    type === 'Single' ? <SingleComponent {...config} /> : <MultipleComponent {...config} />;

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
      <Segmented options={['Single', 'Multiple'] as const} value={type} onChange={setType} />
      {picker}
    </Flex>
  );
};

export interface PickerSemanticTemplateProps {
  singleComponent: [string, React.ComponentType<any>];
  multipleComponent: [string, React.ComponentType<any>];
  ignoreSemantics?: string[];
}

export function PickerSemanticTemplate(props: PickerSemanticTemplateProps) {
  const { singleComponent, multipleComponent, ignoreSemantics = [] } = props;

  const [type, setType] = React.useState<'Single' | 'Multiple'>('Single');
  const [locale] = useLocale(locales);

  return (
    <SemanticPreview
      componentName={type === 'Single' ? singleComponent[0] : multipleComponent[0]}
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'prefix', desc: locale.prefix },
        { name: 'input', desc: locale.input },
        { name: 'suffix', desc: locale.suffix },
        { name: 'popup.root', desc: locale.popup },
        { name: 'popup.header', desc: locale['popup.header'] },
        { name: 'popup.body', desc: locale['popup.body'] },
        { name: 'popup.content', desc: locale['popup.content'] },
        { name: 'popup.item', desc: locale['popup.item'] },
        { name: 'popup.footer', desc: locale['popup.footer'] },
      ].filter((semantic) => !ignoreSemantics.includes(semantic.name))}
    >
      <Block
        singleComponent={singleComponent[1]}
        multipleComponent={multipleComponent[1]}
        type={type}
        setType={setType}
      />
    </SemanticPreview>
  );
}

const App: React.FC = () => {
  return (
    <PickerSemanticTemplate
      singleComponent={['DatePicker', DatePicker]}
      multipleComponent={['DatePicker.RangePicker', DatePicker.RangePicker]}
    />
  );
};

export default App;
