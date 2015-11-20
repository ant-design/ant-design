import React from 'react';
import expect from 'expect.js';
import TestUtils from 'react-addons-test-utils';

jest.dontMock('../components/popover/index');

const Popover = require('../components/popover/index');

describe('Popover', function() {
  it.only('should show overlay when trigger is clicked', () => {
    const popover = TestUtils.renderIntoDocument(
      <Popover overlay="console.log('hello world')" title="code" trigger="click">
        <a href="#">show me your code</a>
      </Popover>
    );

    expect(popover.getPopupDomNode()).to.be(undefined);

    TestUtils.Simulate.click(
      TestUtils.findRenderedDOMComponentWithTag(popover, 'a')
    );

    const popup = popover.getPopupDomNode();
    expect(popup).not.to.be(undefined);
    expect(popup.className).to.contain('ant-popover-placement-top');
    expect(popup.innerHTML).to.match(/<div class="ant-popover-title".*?>code<\/div>/);
    expect(popup.innerHTML).to.match(/<div class="ant-popover-content".*?>console\.log\('hello world'\)<\/div>/);
  });
});
