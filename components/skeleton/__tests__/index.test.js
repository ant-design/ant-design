import React from 'react';
import { mount } from 'enzyme';
import Skeleton from '..';
import mountTest from '../../../tests/shared/mountTest';

describe('Skeleton', () => {
  const genSkeleton = props =>
    mount(
      <Skeleton loading {...props}>
        Bamboo
      </Skeleton>,
    );

  mountTest(Skeleton);

  describe('avatar', () => {
    it('size', () => {
      const wrapperSmall = genSkeleton({ avatar: { size: 'small' } });
      expect(wrapperSmall.render()).toMatchSnapshot();
      const wrapperDefault = genSkeleton({ avatar: { size: 'default' } });
      expect(wrapperDefault.render()).toMatchSnapshot();
      const wrapperLarge = genSkeleton({ avatar: { size: 'large' } });
      expect(wrapperLarge.render()).toMatchSnapshot();
      const wrapperNumber = genSkeleton({ avatar: { size: 20 } });
      expect(wrapperNumber.render()).toMatchSnapshot();
    });

    it('shape', () => {
      const wrapperCircle = genSkeleton({ avatar: { shape: 'circle' } });
      expect(wrapperCircle.render()).toMatchSnapshot();
      const wrapperSquare = genSkeleton({ avatar: { shape: 'square' } });
      expect(wrapperSquare.render()).toMatchSnapshot();
    });
  });

  describe('title', () => {
    it('width', () => {
      const wrapper = genSkeleton({ title: { width: '93%' } });
      expect(wrapper.render()).toMatchSnapshot();
    });
  });

  describe('paragraph', () => {
    it('rows', () => {
      const wrapper = genSkeleton({ paragraph: { rows: 5 } });
      expect(wrapper.render()).toMatchSnapshot();
    });

    it('width', () => {
      const wrapperPure = genSkeleton({ paragraph: { width: '93%' } });
      expect(wrapperPure.render()).toMatchSnapshot();
      const wrapperList = genSkeleton({ paragraph: { width: ['28%', '93%'] } });
      expect(wrapperList.render()).toMatchSnapshot();
    });
  });
});
