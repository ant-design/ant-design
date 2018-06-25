import React from 'react';
import { mount } from 'enzyme';
import Drawer from '..';


class DrawerTester extends React.Component {
  saveContainer = (container) => {
    this.container = container;
  }
  getContainer = () => {
    return this.container;
  }
  render() {
    return (
      <div>
        <div ref={this.saveContainer} />
        <Drawer
          visible
          getContainer={this.getContainer}
          {...this.props}
        >
          Here is content of Drawer
        </Drawer>
      </div>
    );
  }
}

describe('Drawer', () => {
  it('render correctly', () => {
    const wrapper = mount(<DrawerTester width={400} />);
    const content = wrapper.find('.ant-drawer-body').getDOMNode().innerHTML;
    expect(content).toBe('Here is content of Drawer');
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('have a title', () => {
    const wrapper = mount(<DrawerTester title="Test Title" />);
    const title = wrapper.find('.ant-drawer-title').getDOMNode().innerHTML;
    expect(title).toBe('Test Title');
    const closable = wrapper.find('.ant-drawer-close').exists();
    expect(closable).toBe(true);
  });

  it('closable is false', () => {
    const wrapper = mount(<DrawerTester closable={false} />);
    const closable = wrapper.find('.ant-drawer-close').exists();
    expect(closable).toBe(false);
  });

  it('destroyOnClose is true', () => {
    const wrapper = mount(<DrawerTester destroyOnClose visible={false} />);
    const body = wrapper.find('.ant-drawer-body').exists();
    expect(body).toBe(false);
  });
});
