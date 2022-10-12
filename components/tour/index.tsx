import classNames from 'classnames';
import React, { useContext } from 'react';
import type { ReactNode } from 'react';
import RCTour, { TourContext } from '../../../tour/src/index';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import useStyle from './style';
import type { CompoundedComponent, TourProps, TourStepProps } from './interface';

export const tourPrefixCls = 'tour';

const Tour: React.ForwardRefRenderFunction<
  HTMLAnchorElement | HTMLButtonElement,
  TourProps
> = props => {
  const {
    prefixCls: customizePrefixCls,
    className,
    steps,
    current,
    style,
    type,
    ...restProps
  } = props;
  const { getPrefixCls, direction } = useContext<ConfigConsumerProps>(ConfigContext);
  const prefixCls = getPrefixCls(tourPrefixCls, customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const customClassName = classNames(
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    hashId,
    prefixCls,
    className,
    hashId,
  );

  const renderPanel = (item: TourStepProps, currentStep: number) => {
    const {
      title,
      cover,
      description,
      nextButtonProps = {
        children: <button type="button">下一步</button>,
        onClick: () => {},
      },
      prevButtonProps = {
        children: <button type="button">上一步</button>,
        onClick: () => {},
      },
      finishButtonProps = {
        children: <button type="button">跳过</button>,
        onClick: () => {},
      },
      renderStep,
    } = item;

    const prevBtnClick = () => {
      if (typeof prevButtonProps.onClick === 'function') {
        prevButtonProps.onClick();
      }
    };
    const prevButtonNode: ReactNode = (
      <div className={`${prefixCls}-prevButton`} onClick={prevBtnClick}>
        {prevButtonProps?.children || (
          <button className="ant-btn ant-btn-primary" type="button">
            上一步
          </button>
        )}
      </div>
    );

    const nextBtnClick = () => {
      console.log('currentStep', currentStep);
      console.log('item', item);
      if (typeof nextButtonProps.onClick === 'function') {
        nextButtonProps.onClick();
      }
    };

    const nextButtonNode: ReactNode = (
      <div className={`${prefixCls}-nextButton`} onClick={nextBtnClick}>
        {nextButtonProps?.children || (
          <button className="ant-btn ant-btn-primary" type="button">
            下一步
          </button>
        )}
      </div>
    );

    const finishBtnClick = () => {
      if (typeof finishButtonProps.onClick === 'function') {
        finishButtonProps.onClick();
      }
    };

    const finishButtonNode: ReactNode = (
      <div className={`${prefixCls}-prevButton`} onClick={finishBtnClick}>
        {finishButtonProps?.children || (
          <button className="ant-btn ant-btn-primary" type="button">
            结束引导
          </button>
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

    const closer: ReactNode = (
      <button type="button" aria-label="Close" className={`${prefixCls}-close`}>
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
    );

    const mergedSlickNode =
      (typeof renderStep === 'function' && renderStep(currentStep)) ||
      [...Array.from({ length: steps.length }).keys()].map((stepItem, index) => (
        <span key={stepItem} className={index === currentStep ? 'active' : ''} />
      ));
    const slickNode: ReactNode = steps.length > 1 ? mergedSlickNode : null;

    const mergedClassName = classNames(`${prefixCls}-inner`, className);

    return (
      <div className={mergedClassName} role={prefixCls} style={style}>
        {closer}
        {coverNode}
        {headerNode}
        <div className={`${prefixCls}-description`}>{descriptionNode}</div>
        <div className={`${prefixCls}-footer`}>
          <div className={`${prefixCls}-sliders`}>{slickNode}</div>
          <div className={`${prefixCls}-buttons`}>
            {currentStep !== 0 ? prevButtonNode : null}
            {currentStep === steps.length - 1 ? finishButtonNode : nextButtonNode}
          </div>
        </div>
      </div>
    );
  };

  return wrapSSR(
    <RCTour
      prefixCls={prefixCls}
      steps={steps}
      current={current}
      rootClassName={customClassName}
      renderPanel={renderPanel}
      {...restProps}
    />,
  );
};

if (process.env.NODE_ENV !== 'production') {
  Tour.displayName = 'Tour';
}

const ForwardTour = React.forwardRef<HTMLAnchorElement | HTMLButtonElement, TourProps>(
  Tour,
) as CompoundedComponent;

export default ForwardTour;
