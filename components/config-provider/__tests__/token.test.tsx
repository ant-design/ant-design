import ConfigProvider from '..';
import { render } from '../../../tests/utils';
import type { AliasToken } from '../../_util/theme';

const { useCustomToken } = ConfigProvider;

describe('ConfigProvider.Token', () => {
  it('should support customSeedToken & customOverride', () => {
    type MySeedToken = {
      colorAlert: string;
    };

    type MyOverrideToken = {
      derivative?: {
        colorAlertHover: string;
      };
      MyAlert?: {
        colorBg: string;
      };
    };

    const useMyToken = () => {
      const [, token] = useCustomToken<MySeedToken, MyOverrideToken>({
        seedToken: { colorAlert: 'red' },
        override: {
          derivative: {
            colorAlertHover: 'pink',
          },
          MyAlert: {
            colorBg: 'black',
          },
        },
        formatToken: (derivativeToken: AliasToken & MySeedToken & MyOverrideToken) => {
          const { derivative, ...restToken } = derivativeToken;
          return {
            ...restToken,
            ...derivative,
            colorAlertActive: 'purple',
          };
        },
        hashed: true,
      });

      return token;
    };

    const Demo = () => {
      const token = useMyToken();
      return <div>{JSON.stringify(token)}</div>;
    };

    const { container } = render(<Demo />);
    const finalToken = JSON.parse(container.firstElementChild?.innerHTML ?? '');
    expect(finalToken).toHaveProperty('colorAlert', 'red');
    expect(finalToken).toHaveProperty('colorAlertHover', 'pink');
    expect(finalToken).toHaveProperty('colorAlertActive', 'purple');
    expect(finalToken).toHaveProperty('MyAlert', {
      colorBg: 'black',
    });
  });
});
