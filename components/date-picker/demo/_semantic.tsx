import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { DatePicker, Flex, Segmented } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '根元素，包含相对定位、行内flex布局、内边距、边框圆角、过渡动画等日期选择器容器的基础样式',
    prefix: '前缀元素，包含flex布局、右外边距等前缀内容的布局样式',
    input: '输入框元素，包含相对定位、宽度、颜色、字体、行高、过渡动画等输入框的核心交互样式',
    suffix: '后缀元素，包含flex布局、颜色、行高、指针事件、过渡动画等后缀内容的样式',
    popup: '弹出框元素',
    'popup.container': '容器元素，设置背景色、内边距、圆角、阴影、边框和内容展示样式',
    'popup.header': '弹出框头部元素，包含导航按钮、月份年份选择器等头部控制区域的布局和样式',
    'popup.body': '弹出框主体元素，包含日期面板表格的容器布局和样式',
    'popup.content': '弹出框内容元素，包含日期表格的宽度、边框、单元格等内容展示样式',
    'popup.item':
      '弹出框单项元素，包含日期单元格的尺寸、背景色、边框圆角、悬停态、选中态等交互样式',
    'popup.footer': '弹出框底部元素，包含确认取消按钮、快捷选择等底部操作区域的布局样式',
  },
  en: {
    root: 'Root element with relative positioning, inline-flex layout, padding, border-radius, transition animations and other basic styles for date picker container',
    prefix: 'Prefix element with flex layout and margin styles for prefix content layout',
    input:
      'Input element with relative positioning, width, color, font, line-height, transition animations and other core interactive styles for input field',
    suffix:
      'Suffix element with flex layout, color, line-height, pointer events, transition animations and other styles for suffix content',
    popup: 'Popup element',
    'popup.container':
      'Container element, set background color, padding, border radius, shadow, border and content display styles',
    'popup.header':
      'Popup header element with navigation buttons, month/year selectors and other header control area layout and styles',
    'popup.body': 'Popup body element with container layout and styles for date panel table',
    'popup.content':
      'Popup content element with width, border, cell and other content display styles for date table',
    'popup.item':
      'Popup item element with size, background, border-radius, hover state, selected state and other interactive styles for date cells',
    'popup.footer':
      'Popup footer element with layout styles for bottom operation area including confirm/cancel buttons and shortcuts',
  },
};

interface BlockProps<P> {
  singleComponent: React.ComponentType<P>;
  multipleComponent: React.ComponentType<P>;
  type: 'Single' | 'Multiple';
  setType: (type: 'Single' | 'Multiple') => void;
}

const Block: React.FC<BlockProps<any>> = (props) => {
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
    getPopupContainer: () => divRef?.current!,
    needConfirm: true,
  };

  const PickerComponent = type === 'Single' ? SingleComponent : MultipleComponent;

  return (
    <Flex vertical ref={divRef} style={{ alignSelf: 'flex-start' }} gap="middle" align="center">
      <Segmented options={['Single', 'Multiple'] as const} value={type} onChange={setType} />
      <PickerComponent {...config} />
    </Flex>
  );
};

export interface PickerSemanticTemplateProps<P> {
  locales: {
    cn: Record<string, string>;
    en: Record<string, string>;
  };
  singleComponent: [string, React.ComponentType<P>];
  multipleComponent: [string, React.ComponentType<P>];
  ignoreSemantics?: string[];
}

export const PickerSemanticTemplate: React.FC<Readonly<PickerSemanticTemplateProps<any>>> = (
  props,
) => {
  const { locales, singleComponent, multipleComponent, ignoreSemantics = [] } = props;

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
        { name: 'popup.container', desc: locale['popup.container'] },
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
};

const App: React.FC = () => {
  return (
    <PickerSemanticTemplate
      locales={locales}
      singleComponent={['DatePicker', DatePicker]}
      multipleComponent={['DatePicker.RangePicker', DatePicker.RangePicker]}
    />
  );
};

export default App;
