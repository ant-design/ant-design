import React from 'react';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';

import Alert from '..';
import { isNumber } from '../../_util/is';
import { render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import type { ThemeConfig } from '../../config-provider/context';

const radiusVariable = '--ant-alert-container-border-radius';

function renderAlert(theme: ThemeConfig) {
  const cache = createCache();
  render(
    <StyleProvider cache={cache}>
      <ConfigProvider theme={theme}>
        <Alert title="Alert" />
      </ConfigProvider>
    </StyleProvider>,
  );
  return extractStyle(cache, { plain: true });
}

describe('Alert radius token', () => {
  it.each([0, 4, 6])('should derive the default radius from global borderRadius %s', (radius) => {
    const styles = renderAlert({ token: { borderRadius: radius } });
    expect(styles).toContain(`${radiusVariable}:${radius === 6 ? 8 : radius}px;`);
    expect(styles).toContain(`border-radius:var(${radiusVariable})`);
  });

  it.each([0, 12, '50%'])('should support containerBorderRadius %s', (radius) => {
    const styles = renderAlert({ components: { Alert: { containerBorderRadius: radius } } });
    expect(styles).toContain(`${radiusVariable}:${isNumber(radius) ? `${radius}px` : radius};`);
    expect(styles).toContain(`border-radius:var(${radiusVariable})`);
  });

  it.each([
    [false, 8],
    [true, 6],
  ])('should preserve local global tokens with algorithm %s', (algorithm, expected) => {
    const styles = renderAlert({
      components: { Alert: { borderRadius: 5, algorithm } },
    });
    expect(styles).toContain(`${radiusVariable}:${expected}px;`);
  });

  it('should prefer the component radius over the locally derived radius', () => {
    const styles = renderAlert({
      components: {
        Alert: { borderRadius: 5, algorithm: true, containerBorderRadius: 12 },
      },
    });
    expect(styles).toContain(`${radiusVariable}:12px;`);
  });

  it('should support overriding the local large radius without an algorithm', () => {
    const styles = renderAlert({ components: { Alert: { borderRadiusLG: 16 } } });
    expect(styles).toContain(`${radiusVariable}:16px;`);
  });
});
