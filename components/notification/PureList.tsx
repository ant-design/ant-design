import * as React from 'react';
import NotificationList from '@rc-component/notification/es/NotificationList';
import type {
  NotificationListConfig,
  NotificationListProps,
} from '@rc-component/notification/es/NotificationList';
import { clsx } from 'clsx';

import { useComponentConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import type { ArgsProps, NotificationPlacement, NotificationSemanticAllType } from './interface';
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
  const prefixCls = staticPrefixCls || getPrefixCls('notification');
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
          placement: (item.placement ?? placement) as NotificationPlacement,
          title: title ?? message,
          description,
          icon: iconNode,
          actions: actions ?? btn,
          closable: mergedClosable,
          className: clsx(
            type && `${noticePrefixCls}-${type}`,
            itemClassName,
            classNames?.root,
            itemClassNames.root,
          ),
          classNames: {
            wrapper: clsx(
              iconNode && `${noticePrefixCls}-content`,
              classNames?.wrapper,
              itemClassNames.wrapper,
            ),
            icon: clsx(typeIconCls, classNames?.icon, itemClassNames.icon),
            section: clsx(classNames?.section, itemClassNames.section),
            title: clsx(classNames?.title, itemClassNames.title),
            description: clsx(classNames?.description, itemClassNames.description),
            close: clsx(classNames?.close, itemClassNames.close),
            actions: clsx(classNames?.actions, itemClassNames.actions),
            progress: clsx(classNames?.progress, itemClassNames.progress),
          },
          style: {
            ...styles?.root,
            ...itemStyles.root,
            ...itemStyle,
          },
          styles: {
            wrapper: {
              ...styles?.wrapper,
              ...itemStyles.wrapper,
            },
            icon: {
              ...styles?.icon,
              ...itemStyles.icon,
            },
            section: {
              ...styles?.section,
              ...itemStyles.section,
            },
            title: {
              ...styles?.title,
              ...itemStyles.title,
            },
            description: {
              ...styles?.description,
              ...itemStyles.description,
            },
            close: {
              ...styles?.close,
              ...itemStyles.close,
            },
            actions: {
              ...styles?.actions,
              ...itemStyles.actions,
            },
            progress: {
              ...styles?.progress,
              ...itemStyles.progress,
            },
          },
        };
      }),
    [classNames, items, noticePrefixCls, placement, styles],
  );

  return (
    <NotificationList
      {...restProps}
      prefixCls={prefixCls}
      placement={placement}
      configList={configList}
      className={clsx(hashId, cssVarCls, rootCls, classNames?.list, className)}
      classNames={{
        listContent: classNames?.listContent,
      }}
      style={style}
      styles={{
        listContent: styles?.listContent,
      }}
      stack={stack}
    />
  );
};

export default PureList;
