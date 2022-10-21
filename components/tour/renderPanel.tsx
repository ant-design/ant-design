import React from 'react';
import type { ReactNode } from 'react';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import type { TourStepProps } from './interface';
import Button from '../button';

const renderPanel: (step: TourStepProps, current: number) => ReactNode = (
  props: TourStepProps,
  current: number,
) => {
  const {
    prefixCls,
    total = 0,
    title,
    onClose,
    onPrev,
    onNext,
    onFinish,
    cover,
    description,
    nextButtonProps,
    prevButtonProps,
    finishButtonProps,
    type = 'default',
    renderStep,
  } = props;

  const prevBtnClick = () => {
    onPrev?.();
    if (typeof prevButtonProps?.onClick === 'function') {
      prevButtonProps?.onClick();
    }
  };

  const nextBtnClick = () => {
    onNext?.();
    if (typeof nextButtonProps?.onClick === 'function') {
      nextButtonProps?.onClick();
    }
  };

  const finishBtnClick = () => {
    onFinish?.();
    if (typeof finishButtonProps?.onClick === 'function') {
      finishButtonProps?.onClick();
    }
  };

  let headerNode: ReactNode;
  if (title) {
    headerNode = (
      <div className={`${prefixCls}-header`}>
        <div className={`${prefixCls}-title`}>{title}</div>
      </div>
    );
  }

  let descriptionNode: ReactNode;
  if (description) {
    descriptionNode = <div className={`${prefixCls}-description`}>{description}</div>;
  }

  let coverNode: ReactNode;
  if (cover) {
    coverNode = <div className={`${prefixCls}-cover`}>{cover}</div>;
  }

  const mergedSlickNode =
    (typeof renderStep === 'function' && renderStep(current)) ||
    [...Array.from({ length: total }).keys()].map((stepItem, index) => (
      <span key={stepItem} className={index === current ? 'active' : ''} />
    ));
  const slickNode: ReactNode = total > 1 ? mergedSlickNode : null;

  const mergedType = type === 'primary' ? 'primary' : 'default';
  return (
    <>
      <CloseOutlined className={`${prefixCls}-close`} onClick={onClose} />
      {coverNode}
      {headerNode}
      {descriptionNode}
      <div className={`${prefixCls}-footer`}>
        <div className={`${prefixCls}-sliders`}>{slickNode}</div>
        <div className={`${prefixCls}-buttons`}>
          {current !== 0 ? (
            <Button type={mergedType} {...prevButtonProps} onClick={prevBtnClick}>
              下一步
            </Button>
          ) : null}
          {current === total - 1 ? (
            <Button type={mergedType} {...finishButtonProps} onClick={finishBtnClick}>
              结束引导
            </Button>
          ) : (
            <Button type={mergedType} {...nextButtonProps} onClick={nextBtnClick}>
              下一步
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default renderPanel;
