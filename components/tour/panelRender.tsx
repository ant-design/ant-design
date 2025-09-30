import type { ReactNode } from 'react';
import React from 'react';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import pickAttrs from '@rc-component/util/lib/pickAttrs';
import classNames from 'classnames';

import isValidNode from '../_util/isValidNode';
import type { ButtonProps } from '../button';
import Button from '../button';
import { useLocale } from '../locale';
import defaultLocale from '../locale/en_US';
import type { TourSemanticName, TourStepProps } from './interface';

interface TourPanelProps {
  stepProps: Omit<TourStepProps, 'closable'> & {
    closable?: Exclude<TourStepProps['closable'], boolean>;
  };
  current: number;
  type: TourStepProps['type'];
  indicatorsRender?: TourStepProps['indicatorsRender'];
  classNames?: Partial<Record<TourSemanticName, string>>;
  styles?: Partial<Record<TourSemanticName, React.CSSProperties>>;
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
    <div
      className={classNames(`${prefixCls}-header`, tourClassNames?.header)}
      style={styles?.header}
    >
      <div
        className={classNames(`${prefixCls}-title`, tourClassNames?.title)}
        style={styles?.title}
      >
        {title}
      </div>
    </div>
  ) : null;

  const descriptionNode = isValidNode(description) ? (
    <div
      className={classNames(`${prefixCls}-description`, tourClassNames?.description)}
      style={styles?.description}
    >
      {description}
    </div>
  ) : null;

  const coverNode = isValidNode(cover) ? (
    <div className={classNames(`${prefixCls}-cover`, tourClassNames?.cover)} style={styles?.cover}>
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
          className={classNames(
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
    <div className={`${prefixCls}-panel`}>
      <div
        className={classNames(`${prefixCls}-section`, tourClassNames?.section)}
        style={styles?.section}
      >
        {closable && mergedCloseIcon}
        {coverNode}
        {headerNode}
        {descriptionNode}
        <div
          className={classNames(`${prefixCls}-footer`, tourClassNames?.footer)}
          style={styles?.footer}
        >
          {total > 1 && (
            <div
              className={classNames(`${prefixCls}-indicators`, tourClassNames?.indicators)}
              style={styles?.indicators}
            >
              {mergedIndicatorNode}
            </div>
          )}
          <div
            className={classNames(`${prefixCls}-actions`, tourClassNames?.actions)}
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
