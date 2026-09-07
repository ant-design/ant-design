import InternalAvatar from './Avatar';
import type { AvatarGroupProps } from './AvatarGroup';
import AvatarGroup from './AvatarGroup';

export type { AvatarProps } from './Avatar';
export type { AvatarGroupRef } from './AvatarGroup';

/** @deprecated Please use `AvatarGroupProps` */
export type GroupProps = AvatarGroupProps;

type CompoundedComponent = typeof InternalAvatar & {
  Group: typeof AvatarGroup;
};

const Avatar = InternalAvatar as CompoundedComponent;

Avatar.Group = AvatarGroup;

export default Avatar;
