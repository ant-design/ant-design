import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { Col, Row } from '..';

describe('Grid', () => {
  it('should render Col', () => {
    const col = TestUtils.renderIntoDocument(
      <Col span="2" />
    );
    const colNode = TestUtils.findRenderedDOMComponentWithTag(col, 'DIV');
    expect(colNode.className).toBe('ant-col-2');
  });
  it('should render Row', () => {
    const row = TestUtils.renderIntoDocument(
      <Row />
    );
    const rowNode = TestUtils.findRenderedDOMComponentWithTag(row, 'DIV');
    expect(rowNode.className).toBe('ant-row');
  });
});
