import * as React from 'react';
import classNames from 'classnames';
import SkeletonTitle, { SkeletonTitleProps } from './SkeletonTitle';
import SkeletonParagraph, { SkeletonParagraphProps } from './SkeletonParagraph';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import SkeletonButton from './Button';
import SkeletonElement from './SkeletonElement';
import SkeletonAvatar, { AvatarProps } from './Avatar';

/* This only for skeleton internal. */
interface SkeletonAvatarProps extends Omit<AvatarProps, 'active'> {}

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

function getComponentProps<T>(prop: T | boolean | undefined): T | {} {
  if (prop && typeof prop === 'object') {
    return prop;
  }
  return {};
}

function getAvatarBasicProps(hasTitle: boolean, hasParagraph: boolean): SkeletonAvatarProps {
  if (hasTitle && !hasParagraph) {
    // Square avatar
    return { size: 'large', shape: 'square' };
  }

  return { size: 'large', shape: 'circle' };
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
  static Button: typeof SkeletonButton;

  static Avatar: typeof SkeletonAvatar;

  static defaultProps: Partial<SkeletonProps> = {
    avatar: false,
    title: true,
    paragraph: true,
  };

  renderSkeleton = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      loading,
      className,
      children,
      avatar,
      title,
      paragraph,
      active,
    } = this.props;

    const prefixCls = getPrefixCls('skeleton', customizePrefixCls);

    if (loading || !('loading' in this.props)) {
      const hasAvatar = !!avatar;
      const hasTitle = !!title;
      const hasParagraph = !!paragraph;

      // Avatar
      let avatarNode;
      if (hasAvatar) {
        const avatarProps: SkeletonAvatarProps = {
          prefixCls: `${prefixCls}-avatar`,
          ...getAvatarBasicProps(hasTitle, hasParagraph),
          ...getComponentProps(avatar),
        };
        // We direct use SkeletonElement as avatar in skeleton internal.
        avatarNode = (
          <div className={`${prefixCls}-header`}>
            <SkeletonElement {...avatarProps} />
          </div>
        );
      }

      let contentNode;
      if (hasTitle || hasParagraph) {
        // Title
        let $title;
        if (hasTitle) {
          const titleProps: SkeletonTitleProps = {
            prefixCls: `${prefixCls}-title`,
            ...getTitleBasicProps(hasAvatar, hasParagraph),
            ...getComponentProps(title),
          };

          $title = <SkeletonTitle {...titleProps} />;
        }

        // Paragraph
        let paragraphNode;
        if (hasParagraph) {
          const paragraphProps: SkeletonParagraphProps = {
            prefixCls: `${prefixCls}-paragraph`,
            ...getParagraphBasicProps(hasAvatar, hasTitle),
            ...getComponentProps(paragraph),
          };

          paragraphNode = <SkeletonParagraph {...paragraphProps} />;
        }

        contentNode = (
          <div className={`${prefixCls}-content`}>
            {$title}
            {paragraphNode}
          </div>
        );
      }

      const cls = classNames(prefixCls, className, {
        [`${prefixCls}-with-avatar`]: hasAvatar,
        [`${prefixCls}-active`]: active,
      });

      return (
        <div className={cls}>
          {avatarNode}
          {contentNode}
        </div>
      );
    }

    return children;
  };

  render() {
    return <ConfigConsumer>{this.renderSkeleton}</ConfigConsumer>;
  }
}

export default Skeleton;
