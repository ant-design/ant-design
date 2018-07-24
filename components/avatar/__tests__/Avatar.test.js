import React from 'react';
import { mount } from 'enzyme';
import Avatar from '..';

describe('Avatar Render', () => {
  it('Render long string correctly', () => {
    const wrapper = mount(<Avatar>TestString</Avatar>);
    const children = wrapper.find('.ant-avatar-string');
    expect(children.length).toBe(1);
  });

  it('should render fallback string correctly', () => {
    const div = global.document.createElement('div');
    global.document.body.appendChild(div);

    const wrapper = mount(<Avatar src="http://error.url">Fallback</Avatar>, { attachTo: div });
    wrapper.instance().setScale = jest.fn(() => wrapper.instance().setState({ scale: 0.5 }));
    wrapper.setState({ isImgExist: false });

    const children = wrapper.find('.ant-avatar-string');
    expect(children.length).toBe(1);
    expect(children.text()).toBe('Fallback');
    expect(wrapper.instance().setScale).toBeCalled();
    expect(div.querySelector('.ant-avatar-string').style.transform).toBe('scale(0.5)');

    wrapper.detach();
    global.document.body.removeChild(div);
  });
});
