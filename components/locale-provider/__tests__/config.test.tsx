import React from 'react';
import { act } from 'react-dom/test-utils';
import { Modal } from '../..';
import { sleep, render, fireEvent } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import zhCN from '../zh_CN';

class Demo extends React.Component<{ type: string }> {
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

    const BasicExample: React.FC = () => {
      const [type, setType] = React.useState<string>('');
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
    const { container } = render(<BasicExample />);

    fireEvent.click(container.querySelector('.about')!);
    await act(async () => {
      jest.runAllTimers();
      await sleep();
    });

    fireEvent.click(container.querySelector('.dashboard')!);
    await act(async () => {
      jest.runAllTimers();
      await sleep();
    });

    expect(document.body.querySelectorAll('.ant-btn-primary span')[0]?.textContent).toBe('确 定');
    Modal.destroyAll();
    jest.useRealTimers();
  });
});
