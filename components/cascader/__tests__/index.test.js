import React from 'react';
import { render, mount } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import Cascader from '..';

const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

describe('Cascader', () => {
  it('popup correctly when panel is hidden', () => {
    const wrapper = mount(
      <Cascader options={options} />
    );
    expect(renderToJson(render(wrapper.find('Trigger').node.getComponent()))).toMatchSnapshot();
  });

  it('popup correctly when panel is open', () => {
    const wrapper = mount(
      <Cascader options={options} />
    );
    wrapper.find('input').simulate('click');
    expect(renderToJson(render(wrapper.find('Trigger').node.getComponent()))).toMatchSnapshot();
  });

  it('popup correctly with defaultValue', () => {
    const wrapper = mount(
      <Cascader options={options} defaultValue={['zhejiang', 'hangzhou']} />
    );
    wrapper.find('input').simulate('click');
    expect(renderToJson(render(wrapper.find('Trigger').node.getComponent()))).toMatchSnapshot();
  });


  it('can be selected', () => {
    const wrapper = mount(<Cascader options={options} />);
    wrapper.find('input').simulate('click');
    let popupWrapper = mount(wrapper.find('Trigger').node.getComponent());
    popupWrapper.find('.ant-cascader-menu').at(0).find('.ant-cascader-menu-item').at(0)
      .simulate('click');
    expect(renderToJson(render(wrapper.find('Trigger').node.getComponent()))).toMatchSnapshot();
    popupWrapper = mount(wrapper.find('Trigger').node.getComponent());
    popupWrapper.find('.ant-cascader-menu').at(1).find('.ant-cascader-menu-item').at(0)
      .simulate('click');
    expect(renderToJson(render(wrapper.find('Trigger').node.getComponent()))).toMatchSnapshot();
    popupWrapper = mount(wrapper.find('Trigger').node.getComponent());
    popupWrapper.find('.ant-cascader-menu').at(2).find('.ant-cascader-menu-item').at(0)
      .simulate('click');
    expect(renderToJson(render(wrapper.find('Trigger').node.getComponent()))).toMatchSnapshot();
  });
});
