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

    const rootElement = container.querySelector<HTMLElement>('.ant-radio-wrapper');
    expect(rootElement).toHaveStyle({ padding: '10px', margin: '5px' });
  });

  it('should apply semantic styles to radio without label', () => {
    const customStyles = {
      root: { backgroundColor: 'blue' },
      icon: { backgroundColor: 'green' },
    };
    const { container } = render(<Radio styles={customStyles} />);

    const rootElement = container.querySelector<HTMLElement>('.ant-radio-wrapper');
    const iconElement = container.querySelector<HTMLElement>('.ant-radio');
    const labelElement = container.querySelector<HTMLElement>('.ant-radio-label');

    expect(rootElement).toHaveStyle({ backgroundColor: 'blue' });
    expect(iconElement).toHaveStyle({ backgroundColor: 'green' });
    expect(labelElement).toBeNull(); // No label element should exist
  });
});
