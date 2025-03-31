import React from 'react';
import { Flex, Image, theme } from 'antd';
import { createStyles, css } from 'antd-style';
import classnames from 'classnames';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
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
    'preview.cover': '悬浮提示元素',
    'preview.root': '预览根元素',
    'preview.mask': '预览遮罩元素',
    'preview.body': '预览内容元素',
    'preview.footer': '预览页脚元素',
    'preview.actions': '预览操作组',
  },
  en: {
    root: 'Root element',
    image: 'Image element',
    'preview.cover': 'Cover element',
    'preview.root': 'Preview root element',
    'preview.mask': 'Preview mask element',
    'preview.body': 'Preview body element',
    'preview.footer': 'Preview footer element',
    'preview.actions': 'Preview actions group',
  },
};

const Block = ({ classNames, ...restProps }: any) => {
  const holderRef = React.useRef<HTMLDivElement>(null);

  const { token } = theme.useToken();

  const { styles } = useStyle();

  const [propClassNames, previewClassNames] = React.useMemo(() => {
    const previewPrefix = 'preview.';
    const nextPropClassNames: Record<string, string> = {};
    const nextPreviewClassNames: Record<string, string> = {};
    if (classNames) {
      Object.keys(classNames).forEach((key) => {
        if (key.startsWith(previewPrefix)) {
          nextPreviewClassNames[key.replace(previewPrefix, '')] = classNames[key];
        } else {
          nextPropClassNames[key] = classNames[key];
        }
      });
    }
    return [nextPropClassNames, nextPreviewClassNames];
  }, [classNames]);

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
          classNames={propClassNames}
          preview={{
            getContainer: () => holderRef.current,
            classNames: {
              ...previewClassNames,
              cover: classnames(previewClassNames.cover, styles.cover),
            },
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
          preview={{
            getContainer: () => holderRef.current!,
            open: true,
            styles: {
              root: { position: 'absolute' },
            },
            classNames: previewClassNames,
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
        { name: 'preview.cover', desc: locale['preview.cover'] },
        { name: 'preview.root', desc: locale['preview.root'] },
        { name: 'preview.mask', desc: locale['preview.mask'] },
        { name: 'preview.body', desc: locale['preview.body'] },
        { name: 'preview.footer', desc: locale['preview.footer'] },
        { name: 'preview.actions', desc: locale['preview.actions'] },
      ]}
    >
      <Block />
    </SemanticPreview>
  );
};

export default App;
