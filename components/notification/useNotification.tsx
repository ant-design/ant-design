import * as React from 'react';
import type { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import { NotificationProvider, useNotification as useRcNotification } from 'rc-notification';
import type { NotificationAPI, NotificationConfig as RcNotificationConfig } from 'rc-notification';

import { devUseWarning } from '../_util/warning';
import { ConfigContext } from '../config-provider';
import type { ComponentStyleConfig } from '../config-provider/context';
import type {
  ArgsProps,
  NotificationConfig,
  NotificationInstance,
  NotificationPlacement,
} from './interface';
import { getCloseIcon, PureContent } from './PurePanel';
import useStyle from './style';
import { getMotion, getPlacementStyle } from './util';
import { useToken } from '../theme/internal';

const DEFAULT_OFFSET = 24;
const DEFAULT_DURATION = 4.5;
const DEFAULT_PLACEMENT: NotificationPlacement = 'topRight';

// ==============================================================================
// ==                                  Holder                                  ==
// ==============================================================================
type HolderProps = NotificationConfig & {
  onAllRemoved?: VoidFunction;
};

interface HolderRef extends NotificationAPI {
  prefixCls: string;
  notification?: ComponentStyleConfig;
}

const Wrapper: FC<PropsWithChildren<{ prefixCls: string }>> = ({ children, prefixCls }) => {
  const [, hashId] = useStyle(prefixCls);
  return (
    <NotificationProvider classNames={{ list: hashId, notice: hashId }}>
      {children}
    </NotificationProvider>
  );
};

const renderNotifications: RcNotificationConfig['renderNotifications'] = (
  node,
  { prefixCls, key },
) => (
  <Wrapper prefixCls={prefixCls} key={key}>
    {node}
  </Wrapper>
);

const Holder = React.forwardRef<HolderRef, HolderProps>((props, ref) => {
  const {
    top,
    bottom,
    prefixCls: staticPrefixCls,
    getContainer: staticGetContainer,
    maxCount,
    rtl,
    onAllRemoved,
    stack,
  } = props;
  const { getPrefixCls, getPopupContainer, notification } = React.useContext(ConfigContext);
  const [, token] = useToken();

  const prefixCls = staticPrefixCls || getPrefixCls('notification');

  // =============================== Style ===============================
  const getStyle = (placement: NotificationPlacement): React.CSSProperties =>
    getPlacementStyle(placement, top ?? DEFAULT_OFFSET, bottom ?? DEFAULT_OFFSET);

  const getClassName = () => classNames({ [`${prefixCls}-rtl`]: rtl });

  // ============================== Motion ===============================
  const getNotificationMotion = () => getMotion(prefixCls);

  // ============================== Origin ===============================
  const [api, holder] = useRcNotification({
    prefixCls,
    style: getStyle,
    className: getClassName,
    motion: getNotificationMotion,
    closable: true,
    closeIcon: getCloseIcon(prefixCls),
    duration: DEFAULT_DURATION,
    getContainer: () => staticGetContainer?.() || getPopupContainer?.() || document.body,
    maxCount,
    onAllRemoved,
    renderNotifications,
    stack:
      stack === false
        ? false
        : {
            threshold: typeof stack === 'object' ? stack?.threshold : undefined,
            offset: 8,
            gap: token.margin,
          },
  });

  // ================================ Ref ================================
  React.useImperativeHandle(ref, () => ({
    ...api,
    prefixCls,
    notification,
  }));

  return holder;
});

// ==============================================================================
// ==                                   Hook                                   ==
// ==============================================================================
export function useInternalNotification(
  notificationConfig?: HolderProps,
): readonly [NotificationInstance, React.ReactElement] {
  const holderRef = React.useRef<HolderRef>(null);

  const warning = devUseWarning('Notification');

  // ================================ API ================================
  const wrapAPI = React.useMemo<NotificationInstance>(() => {
    // Wrap with notification content

    // >>> Open
    const open = (config: ArgsProps) => {
      if (!holderRef.current) {
        warning(
          false,
          'usage',
          'You are calling notice in render which will break in React 18 concurrent mode. Please trigger in effect instead.',
        );
        return;
      }

      const { open: originOpen, prefixCls, notification } = holderRef.current;

      const noticePrefixCls = `${prefixCls}-notice`;

      const {
        message,
        description,
        icon,
        type,
        btn,
        className,
        style,
        role = 'alert',
        closeIcon,
        ...restConfig
      } = config;

      const realCloseIcon = getCloseIcon(noticePrefixCls, closeIcon);

      return originOpen({
        // use placement from props instead of hard-coding "topRight"
        placement: notificationConfig?.placement ?? DEFAULT_PLACEMENT,
        ...restConfig,
        content: (
          <PureContent
            prefixCls={noticePrefixCls}
            icon={icon}
            type={type}
            message={message}
            description={description}
            btn={btn}
            role={role}
          />
        ),
        className: classNames(
          type && `${noticePrefixCls}-${type}`,
          className,
          notification?.className,
        ),
        style: { ...notification?.style, ...style },
        closeIcon: realCloseIcon,
        closable: !!realCloseIcon,
      });
    };

    // >>> destroy
    const destroy = (key?: React.Key) => {
      if (key !== undefined) {
        holderRef.current?.close(key);
      } else {
        holderRef.current?.destroy();
      }
    };

    const clone = {
      open,
      destroy,
    } as NotificationInstance;

    const keys = ['success', 'info', 'warning', 'error'] as const;
    keys.forEach((type) => {
      clone[type] = (config) =>
        open({
          ...config,
          type,
        });
    });

    return clone;
  }, []);

  // ============================== Return ===============================
  return [
    wrapAPI,
    <Holder key="notification-holder" {...notificationConfig} ref={holderRef} />,
  ] as const;
}

export default function useNotification(notificationConfig?: NotificationConfig) {
  return useInternalNotification(notificationConfig);
}
