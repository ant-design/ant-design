import React from 'react';
import { Avatar, Flex, Listy, Typography } from 'antd';

interface Notification {
  id: number;
  user: string;
  message: string;
  time: string;
}

const users = ['Olivia', 'Liam', 'Emma', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Lucas'];

const messages = [
  'commented on your merge request',
  'invited you to the quarterly planning review. Please confirm your availability before Friday so the agenda can be finalized in time.',
  'mentioned you in the design review thread',
  'assigned you a task that is due next Monday. It covers the remaining accessibility issues found in the latest audit.',
  'starred the report you shared yesterday',
  'requested changes on your pull request. Most of the comments are about naming and the test coverage of the new cache layer.',
];

const colors = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

const colorOf = (user: string) => colors[users.indexOf(user) % colors.length];

const pad = (value: number) => String(value).padStart(2, '0');

const notifications: Notification[] = Array.from({ length: 5000 }, (_, index) => ({
  id: index,
  user: users[index % users.length],
  message: messages[index % messages.length],
  time: `${pad((8 + index) % 24)}:${pad((index * 17) % 60)}`,
}));

const App: React.FC = () => (
  <Listy
    items={notifications}
    rowKey="id"
    height={400}
    itemRender={(item) => (
      <Flex gap="middle" align="flex-start">
        <Avatar style={{ backgroundColor: colorOf(item.user), flex: 'none' }}>
          {item.user[0]}
        </Avatar>
        <Flex vertical flex="auto" style={{ minWidth: 0 }}>
          <Flex justify="space-between" gap="small">
            <Typography.Text strong>{item.user}</Typography.Text>
            <Typography.Text type="secondary">{item.time}</Typography.Text>
          </Flex>
          <Typography.Text type="secondary">{item.message}</Typography.Text>
        </Flex>
      </Flex>
    )}
  />
);

export default App;
