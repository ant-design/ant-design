import { FullToken, genComponentStyleHook, GenerateStyle } from '../../_util/theme';

type PickerToken = FullToken<'DatePicker'>;

const genPickerStyle: GenerateStyle<PickerToken>;

// ============================== Export ==============================
export default genComponentStyleHook('DatePicker', token => []);
