import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import AnchorLink from './AnchorLink';
import Affix from '../affix';
import AnchorHelper, { getDefaultTarget } from './anchorHelper';

export interface AnchorProps {
  target?: () => HTMLElement | Window;
  children?: React.ReactNode;
  prefixCls?: string;
  offsetTop?: number;
  bounds?: number;
  className?: string;
  style?: React.CSSProperties;
  affix?: boolean;
  showInkInFixed?: boolean;
}

export default class Anchor extends React.Component<AnchorProps, any> {
  static Link = AnchorLink;

  static defaultProps = {
    prefixCls: 'ant-anchor',
    affix: true,
    showInkInFixed: false,
  };

  static childContextTypes = {
    anchorHelper: PropTypes.any,
  };

  refs: {
    ink?: any;
  };

  private scrollEvent: any;
  private anchorHelper: AnchorHelper;
  private _avoidInk: boolean;

  constructor(props: AnchorProps) {
    super(props);
    this.state = {
      activeAnchor: null,
      animated: true,
    };
    this.anchorHelper = new AnchorHelper();
  }

  handleScroll = () => {
    this.setState({
      activeAnchor: this.anchorHelper.getCurrentAnchor(this.props.offsetTop, this.props.bounds),
    });
  }

  getChildContext() {
    return {
      anchorHelper: this.anchorHelper,
    };
  }

  componentDidMount() {
    this.handleScroll();
    this.updateInk();
    this.scrollEvent = addEventListener((this.props.target || getDefaultTarget)(), 'scroll', this.handleScroll);
  }

  componentWillUnmount() {
    if (this.scrollEvent) {
      this.scrollEvent.remove();
    }
  }

  componentDidUpdate() {
    if (!this._avoidInk) {
      this.updateInk();
    }
  }

  updateInk = () => {
    const activeAnchor = this.anchorHelper.getCurrentActiveAnchor();
    if (activeAnchor) {
      this.refs.ink.style.top = `${activeAnchor.offsetTop + activeAnchor.clientHeight / 2 - 4.5}px`;
    }
  }

  clickAnchorLink = (href: string, component: HTMLElement) => {
    this._avoidInk = true;
    this.refs.ink.style.top = `${component.offsetTop + component.clientHeight / 2 - 4.5}px`;
    this.anchorHelper.scrollTo(href, this.props.offsetTop, getDefaultTarget, () => {
      this._avoidInk = false;
    });
  }

  renderAnchorLink = (child: React.ReactElement<any>) => {
    const { href } = child.props;
    const { type } = child as any;
    if (type.__ANT_ANCHOR_LINK && href) {
      this.anchorHelper.addLink(href);
      return React.cloneElement(child, {
        onClick: this.clickAnchorLink,
        prefixCls: this.props.prefixCls,
        bounds: this.props.bounds,
        affix: this.props.affix || this.props.showInkInFixed,
        offsetTop: this.props.offsetTop,
      });
    }
    return child;
  }

  render() {
    const { prefixCls, offsetTop, style, className = '', affix, showInkInFixed } = this.props;
    const { activeAnchor, animated } = this.state;
    const inkClass = classNames({
      [`${prefixCls}-ink-ball`]: true,
      animated,
      visible: !!activeAnchor,
    });

    const wrapperClass = classNames({
      [`${prefixCls}-wrapper`]: true,
    }, className);

    const anchorClass = classNames(prefixCls, {
      'fixed': !affix && !showInkInFixed,
    });

    const anchorContent = (
      <div className={wrapperClass} style={style}>
        <div className={anchorClass}>
          <div className={`${prefixCls}-ink`} >
            <span className={inkClass} ref="ink" />
          </div>
          {React.Children.toArray(this.props.children).map(this.renderAnchorLink)}
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
