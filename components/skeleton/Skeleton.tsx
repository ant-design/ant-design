import * as React from 'react';
import { clsx } from 'clsx';

import type { SemanticType } from '../_util/hooks';
import { useMergeSemantic } from '../_util/hooks';
import { useComponentConfig } from '../config-provider/context';
import type { AvatarProps } from './Avatar';
import SkeletonAvatar from './Avatar';
import SkeletonButton from './Button';
import Element from './Element';
import SkeletonImage from './Image';
import SkeletonInput from './Input';
import SkeletonNode from './Node';
import type { SkeletonParagraphProps } from './Paragraph';
import Paragraph from './Paragraph';
import useStyle from './style';
import type { SkeletonTitleProps } from './Title';
import Title from './Title';

/* This only for skeleton internal. */
type SkeletonAvatarProps = Omit<AvatarProps, 'active'>;

export type SkeletonSemanticType = {
  className: {
    root?: string;
    header?: string;
    section?: string;
    avatar?: string;
    title?: string;
    paragraph?: string;
  };
  styles: {
    root?: React.CSSProperties;
    header?: React.CSSProperties;
    section?: React.CSSProperties;
    avatar?: React.CSSProperties;
    title?: React.CSSProperties;
    paragraph?: React.CSSProperties;
  };
};

export type SkeletonClassNamesType = SemanticType<SkeletonProps, SkeletonSemanticType['className']>;

export type SkeletonStylesType = SemanticType<SkeletonProps, SkeletonSemanticType['styles']>;

export interface SkeletonProps {
  active?: boolean;
  loading?: boolean;
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  style?: React.CSSProperties;
  avatar?: SkeletonAvatarProps | boolean;
  title?: SkeletonTitleProps | boolean;
  paragraph?: SkeletonParagraphProps | boolean;
  round?: boolean;
  classNames?: SkeletonClassNamesType;
  styles?: SkeletonStylesType;
}

function getComponentProps<T>(prop?: T | boolean): T | Record<string, string> {
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

// Tips: ctx.classNames.root < ctx.className < cpns.classNames.root < cpns.className < rootClassName

const Skeleton: React.FC<React.PropsWithChildren<SkeletonProps>> & CompoundedComponent = (
  props,
) => {
  const {
    prefixCls: customizePrefixCls,
    loading,
    className,
    rootClassName,
    classNames,
    style,
    styles,
    children,
    avatar = false,
    title = true,
    paragraph = true,
    active,
    round,
  } = props;

  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('skeleton');

  const prefixCls = getPrefixCls('skeleton', customizePrefixCls);

  const [hashId, cssVarCls] = useStyle(prefixCls);

  const mergedProps: SkeletonProps = {
    ...props,
    avatar,
    title,
    paragraph,
  };

  const [mergedClassNames, mergedStyles] = useMergeSemantic(
    [contextClassNames, classNames],
    [contextStyles, styles],
    {
      props: mergedProps,
    },
  );

  if (loading || !('loading' in props)) {
    const hasAvatar = !!avatar;
    const hasTitle = !!title;
    const hasParagraph = !!paragraph;

    // Avatar
    let avatarNode: React.ReactNode;
    if (hasAvatar) {
      const avatarProps: SkeletonAvatarProps = {
        className: mergedClassNames.avatar,
        prefixCls: `${prefixCls}-avatar`,
        ...getAvatarBasicProps(hasTitle, hasParagraph),
        ...getComponentProps(avatar),
        style: mergedStyles.avatar,
      };
      // We direct use SkeletonElement as avatar in skeleton internal.
      avatarNode = (
        <div
          className={clsx(mergedClassNames.header, `${prefixCls}-header`)}
          style={mergedStyles.header}
        >
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
          className: mergedClassNames.title,
          prefixCls: `${prefixCls}-title`,
          ...getTitleBasicProps(hasAvatar, hasParagraph),
          ...getComponentProps(title),
          style: mergedStyles.title,
        };

        $title = <Title {...titleProps} />;
      }

      // Paragraph
      let paragraphNode: React.ReactNode;
      if (hasParagraph) {
        const paragraphProps: SkeletonParagraphProps = {
          className: mergedClassNames.paragraph,
          prefixCls: `${prefixCls}-paragraph`,
          ...getParagraphBasicProps(hasAvatar, hasTitle),
          ...getComponentProps(paragraph),
          style: mergedStyles.paragraph,
        };

        paragraphNode = <Paragraph {...paragraphProps} />;
      }

      contentNode = (
        <div
          className={clsx(mergedClassNames.section, `${prefixCls}-section`)}
          style={mergedStyles.section}
        >
          {$title}
          {paragraphNode}
        </div>
      );
    }

    const cls = clsx(
      prefixCls,
      {
        [`${prefixCls}-with-avatar`]: hasAvatar,
        [`${prefixCls}-active`]: active,
        [`${prefixCls}-rtl`]: direction === 'rtl',
        [`${prefixCls}-round`]: round,
      },
      mergedClassNames.root,
      contextClassName,
      className,
      rootClassName,
      hashId,
      cssVarCls,
    );

    return (
      <div className={cls} style={{ ...mergedStyles.root, ...contextStyle, ...style }}>
        {avatarNode}
        {contentNode}
      </div>
    );
  }
  return children ?? null;
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
