import * as React from 'react';
import { useNotification as useRcNotification } from 'rc-notification';
import type { NotificationAPI } from 'rc-notification/lib';
import classNames from 'classnames';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import { ConfigContext } from '../config-provider';
import type {
  NotificationInstance,
  ArgsProps,
  NotificationPlacement,
  NotificationConfig,
} from './interface';
import { getPlacementStyle, getMotion } from './util';
import warning from '../_util/warning';
import useStyle from './style';

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
type HolderProps = NotificationConfig & {
  onAllRemoved?: VoidFunction;
};

interface HolderRef extends NotificationAPI {
  prefixCls: string;
}

const Holder = React.forwardRef<HolderRef, HolderProps>((props, ref) => {
  const {
    top,
    bottom,
    prefixCls: staticPrefixCls,
    getContainer: staticGetContainer,
    maxCount,
    rtl,
    onAllRemoved,
  } = props;
  const { getPrefixCls, getPopupContainer } = React.useContext(ConfigContext);

  const prefixCls = staticPrefixCls || getPrefixCls('notification');

  // =============================== Style ===============================
  const getStyle = (placement: NotificationPlacement) =>
    getPlacementStyle(placement, top ?? DEFAULT_OFFSET, bottom ?? DEFAULT_OFFSET);

  // Style
  const [, hashId] = useStyle(prefixCls);

  const getClassName = () => classNames(hashId, { [`${prefixCls}-rtl`]: rtl });

  // ============================== Motion ===============================
  const getNotificationMotion = () => getMotion(prefixCls);

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
    getContainer: () => staticGetContainer?.() || getPopupContainer?.() || document.body,
    maxCount,
    onAllRemoved,
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
export function useInternalNotification(
  notificationConfig?: HolderProps,
): [NotificationInstance, React.ReactElement] {
  const holderRef = React.useRef<HolderRef>(null);

  // ================================ API ================================
  const wrapAPI = React.useMemo<NotificationInstance>(() => {
    // Wrap with notification content

    // >>> Open
    const open = (config: ArgsProps) => {
      if (!holderRef.current) {
        warning(
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
        btn,
        className,
        ...restConfig
      } = config;

      let iconNode: React.ReactNode = null;
      if (icon) {
        iconNode = <span className={`${noticePrefixCls}-icon`}>{icon}</span>;
      } else if (type) {
        iconNode = React.createElement(typeToIcon[type] || null, {
          className: classNames(`${noticePrefixCls}-icon`, `${noticePrefixCls}-icon-${type}`),
        });
      }

      return originOpen({
        ...restConfig,
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
        className: classNames(type && `${noticePrefixCls}-${type}`, className),
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
  return [wrapAPI, <Holder key="holder" {...notificationConfig} ref={holderRef} />];
}

export default function useNotification(notificationConfig?: NotificationConfig) {
  return useInternalNotification(notificationConfig);
}
