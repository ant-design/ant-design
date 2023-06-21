import { render } from '@testing-library/react';
import React from 'react';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import Badge from '../index';

describe('Ribbon', () => {
  mountTest(Badge.Ribbon);
  rtlTest(Badge.Ribbon);

  describe('placement', () => {
    it('works with `start` & `end` placement', () => {
      const { container: wrapperStart } = render(
        <Badge.Ribbon placement="start">
          <div />
        </Badge.Ribbon>,
      );
      expect(wrapperStart.querySelectorAll('.ant-ribbon-placement-start').length).toEqual(1);

      const { container: wrapperEnd } = render(
        <Badge.Ribbon placement="end">
          <div />
        </Badge.Ribbon>,
      );
      expect(wrapperEnd.querySelectorAll('.ant-ribbon-placement-end').length).toEqual(1);
    });
  });

  describe('color', () => {
    it('works with preset color', () => {
      const { container } = render(
        <Badge.Ribbon color="green">
          <div />
        </Badge.Ribbon>,
      );
      expect(container.querySelectorAll('.ant-ribbon-color-green').length).toEqual(1);
    });
    it('works with custom color', () => {
      const { container: wrapperLeft } = render(
        <Badge.Ribbon color="#888" placement="start">
          <div />
        </Badge.Ribbon>,
      );
      expect((wrapperLeft.querySelector('.ant-ribbon')! as HTMLElement).style.background).toEqual(
        'rgb(136, 136, 136)',
      );
      expect((wrapperLeft.querySelector('.ant-ribbon-corner')! as HTMLElement).style.color).toEqual(
        'rgb(136, 136, 136)',
      );
      const { container: wrapperRight } = render(
        <Badge.Ribbon color="#888" placement="end">
          <div />
        </Badge.Ribbon>,
      );
      expect((wrapperRight.querySelector('.ant-ribbon')! as HTMLElement).style.background).toEqual(
        'rgb(136, 136, 136)',
      );
      expect(
        (wrapperRight.querySelector('.ant-ribbon-corner')! as HTMLElement).style.color,
      ).toEqual('rgb(136, 136, 136)');
    });
  });

  describe('text', () => {
    it('works with string', () => {
      const { container } = render(
        <Badge.Ribbon text="cool">
          <div />
        </Badge.Ribbon>,
      );
      expect(container.querySelector('.ant-ribbon')?.textContent).toEqual('cool');
    });
    it('works with element', () => {
      const { container } = render(
        <Badge.Ribbon text={<span className="cool" />}>
          <div />
        </Badge.Ribbon>,
      );
      expect(container.querySelectorAll('.cool').length).toEqual(1);
    });
  });
});
