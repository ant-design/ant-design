import * as React from 'react';
import {
  NotificationProvider,
  useNotification as useRcNotification,
} from '@rc-component/notification';
import type {
  NotificationAPI,
  NotificationConfig as RcNotificationConfig,
  NotificationProps as RcNotificationProps,
} from '@rc-component/notification';
import { clsx } from 'clsx';

import { resolveStyleOrClass, useMergeSemantic } from '../_util/hooks/useMergeSemantic';
import { isFunction, isNonNullable, isPlainObject } from '../_util/is';
import { devUseWarning } from '../_util/warning';
import { ConfigContext } from '../config-provider';
import { useComponentConfig } from '../config-provider/context';
import type { MessageConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import useStackConfig from '../notification/hooks/useStackConfig';
import { getPlacementOffsetStyle } from '../notification/util';
import type {
  ArgsProps,
  ConfigOptions,
  MessageInstance,
  MessageType,
  NoticeType,
  TypeOpen,
} from './interface';
import { getMessageIcon } from './PurePanel';
import useStyle from './style';
import { getMotion, wrapPromiseFn } from './util';

const DEFAULT_OFFSET = 8;
const DEFAULT_DURATION = 3;
const DEFAULT_STACK_CONFIG = false;

// ==============================================================================
// ==                                  Holder                                  ==
// ==============================================================================
type HolderProps = ConfigOptions & {
  onAllRemoved?: VoidFunction;
};

interface HolderRef extends NotificationAPI {
  prefixCls: string;
  message?: MessageConfig;
}

const Wrapper: React.FC<React.PropsWithChildren<{ prefixCls: string }>> = ({
  children,
  prefixCls,
}) => {
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
    // Placement
    top,

    // Config
    prefixCls: staticPrefixCls,
    getContainer: staticGetContainer,
    maxCount,
    duration = DEFAULT_DURATION,

    // Style
    rtl,
    classNames,
    styles,

    // Motion
    transitionName,

    // UI
    pauseOnHover = true,
    stack,

    // Life Cycle
    onAllRemoved,
  } = props;
  const { getPrefixCls, direction, getPopupContainer } = useComponentConfig('message');
  const { message } = React.useContext(ConfigContext);

  const prefixCls = staticPrefixCls || getPrefixCls('message');

  // Use useMergeSemantic to merge classNames and styles
  const [mergedClassNames, mergedStyles] = useMergeSemantic(
    [message?.classNames, classNames],
    [message?.styles, styles],
    {
      props: props as unknown as ArgsProps,
    },
  );
  // =============================== Style ===============================
  const getStyle = (): React.CSSProperties => getPlacementOffsetStyle(top ?? DEFAULT_OFFSET);

  const getClassName = () => clsx({ [`${prefixCls}-rtl`]: rtl ?? direction === 'rtl' });

  // ============================== Motion ===============================
  const getNotificationMotion = () => getMotion(prefixCls, transitionName);

  // =============================== Stack ===============================
  const stackConfig = useStackConfig(stack, DEFAULT_STACK_CONFIG);

  // ============================== Origin ===============================
  const [api, holder] = useRcNotification({
    prefixCls,
    style: getStyle,
    className: getClassName,
    motion: getNotificationMotion,

    // closable=false requires-no closeIcon
    closable: false,
    duration,
    getContainer: () => staticGetContainer?.() || getPopupContainer?.() || document.body,
    maxCount,
    onAllRemoved,
    classNames: mergedClassNames,
    styles: mergedStyles,
    renderNotifications,
    pauseOnHover,
    stack: stackConfig,
  });

  // ================================ Ref ================================
  React.useImperativeHandle(ref, () => ({
    ...api,
    prefixCls,
    message,
  }));

  return holder;
});

// ==============================================================================
// ==                                   Hook                                   ==
// ==============================================================================
let keyIndex = 0;

export function useInternalMessage(
  messageConfig?: HolderProps,
): readonly [MessageInstance, React.ReactElement] {
  const holderRef = React.useRef<HolderRef>(null);

  const warning = devUseWarning('Message');

  // ================================ API ================================
  const wrapAPI = React.useMemo<MessageInstance>(() => {
    // Wrap with notification content

    // >>> close
    const close = (key: React.Key) => {
      holderRef.current?.close(key);
    };

    // >>> Open
    const open = (config: ArgsProps): MessageType => {
      if (!holderRef.current) {
        warning(
          false,
          'usage',
          'You are calling notice in render which will break in React 18 concurrent mode. Please trigger in effect instead.',
        );
        const fakeResult: any = () => {};
        fakeResult.then = () => {};
        return fakeResult;
      }

      const { open: originOpen, prefixCls, message } = holderRef.current;

      const contextClassName = message?.className || {};
      const contextStyle = message?.style || {};

      const noticePrefixCls = `${prefixCls}-notice`;

      const {
        content,
        icon,
        type,
        key,
        className,
        style,
        onClose,
        classNames: configClassNames = {},
        styles = {},
        ...restConfig
      } = config;

      let mergedKey: React.Key = key!;
      if (!isNonNullable(mergedKey)) {
        keyIndex += 1;
        mergedKey = `antd-message-${keyIndex}`;
      }

      const contextConfig: HolderProps = { ...messageConfig, ...config };

      const semanticClassNames = resolveStyleOrClass(configClassNames, { props: contextConfig });
      const semanticStyles = resolveStyleOrClass(styles, { props: contextConfig });
      const iconNode = getMessageIcon(type, icon);
      const typeIconCls = type ? `${noticePrefixCls}-icon-${type}` : undefined;

      return wrapPromiseFn((resolve) => {
        originOpen({
          ...restConfig,
          key: mergedKey,
          icon: iconNode,
          title: content,
          classNames: {
            ...semanticClassNames,
            wrapper: clsx(type && `${prefixCls}-${type}`, semanticClassNames.wrapper),
            icon: clsx(typeIconCls, semanticClassNames.icon),
          } satisfies RcNotificationProps['classNames'],
          styles: semanticStyles satisfies RcNotificationProps['styles'],
          placement: 'top',
          className: clsx({ [`${noticePrefixCls}-${type}`]: type }, className, contextClassName),
          style: { ...contextStyle, ...style },
          onClose: () => {
            onClose?.();
            resolve();
          },
        });

        // Return close function
        return () => {
          close(mergedKey);
        };
      });
    };

    // >>> destroy
    const destroy = (key?: React.Key) => {
      if (key !== undefined) {
        close(key);
      } else {
        holderRef.current?.destroy();
      }
    };

    const clone = {
      open,
      destroy,
    } as MessageInstance;

    const keys: NoticeType[] = ['info', 'success', 'warning', 'error', 'loading'];
    keys.forEach((type) => {
      const typeOpen: TypeOpen = (jointContent, duration, onClose) => {
        let config: ArgsProps;
        if (isPlainObject(jointContent) && 'content' in jointContent) {
          config = jointContent;
        } else {
          config = { content: jointContent };
        }

        // Params
        let mergedDuration: number | undefined;
        let mergedOnClose: VoidFunction | undefined;
        if (isFunction(duration)) {
          mergedOnClose = duration;
        } else {
          mergedDuration = duration;
          mergedOnClose = onClose;
        }

        const mergedConfig = {
          onClose: mergedOnClose,
          duration: mergedDuration,
          ...config,
          type,
        };

        return open(mergedConfig);
      };

      clone[type] = typeOpen;
    });

    return clone;
  }, []);

  // ============================== Return ===============================
  return [wrapAPI, <Holder key="message-holder" {...messageConfig} ref={holderRef} />] as const;
}

export default function useMessage(messageConfig?: ConfigOptions) {
  return useInternalMessage(messageConfig);
}
