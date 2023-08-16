import classNames from 'classnames';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import * as React from 'react';
import Affix from '../affix';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import getScroll from '../_util/getScroll';
import scrollTo from '../_util/scrollTo';
import AnchorContext from './context';

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

const sharpMatcherRegx = /#([\S ]+)$/;

interface Section {
  link: string;
  top: number;
}

export interface AnchorProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
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
}

interface InternalAnchorProps extends AnchorProps {
  anchorPrefixCls: string;
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

export interface AntAnchor {
  registerLink: (link: string) => void;
  unregisterLink: (link: string) => void;
  activeLink: string | null;
  scrollTo: (link: string) => void;
  onClick?: (
    e: React.MouseEvent<HTMLElement>,
    link: { title: React.ReactNode; href: string },
  ) => void;
}

const AnchorContent: React.FC<InternalAnchorProps> = (props) => {
  const {
    anchorPrefixCls: prefixCls,
    className = '',
    style,
    offsetTop,
    affix = true,
    showInkInFixed = false,
    children,
    bounds,
    targetOffset,
    onClick,
    onChange,
    getContainer,
    getCurrentAnchor,
  } = props;

  const [links, setLinks] = React.useState<string[]>([]);
  const [activeLink, setActiveLink] = React.useState<string | null>(null);
  const activeLinkRef = React.useRef<string | null>(activeLink);

  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const spanLinkNode = React.useRef<HTMLSpanElement>(null);
  const animating = React.useRef<boolean>(false);

  const { direction, getTargetContainer } = React.useContext<ConfigConsumerProps>(ConfigContext);

  const getCurrentContainer = getContainer ?? getTargetContainer ?? getDefaultContainer;

  const dependencyListItem: React.DependencyList[number] = JSON.stringify(links);

  const registerLink = React.useCallback<AntAnchor['registerLink']>(
    (link) => {
      if (!links.includes(link)) {
        setLinks((prev) => [...prev, link]);
      }
    },
    [dependencyListItem],
  );

  const unregisterLink = React.useCallback<AntAnchor['unregisterLink']>(
    (link) => {
      if (links.includes(link)) {
        setLinks((prev) => prev.filter((i) => i !== link));
      }
    },
    [dependencyListItem],
  );

  const updateInk = () => {
    const linkNode = wrapperRef.current?.querySelector<HTMLElement>(
      `.${prefixCls}-link-title-active`,
    );
    if (linkNode && spanLinkNode.current) {
      spanLinkNode.current.style.top = `${linkNode.offsetTop + linkNode.clientHeight / 2 - 4.5}px`;
    }
  };

  const getInternalCurrentAnchor = (_links: string[], _offsetTop = 0, _bounds = 5): string => {
    const linkSections: Section[] = [];
    const container = getCurrentContainer();
    _links.forEach((link) => {
      const sharpLinkMatch = sharpMatcherRegx.exec(link?.toString());
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

  const setCurrentActiveLink = (link: string) => {
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
  };

  const handleScroll = React.useCallback(() => {
    if (animating.current) {
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
      const container = getCurrentContainer();
      const scrollTop = getScroll(container, true);
      const sharpLinkMatch = sharpMatcherRegx.exec(link);
      if (!sharpLinkMatch) {
        return;
      }
      const targetElement = document.getElementById(sharpLinkMatch[1]);
      if (!targetElement) {
        return;
      }

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

  const inkClass = classNames(
    {
      [`${prefixCls}-ink-ball-visible`]: activeLink,
    },
    `${prefixCls}-ink-ball`,
  );

  const wrapperClass = classNames(
    `${prefixCls}-wrapper`,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
  );

  const anchorClass = classNames(prefixCls, {
    [`${prefixCls}-fixed`]: !affix && !showInkInFixed,
  });

  const wrapperStyle: React.CSSProperties = {
    maxHeight: offsetTop ? `calc(100vh - ${offsetTop}px)` : '100vh',
    ...style,
  };

  const anchorContent = (
    <div ref={wrapperRef} className={wrapperClass} style={wrapperStyle}>
      <div className={anchorClass}>
        <div className={`${prefixCls}-ink`}>
          <span className={inkClass} ref={spanLinkNode} />
        </div>
        {children}
      </div>
    </div>
  );

  React.useEffect(() => {
    const scrollContainer = getCurrentContainer();
    const scrollEvent = addEventListener(scrollContainer, 'scroll', handleScroll);
    handleScroll();
    return () => {
      scrollEvent?.remove();
    };
  }, [dependencyListItem]);

  React.useEffect(() => {
    if (typeof getCurrentAnchor === 'function') {
      setCurrentActiveLink(getCurrentAnchor(activeLinkRef.current || ''));
    }
  }, [getCurrentAnchor]);

  React.useEffect(() => {
    updateInk();
  }, [getCurrentAnchor, dependencyListItem, activeLink]);

  const memoizedContextValue = React.useMemo<AntAnchor>(
    () => ({
      registerLink,
      unregisterLink,
      scrollTo: handleScrollTo,
      activeLink,
      onClick,
    }),
    [activeLink, onClick, handleScrollTo],
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
  const { prefixCls: customizePrefixCls } = props;
  const { getPrefixCls } = React.useContext<ConfigConsumerProps>(ConfigContext);
  const anchorPrefixCls = getPrefixCls('anchor', customizePrefixCls);
  return <AnchorContent {...props} anchorPrefixCls={anchorPrefixCls} />;
};

export default Anchor;
