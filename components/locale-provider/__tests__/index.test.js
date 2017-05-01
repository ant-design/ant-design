import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
import { LocaleProvider, Pagination, DatePicker, TimePicker, Calendar,
         Popconfirm, Table, Modal, Select, Transfer } from '../../';
import enUS from '../en_US';
import ptBR from '../pt_BR';
import ruRU from '../ru_RU';
import esES from '../es_ES';
import svSE from '../sv_SE';
import frBE from '../fr_BE';
import deDE from '../de_DE';
import nlNL from '../nl_NL';
import caES from '../ca_ES';
import csCZ from '../cs_CZ';
import koKR from '../ko_KR';
import etEE from '../et_EE';
import skSK from '../sk_SK';
import jaJP from '../ja_JP';
import trTR from '../tr_TR';
import zhTW from '../zh_TW';
import fiFI from '../fi_FI';

const locales = [enUS, ptBR, ruRU, esES, svSE, frBE, deDE, nlNL, caES, csCZ, koKR, etEE, skSK, jaJP, trTR, zhTW, fiFI];

const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  filters: [{
    text: 'filter1',
    value: 'filter1',
  }],
}, {
  title: 'Age',
  dataIndex: 'age',
}];

const App = () => (
  <div>
    <Pagination defaultCurrent={1} total={50} showSizeChanger />
    <Select showSearch style={{ width: 200 }}>
      <Option value="jack">jack</Option>
      <Option value="lucy">lucy</Option>
    </Select>
    <DatePicker />
    <TimePicker />
    <RangePicker style={{ width: 200 }} />
    <Popconfirm title="Question?" visible>
      <a>Click to confirm</a>
    </Popconfirm>
    <Transfer
      dataSource={[]}
      showSearch
      targetKeys={[]}
      render={item => item.title}
    />
    <Calendar fullscreen={false} value={moment()} />
    <Table dataSource={[]} columns={columns} />
    <Modal title="Locale Modal" visible>
      <p>Locale Modal</p>
    </Modal>
  </div>
);

describe('Locale Provider', () => {
  it('should display the text as locale changed', () => {
    locales.forEach((locale) => {
      const wrapper = mount(
        <LocaleProvider locale={locale}>
          <App />
        </LocaleProvider>
      );
      const DatePickerPlaceholder = wrapper.find('.ant-calendar-picker-input').at(0).node.getAttribute('placeholder');
      expect(DatePickerPlaceholder).toBe(locale.DatePicker.lang.placeholder);
    });
  });

  it('should change locale of Modal.xxx', () => {
    class ModalDemo extends React.Component {
      componentDidMount() {
        Modal.confirm({
          title: 'Hello World!',
        });
      }
      render() {
        return null;
      }
    }
    locales.forEach((locale) => {
      mount(
        <LocaleProvider locale={locale}>
          <ModalDemo />
        </LocaleProvider>
      );
      const currentConfirmNode = document.querySelectorAll('.ant-confirm')[document.querySelectorAll('.ant-confirm').length - 1];
      const cancelButtonText = currentConfirmNode.querySelectorAll('.ant-btn:not(.ant-btn-primary) span')[0].innerHTML;
      const okButtonText = currentConfirmNode.querySelectorAll('.ant-btn-primary span')[0].innerHTML;
      expect(cancelButtonText).toBe(locale.Modal.cancelText);
      expect(okButtonText).toBe(locale.Modal.okText);
    });
  });
});
