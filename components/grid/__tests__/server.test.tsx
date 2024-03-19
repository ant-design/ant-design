import React from 'react';

import { Col, Row } from '..';
import { render } from '../../../tests/utils';

jest.mock('rc-util/lib/Dom/canUseDom', () => () => false);

describe('Grid.Server', () => {
  it('use compatible gap logic', () => {
    const { container } = render(
      <Row gutter={[8, 16]}>
        <Col />
      </Row>,
    );

    expect(container.querySelector<HTMLElement>('.ant-row')?.style.marginLeft).toBe('-4px');
    expect(container.querySelector<HTMLElement>('.ant-row')?.style.marginRight).toBe('-4px');
    expect(container.querySelector<HTMLElement>('.ant-row')?.style.marginTop).toBe('');
    expect(container.querySelector<HTMLElement>('.ant-row')?.style.marginBottom).toBe('');

    expect((container.querySelector('.ant-col') as HTMLElement)?.style.paddingLeft).toBe('4px');
    expect((container.querySelector('.ant-col') as HTMLElement)?.style.paddingRight).toBe('4px');
    expect((container.querySelector('.ant-col') as HTMLElement)?.style.paddingTop).toBe('');
    expect((container.querySelector('.ant-col') as HTMLElement)?.style.paddingBottom).toBe('');
  });
});
