import React, { useLayoutEffect, useMemo, useState } from 'react';
import { CalendarOutlined } from '@ant-design/icons';
import { Avatar, Flex, Skeleton, Typography } from 'antd';
import DayJS from 'dayjs';
import { useRouteMeta } from 'dumi';

interface AuthorAvatarPoprs {
  name: string;
  avatar: string;
}

const AuthorAvatar: React.FC<AuthorAvatarPoprs> = ({ name, avatar }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useLayoutEffect(() => {
    const img = new Image();
    img.src = avatar;
    img.onload = () => setLoading(false);
    img.onerror = () => setError(true);
  }, []);
  if (error) {
    return null;
  }
  if (loading) {
    return <Skeleton.Avatar size="small" active />;
  }
  return (
    <Avatar size="small" src={avatar} alt={name}>
      {name}
    </Avatar>
  );
};

const DocMeta: React.FC = () => {
  const meta = useRouteMeta();

  const mergedAuthorInfos = useMemo(() => {
    const { author } = meta.frontmatter;
    if (!author) {
      return [];
    }
    if (typeof author === 'string') {
      return author.split(',').map((item) => ({
        name: item,
        avatar: `https://github.com/${item}.png`,
      }));
    }
    if (Array.isArray(author)) {
      return author;
    }
    return [];
  }, [meta.frontmatter.author]);

  if (!meta.frontmatter.date && !meta.frontmatter.author) {
    return null;
  }

  return (
    <Typography.Paragraph>
      <Flex gap="small">
        {meta.frontmatter.date && (
          <span style={{ opacity: 0.65 }}>
            <CalendarOutlined /> {DayJS(meta.frontmatter.date).format('YYYY-MM-DD')}
          </span>
        )}
        {mergedAuthorInfos.map<React.ReactNode>((info) => (
          <a
            href={`https://github.com/${info.name}`}
            target="_blank"
            rel="noopener noreferrer"
            key={info.name}
          >
            <Flex gap={4}>
              <AuthorAvatar name={info.name} avatar={info.avatar} />
              <span style={{ opacity: 0.65 }}>@{info.name}</span>
            </Flex>
          </a>
        ))}
      </Flex>
    </Typography.Paragraph>
  );
};

export default DocMeta;
