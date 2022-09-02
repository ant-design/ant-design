import { Theme } from '@ant-design/cssinjs';
import * as React from 'react';
import genRadius from '../themes/shared/genRadius';
import { render, renderHook } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import theme from '../export';

const { useToken } = theme;

describe('Theme', () => {
  it('useTheme', () => {
    const { result } = renderHook(() => useToken());

    expect(result.current!.theme instanceof Theme).toBeTruthy();
    expect(result.current!.hashId).toBeFalsy();
    expect(result.current!.token).toEqual(
      expect.objectContaining({
        colorPrimary: '#1677ff',
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
            colorPrimary: '#ff0000',
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

  describe('radius should be computed as expected', () => {
    const radiusGroup = {
      0: { radiusBase: 0, radiusLG: 0, radiusSM: 0, radiusXS: 0, radiusOuter: 0 },
      2: { radiusBase: 2, radiusLG: 2, radiusSM: 2, radiusXS: 1, radiusOuter: 2 },
      4: { radiusBase: 4, radiusLG: 4, radiusSM: 4, radiusXS: 1, radiusOuter: 4 },
      5: { radiusBase: 5, radiusLG: 6, radiusSM: 4, radiusXS: 1, radiusOuter: 4 },
      6: { radiusBase: 6, radiusLG: 8, radiusSM: 4, radiusXS: 2, radiusOuter: 4 },
      7: { radiusBase: 7, radiusLG: 9, radiusSM: 5, radiusXS: 2, radiusOuter: 4 },
      8: { radiusBase: 8, radiusLG: 10, radiusSM: 6, radiusXS: 2, radiusOuter: 6 },
      10: { radiusBase: 10, radiusLG: 12, radiusSM: 6, radiusXS: 2, radiusOuter: 6 },
      12: { radiusBase: 12, radiusLG: 14, radiusSM: 6, radiusXS: 2, radiusOuter: 6 },
      14: { radiusBase: 14, radiusLG: 16, radiusSM: 7, radiusXS: 2, radiusOuter: 6 },
      16: { radiusBase: 16, radiusLG: 16, radiusSM: 8, radiusXS: 2, radiusOuter: 6 },
      20: { radiusBase: 16, radiusLG: 16, radiusSM: 8, radiusXS: 2, radiusOuter: 6 },
    };

    Object.entries(radiusGroup).forEach(([base, result]) => {
      it(`base ${base}`, () => {
        expect(genRadius(Number(base))).toMatchObject(result);
      });
    });
  });
});
