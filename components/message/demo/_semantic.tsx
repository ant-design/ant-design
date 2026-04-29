import React from 'react';
import NotificationList from '@rc-component/notification/es/NotificationList';
import type {
  NotificationClassNames,
  NotificationListConfig,
} from '@rc-component/notification/es/NotificationList';
import { clsx } from 'clsx';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import type { SemanticPreviewInjectionProps } from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';
import useCSSVarCls from 'antd/es/config-provider/hooks/useCSSVarCls';
import { getMessageIcon } from 'antd/es/message/PurePanel';
import useStyle from 'antd/es/message/style';

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
    listContent: 'Message list content element, set notice layout, gap and height transition styles',
    root: 'Message item root element, set background color, border radius, shadow, padding and animation styles',
    icon: 'Icon element, set font size, line height and status color styles',
    content: 'Content element, set text color, font size, line height and content display styles',
  },
};

const prefixCls = 'ant-message';
const noticePrefixCls = `${prefixCls}-notice`;

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

const MessagePreview: React.FC<SemanticPreviewInjectionProps> = ({ classNames }) => {
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);
  const noticeClassNames: NotificationClassNames = {
    listContent: classNames?.listContent,
  };

  const configList = React.useMemo<NotificationListConfig[]>(
    () => [
      {
        key: 'semantic-message-1',
        title: 'Hello, Ant Design!',
        duration: false,
        icon: getMessageIcon('success'),
        className: `${noticePrefixCls}-success`,
        classNames: {
          root: classNames?.root,
          wrapper: clsx(
            `${noticePrefixCls}-content`,
            `${prefixCls}-custom-content`,
            `${prefixCls}-success`,
          ),
          icon: clsx(`${noticePrefixCls}-icon-success`, classNames?.icon),
          title: classNames?.content,
        },
      },
      {
        key: 'semantic-message-2',
        title: 'Welcome back!',
        duration: false,
        icon: getMessageIcon('info'),
        className: `${noticePrefixCls}-info`,
        classNames: {
          root: classNames?.root,
          wrapper: clsx(
            `${noticePrefixCls}-content`,
            `${prefixCls}-custom-content`,
            `${prefixCls}-info`,
          ),
          icon: clsx(`${noticePrefixCls}-icon-info`, classNames?.icon),
          title: classNames?.content,
        },
      },
    ],
    [classNames],
  );

  return (
    <NotificationList
      prefixCls={prefixCls}
      placement="top"
      configList={configList}
      className={[hashId, cssVarCls, rootCls, classNames?.list].filter(Boolean).join(' ')}
      classNames={noticeClassNames}
      style={previewListStyle}
      stack={false}
    />
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
