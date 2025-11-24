import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import Transfer from '..';
import Button from '../../button';

const listCommonProps: {
  dataSource: { key: string; title: string; disabled?: boolean }[];
  selectedKeys?: string[];
  targetKeys?: string[];
} = {
  dataSource: [
    { key: 'a', title: 'a' },
    { key: 'b', title: 'b' },
    { key: 'c', title: 'c', disabled: true },
  ],
  selectedKeys: ['a'],
  targetKeys: ['b'],
};

describe('Actions', () => {
  it('should handle custom button click correctly via actions', () => {
    const handleChange = jest.fn();
    const customButtonClick = jest.fn();

    const CustomButton = ({ onClick }: { onClick: () => void }) => (
      <Button type="link" onClick={onClick}>
        Custom Button
      </Button>
    );

    const { getByText } = render(
      <Transfer
        {...listCommonProps}
        onChange={handleChange}
        oneWay
        actions={[<CustomButton key="test" onClick={customButtonClick} />]}
      />,
    );

    fireEvent.click(getByText('Custom Button'));
    expect(customButtonClick).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalled();
  });

  it('should accept multiple actions >= 3', () => {
    const { getByText } = render(
      <Transfer
        {...listCommonProps}
        actions={[
          <Button key="test">test</Button>,
          <Button key="test2">test2</Button>,
          <Button key="test3">test3</Button>,
        ]}
      />,
    );

    expect(getByText('test')).toBeInTheDocument();
    expect(getByText('test2')).toBeInTheDocument();
    expect(getByText('test3')).toBeInTheDocument();
  });

  it('should accept multiple actions >= 2 when it is oneWay', () => {
    const { getByText } = render(
      <Transfer
        {...listCommonProps}
        oneWay
        actions={[<Button key="test">test</Button>, <Button key="test2">test2</Button>]}
      />,
    );

    expect(getByText('test')).toBeInTheDocument();
    expect(getByText('test2')).toBeInTheDocument();
  });

  it('should accept operations for compatibility', () => {
    const { getByText } = render(
      <Transfer {...listCommonProps} operations={['to right', 'to left']} />,
    );
    expect(getByText('to right')).toBeInTheDocument();
    expect(getByText('to left')).toBeInTheDocument();
  });
});
