import React from 'react';
import classNames from 'classnames';

import { DatePickerProps } from '..';

export default function useCssVarPanelRender({
  panelRender,
  wrapCSSVar,
  cssVarCls,
}: {
  panelRender: DatePickerProps['panelRender'];
  wrapCSSVar: (node: React.ReactElement) => React.ReactElement;
  cssVarCls: string;
}) {
  return (panelNode: React.ReactNode) => {
    const sourcePanelNode = panelNode as React.ReactElement<HTMLDivElement>;
    return panelRender
      ? panelRender(
          wrapCSSVar(
            React.cloneElement(sourcePanelNode, {
              className: classNames(sourcePanelNode.props.className, cssVarCls),
            }),
          ),
        )
      : panelNode;
  };
}
