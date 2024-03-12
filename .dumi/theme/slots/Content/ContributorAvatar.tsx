import React from 'react';
import type { AvatarListItem } from '@qixian.cs/github-contributors-list/dist/AvatarList';
import { Avatar, Skeleton, Tooltip } from 'antd';

const AvatarPlaceholder: React.FC<{ num?: number }> = ({ num = 3 }) => (
  <li>
    {Array.from({ length: num }).map<React.ReactNode>((_, i) => (
      <Skeleton.Avatar
        size="small"
        active
        key={i}
        style={{ marginInlineStart: i === 0 ? 0 : -8 }}
      />
    ))}
  </li>
);

interface ContributorAvatarProps {
  loading?: boolean;
  item?: AvatarListItem;
}

const ContributorAvatar: React.FC<ContributorAvatarProps> = (props) => {
  const {
    item: { username, url } = {},
    loading,
  } = props;
  if (loading) {
    return <AvatarPlaceholder />;
  }
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
