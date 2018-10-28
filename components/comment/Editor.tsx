import * as React from 'react';
import classNames from 'classnames';

export interface CommentEditorProps {
  avatar: React.ReactNode;
  className?: string;
  editorStyle?: React.CSSProperties;
  headStyle?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
  prefixCls?: string;
  style?: React.CSSProperties;
  content: React.ReactNode;
}

export default (props: CommentEditorProps) => {
  const {
    avatar,
    className,
    content,
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

  const headDom = (
    <div className={`${prefixCls}-header`} style={headStyle}>
      <span className={`${prefixCls}-header-avatar`}>
        {avatarDom}
      </span>
    </div>
  );

  const contentDom = (
    <div className={`${prefixCls}-content`} style={editorStyle}>
      <div className={`${prefixCls}-content-wrapper`}>
        {content}
      </div>
    </div>
  );

  return (
    <div {...others} className={classString} style={style}>
      <div className={`${prefixCls}-inner`} style={innerStyle}>
        {headDom}
        {contentDom}
      </div>
    </div>
  );
}
