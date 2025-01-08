import * as React from 'react';
import classNames from 'classnames';

import type { PresetColorType } from '../_util/colors';
import { isPresetColor } from '../_util/colors';
import type { LiteralUnion } from '../_util/type';
import { ConfigContext } from '../config-provider';
import useStyle from './style/ribbon';

type RibbonPlacement = 'start' | 'end';

type SemanticName = 'root' | 'text' | 'corner' | 'body';

export interface RibbonProps {
  className?: string;
  prefixCls?: string;
  style?: React.CSSProperties; // style of ribbon element, not the wrapper
  text?: React.ReactNode;
  color?: LiteralUnion<PresetColorType>;
  children?: React.ReactNode;
  placement?: RibbonPlacement;
  rootClassName?: string;
  classNames?: Partial<Record<SemanticName, string>>;
  styles?: Partial<Record<SemanticName, React.CSSProperties>>;
}

const Ribbon: React.FC<RibbonProps> = (props) => {
  const {
    className,
    prefixCls: customizePrefixCls,
    style,
    color,
    children,
    text,
    placement = 'end',
    rootClassName,
    styles,
    classNames: ribbonClassNames,
  } = props;
  const { getPrefixCls, direction, ribbon } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('ribbon', customizePrefixCls);

  const wrapperCls = `${prefixCls}-wrapper`;
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, wrapperCls);

  const colorInPreset = isPresetColor(color, false);
  const ribbonCls = classNames(
    prefixCls,
    `${prefixCls}-placement-${placement}`,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-color-${color}`]: colorInPreset,
    },
    className,
    ribbon?.className,
    ribbon?.classNames?.body,
    ribbonClassNames?.body,
  );

  const colorStyle: React.CSSProperties = {};
  const cornerColorStyle: React.CSSProperties = {};
  if (color && !colorInPreset) {
    colorStyle.background = color;
    cornerColorStyle.color = color;
  }
  return wrapCSSVar(
    <div
      className={classNames(
        wrapperCls,
        rootClassName,
        hashId,
        cssVarCls,
        ribbonClassNames?.root,
        ribbon?.classNames?.root,
      )}
      style={{ ...ribbon?.styles?.root, ...styles?.root }}
    >
      {children}
      <div
        className={classNames(ribbonCls, hashId)}
        style={{
          ...colorStyle,
          ...ribbon?.styles?.body,
          ...ribbon?.style,
          ...styles?.body,
          ...style,
        }}
      >
        <span
          className={classNames(
            `${prefixCls}-text`,
            ribbonClassNames?.text,
            ribbon?.classNames?.text,
          )}
          style={{ ...ribbon?.styles?.text, ...styles?.text }}
        >
          {text}
        </span>
        <div
          className={classNames(
            `${prefixCls}-corner`,
            ribbonClassNames?.corner,
            ribbon?.classNames?.corner,
          )}
          style={{ ...cornerColorStyle, ...ribbon?.styles?.corner, ...styles?.corner }}
        />
      </div>
    </div>,
  );
};

if (process.env.NODE_ENV !== 'production') {
  Ribbon.displayName = 'Ribbon';
}

export default Ribbon;
