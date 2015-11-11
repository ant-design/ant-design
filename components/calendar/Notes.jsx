import React, {PropTypes, Component} from 'react';
import NoteList from './NoteList';
import Tooltip from '../tooltip';
import {PREFIX_CLS} from './Constants';

class Notes extends Component {
  render() {
    const {listdata, threshold, prefixCls} = this.props;

    const classNames = [prefixCls];
    let items;
    if (listdata.length > threshold) {
      items = new Array(threshold).fill('gray');
      classNames.push(`${prefixCls}-overflow`);
    } else {
      items = listdata.map(item => item.type);
    }
    const el = (<div className={classNames.join(' ')}>
      {
        items.map((type, i) => (
          <span key={`item-${i}`}
            className={`${prefixCls}-node-${type}`}>●</span>
          )
        )
      }
    </div>);

    return (
      <Tooltip placement="right" trigger={['hover']} overlay={<NoteList listdata={listdata} />}>{el}</Tooltip>
    );
  }
}
Notes.propTypes = {
  listdata: PropTypes.array,
  threshold: PropTypes.number,
  prefixCls: PropTypes.string,
};
Notes.defaultProps = {
  listdata: null,
  threshold: 3,
  prefixCls: `${PREFIX_CLS}-notes`,
};

export default Notes;
