import React, {PropTypes, Component} from 'react';
import CalendarLocale from 'rc-calendar/lib/locale/zh_CN';
import FullCalendar from 'rc-calendar/lib/FullCalendar';
import Notes from './Notes';
import NoteList from './NoteList';
import {PREFIX_CLS} from './Constants';

function noop () { return null; }

function zerofixed (v) {
  if (v < 10) return '0' + v;
  return v + '';
}

const MonthCellNoteNum = ({num, prefixCls}) => {
  return (
    <div className={`${prefixCls}-month-cell`}>
      <section>{num}</section>
      <span>待办事项数</span>
    </div>
  );
};

class NoticeCalendar extends Component {
  monthCellRender(value, locale) {
    const prefixCls = this.props.prefixCls;
    const month = value.getMonth();
    const noteNum = this.props.getMonthData(value);
    if (noteNum > 0) {
      return (
        <a className={`${prefixCls}-month-panel-month`}>
          <span>{locale.format.shortMonths[month]}</span>
          <MonthCellNoteNum num={noteNum} prefixCls={`${prefixCls}-notes`} />
        </a>
      );
    }
    return (
      <a className={`${prefixCls}-month-panel-month`}>{locale.format.shortMonths[month]}</a>
    );
  }
  fullscreenDateCellRender(value) {
    const prefixCls = this.props.prefixCls;
    let listData = this.props.getDateData(value);
    return (
      <span className={`${prefixCls}-date ${prefixCls}-notes-date-full`}>
        <span>{ zerofixed(value.getDayOfMonth()) }</span>
        <NoteList listData={listData} />
      </span>
    );
  }
  dateCellRender(value) {
    const prefixCls = this.props.prefixCls;
    const el = (<span className={`${prefixCls}-date ${prefixCls}-notes-date`}>{ zerofixed(value.getDayOfMonth()) }</span>);
    const listData = this.props.getDateData(value);
    return (
      <div style={{position: 'relative', height: 32}}>
        { el }
        { (listData && listData.length > 0) ? <Notes listData={listData} /> : null }
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
  prefixCls: PropTypes.string,
};
NoticeCalendar.defaultProps = {
  locale: CalendarLocale,
  getMonthData: noop,
  getDateData: noop,
  fullscreen: false,
  prefixCls: PREFIX_CLS,
};

export default NoticeCalendar;
