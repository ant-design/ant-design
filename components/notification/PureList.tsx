import * as React from 'react';
import NotificationList from '@rc-component/notification/es/NotificationList';
import type {
  NotificationListConfig,
  NotificationListProps,
} from '@rc-component/notification/es/NotificationList';
import { clsx } from 'clsx';

import { useComponentConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import type { ArgsProps, NotificationSemanticAllType } from './interface';
import { getCloseIcon, TypeIcon } from './PurePanel';
import useStyle from './style';

interface PureListItem extends Omit<ArgsProps, 'classNames' | 'styles'> {
  classNames?: NotificationSemanticAllType['classNames'];
  styles?: NotificationSemanticAllType['styles'];
}

export interface PureListProps
  extends Omit<
    NotificationListProps,
    'configList' | 'prefixCls' | 'classNames' | 'styles' | 'placement'
  > {
  prefixCls?: string;
  items?: PureListItem[];
  placement?: NotificationListProps['placement'];
  classNames?: NotificationSemanticAllType['classNames'];
  styles?: NotificationSemanticAllType['styles'];
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
    placement = 'topRight',
    stack = false,
    ...restProps
  } = props;
  const { getPrefixCls } = useComponentConfig('notification');
  const prefixCls = getPrefixCls('notification', staticPrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);
  const noticePrefixCls = `${prefixCls}-notice`;

  const configList = React.useMemo<NotificationListConfig[]>(
    () =>
      items.map((item, index) => {
        const {
          actions,
          btn,
          className: itemClassName,
          classNames: itemClassNames = {},
          closeIcon,
          closable = true,
          description,
          icon,
          key,
          message,
          style: itemStyle,
          styles: itemStyles = {},
          title,
          type,
          ...restItem
        } = item;
        const iconNode = icon || (type ? TypeIcon[type] : null);
        const typeIconCls = !icon && type ? `${noticePrefixCls}-icon-${type}` : undefined;
        const mergedCloseIcon = getCloseIcon(noticePrefixCls, closeIcon);
        const mergedClosable = closable
          ? {
              closeIcon: mergedCloseIcon,
              ...(typeof closable === 'object' ? closable : null),
            }
          : false;

        return {
          ...restItem,
          key: key ?? `antd-notification-${index}`,
          title: title ?? message,
          description,
          icon: iconNode,
          actions: actions ?? btn,
          closable: mergedClosable,
          className: clsx(type && `${noticePrefixCls}-${type}`, itemClassName),
          classNames: {
            root: itemClassNames.root,
            wrapper: itemClassNames.wrapper,
            icon: clsx(typeIconCls, itemClassNames.icon),
            section: itemClassNames.section,
            title: itemClassNames.title,
            description: itemClassNames.description,
            close: itemClassNames.close,
            actions: itemClassNames.actions,
            progress: itemClassNames.progress,
          },
          style: itemStyle,
          styles: itemStyles,
        };
      }),
    [items, noticePrefixCls],
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
        wrapper: clsx(`${noticePrefixCls}-content`, classNames?.wrapper),
        icon: classNames?.icon,
        section: classNames?.section,
        title: classNames?.title,
        description: classNames?.description,
        close: classNames?.close,
        actions: classNames?.actions,
        progress: classNames?.progress,
        listContent: classNames?.listContent,
      }}
      style={{ ...styles?.list, ...style }}
      styles={{
        root: styles?.root,
        wrapper: styles?.wrapper,
        icon: styles?.icon,
        section: styles?.section,
        title: styles?.title,
        description: styles?.description,
        close: styles?.close,
        actions: styles?.actions,
        progress: styles?.progress,
        listContent: styles?.listContent,
      }}
      stack={stack}
    />
  );
};

export default PureList;
