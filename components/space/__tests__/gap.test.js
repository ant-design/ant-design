import React from 'react';
import { render } from '../../../tests/utils';
import Space from '..';
// eslint-disable-next-line no-unused-vars
import * as styleChecker from '../../_util/styleChecker';

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
