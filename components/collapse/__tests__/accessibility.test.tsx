import React from 'react';
import { render } from '@testing-library/react';

import Collapse from '..';

describe('Collapse accessibility', () => {
  it('hides the default expand icon and exposes state on the header', () => {
    const items = [{ key: '1', label: 'Header' }];
    const { container, rerender } = render(<Collapse activeKey="1" items={items} />);
    const header = container.querySelector('.ant-collapse-header');
    const icon = container.querySelector('.ant-collapse-arrow');

    expect(header).toHaveAttribute('aria-expanded', 'true');
    expect(icon).toHaveAttribute('aria-hidden', 'true');

    rerender(<Collapse items={items} />);

    expect(header).toHaveAttribute('aria-expanded', 'false');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it('preserves the accessible name of a custom expand icon', () => {
    const { getByRole } = render(
      <Collapse
        expandIcon={() => <span role="img" aria-label="Custom status" />}
        items={[{ key: '1', label: 'Header' }]}
      />,
    );

    expect(getByRole('img', { name: 'Custom status' })).toBeInTheDocument();
  });
});
