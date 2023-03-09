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

    expect((container.querySelector('.ant-row') as HTMLElement)!.style.marginLeft).toEqual('-4px');
    expect((container.querySelector('.ant-row') as HTMLElement)!.style.marginRight).toEqual('-4px');
    expect((container.querySelector('.ant-row') as HTMLElement)!.style.marginTop).toEqual('-8px');
    expect((container.querySelector('.ant-row') as HTMLElement)!.style.marginBottom).toEqual(
      '-8px',
    );

    expect((container.querySelector('.ant-col') as HTMLElement)!.style.paddingLeft).toEqual('4px');
    expect((container.querySelector('.ant-col') as HTMLElement)!.style.paddingRight).toEqual('4px');
    expect((container.querySelector('.ant-col') as HTMLElement)!.style.paddingTop).toEqual('8px');
    expect((container.querySelector('.ant-col') as HTMLElement)!.style.paddingBottom).toEqual(
      '8px',
    );
  });
});
