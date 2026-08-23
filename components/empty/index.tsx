import * as React from 'react';
import { clsx } from 'clsx';

import { useMergeSemantic, useSemanticRootStyle } from '../_util/hooks/useMergeSemantic';
import type { GenerateSemantic } from '../_util/hooks/useMergeSemantic/semanticType';
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

export type EmptySemanticType = {
  classNames?: {
    root?: string;
    image?: string;
    description?: string;
    footer?: string;
  };
  styles?: {
    root?: React.CSSProperties;
    image?: React.CSSProperties;
    description?: React.CSSProperties;
    footer?: React.CSSProperties;
  };
};

export type EmptySemanticAllType = GenerateSemantic<EmptySemanticType, EmptyProps>;

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
  classNames?: EmptySemanticAllType['classNamesAndFn'];
  styles?: EmptySemanticAllType['stylesAndFn'];
}

export interface EmptyRef {
  nativeElement: HTMLDivElement;
}

type CompoundedComponent = React.ForwardRefExoticComponent<
  EmptyProps & React.RefAttributes<EmptyRef>
> & {
  PRESENTED_IMAGE_DEFAULT: React.ReactNode;
  PRESENTED_IMAGE_SIMPLE: React.ReactNode;
};

const Empty = React.forwardRef<EmptyRef, EmptyProps>((props, ref) => {
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

  const contextStyleRoot = useSemanticRootStyle(contextStyle);
  const styleRoot = useSemanticRootStyle(style);

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    EmptySemanticAllType['classNames'],
    EmptySemanticAllType['styles'],
    EmptyProps
  >([contextClassNames, classNames], [contextStyles, contextStyleRoot, styles, styleRoot], {
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

  const nativeElementRef = React.useRef<HTMLDivElement>(null);

  React.useImperativeHandle(ref, () => ({
    nativeElement: nativeElementRef.current!,
  }));

  return (
    <div
      ref={nativeElementRef}
      className={clsx(
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
      style={mergedStyles.root}
      {...restProps}
    >
      <div
        className={clsx(`${prefixCls}-image`, mergedClassNames.image)}
        style={{ ...imageStyle, ...mergedStyles.image }}
      >
        {imageNode}
      </div>
      {des && (
        <div
          className={clsx(`${prefixCls}-description`, mergedClassNames.description)}
          style={mergedStyles.description}
        >
          {des}
        </div>
      )}
      {children && (
        <div
          className={clsx(`${prefixCls}-footer`, mergedClassNames.footer)}
          style={mergedStyles.footer}
        >
          {children}
        </div>
      )}
    </div>
  );
}) as CompoundedComponent;

Empty.PRESENTED_IMAGE_DEFAULT = defaultEmptyImg;
Empty.PRESENTED_IMAGE_SIMPLE = simpleEmptyImg;

if (process.env.NODE_ENV !== 'production') {
  Empty.displayName = 'Empty';
}

export default Empty;
