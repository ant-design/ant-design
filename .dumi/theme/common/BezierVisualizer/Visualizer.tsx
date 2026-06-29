import React, { useId } from 'react';
import { theme } from 'antd';

export interface VisualizerProps {
  /**
   * 控制点坐标
   * @description 控制点坐标范围 [0, 1]
   * @example [0.78, 0.14, 0.15, 0.86]
   */
  controls: [number, number, number, number];
  width?: number;
  height?: number;
  duration?: number;
}

const Visualizer: React.FC<VisualizerProps> = (props) => {
  const {
    controls: [x1, y1, x2, y2],
    width = 180,
    height = width,
  } = props;
  const { token } = theme.useToken();

  // 坐标转换到SVG视图
  const scale = (val: number, axis: 'x' | 'y') =>
    axis === 'x' ? val * width : height - val * height;

  const gridStep = width / 5; // 网格步长
  const patternId = useId(); // 生成唯一ID

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <title>Cubic Bezier Visualizer</title>
      {/* 背景 */}
      <rect width="100%" height="100%" fill={token.colorBgContainer} />

      {/* 修正后的网格 */}
      <pattern id={patternId} width={gridStep} height={gridStep} patternUnits="userSpaceOnUse">
        <path
          d={`
          M 0 0 H ${gridStep}
          M 0 0 V ${gridStep}
          M ${gridStep} 0 V ${gridStep}
          M 0 ${gridStep} H ${gridStep}
        `}
          stroke={token.colorBorderSecondary}
          strokeWidth={token.controlOutlineWidth}
          shapeRendering="crispEdges"
        />
      </pattern>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />

      {/* 贝塞尔曲线路径 */}
      <path
        d={`
          M 0 ${height}
          C ${scale(x1, 'x')} ${scale(y1, 'y')},
            ${scale(x2, 'x')} ${scale(y2, 'y')},
            ${width} 0
        `}
        fill="none"
        stroke={token.colorPrimary}
        strokeWidth={token.controlOutlineWidth * 2}
      />

      {/* 控制点连线 */}
      <path
        d={`
          M 0 ${height}
          L ${scale(x1, 'x')} ${scale(y1, 'y')}
          L ${scale(x2, 'x')} ${scale(y2, 'y')}
          L ${width} 0
        `}
        fill="none"
        stroke={token.colorPrimaryActive}
        strokeDasharray="4 2"
        strokeWidth={token.controlOutlineWidth}
      />

      {/* 控制点 */}
      <circle cx={scale(x1, 'x')} cy={scale(y1, 'y')} r="5" fill={token['red-6']} />
      <circle cx={scale(x2, 'x')} cy={scale(y2, 'y')} r="5" fill={token['green-6']} />
    </svg>
  );
};

export default Visualizer;
