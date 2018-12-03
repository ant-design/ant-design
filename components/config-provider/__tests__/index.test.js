import React from 'react';
import { render } from 'enzyme';
import ConfigProvider from '..';
import Alert from '../../alert';
import Anchor from '../../anchor';
import AutoComplete from '../../auto-complete';
import Avatar from '../../avatar';
import BackTop from '../../back-top';
import Badge from '../../badge';
import Breadcrumb from '../../breadcrumb';
import Button from '../../button';
import Calendar from '../../calendar';
import Card from '../../card';
import Carousel from '../../carousel';
import Cascader from '../../cascader';
import Checkbox from '../../checkbox';

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
    testPair('Alert', props => (
      <Alert {...props} message="Bamboo is Little Light" type="success" />
    ));

    // Anchor
    testPair('Anchor', props => (
      <Anchor {...props}>
        <Anchor.Link {...props} href="#bamboo" title="Little Light" />
      </Anchor>
    ));

    // AutoComplete
    testPair('AutoComplete', props => (
      <AutoComplete {...props} />
    ));

    // Avatar
    testPair('Avatar', props => (
      <Avatar {...props} />
    ));

    // BackTop
    testPair('BackTop', props => (
      <BackTop visible {...props} />
    ));

    // Badge
    testPair('Badge', (props) => {
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

    // Breadcrumb
    testPair('Breadcrumb', props => (
      <Breadcrumb {...props}>
        <Breadcrumb.Item {...props}>Bamboo</Breadcrumb.Item>
        <Breadcrumb.Item {...props}>Light</Breadcrumb.Item>
      </Breadcrumb>
    ));

    // Button
    testPair('Button', props => (
      <div>
        <Button {...props}>Bamboo</Button>
        <Button.Group {...props}>
          <Button {...props}>Little</Button>
          <Button {...props}>Light</Button>
        </Button.Group>
      </div>
    ));

    // Calendar
    testPair('Calendar', props => (
      <div>
        <Calendar {...props} mode="month" />
        <Calendar {...props} mode="year" />
      </div>
    ));

    // Card
    testPair('Card', props => (
      <Card {...props}>
        <Card.Grid {...props}>
          <Card.Meta {...props} />
        </Card.Grid>
      </Card>
    ));

    // Carousel
    testPair('Carousel', props => (
      <Carousel {...props}>
        <div><h3>Bamboo</h3></div>
        <div><h3>Light</h3></div>
      </Carousel>
    ));

    // Cascader
    testPair('Cascader', props => (
      <Cascader {...props} options={[]} showSearch />
    ));

    // Checkbox
    testPair('Checkbox', props => (
      <Checkbox.Group {...props}>
        <Checkbox {...props}>Bamboo</Checkbox>
      </Checkbox.Group>
    ));
  });
});
