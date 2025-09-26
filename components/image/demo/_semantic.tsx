import React from 'react';
import { Flex, Image, theme } from 'antd';
import type { ImageProps } from 'antd';
import type { ImageProps as RcImageProps } from '@rc-component/image';
import { createStyles, css } from 'antd-style';
import classnames from 'classnames';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const useStyle = createStyles(() => ({
  cover: css`
    &.semantic-mark-active {
      opacity: 1;
    }
  `,
}));

const locales = {
  cn: {
    root: '根元素，设置相对定位和行内块布局样式',
    image: '图片元素，设置宽度、高度和垂直对齐样式',
    cover: '悬浮图片显示的提示元素，设置绝对定位、背景色、透明度和过渡动画样式',
    'popup.root': '预览根元素，设置固定定位、层级和背景遮罩样式',
    'popup.mask': '预览遮罩元素，设置绝对定位和半透明背景样式',
    'popup.body': '预览内容元素，设置flex布局、居中对齐和指针事件样式',
    'popup.footer': '预览页脚元素，设置绝对定位、居中布局和底部操作区域样式',
    'popup.actions': '预览操作组元素，设置flex布局、背景色、圆角和操作按钮样式',
  },
  en: {
    root: 'Root element, sets relative positioning and inline-block layout styles',
    image: 'Image element, sets width, height and vertical alignment styles',
    cover:
      'Image hover display prompt element, sets absolute positioning, background color, opacity and transition animation styles',
    'popup.root':
      'Preview root element, sets fixed positioning, z-index and background mask styles',
    'popup.mask':
      'Preview mask element, sets absolute positioning and semi-transparent background styles',
    'popup.body':
      'Preview body element, sets flex layout, center alignment and pointer event styles',
    'popup.footer':
      'Preview footer element, sets absolute positioning, center layout and bottom operation area styles',
    'popup.actions':
      'Preview actions group element, sets flex layout, background color, border radius and action button styles',
  },
};
interface ImagePropsBlock extends Omit<ImageProps, 'classNames'> {
  classNames?: RcImageProps['classNames'];
}

const Block: React.FC<Readonly<ImagePropsBlock>> = ({ classNames, ...restProps }) => {
  const holderRef = React.useRef<HTMLDivElement>(null);

  const { token } = theme.useToken();

  const { styles } = useStyle();

  return (
    <Flex vertical align="center" style={{ minHeight: '100%', width: '100%' }}>
      <Flex style={{ padding: token.padding, flex: 'none' }} justify="center">
        <Image
          width={200}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          classNames={{ ...classNames, cover: classnames(classNames?.cover, styles.cover) }}
          preview={{ getContainer: () => holderRef.current! }}
          {...restProps}
        />
      </Flex>
      <div style={{ flex: 1, position: 'relative', minHeight: 500, width: '100%' }} ref={holderRef}>
        <Image.PreviewGroup
          items={[
            'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
            'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
          ]}
          classNames={classNames}
          styles={{ popup: { root: { position: 'absolute' } } }}
          preview={{ getContainer: () => holderRef.current!, open: true }}
        />
      </div>
    </Flex>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Image"
      padding={false}
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'image', desc: locale.image },
        { name: 'cover', desc: locale.cover },
        { name: 'popup.root', desc: locale['popup.root'] },
        { name: 'popup.mask', desc: locale['popup.mask'] },
        { name: 'popup.body', desc: locale['popup.body'] },
        { name: 'popup.footer', desc: locale['popup.footer'] },
        { name: 'popup.actions', desc: locale['popup.actions'] },
      ]}
    >
      <Block />
    </SemanticPreview>
  );
};

export default App;
