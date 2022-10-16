import React from 'react';
import type { ReactNode } from 'react';
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
  const prevButtonNode: ReactNode = (
    <div className={`${prefixCls}-prev-btn`} onClick={prevBtnClick}>
      {prevButtonProps?.children || (
        <Button type={type === 'primary' ? 'default' : 'primary'}>上一步</Button>
      )}
    </div>
  );

  const nextBtnClick = () => {
    onNext?.();
    if (typeof nextButtonProps?.onClick === 'function') {
      nextButtonProps?.onClick();
    }
  };

  const nextButtonNode: ReactNode = (
    <div className={`${prefixCls}-next-btn`} onClick={nextBtnClick}>
      {nextButtonProps?.children || (
        <Button type={type === 'primary' ? 'primary' : 'default'}>下一步</Button>
      )}
    </div>
  );

  const finishBtnClick = () => {
    onFinish?.();
    if (typeof finishButtonProps?.onClick === 'function') {
      finishButtonProps?.onClick();
    }
  };

  const finishButtonNode: ReactNode = (
    <div className={`${prefixCls}-finish-btn`} onClick={finishBtnClick}>
      {finishButtonProps?.children || (
        <Button type={type === 'primary' ? 'primary' : 'default'}>结束引导</Button>
      )}
    </div>
  );

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

  return (
    <>
      <button type="button" aria-label="Close" className={`${prefixCls}-close`} onClick={onClose}>
        <span className={`${prefixCls}-close-x`} />
        <span role="img" aria-label="close" className="anticon anticon-close ant-modal-close-icon">
          <svg
            viewBox="64 64 896 896"
            focusable="false"
            data-icon="close"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
          </svg>
        </span>
      </button>
      {coverNode}
      {headerNode}
      {descriptionNode}
      <div className={`${prefixCls}-footer`}>
        <div className={`${prefixCls}-sliders`}>{slickNode}</div>
        <div className={`${prefixCls}-buttons`}>
          {current !== 0 ? prevButtonNode : null}
          {current === total - 1 ? finishButtonNode : nextButtonNode}
        </div>
      </div>
    </>
  );
};

export default renderPanel;
