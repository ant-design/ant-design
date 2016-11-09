import React from 'react';
import className from 'classnames';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import AnchorLink from './AnchorLink';
import Affix from '../affix';
import AnchorHelper, { getDefaultTarget } from './anchorHelper';

export interface AnchorProps {
  target: () => HTMLElement | Window;
  children: React.ReactNode;
  prefixCls?: string;
  offsetTop?: number;
  bounds?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default class Anchor extends React.Component<AnchorProps, any> {
  static Link = AnchorLink;

  static defaultProps = {
    prefixCls: 'ant-anchor',
  };

  static childContextTypes = {
    anchorHelper: React.PropTypes.any,
  };

  refs: {
    ink?: any;
  };

  private scrollEvent: any;
  private anchorHelper: AnchorHelper;

  constructor(props) {
    super(props);
    this.state = {
      activeAnchor: null,
    };
    this.anchorHelper = new AnchorHelper();
  }

  handleScroll = () => {
    this.setState({
      activeAnchor: this.anchorHelper.getCurrentAnchor(this.props.bounds),
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
    this.updateInk();
  }

  updateInk = () => {
    const activeAnchor = this.anchorHelper.getCurrentActiveAnchor();
    if (activeAnchor) {
      this.refs.ink.style.top = `${activeAnchor.offsetTop + activeAnchor.clientHeight / 2 - 4.5}px`;
    }
  }

  renderAnchorLink = (child) => {
    const { href } = child.props;
    if (href) {
      this.anchorHelper.addLink(href);
      return React.cloneElement(child, {
        onClick: this.anchorHelper.scrollTo,
        prefixCls: this.props.prefixCls,
        bounds: this.props.bounds,
      });
    }
    return child;
  }

  render() {
    const { prefixCls, offsetTop } = this.props;
    const { activeAnchor } = this.state;
    const inkClass = className({
      [`${prefixCls}-ink-ball`]: true,
      visible: !!activeAnchor,
    });

    return (
      <Affix offsetTop={offsetTop}>
        <div className={`${prefixCls}-wrapper`}>
          <div className={prefixCls}>
            <div className={`${prefixCls}-ink`} >
              <span className={inkClass} ref="ink" />
            </div>
            {React.Children.map(this.props.children, this.renderAnchorLink)}
          </div>
        </div>
      </Affix>
    );
  }
}
