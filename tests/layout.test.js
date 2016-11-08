import React from 'react';
import TestUtils from 'react-addons-test-utils';
let { Col, Row } = require('../components/layout/index');

describe('Layout', function() {
  it('should render Col', () => {
    const col = TestUtils.renderIntoDocument(
      <Col span="2"></Col>
    );
    const colNode = TestUtils.findRenderedDOMComponentWithTag(col, 'DIV');
    expect(colNode.className).toBe('ant-col-2');
  });
  it('should render Row', () => {
    const row = TestUtils.renderIntoDocument(
      <Row></Row>
    );
    const rowNode = TestUtils.findRenderedDOMComponentWithTag(row, 'DIV');
    expect(rowNode.className).toBe('ant-row');
  });
});
