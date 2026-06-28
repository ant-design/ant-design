import React from 'react';
import { vi } from 'vitest';

import { Col, Row } from '..';
import { render } from '../../../tests/utils';

vi.mock('@rc-component/util/lib/Dom/canUseDom', () => ({
  default: () => false,
}));

describe('Grid.Server', () => {
  it('use compatible gap logic', () => {
    const { container } = render(
      <Row gutter={[8, 16]}>
        <Col />
      </Row>,
    );

    const rowElement = container.querySelector<HTMLElement>('.ant-row');
    expect(rowElement).toHaveStyle({
      marginInline: '-4px',
      marginTop: '',
      marginBottom: '',
    });

    const colElement = container.querySelector<HTMLElement>('.ant-col');
    expect(colElement).toHaveStyle({
      paddingInline: '4px',
      paddingTop: '',
      paddingBottom: '',
    });
  });
});
