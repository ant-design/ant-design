import * as React from 'react';

import Divider from '..';
import mountTest from '../../../tests/shared/mountTest';
import { render } from '../../../tests/utils';

describe('orientation attribute', () => {
  mountTest(Divider);

  it('orientation=center result: titlePlacement=center ', () => {
    // const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { container } = render(<Divider orientation="center">Bamboo</Divider>);
    expect(
      container.querySelector<HTMLSpanElement>('.ant-divider-with-text-center'),
    ).not.toBeNull();
  });

  it('orientation=vertical  type=horizontal, result orientation=vertical', () => {
    const { container } = render(<Divider orientation="vertical" type="horizontal" />);
    expect(container.querySelector<HTMLSpanElement>('.ant-divider-vertical')).not.toBeNull();
  });

  it('type=vertical orientation=undefined, result orientation=vertical', () => {
    const { container } = render(<Divider orientation="vertical" type="horizontal" />);
    expect(container.querySelector<HTMLSpanElement>('.ant-divider-vertical')).not.toBeNull();
  });

  it('orientation=center titlePlacement=left, result titlePlacement=left', () => {
    const { container } = render(
      <Divider orientation="center" titlePlacement="left">
        test title
      </Divider>,
    );
    expect(container.querySelector<HTMLSpanElement>('.ant-divider-with-text-start')).not.toBeNull();
  });
});
