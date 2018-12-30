import React from 'react';
import { mount } from 'enzyme';
import PageHeader from '..';

describe('PageHeader', () => {
  it('pageHeader should not contain back it back', async () => {
    const routes = [
      {
        path: 'index',
        breadcrumbName: '一级菜单',
      },
      {
        path: 'first',
        breadcrumbName: '二级菜单',
      },
      {
        path: 'second',
        breadcrumbName: '三级菜单',
      },
    ];
    const wrapper = mount(<PageHeader title="页面标题" breadcrumb={{ routes }} />);
    expect(wrapper.find('.ant-page-header-back-icon')).toHaveLength(0);
  });
  it('pageHeader should  no contain back it back', async () => {
    const wrapper = mount(<PageHeader title="页面标题" backIcon={false} />);
    expect(wrapper.find('.ant-page-header-back-icon')).not.toHaveLength(1);
  });

  it('pageHeader should contain back it back', async () => {
    const wrapper = mount(<PageHeader title="页面标题" />);
    expect(wrapper.find('.ant-page-header-back-icon')).toHaveLength(1);
  });

  it('pageHeader onBack transfer', async () => {
    const callback = jest.fn(() => true);
    const wrapper = mount(<PageHeader title="页面标题" onBack={callback} />);
    wrapper.find('.ant-page-header-back-icon').simulate('click');
    expect(callback).toBeCalled();
  });

  it('pageHeader onBack transfer', async () => {
    const callback = jest.fn(() => true);
    window.history.back = callback;
    const wrapper = mount(<PageHeader title="页面标题" />);
    wrapper.find('.ant-page-header-back-icon').simulate('click');
    expect(callback).toBeCalled();
  });
});
