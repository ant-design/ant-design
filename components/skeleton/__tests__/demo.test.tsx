import * as React from 'react';
import Skeleton from '..';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('skeleton');

rootPropsTest('skeleton', (props) => <Skeleton.Avatar {...props} />, {
  name: 'Skeleton.Avatar',
});

rootPropsTest('skeleton', (props) => <Skeleton.Button {...props} />, {
  name: 'Skeleton.Button',
});

rootPropsTest('skeleton', (props) => <Skeleton.Image {...props} />, {
  name: 'Skeleton.Image',
});

rootPropsTest('skeleton', (props) => <Skeleton.Input {...props} />, {
  name: 'Skeleton.Input',
});

rootPropsTest('skeleton', (props) => <Skeleton.Node {...props} />, {
  name: 'Skeleton.Node',
});
