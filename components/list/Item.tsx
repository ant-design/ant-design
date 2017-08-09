import React from 'react';
import classNames from 'classnames';

import Icon from '../icon';

export interface ListItemProps {
  className?: string;
  children?: React.ReactNode;
  prefixCls?: string;
  style?: React.CSSProperties;
  extra: React.ReactNode;
  Meta: React.ReactNode;
  Content: React.ReactNode;
  Action: React.ReactNode;
}

export interface ListItemMetaProps {
  avatar?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  description: React.ReactNode;
  prefixCls?: string;
  style?: React.CSSProperties;
  title: React.ReactNode;
}

export interface ListItemContentProps {
  className?: string;
  children?: React.ReactNode;
  prefixCls?: string;
  style?: React.CSSProperties;
}

export interface ListItemActionProps {
  actions: any[];
  className?: string;
  children?: React.ReactNode;
  prefixCls?: string;
  style?: React.CSSProperties;
}

export const Meta = (props: ListItemMetaProps) => {
  const {
    prefixCls = 'ant-list',
    className,
    avatar,
    title,
    description,
    ...others,
  } = props;

  const classString = classNames(`${prefixCls}-item-meta`, className);

  const content = (
    <div className={`${prefixCls}-item-meta-content`}>
      {title && <h4 className={`${prefixCls}-item-meta-title`}>{title}</h4>}
      {description && <p className={`${prefixCls}-item-meta-description`}>{description}</p>}
    </div>
  );

  return (
    <div {...others} className={classString}>
      {avatar && <div className={`${prefixCls}-item-meta-avatar`}>{avatar}</div>}
      {(title || description) && content}
    </div>
  );
};

export const Content = (props: ListItemContentProps) => {
  const { prefixCls = 'ant-list', children, className, ...others } = props;
  const classString = classNames(`${prefixCls}-item-content`, className);
  return (
    <div {...others} className={classString}>
      {children}
    </div>
  );
};

export const Action = (props: ListItemActionProps) => {
  const { prefixCls = 'ant-list', children, actions, className, ...others } = props;
  const classString = classNames(`${prefixCls}-item-action`, className);

  const actionsContent = actions && actions.map((action, i) => (
      <span
        key={`antd-list-item-action-${action.text}-${i}`}
        className={`${prefixCls}-item-action-item`}
        onClick={action.onClick || (() => {})}
      >
        {action.icon && <Icon type={action.icon}/>}
        {action.text}
        {i !== (actions.length - 1) && <em className={`${prefixCls}-item-action-item-split`}/>}
      </span>
    ));

  return (
    <div {...others} className={classString}>
      {actions ? actionsContent : children}
    </div>
  );
};

export default class Item extends React.Component<ListItemProps, any> {
  static Meta: typeof Meta = Meta;
  static Content: typeof Content = Content;
  static Action: typeof Action = Action;

  render() {
    const { prefixCls = 'ant-list', children, extra, className, ...others } = this.props;
    const classString = classNames(`${prefixCls}-item`, className);

    const extraContent = <div className={`${prefixCls}-item-extra-wrap`}>
      <div className={`${prefixCls}-item-main`}>{children}</div>
      <div className={`${prefixCls}-item-extra`}>{extra}</div>
    </div>;

    return (
      <div {...others} className={classString}>
        {extra ? extraContent : children}
      </div>
    );
  }
}
