import FloatButton from './FloatButton';
import FloatButtonGroup from './FloatButtonGroup';
import BackTop from './BackTop';
import PurePanel from './PurePanel';

FloatButton.Group = FloatButtonGroup;
FloatButton.BackTop = BackTop;
FloatButton._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

export default FloatButton;
