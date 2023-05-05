import CloseOutlined from '@ant-design/icons/CloseOutlined';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import React from 'react';
import type { ButtonProps } from '../button';
import Button from '../button';
import { useLocale } from '../locale';
import defaultLocale from '../locale/en_US';
import type { TourStepProps } from './interface';

function isValidNode(node: ReactNode): boolean {
  return node !== undefined && node !== null;
}

interface TourPanelProps {
  stepProps: TourStepProps;
  current: number;
  type: TourStepProps['type'];
  indicatorsRender?: TourStepProps['indicatorsRender'];
}

const TourPanel: React.FC<TourPanelProps> = ({ stepProps, current, type, indicatorsRender }) => {
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
    className,
  } = stepProps;

  const mergedType = stepType ?? type;

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
    <div className={`${prefixCls}-header`}>
      <div className={`${prefixCls}-title`}>{title}</div>
    </div>
  ) : null;

  const descriptionNode = isValidNode(description) ? (
    <div className={`${prefixCls}-description`}>{description}</div>
  ) : null;

  const coverNode = isValidNode(cover) ? <div className={`${prefixCls}-cover`}>{cover}</div> : null;

  let mergeIndicatorNode: ReactNode;

  if (indicatorsRender) {
    mergeIndicatorNode = indicatorsRender(current, total);
  } else {
    mergeIndicatorNode = [...Array.from({ length: total }).keys()].map<ReactNode>(
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

  const [contextLocale] = useLocale('Tour', defaultLocale.Tour);

  return (
    <div className={classNames(className, `${prefixCls}-content`)}>
      <div className={`${prefixCls}-inner`}>
        <CloseOutlined className={`${prefixCls}-close`} onClick={onClose} />
        {coverNode}
        {headerNode}
        {descriptionNode}
        <div className={`${prefixCls}-footer`}>
          {total > 1 && <div className={`${prefixCls}-indicators`}>{mergeIndicatorNode}</div>}
          <div className={`${prefixCls}-buttons`}>
            {current !== 0 ? (
              <Button
                {...secondaryBtnProps}
                {...prevButtonProps}
                onClick={prevBtnClick}
                size="small"
                className={classNames(`${prefixCls}-prev-btn`, prevButtonProps?.className)}
              >
                {prevButtonProps?.children ?? contextLocale?.Previous}
              </Button>
            ) : null}
            <Button
              type={mainBtnType}
              {...nextButtonProps}
              onClick={nextBtnClick}
              size="small"
              className={classNames(`${prefixCls}-next-btn`, nextButtonProps?.className)}
            >
              {nextButtonProps?.children ??
                (isLastStep ? contextLocale?.Finish : contextLocale?.Next)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourPanel;
