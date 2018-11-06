import React from 'react';
import { mount } from 'enzyme';
import Mention from '..';

const { toContentState } = Mention;

describe('Mention', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should has focus function', () => {
    const handleFocus = jest.fn();
    const wrapper = mount(
      <Mention
        defaultValue={toContentState('@afc163')}
        onFocus={handleFocus}
        suggestions={['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご']}
      />
    );
    wrapper.instance().focus();
    jest.runAllTimers();
    expect(handleFocus).toBeCalled();
  });

  it('basic suggestion', () => {
    const handleSearch = jest.fn();
    const wrapper = mount(
      <Mention
        suggestions={['afc163', 'raohai']}
        onSearchChange={handleSearch}
      />
    );
    wrapper.find('DraftEditorContents').simulate('focus');
    const ed = wrapper.find('.public-DraftEditor-content');
    ed.simulate('beforeInput', { data: '@a' });
    jest.runAllTimers();
    expect(handleSearch).toBeCalledWith('a', '@');
  });

  it('change suggestions', () => {
    const container = mount(<div id="container" />);
    const wrapper = mount(
      <Mention suggestions={['afc163', 'raohai']} getSuggestionContainer={() => container.getDOMNode()} />
    );
    wrapper.find('DraftEditorContents').simulate('focus');
    const ed = wrapper.find('.public-DraftEditor-content');
    ed.simulate('beforeInput', { data: '@' });
    jest.runAllTimers();
    expect(container.getDOMNode().querySelectorAll('.ant-mention-dropdown-item').length).toBe(2);
    expect(container.getDOMNode().querySelectorAll('.ant-mention-dropdown-item')[0].innerHTML).toBe('afc163');
    wrapper.setState({ suggestions: ['yesmeck', 'yiminghe', 'lucy'] });
    jest.runAllTimers();
    expect(container.getDOMNode().querySelectorAll('.ant-mention-dropdown-item').length).toBe(3);
    expect(container.getDOMNode().querySelectorAll('.ant-mention-dropdown-item')[0].innerHTML).toBe('yesmeck');
  });

  it('select item', () => {
    const onChange = jest.fn();
    const onSelect = jest.fn();
    const wrapper = mount(
      <Mention
        suggestions={['afc163', 'raohai']}
        onChange={onChange}
        onSelect={onSelect}
      />
    );
    wrapper.find('DraftEditorContents').simulate('focus');
    const ed = wrapper.find('.public-DraftEditor-content');
    ed.simulate('beforeInput', { data: '@' });
    jest.runAllTimers();
    expect(onChange).toBeCalled();
    expect(onSelect).not.toBeCalled();
    // enzyme cannot find .ant-mention-dropdown-item in react 15
    // I don't know why
    if (process.env.REACT === '15') {
      return;
    }
    wrapper.find('.ant-mention-dropdown-item').at(0).simulate('mouseUp');
    jest.runAllTimers();
    expect(onSelect).toBeCalled();
    expect(wrapper.find('.public-DraftStyleDefault-block').text()).toBe('@afc163 ');
  });
});
