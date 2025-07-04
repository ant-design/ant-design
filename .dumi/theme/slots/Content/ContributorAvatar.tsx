import React from 'react';
import type { AvatarListItem } from '@qixian.cs/github-contributors-list/dist/AvatarList';
import { Avatar, Tooltip } from 'antd';

interface ContributorAvatarProps {
  loading?: boolean;
  item?: AvatarListItem;
}

const ContributorAvatar: React.FC<ContributorAvatarProps> = (props) => {
  const {
    item: { username, url } = {},
  } = props;
  if (username?.includes('github-actions')) {
    return null;
  }
  return (
    <Tooltip title={username}>
      <li>
        <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">
          <Avatar size="small" src={url} alt={username}>
            {username}
          </Avatar>
        </a>
      </li>
    </Tooltip>
  );
};

export default ContributorAvatar;
