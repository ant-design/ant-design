import * as React from 'react';
import { NotificationList } from '@rc-component/notification';
import type { NotificationListConfig } from '@rc-component/notification';
import { clsx } from 'clsx';

import { useComponentConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import type { IconType, NotificationPlacement, NotificationSemanticAllType } from './interface';
import { getCloseIcon, TypeIcon } from './PurePanel';
import useStyle from './style';

interface PureListItem {
  key: React.Key;
  title: React.ReactNode;
  description: React.ReactNode;
  type: IconType;
  actions?: React.ReactNode;
  duration?: number | false;
  showProgress?: boolean;
}

export interface PureListProps {
  items: PureListItem[];
  placement?: NotificationPlacement;
  classNames?: NotificationSemanticAllType['classNames'];
  style?: React.CSSProperties;
}

/** @private Internal Component. Do not use in your production. */
const PureList: React.FC<PureListProps> = (props) => {
  const { items, classNames, placement = 'topRight', style } = props;
  const { getPrefixCls } = useComponentConfig('notification');
  const prefixCls = getPrefixCls('notification');
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);
  const noticePrefixCls = `${prefixCls}-notice`;

  const configList = items.map<NotificationListConfig>((item) => {
    const { actions, description, duration, key, showProgress, title, type } = item;
    const typeIconCls = `${noticePrefixCls}-icon-${type}`;

    return {
      key,
      actions,
      closable: {
        closeIcon: getCloseIcon(noticePrefixCls),
      },
      description,
      duration,
      icon: TypeIcon[type],
      showProgress,
      title,
      className: `${noticePrefixCls}-${type}`,
      classNames: {
        icon: typeIconCls,
      },
    };
  });

  return (
    <NotificationList
      prefixCls={prefixCls}
      placement={placement}
      configList={configList}
      className={clsx(hashId, cssVarCls, rootCls)}
      classNames={classNames}
      style={style}
      stack={false}
    />
  );
};

export default PureList;
