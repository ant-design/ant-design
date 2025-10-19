import * as React from 'react';
import * as all from 'antd';

interface AntdProps {
  component: keyof typeof all;
}

const Antd: React.FC<AntdProps> = (props) => {
  const { component, ...restProps } = props;
  const Component = (all[component] ?? React.Fragment) as React.ComponentType<any>;
  return <Component {...restProps} />;
};

export default Antd;
