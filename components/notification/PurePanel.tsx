import * as React from 'react';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import InfoCircleFilled from '@ant-design/icons/InfoCircleFilled';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import classNames from 'classnames';
import { Notice } from 'rc-notification';
import type { NoticeProps } from 'rc-notification/lib/Notice';

import { ConfigContext } from '../config-provider';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import type { IconType } from './interface';
import useStyle from './style';
import PurePanelStyle from './style/pure-panel';

export const TypeIcon = {
  info: <InfoCircleFilled />,
  success: <CheckCircleFilled />,
  error: <CloseCircleFilled />,
  warning: <ExclamationCircleFilled />,
  loading: <LoadingOutlined />,
};

export function getCloseIcon(prefixCls: string, closeIcon?: React.ReactNode): React.ReactNode {
  if (closeIcon === null || closeIcon === false) {
    return null;
  }
  return closeIcon || <CloseOutlined className={`${prefixCls}-close-icon`} />;
}

export interface PureContentProps {
  prefixCls: string;
  icon?: React.ReactNode;
  message?: React.ReactNode;
  description?: React.ReactNode;
  btn?: React.ReactNode;
  type?: IconType;
  role?: 'alert' | 'status';
}

const typeToIcon = {
  success: CheckCircleFilled,
  info: InfoCircleFilled,
  error: CloseCircleFilled,
  warning: ExclamationCircleFilled,
};

export const PureContent: React.FC<PureContentProps> = (props) => {
  const { prefixCls, icon, type, message, description, btn, role = 'alert' } = props;
  let iconNode: React.ReactNode = null;
  if (icon) {
    iconNode = <span className={`${prefixCls}-icon`}>{icon}</span>;
  } else if (type) {
    iconNode = React.createElement(typeToIcon[type] || null, {
      className: classNames(`${prefixCls}-icon`, `${prefixCls}-icon-${type}`),
    });
  }
  return (
    <div className={classNames({ [`${prefixCls}-with-icon`]: iconNode })} role={role}>
      {iconNode}
      <div className={`${prefixCls}-message`}>{message}</div>
      <div className={`${prefixCls}-description`}>{description}</div>
      {btn && <div className={`${prefixCls}-btn`}>{btn}</div>}
    </div>
  );
};

export interface PurePanelProps
  extends Omit<NoticeProps, 'prefixCls' | 'eventKey'>,
    Omit<PureContentProps, 'prefixCls' | 'children'> {
  prefixCls?: string;
}

/** @private Internal Component. Do not use in your production. */
const PurePanel: React.FC<PurePanelProps> = (props) => {
  const {
    prefixCls: staticPrefixCls,
    className,
    icon,
    type,
    message,
    description,
    btn,
    closable = true,
    closeIcon,
    className: notificationClassName,
    ...restProps
  } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = staticPrefixCls || getPrefixCls('notification');
  const noticePrefixCls = `${prefixCls}-notice`;

  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  return wrapCSSVar(
    <div
      className={classNames(`${noticePrefixCls}-pure-panel`, hashId, className, cssVarCls, rootCls)}
    >
      <PurePanelStyle prefixCls={prefixCls} />
      <Notice
        {...restProps}
        prefixCls={prefixCls}
        eventKey="pure"
        duration={null}
        closable={closable}
        className={classNames({
          notificationClassName,
        })}
        closeIcon={getCloseIcon(prefixCls, closeIcon)}
        content={
          <PureContent
            prefixCls={noticePrefixCls}
            icon={icon}
            type={type}
            message={message}
            description={description}
            btn={btn}
          />
        }
      />
    </div>,
  );
};

export default PurePanel;
