import * as React from 'react';
import SkeletonElement, { SkeletonElementProps } from './SkeletonElement';

export interface AvatarProps extends Omit<SkeletonElementProps, 'shape'> {
  shape?: 'circle' | 'square';
}

// eslint-disable-next-line react/prefer-stateless-function
class SkeletonAvatar extends React.Component<AvatarProps, any> {
  static defaultProps: Partial<SkeletonElementProps> = {
    size: 'large',
  };

  render() {
    return <SkeletonElement {...this.props} />;
  }
}

export default SkeletonAvatar;
