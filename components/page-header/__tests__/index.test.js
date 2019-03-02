import React from 'react';
import { mount } from 'enzyme';
import PageHeader from '..';

describe('PageHeader', () => {
  it('pageHeader should not contain back it back', () => {
    const routes = [
      {
        path: 'index',
        breadcrumbName: 'First-level Menu',
      },
      {
        path: 'first',
        breadcrumbName: 'Second-level Menu',
      },
      {
        path: 'second',
        breadcrumbName: 'Third-level Menu',
      },
    ];
    const wrapper = mount(<PageHeader title="Page Title" breadcrumb={{ routes }} />);
    expect(wrapper.find('.ant-page-header-back-icon')).toHaveLength(0);
  });
  it('pageHeader should  no contain back it back', () => {
    const wrapper = mount(<PageHeader title="Page Title" backIcon={false} />);
    expect(wrapper.find('.ant-page-header-back-icon')).toHaveLength(0);
  });

  it('pageHeader should contain back it back', () => {
    const callback = jest.fn(() => true);
    const wrapper = mount(<PageHeader title="Page Title" onBack={callback} />);
    expect(wrapper.find('.ant-page-header-back-icon')).toHaveLength(1);
  });

  it('pageHeader onBack transfer', () => {
    const callback = jest.fn(() => true);
    const wrapper = mount(<PageHeader title="Page Title" onBack={callback} />);
    wrapper.find('.ant-page-header-back-icon').simulate('click');
    expect(callback).toBeCalled();
  });
});
