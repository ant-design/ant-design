import * as React from 'react';
import * as all from 'antd';

interface AntdProps {
  component: keyof typeof all;
}

function Antd(props: AntdProps) {
  const { component, ...restProps } = props;
  const Component = (all[component] ?? React.Fragment) as React.ComponentType;

  return <Component {...restProps} />;
}

export default Antd;
