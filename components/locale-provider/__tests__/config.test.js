import React from 'react';

import { mount } from 'enzyme';

import ConfigProvider from '../../config-provider';

import { Modal } from '../..';

import zhCN from '../zh_CN';

class Demo extends React.Component {
  static defaultProps = {};

  componentDidMount() {
    if (this.props.type === 'dashboard') {
      Modal.confirm({ title: 'Hello World!' });
    }
  }

  render() {
    return <div>{this.props.type}</div>;
  }
}

describe('Locale Provider demo', () => {
  it('change type', () => {
    jest.useFakeTimers();

    const BasicExample = () => {
      const [type, setType] = React.useState('');
      return (
        <div>
          <a className="about" onClick={() => setType('about')}>
            about
          </a>
          <a className="dashboard" onClick={() => setType('dashboard')}>
            dashboard
          </a>
          <div>
            {type === 'about' && (
              <ConfigProvider locale={zhCN}>
                <Demo type="about" />
              </ConfigProvider>
            )}
            {type === 'dashboard' && (
              <ConfigProvider locale={zhCN}>
                <Demo type="dashboard" />
              </ConfigProvider>
            )}
          </div>
        </div>
      );
    };
    const wrapper = mount(<BasicExample />);
    wrapper.find('.about').at(0).simulate('click');
    jest.runAllTimers();
    wrapper.find('.dashboard').at(0).simulate('click');
    jest.runAllTimers();
    expect(document.body.querySelectorAll('.ant-btn-primary span')[0].textContent).toBe('确 定');
    Modal.destroyAll();
    jest.useRealTimers();
  });
});
