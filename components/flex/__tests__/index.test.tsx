import React from 'react';

import Flex from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render } from '../../../tests/utils';

describe('Flex', () => {
  mountTest(() => <Flex>test</Flex>);
  rtlTest(() => <Flex>test</Flex>);
  it('Flex', () => {
    const { container, rerender } = render(<Flex justify="center">test</Flex>);
    expect(container.querySelector('.ant-flex')).toHaveStyle({ justifyContent: 'center' });
    rerender(<Flex flex="0 1 auto">test</Flex>);
    expect(container.querySelector('.ant-flex')).toHaveStyle({ flex: '0 1 auto' });
  });
});
