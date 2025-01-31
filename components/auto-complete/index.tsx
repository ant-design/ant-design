import omit from 'rc-util/lib/omit';

import genPurePanel from '../_util/PurePanel';
import Select from '../select';
import RefAutoComplete from './AutoComplete';

export type { AutoCompleteProps } from './AutoComplete';

const { Option } = Select;

// We don't care debug panel
/* istanbul ignore next */
const PurePanel = genPurePanel(RefAutoComplete, 'dropdownAlign', (props: any) =>
  omit(props, ['visible']),
);

type CompoundedComponent = typeof RefAutoComplete & {
  Option: typeof Option;
  _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel;
};

const AutoComplete = RefAutoComplete as CompoundedComponent;

AutoComplete.Option = Option;
AutoComplete._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

export default AutoComplete;
