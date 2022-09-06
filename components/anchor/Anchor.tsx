import classNames from 'classnames';
import memoizeOne from 'memoize-one';
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

type Section = {
  link: string;
  top: number;
};

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

class Anchor extends React.Component<InternalAnchorProps, AnchorState, ConfigConsumerProps> {
  static defaultProps = {
    affix: true,
    showInkInFixed: false,
  };

  static contextType = ConfigContext;

  state = {
    activeLink: null,
  };

  context: ConfigConsumerProps;

  private wrapperRef = React.createRef<HTMLDivElement>();

  private inkNode: HTMLSpanElement;

  // scroll scope's container
  private scrollContainer: HTMLElement | Window;

  private links: string[] = [];

  private scrollEvent: any;

  private animating: boolean;

  private prefixCls?: string;

  // Context
  registerLink = (link: string) => {
    if (!this.links.includes(link)) {
      this.links.push(link);
    }
  };

  unregisterLink = (link: string) => {
    const index = this.links.indexOf(link);
    if (index !== -1) {
      this.links.splice(index, 1);
    }
  };

  getContainer = () => {
    const { getTargetContainer } = this.context;
    const { getContainer } = this.props;

    const getFunc = getContainer || getTargetContainer || getDefaultContainer;

    return getFunc();
  };

  componentDidMount() {
    this.scrollContainer = this.getContainer();
    this.scrollEvent = addEventListener(this.scrollContainer, 'scroll', this.handleScroll);
    this.handleScroll();
  }

  componentDidUpdate() {
    if (this.scrollEvent) {
      const currentContainer = this.getContainer();
      if (this.scrollContainer !== currentContainer) {
        this.scrollContainer = currentContainer;
        this.scrollEvent.remove();
        this.scrollEvent = addEventListener(this.scrollContainer, 'scroll', this.handleScroll);
        this.handleScroll();
      }
    }
    this.updateInk();
  }

  componentWillUnmount() {
    if (this.scrollEvent) {
      this.scrollEvent.remove();
    }
  }

  getCurrentAnchor(offsetTop = 0, bounds = 5): string {
    const linkSections: Array<Section> = [];
    const container = this.getContainer();
    this.links.forEach(link => {
      const sharpLinkMatch = sharpMatcherRegx.exec(link.toString());
      if (!sharpLinkMatch) {
        return;
      }
      const target = document.getElementById(sharpLinkMatch[1]);
      if (target) {
        const top = getOffsetTop(target, container);
        if (top < offsetTop + bounds) {
          linkSections.push({
            link,
            top,
          });
        }
      }
    });

    if (linkSections.length) {
      const maxSection = linkSections.reduce((prev, curr) => (curr.top > prev.top ? curr : prev));
      return maxSection.link;
    }
    return '';
  }

  handleScrollTo = (link: string) => {
    const { offsetTop, targetOffset } = this.props;

    this.setCurrentActiveLink(link);
    const container = this.getContainer();
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
    this.animating = true;

    scrollTo(y, {
      callback: () => {
        this.animating = false;
      },
      getContainer: this.getContainer,
    });
  };

  saveInkNode = (node: HTMLSpanElement) => {
    this.inkNode = node;
  };

  setCurrentActiveLink = (link: string) => {
    const { activeLink } = this.state;
    const { onChange, getCurrentAnchor } = this.props;
    if (activeLink === link) {
      return;
    }
    // https://github.com/ant-design/ant-design/issues/30584
    this.setState({
      activeLink: typeof getCurrentAnchor === 'function' ? getCurrentAnchor(link) : link,
    });
    onChange?.(link);
  };

  handleScroll = () => {
    if (this.animating) {
      return;
    }
    const { offsetTop, bounds, targetOffset } = this.props;
    const currentActiveLink = this.getCurrentAnchor(
      targetOffset !== undefined ? targetOffset : offsetTop || 0,
      bounds,
    );
    this.setCurrentActiveLink(currentActiveLink);
  };

  updateInk = () => {
    const { prefixCls, wrapperRef } = this;
    const anchorNode = wrapperRef.current;
    const linkNode = anchorNode?.getElementsByClassName(`${prefixCls}-link-title-active`)[0];

    if (linkNode) {
      this.inkNode.style.top = `${(linkNode as any).offsetTop + linkNode.clientHeight / 2 - 4.5}px`;
    }
  };

  getMemoizedContextValue = memoizeOne(
    (link: AntAnchor['activeLink'], onClickFn: AnchorProps['onClick']): AntAnchor => ({
      registerLink: this.registerLink,
      unregisterLink: this.unregisterLink,
      scrollTo: this.handleScrollTo,
      activeLink: link,
      onClick: onClickFn,
    }),
  );

  render() {
    const { direction } = this.context;
    const {
      anchorPrefixCls: prefixCls,
      className = '',
      style,
      offsetTop,
      affix,
      showInkInFixed,
      children,
      onClick,
    } = this.props;
    const { activeLink } = this.state;

    // To support old version react.
    // Have to add prefixCls on the instance.
    // https://github.com/facebook/react/issues/12397
    this.prefixCls = prefixCls;

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

    const anchorClass = classNames(prefixCls, {
      [`${prefixCls}-fixed`]: !affix && !showInkInFixed,
    });

    const wrapperStyle = {
      maxHeight: offsetTop ? `calc(100vh - ${offsetTop}px)` : '100vh',
      ...style,
    };

    const anchorContent = (
      <div ref={this.wrapperRef} className={wrapperClass} style={wrapperStyle}>
        <div className={anchorClass}>
          <div className={`${prefixCls}-ink`}>
            <span className={inkClass} ref={this.saveInkNode} />
          </div>
          {children}
        </div>
      </div>
    );

    const contextValue = this.getMemoizedContextValue(activeLink, onClick);

    return (
      <AnchorContext.Provider value={contextValue}>
        {!affix ? (
          anchorContent
        ) : (
          <Affix offsetTop={offsetTop} target={this.getContainer}>
            {anchorContent}
          </Affix>
        )}
      </AnchorContext.Provider>
    );
  }
}
// just use in test
export type InternalAnchorClass = Anchor;

const AnchorFC = React.forwardRef<Anchor, AnchorProps>((props, ref) => {
  const { prefixCls: customizePrefixCls } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);

  const anchorPrefixCls = getPrefixCls('anchor', customizePrefixCls);

  const anchorProps: InternalAnchorProps = {
    ...props,

    anchorPrefixCls,
  };

  return <Anchor {...anchorProps} ref={ref} />;
});

export default AnchorFC;
