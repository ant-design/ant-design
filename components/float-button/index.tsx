import BackTop from './BackTop';
import FloatButton from './FloatButton';
import FloatButtonGroup from './FloatButtonGroup';
import PurePanel from './PurePanel';

export type {
  /** @deprecated Please use `FloatButtonBackTopProps` instead. */
  BackTopProps,
  FloatButtonBackTopProps,
} from './BackTop';
export type { FloatButtonProps, FloatButtonRef } from './FloatButton';
export type { FloatButtonGroupProps, FloatButtonGroupRef } from './FloatButtonGroup';

FloatButton.BackTop = BackTop;
FloatButton.Group = FloatButtonGroup;
FloatButton._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

export default FloatButton;
