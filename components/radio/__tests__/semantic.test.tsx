import React from 'react';

import Radio from '..';
import { render } from '../../../tests/utils';

describe('Radio.Semantic', () => {
  it('should merge semantic styles with context styles', () => {
    const customStyles = {
      root: { padding: '10px' },
    };
    const { container } = render(
      <Radio styles={customStyles} style={{ margin: '5px' }}>
        Test
      </Radio>,
    );

    const rootElement = container.querySelector('.ant-radio-wrapper') as HTMLElement;
    expect(rootElement.style.padding).toBe('10px');
    expect(rootElement.style.margin).toBe('5px');
  });

  it('should apply semantic styles to radio without label', () => {
    const customStyles = {
      root: { backgroundColor: 'blue' },
      icon: { backgroundColor: 'green' },
    };
    const { container } = render(<Radio styles={customStyles} />);

    const rootElement = container.querySelector('.ant-radio-wrapper') as HTMLElement;
    const iconElement = container.querySelector('.ant-radio') as HTMLElement;
    const labelElement = container.querySelector('.ant-radio-label');

    expect(rootElement.style.backgroundColor).toBe('blue');
    expect(iconElement.style.backgroundColor).toBe('green');
    expect(labelElement).toBeNull(); // No label element should exist
  });
});
