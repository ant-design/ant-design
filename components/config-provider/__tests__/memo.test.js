import React from 'react';
import { mount } from 'enzyme';
import zhCN from '../../locale/zh_CN';
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

  it('should not generate new value for same config', () => {
    const MemoedSibling = React.memo(Sibling);
    const App = () => {
      const [count, setCount] = React.useState(0);
      return (
        <ConfigProvider locale={zhCN}>
          <button type="button" onClick={() => setCount(1)}>
            {count}
          </button>
          <MemoedSibling />
        </ConfigProvider>
      );
    };

    const wrapper = mount(<App />);
    wrapper.find('button').simulate('click');
    expect(wrapper.find('#counter').text()).toEqual('1');
  });

  it('should rerender when context value change(immutable or mutable)', () => {
    const MemoedSibling = React.memo(Sibling);
    const App = () => {
      const [direction, setDirection] = React.useState('ltr');
      const [, forceRender] = React.useReducer(v => v + 1, 1);
      const pageHeader = React.useRef({ ghost: false });
      return (
        <ConfigProvider direction={direction} pageHeader={pageHeader.current}>
          <button type="button" onClick={() => setDirection('rtl')} className="immutable">
            Change Direction
          </button>
          <button
            type="button"
            onClick={() => {
              pageHeader.current.ghost = true;
              forceRender();
            }}
            className="mutable"
          >
            Change Direction
          </button>
          <MemoedSibling />
        </ConfigProvider>
      );
    };

    const wrapper = mount(<App />);
    wrapper.find('.immutable').simulate('click');
    expect(wrapper.find('#counter').text()).toEqual('2');

    wrapper.find('.mutable').simulate('click');
    expect(wrapper.find('#counter').text()).toEqual('3');
  });
});
