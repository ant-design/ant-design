import ConfigProvider from '..';
import { render } from '../../../tests/utils';

const { useCustomToken } = ConfigProvider;

describe('ConfigProvider.Token', () => {
  it('should support customSeedToken & customOverride', () => {
    type MySeedToken = {
      colorAlert: string;
    };

    type MyAliasToken = {
      colorAlertActive: string;
    };

    const useMyToken = () => {
      const { token } = useCustomToken<MySeedToken, MyAliasToken>({
        seedToken: { colorAlert: 'red' },
        formatToken: derivativeToken => ({
          ...derivativeToken,
          colorAlertActive: 'purple',
        }),
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
    expect(finalToken).toHaveProperty('colorAlertActive', 'purple');
  });
});
