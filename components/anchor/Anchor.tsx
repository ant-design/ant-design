import * as React from 'react';
import { useEvent } from '@rc-component/util';
import { clsx } from 'clsx';
import scrollIntoView from 'scroll-into-view-if-needed';

import getScroll from '../_util/getScroll';
import type { SemanticClassNamesType, SemanticStylesType } from '../_util/hooks';
import { useMergeSemantic } from '../_util/hooks';
import scrollTo from '../_util/scrollTo';
import { devUseWarning } from '../_util/warning';
import Affix from '../affix';
import type { AffixProps } from '../affix';
import { ConfigContext, useComponentConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import type { AnchorLinkBaseProps } from './AnchorLink';
import AnchorLink from './AnchorLink';
import AnchorContext from './context';
import useStyle from './style';

export interface AnchorLinkItemProps extends AnchorLinkBaseProps {
  key: React.Key;
  children?: AnchorLinkItemProps[];
}

export type AnchorContainer = HTMLElement | Window;

function getDefaultContainer() {
  return window;
}

function getOffsetTop(element: HTMLElement, container: AnchorContainer): number {
  if (!element.getClientRects().length) {
    return 0;
  }

  const rect = element.getBoundingClientRect();

  if (rect.width || rect.height) {
    if (container === window) {
      return rect.top - element.ownerDocument.documentElement!.clientTop;
    }
    return rect.top - (container as HTMLElement).getBoundingClientRect().top;
  }

  return rect.top;
}

const sharpMatcherRegex = /#([\S ]+)$/;

interface Section {
  link: string;
  top: number;
}

export type AnchorSemanticName = keyof AnchorSemanticClassNames & keyof AnchorSemanticStyles;

export type AnchorSemanticClassNames = {
  root?: string;
  item?: string;
  itemTitle?: string;
  indicator?: string;
};

export type AnchorSemanticStyles = {
  root?: React.CSSProperties;
  item?: React.CSSProperties;
  itemTitle?: React.CSSProperties;
  indicator?: React.CSSProperties;
};

export type AnchorClassNamesType = SemanticClassNamesType<AnchorProps, AnchorSemanticClassNames>;

export type AnchorStylesType = SemanticStylesType<AnchorProps, AnchorSemanticStyles>;

export interface AnchorProps {
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  style?: React.CSSProperties;
  classNames?: AnchorClassNamesType;
  styles?: AnchorStylesType;
  /**
   * @deprecated Please use `items` instead.
   */
  children?: React.ReactNode;
  offsetTop?: number;
  bounds?: number;
  affix?: boolean | Omit<AffixProps, 'offsetTop' | 'target' | 'children'>;
  showInkInFixed?: boolean;
  getContainer?: () => AnchorContainer;
  /** Return customize highlight anchor */
  getCurrentAnchor?: (activeLink: string) => string;
  onClick?: (
    e: React.MouseEvent<HTMLElement>,
    link: { title: React.ReactNode; href: string },
  ) => void;
  /** Scroll to target offset value, if none, it's offsetTop prop value or 0. */
  targetOffset?: number;
  /** Listening event when scrolling change active link */
  onChange?: (currentActiveLink: string) => void;
  items?: AnchorLinkItemProps[];
  direction?: AnchorDirection;
  replace?: boolean;
}

export interface AnchorState {
  activeLink: null | string;
}

export interface AnchorDefaultProps extends AnchorProps {
  prefixCls: string;
  affix: boolean;
  showInkInFixed: boolean;
  getContainer: () => AnchorContainer;
}

export type AnchorDirection = 'vertical' | 'horizontal';

export interface AntAnchor {
  registerLink: (link: string) => void;
  unregisterLink: (link: string) => void;
  activeLink: string | null;
  scrollTo: (link: string) => void;
  onClick?: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    link: { title: React.ReactNode; href: string },
  ) => void;
  direction: AnchorDirection;
  classNames?: AnchorSemanticClassNames;
  styles?: AnchorSemanticStyles;
}

const Anchor: React.FC<AnchorProps> = (props) => {
  const {
    rootClassName,
    prefixCls: customPrefixCls,
    className,
    style,
    offsetTop,
    affix = true,
    showInkInFixed = false,
    children,
    items,
    direction: anchorDirection = 'vertical',
    bounds,
    targetOffset,
    onClick,
    onChange,
    getContainer,
    getCurrentAnchor,
    replace,
    classNames,
    styles,
  } = props;

  // =================== Warning =====================
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Anchor');

    warning.deprecated(!children, 'Anchor children', 'items');

    warning(
      !(anchorDirection === 'horizontal' && items?.some((n) => 'children' in n)),
      'usage',
      '`Anchor items#children` is not supported when `Anchor` direction is horizontal.',
    );
  }

  const [links, setLinks] = React.useState<string[]>([]);
  const [activeLink, setActiveLink] = React.useState<string | null>(null);
  const activeLinkRef = React.useRef<string | null>(activeLink);

  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const spanLinkNodeRef = React.useRef<HTMLSpanElement>(null);
  const animatingRef = React.useRef<boolean>(false);
  const scrollRequestIdRef = React.useRef<(() => void) | null>(null);

  const {
    direction,
    getPrefixCls,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('anchor');

  const { getTargetContainer } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('anchor', customPrefixCls);

  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const getCurrentContainer = getContainer ?? getTargetContainer ?? getDefaultContainer;

  const dependencyListItem: React.DependencyList[number] = JSON.stringify(links);

  const registerLink = useEvent<AntAnchor['registerLink']>((link) => {
    if (!links.includes(link)) {
      setLinks((prev) => [...prev, link]);
    }
  });

  const unregisterLink = useEvent<AntAnchor['unregisterLink']>((link) => {
    if (links.includes(link)) {
      setLinks((prev) => prev.filter((i) => i !== link));
    }
  });

  const updateInk = () => {
    const linkNode = wrapperRef.current?.querySelector<HTMLElement>(
      `.${prefixCls}-link-title-active`,
    );
    if (linkNode && spanLinkNodeRef.current) {
      const { style: inkStyle } = spanLinkNodeRef.current;
      const horizontalAnchor = anchorDirection === 'horizontal';
      inkStyle.top = horizontalAnchor ? '' : `${linkNode.offsetTop + linkNode.clientHeight / 2}px`;
      inkStyle.height = horizontalAnchor ? '' : `${linkNode.clientHeight}px`;
      inkStyle.left = horizontalAnchor ? `${linkNode.offsetLeft}px` : '';
      inkStyle.width = horizontalAnchor ? `${linkNode.clientWidth}px` : '';
      if (horizontalAnchor) {
        scrollIntoView(linkNode, { scrollMode: 'if-needed', block: 'nearest' });
      }
    }
  };

  const getInternalCurrentAnchor = (_links: string[], _offsetTop = 0, _bounds = 5): string => {
    const linkSections: Section[] = [];
    const container = getCurrentContainer();
    _links.forEach((link) => {
      const sharpLinkMatch = sharpMatcherRegex.exec(link?.toString());
      if (!sharpLinkMatch) {
        return;
      }
      const target = document.getElementById(sharpLinkMatch[1]);
      if (target) {
        const top = getOffsetTop(target, container);
        if (top <= _offsetTop + _bounds) {
          linkSections.push({ link, top });
        }
      }
    });

    if (linkSections.length) {
      const maxSection = linkSections.reduce((prev, curr) => (curr.top > prev.top ? curr : prev));
      return maxSection.link;
    }
    return '';
  };

  const setCurrentActiveLink = useEvent((link: string) => {
    // FIXME: Seems a bug since this compare is not equals
    // `activeLinkRef` is parsed value which will always trigger `onChange` event.
    if (activeLinkRef.current === link) {
      return;
    }

    // https://github.com/ant-design/ant-design/issues/30584
    const newLink = typeof getCurrentAnchor === 'function' ? getCurrentAnchor(link) : link;
    setActiveLink(newLink);
    activeLinkRef.current = newLink;

    // onChange should respect the original link (which may caused by
    // window scroll or user click), not the new link
    onChange?.(link);
  });

  const handleScroll = React.useCallback(() => {
    if (animatingRef.current) {
      return;
    }

    const currentActiveLink = getInternalCurrentAnchor(
      links,
      targetOffset !== undefined ? targetOffset : offsetTop || 0,
      bounds,
    );

    setCurrentActiveLink(currentActiveLink);
  }, [links, targetOffset, offsetTop, bounds]);

  const handleScrollTo = React.useCallback<(link: string) => void>(
    (link) => {
      const previousActiveLink = activeLinkRef.current;
      setCurrentActiveLink(link);
      const sharpLinkMatch = sharpMatcherRegex.exec(link);
      if (!sharpLinkMatch) {
        return;
      }
      const targetElement = document.getElementById(sharpLinkMatch[1]);
      if (!targetElement) {
        return;
      }

      if (animatingRef.current) {
        if (previousActiveLink === link) {
          return;
        }
        scrollRequestIdRef.current?.();
      }

      const container = getCurrentContainer();
      const scrollTop = getScroll(container);
      const eleOffsetTop = getOffsetTop(targetElement, container);
      let y = scrollTop + eleOffsetTop;
      y -= targetOffset !== undefined ? targetOffset : offsetTop || 0;
      animatingRef.current = true;
      scrollRequestIdRef.current = scrollTo(y, {
        getContainer: getCurrentContainer,
        callback() {
          animatingRef.current = false;
        },
      });
    },
    [targetOffset, offsetTop],
  );

  // =========== Merged Props for Semantic ==========
  const mergedProps: AnchorProps = {
    ...props,
    direction: anchorDirection,
  };

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    AnchorClassNamesType,
    AnchorStylesType,
    AnchorProps
  >([contextClassNames, classNames], [contextStyles, styles], {
    props: mergedProps,
  });

  const wrapperClass = clsx(
    hashId,
    cssVarCls,
    rootCls,
    rootClassName,
    `${prefixCls}-wrapper`,
    {
      [`${prefixCls}-wrapper-horizontal`]: anchorDirection === 'horizontal',
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
    contextClassName,
    mergedClassNames.root,
  );

  const anchorClass = clsx(prefixCls, {
    [`${prefixCls}-fixed`]: !affix && !showInkInFixed,
  });

  const inkClass = clsx(`${prefixCls}-ink`, mergedClassNames.indicator, {
    [`${prefixCls}-ink-visible`]: activeLink,
  });

  const wrapperStyle: React.CSSProperties = {
    maxHeight: offsetTop ? `calc(100vh - ${offsetTop}px)` : '100vh',
    ...mergedStyles.root,
    ...contextStyle,
    ...style,
  };

  const createNestedLink = (options?: AnchorLinkItemProps[]) =>
    Array.isArray(options)
      ? options.map((item) => (
          <AnchorLink replace={replace} {...item} key={item.key}>
            {anchorDirection === 'vertical' && createNestedLink(item.children)}
          </AnchorLink>
        ))
      : null;

  const anchorContent = (
    <div ref={wrapperRef} className={wrapperClass} style={wrapperStyle}>
      <div className={anchorClass}>
        <span className={inkClass} ref={spanLinkNodeRef} style={mergedStyles.indicator} />
        {'items' in props ? createNestedLink(items) : children}
      </div>
    </div>
  );

  React.useEffect(() => {
    const scrollContainer = getCurrentContainer();
    handleScroll();
    scrollContainer?.addEventListener('scroll', handleScroll);
    return () => {
      scrollContainer?.removeEventListener('scroll', handleScroll);
    };
  }, [dependencyListItem]);

  React.useEffect(() => {
    if (typeof getCurrentAnchor === 'function') {
      setCurrentActiveLink(getCurrentAnchor(activeLinkRef.current || ''));
    }
  }, [getCurrentAnchor]);

  React.useEffect(() => {
    updateInk();
  }, [anchorDirection, getCurrentAnchor, dependencyListItem, activeLink]);

  const memoizedContextValue = React.useMemo<AntAnchor>(
    () => ({
      registerLink,
      unregisterLink,
      scrollTo: handleScrollTo,
      activeLink,
      onClick,
      direction: anchorDirection,
      classNames: mergedClassNames,
      styles: mergedStyles,
    }),
    [activeLink, onClick, handleScrollTo, anchorDirection, mergedStyles, mergedClassNames],
  );

  const affixProps = affix && typeof affix === 'object' ? affix : undefined;

  return (
    <AnchorContext.Provider value={memoizedContextValue}>
      {affix ? (
        <Affix offsetTop={offsetTop} target={getCurrentContainer} {...affixProps}>
          {anchorContent}
        </Affix>
      ) : (
        anchorContent
      )}
    </AnchorContext.Provider>
  );
};

if (process.env.NODE_ENV !== 'production') {
  Anchor.displayName = 'Anchor';
}

export default Anchor;
