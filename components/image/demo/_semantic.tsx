import React from 'react';
import { Flex, Image, theme } from 'antd';
import { createStyles, css } from 'antd-style';
import classnames from 'classnames';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const useStyle = createStyles(() => ({
  cover: css`
    &.semantic-mark-active {
      opacity: 1;
    }
  `,
}));

const locales = {
  cn: {
    root: '根元素',
    image: '图片元素',
    cover: '悬浮图片显示的提示元素',
    'popup.root': '预览根元素',
    'popup.mask': '预览遮罩元素',
    'popup.body': '预览内容元素',
    'popup.footer': '预览页脚元素',
    'popup.actions': '预览操作组元素',
  },
  en: {
    root: 'Root element',
    image: 'Image element',
    cover: 'Image hover display prompt element',
    'popup.root': 'Preview root element',
    'popup.mask': 'Preview mask element',
    'popup.body': 'Preview body element',
    'popup.footer': 'Preview footer element',
    'popup.actions': 'Preview actions group element',
  },
};

const Block = ({ classNames, ...restProps }: any) => {
  const holderRef = React.useRef<HTMLDivElement>(null);

  const { token } = theme.useToken();

  const { styles } = useStyle();

  return (
    <Flex
      vertical
      align="center"
      style={{
        minHeight: '100%',
        width: '100%',
      }}
    >
      <Flex style={{ padding: token.padding, flex: 'none' }} justify="center">
        <Image
          width={200}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          classNames={{
            ...classNames,
            cover: classnames(classNames.cover, styles.cover),
          }}
          preview={{
            getContainer: () => holderRef.current,
          }}
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
          styles={{
            popup: {
              root: { position: 'absolute' },
            },
          }}
          preview={{
            getContainer: () => holderRef.current!,
            open: true,
          }}
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
