import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import Affix from '../affix';
import AnchorLink from './AnchorLink';
import getScroll from '../_util/getScroll';
import getRequestAnimationFrame from '../_util/getRequestAnimationFrame';

function getDefaultContainer() {
  return window;
}

function getOffsetTop(element: HTMLElement, container: AnchorContainer): number {
  if (!element) {
    return 0;
  }

  if (!element.getClientRects().length) {
    return 0;
  }

  const rect = element.getBoundingClientRect();

  if (rect.width || rect.height) {
    if (container === window) {
      container = element.ownerDocument.documentElement;
      return rect.top - container.clientTop;
    }
    return rect.top - (container as HTMLElement).getBoundingClientRect().top;
  }

  return rect.top;
}

function easeInOutCubic(t: number, b: number, c: number, d: number) {
  const cc = c - b;
  t /= d / 2;
  if (t < 1) {
    return cc / 2 * t * t * t + b;
  }
  return cc / 2 * ((t -= 2) * t * t + 2) + b;
}

const reqAnimFrame = getRequestAnimationFrame();
const sharpMatcherRegx = /#([^#]+)$/;
function scrollTo(href: string, offsetTop = 0, getContainer: () => AnchorContainer, callback = () => { }) {
  const container = getContainer();
  const scrollTop = getScroll(container, true);
  const sharpLinkMatch = sharpMatcherRegx.exec(href);
  if (!sharpLinkMatch) { return; }
  const targetElement = document.getElementById(sharpLinkMatch[1]);
  if (!targetElement) {
    return;
  }
  const eleOffsetTop = getOffsetTop(targetElement, container);
  const targetScrollTop = scrollTop + eleOffsetTop - offsetTop;
  const startTime = Date.now();
  const frameFunc = () => {
    const timestamp = Date.now();
    const time = timestamp - startTime;
    const nextScrollTop = easeInOutCubic(time, scrollTop, targetScrollTop, 450);
    if (container === window) {
      window.scrollTo(window.pageXOffset, nextScrollTop);
    } else {
      (container as HTMLElement).scrollTop = nextScrollTop;
    }
    if (time < 450) {
      reqAnimFrame(frameFunc);
    } else {
      callback();
    }
  };
  reqAnimFrame(frameFunc);
  history.pushState(null, '', href);
}

type Section = {
  link: String;
  top: number;
};

export type AnchorContainer =  HTMLElement | Window;

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
}

export interface AnchorDefaultProps extends AnchorProps {
  prefixCls: string;
  affix: boolean;
  showInkInFixed: boolean;
  getContainer: () => AnchorContainer;
}

export default class Anchor extends React.Component<AnchorProps, any> {
  static Link: typeof AnchorLink;

  static defaultProps = {
    prefixCls: 'ant-anchor',
    affix: true,
    showInkInFixed: false,
    getContainer: getDefaultContainer,
  };

  static childContextTypes = {
    antAnchor: PropTypes.object,
  };

  private inkNode: HTMLSpanElement;

  private links: String[];
  private scrollEvent: any;
  private animating: boolean;

  constructor(props: AnchorProps) {
    super(props);
    this.state = {
      activeLink: null,
    };
    this.links = [];
  }

  getChildContext() {
    return {
      antAnchor: {
        registerLink: (link: String) => {
          if (!this.links.includes(link)) {
            this.links.push(link);
          }
        },
        unregisterLink: (link: String) => {
          const index = this.links.indexOf(link);
          if (index !== -1) {
            this.links.splice(index, 1);
          }
        },
        activeLink: this.state.activeLink,
        scrollTo: this.handleScrollTo,
      },
    };
  }

  componentDidMount() {
    const { getContainer } = this.props as AnchorDefaultProps;
    this.scrollEvent = addEventListener(getContainer(), 'scroll', this.handleScroll);
    this.handleScroll();
  }

  componentWillUnmount() {
    if (this.scrollEvent) {
      this.scrollEvent.remove();
    }
  }

  componentDidUpdate() {
    this.updateInk();
  }

  handleScroll = () => {
    if (this.animating) {
      return;
    }
    const { offsetTop, bounds } = this.props;
    this.setState({
      activeLink: this.getCurrentAnchor(offsetTop, bounds),
    });
  }

  handleScrollTo = (link: string) => {
    const { offsetTop, getContainer } = this.props as AnchorDefaultProps;
    this.animating = true;
    this.setState({ activeLink: link });
    scrollTo(link, offsetTop, getContainer, () => {
      this.animating = false;
    });
  }

  getCurrentAnchor(offsetTop = 0, bounds = 5) {
    let activeLink = '';
    if (typeof document === 'undefined') {
      return activeLink;
    }

    const linkSections: Array<Section> = [];
    const { getContainer } = this.props as AnchorDefaultProps;
    const container = getContainer();
    this.links.forEach(link => {
      const sharpLinkMatch = sharpMatcherRegx.exec(link.toString());
      if (!sharpLinkMatch) { return; }
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
      const maxSection = linkSections.reduce((prev, curr) => curr.top > prev.top ? curr : prev);
      return maxSection.link;
    }
    return '';
  }

  updateInk = () => {
    if (typeof document === 'undefined') {
      return;
    }
    const { prefixCls } = this.props;
    const anchorNode = ReactDOM.findDOMNode(this) as Element;
    const linkNode = anchorNode.getElementsByClassName(`${prefixCls}-link-title-active`)[0];
    if (linkNode) {
      this.inkNode.style.top = `${(linkNode as any).offsetTop + linkNode.clientHeight / 2 - 4.5}px`;
    }
  }

  saveInkNode = (node: HTMLSpanElement) => {
    this.inkNode = node;
  }

  render() {
    const {
      prefixCls,
      className = '',
      style,
      offsetTop,
      affix,
      showInkInFixed,
      children,
    } = this.props;
    const { activeLink } = this.state;

    const inkClass = classNames(`${prefixCls}-ink-ball`, {
      visible: activeLink,
    });

    const wrapperClass = classNames(className, `${prefixCls}-wrapper`);

    const anchorClass = classNames(prefixCls, {
      'fixed': !affix && !showInkInFixed,
    });

    const wrapperStyle = {
      maxHeight: offsetTop ? `calc(100vh - ${offsetTop}px)` : '100vh',
      ...style,
    };

    const anchorContent = (
      <div
        className={wrapperClass}
        style={wrapperStyle}
      >
        <div className={anchorClass}>
          <div className={`${prefixCls}-ink`} >
            <span className={inkClass} ref={this.saveInkNode} />
          </div>
          {children}
        </div>
      </div>
    );

    return !affix ? anchorContent : (
      <Affix offsetTop={offsetTop}>
        {anchorContent}
      </Affix>
    );
  }
}
