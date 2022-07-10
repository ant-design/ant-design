import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { Modal } from '../..';
import { sleep } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
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
  it('change type', async () => {
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
    await act(async () => {
      jest.runAllTimers();
      await sleep();
    });

    wrapper.find('.dashboard').at(0).simulate('click');
    await act(async () => {
      jest.runAllTimers();
      await sleep();
    });

    expect(document.body.querySelectorAll('.ant-btn-primary span')[0].textContent).toBe('确 定');
    Modal.destroyAll();
    jest.useRealTimers();
  });
});
