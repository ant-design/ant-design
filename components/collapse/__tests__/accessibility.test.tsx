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
    expect(container.firstChild).toMatchSnapshot();

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

  it.each(['header', 'icon'] as const)(
    'keeps a state name when the default icon is interactive for collapsible="%s"',
    (collapsible) => {
      const items = [{ key: '1', label: 'Header' }];
      const { container, rerender } = render(
        <Collapse activeKey="1" collapsible={collapsible} items={items} />,
      );
      const iconControl = container.querySelector('.ant-collapse-expand-icon');
      const icon = container.querySelector('.ant-collapse-arrow');

      expect(iconControl).toHaveAccessibleName('expanded');
      expect(icon).toHaveAttribute('aria-label', 'expanded');
      expect(icon).not.toHaveAttribute('aria-hidden');

      rerender(<Collapse collapsible={collapsible} items={items} />);

      expect(iconControl).toHaveAccessibleName('collapsed');
      expect(icon).toHaveAttribute('aria-label', 'collapsed');
      expect(icon).not.toHaveAttribute('aria-hidden');
    },
  );
});
