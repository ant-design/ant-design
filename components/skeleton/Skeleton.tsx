import classNames from 'classnames';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import type { AvatarProps } from './Avatar';
import SkeletonAvatar from './Avatar';
import SkeletonButton from './Button';
import Element from './Element';
import SkeletonImage from './Image';
import SkeletonInput from './Input';
import SkeletonNode from './Node';
import type { SkeletonParagraphProps } from './Paragraph';
import Paragraph from './Paragraph';
import type { SkeletonTitleProps } from './Title';
import Title from './Title';

import useStyle from './style';

/* This only for skeleton internal. */
type SkeletonAvatarProps = Omit<AvatarProps, 'active'>;

export interface SkeletonProps {
  active?: boolean;
  loading?: boolean;
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  avatar?: SkeletonAvatarProps | boolean;
  title?: SkeletonTitleProps | boolean;
  paragraph?: SkeletonParagraphProps | boolean;
  round?: boolean;
}

function getComponentProps<T>(prop?: T | boolean): T | {} {
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

type CompoundedComponent = {
  Button: typeof SkeletonButton;
  Avatar: typeof SkeletonAvatar;
  Input: typeof SkeletonInput;
  Image: typeof SkeletonImage;
  Node: typeof SkeletonNode;
};

const Skeleton: React.FC<SkeletonProps> & CompoundedComponent = (props) => {
  const {
    prefixCls: customizePrefixCls,
    loading,
    className,
    rootClassName,
    style,
    children,
    avatar = false,
    title = true,
    paragraph = true,
    active,
    round,
  } = props;

  const { getPrefixCls, direction, skeleton } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('skeleton', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);

  if (loading || !('loading' in props)) {
    const hasAvatar = !!avatar;
    const hasTitle = !!title;
    const hasParagraph = !!paragraph;

    // Avatar
    let avatarNode: React.ReactNode;
    if (hasAvatar) {
      const avatarProps: SkeletonAvatarProps = {
        prefixCls: `${prefixCls}-avatar`,
        ...getAvatarBasicProps(hasTitle, hasParagraph),
        ...getComponentProps(avatar),
      };
      // We direct use SkeletonElement as avatar in skeleton internal.
      avatarNode = (
        <div className={`${prefixCls}-header`}>
          <Element {...avatarProps} />
        </div>
      );
    }

    let contentNode: React.ReactNode;
    if (hasTitle || hasParagraph) {
      // Title
      let $title: React.ReactNode;
      if (hasTitle) {
        const titleProps: SkeletonTitleProps = {
          prefixCls: `${prefixCls}-title`,
          ...getTitleBasicProps(hasAvatar, hasParagraph),
          ...getComponentProps(title),
        };

        $title = <Title {...titleProps} />;
      }

      // Paragraph
      let paragraphNode: React.ReactNode;
      if (hasParagraph) {
        const paragraphProps: SkeletonParagraphProps = {
          prefixCls: `${prefixCls}-paragraph`,
          ...getParagraphBasicProps(hasAvatar, hasTitle),
          ...getComponentProps(paragraph),
        };

        paragraphNode = <Paragraph {...paragraphProps} />;
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
      {
        [`${prefixCls}-with-avatar`]: hasAvatar,
        [`${prefixCls}-active`]: active,
        [`${prefixCls}-rtl`]: direction === 'rtl',
        [`${prefixCls}-round`]: round,
      },
      skeleton?.className,
      className,
      rootClassName,
      hashId,
    );

    return wrapSSR(
      <div className={cls} style={{ ...skeleton?.style, ...style }}>
        {avatarNode}
        {contentNode}
      </div>,
    );
  }
  return typeof children !== 'undefined' ? (children as React.ReactElement) : null;
};

Skeleton.Button = SkeletonButton;
Skeleton.Avatar = SkeletonAvatar;
Skeleton.Input = SkeletonInput;
Skeleton.Image = SkeletonImage;
Skeleton.Node = SkeletonNode;

if (process.env.NODE_ENV !== 'production') {
  Skeleton.displayName = 'Skeleton';
}

export default Skeleton;
