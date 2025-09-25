import * as React from 'react';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import InfoCircleFilled from '@ant-design/icons/InfoCircleFilled';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import { Notice } from '@rc-component/notification';
import type { NoticeProps } from '@rc-component/notification/lib/Notice';
import classNames from 'classnames';

import useClosable, { pickClosable } from '../_util/hooks/useClosable';
import useMergeSemantic from '../_util/hooks/useMergeSemantic';
import { devUseWarning } from '../_util/warning';
import { ConfigContext } from '../config-provider';
import { useComponentConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import type { IconType, SemanticName } from './interface';
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
  /** @deprecated Please use `title` instead */
  message?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** @deprecated Please use `actions` instead */
  btn?: React.ReactNode;
  actions?: React.ReactNode;
  type?: IconType;
  role?: 'alert' | 'status';
  classNames: Required<Record<SemanticName, string>>;
  styles: Required<Record<SemanticName, React.CSSProperties>>;
}

const typeToIcon = {
  success: CheckCircleFilled,
  info: InfoCircleFilled,
  error: CloseCircleFilled,
  warning: ExclamationCircleFilled,
};

export const PureContent: React.FC<PureContentProps> = (props) => {
  const {
    prefixCls,
    icon,
    type,
    title,
    description,
    actions,
    role = 'alert',
    styles,
    classNames: pureContentCls,
  } = props;

  let iconNode: React.ReactNode = null;
  if (icon) {
    iconNode = (
      <span className={classNames(`${prefixCls}-icon`, pureContentCls.icon)} style={styles.icon}>
        {icon}
      </span>
    );
  } else if (type) {
    iconNode = React.createElement(typeToIcon[type] || null, {
      className: classNames(`${prefixCls}-icon`, pureContentCls.icon, `${prefixCls}-icon-${type}`),
      style: styles.icon,
    });
  }
  return (
    <div className={classNames({ [`${prefixCls}-with-icon`]: iconNode })} role={role}>
      {iconNode}
      <div className={classNames(`${prefixCls}-title`, pureContentCls.title)} style={styles.title}>
        {title}
      </div>
      {description && (
        <div
          className={classNames(`${prefixCls}-description`, pureContentCls.description)}
          style={styles.description}
        >
          {description}
        </div>
      )}
      {actions && (
        <div
          className={classNames(`${prefixCls}-actions`, pureContentCls.actions)}
          style={styles.actions}
        >
          {actions}
        </div>
      )}
    </div>
  );
};

export interface PurePanelProps
  extends Omit<NoticeProps, 'prefixCls' | 'eventKey' | 'classNames' | 'styles'>,
    Omit<PureContentProps, 'prefixCls' | 'children' | 'classNames' | 'styles'> {
  prefixCls?: string;
  classNames?: Record<SemanticName, string>;
  styles?: Record<SemanticName, React.CSSProperties>;
  closeIcon?: React.ReactNode;
}

/** @private Internal Component. Do not use in your production. */
const PurePanel: React.FC<PurePanelProps> = (props) => {
  const {
    prefixCls: staticPrefixCls,
    icon,
    type,
    message,
    title,
    description,
    btn,
    actions,
    closeIcon: _closeIcon,
    className: notificationClassName,
    style,
    styles,
    classNames: notificationClassNames,
    closable,
    ...restProps
  } = props;

  const {
    getPrefixCls,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('notification');

  const [mergedClassNames, mergedStyles] = useMergeSemantic(
    [contextClassNames, notificationClassNames],
    [contextStyles, styles],
  );

  const { notification: notificationContext } = React.useContext(ConfigContext);
  const mergedActions = actions ?? btn;

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Notification');
    [
      ['btn', 'actions'],
      ['message', 'title'],
    ].forEach(([deprecatedName, newName]) => {
      warning.deprecated(!(deprecatedName in props), deprecatedName, newName);
    });
  }
  const mergedTitle = title ?? message;
  const prefixCls = staticPrefixCls || getPrefixCls('notification');
  const noticePrefixCls = `${prefixCls}-notice`;

  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);
  const [rawClosable, mergedCloseIcon, , ariaProps] = useClosable(
    pickClosable(props),
    pickClosable(notificationContext),
    {
      closable: true,
      closeIcon: <CloseOutlined className={`${prefixCls}-close-icon`} />,
      closeIconRender: (icon) => getCloseIcon(prefixCls, icon),
    },
  );

  const mergedClosable = rawClosable
    ? {
        onClose: closable && typeof closable === 'object' ? closable?.onClose : undefined,
        closeIcon: mergedCloseIcon,
        ...ariaProps,
      }
    : false;

  return (
    <div
      className={classNames(
        `${noticePrefixCls}-pure-panel`,
        hashId,
        notificationClassName,
        cssVarCls,
        rootCls,
        mergedClassNames.root,
      )}
      style={mergedStyles.root}
    >
      <PurePanelStyle prefixCls={prefixCls} />
      <Notice
        style={{ ...contextStyle, ...style }}
        {...restProps}
        prefixCls={prefixCls}
        eventKey="pure"
        duration={null}
        closable={mergedClosable}
        className={classNames(notificationClassName, contextClassName)}
        content={
          <PureContent
            classNames={mergedClassNames as PureContentProps['classNames']}
            styles={mergedStyles as PureContentProps['styles']}
            prefixCls={noticePrefixCls}
            icon={icon}
            type={type}
            title={mergedTitle}
            description={description}
            actions={mergedActions}
          />
        }
      />
    </div>
  );
};

export default PurePanel;
