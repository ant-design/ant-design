import React from 'react';
import { render } from '../../../tests/utils';
import ConfigProvider from '..';

describe('global style', () => {
  beforeEach(() => {
    Array.from(document.querySelectorAll('style')).forEach(style => {
      style.parentNode?.removeChild(style);
    });
  });

  it('global style should be appended', () => {
    const { unmount } = render(
      <ConfigProvider theme={{ token: { colorPrimary: '#001' } }}>
        <div />
      </ConfigProvider>,
    );
    const dynamicStyles = Array.from(document.querySelectorAll('style[data-css-hash]'));

    expect(
      dynamicStyles.some(style => {
        const { innerHTML } = style;
        return innerHTML.includes('html,body{width:100%;height:100%;}');
      }),
    ).toBeTruthy();

    unmount();
  });

  it('nested ConfigProvider disableGlobalStyle should work', () => {
    const { unmount } = render(
      <ConfigProvider theme={{ token: { colorPrimary: '#003' } }} disableGlobalStyle>
        <ConfigProvider />
      </ConfigProvider>,
    );
    expect(document.querySelector('style[data-css-hash]')?.innerHTML).toBe('');
    unmount();
  });
});
