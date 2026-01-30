import BackTop from './BackTop';
import FloatButton from './FloatButton';
import FloatButtonGroup from './FloatButtonGroup';
import PurePanel from './PurePanel';

export type { FloatButtonProps, FloatButtonRef, FloatButtonSemanticType } from './FloatButton';
export type { FloatButtonGroupProps, FloatButtonGroupSemanticType } from './FloatButtonGroup';

FloatButton.BackTop = BackTop;
FloatButton.Group = FloatButtonGroup;
FloatButton._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

export default FloatButton;
