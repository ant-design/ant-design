import { mount } from 'enzyme';
import React from 'react';
// eslint-disable-next-line import/no-named-as-default
import { render } from '@testing-library/react';
import debounce from 'lodash/debounce';
import Spin from '..';
import { sleep } from '../../../tests/utils';

jest.mock('lodash/debounce');
debounce.mockImplementation(jest.requireActual('lodash/debounce'));

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

  it('should cancel debounce function when unmount', async () => {
    const debouncedFn = jest.fn();
    const cancel = jest.fn();
    debouncedFn.cancel = cancel;
    debounce.mockReturnValueOnce(debouncedFn);
    const { unmount } = render(<Spin spinning delay={100} />);
    expect(cancel).not.toHaveBeenCalled();
    unmount();
    expect(cancel).toHaveBeenCalled();
  });
});
