import React from 'react';
import Space from '..';
import { render } from '../../../tests/utils';

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
    expect(
      container.querySelector<HTMLDivElement>('div.ant-space')?.style[
        'column-gap' as keyof CSSStyleDeclaration
      ],
    ).toBe('8px');
    expect(
      container.querySelector<HTMLDivElement>('div.ant-space')?.style[
        'row-gap' as keyof CSSStyleDeclaration
      ],
    ).toBe('8px');
  });
});
