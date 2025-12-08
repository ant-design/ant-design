import AccountBook from './AccountBook';
import Alipay from './Alipay';
import Bank from './Bank';
import CarryOut from './CarryOut';
import Check from './Check';
import ClockSquare from './ClockSquare';
import Comment from './Comment';
import Copy from './Copy';
import CreditCard from './CreditCard';
import Dash from './Dash';
import Dollar from './Dollar';
import Ellipsis from './Ellipsis';
import Euro from './Euro';
import Holder from './Holder';
import IssuesClose from './IssuesClose';
import More from './More';
import PayCircle from './PayCircle';
import PoundCircle from './PoundCircle';
import PropertySafety from './PropertySafety';
import RedEnvelope from './RedEnvelope';
import Robot from './Robot';
import Safety from './Safety';
import Schedule from './Schedule';
import Transaction from './Transaction';

const all = {
  AccountBook,
  Alipay,
  AlipayCircle: Alipay,
  Bank,
  CarryOut,
  Check,
  CheckCircle: Check,
  CheckSquare: Check,
  ClockSquare,
  Comment,
  Copy,
  CreditCard,
  Dash,
  SmallDash: Dash,
  Dollar,
  Ellipsis,
  Euro,
  EuroCircle: Euro,
  Holder,
  IssuesClose,
  More,
  PayCircle,
  PoundCircle,
  Pound: PoundCircle,
  PropertySafety,
  RedEnvelope,
  Robot,
  Safety,
  Schedule,
  Transaction,
};

export type IconsMeta = typeof all;
export type IconName = keyof IconsMeta;

export default all;
