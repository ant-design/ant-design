import React from 'react';
import type { AvatarListItem } from '@qixian.cs/github-contributors-list/dist/AvatarList';
import { Avatar, Tooltip } from 'antd';

// 这些机器人账号不需要展示
const blockList = ['github-actions', 'copilot', 'renovate', 'dependabot'];

interface ContributorAvatarProps {
  loading?: boolean;
  item?: AvatarListItem;
}

const ContributorAvatar: React.FC<ContributorAvatarProps> = (props) => {
  const { item: { username, url } = {} } = props;
  if (!username) {
    return null;
  }
  if (blockList.some((name) => username.toLowerCase() === name)) {
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
