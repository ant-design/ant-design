import type { ReactNode } from 'react';
import React from 'react';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import pickAttrs from '@rc-component/util/lib/pickAttrs';
import { clsx } from 'clsx';

import isValidNode from '../_util/isValidNode';
import type { ButtonProps } from '../button';
import Button from '../button';
import { useLocale } from '../locale';
import defaultLocale from '../locale/en_US';
import type { SemanticName, TourStepProps } from './interface';

interface TourPanelProps {
  stepProps: Omit<TourStepProps, 'closable'> & {
    closable?: Exclude<TourStepProps['closable'], boolean>;
  };
  current: number;
  type: TourStepProps['type'];
  indicatorsRender?: TourStepProps['indicatorsRender'];
  classNames?: Partial<Record<SemanticName, string>>;
  styles?: Partial<Record<SemanticName, React.CSSProperties>>;
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
    classNames: tourClassNames,
    styles,
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

  const headerNode = isValidNode(title) ? (
    <div className={clsx(`${prefixCls}-header`, tourClassNames?.header)} style={styles?.header}>
      <div className={clsx(`${prefixCls}-title`, tourClassNames?.title)} style={styles?.title}>
        {title}
      </div>
    </div>
  ) : null;

  const descriptionNode = isValidNode(description) ? (
    <div
      className={clsx(`${prefixCls}-description`, tourClassNames?.description)}
      style={styles?.description}
    >
      {description}
    </div>
  ) : null;

  const coverNode = isValidNode(cover) ? (
    <div className={clsx(`${prefixCls}-cover`, tourClassNames?.cover)} style={styles?.cover}>
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
            tourClassNames?.indicator,
          )}
          style={styles?.indicator}
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
    <div className={`${prefixCls}-pannel`}>
      <div
        className={clsx(`${prefixCls}-section`, tourClassNames?.section)}
        style={styles?.section}
      >
        {closable && mergedCloseIcon}
        {coverNode}
        {headerNode}
        {descriptionNode}
        <div className={clsx(`${prefixCls}-footer`, tourClassNames?.footer)} style={styles?.footer}>
          {total > 1 && (
            <div
              className={clsx(`${prefixCls}-indicators`, tourClassNames?.indicators)}
              style={styles?.indicators}
            >
              {mergedIndicatorNode}
            </div>
          )}
          <div
            className={clsx(`${prefixCls}-actions`, tourClassNames?.actions)}
            style={styles?.actions}
          >
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
