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
    let items = this.state.items;
    let removeItem = getFileItem(file, items);
    if (removeItem) {
      items.splice(items.indexOf(removeItem), 1);
    }
    this.setState({
      items: items
    });
    this.props.onRemove(file.file);
  },
  render() {
    let list = this.state.items.map((file) => {
      let statusIcon = file.status === 'done' ? <i className={'anticon anticon-check ' + prefixCls + '-success-icon'}></i> :
        <i className="anticon anticon-loading"></i>;
      let filename = file.url ? <a className={prefixCls + '-item-name'} href={file.url} _target="_blank">{file.name}</a> :
        <b className={prefixCls + '-item-name'}>{file.name}</b>;
      return (
        <div className={prefixCls + '-list-item'} key={file.uid}>
          {statusIcon}
          {filename}
          <i className="anticon anticon-cross" ref="theCloseBtn"
             onClick={this.handleClose.bind(this, file)}></i>
        </div>
      );
    });
    return (<div className={prefixCls + '-list'}>
      <Animate transitionName={prefixCls + '-margin-top'}>
        {list}
      </Animate>
    </div>);
  }
});
