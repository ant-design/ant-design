import * as React from 'react';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('skeleton');

rootPropsTest('skeleton', (Skeleton, props) => <Skeleton.Avatar {...props} />, {
  name: 'Skeleton.Avatar',
});

rootPropsTest('skeleton', (Skeleton, props) => <Skeleton.Button {...props} />, {
  name: 'Skeleton.Button',
});

rootPropsTest('skeleton', (Skeleton, props) => <Skeleton.Image {...props} />, {
  name: 'Skeleton.Image',
});

rootPropsTest('skeleton', (Skeleton, props) => <Skeleton.Input {...props} />, {
  name: 'Skeleton.Input',
});

rootPropsTest('skeleton', (Skeleton, props) => <Skeleton.Node {...props} />, {
  name: 'Skeleton.Node',
});
