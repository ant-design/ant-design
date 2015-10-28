import React from 'react';
import { classSet } from 'rc-util';

const AntSpin = React.createClass({
  getDefaultProps() {
    return {
      size: 'default',
      loading: false
    };
  },

  propTypes: {
    loading: React.PropTypes.bool,
    className: React.PropTypes.string,
    size: React.PropTypes.oneOf(['small', 'default', 'large'])
  },

  getIEVersion() {
    let ua = navigator.userAgent.toLowerCase();
    return ua.match(/msie ([\d.]+)/)[1];
  },

  isNestedPattern() {
    return this.props.children ? true : false;
  },

  render() {
    const prefix = 'ant-spin';
    const nestedStatus = this.isNestedPattern();
    const { loading, className, size, ...others } = this.props;
    const sizeCls = ({
      'large': 'lg',
      'small': 'sm'
    })[size] || '';

    let loadingClassName = classSet({
      'ant-spin-nested-loading': nestedStatus && !!loading,
      'ant-spin-not-nested-loading': !nestedStatus
    });
    let spinClassName = classSet({
      'ant-spin': true,
      [className]: !!className
    });

    let spinEl;
    let _IE = this.getIEVersion();
    if (_IE === '8.0' || _IE === '9.0') {
      // IE 8 or IE 9
      spinEl = <div className={ spinClassName }>加载中...</div>;
    }else {
      let spinWrapperClassName = classSet({
        'ant-spin-wrapper': true,
        [`${prefix}-${sizeCls}`]: sizeCls
      });
      spinEl = (<div className={ spinWrapperClassName }>
                  <div className={ spinClassName }>
                    <span className="ant-spin-dot ant-spin-dot-first" />
                    <span className="ant-spin-dot ant-spin-dot-second" />
                    <span className="ant-spin-dot ant-spin-dot-third" />
                  </div>
                </div>);
    }

    let spinContainerEl = nestedStatus ?
        <div className="ant-spin-container">
          { this.props.children }
        </div> : null;

    return (
      <div {...this.props} className={ loadingClassName }>
        { spinEl }
        { spinContainerEl }
      </div>
    );
  }
});

export default AntSpin;

