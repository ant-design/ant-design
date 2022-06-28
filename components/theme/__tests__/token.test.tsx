import { Theme } from '@ant-design/cssinjs';
import * as React from 'react';
import { render, renderHook } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import { useDesignToken } from '../export';

describe('Theme', () => {
  it('useTheme', () => {
    const result = renderHook(() => useDesignToken());

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
      const themeObj = useDesignToken();
      ref.current = themeObj;
      return null;
    });

    const themeRef = React.createRef<ReturnType<typeof useDesignToken>>();
    render(
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: 'red',
          },
        }}
      >
        <Demo ref={themeRef} />
      </ConfigProvider>,
    );

    expect(themeRef.current!.token).toEqual(
      expect.objectContaining({
        colorPrimary: 'red',
        colorPrimaryHover: '#ff3029', // It's safe to modify if theme logic changed
      }),
    );
  });
});
