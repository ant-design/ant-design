import React from 'react';
import { mount } from 'enzyme';
import Drawer from '..';
import Button from '../../button';

class MultiDrawer extends React.Component {
  state = { visible: false, childrenDrawer: false, hasChildren: true };

  showDrawer = () => {
    this.setState({
      visible: true,
      hasChildren: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  showChildrenDrawer = () => {
    this.setState({
      childrenDrawer: true,
      hasChildren: true,
    });
  };

  onChildrenDrawerClose = () => {
    this.setState({
      childrenDrawer: false,
    });
  };

  onRemoveChildDrawer = () => {
    this.setState({
      hasChildren: false,
    });
  };

  render() {
    const { childrenDrawer, visible, hasChildren } = this.state;
    const { placement } = this.props;
    return (
      <div>
        <Button type="primary" id="open_drawer" onClick={this.showDrawer}>
          Open drawer
        </Button>
        <Button type="primary" id="remove_drawer" onClick={this.onRemoveChildDrawer}>
          rm child drawer
        </Button>
        <Drawer
          title="Multi-level drawer"
          className="test_drawer"
          width={520}
          onClose={this.onClose}
          getContainer={false}
          placement={placement}
          visible={visible}
        >
          <Button type="primary" id="open_two_drawer" onClick={this.showChildrenDrawer}>
            Two-level drawer
          </Button>
          {hasChildren && (
            <Drawer
              title="Two-level Drawer"
              width={320}
              className="Two-level"
              getContainer={false}
              placement={placement}
              onClose={this.onChildrenDrawerClose}
              visible={childrenDrawer}
            >
              <div id="two_drawer_text">This is two-level drawer</div>
            </Drawer>
          )}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e8e8e8',
              padding: '10px 16px',
              textAlign: 'right',
              left: 0,
              background: '#fff',
              borderRadius: '0 0 4px 4px',
            }}
          >
            <Button
              style={{
                marginRight: 8,
              }}
              onClick={this.onClose}
            >
              Cancel
            </Button>
            <Button onClick={this.onClose} type="primary">
              Submit
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

describe('Drawer', () => {
  it('render right MultiDrawer', () => {
    const wrapper = mount(<MultiDrawer placement="right" />);
    wrapper.find('button#open_drawer').simulate('click');
    wrapper.find('button#open_two_drawer').simulate('click');
    const translateX = wrapper.find('.ant-drawer.test_drawer').get(0).props.style.transform;
    expect(translateX).toEqual('translateX(-180px)');
    expect(wrapper.find('#two_drawer_text').exists()).toBe(true);
  });

  it('render left MultiDrawer', () => {
    const wrapper = mount(<MultiDrawer placement="left" />);
    wrapper.find('button#open_drawer').simulate('click');
    wrapper.find('button#open_two_drawer').simulate('click');
    const translateX = wrapper.find('.ant-drawer.test_drawer').get(0).props.style.transform;
    expect(translateX).toEqual('translateX(180px)');
    expect(wrapper.find('#two_drawer_text').exists()).toBe(true);
    wrapper.find('.Two-level .ant-drawer-close').simulate('click');
    expect(wrapper.state().childrenDrawer).toBe(false);
  });

  it('render top MultiDrawer', () => {
    const wrapper = mount(<MultiDrawer placement="top" />);
    wrapper.find('button#open_drawer').simulate('click');
    wrapper.find('button#open_two_drawer').simulate('click');
    const translateX = wrapper.find('.ant-drawer.test_drawer').get(0).props.style.transform;
    expect(translateX).toEqual('translateY(180px)');
    expect(wrapper.find('#two_drawer_text').exists()).toBe(true);
  });

  it('render MultiDrawer is child in unmount', () => {
    const wrapper = mount(<MultiDrawer placement="top" mask={false} />);
    wrapper.find('button#open_drawer').simulate('click');
    wrapper.find('button#open_two_drawer').simulate('click');
    wrapper.find('button#remove_drawer').simulate('click');
    let translateX = wrapper.find('.ant-drawer.test_drawer').get(0).props.style.transform;
    expect(translateX).toEqual(undefined);
    wrapper.find('button#open_two_drawer').simulate('click');
    translateX = wrapper.find('.ant-drawer.test_drawer').get(0).props.style.transform;
    expect(translateX).toEqual('translateY(180px)');
    expect(wrapper.find('#two_drawer_text').exists()).toBe(true);
  });
});
