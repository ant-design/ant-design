import * as React from 'react';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('avatar');

rootPropsTest(
  'avatar',
  (Avatar, props) => (
    <Avatar.Group {...props} maxCount={1}>
      <Avatar>Bamboo</Avatar>
      <Avatar>Light</Avatar>
    </Avatar.Group>
  ),
  {
    name: 'Avatar.Group',
  },
);
