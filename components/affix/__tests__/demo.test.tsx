import { spyElementPrototype } from 'rc-util/lib/test/domHook';
import * as React from 'react';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('affix', {
  testRootProps: false,
});

rootPropsTest(
  'affix',
  (Affix, props) => (
    <Affix {...props} className="fixed" target={() => document.querySelector('#holder')}>
      Bamboo
    </Affix>
  ),
  {
    beforeRender: () => {
      spyElementPrototype(HTMLElement, 'getBoundingClientRect', function getBoundingClientRect() {
        if (this.id === 'holder') {
          return { top: 0, bottom: 100 };
        }

        if (this.className === 'fixed') {
          return { top: -100, bottom: -100 };
        }

        return { top: 0, bottom: 0 };
      });
    },
    findRootElements: () => document.querySelectorAll('.ant-affix'),
    expectCount: 1,
  },
);
