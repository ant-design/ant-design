import classNames from 'classnames';
import ConfigProvider from '..';
import { render } from '../../../tests/utils';
import type { AliasToken } from '../../_util/theme';
import type { UseToken } from '../../_util/theme/util/genStyleHook';
import genStyleHook from '../../_util/theme/util/genStyleHook';

const { useCustomToken } = ConfigProvider;

describe('ConfigProvider.Token', () => {
  type MySeedToken = {
    colorAlert: string;
  };

  type MyAliasToken = {
    colorAlertActive: string;
  };

  const useMyToken: UseToken<AliasToken & MySeedToken & MyAliasToken> = () =>
    useCustomToken<MySeedToken, MyAliasToken>({
      seedToken: { colorAlert: 'red' },
      formatToken: derivativeToken => ({
        ...derivativeToken,
        colorAlertActive: 'purple',
      }),
      hashed: true,
    });

  const makeStyle = genStyleHook(useMyToken);

  it('should support customSeedToken & customOverride', () => {
    const Demo = () => {
      const { token } = useMyToken();
      return <div>{JSON.stringify(token)}</div>;
    };

    const { container } = render(<Demo />);
    const finalToken = JSON.parse(container.firstElementChild?.innerHTML ?? '');
    expect(finalToken).toHaveProperty('colorAlert', 'red');
    expect(finalToken).toHaveProperty('colorAlertActive', 'purple');
  });

  it('genStyleHook', () => {
    const useStyle = makeStyle(token => ({
      '.box': {
        backgroundColor: token.colorAlert,
        color: token.colorAlertActive,
      },
    }));

    const Demo = () => {
      const { wrapSSR, hashId } = useStyle('customToken');
      return wrapSSR(<div className={classNames('box', hashId)}>test genStyleHook</div>);
    };

    render(<Demo />);
    const dynamicStyles = Array.from(document.querySelectorAll('style[data-css-hash]')).map(
      item => item?.innerHTML ?? '',
    );
    expect(
      dynamicStyles.some(style => style.includes('.box{background-color:red;color:purple;}')),
    ).toBeTruthy();
  });
});
