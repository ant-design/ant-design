import { Moment } from 'moment';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';
import generatePicker from './generatePicker';

const DatePicker = generatePicker<Moment>(momentGenerateConfig);

export default DatePicker;
