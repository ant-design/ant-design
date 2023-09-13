import React from 'react';

import { Col, Row } from '..';
import { render } from '../../../tests/utils';

vi.mock('rc-util/es/Dom/canUseDom', () => ({ default: () => false }));

describe('Grid.Server', () => {
  it('use compatible gap logic', () => {
    const { container } = render(
      <Row gutter={[8, 16]}>
        <Col />
      </Row>,
    );

    expect((container.querySelector('.ant-row') as HTMLElement)?.style.marginLeft).toBe('-4px');
    expect((container.querySelector('.ant-row') as HTMLElement)?.style.marginRight).toBe('-4px');
    expect((container.querySelector('.ant-row') as HTMLElement)?.style.marginTop).toBe('');
    expect((container.querySelector('.ant-row') as HTMLElement)?.style.marginBottom).toBe('');

    expect((container.querySelector('.ant-col') as HTMLElement)?.style.paddingLeft).toBe('4px');
    expect((container.querySelector('.ant-col') as HTMLElement)?.style.paddingRight).toBe('4px');
    expect((container.querySelector('.ant-col') as HTMLElement)?.style.paddingTop).toBe('');
    expect((container.querySelector('.ant-col') as HTMLElement)?.style.paddingBottom).toBe('');
  });
});
