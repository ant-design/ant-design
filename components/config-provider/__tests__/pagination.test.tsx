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
});
