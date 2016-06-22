import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import { Col, Row } from '../components/layout/index';

test('should render Col', (t) => {
  const col = shallow(<Col span={2} />);
  t.true(col.hasClass('ant-col-2'));
});

test('should render Row', (t) => {
  const row = shallow(<Row />);
  t.true(row.hasClass('ant-row'));
});
