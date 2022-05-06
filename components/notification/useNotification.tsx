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
import classNames from 'classnames';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import { ConfigContext } from '../config-provider';
import type { NotificationInstance, ArgsProps, NotificationPlacement } from './interface';
import { getPlacementStyle, getMotion } from './util';

const typeToIcon = {
  success: CheckCircleOutlined,
  info: InfoCircleOutlined,
  error: CloseCircleOutlined,
  warning: ExclamationCircleOutlined,
};

const DEFAULT_OFFSET = 24;
const DEFAULT_DURATION = 4.5;

export default function useNotification(): [NotificationInstance, React.ReactElement] {
  const { getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('notification');
  const noticePrefixCls = `${prefixCls}-notice`;

  // =============================== Style ===============================
  const placementOffsetsRef = React.useRef<
    Partial<Record<NotificationPlacement, { top?: number; bottom?: number }>>
  >({});

  const updatePosition = (placement: NotificationPlacement, top?: number, bottom?: number) => {
    const placements = placementOffsetsRef.current;

    placements[placement] = placements[placement] || {};
    const info = placements[placement]!;
    info.top = info.top ?? top;
    info.bottom = info.bottom ?? bottom;
  };

  const getStyle = (placement: NotificationPlacement) => {
    const top = placementOffsetsRef.current[placement]?.top ?? DEFAULT_OFFSET;
    const bottom = placementOffsetsRef.current[placement]?.bottom ?? DEFAULT_OFFSET;
    return getPlacementStyle(placement, top, bottom);
  };

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
    motion: getNotificationMotion,
    closable: true,
    closeIcon: mergedCloseIcon,
    duration: DEFAULT_DURATION,
  });

  // ================================ API ================================
  const wrapAPI = React.useMemo<NotificationInstance>(() => {
    const { open: originOpen } = api;

    // Wrap with notification content
    const open = (config: ArgsProps) => {
      const {
        message,
        description,
        icon,
        type,
        placement = 'topRight',
        top,
        bottom,
        ...restConfig
      } = config;

      updatePosition(placement, top, bottom);

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
          </div>
        ),
        placement,
        ...restConfig,
      });
    };

    const clone = {
      open,
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
  }, [api]);

  // ============================== Return ===============================
  return [wrapAPI, holder];
}
