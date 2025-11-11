import type { ReactNode } from 'react';
import React from 'react';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import classNames from 'classnames';
import pickAttrs from 'rc-util/lib/pickAttrs';

import type { ButtonProps } from '../button';
import Button from '../button';
import { useLocale } from '../locale';
import defaultLocale from '../locale/en_US';
import type { TourStepProps } from './interface';

const isNonNullable = <T,>(val: T): val is NonNullable<T> => {
  return val !== undefined && val !== null;
};

interface TourPanelProps {
  stepProps: Omit<TourStepProps, 'closable'> & {
    closable?: Exclude<TourStepProps['closable'], boolean>;
  };
  current: number;
  type: TourStepProps['type'];
  indicatorsRender?: TourStepProps['indicatorsRender'];
  actionsRender?: TourStepProps['actionsRender'];
}

// Due to the independent design of Panel, it will be too coupled to put in rc-tour,
// so a set of Panel logic is implemented separately in antd.
const TourPanel: React.FC<TourPanelProps> = (props) => {
  const { stepProps, current, type, indicatorsRender, actionsRender } = props;
  const {
    prefixCls,
    total = 1,
    title,
    onClose,
    onPrev,
    onNext,
    onFinish,
    cover,
    description,
    nextButtonProps,
    prevButtonProps,
    type: stepType,
    closable,
  } = stepProps;

  const mergedType = stepType ?? type;

  const ariaProps = pickAttrs(closable ?? {}, true);

  const [contextLocaleGlobal] = useLocale('global', defaultLocale.global);
  const [contextLocaleTour] = useLocale('Tour', defaultLocale.Tour);

  const mergedCloseIcon = (
    <button
      type="button"
      onClick={onClose}
      className={`${prefixCls}-close`}
      aria-label={contextLocaleGlobal?.close}
      {...ariaProps}
    >
      {closable?.closeIcon || <CloseOutlined className={`${prefixCls}-close-icon`} />}
    </button>
  );

  const isLastStep = current === total - 1;

  const prevBtnClick = () => {
    onPrev?.();
    prevButtonProps?.onClick?.();
  };

  const nextBtnClick = () => {
    if (isLastStep) {
      onFinish?.();
    } else {
      onNext?.();
    }
    nextButtonProps?.onClick?.();
  };

  const headerNode = isNonNullable(title) ? (
    <div className={`${prefixCls}-header`}>
      <div className={`${prefixCls}-title`}>{title}</div>
    </div>
  ) : null;

  const descriptionNode = isNonNullable(description) ? (
    <div className={`${prefixCls}-description`}>{description}</div>
  ) : null;

  const coverNode = isNonNullable(cover) ? (
    <div className={`${prefixCls}-cover`}>{cover}</div>
  ) : null;

  let mergedIndicatorNode: ReactNode;

  if (indicatorsRender) {
    mergedIndicatorNode = indicatorsRender(current, total);
  } else {
    mergedIndicatorNode = [...Array.from({ length: total }).keys()].map<ReactNode>(
      (stepItem, index) => (
        <span
          key={stepItem}
          className={classNames(
            index === current && `${prefixCls}-indicator-active`,
            `${prefixCls}-indicator`,
          )}
        />
      ),
    );
  }

  const mainBtnType = mergedType === 'primary' ? 'default' : 'primary';

  const secondaryBtnProps: ButtonProps = {
    type: 'default',
    ghost: mergedType === 'primary',
  };

  const defaultActionsNode = (
    <>
      {current !== 0 ? (
        <Button
          size="small"
          {...secondaryBtnProps}
          {...prevButtonProps}
          onClick={prevBtnClick}
          className={classNames(`${prefixCls}-prev-btn`, prevButtonProps?.className)}
        >
          {prevButtonProps?.children ?? contextLocaleTour?.Previous}
        </Button>
      ) : null}
      <Button
        size="small"
        type={mainBtnType}
        {...nextButtonProps}
        onClick={nextBtnClick}
        className={classNames(`${prefixCls}-next-btn`, nextButtonProps?.className)}
      >
        {nextButtonProps?.children ??
          (isLastStep ? contextLocaleTour?.Finish : contextLocaleTour?.Next)}
      </Button>
    </>
  );

  return (
    <div className={`${prefixCls}-content`}>
      <div className={`${prefixCls}-inner`}>
        {closable && mergedCloseIcon}
        {coverNode}
        {headerNode}
        {descriptionNode}
        <div className={`${prefixCls}-footer`}>
          {total > 1 && <div className={`${prefixCls}-indicators`}>{mergedIndicatorNode}</div>}
          <div className={`${prefixCls}-buttons`}>
            {actionsRender
              ? actionsRender(defaultActionsNode, { current, total })
              : defaultActionsNode}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourPanel;
