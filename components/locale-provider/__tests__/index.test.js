/* eslint-disable react/no-multi-comp */
import React from 'react';
import { mount } from 'enzyme';
import dayjs from 'dayjs';
import preParsePostFormat from 'dayjs/plugin/preParsePostFormat';
import MockDate from 'mockdate';
import mountTest from '../../../tests/shared/mountTest';
import {
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
import LocaleProvider from '..';
import arEG from '../ar_EG';
import 'dayjs/locale/ar';
import azAZ from '../az_AZ';
import 'dayjs/locale/az';
import bgBG from '../bg_BG';
import 'dayjs/locale/bg';
import bnBD from '../bn_BD';
import 'dayjs/locale/bn-bd';
import byBY from '../by_BY';
import 'dayjs/locale/be';
import caES from '../ca_ES';
import 'dayjs/locale/ca';
import csCZ from '../cs_CZ';
import 'dayjs/locale/cs';
import deDE from '../de_DE';
import 'dayjs/locale/de';
import daDK from '../da_DK';
import 'dayjs/locale/da';
import elGR from '../el_GR';
import 'dayjs/locale/el';
import enGB from '../en_GB';
import 'dayjs/locale/en-gb';
import enUS from '../en_US';
import 'dayjs/locale/en';
import esES from '../es_ES';
import 'dayjs/locale/es';
import etEE from '../et_EE';
import 'dayjs/locale/et';
import faIR from '../fa_IR';
import 'dayjs/locale/fa';
import fiFI from '../fi_FI';
import 'dayjs/locale/fi';
import frBE from '../fr_BE';
import frCA from '../fr_CA';
import 'dayjs/locale/fr-ca';
import frFR from '../fr_FR';
import 'dayjs/locale/fr';
import gaIE from '../ga_IE';
import 'dayjs/locale/ga';
import glES from '../gl_ES';
import 'dayjs/locale/gl';
import heIL from '../he_IL';
import 'dayjs/locale/he';
import hiIN from '../hi_IN';
import 'dayjs/locale/hi';
import hrHR from '../hr_HR';
import 'dayjs/locale/hr';
import huHU from '../hu_HU';
import 'dayjs/locale/hu';
import hyAM from '../hy_AM';
import 'dayjs/locale/hy-am';
import idID from '../id_ID';
import 'dayjs/locale/id';
import isIS from '../is_IS';
import 'dayjs/locale/is';
import itIT from '../it_IT';
import 'dayjs/locale/it';
import jaJP from '../ja_JP';
import 'dayjs/locale/ja';
import kaGE from '../ka_GE';
import 'dayjs/locale/ka';
import kkKZ from '../kk_KZ';
import 'dayjs/locale/kk';
import knIN from '../kn_IN';
import 'dayjs/locale/kn';
import koKR from '../ko_KR';
import 'dayjs/locale/ko';
import kmKH from '../km_KH';
import 'dayjs/locale/km';
import kmrIQ from '../kmr_IQ';
import kuIQ from '../ku_IQ';
import 'dayjs/locale/ku';
import lvLV from '../lv_LV';
import 'dayjs/locale/lv';
import ltLT from '../lt_LT';
import 'dayjs/locale/lt';
import mkMK from '../mk_MK';
import 'dayjs/locale/mk';
import mlIN from '../ml_IN';
import 'dayjs/locale/ml';
import mnMN from '../mn_MN';
import 'dayjs/locale/mn';
import msMY from '../ms_MY';
import 'dayjs/locale/ms';
import nbNO from '../nb_NO';
import 'dayjs/locale/nb';
import neNP from '../ne_NP';
import 'dayjs/locale/ne';
import nlBE from '../nl_BE';
import 'dayjs/locale/nl-be';
import nlNL from '../nl_NL';
import 'dayjs/locale/nl';
import plPL from '../pl_PL';
import 'dayjs/locale/pl';
import ptBR from '../pt_BR';
import 'dayjs/locale/pt-br';
import ptPT from '../pt_PT';
import 'dayjs/locale/pt';
import roRO from '../ro_RO';
import 'dayjs/locale/ro';
import ruRU from '../ru_RU';
import 'dayjs/locale/ru';
import skSK from '../sk_SK';
import 'dayjs/locale/sk';
import slSI from '../sl_SI';
import 'dayjs/locale/sl';
import srRS from '../sr_RS';
import 'dayjs/locale/sr';
import svSE from '../sv_SE';
import 'dayjs/locale/sv';
import taIN from '../ta_IN';
import 'dayjs/locale/ta';
import thTH from '../th_TH';
import 'dayjs/locale/th';
import trTR from '../tr_TR';
import 'dayjs/locale/tr';
import ukUA from '../uk_UA';
import 'dayjs/locale/uk';
import viVN from '../vi_VN';
import 'dayjs/locale/vi';
import zhCN from '../zh_CN';
import 'dayjs/locale/zh-cn';
import zhHK from '../zh_HK';
import 'dayjs/locale/zh-hk';
import zhTW from '../zh_TW';
import 'dayjs/locale/zh-tw';
import urPK from '../ur_PK';
import 'dayjs/locale/ur';

dayjs.extend(preParsePostFormat);

const locales = [
  azAZ,
  arEG,
  bgBG,
  bnBD,
  byBY,
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
  frCA,
  frFR,
  gaIE,
  glES,
  heIL,
  hiIN,
  hrHR,
  huHU,
  hyAM,
  isIS,
  itIT,
  jaJP,
  kaGE,
  kkKZ,
  knIN,
  koKR,
  kmKH,
  kmrIQ,
  kuIQ,
  ltLT,
  mkMK,
  mlIN,
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
  zhHK,
  zhTW,
  urPK,
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
    <TimePicker open defaultOpenValue={dayjs()} />
    <RangePicker open style={{ width: 200 }} />
    <Popconfirm title="Question?" visible>
      <a>Click to confirm</a>
    </Popconfirm>
    <Transfer dataSource={[]} showSearch targetKeys={[]} render={item => item.title} />
    <Calendar fullscreen={false} value={dayjs()} />
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
    MockDate.set(dayjs('2017-09-18T03:30:07.795').valueOf());
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
        jest.useFakeTimers();
        Modal.confirm({
          title: 'Hello World!',
        });
        jest.runAllTimers();
        jest.useRealTimers();
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
      const currentConfirmNode =
        document.querySelectorAll('.ant-modal-confirm')[
          document.querySelectorAll('.ant-modal-confirm').length - 1
        ];
      let cancelButtonText = currentConfirmNode.querySelectorAll(
        '.ant-btn:not(.ant-btn-primary) span',
      )[0].innerHTML;
      let okButtonText = currentConfirmNode.querySelectorAll('.ant-btn-primary span')[0].innerHTML;
      if (locale.locale.indexOf('zh-') === 0) {
        cancelButtonText = cancelButtonText.replace(' ', '');
        okButtonText = okButtonText.replace(' ', '');
      }
      expect(cancelButtonText).toBe(locale.Modal.cancelText);
      expect(okButtonText).toBe(locale.Modal.okText);
    });
  });

  it('set moment locale when locale changes', () => {
    const Test = ({ locale }) => (
      <LocaleProvider locale={locale}>
        <div>
          <DatePicker defaultValue={dayjs()} open />
        </div>
      </LocaleProvider>
    );

    const wrapper = mount(<Test locale={zhCN} />);
    expect(wrapper.render()).toMatchSnapshot();
    wrapper.setProps({ locale: frFR });
    expect(wrapper.render()).toMatchSnapshot();
    wrapper.setProps({ locale: null });
    expect(wrapper.render()).toMatchSnapshot();
  });
});
