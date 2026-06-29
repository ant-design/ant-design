import React from 'react';

import Badge from '..';
import { render } from '../../../tests/utils';

describe('Badge.Semantic', () => {
  it('should support classNames and styles', () => {
    const { container } = render(
      <Badge
        count={10}
        classNames={{
          root: 'test-root',
          indicator: 'test-indicator',
        }}
        styles={{
          root: { backgroundColor: 'yellow' },
          indicator: { backgroundColor: 'blue' },
        }}
      >
        test
      </Badge>,
    );

    const element = container.querySelector<HTMLSpanElement>('.ant-badge');

    // classNames
    expect(element).toHaveClass('test-root');
    expect(element?.querySelector<HTMLElement>('sup')).toHaveClass('test-indicator');

    // styles
    expect(element).toHaveStyle({ backgroundColor: 'rgb(255, 255, 0)' });
    expect(element?.querySelector<HTMLElement>('sup')).toHaveStyle({
      backgroundColor: 'rgb(0, 0, 255)',
    });
  });

  it('should support function-based semantic classNames and styles', () => {
    const { container } = render(
      <Badge
        count={5}
        size="small"
        classNames={({ props }) => ({
          root: `badge-${props.size}`,
          indicator: 'indicator-small',
        })}
        styles={({ props }) => ({
          root: { padding: props.size === 'small' ? '2px' : '4px' },
          indicator: { fontSize: '10px' },
        })}
      >
        test
      </Badge>,
    );

    const element = container.querySelector<HTMLSpanElement>('.ant-badge');

    // function-based classNames
    expect(element).toHaveClass('badge-small');
    expect(element?.querySelector<HTMLElement>('sup')).toHaveClass('indicator-small');

    // function-based styles
    expect(element).toHaveStyle({ padding: '2px' });
    expect(element?.querySelector<HTMLElement>('sup')).toHaveStyle({ fontSize: '10px' });
  });
});
