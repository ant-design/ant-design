import React from 'react';
import { render } from 'enzyme';
import ConfigProvider from '..';
import Alert from '../../alert';
import Anchor from '../../anchor';
import AutoComplete from '../../auto-complete';
import Avatar from '../../avatar';
import BackTop from '../../back-top';
import Badge from '../../badge';

describe('ConfigProvider', () => {
  describe('components', () => {
    function testPair(name, renderComponent) {
      describe(name, () => {
        // normal
        it('normal', () => {
          expect(render(renderComponent({}))).toMatchSnapshot();
        });

        // prefixCls
        it('prefixCls', () => {
          expect(render(renderComponent({ prefixCls: `prefix-${name}` }))).toMatchSnapshot();
        });

        // configProvider
        it('configProvider', () => {
          expect(render(
            <ConfigProvider prefixCls="config">
              {renderComponent({})}
            </ConfigProvider>
          )).toMatchSnapshot();
        });
      });
    }

    // Alert
    testPair('alert', props => (
      <Alert {...props} message="Bamboo is Little Light" type="success" />
    ));

    // Anchor
    testPair('anchor', props => (
      <Anchor {...props}>
        <Anchor.Link {...props} href="#bamboo" title="Little Light" />
      </Anchor>
    ));

    // AutoComplete
    testPair('auto-complete', props => (
      <AutoComplete {...props} />
    ));

    // Avatar
    testPair('avatar', props => (
      <Avatar {...props} />
    ));

    // BackTop
    testPair('back-top', props => (
      <BackTop visible {...props} />
    ));

    // Badge
    testPair('badge', (props) => {
      const newProps = {
        ...props,
      };

      // Hook for additional `scrollNumberPrefixCls` prop
      if (props.prefixCls) {
        newProps.scrollNumberPrefixCls = 'prefix-scroll-number';
      }


      return (
        <div>
          <Badge {...newProps} count={5}>
            <span />
          </Badge>

          <Badge {...newProps} dot>
            <span />
          </Badge>
        </div>
      );
    });
  });
});
