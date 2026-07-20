import React from 'react';

import Listy from '..';
import { render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

const mockItemHeights: number[] = [];

jest.mock('@rc-component/listy', () => {
  const ActualReact = jest.requireActual<typeof import('react')>('react');
  const Actual = jest.requireActual('@rc-component/listy');
  return {
    ...Actual,
    __esModule: true,
    default: ActualReact.forwardRef<unknown, { itemHeight: number }>((props, ref) => {
      mockItemHeights.push(props.itemHeight);
      return ActualReact.createElement(Actual.default, { ...props, ref });
    }),
  };
});

describe('Listy.Token', () => {
  beforeEach(() => {
    mockItemHeights.length = 0;
  });

  it('derives itemHeight estimate from Listy component token', () => {
    const node = (
      <Listy height={200} items={[{ id: 1 }]} rowKey="id" itemRender={(item) => String(item.id)} />
    );

    render(node);
    const defaultItemHeight = mockItemHeights[0];

    mockItemHeights.length = 0;
    render(
      <ConfigProvider theme={{ components: { Listy: { itemPaddingBlock: 20 } } }}>
        {node}
      </ConfigProvider>,
    );

    // Default itemPaddingBlock is paddingSM (12): the estimate grows by (20 - 12) * 2
    expect(mockItemHeights[0]).toBe(defaultItemHeight + 16);
  });
});
