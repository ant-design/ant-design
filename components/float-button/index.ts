import FloatButton from './FloatButton';
import FloatButtonGroup from './FloatButtonGroup';
import BackTop from './BackTop';
import PurePanel from './PurePanel';

FloatButton.BackTop = BackTop;
FloatButton.Group = FloatButtonGroup;
FloatButton._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

export default FloatButton;
