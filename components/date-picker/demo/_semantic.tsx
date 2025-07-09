import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { DatePicker, Flex, Segmented } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    'popup.root': '弹出框根元素',
  },
  en: {
    root: 'Root element',
    'popup.root': 'Popup root element',
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
    styles: { popup: { root: { zIndex: 1 } } },
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
      height={500}
      semantics={[
        { name: 'root', desc: locale.root, version: '5.25.0' },
        { name: 'popup.root', desc: locale['popup.root'], version: '5.25.0' },
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
