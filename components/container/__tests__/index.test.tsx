import React from 'react';
import Container from '..';
import { render } from '../../../tests/utils';

describe('Container', () => {
  it('should render correctly', () => {
    const { container } = render(<Container />);
    expect(container.querySelector('.ant-container')).toBeTruthy();
  });

  it('should render correctly with maxWidth breakpoint', () => {
    const { container } = render(<Container maxWidth="xl" />);
    expect(container.querySelector('.ant-container')).toHaveClass('ant-container-max-width-xl');
  });

  it('should render correctly with minWidth breakpoint', () => {
    const { container } = render(<Container minWidth="md" />);
    expect(container.querySelector('.ant-container')).toHaveClass('ant-container-min-width-md');
  });

  it('should render correctly with maxWidth number', () => {
    const { container } = render(<Container maxWidth={1200} />);
    expect(container.querySelector('.ant-container')).toHaveStyle({ maxWidth: '1200px' });
  });

  it('should render correctly with minWidth number', () => {
    const { container } = render(<Container minWidth={768} />);
    expect(container.querySelector('.ant-container')).toHaveStyle({ minWidth: '768px' });
  });
});
