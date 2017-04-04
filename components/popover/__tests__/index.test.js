import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Popover from '..';

describe('Popover', () => {
  it('should show overlay when trigger is clicked', () => {
    const popover = TestUtils.renderIntoDocument(
      <Popover content="console.log('hello world')" title="code" trigger="click">
        <span>show me your code</span>
      </Popover>
    );

    expect(popover.getPopupDomNode()).toBe(null);

    TestUtils.Simulate.click(
      TestUtils.findRenderedDOMComponentWithTag(popover, 'span')
    );

    const popup = popover.getPopupDomNode();
    expect(popup).not.toBe(null);
    expect(popup.className).toContain('ant-popover-placement-top');
    expect(popup.innerHTML).toMatch(/<div class="ant-popover-title".*?>code<\/div>/);
    expect(popup.innerHTML).toMatch(/<div class="ant-popover-inner-content".*?>console\.log\('hello world'\)<\/div>/);
  });
});
