import React from 'react';
import { render } from '../../../tests/utils';
import List from '..';

describe('List', () => {
  it('renders empty list', () => {
    const { container } = render(<List dataSource={[]} renderItem={() => <List.Item />} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
