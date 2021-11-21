import { ValidateMessages } from 'rc-field-form/lib/interface';
import { RenderEmptyHandler } from './renderEmpty';
import { CSPConfig, DirectionType } from './context';
import { RequiredMark } from '../form/Form';
import { Locale } from '../locale-provider';
import { SizeType } from './SizeContext';

export interface ConfigProviderProps {
  getTargetContainer?: () => HTMLElement;
  getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement;
  prefixCls?: string;
  iconPrefixCls?: string;
  children?: React.ReactNode;
  renderEmpty?: RenderEmptyHandler;
  csp?: CSPConfig;
  autoInsertSpaceInButton?: boolean;
  form?: {
    validateMessages?: ValidateMessages;
    requiredMark?: RequiredMark;
  };
  input?: {
    autoComplete?: string;
  };
  locale?: Locale;
  pageHeader?: {
    ghost: boolean;
  };
  componentSize?: SizeType;
  direction?: DirectionType;
  space?: {
    size?: SizeType | number;
  };
  virtual?: boolean;
  dropdownMatchSelectWidth?: boolean;
}
