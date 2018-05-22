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
    const wrapper = mount(
      <Mention suggestions={['afc163', 'raohai']} />
    );
    wrapper.find('DraftEditorContents').simulate('focus');
    const ed = wrapper.find('.public-DraftEditor-content');
    ed.simulate('beforeInput', { data: '@' });
    jest.runAllTimers();
    expect(wrapper.find('Nav').length).toBe(2);
    expect(wrapper.find('Nav').first().text()).toBe('afc163');
    wrapper.setState({ suggestions: ['yesmeck', 'yiminghe', 'lucy'] });
    jest.runAllTimers();
    expect(wrapper.find('Nav').length).toBe(3);
    expect(wrapper.find('Nav').first().text()).toBe('yesmeck');
  });
});
