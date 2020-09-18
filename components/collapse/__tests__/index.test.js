import React from 'react';
import { mount } from 'enzyme';
import { sleep } from '../../../tests/utils';

describe('Collapse', () => {
  // eslint-disable-next-line global-require
  const Collapse = require('..').default;

  it('should support remove expandIcon', () => {
    const wrapper = mount(
      <Collapse expandIcon={() => null}>
        <Collapse.Panel header="header" />
      </Collapse>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should keep the className of the expandIcon', () => {
    const wrapper = mount(
      <Collapse
        expandIcon={() => (
          <button type="button" className="custom-expandicon-classname">
            action
          </button>
        )}
      >
        <Collapse.Panel header="header" />
      </Collapse>,
    );

    expect(wrapper.find('.custom-expandicon-classname').exists()).toBe(true);
  });

  it('should render extra node of panel', () => {
    const wrapper = mount(
      <Collapse>
        <Collapse.Panel header="header" extra={<button type="button">action</button>} />
        <Collapse.Panel header="header" extra={<button type="button">action</button>} />
      </Collapse>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('could be expand and collapse', async () => {
    const wrapper = mount(
      <Collapse>
        <Collapse.Panel header="This is panel header 1" key="1">
          content
        </Collapse.Panel>
      </Collapse>,
    );
    expect(wrapper.find('.ant-collapse-item').hasClass('ant-collapse-item-active')).toBe(false);
    wrapper.find('.ant-collapse-header').at(0).simulate('click');
    wrapper.update();
    await sleep(400);
    wrapper.update();
    expect(wrapper.find('.ant-collapse-item').hasClass('ant-collapse-item-active')).toBe(true);
  });

  it('could override default openAnimation', () => {
    const wrapper = mount(
      <Collapse openAnimation={{}}>
        <Collapse.Panel header="This is panel header 1" key="1">
          content
        </Collapse.Panel>
      </Collapse>,
    );
    wrapper.find('.ant-collapse-header').at(0).simulate('click');
    expect(wrapper.render()).toMatchSnapshot();
  });
});
