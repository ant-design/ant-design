import React from 'react';

import Flex from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render } from '../../../tests/utils';
import { getGapSize } from '../utils';

describe('Flex', () => {
  mountTest(() => <Flex>test</Flex>);
  rtlTest(() => <Flex>test</Flex>);
  it('Flex', () => {
    const { container } = render(<Flex justify="center">test</Flex>);
    expect(container.querySelector('.ant-flex')).toHaveStyle({ justifyContent: 'center' });
  });
  it('getGapSize', () => {
    const size1 = getGapSize();
    expect(size1).toBe(0);
    const size2 = getGapSize(10);
    expect(size2).toBe(10);
    const smallSize = getGapSize('small');
    expect(smallSize).toBe(8);
    const middleSize = getGapSize('middle');
    expect(middleSize).toBe(16);
    const largeSize = getGapSize('large');
    expect(largeSize).toBe(24);
  });
});
