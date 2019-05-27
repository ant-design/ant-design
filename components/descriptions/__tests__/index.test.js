import React from 'react';
import MockDate from 'mockdate';
import { mount } from 'enzyme';
import Descriptions from '..';

const DescriptionsItem = Descriptions.Item;

jest.mock('enquire.js', () => {
  let that;
  let unmatchFun;
  return {
    unregister: jest.fn(),
    register: (media, options) => {
      if (media === '(max-width: 575px)') {
        that = this;
        options.match.call(that);
        unmatchFun = options.unmatch;
      }
    },
    callunmatch() {
      unmatchFun.call(that);
    },
  };
});

describe('Descriptions', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterEach(() => {
    MockDate.reset();
    errorSpy.mockReset();
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });

  it('when max-width: 575px，column=1', () => {
    // eslint-disable-next-line global-require
    const enquire = require('enquire.js');
    const wrapper = mount(
      <Descriptions>
        <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
        <DescriptionsItem label="Billing">Prepaid</DescriptionsItem>
        <DescriptionsItem label="time">18:00:00</DescriptionsItem>
        <DescriptionsItem label="Amount">$80.00</DescriptionsItem>
      </Descriptions>,
    );
    expect(wrapper.find('tr')).toHaveLength(4);

    enquire.callunmatch();
    wrapper.unmount();
  });

  it('when max-width: 575px，column=2', () => {
    // eslint-disable-next-line global-require
    const enquire = require('enquire.js');
    const wrapper = mount(
      <Descriptions column={{ xs: 2 }}>
        <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
        <DescriptionsItem label="Billing">Prepaid</DescriptionsItem>
        <DescriptionsItem label="time">18:00:00</DescriptionsItem>
        <DescriptionsItem label="Amount">$80.00</DescriptionsItem>
      </Descriptions>,
    );
    expect(wrapper.find('tr')).toHaveLength(2);

    enquire.callunmatch();
    wrapper.unmount();
  });

  it('column is number', () => {
    // eslint-disable-next-line global-require
    const wrapper = mount(
      <Descriptions column="3">
        <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
        <DescriptionsItem label="Billing">Prepaid</DescriptionsItem>
        <DescriptionsItem label="time">18:00:00</DescriptionsItem>
        <DescriptionsItem label="Amount">$80.00</DescriptionsItem>
      </Descriptions>,
    );
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  it('when typeof column is object', () => {
    const wrapper = mount(
      <Descriptions column={{ xs: 8, sm: 16, md: 24 }}>
        <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
        <DescriptionsItem label="Billing">Prepaid</DescriptionsItem>
        <DescriptionsItem label="time">18:00:00</DescriptionsItem>
        <DescriptionsItem label="Amount">$80.00</DescriptionsItem>
      </Descriptions>,
    );
    expect(wrapper.instance().getColumn()).toBe(8);
    wrapper.unmount();
  });

  it('warning if ecceed the row span', () => {
    mount(
      <Descriptions column={3}>
        <DescriptionsItem label="Product" span={2}>
          Cloud Database
        </DescriptionsItem>
        <DescriptionsItem label="Billing" span={2}>
          Prepaid
        </DescriptionsItem>
      </Descriptions>,
    );
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Descriptions] Sum of column `span` in a line exceeds `column` of Descriptions.',
    );
  });
});
