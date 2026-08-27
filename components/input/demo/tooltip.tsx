import React, { useState } from 'react';
import { Input, Tooltip } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles((props) => {
  const { css, prefixCls, cssVar } = props;
  return {
    numericInput: css`
      .${prefixCls}-tooltip-container {
        min-width: 32px;
        min-height: 38px;
      }
    `,
    numericInputTitle: css`
      font-size: ${cssVar.fontSize};
    `,
  };
});

interface NumericInputProps {
  style: React.CSSProperties;
  value: string;
  onChange: (value: string) => void;
}

const formatNumber = (value: number) => new Intl.NumberFormat().format(value);

const NumericInput: React.FC<NumericInputProps> = (props) => {
  const { value, onChange } = props;

  const { styles } = useStyles();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      onChange(inputValue);
    }
  };

  // '.' at the end or only '-' in the input box.
  const handleBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    let valueTemp = value;
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      valueTemp = value.slice(0, -1);
    }
    onChange(valueTemp.replace(/0*(\d+)/, '$1'));
  };

  const title = value ? (
    <span className={styles.numericInputTitle}>
      {value !== '-' ? formatNumber(Number(value)) : '-'}
    </span>
  ) : (
    'Input a number'
  );

  return (
    <Tooltip
      destroyOnHidden
      trigger={['focus']}
      title={title}
      placement="topLeft"
      classNames={{ root: styles.numericInput }}
    >
      <Input
        {...props}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Input a number"
        maxLength={16}
      />
    </Tooltip>
  );
};

const App: React.FC = () => {
  const [value, setValue] = useState('');
  return <NumericInput style={{ width: 120 }} value={value} onChange={setValue} />;
};

export default App;
