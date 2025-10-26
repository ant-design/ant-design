import type { ReactNode } from 'react';
import React from 'react';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import pickAttrs from '@rc-component/util/lib/pickAttrs';
import { clsx } from 'clsx';

import isNonNullable from '../_util/isValidNode';
import type { ButtonProps } from '../button';
import Button from '../button';
import { useLocale } from '../locale';
import defaultLocale from '../locale/en_US';
import type { TourProps, TourStepProps } from './interface';

interface TourPanelProps {
  stepProps: Omit<TourStepProps, 'closable'> & {
    closable?: Exclude<TourStepProps['closable'], boolean>;
  };
  current: number;
  type: TourProps['type'];
  indicatorsRender?: TourProps['indicatorsRender'];
  classNames?: TourProps['classNames'];
  styles?: TourProps['styles'];
  actionsRender?: TourProps['actionsRender'];
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
    classNames = {},
    styles = {},
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
    <div className={clsx(`${prefixCls}-header`, classNames.header)} style={styles.header}>
      <div className={clsx(`${prefixCls}-title`, classNames.title)} style={styles.title}>
        {title}
      </div>
    </div>
  ) : null;

  const descriptionNode = isNonNullable(description) ? (
    <div
      className={clsx(`${prefixCls}-description`, classNames.description)}
      style={styles.description}
    >
      {description}
    </div>
  ) : null;

  const coverNode = isNonNullable(cover) ? (
    <div className={clsx(`${prefixCls}-cover`, classNames.cover)} style={styles.cover}>
      {cover}
    </div>
  ) : null;

  let mergedIndicatorNode: ReactNode;

  if (indicatorsRender) {
    mergedIndicatorNode = indicatorsRender(current, total);
  } else {
    mergedIndicatorNode = [...Array.from({ length: total }).keys()].map<ReactNode>(
      (stepItem, index) => (
        <span
          key={stepItem}
          className={clsx(
            index === current && `${prefixCls}-indicator-active`,
            `${prefixCls}-indicator`,
            classNames.indicator,
          )}
          style={styles.indicator}
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
          className={clsx(`${prefixCls}-prev-btn`, prevButtonProps?.className)}
        >
          {prevButtonProps?.children ?? contextLocaleTour?.Previous}
        </Button>
      ) : null}
      <Button
        size="small"
        type={mainBtnType}
        {...nextButtonProps}
        onClick={nextBtnClick}
        className={clsx(`${prefixCls}-next-btn`, nextButtonProps?.className)}
      >
        {nextButtonProps?.children ??
          (isLastStep ? contextLocaleTour?.Finish : contextLocaleTour?.Next)}
      </Button>
    </>
  );

  return (
    <div className={`${prefixCls}-panel`}>
      <div className={clsx(`${prefixCls}-section`, classNames.section)} style={styles.section}>
        {closable && mergedCloseIcon}
        {coverNode}
        {headerNode}
        {descriptionNode}
        <div className={clsx(`${prefixCls}-footer`, classNames.footer)} style={styles.footer}>
          {total > 1 && (
            <div
              className={clsx(`${prefixCls}-indicators`, classNames.indicators)}
              style={styles.indicators}
            >
              {mergedIndicatorNode}
            </div>
          )}
          <div className={clsx(`${prefixCls}-actions`, classNames.actions)} style={styles.actions}>
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
