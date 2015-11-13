import React, {PropTypes, Component} from 'react';
import {PREFIX_CLS} from './Constants';

class NoteList extends Component {
  render() {
    const {listData, prefixCls} = this.props;

    if (!listData || listData === 0) return null;

    return (
      <ul className={prefixCls}>
        { listData.map(function (item, index) {
          return <li key={`list-${index}`}><span className={`${prefixCls}-node-${item.type}`}>●</span>{ item.content }</li>;
        }) }
      </ul>
    );
  }
}
NoteList.propTypes = {
  listData: PropTypes.array,
  prefixCls: PropTypes.string,
};
NoteList.defaultProps = {
  prefixCls: `${PREFIX_CLS}-note-list`,
};

export default NoteList;
