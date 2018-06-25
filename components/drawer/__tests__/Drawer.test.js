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
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('have a title', () => {
    const wrapper = mount(<DrawerTester title="Test Title" />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('closable is false', () => {
    const wrapper = mount(<DrawerTester closable={false} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('destroyOnClose is true', () => {
    const wrapper = mount(<DrawerTester destroyOnClose visible={false} />);
    expect(wrapper.render()).toMatchSnapshot();
  });
});
