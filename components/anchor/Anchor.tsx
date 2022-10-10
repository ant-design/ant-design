/* eslint-disable @typescript-eslint/no-shadow */
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

const Anchor: React.FC<InternalAnchorProps> = props => {
  const {
    affix = true,
    showInkInFixed = false,
    anchorPrefixCls: prefixCls,
    className = '',
    style,
    children,
    onClick,
    offsetTop,
    targetOffset,
    bounds,
    onChange,
    getCurrentAnchor,
    getContainer,
  } = props;
  const { direction, getTargetContainer } = React.useContext<ConfigConsumerProps>(ConfigContext);
  const [activeLink, setActiveLink] = React.useState<null | string>(null);
  const [animating, setAnimating] = React.useState<boolean>(false);
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const inkNode = React.useRef<HTMLSpanElement>(null);
  const links = React.useRef<string[]>([]);

  const registerLink = (link: string) => {
    if (!links.current.includes(link)) {
      links.current.push(link);
    }
  };

  const unregisterLink = (link: string) => {
    const index = links.current.indexOf(link);
    if (index !== -1) {
      links.current.splice(index, 1);
    }
  };

  const setCurrentActiveLink = (link: string, triggerChange = true) => {
    if (activeLink === link) {
      return;
    }
    // https://github.com/ant-design/ant-design/issues/30584
    setActiveLink(typeof getCurrentAnchor === 'function' ? getCurrentAnchor(link) : link);
    if (triggerChange) {
      onChange?.(link);
    }
  };

  const getAnchorContainer = () => {
    const getFunc = getContainer ?? getTargetContainer ?? getDefaultContainer;
    return getFunc();
  };

  const getCurrentAnchorFn = (offsetTop = 0, bounds = 5): string => {
    const linkSections: Section[] = [];
    const container = getContainer?.();
    links.current.forEach(link => {
      const sharpLinkMatch = sharpMatcherRegx.exec(link?.toString());
      if (!sharpLinkMatch) {
        return;
      }
      const target = document.getElementById(sharpLinkMatch[1]);
      if (target) {
        const top = getOffsetTop(target, container!);
        if (top < offsetTop + bounds) {
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

  const handleScroll = () => {
    if (animating) {
      return;
    }

    const currentActiveLink = getCurrentAnchorFn?.(
      targetOffset !== undefined ? targetOffset : offsetTop || 0,
      bounds,
    );
    setCurrentActiveLink(currentActiveLink!);
  };

  const updateInk = () => {
    const linkNode = wrapperRef.current?.querySelector<HTMLDivElement>(
      `${prefixCls}-link-title-active`,
    );
    if (linkNode) {
      linkNode.style.top = `${(linkNode as any).offsetTop + linkNode.clientHeight / 2 - 4.5}px`;
    }
  };
  const scrollContainer = React.useRef<AnchorContainer>();

  const scrollEvent = React.useRef<typeof addEventListener>();

  React.useEffect(() => {
    scrollContainer.current = getContainer?.();
    scrollEvent.current = addEventListener(scrollContainer.current, 'scroll', handleScroll);
    handleScroll();
    return () => {
      if (scrollEvent.current) {
        scrollEvent.current.remove();
      }
    };
  }, []);

  React.useEffect(() => {
    if (scrollEvent.current) {
      const currentContainer = getContainer?.();
      if (scrollContainer.current !== currentContainer) {
        scrollContainer.current = currentContainer;
        scrollEvent.current?.remove();
        scrollEvent.current = addEventListener(scrollContainer.current, 'scroll', handleScroll);
        handleScroll();
      }
    }
    if (typeof getCurrentAnchor === 'function') {
      setCurrentActiveLink(getCurrentAnchor(activeLink || ''), false);
    }
    updateInk();
  }, [props, activeLink]);

  const handleScrollTo = (link: string) => {
    setCurrentActiveLink(link);
    const container = getAnchorContainer();
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
    setAnimating(true);
    scrollTo(y, {
      getContainer,
      callback() {
        setAnimating(false);
      },
    });
  };

  const anchorClass = classNames(prefixCls, {
    [`${prefixCls}-fixed`]: !affix && !showInkInFixed,
  });

  const wrapperStyle = {
    maxHeight: offsetTop ? `calc(100vh - ${offsetTop}px)` : '100vh',
    ...style,
  };

  const inkClass = classNames(`${prefixCls}-ink-ball`, {
    visible: activeLink,
  });

  const wrapperClass = classNames(
    `${prefixCls}-wrapper`,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
  );

  const anchorContent = (
    <div ref={wrapperRef} className={wrapperClass} style={wrapperStyle}>
      <div className={anchorClass}>
        <div className={`${prefixCls}-ink`}>
          <span className={inkClass} ref={inkNode} />
        </div>
        {children}
      </div>
    </div>
  );

  const memoizedContextValue = React.useMemo<AntAnchor>(
    () => ({
      registerLink,
      unregisterLink,
      scrollTo: handleScrollTo,
      activeLink,
      onClick,
    }),
    [registerLink, unregisterLink, handleScrollTo, onClick, activeLink],
  );

  return (
    <AnchorContext.Provider value={memoizedContextValue}>
      {affix ? (
        <Affix offsetTop={offsetTop} target={getContainer}>
          {anchorContent}
        </Affix>
      ) : (
        anchorContent
      )}
    </AnchorContext.Provider>
  );
};

const AnchorFC: React.FC<AnchorProps> = props => {
  const { prefixCls: customizePrefixCls } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);

  const anchorPrefixCls = getPrefixCls('anchor', customizePrefixCls);

  return <Anchor {...props} anchorPrefixCls={anchorPrefixCls} />;
};

export default AnchorFC;
