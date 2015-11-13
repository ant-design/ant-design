import React, {PropTypes, Component} from 'react';
import GregorianCalendar from 'gregorian-calendar';
import CalendarLocale from 'rc-calendar/lib/locale/zh_CN';
import FullCalendar from 'rc-calendar/lib/FullCalendar';
import Notes from './Notes';
import NoteList from './NoteList';
import {PREFIX_CLS} from './Constants';
import Header from './Header';

function noop () { return null; }

function zerofixed (v) {
  if (v < 10) return '0' + v;
  return v + '';
}
function getNow() {
  const value = new GregorianCalendar();
  value.setTime(Date.now());
  return value;
}

const MonthCellNoteNum = ({num, prefixCls}) => {
  return (
    <div className={`${prefixCls}-month`}>
      <section>{num}</section>
      <span>待办事项数</span>
    </div>
  );
};

class NoticeCalendar extends Component {
  constructor(props) {
    super();
    this.state = {
      value: props.value || getNow(),
      type: props.type,
    };
  }
  monthCellRender(value, locale) {
    const prefixCls = this.props.prefixCls;
    const month = value.getMonth();
    const noteNum = this.props.getMonthData(value);
    if (noteNum > 0) {
      return (
        <a className={`${prefixCls}-fullscreen-month`}>
          <span>{locale.format.shortMonths[month]}</span>
          <MonthCellNoteNum num={noteNum} prefixCls={`${prefixCls}-notes`} />
        </a>
      );
    }
    return (
      <a className={`${prefixCls}-fullscreen-month`}>{locale.format.shortMonths[month]}</a>
    );
  }
  fullscreenDateCellRender(value) {
    const prefixCls = this.props.prefixCls;
    let listData = this.props.getDateData(value);
    return (
      <span className={`${prefixCls}-fullscreen-date`}>
        <span>{ zerofixed(value.getDayOfMonth()) }</span>
        <div className={`${prefixCls}-note-list-wrapper`}><NoteList listData={listData} /></div>
      </span>
    );
  }
  dateCellRender(value) {
    const prefixCls = this.props.prefixCls;
    const el = (<span className={`${prefixCls}-date ${prefixCls}-notes-date`}>{ zerofixed(value.getDayOfMonth()) }</span>);
    const listData = this.props.getDateData(value);
    return (
      <div style={{ position: 'relative' }}>
        { el }
        { (listData && listData.length > 0) ? <div className={`${prefixCls}-notes-wrapper`}><Notes listData={listData} /></div> : null }
      </div>
    );
  }
  setValue(value) {
    if (this.state.value !== value) {
      this.setState({ value });
      this.props.onChange(value);
    }
  }
  setType(type) {
    this.setState({ type });
  }
  onPanelChange(value) {
    if (this.state.type === 'month') {
      this.setType('date');
    }
    this.setValue(value);
  }
  render() {
    const props = this.props;
    const {value, type} = this.state;
    const {locale, prefixCls, style, className, fullscreen, monthCellRender, dateCellRender, fullscreenDateCellRender} = props;

    const _monthCellRender = monthCellRender ? monthCellRender : this.monthCellRender;
    const _dateCellRender = dateCellRender ? dateCellRender : this.dateCellRender;
    const _fullscreenDateCellRender = fullscreenDateCellRender ? fullscreenDateCellRender : this.fullscreenDateCellRender;
    return (
      <div className={prefixCls + '-wrapper' + (className ? ' ' + className : '') + (fullscreen ? ' ' + prefixCls + '-wrapper-fullscreen' : '' )} style={style}>
        <Header
          fullscreen={fullscreen}
          type={type}
          value={value}
          locale={locale}
          prefixCls={`${prefixCls}`}
          onTypeChange={this.setType.bind(this)}
          onValueChange={this.setValue.bind(this)}/>
        <FullCalendar
          {...props}
          type={type}
          prefixCls={`${prefixCls}`}
          showHeader={false}
          value={value}
          onChange={this.onPanelChange.bind(this)}
          monthCellRender={ fullscreen ? _monthCellRender.bind(this) : null }
          dateCellRender={ fullscreen ? _fullscreenDateCellRender.bind(this) : _dateCellRender.bind(this) }/>
      </div>
    );
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
  className: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func,
};
NoticeCalendar.defaultProps = {
  locale: CalendarLocale,
  getMonthData: noop,
  getDateData: noop,
  fullscreen: false,
  prefixCls: PREFIX_CLS,
  onChange: noop,
  type: 'date',
};

export default NoticeCalendar;
