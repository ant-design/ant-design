import FloatButton from './FloatButton';
import FloatButtonGroup from './FloatButtonGroup';
import BackTop from './BackTop';
import PurePanel from './PurePanel';
import PureBackTop from './PureBackTop';

FloatButton.Group = FloatButtonGroup;
FloatButton.BackTop = BackTop;
FloatButton._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;
FloatButton._InternalPanelDoNotUseOrYouWillBeFiredBackTop = PureBackTop;

export default FloatButton;
