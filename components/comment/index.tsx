import * as React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface CommentProps {
  /** List of action items rendered below the comment content */
  actions?: Array<React.ReactNode>;
  /** The element to display as the comment author. */
  author?: React.ReactNode;
  /** The element to display as the comment avatar - generally an antd Avatar */
  avatar?: React.ReactNode;
  /** className of comment */
  className?: string;
  /** The main content of the comment */
  content: React.ReactNode;
  /** Nested comments should be provided as children of the Comment */
  children?: React.ReactNode;
  /** Comment prefix defaults to '.ant-comment' */
  prefixCls?: string;
  /** Additional style for the comment */
  style?: React.CSSProperties;
  /** A datetime element containing the time to be displayed */
  datetime?: React.ReactNode;
}

export default class Comment extends React.Component<CommentProps, {}> {
  getAction(actions: React.ReactNode[]) {
    if (!actions || !actions.length) {
      return null;
    }
    const actionList = actions.map((action, index) => <li key={`action-${index}`}>{action}</li>);
    return actionList;
  }

  renderNested = (prefixCls: string, children: any) => {
    return <div className={classNames(`${prefixCls}-nested`)}>{children}</div>;
  };

  renderComment = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      actions,
      author,
      avatar,
      children,
      className,
      content,
      prefixCls: customizePrefixCls,
      style,
      datetime,
      ...otherProps
    } = this.props;

    const prefixCls = getPrefixCls('comment', customizePrefixCls);

    const avatarDom = (
      <div className={`${prefixCls}-avatar`}>
        {typeof avatar === 'string' ? <img src={avatar} /> : avatar}
      </div>
    );

    const actionDom =
      actions && actions.length ? (
        <ul className={`${prefixCls}-actions`}>{this.getAction(actions)}</ul>
      ) : null;

    const authorContent = (
      <div className={`${prefixCls}-content-author`}>
        {author && <span className={`${prefixCls}-content-author-name`}>{author}</span>}
        {datetime && <span className={`${prefixCls}-content-author-time`}>{datetime}</span>}
      </div>
    );

    const contentDom = (
      <div className={`${prefixCls}-content`}>
        {authorContent}
        <div className={`${prefixCls}-content-detail`}>{content}</div>
        {actionDom}
      </div>
    );

    const comment = (
      <div className={`${prefixCls}-inner`}>
        {avatarDom}
        {contentDom}
      </div>
    );

    return (
      <div {...otherProps} className={classNames(prefixCls, className)} style={style}>
        {comment}
        {children ? this.renderNested(prefixCls, children) : null}
      </div>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderComment}</ConfigConsumer>;
  }
}
