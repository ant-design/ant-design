import React from 'react';
import ReactDOM from 'react-dom';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import getScroll from '../_util/getScroll';
import AnchorLink from './AnchorLink';
import Affix from '../affix';
import getRequestAnimationFrame from '../_util/getRequestAnimationFrame';

const reqAnimFrame = getRequestAnimationFrame();

const easeInOutCubic = (t, b, c, d) => {
  t /= d/2;
	if (t < 1) return c/2*t*t*t + b;
	t -= 2;
	return c/2*(t*t*t + 2) + b;
};

function getDefaultTarget() {
  return typeof window !== 'undefined' ?
    window : null;
}

function getOffsetTop(element): number {
  if (!element) {
    return 0;
  }

  if (!element.getClientRects().length) {
    return 0;
  }

  const rect = element.getBoundingClientRect();

  if ( rect.width || rect.height ) {
    const doc = element.ownerDocument;
    const docElem = doc.documentElement;
    return  rect.top - docElem.clientTop;
  }

  return rect.top;
}

export interface AnchorProps {
  target: () => HTMLElement | Window;
  children: React.ReactNode;
  prefixCls?: string;
} 


export default class Anchor extends React.Component<AnchorProps, any> {
  static AnchorLink = AnchorLink;
  static defaultProps = {
    prefixCls: 'ant-anchor'
  };

  private scrollEvent: any;
  private sections: Array<string> = [];

  constructor(props) {
    super(props);
    this.state = {
      activeAnchor: null,
    };
  }
  handleScroll = () => {
    const { target = getDefaultTarget } = this.props;
    const scrollTop = getScroll(target(), true);
    let activeAnchor;

    this.sections.forEach(section => {
      const target = document.querySelector(section);
      if (target) {
        const top = getOffsetTop(target);
        const bottom = top + target.clientHeight;
        if ((top <= 5) && (bottom >= -5)) {
          activeAnchor = section;
        }
      }
    });

    this.setState({
      activeAnchor,
    });
  }

  componentDidMount() {
    this.handleScroll();
    this.scrollEvent = addEventListener((this.props.target || getDefaultTarget)(), 'scroll', this.handleScroll);
  }

  componentWillUnmount() {
    if (this.scrollEvent) {
      this.scrollEvent.remove();
    }
  }

  scrollTo = (href) => {
    const { target = getDefaultTarget } = this.props;
    const scrollTop = getScroll(target(), true);
    const offsetTop = getOffsetTop(document.querySelector(href));
    const startTime = Date.now();
    const frameFunc = () => {
      const timestamp = Date.now();
      const time = timestamp - startTime;
      document.body.scrollTop = easeInOutCubic(time, scrollTop, offsetTop, 450);
      if (time < 450) {
        reqAnimFrame(frameFunc);
      }
    };
    reqAnimFrame(frameFunc);
  }

  renderAnchorLink = (child) => {
    const { href } = child.props;
    if (href) {
      if (this.sections.indexOf(href) === -1) {
        this.sections.push(href);
      }
      return React.cloneElement(child, {
        onClick: this.scrollTo,
        active: this.state.activeAnchor === href,
        prefixCls: this.props.prefixCls,
      });
    }
    return child;
  }

  render() {
    const { prefixCls } = this.props;
    return <Affix>
      <div className={prefixCls}>{React.Children.map(this.props.children, this.renderAnchorLink)}</div>
    </Affix>;
  }
}

