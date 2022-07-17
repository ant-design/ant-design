import React from 'react';
import { mount } from 'enzyme';
import Skeleton from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

describe('Skeleton', () => {
  const genSkeleton = props =>
    mount(
      <Skeleton loading {...props}>
        Bamboo
      </Skeleton>,
    );
  const genSkeletonButton = props => mount(<Skeleton.Button {...props} />);
  const genSkeletonAvatar = props => mount(<Skeleton.Avatar {...props} />);
  const genSkeletonInput = props => mount(<Skeleton.Input {...props} />);
  const genSkeletonImage = props => mount(<Skeleton.Image {...props} />);

  mountTest(Skeleton);
  rtlTest(Skeleton);

  it('should without avatar and paragraph', () => {
    const wrapperSmall = genSkeleton({ avatar: false, paragraph: false });
    expect(wrapperSmall.render()).toMatchSnapshot();
  });

  it('should square avatar', () => {
    const wrapperSmall = genSkeleton({ avatar: true, paragraph: false });
    expect(wrapperSmall.render()).toMatchSnapshot();
  });

  it('should round title and paragraph', () => {
    const wrapperSmall = genSkeleton({ round: true, title: true, paragraph: true });
    expect(wrapperSmall.render()).toMatchSnapshot();
  });

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

  describe('button element', () => {
    it('active', () => {
      const wrapper = genSkeletonButton({ active: true });
      expect(wrapper.render()).toMatchSnapshot();
    });
    it('size', () => {
      const wrapperDefault = genSkeletonButton({ size: 'default' });
      expect(wrapperDefault.render()).toMatchSnapshot();
      const wrapperLarge = genSkeletonButton({ size: 'large' });
      expect(wrapperLarge.render()).toMatchSnapshot();
      const wrapperSmall = genSkeletonButton({ size: 'small' });
      expect(wrapperSmall.render()).toMatchSnapshot();
    });
    it('shape', () => {
      const wrapperDefault = genSkeletonButton({ shape: 'default' });
      expect(wrapperDefault.render()).toMatchSnapshot();
      const wrapperRound = genSkeletonButton({ shape: 'round' });
      expect(wrapperRound.render()).toMatchSnapshot();
      const wrapperCircle = genSkeletonButton({ shape: 'circle' });
      expect(wrapperCircle.render()).toMatchSnapshot();
    });
  });

  describe('avatar element', () => {
    it('active', () => {
      const wrapper = genSkeletonAvatar({ active: true });
      expect(wrapper.render()).toMatchSnapshot();
    });
    it('size', () => {
      const wrapperSmall = genSkeletonAvatar({ size: 'small' });
      expect(wrapperSmall.render()).toMatchSnapshot();
      const wrapperDefault = genSkeletonAvatar({ size: 'default' });
      expect(wrapperDefault.render()).toMatchSnapshot();
      const wrapperLarge = genSkeletonAvatar({ size: 'large' });
      expect(wrapperLarge.render()).toMatchSnapshot();
      const wrapperNumber = genSkeletonAvatar({ size: 20 });
      expect(wrapperNumber.render()).toMatchSnapshot();
    });

    it('shape', () => {
      const wrapperCircle = genSkeletonAvatar({ shape: 'circle' });
      expect(wrapperCircle.render()).toMatchSnapshot();
      const wrapperSquare = genSkeletonAvatar({ shape: 'square' });
      expect(wrapperSquare.render()).toMatchSnapshot();
    });
  });

  describe('input element', () => {
    it('active', () => {
      const wrapper = genSkeletonInput({ active: true });
      expect(wrapper.render()).toMatchSnapshot();
    });
    it('size', () => {
      const wrapperSmall = genSkeletonInput({ size: 'small' });
      expect(wrapperSmall.render()).toMatchSnapshot();
      const wrapperDefault = genSkeletonInput({ size: 'default' });
      expect(wrapperDefault.render()).toMatchSnapshot();
      const wrapperLarge = genSkeletonInput({ size: 'large' });
      expect(wrapperLarge.render()).toMatchSnapshot();
    });
  });

  describe('image element', () => {
    it('should render normal', () => {
      const wrapper = genSkeletonImage();
      expect(wrapper.render()).toMatchSnapshot();
    });
  });
});
