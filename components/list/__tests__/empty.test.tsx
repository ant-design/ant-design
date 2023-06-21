import React from 'react';
import List from '..';
import { render } from '../../../tests/utils';

describe('List', () => {
  it('renders empty list', () => {
    const { container } = render(<List dataSource={[]} renderItem={() => <List.Item />} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
