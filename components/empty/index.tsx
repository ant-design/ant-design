import * as React from 'react';
import cls from 'classnames';

import useMergeSemantic from '../_util/hooks/useMergeSemantic';
import type { SemanticClassNamesType, SemanticStylesType } from '../_util/hooks/useMergeSemantic';
import { devUseWarning } from '../_util/warning';
import { useComponentConfig } from '../config-provider/context';
import { useLocale } from '../locale';
import DefaultEmptyImg from './empty';
import SimpleEmptyImg from './simple';
import useStyle from './style';

const defaultEmptyImg = <DefaultEmptyImg />;
const simpleEmptyImg = <SimpleEmptyImg />;

export interface TransferLocale {
  description: string;
}

export type EmptySemanticName = 'root' | 'image' | 'description' | 'footer';

export type EmptyClassNamesType = SemanticClassNamesType<EmptyProps, EmptySemanticName>;
export type EmptyStylesType = SemanticStylesType<EmptyProps, EmptySemanticName>;

// For backward compatibility
export type SemanticName = EmptySemanticName;

export interface EmptyProps {
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  style?: React.CSSProperties;
  /** @deprecated Please use `styles.image` instead */
  imageStyle?: React.CSSProperties;
  image?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  classNames?: EmptyClassNamesType;
  styles?: EmptyStylesType;
}

type CompoundedComponent = React.FC<EmptyProps> & {
  PRESENTED_IMAGE_DEFAULT: React.ReactNode;
  PRESENTED_IMAGE_SIMPLE: React.ReactNode;
};

const Empty: CompoundedComponent = (props) => {
  const {
    className,
    rootClassName,
    prefixCls: customizePrefixCls,
    image,
    description,
    children,
    imageStyle,
    style,
    classNames,
    styles,
    ...restProps
  } = props;
  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
    image: contextImage,
  } = useComponentConfig('empty');

  const prefixCls = getPrefixCls('empty', customizePrefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls);

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    EmptyClassNamesType,
    EmptyStylesType,
    EmptyProps
  >([contextClassNames, classNames], [contextStyles, styles], undefined, {
    props,
  });

  const [locale] = useLocale('Empty');

  const des = typeof description !== 'undefined' ? description : locale?.description;
  const alt = typeof des === 'string' ? des : 'empty';

  const mergedImage = image ?? contextImage ?? defaultEmptyImg;

  let imageNode: React.ReactNode = null;

  if (typeof mergedImage === 'string') {
    imageNode = <img draggable={false} alt={alt} src={mergedImage} />;
  } else {
    imageNode = mergedImage;
  }

  // ============================= Warning ==============================
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Empty');

    [['imageStyle', 'styles.image']].forEach(([deprecatedName, newName]) => {
      warning.deprecated(!(deprecatedName in props), deprecatedName, newName);
    });
  }

  return (
    <div
      className={cls(
        hashId,
        cssVarCls,
        prefixCls,
        contextClassName,
        {
          [`${prefixCls}-normal`]: mergedImage === simpleEmptyImg,
          [`${prefixCls}-rtl`]: direction === 'rtl',
        },
        className,
        rootClassName,
        mergedClassNames.root,
      )}
      style={{ ...mergedStyles.root, ...contextStyle, ...style }}
      {...restProps}
    >
      <div
        className={cls(`${prefixCls}-image`, mergedClassNames.image)}
        style={{ ...imageStyle, ...mergedStyles.image }}
      >
        {imageNode}
      </div>
      {des && (
        <div
          className={cls(`${prefixCls}-description`, mergedClassNames.description)}
          style={mergedStyles.description}
        >
          {des}
        </div>
      )}
      {children && (
        <div
          className={cls(`${prefixCls}-footer`, mergedClassNames.footer)}
          style={mergedStyles.footer}
        >
          {children}
        </div>
      )}
    </div>
  );
};

Empty.PRESENTED_IMAGE_DEFAULT = defaultEmptyImg;
Empty.PRESENTED_IMAGE_SIMPLE = simpleEmptyImg;

if (process.env.NODE_ENV !== 'production') {
  Empty.displayName = 'Empty';
}

export default Empty;
