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

import { devUseWarning } from '../_util/warning';
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
  classNames?: Partial<Record<SemanticName, string>>;
  styles?: Partial<Record<SemanticName, React.CSSProperties>>;
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
    classNames: pureContentClassNames,
  } = props;

  let iconNode: React.ReactNode = null;
  if (icon) {
    iconNode = (
      <span
        className={classNames(`${prefixCls}-icon`, pureContentClassNames?.icon)}
        style={styles?.icon}
      >
        {icon}
      </span>
    );
  } else if (type) {
    iconNode = React.createElement(typeToIcon[type] || null, {
      className: classNames(
        `${prefixCls}-icon`,
        pureContentClassNames?.icon,
        `${prefixCls}-icon-${type}`,
      ),
      style: styles?.icon,
    });
  }
  return (
    <div className={classNames({ [`${prefixCls}-with-icon`]: iconNode })} role={role}>
      {iconNode}
      <div
        className={classNames(`${prefixCls}-title`, pureContentClassNames?.title)}
        style={styles?.title}
      >
        {title}
      </div>
      <div
        className={classNames(`${prefixCls}-description`, pureContentClassNames?.description)}
        style={styles?.description}
      >
        {description}
      </div>
      {actions && (
        <div
          className={classNames(`${prefixCls}-actions`, pureContentClassNames?.actions)}
          style={styles?.actions}
        >
          {actions}
        </div>
      )}
    </div>
  );
};

export interface PurePanelProps
  extends Omit<NoticeProps, 'prefixCls' | 'eventKey' | 'classNames' | 'styles'>,
    Omit<PureContentProps, 'prefixCls' | 'children'> {
  prefixCls?: string;
  classNames?: Record<SemanticName, string>;
  styles?: Record<SemanticName, React.CSSProperties>;
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
    closable = true,
    closeIcon,
    className: notificationClassName,
    style,
    styles,
    classNames: notificationClassNames,
    ...restProps
  } = props;
  const {
    getPrefixCls,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('notification');
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

  return (
    <div
      className={classNames(
        `${noticePrefixCls}-pure-panel`,
        hashId,
        notificationClassName,
        cssVarCls,
        rootCls,
        notificationClassNames?.root,
        contextClassNames.root,
      )}
      style={{ ...contextStyles.root, ...styles?.root }}
    >
      <PurePanelStyle prefixCls={prefixCls} />
      <Notice
        style={{ ...contextStyle, ...style }}
        {...restProps}
        prefixCls={prefixCls}
        eventKey="pure"
        duration={null}
        closable={closable}
        className={classNames(notificationClassName, contextClassName)}
        closeIcon={getCloseIcon(prefixCls, closeIcon)}
        content={
          <PureContent
            classNames={{
              icon: classNames(contextClassNames.icon, notificationClassNames?.icon),
              title: classNames(contextClassNames.title, notificationClassNames?.title),
              description: classNames(
                contextClassNames.description,
                notificationClassNames?.description,
              ),
              actions: classNames(contextClassNames.actions, notificationClassNames?.actions),
            }}
            styles={{
              icon: { ...contextStyles.icon, ...styles?.icon },
              title: { ...contextStyles.title, ...styles?.title },
              description: { ...contextStyles.description, ...styles?.description },
              actions: { ...contextStyles.actions, ...styles?.actions },
            }}
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
