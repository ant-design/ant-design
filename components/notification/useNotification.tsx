import React, { useContext, useMemo } from 'react';
import type { FC, PropsWithChildren } from 'react';
import {
  NotificationProvider,
  useNotification as useRcNotification,
} from '@rc-component/notification';
import type {
  NotificationAPI,
  NotificationConfig as RcNotificationConfig,
} from '@rc-component/notification';
import { clsx } from 'clsx';

import {
  computeClosable,
  mergeClassNames,
  mergeStyles,
  pickClosable,
  resolveStyleOrClass,
  useMergeSemantic,
} from '../_util/hooks';
import { devUseWarning } from '../_util/warning';
import { ConfigContext } from '../config-provider';
import { useComponentConfig } from '../config-provider/context';
import type { NotificationConfig as CPNotificationConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import { useToken } from '../theme/internal';
import type {
  ArgsProps,
  NotificationConfig,
  NotificationInstance,
  NotificationPlacement,
  NotificationSemanticType,
} from './interface';
import { getCloseIcon, PureContent } from './PurePanel';
import useStyle from './style';
import { getCloseIconConfig, getMotion, getPlacementStyle } from './util';

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
  notification?: CPNotificationConfig;
  classNames?: NotificationSemanticType['classNames'];
  styles?: NotificationSemanticType['styles'];
}

const Wrapper: FC<PropsWithChildren<{ prefixCls: string }>> = ({ children, prefixCls }) => {
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);
  return (
    <NotificationProvider classNames={{ list: clsx(hashId, cssVarCls, rootCls) }}>
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
    duration = DEFAULT_DURATION,
    pauseOnHover = true,
    showProgress,
  } = props;
  const { getPrefixCls, getPopupContainer, direction } = useComponentConfig('notification');
  const { notification } = useContext(ConfigContext);
  const [, token] = useToken();

  const prefixCls = staticPrefixCls || getPrefixCls('notification');
  const mergedDuration = useMemo(
    () => (typeof duration === 'number' && duration > 0 ? duration : false),
    [duration],
  );

  // =============================== Style ===============================
  const getStyle = (placement: NotificationPlacement): React.CSSProperties =>
    getPlacementStyle(placement, top ?? DEFAULT_OFFSET, bottom ?? DEFAULT_OFFSET);

  const getClassName = () => clsx({ [`${prefixCls}-rtl`]: rtl ?? direction === 'rtl' });

  // ============================== Motion ===============================
  const getNotificationMotion = () => getMotion(prefixCls);

  // ============================== Origin ===============================
  const [api, holder] = useRcNotification({
    prefixCls,
    style: getStyle,
    className: getClassName,
    motion: getNotificationMotion,
    closable: { closeIcon: getCloseIcon(prefixCls) },
    duration: mergedDuration,
    getContainer: () => staticGetContainer?.() || getPopupContainer?.() || document.body,
    maxCount,
    pauseOnHover,
    showProgress,
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

  const [mergedClassNames, mergedStyles] = useMergeSemantic(
    [notification?.classNames, props?.classNames],
    [notification?.styles, props?.styles],
    {
      props,
    },
  );

  // ================================ Ref ================================
  React.useImperativeHandle(ref, () => ({
    ...api,
    prefixCls,
    notification,
    classNames: mergedClassNames,
    styles: mergedStyles,
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
  const { notification: notificationContext } = React.useContext(ConfigContext);
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

      const {
        open: originOpen,
        prefixCls,
        notification,
        classNames: originClassNames,
        styles: originStyles,
      } = holderRef.current;
      const contextClassName = notification?.className || {};
      const contextStyle = notification?.style || {};

      const noticePrefixCls = `${prefixCls}-notice`;
      const {
        title,
        message,
        description,
        icon,
        type,
        btn,
        actions,
        className,
        style,
        role = 'alert',
        closeIcon,
        closable,
        classNames: configClassNames = {},
        styles = {},
        ...restConfig
      } = config;
      if (process.env.NODE_ENV !== 'production') {
        [
          ['btn', 'actions'],
          ['message', 'title'],
        ].forEach(([deprecatedName, newName]) => {
          warning.deprecated(!(deprecatedName in config), deprecatedName, newName);
        });
      }
      const mergedTitle = title ?? message;
      const mergedActions = actions ?? btn;

      const realCloseIcon = getCloseIcon(
        noticePrefixCls,
        getCloseIconConfig(closeIcon, notificationConfig, notification),
      );
      const [rawClosable, mergedCloseIcon, , ariaProps] = computeClosable(
        pickClosable({ ...(notificationConfig || {}), ...config }),
        pickClosable(notificationContext),
        {
          closable: true,
          closeIcon: realCloseIcon,
        },
      );

      const mergedClosable = rawClosable
        ? {
            onClose: closable && typeof closable === 'object' ? closable.onClose : undefined,
            closeIcon: mergedCloseIcon,
            ...ariaProps,
          }
        : false;

      const semanticClassNames = resolveStyleOrClass(configClassNames, { props: config });
      const semanticStyles = resolveStyleOrClass(styles, { props: config });

      const mergedClassNames = mergeClassNames(undefined, originClassNames, semanticClassNames);

      const mergedStyles = mergeStyles(originStyles, semanticStyles);

      return originOpen({
        // use placement from props instead of hard-coding "topRight"
        placement: notificationConfig?.placement ?? DEFAULT_PLACEMENT,
        ...restConfig,
        content: (
          <PureContent
            prefixCls={noticePrefixCls}
            icon={icon}
            type={type}
            title={mergedTitle}
            description={description}
            actions={mergedActions}
            role={role}
            classNames={mergedClassNames}
            styles={mergedStyles}
          />
        ),
        className: clsx(
          { [`${noticePrefixCls}-${type}`]: type },
          className,
          contextClassName,
          mergedClassNames.root,
        ),
        style: { ...contextStyle, ...mergedStyles.root, ...style },
        closable: mergedClosable,
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
      clone[type] = (config) => open({ ...config, type });
    });

    return clone;
  }, [notificationConfig, notificationContext]);

  // ============================== Return ===============================
  return [
    wrapAPI,
    <Holder key="notification-holder" {...notificationConfig} ref={holderRef} />,
  ] as const;
}

export default function useNotification(notificationConfig?: NotificationConfig) {
  return useInternalNotification(notificationConfig);
}
