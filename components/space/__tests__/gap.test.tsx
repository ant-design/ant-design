import React from 'react';

import Space from '..';
import { render } from '../../../tests/utils';

jest.mock('../../_util/styleChecker', () => ({
  canUseDocElement: () => true,
  isStyleSupport: () => true,
}));

describe('flex gap', () => {
  it('should render width empty children', () => {
    const { container } = render(
      <Space>
        <span />
        <span />
      </Space>,
    );
    expect(container.querySelector<HTMLDivElement>('div.ant-space')).toHaveClass(
      'ant-space-gap-row-small',
    );
    expect(container.querySelector<HTMLDivElement>('div.ant-space')).toHaveClass(
      'ant-space-gap-col-small',
    );
  });

  it('should size work', () => {
    const { container } = render(
      <Space size={10}>
        <span>test</span>
      </Space>,
    );
    const element = container.querySelector<HTMLDivElement>('div.ant-space');
    expect(element).toHaveStyle({ rowGap: '10px', columnGap: '10px' });
  });

  it('should NaN work', () => {
    expect(() => {
      render(
        <Space size={[NaN, NaN]}>
          <span>test</span>
        </Space>,
      );
    }).not.toThrow();
  });
});
