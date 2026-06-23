import React from 'react';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import { render } from '@testing-library/react';

import Rate from '..';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import ConfigProvider from '../../config-provider';

describe('Rate', () => {
  focusTest(Rate, { refFocus: true });
  mountTest(Rate);
  rtlTest(Rate);

  describe('size', () => {
    it('size=small', () => {
      const { container } = render(<Rate count={3} value={1} size="small" />);
      expect(container.querySelector('.ant-rate-small')).toBeTruthy();
    });
    it('size=large', () => {
      const { container } = render(<Rate count={3} value={1} size="large" />);
      expect(container.querySelector('.ant-rate-large')).toBeTruthy();
    });
  });

  it('supports border tokens for default and selected stars', () => {
    const cache = createCache();

    render(
      <StyleProvider cache={cache}>
        <ConfigProvider
          theme={{
            components: {
              Rate: {
                starBorderColorDefault: '#111111',
                starBorderWidthDefault: 2,
                starBorderColorSelected: '#222222',
                starBorderWidthSelected: 3,
              },
            },
          }}
        >
          <Rate value={1} />
        </ConfigProvider>
      </StyleProvider>,
    );

    const styleText = extractStyle(cache, { plain: true });

    expect(styleText).toContain('--ant-rate-star-border-color-default:#111111');
    expect(styleText).toContain('--ant-rate-star-border-width-default:2px');
    expect(styleText).toContain('--ant-rate-star-border-color-selected:#222222');
    expect(styleText).toContain('--ant-rate-star-border-width-selected:3px');
    expect(styleText).toContain('stroke:var(--ant-rate-star-border-color-default)');
    expect(styleText).toContain('stroke-width:var(--ant-rate-star-border-width-default)');
    expect(styleText).toContain('stroke-linejoin:round');
    expect(styleText).toContain('stroke:var(--ant-rate-star-border-color-selected)');
    expect(styleText).toContain('stroke-width:var(--ant-rate-star-border-width-selected)');
  });
});
