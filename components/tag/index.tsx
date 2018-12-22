import * as React from 'react';
import Animate from 'rc-animate';
import classNames from 'classnames';
import omit from 'omit.js';
import { polyfill } from 'react-lifecycles-compat';
import Icon from '../icon';
import CheckableTag from './CheckableTag';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Wave from '../_util/wave';

export { CheckableTagProps } from './CheckableTag';

export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  className?: string;
  color?: string;
  closable?: boolean;
  visible?: boolean;
  onClose?: Function;
  afterClose?: Function;
  style?: React.CSSProperties;
}

interface TagState {
  visible: boolean;
}

interface InnterTagProps extends TagProps {
  show: boolean;
}

const InnerTag = ({ show, ...restProps }: InnterTagProps) => {
  const divProps = omit(restProps, ['onClose', 'afterClose', 'color', 'visible', 'closable']);
  return <div {...divProps} />;
};

class Tag extends React.Component<TagProps, TagState> {
  static CheckableTag = CheckableTag;
  static defaultProps = {
    closable: false,
  };

  static getDerivedStateFromProps(nextProps: TagProps) {
    if ('visible' in nextProps) {
      return {
        visible: nextProps.visible,
      };
    }
    return null;
  }

  state = {
    visible: true,
  };

  setVisible(visible: boolean, e: React.MouseEvent<HTMLElement>) {
    const { onClose } = this.props;
    if (onClose) {
      onClose(e);
    }
    if (e.defaultPrevented) {
      return;
    }
    if (!('visible' in this.props)) {
      this.setState({ visible });
    }
  }

  handleIconClick = (e: React.MouseEvent<HTMLElement>) => {
    this.setVisible(false, e);
  };

  animationEnd = () => {
    const { afterClose } = this.props;
    if (afterClose) {
      afterClose();
    }
  };

  isPresetColor(color?: string): boolean {
    if (!color) {
      return false;
    }
    return /^(pink|red|yellow|orange|cyan|green|blue|purple|geekblue|magenta|volcano|gold|lime)(-inverse)?$/.test(
      color,
    );
  }

  getTagStyle() {
    const { color, style } = this.props;
    const isPresetColor = this.isPresetColor(color);
    return {
      backgroundColor: color && !isPresetColor ? color : undefined,
      ...style,
    };
  }

  getTagClassName({ getPrefixCls }: ConfigConsumerProps) {
    const { prefixCls: customizePrefixCls, className, color } = this.props;
    const { visible } = this.state;
    const isPresetColor = this.isPresetColor(color);
    const prefixCls = getPrefixCls('tag', customizePrefixCls);
    return classNames(
      prefixCls,
      {
        [`${prefixCls}-${color}`]: isPresetColor,
        [`${prefixCls}-has-color`]: color && !isPresetColor,
        [`${prefixCls}-hidden`]: !visible,
      },
      className,
    );
  }

  renderCloseIcon() {
    const { closable } = this.props;
    return closable ? <Icon type="close" onClick={this.handleIconClick} /> : null;
  }

  renderTag = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, children, ...otherProps } = this.props;
    const { visible } = this.state;
    const prefixCls = getPrefixCls('tag', customizePrefixCls);
    return (
      <Wave>
        <Animate
          component=""
          showProp="show"
          transitionName={`${prefixCls}-zoom`}
          onEnd={this.animationEnd}
        >
          <InnerTag
            show={visible}
            {...otherProps}
            className={this.getTagClassName({ getPrefixCls })}
            style={this.getTagStyle()}
          >
            {children}
            {this.renderCloseIcon()}
          </InnerTag>
        </Animate>
      </Wave>
    );
  }

  render() {
    return <ConfigConsumer>{this.renderTag}</ConfigConsumer>;
  }
}

polyfill(Tag);

export default Tag;
