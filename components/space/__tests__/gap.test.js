import React from 'react';
import Space from '..';
import { render } from '../../../tests/utils';
// eslint-disable-next-line no-unused-vars

jest.mock('../../_util/styleChecker', () => ({
  canUseDocElement: () => true,
  isStyleSupport: () => true,
  detectFlexGapSupported: () => true,
}));

describe('flex gap', () => {
  it('should render width empty children', () => {
    const { container } = render(
      <Space>
        <span />
        <span />
      </Space>,
    );
    expect(container.querySelector('div.ant-space').style['column-gap']).toBe('8px');
    expect(container.querySelector('div.ant-space').style['row-gap']).toBe('8px');
  });
});
