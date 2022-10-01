/* eslint-disable no-console */
import React from 'react';
import Space from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render } from '../../../tests/utils';
import Input from '../../input';
import Button from '../../button';

describe('Space.Compact', () => {
  mountTest(Space.Compact);
  rtlTest(Space.Compact);

  it('should render width empty children', () => {
    const { container } = render(<Space.Compact />);

    expect(container.children.length).toBe(0);
  });

  it('block className', () => {
    const { container } = render(
      <Space.Compact block>
        <Input defaultValue="https://ant.design" />
        <Button type="primary">Submit</Button>
      </Space.Compact>,
    );
    expect(
      container.querySelector('.ant-space-compact')?.classList.contains('ant-space-compact-block'),
    ).toBe(true);
  });

  it('compact-item className', () => {
    const { container } = render(
      <Space.Compact block>
        <Input defaultValue="https://ant.design" />
        <Button type="primary">Submit</Button>
      </Space.Compact>,
    );
    expect(container.querySelector('input')?.classList.contains('ant-input-compact-item')).toBe(
      true,
    );
    expect(
      container.querySelector('input')?.classList.contains('ant-input-compact-first-item'),
    ).toBe(true);
    expect(
      container
        .querySelector('.ant-btn-compact-item')
        ?.classList.contains('ant-btn-compact-last-item'),
    ).toBe(true);
  });
});
