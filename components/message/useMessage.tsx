import * as React from 'react';
import {
  NotificationProvider,
  useNotification as useRcNotification,
} from '@rc-component/notification';
import type {
  NotificationAPI,
  NotificationConfig as RcNotificationConfig,
} from '@rc-component/notification';
import { clsx } from 'clsx';

import useMergeSemantic from '../_util/hooks/useMergeSemantic';
import { devUseWarning } from '../_util/warning';
import { ConfigContext } from '../config-provider';
import { useComponentConfig } from '../config-provider/context';
import type { MessageConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import type {
  ArgsClassNamesType,
  ArgsProps,
  ArgsStylesType,
  ConfigOptions,
  MessageInstance,
  MessageType,
  NoticeType,
  ResolvedMessageClassNamesType,
  ResolvedMessageStylesType,
  TypeOpen,
} from './interface';
import { PureContent } from './PurePanel';
import useStyle from './style';
import { getMotion, wrapPromiseFn } from './util';

const DEFAULT_OFFSET = 8;
const DEFAULT_DURATION = 3;

// ==============================================================================
// ==                                  Holder                                  ==
// ==============================================================================
type HolderProps = ConfigOptions & {
  onAllRemoved?: VoidFunction;
};

interface HolderRef extends NotificationAPI {
  prefixCls: string;
  message?: MessageConfig;
  classNames: ResolvedMessageClassNamesType;
  styles: ResolvedMessageStylesType;
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
    top,
    prefixCls: staticPrefixCls,
    getContainer: staticGetContainer,
    maxCount,
    duration = DEFAULT_DURATION,
    rtl,
    transitionName,
    onAllRemoved,
    pauseOnHover = true,
  } = props;
  const { getPrefixCls, direction, getPopupContainer } = useComponentConfig('message');
  const { message } = React.useContext(ConfigContext);

  const prefixCls = staticPrefixCls || getPrefixCls('message');

  // =============================== Style ===============================
  const getStyle = (): React.CSSProperties => ({
    left: '50%',
    transform: 'translateX(-50%)',
    top: top ?? DEFAULT_OFFSET,
  });

  const getClassName = () => clsx({ [`${prefixCls}-rtl`]: rtl ?? direction === 'rtl' });

  // ============================== Motion ===============================
  const getNotificationMotion = () => getMotion(prefixCls, transitionName);

  // Use useMergeSemantic to merge classNames and styles
  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    ArgsClassNamesType,
    ArgsStylesType,
    HolderProps
  >([props?.classNames, message?.classNames], [props?.styles, message?.styles], undefined, {
    props,
  });

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
    renderNotifications,
    pauseOnHover,
  });

  // ================================ Ref ================================
  React.useImperativeHandle(ref, () => ({
    ...api,
    prefixCls,
    message,
    classNames: mergedClassNames,
    styles: mergedStyles,
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

      const {
        open: originOpen,
        prefixCls,
        message,
        classNames: originClassNames,
        styles: originStyles,
      } = holderRef.current;
      const contextClassName = message?.className || {};
      const contextStyle = message?.style || {};
      const rawContextClassNames = message?.classNames || {};
      const rawContextStyles = message?.styles || {};

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
      if (mergedKey === undefined || mergedKey === null) {
        keyIndex += 1;
        mergedKey = `antd-message-${keyIndex}`;
      }

      const contextConfig: HolderProps = { ...messageConfig, ...config };

      const resolveFunctionStyle = <T extends Record<string, any>>(
        value: T | ((config: { props: HolderProps }) => T) | undefined,
        props: HolderProps,
      ): T => (typeof value === 'function' ? value({ props }) || {} : value || {}) as T;

      const [contextClassNames, contextStyles] = [rawContextClassNames, rawContextStyles].map(
        (value) => resolveFunctionStyle(value, contextConfig),
      );
      const [semanticClassNames, semanticStyles] = [configClassNames, styles].map((value) =>
        resolveFunctionStyle(value, config),
      );

      const mergedClassNames = {
        icon: clsx(contextClassNames.icon, semanticClassNames.icon, originClassNames.icon),
        content: clsx(
          contextClassNames.content,
          semanticClassNames.content,
          originClassNames.content,
        ),
        root: clsx(contextClassNames.root, semanticClassNames.root, originClassNames.root),
      };

      const mergedStyles = {
        icon: { ...contextStyles.icon, ...semanticStyles.icon, ...originStyles.icon },
        content: { ...contextStyles.content, ...semanticStyles.content, ...originStyles.content },
        root: { ...contextStyles.root, ...semanticStyles.root, ...originStyles.root },
      };

      return wrapPromiseFn((resolve) => {
        originOpen({
          ...restConfig,
          key: mergedKey,
          content: (
            <PureContent
              prefixCls={prefixCls}
              type={type}
              icon={icon}
              classNames={mergedClassNames}
              styles={mergedStyles}
            >
              {content}
            </PureContent>
          ),
          placement: 'top',
          className: clsx(
            type && `${noticePrefixCls}-${type}`,
            className,
            contextClassName,
            mergedClassNames?.root,
          ),
          style: { ...mergedStyles?.root, ...contextStyle, ...style },
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
        if (jointContent && typeof jointContent === 'object' && 'content' in jointContent) {
          config = jointContent;
        } else {
          config = {
            content: jointContent,
          };
        }

        // Params
        let mergedDuration: number | undefined;
        let mergedOnClose: VoidFunction | undefined;
        if (typeof duration === 'function') {
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
