import React from 'react';
import { mount, render } from 'enzyme';
import PageHeader from '..';
import mountTest from '../../../tests/shared/mountTest';

describe('PageHeader', () => {
  mountTest(PageHeader);

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
    expect(wrapper.find('.ant-page-header-back')).toHaveLength(0);
  });

  it('pageHeader should have breadcrumb', () => {
    const routes = [
      {
        path: 'index',
        breadcrumbName: 'First-level Menu',
      },
    ];
    const wrapper = mount(<PageHeader title="Page Title" breadcrumb={{ routes }} />);
    expect(wrapper.find('.ant-breadcrumb')).toHaveLength(1);
    expect(wrapper.find('.ant-page-header-back')).toHaveLength(0);
  });

  it('pageHeader should no contain back', () => {
    const wrapper = mount(<PageHeader title="Page Title" backIcon={false} />);
    expect(wrapper.find('.ant-page-header-back')).toHaveLength(0);
  });

  it('pageHeader should contain back it back', () => {
    const callback = jest.fn(() => true);
    const wrapper = mount(<PageHeader title="Page Title" onBack={callback} />);
    expect(wrapper.find('.ant-page-header-back')).toHaveLength(1);
  });

  it('pageHeader onBack transfer', () => {
    const callback = jest.fn(() => true);
    const wrapper = mount(<PageHeader title="Page Title" onBack={callback} />);
    wrapper.find('div.ant-page-header-back-button').simulate('click');
    expect(callback).toHaveBeenCalled();
  });

  it('pageHeader should support className', () => {
    const wrapper = render(
      <PageHeader title="Page Title" className="not-works" backIcon={false} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('pageHeader should not render blank dom', () => {
    const wrapper = render(<PageHeader title={false} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('breadcrumbs and back icon can coexist', () => {
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
    const wrapper = mount(<PageHeader title="Title" breadcrumb={{ routes }} />);
    expect(wrapper.find('.ant-breadcrumb')).toHaveLength(1);

    wrapper.setProps({ onBack: () => {} });
    expect(wrapper.find('.ant-breadcrumb')).toHaveLength(1);
  });
});
