import classNames from 'classnames';
import React from 'react';
import ConfigProvider from '..';
import { render } from '../../../tests/utils';
import type { AliasToken } from '../../_util/theme';
import type { UseToken } from '../../_util/theme/util/registerToken';

const { useCustomToken, registerToken, genStyleHook: genAntdStyleHook } = ConfigProvider;

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
    });

  const genStyleHook = registerToken(useMyToken);

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

  it('registerToken', () => {
    const useStyle = genStyleHook(token => ({
      [token.componentCls]: {
        backgroundColor: token.colorAlert,
        color: token.colorAlertActive,
      },
    }));

    const Demo = () => {
      const { wrapSSR, hashId } = useStyle('box');
      return wrapSSR(<div className={classNames('box', hashId)}>test registerToken</div>);
    };

    render(<Demo />);
    const dynamicStyles = Array.from(document.querySelectorAll('style[data-css-hash]')).map(
      item => item?.innerHTML ?? '',
    );
    expect(
      dynamicStyles.some(style => style.includes('.box{background-color:red;color:purple;}')),
    ).toBeTruthy();
  });

  it('default genStyleHook', () => {
    const useStyle = genAntdStyleHook(token => ({
      [token.componentCls]: {
        backgroundColor: token.colorPrimary,
        color: token.colorSuccess,
      },
    }));

    const Demo = () => {
      const { wrapSSR, hashId } = useStyle('default-genStyleHook');
      return wrapSSR(
        <div className={classNames('default-genStyleHook', hashId)}>test registerToken</div>,
      );
    };

    render(<Demo />);
    const dynamicStyles = Array.from(document.querySelectorAll('style[data-css-hash]')).map(
      item => item?.innerHTML ?? '',
    );
    expect(
      dynamicStyles.some(style =>
        style.includes('.default-genStyleHook{background-color:#1890ff;color:#52c41a;}'),
      ),
    ).toBeTruthy();
  });
});
