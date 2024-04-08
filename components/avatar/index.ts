import { type ForwardRefExoticComponent, type RefAttributes } from 'react';

import InternalAvatar, { type AvatarProps } from './avatar';
import Group from './group';

export type { AvatarProps } from './avatar';
export type { GroupProps } from './group';
export { Group };

type CompoundedComponent = ForwardRefExoticComponent<
  AvatarProps & RefAttributes<HTMLSpanElement>
> & {
  Group: typeof Group;
};

const Avatar = InternalAvatar as CompoundedComponent;

Avatar.Group = Group;

export default Avatar;
