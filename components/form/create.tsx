import * as React from 'react';
import { FIELD_DATA_PROP, FIELD_META_PROP } from './constants';
import { ComponentDecorator, FormComponentProps, FormCreateOption } from './Form';
import createDOMForm from 'rc-form/lib/createDOMForm';

export default function<TOwnProps>(options: FormCreateOption<TOwnProps> = {}): ComponentDecorator {
  const createFn = createDOMForm({
    fieldNameProp: 'id',
    ...options,
    fieldMetaProp: FIELD_META_PROP,
    fieldDataProp: FIELD_DATA_PROP,
  });
  return (WrappedComponent): any => {
    class Mixins extends React.Component<FormComponentProps> {
      getPromiseValidate = (oldFn: any) => (...arg: any[]) => new Promise((resolve, reject) => {
        const getNewCb = (oldCb?: any) => (errors: any, values: any) => {
          if (errors) {
            reject({ errors, values });
          } else {
            resolve(values);
          }
          if (oldCb) {
            oldCb(errors, values);
          }
        };
        const result = arg.find((param, index) => {
          const isCb = typeof param === 'function';
          if (isCb) {
            arg[index] = getNewCb(param);
          }
          return isCb;
        });
        if (!result) {
          arg.push(getNewCb());
        }
        oldFn(...arg);
      })

      getNewProps = () => {
        const { form } = this.props;
        const validateFields = this.getPromiseValidate(form.validateFields);
        const validateFieldsAndScroll = this.getPromiseValidate(form.validateFieldsAndScroll);
        return {
          validateFields,
          validateFieldsAndScroll,
        };
      }

      render() {
        const { form } = this.props;
        return <WrappedComponent form={{ ...form, ...this.getNewProps() }} />;
      }
    }

    return createFn(Mixins);
  };
}
