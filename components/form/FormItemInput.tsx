import * as React from 'React';
import classNames from 'classnames';
import Row from '../grid/row';
import CSSMotion from 'rc-animate/lib/CSSMotion';
import Col, { ColProps } from '../grid/col';
import { FormContext, FormContextProps } from './context';

interface FormItemInputMiscProps {
  prefixCls: string;
  children: React.ReactNode;
  errors: string[];
  touched: boolean;
  validating: boolean;
  onDomErrorVisibleChange: (visible: boolean) => void;
}

export interface FormItemInputProps {
  wrapperCol?: ColProps;
}

const FormItemInput: React.FC<FormItemInputProps & FormItemInputMiscProps> = ({
  prefixCls,
  wrapperCol,
  children,
  errors,
  onDomErrorVisibleChange,
}) => {
  const baseClassName = `${prefixCls}-item-control`;

  const { wrapperCol: contextWrapperCol, vertical }: FormContextProps = React.useContext(
    FormContext,
  );

  // To keep animation don't miss error message. We should cache the errors.
  const [cacheErrors, setCacheErrors] = React.useState(errors);
  React.useEffect(() => {
    if (errors.length) {
      setCacheErrors(errors);
      onDomErrorVisibleChange(true);
    }
  }, [errors]);

  const mergedWrapperCol: ColProps = wrapperCol || contextWrapperCol || {};

  const className = classNames(baseClassName, mergedWrapperCol.className);

  // No pass FormContext since it's useless
  return (
    <FormContext.Provider value={{ vertical }}>
      <Col {...mergedWrapperCol} className={className}>
        <div className={`${baseClassName}-input`}>{children}</div>
        <CSSMotion
          visible={!!errors.length}
          motionName="show-help"
          onLeaveEnd={() => {
            onDomErrorVisibleChange(false);
          }}
          motionAppear
          removeOnLeave
        >
          {({ className }: { className: string }) => {
            return (
              <div className={classNames(`${prefixCls}-explain`, className)} key="help">
                {cacheErrors}
              </div>
            );
          }}
        </CSSMotion>
        {/* <div className={`${baseClassName}-message`}>233</div> */}
      </Col>
    </FormContext.Provider>
  );
};

export default FormItemInput;
