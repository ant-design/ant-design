import React, { useState } from 'react';
import type Icon from '@ant-design/icons';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, Flex, Listy, Skeleton, Space, Switch, Typography } from 'antd';

interface IconTextProps {
  icon: typeof Icon;
  text: React.ReactNode;
}

interface DataType {
  href: string;
  title: string;
  avatar: string;
  description: string;
  content: string;
}

const listData = Array.from<any, DataType>({ length: 3 }, (_, i) => ({
  href: 'https://ant.design',
  title: `ant design part ${i + 1}`,
  avatar: `https://api.dicebear.com/10.x/lorelei/svg?seed=${i}`,
  description:
    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));

const IconText: React.FC<IconTextProps> = ({ icon, text }) => (
  <>
    {React.createElement(icon, { style: { marginInlineEnd: 8 } })}
    {text}
  </>
);

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const onChange = (checked: boolean) => {
    setLoading(!checked);
  };

  return (
    <>
      <Switch checked={!loading} onChange={onChange} style={{ marginBottom: 16 }} />
      <Listy<DataType>
        items={listData}
        rowKey="title"
        styles={{ item: { padding: '16px 24px' } }}
        itemRender={(item) => (
          <Flex gap="large">
            <Flex vertical flex="auto" gap="middle" style={{ minWidth: 0 }}>
              <Skeleton loading={loading} active avatar>
                <Flex gap="middle" align="flex-start">
                  <Avatar src={item.avatar} />
                  <Flex vertical>
                    <a href={item.href}>{item.title}</a>
                    <Typography.Text type="secondary">{item.description}</Typography.Text>
                  </Flex>
                </Flex>
                {item.content}
              </Skeleton>
              {!loading && (
                <Space separator={<Typography.Text type="secondary">|</Typography.Text>}>
                  <IconText icon={StarOutlined} text="156" />
                  <IconText icon={LikeOutlined} text="156" />
                  <IconText icon={MessageOutlined} text="2" />
                </Space>
              )}
            </Flex>
            {!loading && (
              <img
                draggable={false}
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            )}
          </Flex>
        )}
      />
    </>
  );
};

export default App;
