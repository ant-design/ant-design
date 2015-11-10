import React, {PropTypes, Component} from 'react';
import CalendarLocale from 'rc-calendar/lib/locale/zh_CN';
import FullCalendar from 'rc-calendar/lib/FullCalendar';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import 'rc-calendar/assets/index.css';

function noop () { return null; }

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
  prefixCls: 'calendar-notes-list'
};

class Notes extends Component {
  constructor(props) {
    super();
  }
  type2class(type) {
    return type;
  }
  render() {
    const {listdata, threshold, prefixCls} = this.props;

    if (!listdata || listdata.length === 0) return null;

    const classNames = [prefixCls];
    let items;
    if (listdata.length > threshold) {
      items = new Array(threshold).fill('gray');
      classNames.push(`${prefixCls}-overflow`);
    } else {
      items = listdata.map(item => item.type);
    }
    const el = (<div className={classNames.join(' ')}>
      { items.map(function (type, i) {
        return (<span key={`item-${i}`} className={`${prefixCls}-node-${this.type2class(type)}`}>●</span>);
      }.bind(this)) }
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
  prefixCls: 'calendar-notes',
};

class MonthCellNoteNum extends Component {
  render() {
    const {num} = this.props;
    return (
      <div className="rc-calendar-month-cell-notes">
        <section>{num}</section>
        <span>待办事项数</span>
      </div>
    );
  }
}
MonthCellNoteNum.propTypes = {
  num: PropTypes.number,
  prefixCls: PropTypes.string,
};
MonthCellNoteNum.defaultProps = {
  num: 0,
  prefixCls: 'calendar-notes',
};

function zerofixed (v) {
  if (v < 10) return '0' + v;
  return v + '';
}

class NoticeCalendar extends Component {
  monthCellRender(value, locale) {
    const month = value.getMonth();
    const noteNum = this.props.getMonthData(value);
    if (noteNum > 0) {
      return (
        <a className="rc-calendar-month-panel-month">
          <span>{locale.format.shortMonths[month]}</span>
          <MonthCellNoteNum num={noteNum} />
        </a>
      );
    }

    return (
      <a className="rc-calendar-month-panel-month">{locale.format.shortMonths[month]}</a>
    );
  }
  fullscreenDateCellRender(value) {
    let listdata = this.props.getDateData(value);

    return (
      <span className="rc-calendar-date calendar-notes-date-full">
        <span>{ zerofixed(value.getDayOfMonth()) }</span>
        <NoteList listdata={listdata} />
      </span>
    );
  }
  dateCellRender(value) {
    const el = (<span className="rc-calendar-date calendar-notes-date">{ zerofixed(value.getDayOfMonth()) }</span>);
    const listdata = this.props.getDateData(value);
    return (
      <div style={{position: 'relative', height: 32}}>
        { el }
        { <Notes listdata={listdata} /> }
      </div>
    );
  }
  render() {
    const props = this.props;
    const {fullscreen, monthCellRender, dateCellRender, fullscreenDateCellRender} = props;

    const _monthCellRender = monthCellRender ? monthCellRender : this.monthCellRender;
    const _dateCellRender = dateCellRender ? dateCellRender : this.dateCellRender;
    const _fullscreenDateCellRender = fullscreenDateCellRender ? fullscreenDateCellRender : this.fullscreenDateCellRender;

    return (<FullCalendar
      {...props}
      monthCellRender={ fullscreen ? _monthCellRender.bind(this) : null }
      dateCellRender={ fullscreen ? _fullscreenDateCellRender.bind(this) : _dateCellRender.bind(this) }/>);
  }
}
NoticeCalendar.propTypes = {
  monthCellRender: PropTypes.func,
  dateCellRender: PropTypes.func,
  fullDateCellRender: PropTypes.func,
  getMonthData: PropTypes.func,
  getDateData: PropTypes.func,
  fullscreen: PropTypes.bool,
  locale: PropTypes.object,
};
NoticeCalendar.defaultProps = {
  locale: CalendarLocale,
  getMonthData: noop,
  getDateData: noop,
  fullscreen: false,
};


export default NoticeCalendar;
