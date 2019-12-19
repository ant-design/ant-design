import React from 'react';
import { mount } from 'enzyme';
import Mention from '..';
import mountTest from '../../../tests/shared/mountTest';

const { toContentState } = Mention;

describe('Mention', () => {
  mountTest(Mention);

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
      />,
    );
    wrapper.instance().focus();
    jest.runAllTimers();
    expect(handleFocus).toHaveBeenCalled();
  });

  it('basic suggestion', () => {
    const handleSearch = jest.fn();
    const wrapper = mount(
      <Mention suggestions={['afc163', 'raohai']} onSearchChange={handleSearch} />,
    );
    wrapper.find('DraftEditorContents').simulate('focus');
    const ed = wrapper.find('.public-DraftEditor-content');
    ed.simulate('beforeInput', { data: '@a' });
    jest.runAllTimers();
    expect(handleSearch).toHaveBeenCalledWith('a', '@');
  });

  it('change suggestions', () => {
    const container = mount(<div id="container" />);
    const wrapper = mount(
      <Mention
        suggestions={['afc163', 'raohai']}
        getSuggestionContainer={() => container.getDOMNode()}
      />,
    );
    wrapper.find('DraftEditorContents').simulate('focus');
    const ed = wrapper.find('.public-DraftEditor-content');
    ed.simulate('beforeInput', { data: '@' });
    jest.runAllTimers();
    expect(container.getDOMNode().querySelectorAll('.ant-mention-dropdown-item').length).toBe(2);
    expect(container.getDOMNode().querySelectorAll('.ant-mention-dropdown-item')[0].innerHTML).toBe(
      'afc163',
    );
    wrapper.setProps({ suggestions: ['yesmeck', 'yiminghe', 'lucy'] });
    jest.runAllTimers();
    expect(container.getDOMNode().querySelectorAll('.ant-mention-dropdown-item').length).toBe(3);
    expect(container.getDOMNode().querySelectorAll('.ant-mention-dropdown-item')[0].innerHTML).toBe(
      'yesmeck',
    );
  });

  it('select item', () => {
    const onChange = jest.fn();
    const onSelect = jest.fn();
    const wrapper = mount(
      <Mention suggestions={['afc163', 'raohai']} onChange={onChange} onSelect={onSelect} />,
    );
    wrapper.find('DraftEditorContents').simulate('focus');
    const ed = wrapper.find('.public-DraftEditor-content');
    ed.simulate('beforeInput', { data: '@' });
    jest.runAllTimers();
    expect(onChange).toHaveBeenCalled();
    expect(onSelect).not.toHaveBeenCalled();
    // enzyme cannot find .ant-mention-dropdown-item in react 15
    // I don't know why
    if (process.env.REACT === '15') {
      return;
    }
    wrapper
      .find('.ant-mention-dropdown-item')
      .at(0)
      .simulate('mouseDown');
    wrapper
      .find('.ant-mention-dropdown-item')
      .at(0)
      .simulate('mouseUp');
    wrapper
      .find('.ant-mention-dropdown-item')
      .at(0)
      .simulate('click');
    jest.runAllTimers();
    expect(onSelect).toHaveBeenCalled();
    expect(wrapper.find('.public-DraftStyleDefault-block').text()).toBe('@afc163 ');
  });

  it('defaultSuggestion filter', () => {
    if (process.env.REACT === '15') {
      return;
    }

    const wrapper = mount(<Mention defaultSuggestions={['light', 'bamboo']} />);

    wrapper.find('DraftEditorContents').simulate('focus');
    const ed = wrapper.find('.public-DraftEditor-content');
    ed.simulate('beforeInput', { data: '@b' });
    jest.runAllTimers();

    const items = wrapper.find('div.ant-mention-dropdown-item');
    expect(items.length).toBe(1);
    expect(items.at(0).props().children).toBe('bamboo');
  });

  it('check filteredSuggestions', () => {
    if (process.env.REACT === '15') {
      return;
    }
    const wrapper = mount(
      <Mention defaultSuggestions={[<Mention.Nav key="light" value="light" />]} />,
    );
    wrapper.find('DraftEditorContents').simulate('focus');
    const ed = wrapper.find('.public-DraftEditor-content');
    ed.simulate('beforeInput', { data: '@l' });
    jest.runAllTimers();
    const items = wrapper.find('div.ant-mention-dropdown-item');
    expect(items.length).toBe(1);
    expect(items.at(0).props().value).toBe('light');
  });
});
