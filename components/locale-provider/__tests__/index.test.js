/* eslint-disable react/no-multi-comp */
import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
import MockDate from 'mockdate';
import { resetWarned } from '../../_util/warning';
import mountTest from '../../../tests/shared/mountTest';
import {
  LocaleProvider,
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Popconfirm,
  Table,
  Modal,
  Select,
  Transfer,
} from '../..';
import arEG from '../ar_EG';
import bgBG from '../bg_BG';
import caES from '../ca_ES';
import csCZ from '../cs_CZ';
import daDK from '../da_DK';
import deDE from '../de_DE';
import elGR from '../el_GR';
import enGB from '../en_GB';
import enUS from '../en_US';
import esES from '../es_ES';
import etEE from '../et_EE';
import faIR from '../fa_IR';
import fiFI from '../fi_FI';
import frBE from '../fr_BE';
import frFR from '../fr_FR';
import heIL from '../he_IL';
import hiIN from '../hi_IN';
import hrHR from '../hr_HR';
import huHU from '../hu_HU';
import hyAM from '../hy_AM';
import isIS from '../is_IS';
import itIT from '../it_IT';
import jaJP from '../ja_JP';
import knIN from '../kn_IN';
import koKR from '../ko_KR';
import kuIQ from '../ku_IQ';
import mkMK from '../mk_MK';
import mnMN from '../mn_MN';
import msMY from '../ms_MY';
import nbNO from '../nb_NO';
import neNP from '../ne-NP';
import nlBE from '../nl_BE';
import nlNL from '../nl_NL';
import plPL from '../pl_PL';
import ptBR from '../pt_BR';
import ptPT from '../pt_PT';
import roRO from '../ro_RO';
import ruRU from '../ru_RU';
import skSK from '../sk_SK';
import slSI from '../sl_SI';
import srRS from '../sr_RS';
import svSE from '../sv_SE';
import taIN from '../ta_IN';
import thTH from '../th_TH';
import trTR from '../tr_TR';
import ukUA from '../uk_UA';
import viVN from '../vi_VN';
import idID from '../id_ID';
import lvLV from '../lv_LV';
import zhCN from '../zh_CN';
import zhTW from '../zh_TW';

const locales = [
  arEG,
  bgBG,
  caES,
  csCZ,
  daDK,
  deDE,
  elGR,
  enGB,
  enUS,
  esES,
  etEE,
  faIR,
  fiFI,
  frBE,
  frFR,
  heIL,
  hiIN,
  hrHR,
  huHU,
  hyAM,
  isIS,
  itIT,
  jaJP,
  knIN,
  koKR,
  kuIQ,
  mkMK,
  msMY,
  mnMN,
  nbNO,
  neNP,
  nlBE,
  nlNL,
  plPL,
  ptBR,
  ptPT,
  roRO,
  ruRU,
  skSK,
  slSI,
  srRS,
  svSE,
  taIN,
  thTH,
  trTR,
  ukUA,
  viVN,
  idID,
  lvLV,
  zhCN,
  zhTW,
];

const { Option } = Select;
const { RangePicker } = DatePicker;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    filters: [
      {
        text: 'filter1',
        value: 'filter1',
      },
    ],
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
];

const App = () => (
  <div>
    <Pagination defaultCurrent={1} total={50} showSizeChanger />
    <Select showSearch style={{ width: 200 }}>
      <Option value="jack">jack</Option>
      <Option value="lucy">lucy</Option>
    </Select>
    <DatePicker open />
    <TimePicker open defaultOpenValue={moment()} />
    <RangePicker open style={{ width: 200 }} />
    <Popconfirm title="Question?" visible>
      <a>Click to confirm</a>
    </Popconfirm>
    <Transfer dataSource={[]} showSearch targetKeys={[]} render={item => item.title} />
    <Calendar fullscreen={false} value={moment()} />
    <Table dataSource={[]} columns={columns} />
    <Modal title="Locale Modal" visible getContainer={false}>
      <p>Locale Modal</p>
    </Modal>
  </div>
);

describe('Locale Provider', () => {
  mountTest(() => (
    <LocaleProvider>
      <div />
    </LocaleProvider>
  ));

  beforeAll(() => {
    MockDate.set(moment('2017-09-18T03:30:07.795'));
  });

  afterAll(() => {
    MockDate.reset();
  });

  locales.forEach(locale => {
    it(`should display the text as ${locale.locale}`, () => {
      const wrapper = mount(
        <LocaleProvider locale={locale}>
          <App />
        </LocaleProvider>,
      );
      expect(wrapper.render()).toMatchSnapshot();
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
    locales.forEach(locale => {
      mount(
        <LocaleProvider locale={locale}>
          <ModalDemo />
        </LocaleProvider>,
      );
      const currentConfirmNode = document.querySelectorAll('.ant-modal-confirm')[
        document.querySelectorAll('.ant-modal-confirm').length - 1
      ];
      let cancelButtonText = currentConfirmNode.querySelectorAll(
        '.ant-btn:not(.ant-btn-primary) span',
      )[0].innerHTML;
      let okButtonText = currentConfirmNode.querySelectorAll('.ant-btn-primary span')[0].innerHTML;
      if (locale.locale === 'zh-cn') {
        cancelButtonText = cancelButtonText.replace(' ', '');
        okButtonText = okButtonText.replace(' ', '');
      }
      expect(cancelButtonText).toBe(locale.Modal.cancelText);
      expect(okButtonText).toBe(locale.Modal.okText);
    });
  });

  it('set moment locale when locale changes', () => {
    class Test extends React.Component {
      state = {
        locale: zhCN,
      };

      render() {
        const { locale } = this.state;
        return (
          <LocaleProvider locale={locale}>
            <div>
              <DatePicker defaultValue={moment()} open />
            </div>
          </LocaleProvider>
        );
      }
    }
    const wrapper = mount(<Test />);
    expect(wrapper.render()).toMatchSnapshot();
    wrapper.setState({ locale: frFR });
    expect(wrapper.render()).toMatchSnapshot();
    wrapper.setState({ locale: null });
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('warning if use LocaleProvider', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    resetWarned();

    mount(
      <LocaleProvider locale={{}}>
        <div />
      </LocaleProvider>,
    );
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: LocaleProvider] `LocaleProvider` is deprecated. Please use `locale` with `ConfigProvider` instead: http://u.ant.design/locale',
    );

    errorSpy.mockRestore();
  });
});
