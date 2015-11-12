import React, {PropTypes, Component} from 'react';
import NoteList from './NoteList';
import Popover from '../popover';
import {PREFIX_CLS} from './Constants';

class Notes extends Component {
  render() {
    const {listData, threshold, prefixCls} = this.props;

    const classNames = [prefixCls];
    let items;
    if (listData.length > threshold) {
      items = new Array(threshold).fill('gray');
      classNames.push(`${prefixCls}-overflow`);
    } else {
      items = listData.map(item => item.type);
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
      <Popover placement="bottomLeft" trigger={['hover']} overlay={<NoteList listData={listData} />}>{el}</Popover>
    );
  }
}
Notes.propTypes = {
  listData: PropTypes.array,
  threshold: PropTypes.number,
  prefixCls: PropTypes.string,
};
Notes.defaultProps = {
  listData: null,
  threshold: 3,
  prefixCls: `${PREFIX_CLS}-notes`,
};

export default Notes;
