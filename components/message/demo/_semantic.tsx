import React from 'react';
import { message } from 'antd';
import { clsx } from 'clsx';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import type { SemanticPreviewInjectionProps } from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';
import useCSSVarCls from '../../config-provider/hooks/useCSSVarCls';
import useStyle from '../style';

const locales = {
  cn: {
    list: '消息列表根元素，设置定位、层级、宽度、滚动区域和位置样式',
    listContent: '消息列表内容元素，设置消息项排列、间距和高度动画样式',
    root: '消息项根元素，设置背景色、圆角、阴影、内边距和动画样式',
    icon: '图标元素，设置字体大小、行高和状态颜色样式',
    content: '内容元素，设置文本颜色、字号、行高和内容展示样式',
  },
  en: {
    list: 'Message list root element, set positioning, z-index, width, scroll area and placement styles',
    listContent:
      'Message list content element, set notice layout, gap and height transition styles',
    root: 'Message item root element, set background color, border radius, shadow, padding and animation styles',
    icon: 'Icon element, set font size, line height and status color styles',
    content: 'Content element, set text color, font size, line height and content display styles',
  },
};

const prefixCls = 'ant-message';
const noticePrefixCls = `${prefixCls}-notice`;
const PurePanel = message._InternalPanelDoNotUseOrYouWillBeFired;

const previewListStyle: React.CSSProperties = {
  position: 'relative',
  inset: 'auto',
  width: '100%',
  maxWidth: '100%',
  height: 'auto',
  padding: 24,
  overflow: 'visible',
  transform: 'none',
};

interface MessageNoticeProps {
  content: React.ReactNode;
  type: 'success' | 'info';
  classNames?: Record<string, string>;
}

const MessageNotice: React.FC<MessageNoticeProps> = ({ content, type, classNames }) => (
  <PurePanel
    prefixCls={prefixCls}
    className={`${noticePrefixCls}-${type}`}
    content={content}
    type={type}
    classNames={classNames}
  />
);

const MessagePreview: React.FC<SemanticPreviewInjectionProps> = ({ classNames }) => {
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  return (
    <div
      className={clsx(
        prefixCls,
        `${prefixCls}-list`,
        `${prefixCls}-top`,
        hashId,
        cssVarCls,
        rootCls,
        classNames?.list,
      )}
      style={previewListStyle}
    >
      <div className={clsx(`${prefixCls}-list-content`, classNames?.listContent)}>
        <MessageNotice content="Hello, Ant Design!" type="success" classNames={classNames} />
        <MessageNotice content="Welcome back!" type="info" classNames={classNames} />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Message"
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'icon', desc: locale.icon, version: '6.0.0' },
        { name: 'content', desc: locale.content, version: '6.0.0' },
        { name: 'list', desc: locale.list, version: '6.4.0' },
        { name: 'listContent', desc: locale.listContent, version: '6.4.0' },
      ]}
    >
      <MessagePreview />
    </SemanticPreview>
  );
};

export default App;
