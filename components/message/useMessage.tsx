import * as React from 'react';
import { useNotification as useRcNotification } from 'rc-notification';
import type { NotificationAPI } from 'rc-notification/lib';
import classNames from 'classnames';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import { ConfigContext } from '../config-provider';
import useStyle from './style';
import type {
  MessageInstance,
  ArgsProps,
  MessageType,
  ConfigOptions,
  NoticeType,
  TypeOpen,
} from './interface';
import { getMotion, wrapPromiseFn } from './util';
import warning from '../_util/warning';
import { PureContent } from './PurePanel';

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
  hashId: string;
}

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
  } = props;
  const { getPrefixCls, getPopupContainer } = React.useContext(ConfigContext);

  const prefixCls = staticPrefixCls || getPrefixCls('message');

  const [, hashId] = useStyle(prefixCls);

  // =============================== Style ===============================
  const getStyle = () => ({
    left: '50%',
    transform: 'translateX(-50%)',
    top: top ?? DEFAULT_OFFSET,
  });

  const getClassName = () => classNames(hashId, rtl ? `${prefixCls}-rtl` : '');

  // ============================== Motion ===============================
  const getNotificationMotion = () => getMotion(prefixCls, transitionName);

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
    closable: false,
    closeIcon: mergedCloseIcon,
    duration,
    getContainer: () => staticGetContainer?.() || getPopupContainer?.() || document.body,
    maxCount,
    onAllRemoved,
  });

  // ================================ Ref ================================
  React.useImperativeHandle(ref, () => ({
    ...api,
    prefixCls,
    hashId,
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
          'Message',
          'You are calling notice in render which will break in React 18 concurrent mode. Please trigger in effect instead.',
        );

        const fakeResult: any = () => {};
        fakeResult.then = () => {};
        return fakeResult;
      }

      const { open: originOpen, prefixCls, hashId } = holderRef.current;
      const noticePrefixCls = `${prefixCls}-notice`;

      const { content, icon, type, key, className, onClose, ...restConfig } = config;

      let mergedKey: React.Key = key!;
      if (mergedKey === undefined || mergedKey === null) {
        keyIndex += 1;
        mergedKey = `antd-message-${keyIndex}`;
      }

      return wrapPromiseFn((resolve) => {
        originOpen({
          ...restConfig,
          key: mergedKey,
          content: (
            <PureContent prefixCls={prefixCls} type={type} icon={icon}>
              {content}
            </PureContent>
          ),
          placement: 'top',
          className: classNames(type && `${noticePrefixCls}-${type}`, hashId, className),
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
