import InternalAvatar from './avatar';
import Group from './group';

export { AvatarProps } from './avatar';
export { GroupProps } from './group';
export { Group };

const Avatar = Object.assign(InternalAvatar, { Group });

export default Avatar;
