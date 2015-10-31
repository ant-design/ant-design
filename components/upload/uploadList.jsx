import React from 'react';
const prefixCls = 'ant-upload';
import Animate from 'rc-animate';
import {Line} from '../progress';

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
  getInitialState() {
    return {
      items: this.props.items
    };
  },
  componentWillReceiveProps(nextProps) {
    if ('items' in nextProps) {
      this.setState({
        items: nextProps.items
      });
    }
  },
  handleClose(file) {
    this.props.onRemove(file);
  },
  handleReupload(file) {
    this.props.onReupload(file);
  },
  render() {
    let list = this.state.items.map((file) => {
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
            <i className="anticon anticon-paper-clip"></i>
            <span className="ant-upload-item-name">{file.name}</span>
            <i className="anticon anticon-cross" ref="theCloseBtn"
               onClick={this.handleClose.bind(this, file)}></i>
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
