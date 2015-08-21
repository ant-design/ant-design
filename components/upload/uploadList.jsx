import React from 'react';
import getFileItem from './getFileItem';
const prefixCls = 'ant-upload';
import Animate from 'rc-animate';

export default React.createClass({
  getDefaultProps() {
    return {
      items: []
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
    let matchWay = (!file.uid) ? 'byName' : 'byUid';
    let items = this.state.items;
    let removeItem = getFileItem(file, items);
    if (removeItem) {
      items.splice(items.indexOf(removeItem), 1);
    }
    this.setState({
      items: items
    });
  },
  render() {
    let items = this.state.items;
    let downloadItem = (file) => {
      let statusIcon = file.status === 'done' ? <i className={'anticon anticon-check ' + prefixCls + '-success-icon'}></i> : <i className="anticon anticon-loading"></i>;
      return (
        <div className={prefixCls + '-list-item'} key={file.index}>
          {statusIcon}
          <b className={prefixCls + '-item-name'}>{file.filename}</b>
          <i className="anticon anticon-cross" ref="theCloseBtn"
            onClick={this.handleClose.bind(this, file)}></i>
        </div>
      );
    };
    return (<div className={prefixCls + '-list'}>
      <Animate transitionName='m-top'>
      {items.map(downloadItem)}
      </Animate>
    </div>);
  }
});
