import * as React from 'react';
import { Panel } from '@rc-component/dialog';
import type { PanelProps } from '@rc-component/dialog/lib/Dialog/Content/Panel';
import { clsx } from 'clsx';

import { useMergeSemantic } from '../_util/hooks';
import { withPureRenderTheme } from '../_util/PurePanel';
import { ConfigContext } from '../config-provider';
import { useComponentConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import { ConfirmContent } from './ConfirmDialog';
import type { ModalFuncProps, ModalSemanticAllType } from './interface';
import { Footer, renderCloseIcon } from './shared';
import useStyle from './style';

export interface PurePanelProps
  extends Omit<PanelProps, 'prefixCls' | 'footer' | 'classNames' | 'styles'>,
    Pick<ModalFuncProps, 'type' | 'footer'> {
  prefixCls?: string;
  style?: React.CSSProperties;
  classNames?: ModalSemanticAllType['classNames'];
  styles?: ModalSemanticAllType['styles'];
}

const PurePanel: React.FC<PurePanelProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    closeIcon,
    closable,
    type,
    title,
    children,
    footer,
    classNames,
    styles,
    ...restProps
  } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);
  const {
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('modal');

  const rootPrefixCls = getPrefixCls();
  const prefixCls = customizePrefixCls || getPrefixCls('modal');
  const rootCls = useCSSVarCls(rootPrefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const [mergedClassNames, mergedStyles] = useMergeSemantic(
    [contextClassNames, classNames],
    [contextStyles, styles],
    {
      props,
    },
  );

  const confirmPrefixCls = `${prefixCls}-confirm`;

  // Choose target props by confirm mark
  let additionalProps: Partial<PanelProps> = {};
  if (type) {
    additionalProps = {
      closable: closable ?? false,
      title: '',
      footer: '',
      children: (
        <ConfirmContent
          {...props}
          prefixCls={prefixCls}
          confirmPrefixCls={confirmPrefixCls}
          rootPrefixCls={rootPrefixCls}
          content={children}
        />
      ),
    };
  } else {
    additionalProps = {
      closable: closable ?? true,
      title,
      footer: footer !== null && <Footer {...props} />,
      children,
    };
  }

  return (
    <Panel
      prefixCls={prefixCls}
      className={clsx(
        hashId,
        `${prefixCls}-pure-panel`,
        type && confirmPrefixCls,
        type && `${confirmPrefixCls}-${type}`,
        className,
        contextClassName,
        cssVarCls,
        rootCls,
        mergedClassNames.root,
      )}
      style={{ ...contextStyle, ...mergedStyles.root }}
      {...restProps}
      closeIcon={renderCloseIcon(prefixCls, closeIcon)}
      closable={closable}
      classNames={mergedClassNames}
      styles={mergedStyles}
      {...additionalProps}
    />
  );
};

export default withPureRenderTheme(PurePanel);
