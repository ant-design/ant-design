import InternalAvatar from './avatar';
import Group from './group';

export type { AvatarProps } from './avatar';
export type { GroupProps } from './group';
export { Group };

type CompoundedComponent = typeof InternalAvatar & {
  Group: typeof Group;
};

const Avatar = InternalAvatar as CompoundedComponent;

Avatar.Group = Group;

export default Avatar;
