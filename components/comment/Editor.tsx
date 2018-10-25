import * as React from 'react';
import classNames from 'classnames';

export interface CommentEditorProps {
  avatar: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  editorStyle?: React.CSSProperties;
  headStyle?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
  prefixCls?: string;
  style?: React.CSSProperties;
}

export default (props: CommentEditorProps) => {
  const {
    avatar,
    children,
    className,
    editorStyle,
    headStyle,
    innerStyle,
    prefixCls = 'ant-comment',
    style,
    ...others
  } = props;
  const classString = classNames(`${prefixCls}-editor`, className);

  const avatarDom = typeof avatar === 'string'
      ? <img src={avatar} />
      : avatar;

  const head = (
    <div className={`${prefixCls}-header`} style={headStyle}>
      <span className={`${prefixCls}-header-avatar`}>
        {avatarDom}
      </span>
    </div>
  );

  const content = (
    <div className={`${prefixCls}-content`} style={editorStyle}>
      <div className={`${prefixCls}-content-wrapper`}>
        {children}
      </div>
    </div>
  );

  return (
    <div {...others} className={classString} style={style}>
      <div className={`${prefixCls}-inner`} style={innerStyle}>
        {head}
        {content}
      </div>
    </div>
  );
}
