import * as React from 'react';

import Divider from '..';
import mountTest from '../../../tests/shared/mountTest';
import { render } from '../../../tests/utils';

describe('Divider', () => {
  mountTest(Divider);

  it('not show children when vertical', () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { container } = render(<Divider type="vertical">Bamboo</Divider>);
    expect(container.querySelector<HTMLSpanElement>('.ant-divider-inner-text')).toBeFalsy();

    errSpy.mockRestore();
  });

  it('support string orientationMargin', () => {
    const { container } = render(
      <Divider orientation="right" orientationMargin="10">
        test test test
      </Divider>,
    );
    expect(container?.querySelector<HTMLSpanElement>('.ant-divider-inner-text')).toHaveStyle({
      marginRight: 10,
    });
  });

  it('support bool dashed', () => {
    const { container } = render(<Divider dashed>test test test</Divider>);
    expect(container?.querySelector<HTMLSpanElement>('.ant-divider-dashed')).toHaveStyle({
      borderStyle: 'dashed',
    });
  });

  it('support string variant', () => {
    const { container } = render(<Divider variant="dotted">test dotted</Divider>);
    expect(container?.querySelector<HTMLSpanElement>('.ant-divider-dotted')).toHaveStyle({
      borderStyle: 'dotted',
    });
  });

  describe('orientation attribute', () => {
    it('orientation=center result: titlePlacement=center ', () => {
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
      expect(
        container.querySelector<HTMLSpanElement>('.ant-divider-with-text-start'),
      ).not.toBeNull();
    });
  });

  describe('titlePlacement attribute', () => {
    it('orientation=center titlePlacement=left, result: titlePlacement=left margin=20px ', () => {
      const { container } = render(
        <Divider placementMargin={20} titlePlacement="left" orientation="center">
          Bamboo
        </Divider>,
      ); //
      expect(
        container
          .querySelector<HTMLSpanElement>('.ant-divider-inner-text')
          ?.style.getPropertyValue('margin-inline-start'),
      ).toBe('20px');
      expect(
        container.querySelector<HTMLSpanElement>('.ant-divider-with-text-start'),
      ).not.toBeNull();
    });
  });
});
