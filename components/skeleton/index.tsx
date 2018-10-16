import * as React from 'react';
import classNames from 'classnames';
import Avatar, { SkeletonAvatarProps } from './Avatar';
import Title, { SkeletonTitleProps } from './Title';
import Paragraph, { SkeletonParagraphProps } from './Paragraph';

export interface SkeletonProps {
  active?: boolean;
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

function getAvatarBasicProps(hasTitle: boolean, hasParagraph: boolean): SkeletonAvatarProps {
  if (hasTitle && !hasParagraph) {
    return { shape: 'square' };
  }

  return { shape: 'circle' };
}

function getTitleBasicProps(hasAvatar: boolean, hasParagraph: boolean): SkeletonTitleProps {
  if (!hasAvatar && hasParagraph) {
    return { width: '38%' };
  }

  if (hasAvatar && hasParagraph) {
    return { width: '50%' };
  }

  return {};
}

function getParagraphBasicProps(hasAvatar: boolean, hasTitle: boolean): SkeletonParagraphProps {
  const basicProps: SkeletonParagraphProps = {};

  // Width
  if (!hasAvatar || !hasTitle) {
    basicProps.width = '61%';
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
      avatar, title, paragraph, active,
    } = this.props;

    if (loading || !('loading' in this.props)) {
      const hasAvatar = !!avatar;
      const hasTitle = !!title;
      const hasParagraph = !!paragraph;

      // Avatar
      let avatarNode;
      if (hasAvatar) {
        const avatarProps: SkeletonAvatarProps = {
          ...getAvatarBasicProps(hasTitle, hasParagraph),
          ...getComponentProps(avatar),
        };

        avatarNode = (
          <div className={`${prefixCls}-header`}>
            <Avatar {...avatarProps} />
          </div>
        );
      }

      let contentNode;
      if (hasTitle || hasParagraph) {
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
        let paragraphNode;
        if (hasParagraph) {
          const paragraphProps: SkeletonParagraphProps = {
            ...getParagraphBasicProps(hasAvatar, hasTitle),
            ...getComponentProps(paragraph),
          };

          paragraphNode = (
            <Paragraph {...paragraphProps} />
          );
        }

        contentNode = (
          <div className={`${prefixCls}-content`}>
            {$title}
            {paragraphNode}
          </div>
        );
      }

      const cls = classNames(
        prefixCls,
        className, {
          [`${prefixCls}-with-avatar`]: hasAvatar,
          [`${prefixCls}-active`]: active,
        },
      );

      return (
        <div className={cls}>
          {avatarNode}
          {contentNode}
        </div>
      );
    }

    return children;
  }
}

export default Skeleton;
