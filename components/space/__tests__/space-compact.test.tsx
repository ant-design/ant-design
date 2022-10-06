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
  mountTest(() => (
    <Space.Compact>
      <Button type="primary">Submit</Button>
    </Space.Compact>
  ));

  rtlTest(Space.Compact);
  rtlTest(() => (
    <Space.Compact>
      <Button type="primary">Submit</Button>
    </Space.Compact>
  ));

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
        <Input.Search />
        <Button type="primary">Submit</Button>
      </Space.Compact>,
    );
    expect(
      container.querySelector('.ant-input')?.classList.contains('ant-input-compact-item'),
    ).toBe(true);
    expect(
      container.querySelector('.ant-input-search')?.classList.contains('ant-input-compact-item'),
    ).toBe(true);
    expect(
      container.querySelector('.ant-input')?.classList.contains('ant-input-compact-first-item'),
    ).toBe(true);
    expect(
      container
        .querySelector('.ant-btn-compact-item')
        ?.classList.contains('ant-btn-compact-last-item'),
    ).toBe(true);
  });

  it('size', () => {
    const { container } = render(
      <Space.Compact block size="small">
        <Input defaultValue="https://ant.design" />
        <Button type="primary">Submit</Button>
      </Space.Compact>,
    );
    expect(container.querySelector('.ant-input')?.classList.contains('ant-input-sm')).toBe(true);
    expect(container.querySelector('.ant-btn')?.classList.contains('ant-btn-sm')).toBe(true);
  });

  it('direction=vertical', () => {
    const { container } = render(
      <Space.Compact size="small" direction="vertical">
        <Button type="primary">Button 1</Button>
        <Button type="primary">Button 2</Button>
        <Button type="primary">Button 3</Button>
        <Button type="primary">Button 4</Button>
      </Space.Compact>,
    );
    expect(
      container
        .querySelector('.ant-space-compact')
        ?.classList.contains('ant-space-compact-vertical'),
    ).toBe(true);
    expect(
      container.querySelector('.ant-btn')?.classList.contains('ant-btn-compact-vertical-item'),
    ).toBe(true);

    expect(
      container
        .querySelectorAll('.ant-btn')[0]
        ?.classList.contains('ant-btn-compact-vertical-first-item'),
    ).toBe(true);

    expect(
      container
        .querySelectorAll('.ant-btn')[3]
        ?.classList.contains('ant-btn-compact-vertical-last-item'),
    ).toBe(true);
  });
});
