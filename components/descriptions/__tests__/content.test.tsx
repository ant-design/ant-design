import React from 'react';
import { render } from '@testing-library/react';

import Descriptions from '..';

describe('Descriptions content rendering', () => {
  it('should render numeric zero in title and extra', () => {
    const { container, rerender } = render(<Descriptions title={0} extra={0} />);

    expect(container.querySelector('.ant-descriptions-title')).toHaveTextContent('0');
    expect(container.querySelector('.ant-descriptions-extra')).toHaveTextContent('0');

    rerender(<Descriptions title={null} extra={false} />);

    expect(container.querySelector('.ant-descriptions-header')).not.toBeInTheDocument();
  });
});
