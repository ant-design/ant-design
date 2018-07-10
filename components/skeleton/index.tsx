import * as React from 'react';
import classNames from 'classnames';
import Avatar, { SkeletonAvatarProps } from './Avatar';
import Title, { SkeletonTitleProps } from './Title';
import Paragraph, { SkeletonParagraphProps } from './Paragraph';

export interface SkeletonProps {
  loading?: boolean;
  prefixCls?: string;
  className?: string;
  children?: React.ReactNode;
  avatar?: SkeletonAvatarProps | boolean;
  title?: SkeletonTitleProps | boolean;
  paragraph?: SkeletonParagraphProps | boolean;
}

function getComponentProps<T>(prop: T | boolean | undefined): T | {}  {
  if (prop && typeof prop === 'object') {
    return prop;
  }
  return {};
}

function getTitleBasicProps(hasAvatar: boolean, hasParagraph: boolean): SkeletonTitleProps {
  if (!hasAvatar && hasParagraph) {
    return { width: '40%' };
  }

  if (hasAvatar && hasParagraph) {
    return { width: '50%' };
  }

  return { width: '100%' };
}

function getParagraphBasicProps(hasAvatar: boolean, hasTitle: boolean): SkeletonParagraphProps {
  const basicProps: SkeletonParagraphProps = {};

  // Width
  if (hasAvatar && hasTitle) {
    basicProps.width = '100%';
  } else {
    basicProps.width = '60%';
  }

  // Rows
  if (!hasAvatar && hasTitle) {
    basicProps.rows = 3;
  } else {
    basicProps.rows = 2;
  }

  return basicProps;
}

class Skeleton extends React.Component<SkeletonProps, any> {

  static defaultProps: Partial<SkeletonProps> = {
    prefixCls: 'ant-skeleton',
    avatar: false,
    title: true,
    paragraph: true,
  };

  render() {
    const {
      loading, prefixCls, className, children,
      avatar, title, paragraph,
    } = this.props;

    if (loading) {
      const hasAvatar = !!avatar;
      const hasTitle = !!title;
      const hasParagraph = !!paragraph;

      // Avatar
      let $avatar;
      if (hasAvatar) {
        const avatarProps: SkeletonAvatarProps = {
          size: 'large',
          ...getComponentProps(avatar),
        };

        $avatar = (
          <div className={`${prefixCls}-header`}>
            <Avatar {...avatarProps} />
          </div>
        );
      }

      // Title
      let $title;
      if (hasTitle) {
        const titleProps: SkeletonTitleProps = {
          ...getTitleBasicProps(hasAvatar, hasParagraph),
          ...getComponentProps(title),
        };

        $title = (
          <Title {...titleProps} />
        );
      }

      // Paragraph
      let $paragraph;
      if (hasParagraph) {
        const paragraphProps: SkeletonParagraphProps = {
          ...getParagraphBasicProps(hasAvatar, hasTitle),
          ...getComponentProps(paragraph),
        };

        $paragraph = (
          <Paragraph {...paragraphProps} />
        );
      }

      return (
        <div
          className={classNames(prefixCls, className, { [`${prefixCls}-with-avatar`]: hasAvatar })}
        >
          {$avatar}
          <div className={`${prefixCls}-content`}>
            {$title}
            {$paragraph}
          </div>
        </div>
      );
    }

    return children;
  }
}

export default Skeleton;
