import classNames from 'classnames';
import React from 'react';
import ConfigProvider from '..';
import { render } from '../../../tests/utils';
import type { AliasToken } from '../../theme';
import type { UseCustomStyle, UseToken } from '../../theme/util/useStyle';

const { useCustomToken, useStyle, useCustomStyle } = ConfigProvider;

describe('ConfigProvider.Token', () => {
  type MySeedToken = {
    colorAlert: string;
  };

  type MyAliasToken = {
    colorAlertActive: string;
  };

  type MyToken = AliasToken & MySeedToken & MyAliasToken;

  const useMyToken: UseToken<AliasToken & MySeedToken & MyAliasToken> = () =>
    useCustomToken<MySeedToken, MyAliasToken>({
      seedToken: { colorAlert: 'red' },
      formatToken: derivativeToken => ({
        ...derivativeToken,
        colorAlertActive: 'purple',
      }),
    });

  const useMyStyle: UseCustomStyle<MyToken> = (componentName, styleFn) => {
    const { token, hashId } = useMyToken();
    return useCustomStyle(componentName, styleFn, token, hashId);
  };

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

  it('useCustomStyle', () => {
    const Demo = () => {
      const { wrapSSR, hashId } = useMyStyle('box', token => ({
        '.box': {
          backgroundColor: token.colorAlert,
          color: token.colorAlertActive,
        },
      }));
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

  it('useStyle', () => {
    const Demo = () => {
      const { wrapSSR, hashId } = useStyle('default-useStyle', token => ({
        '.default-genStyleHook': {
          backgroundColor: token.colorPrimary,
          color: token.colorSuccess,
        },
      }));
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
