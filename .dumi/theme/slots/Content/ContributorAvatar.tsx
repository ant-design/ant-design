import React from 'react';
import { Avatar, Skeleton, Tooltip } from 'antd';

const AvatarPlaceholder: React.FC<{ num?: number }> = ({ num = 3 }) => (
  <li>
    {Array.from({ length: num }).map((_, i) => (
      <Skeleton.Avatar size="small" active key={i} style={{ marginLeft: i === 0 ? 0 : -8 }} />
    ))}
  </li>
);

interface ContributorAvatarProps {
  username?: string;
  url?: string;
  loading?: boolean;
  title?: string;
}

const ContributorAvatar: React.FC<ContributorAvatarProps> = ({ username, url, loading, title }) => {
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
