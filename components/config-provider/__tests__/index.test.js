import React from 'react';
import { render } from 'enzyme';
import moment from 'moment';
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
import Collapse from '../../collapse';
import Comment from '../../comment';
import DatePicker from '../../date-picker';
import Divider from '../../divider';
import Drawer from '../../drawer';
import Dropdown from '../../dropdown';
import Form from '../../form';
import { Row, Col } from '../../grid';

import Menu from '../../menu';
import Input from '../../input';

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
        <Calendar {...props} value={moment('2000-09-03')} mode="month" />
        <Calendar {...props} value={moment('2000-09-03')} mode="year" />
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

    // Collapse
    testPair('Collapse', props => (
      <Collapse {...props}>
        <Collapse.Panel header="Bamboo">
          <p>Light</p>
        </Collapse.Panel>
      </Collapse>
    ));

    // Comment
    testPair('Comment', props => (
      <Comment {...props} content="Bamboo">
        <Comment {...props} content="Light" />
      </Comment>
    ));

    // DatePicker
    describe('DatePicker', () => {
      testPair('DatePicker', props => (
        <div>
          <DatePicker {...props} />
        </div>
      ));

      // RangePicker
      testPair('RangePicker', props => (
        <div>
          <DatePicker.RangePicker {...props} />
        </div>
      ));

      // MonthPicker
      testPair('MonthPicker', props => (
        <div>
          <DatePicker.MonthPicker {...props} />
        </div>
      ));

      // WeekPicker
      testPair('WeekPicker', props => (
        <div>
          <DatePicker.WeekPicker {...props} />
        </div>
      ));
    });

    // Divider
    testPair('Divider', props => (
      <Divider {...props} />
    ));

    // Drawer
    testPair('Drawer', props => (
      <Drawer {...props} visible getContainer={false} />
    ));

    // Dropdown
    testPair('Dropdown', (props) => {
      const menu = (
        <Menu {...props}>
          <Menu.Item {...props}>Bamboo</Menu.Item>
        </Menu>
      );

      return (
        <Dropdown.Button {...props} overlay={menu}>
          Light
        </Dropdown.Button>
      );
    });

    // Form
    testPair('Form', props => (
      <Form {...props}>
        <Form.Item
          {...props}
          validateStatus="error"
          help="Bamboo is Light"
        >
          <Input {...props} />
        </Form.Item>
      </Form>
    ));

    // Grid
    testPair('Grid', (props) => {
      const rowProps = {};
      const colProps = {};
      if (props.prefixCls) {
        rowProps.prefixCls = 'prefix-row';
        colProps.prefixCls = 'prefix-col';
      }

      return (
        <Row {...rowProps}>
          <Col {...colProps} span={1} />
        </Row>
      );
    });
  });
});
