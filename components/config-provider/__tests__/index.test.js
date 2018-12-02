import React from 'react';
import { render } from 'enzyme';
import ConfigProvider from '..';
import Alert from '../../alert';

describe('ConfigProvider', () => {
  describe('components', () => {
    function testPair(name, renderComponent) {
      describe(name, () => {
        // normal
        it('normal', () => {
          expect(render(renderComponent())).toMatchSnapshot();
        });

        // prefixCls
        it('prefixCls', () => {
          expect(render(renderComponent({ prefixCls: `prefix-${name}` }))).toMatchSnapshot();
        });

        // configProvider
        it('configProvider', () => {
          expect(render(
            <ConfigProvider prefixCls="config">
              {renderComponent()}
            </ConfigProvider>
          )).toMatchSnapshot();
        });
      });
    }

    // Alert
    testPair('alert', props => (
      <Alert {...props} message="Bamboo is Little Light" type="success" />
    ));
  });
});
