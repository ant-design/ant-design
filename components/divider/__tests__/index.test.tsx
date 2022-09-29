import * as React from 'react';
import { render } from '../../../tests/utils';
import Divider from '..';
import mountTest from '../../../tests/shared/mountTest';

describe('Divider', () => {
  mountTest(Divider);

  it('not show children when vertical', () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { container } = render(<Divider type="vertical">Bamboo</Divider>);
    expect(container.querySelector('.ant-divider-inner-text')).toBeFalsy();

    errSpy.mockRestore();
  });
});
