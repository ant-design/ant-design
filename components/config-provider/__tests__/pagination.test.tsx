import React from 'react';

import ConfigProvider from '..';
import { render } from '../../../tests/utils';
import Pagination from '../../pagination';

describe('ConfigProvider.Pagination', () => {
  it('showSizeChanger', () => {
    // Default have
    const sharedNode = <Pagination total={1000} />;
    const { container: rawContainer } = render(sharedNode);
    expect(rawContainer.querySelector('.ant-pagination-options-size-changer')).toBeTruthy();

    const { container } = render(
      <ConfigProvider pagination={{ showSizeChanger: false }}>{sharedNode}</ConfigProvider>,
    );
    expect(container.querySelector('.ant-pagination-options-size-changer')).toBeFalsy();
  });

  it('totalBoundaryShowSizeChanger', () => {
    const { container } = render(
      <ConfigProvider pagination={{ totalBoundaryShowSizeChanger: 100 }}>
        <Pagination total={80} />
      </ConfigProvider>,
    );
    // total={80} < 100, so size changer should not be visible
    expect(container.querySelector('.ant-pagination-options-size-changer')).toBeFalsy();
  });

  it('variant and shape', () => {
    const { container } = render(
      <ConfigProvider pagination={{ variant: 'filled', shape: 'round' }}>
        <Pagination total={50} />
      </ConfigProvider>,
    );
    expect(container.querySelector('.ant-pagination')).toHaveClass('ant-pagination-variant-filled');
    expect(container.querySelector('.ant-pagination')).toHaveClass('ant-pagination-round');
  });
});
