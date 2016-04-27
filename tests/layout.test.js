jest.unmock('../components/layout/index');
jest.unmock('../components/layout/col');
jest.unmock('../components/layout/row');

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { wrap } from 'react-stateless-wrapper';

let { Col, Row } = require('../components/layout/index');
Col = wrap(Col);

describe('Layout', function() {
  it('should render Col', () => {
    const col = TestUtils.renderIntoDocument(
      <Col span="2"></Col>
    );
    const colNode = TestUtils.findRenderedDOMComponentWithTag(col, 'DIV');
    expect(colNode.className).toBe('col-2');
  });
  it('should render Row', () => {
    const row = TestUtils.renderIntoDocument(
      <Row></Row>
    );
    const rowNode = TestUtils.findRenderedDOMComponentWithTag(row, 'DIV');
    expect(rowNode.className).toBe('row');
  });
});
