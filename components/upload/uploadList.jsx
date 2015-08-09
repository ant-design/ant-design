import React from 'react';
const prefixCls = 'ant-upload';

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
  handleClose(index) {
    let items = this.state.items;
    items.splice(items[index], 1);
    this.setState({
      items: items
    });
  },
  render() {
    var items = this.state.items;
    var downloadItem = (file) => {
      var statusIcon = file.status === 'done' ? <i className={'anticon anticon-check ' + prefixCls + '-success-icon'}></i> : <i className='anticon anticon-loading'></i>;
      var closeIcon = file.status === 'done' ? <i className='anticon anticon-cross' ref='theCloseBtn' onClick={this.handleClose.bind(this, file.id)}></i> : '';
      return (
        <div className={prefixCls + '-list-item'} key={file.id}>
          {statusIcon}
          <b className={prefixCls + '-item-name'}>{file.filename}</b>
          {closeIcon}
        </div>
      );
    };
    return <div className={prefixCls + '-list'}>{items.map(downloadItem)}</div>;
  }
});
