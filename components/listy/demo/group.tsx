import React from 'react';
import { Avatar, Flex, Listy } from 'antd';

interface Contact {
  id: number;
  name: string;
}

const names = [
  'Aaron Baker',
  'Alice Adams',
  'Bella Carter',
  'Brian Diaz',
  'Chloe Evans',
  'Colin Foster',
  'Daisy Garcia',
  'David Hayes',
  'Elena Ingram',
  'Eric Jensen',
  'Fiona Kim',
  'Frank Lopez',
  'Grace Miller',
  'Gavin Nguyen',
  'Hannah Ortiz',
  'Henry Parker',
  'Iris Quincy',
  'Ivan Reed',
  'Jack Smith',
  'Julia Turner',
];

const contacts = names.map<Contact>((name, id) => ({ id, name }));

const colors = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae', '#87d068'];

const colorOf = (letter: string) => colors[(letter.charCodeAt(0) - 65) % colors.length];

const App: React.FC = () => (
  <Listy<Contact>
    items={contacts}
    rowKey="id"
    height={400}
    sticky
    group={{
      key: (contact) => contact.name[0],
      title: (letter) => letter,
    }}
    itemRender={(contact) => (
      <Flex align="center" gap="small">
        <Avatar size="small" style={{ backgroundColor: colorOf(contact.name[0]) }}>
          {contact.name[0]}
        </Avatar>
        {contact.name}
      </Flex>
    )}
  />
);

export default App;
