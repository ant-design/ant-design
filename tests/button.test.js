import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import Button from '../components/button/button';

let buttonNode;

test.beforeEach(() => {
  buttonNode = shallow(<Button>Follow</Button>);
});

test('should set the type to button by default', (t) => {
  t.is(buttonNode.type(), 'button');
});

test('should set the default className to button', (t) => {
  t.true(buttonNode.hasClass('ant-btn'));
});

test('should has a whitespace in two Chinese charactor', (t) => {
  buttonNode = shallow(<Button>按钮</Button>);
  t.is(buttonNode.text(), '按 钮');
});
