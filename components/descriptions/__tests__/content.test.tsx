import React from 'react';
import { render } from '@testing-library/react';

import Descriptions from '..';

describe('Descriptions content rendering', () => {
  it('should render numeric zero in title and extra', () => {
    const { container, rerender } = render(<Descriptions title={0} extra={0} />);

    expect(container.querySelector('.ant-descriptions-title')).toHaveTextContent('0');
    expect(container.querySelector('.ant-descriptions-extra')).toHaveTextContent('0');
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="ant-descriptions css-var-root"
        >
          <div
            class="ant-descriptions-header"
          >
            <div
              class="ant-descriptions-title"
            >
              0
            </div>
            <div
              class="ant-descriptions-extra"
            >
              0
            </div>
          </div>
          <div
            class="ant-descriptions-view"
          >
            <table>
              <tbody />
            </table>
          </div>
        </div>
      </div>
    `);

    rerender(<Descriptions title={null} extra={false} />);

    expect(container.querySelector('.ant-descriptions-header')).not.toBeInTheDocument();
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="ant-descriptions css-var-root"
        >
          <div
            class="ant-descriptions-view"
          >
            <table>
              <tbody />
            </table>
          </div>
        </div>
      </div>
    `);
  });
});
