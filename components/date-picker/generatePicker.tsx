import * as React from 'react';
import Picker from 'rc-picker';
import { GenerateConfig } from 'rc-picker/lib/generate/index';
import { PickerBaseProps, PickerDateProps, PickerTimeProps } from 'rc-picker/lib/Picker';
import defaultLocale from './locale/en_US';

type InjectDefaultProps<Props> = Omit<Props, 'locale' | 'generateConfig'> & {
  locale?: typeof defaultLocale;
};

function generatePicker<DateType>(generateConfig: GenerateConfig<DateType>) {
  type DatePickerProps =
    | InjectDefaultProps<PickerBaseProps<DateType>>
    | InjectDefaultProps<PickerDateProps<DateType>>
    | InjectDefaultProps<PickerTimeProps<DateType>>;

  class DatePicker extends React.Component<DatePickerProps> {
    pickerRef = React.createRef<Picker<DateType>>();

    focus = () => {
      if (this.pickerRef.current) {
        this.pickerRef.current.focus();
      }
    };

    blur = () => {
      if (this.pickerRef.current) {
        this.pickerRef.current.blur();
      }
    };

    render() {
      return (
        <Picker<DateType>
          ref={this.pickerRef}
          locale={defaultLocale.lang}
          generateConfig={generateConfig}
        />
      );
    }
  }

  return DatePicker;
}

export default generatePicker;
