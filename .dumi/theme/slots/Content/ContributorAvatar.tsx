import React from 'react';
import { Avatar } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ cssVar, css }) => {
  return {
    anchor: css`
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: ${cssVar.marginXS};
      color: ${cssVar.colorTextSecondary};
      text-decoration: none;
      &:hover,
      &:active {
        color: ${cssVar.colorTextSecondary};
        text-decoration: underline;
      }
    `,
    username: css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `,
  };
});

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
  const { styles } = useStyle();
  if (!username || !url) {
    return null;
  }
  return (
    <li>
      <a
        className={styles.anchor}
        href={`https://github.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Avatar size="small" src={url} alt={username} />
        <span className={styles.username} title={username}>
          {username}
        </span>
      </a>
    </li>
  );
};

export default ContributorAvatar;
