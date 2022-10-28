import React from 'react';
import type { ReactNode } from 'react';
import classNames from 'classnames';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import type { TourStepProps } from './interface';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import Button from '../button';
import type { ButtonProps } from '../button';
import defaultLocale from '../locale/en_US';

const panelRender: (
  step: TourStepProps,
  current: number,
  type: TourStepProps['type'],
) => ReactNode = (props: TourStepProps, current: number, type) => {
  const {
    prefixCls,
    total,
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
    stepRender,
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
    (typeof stepRender === 'function' && stepRender(current, total!)) ||
    [...Array.from({ length: total! }).keys()].map((stepItem, index) => (
      <span
        key={stepItem}
        className={classNames(
          index === current && `${prefixCls}-slider-active`,
          `${prefixCls}-slider`,
        )}
      />
    ));
  const slickNode: ReactNode = total! > 1 ? mergedSlickNode : null;

  const mainBtnType = type === 'primary' ? 'default' : 'primary';
  const secondaryBtnProps: ButtonProps = {
    type: 'default',
    ghost: type === 'primary',
  };

  return (
    <LocaleReceiver componentName="Tour" defaultLocale={defaultLocale.Tour}>
      {contextLocale => (
        <>
          <CloseOutlined className={`${prefixCls}-close`} onClick={onClose} />
          {coverNode}
          {headerNode}
          {descriptionNode}
          <div className={`${prefixCls}-footer`}>
            <div className={`${prefixCls}-sliders`}>{slickNode}</div>
            <div className={`${prefixCls}-buttons`}>
              {current !== 0 ? (
                <Button {...secondaryBtnProps} {...prevButtonProps} onClick={prevBtnClick}>
                  {contextLocale.Previous}
                </Button>
              ) : null}
              {current === total! - 1 ? (
                <Button type={mainBtnType} {...finishButtonProps} onClick={finishBtnClick}>
                  {contextLocale.Finish}
                </Button>
              ) : (
                <Button type={mainBtnType} {...nextButtonProps} onClick={nextBtnClick}>
                  {contextLocale.Next}
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </LocaleReceiver>
  );
};

export default panelRender;
