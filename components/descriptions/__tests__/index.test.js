import React from 'react';
import MockDate from 'mockdate';
import { mount } from 'enzyme';
import Descriptions from '..';
import mountTest from '../../../tests/shared/mountTest';
import { resetWarned } from '../../_util/devWarning';

describe('Descriptions', () => {
  mountTest(Descriptions);

  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterEach(() => {
    MockDate.reset();
    errorSpy.mockReset();
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });

  it('when max-width: 575px，column=1', () => {
    const wrapper = mount(
      <Descriptions>
        <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="Billing">Prepaid</Descriptions.Item>
        <Descriptions.Item label="time">18:00:00</Descriptions.Item>
        <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
        <Descriptions.Item>No-Label</Descriptions.Item>
      </Descriptions>,
    );
    expect(wrapper.find('tr')).toHaveLength(5);
    expect(wrapper.find('.ant-descriptions-item-label')).toHaveLength(4);
    wrapper.unmount();
  });

  it('when max-width: 575px，column=2', () => {
    // eslint-disable-next-line global-require
    const wrapper = mount(
      <Descriptions column={{ xs: 2 }}>
        <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="Billing">Prepaid</Descriptions.Item>
        <Descriptions.Item label="time">18:00:00</Descriptions.Item>
        <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
      </Descriptions>,
    );
    expect(wrapper.find('tr')).toHaveLength(2);
    wrapper.unmount();
  });

  it('column is number', () => {
    // eslint-disable-next-line global-require
    const wrapper = mount(
      <Descriptions column="3">
        <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="Billing">Prepaid</Descriptions.Item>
        <Descriptions.Item label="time">18:00:00</Descriptions.Item>
        <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
      </Descriptions>,
    );
    expect(wrapper.render()).toMatchSnapshot();
    wrapper.unmount();
  });

  it('when typeof column is object', () => {
    const wrapper = mount(
      <Descriptions column={{ xs: 1, sm: 2, md: 4 }}>
        <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="Billing">Prepaid</Descriptions.Item>
        <Descriptions.Item label="time">18:00:00</Descriptions.Item>
        <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
      </Descriptions>,
    );
    expect(wrapper.find('td').reduce((total, td) => total + td.props().colSpan, 0)).toBe(4);
    wrapper.unmount();
  });

  it('warning if ecceed the row span', () => {
    resetWarned();

    mount(
      <Descriptions column={3}>
        <Descriptions.Item label="Product" span={2}>
          Cloud Database
        </Descriptions.Item>
        <Descriptions.Item label="Billing" span={2}>
          Prepaid
        </Descriptions.Item>
      </Descriptions>,
    );
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Descriptions] Sum of column `span` in a line not match `column` of Descriptions.',
    );
  });

  it('when item is rendered conditionally', () => {
    const hasDiscount = false;
    const wrapper = mount(
      <Descriptions>
        <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="Billing">Prepaid</Descriptions.Item>
        <Descriptions.Item label="time">18:00:00</Descriptions.Item>
        <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
        {hasDiscount && <Descriptions.Item label="Discount">$20.00</Descriptions.Item>}
      </Descriptions>,
    );
    expect(wrapper.render()).toMatchSnapshot();
    wrapper.unmount();
  });

  it('vertical layout', () => {
    // eslint-disable-next-line global-require
    const wrapper = mount(
      <Descriptions layout="vertical">
        <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="Billing">Prepaid</Descriptions.Item>
        <Descriptions.Item label="time">18:00:00</Descriptions.Item>
        <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
      </Descriptions>,
    );
    expect(wrapper.render()).toMatchSnapshot();
    wrapper.unmount();
  });

  it('Descriptions.Item support className', () => {
    const wrapper = mount(
      <Descriptions>
        <Descriptions.Item label="Product" className="my-class">
          Cloud Database
        </Descriptions.Item>
      </Descriptions>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('Descriptions support colon', () => {
    const wrapper = mount(
      <Descriptions colon={false}>
        <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
      </Descriptions>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('Descriptions support style', () => {
    const wrapper = mount(
      <Descriptions style={{ backgroundColor: '#e8e8e8' }}>
        <Descriptions.Item>Cloud Database</Descriptions.Item>
      </Descriptions>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('keep key', () => {
    const wrapper = mount(
      <Descriptions>
        <Descriptions.Item key="bamboo" />
      </Descriptions>,
    );

    expect(wrapper.find('Cell').key()).toBe('item-bamboo');
  });

  // https://github.com/ant-design/ant-design/issues/19887
  it('should work with React Fragment', () => {
    if (!React.Fragment) {
      return;
    }
    const wrapper = mount(
      <Descriptions>
        <Descriptions.Item label="bamboo">bamboo</Descriptions.Item>
        <>
          <Descriptions.Item label="bamboo">bamboo</Descriptions.Item>
          <Descriptions.Item label="bamboo">bamboo</Descriptions.Item>
        </>
      </Descriptions>,
    );

    expect(wrapper.render()).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/20255
  it('columns 5 with customize', () => {
    const wrapper = mount(
      <Descriptions layout="vertical" column={4}>
        {/* 1 1 1 1 */}
        <Descriptions.Item label="bamboo">bamboo</Descriptions.Item>
        <Descriptions.Item label="bamboo">bamboo</Descriptions.Item>
        <Descriptions.Item label="bamboo">bamboo</Descriptions.Item>
        <Descriptions.Item label="bamboo">bamboo</Descriptions.Item>
        {/* 2 2 */}
        <Descriptions.Item label="bamboo" span={2}>
          bamboo
        </Descriptions.Item>
        <Descriptions.Item label="bamboo" span={2}>
          bamboo
        </Descriptions.Item>
        {/* 3 1 */}
        <Descriptions.Item label="bamboo" span={3}>
          bamboo
        </Descriptions.Item>
        <Descriptions.Item label="bamboo">bamboo</Descriptions.Item>
      </Descriptions>,
    );

    function matchSpan(rowIndex, spans) {
      const tr = wrapper.find('tr').at(rowIndex);
      const tds = tr.find('th');
      expect(tds).toHaveLength(spans.length);
      tds.forEach((td, index) => {
        expect(td.props().colSpan).toEqual(spans[index]);
      });
    }

    matchSpan(0, [1, 1, 1, 1]);
    matchSpan(2, [2, 2]);
    matchSpan(4, [3, 1]);
  });

  it('number value should render correct', () => {
    const wrapper = mount(
      <Descriptions bordered>
        <Descriptions.Item label={0}>{0}</Descriptions.Item>
      </Descriptions>,
    );

    expect(wrapper.find('th').hasClass('ant-descriptions-item-label')).toBeTruthy();
    expect(wrapper.find('td').hasClass('ant-descriptions-item-content')).toBeTruthy();
  });

  it('Descriptions support extra', () => {
    const wrapper = mount(
      <Descriptions extra="Edit">
        <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
      </Descriptions>,
    );
    expect(wrapper.find('.ant-descriptions-extra').exists()).toBe(true);
    wrapper.setProps({ extra: undefined });
    expect(wrapper.find('.ant-descriptions-extra').exists()).toBe(false);
  });
});
