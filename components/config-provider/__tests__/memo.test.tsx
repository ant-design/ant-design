import React, { useState } from 'react';
import ConfigProvider from '..';
import Tooltip from '../../tooltip';
import { render, fireEvent } from '../../../tests/utils';

type SpyFn = () => void;

// https://github.com/ant-design/ant-design/issues/27617
describe('ConfigProvider', () => {
  const Child: React.FC<{ spy: SpyFn }> = ({ spy }) => {
    React.useEffect(spy);
    return <div />;
  };

  const Sibling: React.FC<{ spy: SpyFn }> = ({ spy }) => (
    <Tooltip>
      <Child spy={spy} />
    </Tooltip>
  );

  it('should not generate new context config when render', () => {
    const MemoedSibling = React.memo(Sibling);
    const spy = jest.fn();
    const App: React.FC = () => {
      const [pageHeader, setPageHeader] = useState({ ghost: true });
      const [, forceRender] = React.useReducer(v => v + 1, 1);

      return (
        <ConfigProvider pageHeader={pageHeader}>
          <button type="button" className="render" onClick={forceRender}>
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

    const { container } = render(<App />);

    fireEvent.click(container.querySelector('.render')!);
    expect(spy.mock.calls.length).toEqual(1);

    fireEvent.click(container.querySelector('.setState')!);
    expect(spy.mock.calls.length).toEqual(2);
  });

  it('should not generate new context config in nested ConfigProvider when render', () => {
    const MemoedSibling = React.memo(Sibling);
    const spy = jest.fn();
    const App: React.FC = () => {
      const [pageHeader, setPageHeader] = useState({ ghost: true });
      const [, forceRender] = React.useReducer(v => v + 1, 1);

      return (
        <ConfigProvider pageHeader={pageHeader}>
          <ConfigProvider>
            <button type="button" className="render" onClick={forceRender}>
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

    const { container } = render(<App />);

    fireEvent.click(container.querySelector('.render')!);
    expect(spy.mock.calls.length).toEqual(1);

    fireEvent.click(container.querySelector('.setState')!);
    expect(spy.mock.calls.length).toEqual(2);
  });
});
