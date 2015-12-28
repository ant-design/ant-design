jest.dontMock('../components/button/button');

import React from 'react';
import TestUtils from 'react-addons-test-utils';
const Button = require('../components/button/button');

describe('Button', function() {
  let button;
  let buttonNode;

  beforeEach(() => {
    button = TestUtils.renderIntoDocument(
      <Button>Follow</Button>
    );
    buttonNode = TestUtils.findRenderedDOMComponentWithTag(button, 'button');
  });

  it('should set the type to button by default', () => {
    expect(buttonNode.type).toBe('button');
  });

  it('should set the default className to button', () => {
    expect(buttonNode.className).toBe('ant-btn');
  });

  it('should has a whitespace in two Chinese charactor', () => {
    button = TestUtils.renderIntoDocument(
      <Button>按钮</Button>
    );
    buttonNode = TestUtils.findRenderedDOMComponentWithTag(button, 'button');
    expect(buttonNode.textContent).toBe('按 钮');
  });
});

