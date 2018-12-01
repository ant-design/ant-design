import React from 'react';
import { mount } from 'enzyme';
import Modal from '..';

jest.mock('rc-util/lib/Portal');

class ModalTester extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  componentDidMount() {
    this.setState({ visible: true }); // eslint-disable-line react/no-did-mount-set-state
  }

  saveContainer = (container) => {
    this.container = container;
  }

  getContainer = () => this.container

  render() {
    const { visible } = this.state;
    return (
      <div>
        <div ref={this.saveContainer} />
        <Modal
          {...this.props}
          visible={visible}
          getContainer={this.getContainer}
        >
          Here is content of Modal
        </Modal>
      </div>
    );
  }
}

describe('Modal', () => {
  it('render correctly', () => {
    const wrapper = mount(<ModalTester />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('render without footer', () => {
    const wrapper = mount(<ModalTester footer={null} />);
    expect(wrapper.render()).toMatchSnapshot();
  });
});
