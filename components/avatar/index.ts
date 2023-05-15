import InternalAvatar from './avatar';
import Group from './group';

export type { AvatarProps } from './avatar';
export type { GroupProps } from './group';
export { Group };

const Avatar = Object.assign(InternalAvatar, { Group });

export default Avatar;
