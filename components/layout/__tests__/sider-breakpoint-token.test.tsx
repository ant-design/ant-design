import React from 'react';

import { render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import Sider from '../Sider';

describe('Sider breakpoint token', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('uses the theme screenLG token for the responsive query', () => {
    const matchMedia = jest.spyOn(window, 'matchMedia').mockReturnValue({
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    } as any);

    render(
      <ConfigProvider
        theme={{
          token: {
            screenLG: 1300,
            screenLGMin: 1300,
            screenLGMax: 1399.98,
            screenXL: 1400,
            screenXLMin: 1400,
            screenXLMax: 1599.98,
          },
        }}
      >
        <Sider breakpoint="lg" />
      </ConfigProvider>,
    );

    const queries = matchMedia.mock.calls.map(([query]) => query);
    expect(queries).toContain('screen and (max-width: 1299.98px)');
  });
});
