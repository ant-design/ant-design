import * as React from 'react';
import NotificationList from '@rc-component/notification/es/NotificationList';
import type {
  NotificationListConfig,
  NotificationListProps,
} from '@rc-component/notification/es/NotificationList';
import { clsx } from 'clsx';

import { useComponentConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import type { ArgsProps, MessageSemanticAllType } from './interface';
import { getMessageIcon } from './PurePanel';
import useStyle from './style';

interface PureListItem extends Omit<ArgsProps, 'classNames' | 'duration' | 'styles'> {
  classNames?: MessageSemanticAllType['classNames'];
  duration?: number | false;
  styles?: MessageSemanticAllType['styles'];
}

export interface PureListProps
  extends Omit<
    NotificationListProps,
    'configList' | 'prefixCls' | 'classNames' | 'styles' | 'placement'
  > {
  prefixCls?: string;
  items?: PureListItem[];
  placement?: NotificationListProps['placement'];
  classNames?: MessageSemanticAllType['classNames'];
  styles?: MessageSemanticAllType['styles'];
}

/** @private Internal Component. Do not use in your production. */
const PureList: React.FC<PureListProps> = (props) => {
  const {
    prefixCls: staticPrefixCls,
    items = [],
    className,
    classNames,
    style,
    styles,
    placement = 'top',
    stack = false,
    ...restProps
  } = props;
  const { getPrefixCls } = useComponentConfig('message');
  const prefixCls = getPrefixCls('message', staticPrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);
  const noticePrefixCls = `${prefixCls}-notice`;

  const configList = React.useMemo<NotificationListConfig[]>(
    () =>
      items.map((item, index) => {
        const {
          content,
          icon,
          type,
          key,
          className: itemClassName,
          classNames: itemClassNames = {},
          style: itemStyle,
          styles: itemStyles = {},
          ...restItem
        } = item;
        const iconNode = getMessageIcon(type, icon);
        const hasIcon = iconNode !== null;
        const typeIconCls = type ? `${noticePrefixCls}-icon-${type}` : undefined;

        return {
          ...restItem,
          key: key ?? `antd-message-${index}`,
          icon: iconNode,
          title: content,
          className: clsx(type && `${noticePrefixCls}-${type}`, itemClassName),
          classNames: {
            root: itemClassNames.root,
            wrapper: clsx(type && `${prefixCls}-${type}`),
            icon: clsx(typeIconCls, itemClassNames.icon),
            title: clsx(!hasIcon && `${noticePrefixCls}-content`, itemClassNames.content),
          },
          style: itemStyle,
          styles: {
            root: itemStyles.root,
            icon: itemStyles.icon,
            title: itemStyles.content,
          },
        };
      }),
    [items, noticePrefixCls, prefixCls],
  );

  return (
    <NotificationList
      {...restProps}
      prefixCls={prefixCls}
      placement={placement}
      configList={configList}
      className={clsx(hashId, cssVarCls, rootCls, classNames?.list, className)}
      classNames={{
        root: classNames?.root,
        wrapper: clsx(`${noticePrefixCls}-content`, `${prefixCls}-custom-content`),
        icon: classNames?.icon,
        title: classNames?.content,
        listContent: classNames?.listContent,
      }}
      style={{ ...styles?.list, ...style }}
      styles={{
        root: styles?.root,
        icon: styles?.icon,
        title: styles?.content,
        listContent: styles?.listContent,
      }}
      stack={stack}
    />
  );
};

export default PureList;
