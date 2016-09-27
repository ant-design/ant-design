import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Popover from '../components/popover/index';

describe('Popover', function() {
  it('should show overlay when trigger is clicked', () => {
    const popover = TestUtils.renderIntoDocument(
      <Popover content="console.log('hello world')" title="code" trigger="click">
        <a href="#">show me your code</a>
      </Popover>
    );

    expect(popover.getPopupDomNode()).toBe(null);

    TestUtils.Simulate.click(
      TestUtils.findRenderedDOMComponentWithTag(popover, 'a')
    );

    const popup = popover.getPopupDomNode();
    expect(popup).not.toBe(null);
    expect(popup.className).toContain('ant-popover-placement-top');
    expect(popup.innerHTML).toMatch(/<div class="ant-popover-title".*?>code<\/div>/);
    expect(popup.innerHTML).toMatch(/<div class="ant-popover-inner-content".*?>console\.log\('hello world'\)<\/div>/);
  });
});
