import * as React from 'react';
import SkeletonElement, { SkeletonElementProps } from './SkeletonElement';

// eslint-disable-next-line react/prefer-stateless-function
class SkeletonAvatar extends React.Component<SkeletonElementProps, any> {
  static defaultProps: Partial<SkeletonElementProps> = {
    size: 'large',
  };

  render() {
    return <SkeletonElement {...this.props} />;
  }
}

export default SkeletonAvatar;
