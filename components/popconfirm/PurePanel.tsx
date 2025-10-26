import * as React from 'react';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import { clsx } from 'clsx';

import type { PopconfirmProps } from '.';
import ActionButton from '../_util/ActionButton';
import { getRenderPropValue } from '../_util/getRenderPropValue';
import type { SemanticClassNames, SemanticStyles } from '../_util/hooks';
import Button from '../button';
import { convertLegacyProps } from '../button/buttonHelpers';
import { ConfigContext } from '../config-provider';
import { useLocale } from '../locale';
import defaultLocale from '../locale/en_US';
import type { PopoverSemanticName } from '../popover';
import PopoverPurePanel from '../popover/PurePanel';
import useStyle from './style';

export interface PopconfirmLocale {
  okText: string;
  cancelText: string;
}

export interface OverlayProps
  extends Pick<
    PopconfirmProps,
    | 'icon'
    | 'okButtonProps'
    | 'cancelButtonProps'
    | 'cancelText'
    | 'okText'
    | 'okType'
    | 'showCancel'
    | 'title'
    | 'description'
    | 'onPopupClick'
  > {
  prefixCls: string;
  close?: (...args: any[]) => void;
  onConfirm?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  onCancel?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  classNames?: SemanticClassNames<PopoverSemanticName>;
  styles?: SemanticStyles<PopoverSemanticName>;
}

export const Overlay: React.FC<OverlayProps> = (props) => {
  const {
    prefixCls,
    okButtonProps,
    cancelButtonProps,
    title,
    description,
    cancelText,
    okText,
    okType = 'primary',
    icon = <ExclamationCircleFilled />,
    showCancel = true,
    close,
    onConfirm,
    onCancel,
    onPopupClick,
    classNames,
    styles,
  } = props;

  const { getPrefixCls } = React.useContext(ConfigContext);

  const [contextLocale] = useLocale('Popconfirm', defaultLocale.Popconfirm);

  const titleNode = getRenderPropValue(title);
  const descriptionNode = getRenderPropValue(description);

  return (
    <div className={`${prefixCls}-inner-content`} onClick={onPopupClick}>
      <div className={`${prefixCls}-message`}>
        {icon && <span className={`${prefixCls}-message-icon`}>{icon}</span>}
        <div className={`${prefixCls}-message-text`}>
          {titleNode && (
            <div className={clsx(`${prefixCls}-title`, classNames?.title)} style={styles?.title}>
              {titleNode}
            </div>
          )}
          {descriptionNode && (
            <div
              className={clsx(`${prefixCls}-description`, classNames?.content)}
              style={styles?.content}
            >
              {descriptionNode}
            </div>
          )}
        </div>
      </div>
      <div className={`${prefixCls}-buttons`}>
        {showCancel && (
          <Button onClick={onCancel} size="small" {...cancelButtonProps}>
            {cancelText || contextLocale?.cancelText}
          </Button>
        )}
        <ActionButton
          buttonProps={{
            size: 'small',
            ...convertLegacyProps(okType),
            ...okButtonProps,
          }}
          actionFn={onConfirm}
          close={close}
          prefixCls={getPrefixCls('btn')}
          quitOnNullishReturnValue
          emitEvent
        >
          {okText || contextLocale?.okText}
        </ActionButton>
      </div>
    </div>
  );
};

export interface PurePanelProps
  extends Omit<OverlayProps, 'prefixCls'>,
    Pick<PopconfirmProps, 'placement'> {
  className?: string;
  style?: React.CSSProperties;
  prefixCls?: string;
}

const PurePanel: React.FC<PurePanelProps> = (props) => {
  const { prefixCls: customizePrefixCls, placement, className, style, ...restProps } = props;

  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('popconfirm', customizePrefixCls);
  useStyle(prefixCls);

  return (
    <PopoverPurePanel
      placement={placement}
      className={clsx(prefixCls, className)}
      style={style}
      content={<Overlay prefixCls={prefixCls} {...restProps} />}
    />
  );
};

export default PurePanel;
