import React from 'react';
import { mount } from 'enzyme';
// eslint-disable-next-line import/no-named-as-default
import Spin from '..';
import { sleep } from '../../../tests/utils';

describe('delay spinning', () => {
  it("should render with delay when it's mounted with spinning=true and delay", () => {
    const wrapper = mount(<Spin spinning delay={500} />);
    expect(wrapper.find('.ant-spin').at(0).hasClass('ant-spin-spinning')).toEqual(false);
  });

  it('should render when delay is init set', async () => {
    const wrapper = mount(<Spin spinning delay={100} />);

    expect(wrapper.find('.ant-spin').at(0).hasClass('ant-spin-spinning')).toEqual(false);

    // use await not jest.runAllTimers()
    // because of https://github.com/facebook/jest/issues/3465
    await sleep(500);
    wrapper.update();

    expect(wrapper.find('.ant-spin').at(0).hasClass('ant-spin-spinning')).toEqual(true);
  });
});
