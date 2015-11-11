import React, {PropTypes, Component} from 'react';
import {PREFIX_CLS} from './Constants';

class NoteList extends Component {
  render() {
    const {listdata, prefixCls} = this.props;

    if (!listdata || listdata === 0) return null;

    return (
      <ul className={prefixCls}>
        { listdata.map(function (item, index) {
          return <li key={`list-${index}`}><span className={`${prefixCls}-node-${item.type}`}>●</span>{ item.content }</li>;
        }) }
      </ul>
    );
  }
}
NoteList.propTypes = {
  listdata: PropTypes.array,
  prefixCls: PropTypes.string,
};
NoteList.defaultProps = {
  prefixCls: `${PREFIX_CLS}-notes-list`,
};

export default NoteList;
