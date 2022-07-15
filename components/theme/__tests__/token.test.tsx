import { Theme } from '@ant-design/cssinjs';
import * as React from 'react';
import { render, renderHook } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import theme from '../export';

const { useToken } = theme;

describe('Theme', () => {
  it('useTheme', () => {
    const result = renderHook(() => useToken());

    expect(result.current.theme instanceof Theme).toBeTruthy();
    expect(result.current.hashId).toBeFalsy();
    expect(result.current.token).toEqual(
      expect.objectContaining({
        colorPrimary: '#1890ff',
      }),
    );
  });

  it('ConfigProvider with seed', () => {
    const Demo = React.forwardRef((_, ref: any) => {
      const themeObj = useToken();
      ref.current = themeObj;
      return null;
    });

    const themeRef = React.createRef<ReturnType<typeof useToken>>();
    render(
      <ConfigProvider
        theme={{
          token: {
            brandColor: '#ff0000',
          },
        }}
      >
        <Demo ref={themeRef} />
      </ConfigProvider>,
    );

    expect(themeRef.current!.token).toEqual(
      expect.objectContaining({
        colorPrimary: '#ff0000',
        colorPrimaryHover: '#ff3029', // It's safe to modify if theme logic changed
      }),
    );
  });
});
