import React from 'react';
import { Avatar } from 'antd';

export interface AvatarListItem {
  username?: string;
  url?: string;
}

export interface ContributorAvatarProps {
  loading?: boolean;
  item?: AvatarListItem;
}

const ContributorAvatar: React.FC<ContributorAvatarProps> = (props) => {
  const { item: { username, url } = {} } = props;
  if (!username || !url) {
    return null;
  }
  return (
    <li>
      <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">
        <Avatar size="small" src={url} alt="">
          {username}
        </Avatar>
        <span>{username}</span>
      </a>
    </li>
  );
};

export default ContributorAvatar;
