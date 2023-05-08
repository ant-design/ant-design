import classNames from 'classnames';
import useEvent from 'rc-util/lib/hooks/useEvent';
import * as React from 'react';
import scrollIntoView from 'scroll-into-view-if-needed';

import Affix from '../affix';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import getScroll from '../_util/getScroll';
import scrollTo from '../_util/scrollTo';
import warning from '../_util/warning';
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
      container = element.ownerDocument!.documentElement!;
      return rect.top - container.clientTop;
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

export interface AnchorProps {
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  style?: React.CSSProperties;
  /**
   * @deprecated Please use `items` instead.
   */
  children?: React.ReactNode;
  offsetTop?: number;
  bounds?: number;
  affix?: boolean;
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
}

interface InternalAnchorProps extends AnchorProps {
  anchorPrefixCls: string;
  rootClassName: string;
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
}

const AnchorContent: React.FC<InternalAnchorProps> = (props) => {
  const {
    rootClassName,
    anchorPrefixCls: prefixCls,
    className = '',
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
  } = props;

  // =================== Warning =====================
  if (process.env.NODE_ENV !== 'production') {
    warning(!children, 'Anchor', '`Anchor children` is deprecated. Please use `items` instead.');
  }

  if (process.env.NODE_ENV !== 'production') {
    warning(
      !(anchorDirection === 'horizontal' && items?.some((n) => 'children' in n)),
      'Anchor',
      '`Anchor items#children` is not supported when `Anchor` direction is horizontal.',
    );
  }

  const [links, setLinks] = React.useState<string[]>([]);
  const [activeLink, setActiveLink] = React.useState<string | null>(null);
  const activeLinkRef = React.useRef<string | null>(activeLink);

  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const spanLinkNode = React.useRef<HTMLSpanElement>(null);
  const animating = React.useRef<boolean>(false);

  const { direction, getTargetContainer } = React.useContext<ConfigConsumerProps>(ConfigContext);

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
    if (linkNode && spanLinkNode.current) {
      const { style: inkStyle } = spanLinkNode.current;
      const horizontalAnchor = anchorDirection === 'horizontal';
      inkStyle.top = horizontalAnchor ? '' : `${linkNode.offsetTop + linkNode.clientHeight / 2}px`;
      inkStyle.height = horizontalAnchor ? '' : `${linkNode.clientHeight}px`;
      inkStyle.left = horizontalAnchor ? `${linkNode.offsetLeft}px` : '';
      inkStyle.width = horizontalAnchor ? `${linkNode.clientWidth}px` : '';
      if (horizontalAnchor) {
        scrollIntoView(linkNode, {
          scrollMode: 'if-needed',
          block: 'nearest',
        });
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
        if (top < _offsetTop + _bounds) {
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
    if (animating.current) {
      return;
    }
    if (typeof getCurrentAnchor === 'function') {
      return;
    }
    const currentActiveLink = getInternalCurrentAnchor(
      links,
      targetOffset !== undefined ? targetOffset : offsetTop || 0,
      bounds,
    );
    setCurrentActiveLink(currentActiveLink);
  }, [dependencyListItem, targetOffset, offsetTop]);

  const handleScrollTo = React.useCallback<(link: string) => void>(
    (link) => {
      setCurrentActiveLink(link);
      const sharpLinkMatch = sharpMatcherRegex.exec(link);
      if (!sharpLinkMatch) {
        return;
      }
      const targetElement = document.getElementById(sharpLinkMatch[1]);
      if (!targetElement) {
        return;
      }

      const container = getCurrentContainer();
      const scrollTop = getScroll(container, true);
      const eleOffsetTop = getOffsetTop(targetElement, container);
      let y = scrollTop + eleOffsetTop;
      y -= targetOffset !== undefined ? targetOffset : offsetTop || 0;
      animating.current = true;
      scrollTo(y, {
        getContainer: getCurrentContainer,
        callback() {
          animating.current = false;
        },
      });
    },
    [targetOffset, offsetTop],
  );

  const wrapperClass = classNames(
    rootClassName,
    `${prefixCls}-wrapper`,
    {
      [`${prefixCls}-wrapper-horizontal`]: anchorDirection === 'horizontal',
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
  );

  const anchorClass = classNames(prefixCls, {
    [`${prefixCls}-fixed`]: !affix && !showInkInFixed,
  });

  const inkClass = classNames(`${prefixCls}-ink`, {
    [`${prefixCls}-ink-visible`]: activeLink,
  });

  const wrapperStyle: React.CSSProperties = {
    maxHeight: offsetTop ? `calc(100vh - ${offsetTop}px)` : '100vh',
    ...style,
  };

  const createNestedLink = (options?: AnchorLinkItemProps[]) =>
    Array.isArray(options)
      ? options.map((item) => (
          <AnchorLink {...item} key={item.key}>
            {anchorDirection === 'vertical' && createNestedLink(item.children)}
          </AnchorLink>
        ))
      : null;

  const anchorContent = (
    <div ref={wrapperRef} className={wrapperClass} style={wrapperStyle}>
      <div className={anchorClass}>
        <span className={inkClass} ref={spanLinkNode} />
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
    }),
    [activeLink, onClick, handleScrollTo, anchorDirection],
  );

  return (
    <AnchorContext.Provider value={memoizedContextValue}>
      {affix ? (
        <Affix offsetTop={offsetTop} target={getCurrentContainer}>
          {anchorContent}
        </Affix>
      ) : (
        anchorContent
      )}
    </AnchorContext.Provider>
  );
};

const Anchor: React.FC<AnchorProps> = (props) => {
  const { prefixCls: customizePrefixCls, rootClassName } = props;
  const { getPrefixCls } = React.useContext<ConfigConsumerProps>(ConfigContext);
  const anchorPrefixCls = getPrefixCls('anchor', customizePrefixCls);

  const [wrapSSR, hashId] = useStyle(anchorPrefixCls);

  return wrapSSR(
    <AnchorContent
      {...props}
      rootClassName={classNames(hashId, rootClassName)}
      anchorPrefixCls={anchorPrefixCls}
    />,
  );
};

if (process.env.NODE_ENV !== 'production') {
  Anchor.displayName = 'Anchor';
}

export default Anchor;
