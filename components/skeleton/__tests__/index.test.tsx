import React from 'react';
import Skeleton from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render } from '../../../tests/utils';
import type { SkeletonProps } from '../Skeleton';
import type { AvatarProps } from '../Avatar';
import type { SkeletonButtonProps } from '../Button';
import type { SkeletonImageProps } from '../Image';
import type { SkeletonInputProps } from '../Input';
import type { SkeletonNodeProps } from '../Node';

describe('Skeleton', () => {
  const genSkeleton = (props: SkeletonProps) =>
    render(
      <Skeleton loading {...props}>
        Bamboo
      </Skeleton>,
    );
  const genSkeletonButton = (props: SkeletonButtonProps) => render(<Skeleton.Button {...props} />);
  const genSkeletonAvatar = (props: AvatarProps) => render(<Skeleton.Avatar {...props} />);
  const genSkeletonInput = (props: SkeletonInputProps) => render(<Skeleton.Input {...props} />);
  const genSkeletonImage = (props: SkeletonImageProps) => render(<Skeleton.Image {...props} />);
  const genSkeletonNode = (props: SkeletonNodeProps) => render(<Skeleton.Node {...props} />);

  mountTest(Skeleton);
  rtlTest(Skeleton);

  it('should without avatar and paragraph', () => {
    const { asFragment } = genSkeleton({ avatar: false, paragraph: false });
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should square avatar', () => {
    const { asFragment } = genSkeleton({ avatar: true, paragraph: false });
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should round title and paragraph', () => {
    const { asFragment } = genSkeleton({ round: true, title: true, paragraph: true });
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should display without children and falsy loading props', () => {
    const { asFragment } = render(<Skeleton loading={false} />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should display with empty children and falsy loading props', () => {
    const { container } = render(<Skeleton loading={false}>{0}</Skeleton>);
    expect(container.textContent).toBe('0');
  });

  it('should display children', () => {
    const { container } = render(<Skeleton loading={false}>{[1, 2, 3]}</Skeleton>);
    expect(container.textContent).toBe('123');
  });

  describe('avatar', () => {
    it('size', () => {
      const { asFragment } = genSkeleton({ avatar: { size: 'small' } });
      expect(asFragment().firstChild).toMatchSnapshot();
      const { asFragment: wrapperDefault } = genSkeleton({ avatar: { size: 'default' } });
      expect(wrapperDefault().firstChild).toMatchSnapshot();
      const { asFragment: wrapperLarge } = genSkeleton({ avatar: { size: 'large' } });
      expect(wrapperLarge().firstChild).toMatchSnapshot();
      const { asFragment: wrapperNumber } = genSkeleton({ avatar: { size: 20 } });
      expect(wrapperNumber().firstChild).toMatchSnapshot();
    });

    it('shape', () => {
      const { asFragment: wrapperCircle } = genSkeleton({ avatar: { shape: 'circle' } });
      expect(wrapperCircle().firstChild).toMatchSnapshot();
      const { asFragment: wrapperSquare } = genSkeleton({ avatar: { shape: 'square' } });
      expect(wrapperSquare().firstChild).toMatchSnapshot();
    });
  });

  describe('title', () => {
    it('width', () => {
      const { asFragment } = genSkeleton({ title: { width: '93%' } });
      expect(asFragment().firstChild).toMatchSnapshot();
    });
  });

  describe('paragraph', () => {
    it('rows', () => {
      const { asFragment } = genSkeleton({ paragraph: { rows: 5 } });
      expect(asFragment().firstChild).toMatchSnapshot();
    });

    it('width', () => {
      const { asFragment: wrapperPure } = genSkeleton({ paragraph: { width: '93%' } });
      expect(wrapperPure().firstChild).toMatchSnapshot();
      const { asFragment: wrapperList } = genSkeleton({ paragraph: { width: ['28%', '93%'] } });
      expect(wrapperList().firstChild).toMatchSnapshot();
    });
  });

  describe('button element', () => {
    it('active', () => {
      const { asFragment } = genSkeletonButton({ active: true });
      expect(asFragment().firstChild).toMatchSnapshot();
    });
    it('block', () => {
      const { asFragment } = genSkeletonButton({ block: true });
      expect(asFragment().firstChild).toMatchSnapshot();
    });
    it('size', () => {
      const { asFragment: wrapperDefault } = genSkeletonButton({ size: 'default' });
      expect(wrapperDefault().firstChild).toMatchSnapshot();
      const { asFragment: wrapperLarge } = genSkeletonButton({ size: 'large' });
      expect(wrapperLarge().firstChild).toMatchSnapshot();
      const { asFragment } = genSkeletonButton({ size: 'small' });
      expect(asFragment().firstChild).toMatchSnapshot();
    });
    it('shape', () => {
      const { asFragment: wrapperDefault } = genSkeletonButton({ shape: 'default' });
      expect(wrapperDefault().firstChild).toMatchSnapshot();
      const { asFragment: wrapperRound } = genSkeletonButton({ shape: 'round' });
      expect(wrapperRound().firstChild).toMatchSnapshot();
      const { asFragment: wrapperCircle } = genSkeletonButton({ shape: 'circle' });
      expect(wrapperCircle().firstChild).toMatchSnapshot();
    });
  });

  describe('avatar element', () => {
    it('active', () => {
      const { asFragment } = genSkeletonAvatar({ active: true });
      expect(asFragment().firstChild).toMatchSnapshot();
    });
    it('size', () => {
      const { asFragment } = genSkeletonAvatar({ size: 'small' });
      expect(asFragment().firstChild).toMatchSnapshot();
      const { asFragment: wrapperDefault } = genSkeletonAvatar({ size: 'default' });
      expect(wrapperDefault().firstChild).toMatchSnapshot();
      const { asFragment: wrapperLarge } = genSkeletonAvatar({ size: 'large' });
      expect(wrapperLarge().firstChild).toMatchSnapshot();
      const { asFragment: wrapperNumber } = genSkeletonAvatar({ size: 20 });
      expect(wrapperNumber().firstChild).toMatchSnapshot();
    });

    it('shape', () => {
      const { asFragment: wrapperCircle } = genSkeletonAvatar({ shape: 'circle' });
      expect(wrapperCircle().firstChild).toMatchSnapshot();
      const { asFragment: wrapperSquare } = genSkeletonAvatar({ shape: 'square' });
      expect(wrapperSquare().firstChild).toMatchSnapshot();
    });
  });

  describe('input element', () => {
    it('active', () => {
      const { asFragment } = genSkeletonInput({ active: true });
      expect(asFragment().firstChild).toMatchSnapshot();
    });
    it('size', () => {
      const { asFragment } = genSkeletonInput({ size: 'small' });
      expect(asFragment().firstChild).toMatchSnapshot();
      const { asFragment: wrapperDefault } = genSkeletonInput({ size: 'default' });
      expect(wrapperDefault().firstChild).toMatchSnapshot();
      const { asFragment: wrapperLarge } = genSkeletonInput({ size: 'large' });
      expect(wrapperLarge().firstChild).toMatchSnapshot();
    });
  });

  describe('image element', () => {
    it('should render normal', () => {
      const { asFragment } = genSkeletonImage({});
      expect(asFragment().firstChild).toMatchSnapshot();
    });
  });

  describe('custom node element', () => {
    it('should render normal', () => {
      const { asFragment } = genSkeletonNode({});
      expect(asFragment().firstChild).toMatchSnapshot();
      const { asFragment: asFragmentNode } = genSkeletonNode({
        children: <span>Custom Content Node</span>,
      });
      expect(asFragmentNode().firstChild).toMatchSnapshot();
    });
  });

  it('should support style', () => {
    const { asFragment } = genSkeleton({ style: { background: 'blue' } });
    expect(asFragment().firstChild).toMatchSnapshot();
  });
});
