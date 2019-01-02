import React from 'react';
import { mount } from 'enzyme';
import PageHeader from '..';

describe('PageHeader', () => {
  it('pageHeader should not contain back it back', async () => {
    const routes = [
      {
        path: 'index',
        breadcrumbName: 'First menu',
      },
      {
        path: 'first',
        breadcrumbName: 'Secondary menu',
      },
      {
        path: 'second',
        breadcrumbName: 'Third level menu',
      },
    ];
    const wrapper = mount(<PageHeader title="Page Title" breadcrumb={{ routes }} />);
    expect(wrapper.find('.ant-page-header-back-icon')).toHaveLength(0);
  });
  it('pageHeader should  no contain back it back', async () => {
    const wrapper = mount(<PageHeader title="Page Title" backIcon={false} />);
    expect(wrapper.find('.ant-page-header-back-icon')).not.toHaveLength(1);
  });

  it('pageHeader should contain back it back', async () => {
    const wrapper = mount(<PageHeader title="Page Title" />);
    expect(wrapper.find('.ant-page-header-back-icon')).toHaveLength(1);
  });

  it('pageHeader onBack transfer', async () => {
    const callback = jest.fn(() => true);
    const wrapper = mount(<PageHeader title="Page Title" onBack={callback} />);
    wrapper.find('.ant-page-header-back-icon').simulate('click');
    expect(callback).toBeCalled();
  });

  it('pageHeader onBack transfer', async () => {
    const callback = jest.fn(() => true);
    window.history.back = callback;
    const wrapper = mount(<PageHeader title="Page Title" />);
    wrapper.find('.ant-page-header-back-icon').simulate('click');
    expect(callback).toBeCalled();
  });
});
