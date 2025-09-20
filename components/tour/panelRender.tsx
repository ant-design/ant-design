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
  const {
    stepProps,
    current,
    type,
    indicatorsRender,
    actionsRender,
    classNames: panelClassNames,
    styles: panelStyles,
  } = props;
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
    styles: stepStyles,
  } = stepProps;

  const mergedType = stepType ?? type;

  const ariaProps = pickAttrs(closable ?? {}, true);

  // Merge classNames and styles from both step and panel level
  const mergedClassNames = {
    section: classNames(tourClassNames?.section, panelClassNames?.section),
    header: classNames(tourClassNames?.header, panelClassNames?.header),
    title: classNames(tourClassNames?.title, panelClassNames?.title),
    description: classNames(tourClassNames?.description, panelClassNames?.description),
    cover: classNames(tourClassNames?.cover, panelClassNames?.cover),
    footer: classNames(tourClassNames?.footer, panelClassNames?.footer),
    indicators: classNames(tourClassNames?.indicators, panelClassNames?.indicators),
    indicator: classNames(tourClassNames?.indicator, panelClassNames?.indicator),
    actions: classNames(tourClassNames?.actions, panelClassNames?.actions),
  };

  const mergedStyles = {
    section: { ...panelStyles?.section, ...stepStyles?.section },
    header: { ...panelStyles?.header, ...stepStyles?.header },
    title: { ...panelStyles?.title, ...stepStyles?.title },
    description: { ...panelStyles?.description, ...stepStyles?.description },
    cover: { ...panelStyles?.cover, ...stepStyles?.cover },
    footer: { ...panelStyles?.footer, ...stepStyles?.footer },
    indicators: { ...panelStyles?.indicators, ...stepStyles?.indicators },
    indicator: { ...panelStyles?.indicator, ...stepStyles?.indicator },
    actions: { ...panelStyles?.actions, ...stepStyles?.actions },
  };

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
      className={classNames(`${prefixCls}-header`, mergedClassNames.header)}
      style={mergedStyles.header}
    >
      <div
        className={classNames(`${prefixCls}-title`, mergedClassNames.title)}
        style={mergedStyles.title}
      >
        {title}
      </div>
    </div>
  ) : null;

  const descriptionNode = isValidNode(description) ? (
    <div
      className={classNames(`${prefixCls}-description`, mergedClassNames.description)}
      style={mergedStyles.description}
    >
      {description}
    </div>
  ) : null;

  const coverNode = isValidNode(cover) ? (
    <div
      className={classNames(`${prefixCls}-cover`, mergedClassNames.cover)}
      style={mergedStyles.cover}
    >
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
            mergedClassNames.indicator,
          )}
          style={mergedStyles.indicator}
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
    <div className={`${prefixCls}-pannel`}>
      <div
        className={classNames(`${prefixCls}-section`, mergedClassNames.section)}
        style={mergedStyles.section}
      >
        {closable && mergedCloseIcon}
        {coverNode}
        {headerNode}
        {descriptionNode}
        <div
          className={classNames(`${prefixCls}-footer`, mergedClassNames.footer)}
          style={mergedStyles.footer}
        >
          {total > 1 && (
            <div
              className={classNames(`${prefixCls}-indicators`, mergedClassNames.indicators)}
              style={mergedStyles.indicators}
            >
              {mergedIndicatorNode}
            </div>
          )}
          <div
            className={classNames(`${prefixCls}-actions`, mergedClassNames.actions)}
            style={mergedStyles.actions}
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
