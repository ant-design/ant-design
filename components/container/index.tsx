import classNames from 'classnames';
import { useComponentConfig } from '../config-provider/context';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size: 'small' | 'medium' | 'large';
}

const defaultProps: ContainerProps = {
  size: 'medium',
};

export default function Container(props: ContainerProps) {
  const config = useComponentConfig('container');
  const { size, children, className, ...rest } = { ...defaultProps, ...config, ...props };

  return (
    <div {...rest} className={classNames(className)}>
      {children}
    </div>
  );
}
