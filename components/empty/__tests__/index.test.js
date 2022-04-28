import React from 'react';
import { mount } from 'enzyme';
import Empty from '..';
import ConfigProvider from '../../config-provider';
import { render } from '../../../tests/utils';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

describe('Empty', () => {
  mountTest(Empty);
  rtlTest(Empty);

  it('image size should change', () => {
    const { container } = render(<Empty imageStyle={{ height: 20 }} />);
    expect(container.querySelector('.ant-empty-image').style.height).toBe('20px');
  });

  it('description can be false', () => {
    const { container } = render(<Empty description={false} />);
    expect(container.querySelector('.ant-empty-description')).toBeFalsy();
  });

  it('should render in RTL direction', () => {
    const wrapper = mount(
      <ConfigProvider direction="rtl">
        <Empty />
      </ConfigProvider>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });
});
