import * as React from 'react';
import classNames from 'classnames';

import useMergeSemantic from '../_util/hooks/useMergeSemantic';
import type { SemanticClassNamesType, SemanticStylesType } from '../_util/hooks/useMergeSemantic';
import { useComponentConfig } from '../config-provider/context';

export type SemanticName = 'root' | 'section' | 'avatar' | 'title' | 'description';
export type CardMetaClassNamesType = SemanticClassNamesType<CardMetaProps, SemanticName>;
export type CardMetaStylesType = SemanticStylesType<CardMetaProps, SemanticName>;

export interface CardMetaProps {
  prefixCls?: string;
  style?: React.CSSProperties;
  className?: string;
  avatar?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  classNames?: CardMetaClassNamesType;
  styles?: CardMetaStylesType;
}

const Meta: React.FC<CardMetaProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    avatar,
    title,
    description,
    style,
    classNames: cardMetaClassNames,
    styles,
    ...restProps
  } = props;
  const {
    getPrefixCls,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('cardMeta');

  const prefixCls = getPrefixCls('card', customizePrefixCls);
  const metaPrefixCls = `${prefixCls}-meta`;

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    CardMetaClassNamesType,
    CardMetaStylesType,
    CardMetaProps
  >([contextClassNames, cardMetaClassNames], [contextStyles, styles], undefined, {
    props,
  });

  const rootClassNames = classNames(
    metaPrefixCls,
    className,
    contextClassName,
    mergedClassNames.root,
  );

  const rootStyles: React.CSSProperties = {
    ...contextStyle,
    ...mergedStyles.root,
    ...style,
  };

  const avatarClassNames = classNames(`${metaPrefixCls}-avatar`, mergedClassNames.avatar);

  const titleClassNames = classNames(`${metaPrefixCls}-title`, mergedClassNames.title);

  const descriptionClassNames = classNames(
    `${metaPrefixCls}-description`,
    mergedClassNames.description,
  );

  const sectionClassNames = classNames(`${metaPrefixCls}-section`, mergedClassNames.section);

  const avatarDom: React.ReactNode = avatar ? (
    <div className={avatarClassNames} style={mergedStyles.avatar}>
      {avatar}
    </div>
  ) : null;

  const titleDom: React.ReactNode = title ? (
    <div className={titleClassNames} style={mergedStyles.title}>
      {title}
    </div>
  ) : null;

  const descriptionDom: React.ReactNode = description ? (
    <div className={descriptionClassNames} style={mergedStyles.description}>
      {description}
    </div>
  ) : null;

  const MetaDetail: React.ReactNode =
    titleDom || descriptionDom ? (
      <div className={sectionClassNames} style={mergedStyles.section}>
        {titleDom}
        {descriptionDom}
      </div>
    ) : null;

  return (
    <div {...restProps} className={rootClassNames} style={rootStyles}>
      {avatarDom}
      {MetaDetail}
    </div>
  );
};

export default Meta;
