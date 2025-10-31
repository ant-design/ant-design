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

    const rowElement = container.querySelector<HTMLElement>('.ant-row');
    expect(rowElement).toHaveStyle({
      marginLeft: '-4px',
      marginRight: '-4px',
      marginTop: '',
      marginBottom: '',
    });

    const colElement = container.querySelector<HTMLElement>('.ant-col');
    expect(colElement).toHaveStyle({
      paddingLeft: '4px',
      paddingRight: '4px',
      paddingTop: '',
      paddingBottom: '',
    });
  });
});
