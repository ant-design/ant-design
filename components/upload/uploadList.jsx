import React from 'react';
import Animate from 'rc-animate';
import Icon from '../icon';
const prefixCls = 'ant-upload';
import { Line } from '../progress';

export default React.createClass({
  getDefaultProps() {
    return {
      items: [],
      progressAttr: {
        strokeWidth: 3,
        showInfo: false
      }
    };
  },
  handleClose(file) {
    this.props.onRemove(file);
  },
  render() {
    let list = this.props.items.map((file) => {
      let progress;
      let infoUploadingClass = '';
      if (file.status === 'uploading') {
        progress = <div className={prefixCls + '-list-item-progress'}>
          <Line {...this.props.progressAttr} percent={file.percent} />
        </div>;
        infoUploadingClass = ' ' + prefixCls + '-list-item-uploading';
      }
      return (
        <div className={prefixCls + '-list-item' + infoUploadingClass} key={file.uid}>
          <div className={prefixCls + '-list-item-info'}>
            <Icon type="paper-clip" />
            <span className="ant-upload-item-name">{file.name}</span>
            <Icon type="cross" ref="theCloseBtn"
              onClick={this.handleClose.bind(this, file)} />
          </div>
          { progress }
        </div>
      );
    });
    return <div className={prefixCls + '-list'}>
      <Animate transitionName={prefixCls + '-margin-top'}>
        {list}
      </Animate>
    </div>;
  }
});
