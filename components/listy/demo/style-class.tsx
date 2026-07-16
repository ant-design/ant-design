import React from 'react';
import { Listy } from 'antd';
import type { ListyProps } from 'antd';
import { createStaticStyles } from 'antd-style';

interface User {
  id: number;
  name: string;
  team: string;
}

const users: User[] = [
  { id: 0, name: 'Olivia', team: 'Design' },
  { id: 1, name: 'Liam', team: 'Design' },
  { id: 2, name: 'Emma', team: 'Design' },
  { id: 3, name: 'Noah', team: 'Engineering' },
  { id: 4, name: 'Ava', team: 'Engineering' },
  { id: 5, name: 'Ethan', team: 'Engineering' },
  { id: 6, name: 'Sophia', team: 'Marketing' },
  { id: 7, name: 'Lucas', team: 'Marketing' },
];

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    border: 1px solid #91caff;
    border-radius: 8px;
    overflow: hidden;
  `,
  groupHeader: css`
    color: #1677ff;
    background: #e6f4ff;
  `,
}));

const styles: ListyProps['styles'] = {
  item: { fontStyle: 'italic' },
};

const App: React.FC = () => (
  <Listy<User, string>
    items={users}
    rowKey="id"
    height={260}
    sticky
    group={{ key: (user) => user.team, title: (team) => team }}
    itemRender={(user) => user.name}
    classNames={classNames}
    styles={styles}
  />
);

export default App;
