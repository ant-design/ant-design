import { Theme } from '@ant-design/cssinjs';
import * as React from 'react';
import theme from '..';
import { render, renderHook } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import type { ThemeConfig } from '../../config-provider/context';
import Row from '../../row';
import genRadius from '../themes/shared/genRadius';

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

  const rowShouldThrow = (screens: any, error: string) => {
    const demoRender = () =>
      render(
        <ConfigProvider theme={{ token: screens }}>
          <Row />
        </ConfigProvider>,
      );
    expect(demoRender).toThrow(error);
  };

  describe('invalid breakpoints order values should raise an error', () => {
    const tests: Array<[string, number, string]> = [
      ['screenXS', 1000, 'screenXSMax<=screenSMMin fails : !(1010<=576)'],
      ['screenSM', 1000, 'screenSMMax<=screenMDMin fails : !(1010<=768)'],
      ['screenMD', 1000, 'screenMDMax<=screenLGMin fails : !(1010<=992)'],
      ['screenLG', 2000, 'screenLGMax<=screenXLMin fails : !(2010<=1200)'],
      ['screenXL', 2000, 'screenXLMax<=screenXXLMin fails : !(2010<=1600)'],
    ];

    tests.forEach(([screen, value, error]: any) => {
      it(`Screen ${screen} is too big`, () => {
        rowShouldThrow(
          { [screen]: value, [`${screen}Min`]: value, [`${screen}Max`]: value + 10 },
          error,
        );
      });
    });
  });

  describe('invalid breakpoints MIN<=BP values should raise an error', () => {
    const tests: Array<[string, number, string]> = [
      ['screenXSMin', 1000, 'screenXSMin<=screenXS fails : !(1000<=480)'],
      ['screenSMMin', 1000, 'screenSMMin<=screenSM fails : !(1000<=576)'],
      ['screenMDMin', 1000, 'screenMDMin<=screenMD fails : !(1000<=768)'],
      ['screenLGMin', 2000, 'screenLGMin<=screenLG fails : !(2000<=992)'],
      ['screenXLMin', 2000, 'screenXLMin<=screenXL fails : !(2000<=1200)'],
      ['screenXXLMin', 2000, 'screenXXLMin<=screenXXL fails : !(2000<=1600)'],
    ];

    tests.forEach(([screen, value, error]: any) => {
      it(`Screen ${screen}Min is too big regarding ${screen}`, () => {
        rowShouldThrow({ [screen]: value }, error);
      });
    });
  });

  describe('invalid breakpoints BP<=MAX values should raise an error', () => {
    const tests: Array<[string, number, string]> = [
      ['screenXS', 1000, 'screenXS<=screenXSMax fails : !(1000<=575)'],
      ['screenSM', 1000, 'screenSM<=screenSMMax fails : !(1000<=767)'],
      ['screenMD', 1000, 'screenMD<=screenMDMax fails : !(1000<=991)'],
      ['screenLG', 2000, 'screenLG<=screenLGMax fails : !(2000<=1199)'],
      ['screenXL', 2000, 'screenXL<=screenXLMax fails : !(2000<=1599)'],
    ];

    tests.forEach(([screen, value, error]: any) => {
      it(`Screen ${screen} is too big regarding ${screen}Max`, () => {
        rowShouldThrow({ [screen]: value }, error);
      });
    });
  });

  it('motion false token', () => {
    const Shower = () => {
      const { token } = useToken();

      return <div className="duration">{token.motionDurationSlow}</div>;
    };

    const { container } = render(
      <ConfigProvider theme={{ token: { motion: false } }}>
        <Shower />
      </ConfigProvider>,
    );

    expect(container.querySelector('.duration')?.textContent).toEqual('0s');
  });

  describe('getDesignToken', () => {
    const getHookToken = (config?: ThemeConfig) => {
      let token: any;
      const Demo = () => {
        const { token: hookToken } = useToken();
        token = hookToken;
        return null;
      };
      render(
        <ConfigProvider theme={config}>
          <Demo />
        </ConfigProvider>,
      );
      delete token._hashId;
      delete token._tokenKey;
      return token;
    };

    it('default', () => {
      const token = theme.getDesignToken();
      const hookToken = getHookToken();
      expect(token).toEqual(hookToken);
    });

    it('with custom token', () => {
      const config: ThemeConfig = {
        token: {
          colorPrimary: '#189cff',
          borderRadius: 8,
          fontSizeLG: 20,
        },
      };
      const token = theme.getDesignToken(config);
      const hookToken = getHookToken(config);
      expect(token).toEqual(hookToken);
      expect(token.colorPrimary).toEqual('#189cff');
    });

    it('with custom algorithm', () => {
      const config: ThemeConfig = {
        token: {
          colorPrimary: '#1677ff',
          borderRadius: 8,
          fontSizeLG: 20,
        },
        algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
      };
      const token = theme.getDesignToken(config);
      const hookToken = getHookToken(config);
      expect(token).toEqual(hookToken);
      expect(token.colorPrimary).toEqual('#1668dc');
    });
  });
});
