import React from 'react';
import { mount } from 'enzyme';
import Drawer from '..';
import Button from '../../button';

class DrawerEventTester extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  componentDidMount() {
    this.setState({ visible: true }); // eslint-disable-line react/no-did-mount-set-state
  }

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  open = () => {
    this.setState({
      visible: true,
    });
  };

  render() {
    const { visible } = this.state;
    return (
      <div>
        <Button onClick={this.open}>open</Button>
        <Drawer visible={visible} onClose={this.onClose} getContainer={false} {...this.props}>
          Here is content of Drawer
        </Drawer>
      </div>
    );
  }
}

describe('Drawer', () => {
  it('render correctly', () => {
    const wrapper = mount(<DrawerEventTester />);
    const body = wrapper.find('.ant-drawer-body').exists();

    expect(body).toBe(true);
    wrapper.find('button.ant-btn').simulate('click');

    const content = wrapper.find('.ant-drawer-body').getDOMNode().innerHTML;
    expect(content).toBe('Here is content of Drawer');

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('mask trigger onClose', () => {
    const wrapper = mount(<DrawerEventTester />);

    wrapper.find('button.ant-btn').simulate('click');
    expect(wrapper.instance().state.visible).toBe(true);

    wrapper.find('.ant-drawer-mask').simulate('click');
    expect(wrapper.instance().state.visible).toBe(false);
  });

  it('close button trigger onClose', () => {
    const wrapper = mount(<DrawerEventTester />);

    wrapper.find('button.ant-btn').simulate('click');
    expect(wrapper.instance().state.visible).toBe(true);

    wrapper.find('.ant-drawer-close').simulate('click');
    expect(wrapper.instance().state.visible).toBe(false);
  });

  it('maskClosable no trigger onClose', () => {
    const wrapper = mount(<DrawerEventTester maskClosable={false} />);

    wrapper.find('button.ant-btn').simulate('click');
    expect(wrapper.instance().state.visible).toBe(true);

    wrapper.find('.ant-drawer-mask').simulate('click');
    expect(wrapper.instance().state.visible).toBe(true);
  });

  it('dom should be removed after close when destroyOnClose is true', () => {
    const wrapper = mount(<DrawerEventTester destroyOnClose />);
    wrapper.find('button.ant-btn').simulate('click');
    expect(wrapper.find('.ant-drawer-wrapper-body').exists()).toBe(true);

    wrapper.setState({
      visible: false,
    });
    wrapper.find('.ant-drawer-wrapper-body').simulate('transitionend');
    expect(wrapper.find('.ant-drawer-wrapper-body').exists()).toBe(false);
  });

  it('dom should be existed after close when destroyOnClose is false', () => {
    const wrapper = mount(<DrawerEventTester />);
    wrapper.find('button.ant-btn').simulate('click');
    expect(wrapper.find('.ant-drawer-wrapper-body').exists()).toBe(true);

    wrapper.setState({
      visible: false,
    });
    wrapper.find('.ant-drawer-wrapper-body').simulate('transitionend');
    expect(wrapper.find('.ant-drawer-wrapper-body').exists()).toBe(true);
  });

  it('no mask and no closable', () => {
    const wrapper = mount(<DrawerEventTester destroyOnClose />);

    wrapper.find('button.ant-btn').simulate('click');
    expect(wrapper.instance().state.visible).toBe(true);

    wrapper.find('.ant-drawer-close').simulate('click');
    expect(wrapper.instance().state.visible).toBe(false);
  });
});
