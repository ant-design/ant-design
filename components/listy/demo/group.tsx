import React from 'react';
import { Avatar, Flex, Listy } from 'antd';

interface Contact {
  id: number;
  name: string;
}

const firstNames = [
  'Aaron',
  'Alice',
  'Bella',
  'Brian',
  'Chloe',
  'Colin',
  'Daisy',
  'David',
  'Elena',
  'Eric',
  'Fiona',
  'Frank',
  'Grace',
  'Gavin',
  'Hannah',
  'Henry',
  'Iris',
  'Ivan',
  'Jack',
  'Julia',
  'Kevin',
  'Kylie',
  'Laura',
  'Leo',
  'Mason',
  'Mia',
  'Nina',
  'Noah',
  'Olivia',
  'Oscar',
  'Peter',
  'Paula',
  'Quinn',
  'Rachel',
  'Ryan',
  'Sara',
  'Steve',
  'Tina',
  'Tom',
  'Uma',
  'Victor',
  'Vera',
  'Wendy',
  'Will',
  'Xander',
  'Yara',
  'Zack',
  'Zoe',
];

const lastNames = [
  'Adams',
  'Baker',
  'Carter',
  'Diaz',
  'Evans',
  'Foster',
  'Garcia',
  'Hayes',
  'Ingram',
  'Jensen',
  'Kim',
  'Lopez',
  'Miller',
  'Nguyen',
  'Ortiz',
  'Parker',
  'Quincy',
  'Reed',
  'Smith',
  'Turner',
];

const contacts: Contact[] = firstNames
  .flatMap((firstName, i) =>
    Array.from(
      { length: 4 },
      (_, j) => `${firstName} ${lastNames[(i * 7 + j * 5) % lastNames.length]}`,
    ),
  )
  .sort()
  .map((name, id) => ({ id, name }));

const colors = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae', '#87d068'];

const colorOf = (letter: string) => colors[(letter.charCodeAt(0) - 65) % colors.length];

const App: React.FC = () => (
  <Listy
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
