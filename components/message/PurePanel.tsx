import * as React from 'react';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import InfoCircleFilled from '@ant-design/icons/InfoCircleFilled';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import classNames from 'classnames';
import { Notice } from '@rc-component/notification';
import type { NoticeProps } from '@rc-component/notification/lib/Notice';

import { cloneElement } from '../_util/reactNode';
import useMergeSemantic from '../_util/hooks/useMergeSemantic';
import { useComponentConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import type { ArgsClassNamesType, ArgsStylesType, NoticeType, SemanticName } from './interface';
import useStyle from './style';

export const TypeIcon = {
  info: <InfoCircleFilled />,
  success: <CheckCircleFilled />,
  error: <CloseCircleFilled />,
  warning: <ExclamationCircleFilled />,
  loading: <LoadingOutlined />,
};

export interface PureContentProps {
  prefixCls: string;
  type?: NoticeType;
  icon?: React.ReactNode;
  children: React.ReactNode;
  classNames?: Partial<Record<SemanticName, string>>;
  styles?: Partial<Record<SemanticName, React.CSSProperties>>;
}

export const PureContent: React.FC<PureContentProps> = ({
  prefixCls,
  type,
  icon,
  children,
  classNames: pureContentClassNames,
  styles,
}) => {
  const iconElement = icon || (type && TypeIcon[type]);
  const iconNode: React.ReactNode = iconElement
    ? cloneElement(iconElement, (currentProps) => ({
        className: classNames(currentProps?.className, pureContentClassNames?.icon),
        style: { ...currentProps?.style, ...styles?.icon },
      }))
    : null;
  return (
    <div className={classNames(`${prefixCls}-custom-content`, type && `${prefixCls}-${type}`)}>
      {iconNode}
      <span className={pureContentClassNames?.content} style={styles?.content}>
        {children}
      </span>
    </div>
  );
};

export interface PurePanelProps
  extends Omit<NoticeProps, 'prefixCls' | 'eventKey' | 'classNames' | 'styles'>,
    Omit<PureContentProps, 'prefixCls' | 'children' | 'classNames' | 'styles'> {
  prefixCls?: string;
  classNames?: ArgsClassNamesType;
  styles?: ArgsStylesType;
}

/** @private Internal Component. Do not use in your production. */
const PurePanel: React.FC<PurePanelProps> = (props) => {
  const {
    prefixCls: staticPrefixCls,
    className,
    style,
    type,
    icon,
    content,
    classNames: messageClassNames,
    styles,
    ...restProps
  } = props;
  const {
    getPrefixCls,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('message');

  const prefixCls = staticPrefixCls || getPrefixCls('message');

  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    ArgsClassNamesType,
    ArgsStylesType,
    PurePanelProps
  >([contextClassNames, messageClassNames], [contextStyles, styles], undefined, {
    props,
  });

  return (
    <Notice
      {...restProps}
      prefixCls={prefixCls}
      className={classNames(
        contextClassName,
        mergedClassNames.root,
        className,
        hashId,
        `${prefixCls}-notice-pure-panel`,
        cssVarCls,
        rootCls,
      )}
      style={{ ...mergedStyles.root, ...contextStyle, ...style }}
      eventKey="pure"
      duration={null}
      content={
        <PureContent
          prefixCls={prefixCls}
          type={type}
          icon={icon}
          classNames={mergedClassNames}
          styles={mergedStyles}
        >
          {content}
        </PureContent>
      }
    />
  );
};

export default PurePanel;
