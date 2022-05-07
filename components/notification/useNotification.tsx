// import * as React from 'react';
// import useRCNotification from 'rc-notification/lib/useNotification';
// import {
//   NotificationInstance as RCNotificationInstance,
//   NoticeContent as RCNoticeContent,
//   HolderReadyCallback as RCHolderReadyCallback,
// } from 'rc-notification/lib/Notification';
// import { ConfigConsumer, ConfigConsumerProps } from '../../config-provider';
// import { NotificationInstance, ArgsProps } from '..';

// export default function createUseNotification(
//   getNotificationInstance: (
//     args: ArgsProps,
//     callback: (info: { prefixCls: string; instance: RCNotificationInstance }) => void,
//   ) => void,
//   getRCNoticeProps: (args: ArgsProps, prefixCls: string) => RCNoticeContent,
// ) {
//   const useNotification = (): [NotificationInstance, React.ReactElement] => {
//     // We can only get content by render
//     let getPrefixCls: ConfigConsumerProps['getPrefixCls'];

//     // We create a proxy to handle delay created instance
//     let innerInstance: RCNotificationInstance | null = null;
//     const proxy = {
//       add: (noticeProps: RCNoticeContent, holderCallback?: RCHolderReadyCallback) => {
//         innerInstance?.component.add(noticeProps, holderCallback);
//       },
//     } as any;

//     const [hookNotify, holder] = useRCNotification(proxy);

//     function notify(args: ArgsProps) {
//       const { prefixCls: customizePrefixCls } = args;
//       const mergedPrefixCls = getPrefixCls('notification', customizePrefixCls);

//       getNotificationInstance(
//         {
//           ...args,
//           prefixCls: mergedPrefixCls,
//         },
//         ({ prefixCls, instance }) => {
//           innerInstance = instance;
//           hookNotify(getRCNoticeProps(args, prefixCls));
//         },
//       );
//     }

//     // Fill functions
//     const hookApiRef = React.useRef<any>({});

//     hookApiRef.current.open = notify;

//     ['success', 'info', 'warning', 'error'].forEach(type => {
//       hookApiRef.current[type] = (args: ArgsProps) =>
//         hookApiRef.current.open({
//           ...args,
//           type,
//         });
//     });

//     return [
//       hookApiRef.current,
//       <ConfigConsumer key="holder">
//         {(context: ConfigConsumerProps) => {
//           ({ getPrefixCls } = context);
//           return holder;
//         }}
//       </ConfigConsumer>,
//     ];
//   };

//   return useNotification;
// }

import * as React from 'react';
import { useNotification as useRcNotification } from 'rc-notification/lib';
import type { NotificationAPI } from 'rc-notification/lib';
import classNames from 'classnames';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import { ConfigContext } from '../config-provider';
import type { NotificationInstance, ArgsProps, NotificationPlacement } from './interface';
import { getPlacementStyle, getMotion } from './util';
import devWarning from '../_util/devWarning';

const typeToIcon = {
  success: CheckCircleOutlined,
  info: InfoCircleOutlined,
  error: CloseCircleOutlined,
  warning: ExclamationCircleOutlined,
};

const DEFAULT_OFFSET = 24;
const DEFAULT_DURATION = 4.5;

// ==============================================================================
// ==                                  Holder                                  ==
// ==============================================================================
interface HolderProps {
  offsets: Partial<Record<NotificationPlacement, { top?: number; bottom?: number }>>;
  staticConfig?: InternalNotificationConfig;
}
interface HolderRef extends NotificationAPI {
  prefixCls: string;
}

const Holder = React.forwardRef<HolderRef, HolderProps>(({ offsets, staticConfig }, ref) => {
  const {
    prefixCls: staticPrefixCls,
    container: staticContainer,
    maxCount,
    rtl,
  } = staticConfig || {};
  const { getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = staticPrefixCls || getPrefixCls('notification');

  // =============================== Style ===============================
  const getStyle = (placement: NotificationPlacement) => {
    const top = offsets[placement]?.top ?? DEFAULT_OFFSET;
    const bottom = offsets[placement]?.bottom ?? DEFAULT_OFFSET;
    return getPlacementStyle(placement, top, bottom);
  };

  const getClassName = () => (rtl ? `${prefixCls}-rtl` : '');

  // ============================== Motion ===============================
  const getNotificationMotion = (placement: NotificationPlacement) =>
    getMotion(prefixCls, placement);

  // ============================ Close Icon =============================
  const mergedCloseIcon = (
    <span className={`${prefixCls}-close-x`}>
      <CloseOutlined className={`${prefixCls}-close-icon`} />
    </span>
  );

  // ============================== Origin ===============================
  const [api, holder] = useRcNotification({
    prefixCls,
    style: getStyle,
    className: getClassName,
    motion: getNotificationMotion,
    closable: true,
    closeIcon: mergedCloseIcon,
    duration: DEFAULT_DURATION,
    getContainer: () => staticContainer || document.body,
    maxCount,
  });

  // ================================ Ref ================================
  React.useImperativeHandle(ref, () => ({
    ...api,
    prefixCls,
  }));

  return holder;
});

// ==============================================================================
// ==                                   Hook                                   ==
// ==============================================================================
interface InternalNotificationConfig {
  /** @private Used For global static function only. Do not use this */
  prefixCls?: string;
  /** @private Used For global static function only. Do not use this */
  container?: HTMLElement;
  maxCount?: number;
  rtl?: boolean;
}

export function useInternalNotification(
  staticConfig?: InternalNotificationConfig,
): [NotificationInstance, React.ReactElement] {
  const [placementOffsets, setPlacementOffsets] = React.useState<
    Partial<Record<NotificationPlacement, { top?: number; bottom?: number }>>
  >({});

  const holderRef = React.useRef<HolderRef>(null);

  // ================================ API ================================
  const wrapAPI = React.useMemo<NotificationInstance>(() => {
    // Wrap with notification content

    // >>> Open
    const open = (config: ArgsProps) => {
      if (!holderRef.current) {
        devWarning(
          false,
          'Notification',
          'You are calling notice in render which will break in React 18 concurrent mode. Please trigger in effect instead.',
        );
        return;
      }

      const { open: originOpen, prefixCls } = holderRef.current;
      const noticePrefixCls = `${prefixCls}-notice`;

      const {
        message,
        description,
        icon,
        type,
        placement = 'topRight',
        top,
        bottom,
        btn,
        className,
        ...restConfig
      } = config;

      setPlacementOffsets(prev => ({
        [placement]: { top, bottom },
        ...prev,
      }));

      let iconNode: React.ReactNode = null;
      if (icon) {
        iconNode = <span className={`${prefixCls}-icon`}>{icon}</span>;
      } else if (type) {
        iconNode = React.createElement(typeToIcon[type] || null, {
          className: classNames(`${noticePrefixCls}-icon`, `${noticePrefixCls}-icon-${type}`),
        });
      }

      return originOpen({
        content: (
          <div
            className={classNames({
              [`${noticePrefixCls}-with-icon`]: iconNode,
            })}
            role="alert"
          >
            {iconNode}
            <div className={`${noticePrefixCls}-message`}>{message}</div>
            <div className={`${noticePrefixCls}-description`}>{description}</div>
            {btn && <div className={`${noticePrefixCls}-btn`}>{btn}</div>}
          </div>
        ),
        placement,
        ...restConfig,
        className: classNames(type && `${noticePrefixCls}-${type}`, className),
      });
    };

    // >>> close
    const close = (key: React.Key) => {
      holderRef.current?.close(key);
    };

    // >>> destroy
    const destroy = () => {
      holderRef.current?.destroy();
    };

    const clone = {
      open,
      close,
      destroy,
    } as NotificationInstance;

    const keys = ['success', 'info', 'warning', 'error'] as const;
    keys.forEach(type => {
      clone[type] = config =>
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
    <Holder key="holder" ref={holderRef} offsets={placementOffsets} staticConfig={staticConfig} />,
  ];
}

export default function useNotification(): [NotificationInstance, React.ReactElement] {
  return useInternalNotification();
}
