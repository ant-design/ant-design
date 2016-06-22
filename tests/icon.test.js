import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import Icon from '../components/icon/index';

let iconNode;

test.beforeEach(() => {
  iconNode = shallow(
    <Icon type="appstore" className="my-icon-classname" />
  );
});

test('should render to a <i class="xxx"></i>', (t) => {
  t.is(iconNode.type(), 'i');
  t.true(iconNode.hasClass('my-icon-classname'));
  t.true(iconNode.hasClass('anticon'));
  t.true(iconNode.hasClass('anticon-appstore'));
});
