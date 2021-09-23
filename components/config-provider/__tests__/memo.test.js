import React, { useState } from 'react';
import { mount } from 'enzyme';
import ConfigProvider from '..';
import Tooltip from '../../tooltip';

// https://github.com/ant-design/ant-design/issues/27617
describe('ConfigProvider', () => {
  const Child = ({ spy }) => {
    React.useEffect(() => spy());
    return <div />;
  };

  const Sibling = ({ spy }) => (
    <Tooltip>
      <Child spy={spy} />
    </Tooltip>
  );

  it('should not generate new context config when render', () => {
    const MemoedSibling = React.memo(Sibling);
    const spy = jest.fn();
    const App = () => {
      const [pageHeader, setPageHeader] = useState({ ghost: true });
      const [, forceRender] = React.useReducer(v => v + 1, 1);

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

    const wrapper = mount(<App />);
    wrapper.find('.render').simulate('click');
    expect(spy.mock.calls.length).toEqual(1);

    wrapper.find('.setState').simulate('click');
    expect(spy.mock.calls.length).toEqual(2);
  });

  it('should not generate new context config in nested ConfigProvider when render', () => {
    const MemoedSibling = React.memo(Sibling);
    const spy = jest.fn();
    const App = () => {
      const [pageHeader, setPageHeader] = useState({ ghost: true });
      const [, forceRender] = React.useReducer(v => v + 1, 1);

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

    const wrapper = mount(<App />);
    wrapper.find('.render').simulate('click');
    expect(spy.mock.calls.length).toEqual(1);

    wrapper.find('.setState').simulate('click');
    expect(spy.mock.calls.length).toEqual(2);
  });
});
