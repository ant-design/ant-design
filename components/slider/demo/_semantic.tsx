import React from 'react';
import { Slider } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素，设置相对定位、高度、边距、内边距、光标样式和触摸事件控制',
    track: '轨道选取条元素，设置绝对定位、背景色、圆角和过渡动画样式',
    tracks: '多段轨道容器元素，设置绝对定位和过渡动画样式',
    rail: '背景轨道元素，设置绝对定位、背景色、圆角和过渡动画样式',
    handle:
      '滑块控制点元素，设置绝对定位、尺寸、轮廓线、用户选择、背景色、边框阴影、圆角、光标样式和过渡动画',
  },
  en: {
    root: 'Root element with relative positioning, height, margin, padding, cursor style and touch action control',
    track:
      'Track selection bar element with absolute positioning, background color, border radius and transition animation styles',
    tracks:
      'Multi-segment track container element with absolute positioning and transition animation styles',
    rail: 'Background rail element with absolute positioning, background color, border radius and transition animation styles',
    handle:
      'Slider handle control element with absolute positioning, size, outline, user selection, background color, border shadow, border radius, cursor style and transition animation',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Slider"
      semantics={[
        { name: 'root', desc: locale.root, version: '5.23.0' },
        { name: 'track', desc: locale.track, version: '5.10.0' },
        { name: 'tracks', desc: locale.tracks, version: '5.10.0' },
        { name: 'rail', desc: locale.rail, version: '5.10.0' },
        { name: 'handle', desc: locale.handle, version: '5.10.0' },
      ]}
    >
      <Slider range defaultValue={[20, 30, 50]} style={{ width: '100%' }} />
    </SemanticPreview>
  );
};

export default App;
