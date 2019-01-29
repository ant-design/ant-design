import React from 'react';
import { mount } from 'enzyme';
import Result from '..';
import Button from '../../button';

describe('Progress', () => {
  it('successPercent should decide the progress status when it exists', () => {
    const wrapper = mount(
      <Result
        status="success"
        title="Successfully Purchased Cloud Server ECS!"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
          <Button type="primary" key="console">
            Go Console
          </Button>,
          <Button key="buy">Buy Again</Button>,
        ]}
      />,
    );
    expect(wrapper.find('.anticon-check-circle')).toHaveLength(1);
  });
});
