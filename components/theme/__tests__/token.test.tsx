import { Theme } from '@ant-design/cssinjs';
import * as React from 'react';
import genRadius from '../themes/shared/genRadius';
import { render, renderHook } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import theme from '..';

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
      0: {
        borderRadius: 0,
        borderRadiusLG: 0,
        borderRadiusSM: 0,
        borderRadiusXS: 0,
        borderRadiusOuter: 0,
      },
      2: {
        borderRadius: 2,
        borderRadiusLG: 2,
        borderRadiusSM: 2,
        borderRadiusXS: 1,
        borderRadiusOuter: 2,
      },
      4: {
        borderRadius: 4,
        borderRadiusLG: 4,
        borderRadiusSM: 4,
        borderRadiusXS: 1,
        borderRadiusOuter: 4,
      },
      5: {
        borderRadius: 5,
        borderRadiusLG: 6,
        borderRadiusSM: 4,
        borderRadiusXS: 1,
        borderRadiusOuter: 4,
      },
      6: {
        borderRadius: 6,
        borderRadiusLG: 8,
        borderRadiusSM: 4,
        borderRadiusXS: 2,
        borderRadiusOuter: 4,
      },
      7: {
        borderRadius: 7,
        borderRadiusLG: 9,
        borderRadiusSM: 5,
        borderRadiusXS: 2,
        borderRadiusOuter: 4,
      },
      8: {
        borderRadius: 8,
        borderRadiusLG: 10,
        borderRadiusSM: 6,
        borderRadiusXS: 2,
        borderRadiusOuter: 6,
      },
      10: {
        borderRadius: 10,
        borderRadiusLG: 12,
        borderRadiusSM: 6,
        borderRadiusXS: 2,
        borderRadiusOuter: 6,
      },
      12: {
        borderRadius: 12,
        borderRadiusLG: 14,
        borderRadiusSM: 6,
        borderRadiusXS: 2,
        borderRadiusOuter: 6,
      },
      14: {
        borderRadius: 14,
        borderRadiusLG: 16,
        borderRadiusSM: 7,
        borderRadiusXS: 2,
        borderRadiusOuter: 6,
      },
      16: {
        borderRadius: 16,
        borderRadiusLG: 16,
        borderRadiusSM: 8,
        borderRadiusXS: 2,
        borderRadiusOuter: 6,
      },
      20: {
        borderRadius: 16,
        borderRadiusLG: 16,
        borderRadiusSM: 8,
        borderRadiusXS: 2,
        borderRadiusOuter: 6,
      },
    };

    Object.entries(radiusGroup).forEach(([base, result]) => {
      it(`base ${base}`, () => {
        expect(genRadius(Number(base))).toMatchObject(result);
      });
    });
  });
});
