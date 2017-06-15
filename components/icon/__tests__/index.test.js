import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Icon from '..';

class Wrapper extends React.Component {
  render() {
    return this.props.children;
  }
}

describe('Icon', () => {
  let icon;
  let iconNode;

  beforeEach(() => {
    icon = TestUtils.renderIntoDocument(
      <Wrapper><Icon type="appstore" className="my-icon-classname" /></Wrapper>
    );
    iconNode = TestUtils.findRenderedDOMComponentWithTag(icon, 'I');
  });

  it('should render to a <i class="xxx"></i>', () => {
    expect(iconNode.tagName).toBe('I');
    expect(iconNode.className).toContain('my-icon-classname');
    expect(iconNode.className).toContain('anticon');
    expect(iconNode.className).toContain('anticon-appstore');
  });
});
