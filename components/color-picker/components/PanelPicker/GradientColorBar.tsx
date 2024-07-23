import * as React from 'react';

import { PanelPickerContext } from '../../context';
import { GradientColorSlider } from '../ColorSlider';

/**
 * GradientColorBar will auto show when the mode is `gradient`.
 */
export default function GradientColorBar() {
  const { prefixCls, mode, value } = React.useContext(PanelPickerContext);

  const isGradient = mode === 'gradient';

  // ============================= Colors =============================
  const colors = React.useMemo(
    () =>
      value.getColors().map((info) => ({
        percent: info.percent,
        color: info.color.toRgbString(),
      })),
    [value],
  );

  // ============================= Render =============================
  if (!isGradient) {
    return null;
  }

  return (
    <div>
      <GradientColorSlider
        min={0}
        max={100}
        prefixCls={prefixCls}
        className={`${prefixCls}-gradient-slider`}
        colors={colors}
        color={null!}
        value={[]}
        onChange={() => {}}
        onChangeComplete={() => {}}
        disabled={false}
        type="alpha"
      />
    </div>
  );
}
