import React, { useState } from 'react';
import ConfigProvider from '..';
import { fireEvent, pureRender } from '../../../tests/utils';
import Tooltip from '../../tooltip';

interface Props {
  spy: () => void;
}

// https://github.com/ant-design/ant-design/issues/27617
describe('ConfigProvider', () => {
  const Child: React.FC<Props> = ({ spy }) => {
    React.useEffect(() => spy());
    return <div />;
  };

  const Sibling: React.FC<Props> = ({ spy }) => (
    <Tooltip>
      <Child spy={spy} />
    </Tooltip>
  );

  it('should not generate new context config when render', () => {
    const MemoedSibling = React.memo(Sibling);
    const spy = jest.fn();
    const App: React.FC = () => {
      const [pageHeader, setPageHeader] = useState({ ghost: true });
      const [, forceRender] = React.useReducer((v) => v + 1, 1);

      return (
        <ConfigProvider pageHeader={pageHeader}>
          <button type="button" className="render" onClick={() => forceRender()}>
            Force Render
          </button>
          <button
            type="button"
            className="setState"
            onClick={() => setPageHeader({ ghost: false })}
          >
            Change Config
          </button>
          <MemoedSibling spy={spy} />
        </ConfigProvider>
      );
    };

    const { container } = pureRender(<App />);

    const startCalledTimes = spy.mock.calls.length;
    fireEvent.click(container.querySelector('.render')!);
    expect(spy.mock.calls.length).toEqual(startCalledTimes);

    fireEvent.click(container.querySelector('.setState')!);
    expect(spy.mock.calls.length).toEqual(startCalledTimes + 1);
  });

  it('should not generate new context config in nested ConfigProvider when render', () => {
    const MemoedSibling = React.memo(Sibling);
    const spy = jest.fn();
    const App: React.FC = () => {
      const [pageHeader, setPageHeader] = useState({ ghost: true });
      const [, forceRender] = React.useReducer((v) => v + 1, 1);

      return (
        <ConfigProvider pageHeader={pageHeader}>
          <ConfigProvider>
            <button type="button" className="render" onClick={() => forceRender()}>
              Force Render
            </button>
            <button
              type="button"
              className="setState"
              onClick={() => setPageHeader({ ghost: false })}
            >
              Change Config
            </button>
            <MemoedSibling spy={spy} />
          </ConfigProvider>
        </ConfigProvider>
      );
    };

    const { container } = pureRender(<App />);

    const startCalledTimes = spy.mock.calls.length;
    fireEvent.click(container.querySelector('.render')!);
    expect(spy.mock.calls.length).toEqual(startCalledTimes);

    fireEvent.click(container.querySelector('.setState')!);
    expect(spy.mock.calls.length).toEqual(startCalledTimes + 1);
  });
});
