import React, { useState } from 'react';
import { mount } from 'enzyme';
import ConfigProvider from '..';
import { ConfigConsumer } from '../context';

// https://github.com/ant-design/ant-design/issues/27617
describe('ConfigProvider', () => {
  const RenderCounter = ({ config }) => {
    const [count, setCount] = React.useState(0);
    React.useEffect(() => setCount(c => c + 1), [config]);
    return <div id="counter">{count}</div>;
  };

  const Sibling = () => (
    <ConfigConsumer>{config => <RenderCounter config={config} />}</ConfigConsumer>
  );

  it('should not generate new context config when render', () => {
    const MemoedSibling = React.memo(Sibling);
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
          <MemoedSibling />
        </ConfigProvider>
      );
    };

    const wrapper = mount(<App />);
    wrapper.find('.render').simulate('click');
    expect(wrapper.find('#counter').text()).toEqual('1');

    wrapper.find('.setState').simulate('click');
    expect(wrapper.find('#counter').text()).toEqual('2');
  });

  it('should not generate new context config in nested ConfigProvider when render', () => {
    const MemoedSibling = React.memo(Sibling);
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
            <MemoedSibling />
          </ConfigProvider>
        </ConfigProvider>
      );
    };

    const wrapper = mount(<App />);
    wrapper.find('.render').simulate('click');
    expect(wrapper.find('#counter').text()).toEqual('1');

    wrapper.find('.setState').simulate('click');
    expect(wrapper.find('#counter').text()).toEqual('2');
  });
});
