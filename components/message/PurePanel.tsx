import * as React from 'react';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import InfoCircleFilled from '@ant-design/icons/InfoCircleFilled';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import { Notification as RcNotification } from '@rc-component/notification';
import type { NotificationProps as RcNotificationProps } from '@rc-component/notification';
import { clsx } from 'clsx';

import { useMergeSemantic } from '../_util/hooks/useMergeSemantic';
import { useComponentConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import type { ArgsProps, MessageSemanticAllType, NoticeType } from './interface';
import useStyle, { PurePanelStyle } from './style';

export const TypeIcon = {
  info: <InfoCircleFilled />,
  success: <CheckCircleFilled />,
  error: <CloseCircleFilled />,
  warning: <ExclamationCircleFilled />,
  loading: <LoadingOutlined />,
};

export const getMessageIcon = (type?: NoticeType, icon?: React.ReactNode) =>
  icon || (type && TypeIcon[type]) || null;

export interface MessageContentProps {
  type?: NoticeType;
  icon?: React.ReactNode;
}

export interface PurePanelProps
  extends Omit<
      RcNotificationProps,
      'prefixCls' | 'classNames' | 'styles' | 'title' | 'description' | 'icon' | 'actions'
    >,
    MessageContentProps {
  prefixCls?: string;
  content?: React.ReactNode;
  classNames?: MessageSemanticAllType['classNamesAndFn'];
  styles?: MessageSemanticAllType['stylesAndFn'];
}

/** @private Internal Component. Do not use in your production. */
const PurePanel: React.FC<PurePanelProps> = (props) => {
  const {
    prefixCls: staticPrefixCls,
    className,
    style,
    type,
    icon,
    content,
    classNames: messageClassNames,
    styles,
    ...restProps
  } = props;
  const {
    getPrefixCls,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('message');

  const prefixCls = staticPrefixCls || getPrefixCls('message');
  const noticePrefixCls = `${prefixCls}-notice`;

  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const [mergedClassNames, mergedStyles] = useMergeSemantic(
    [contextClassNames, messageClassNames],
    [contextStyles, styles],
    {
      props: props as unknown as ArgsProps,
    },
  );
  const iconNode = getMessageIcon(type, icon);
  const typeIconCls = type ? `${noticePrefixCls}-icon-${type}` : undefined;
  const rcClassNames: RcNotificationProps['classNames'] = {
    wrapper: clsx(type && `${prefixCls}-${type}`, mergedClassNames.wrapper),
    icon: clsx(typeIconCls, mergedClassNames.icon),
    title: mergedClassNames.title,
  };
  const rcStyles: RcNotificationProps['styles'] = {
    wrapper: mergedStyles.wrapper,
    icon: mergedStyles.icon,
    title: mergedStyles.title,
  };

  return (
    <div
      className={clsx(
        `${noticePrefixCls}-pure-panel`,
        hashId,
        className,
        cssVarCls,
        rootCls,
        mergedClassNames.root,
      )}
      style={mergedStyles.root}
    >
      <PurePanelStyle prefixCls={prefixCls} />
      <RcNotification
        {...restProps}
        prefixCls={prefixCls}
        className={contextClassName}
        style={{ ...contextStyle, ...style }}
        duration={null}
        icon={iconNode}
        title={content}
        classNames={rcClassNames}
        styles={rcStyles}
      />
    </div>
  );
};

export default PurePanel;
