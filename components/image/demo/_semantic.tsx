import React from 'react';
import { Image } from 'antd';
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
    'preview.body': '预览内容元素',
  },
  en: {
    root: 'Root element',
    image: 'Image element',
    'preview.cover': 'Cover element',
    'preview.root': 'Preview root element',
    'preview.body': 'Preview body element',
  },
};

const Block = ({ classNames, ...restProps }: any) => {
  const divRef = React.useRef<HTMLDivElement>(null);

  const { styles } = useStyle();

  const [propClassNames, previewClassNames] = React.useMemo(() => {
    const previewPrefix = 'preview.';
    const propClassNames: Record<string, string> = {};
    const previewClassNames: Record<string, string> = {};
    if (classNames) {
      Object.keys(classNames).forEach((key) => {
        if (key.startsWith(previewPrefix)) {
          previewClassNames[key.replace(previewPrefix, '')] = classNames[key];
        } else {
          propClassNames[key] = classNames[key];
        }
      });
    }
    return [propClassNames, previewClassNames];
  }, [classNames]);

  return (
    <div ref={divRef}>
      <Image
        width={200}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        classNames={propClassNames}
        preview={{
          getContainer: () => divRef.current,
          classNames: {
            ...previewClassNames,
            cover: classnames(previewClassNames.cover, styles.cover),
          },
        }}
        {...restProps}
      />
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      padding={false}
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'image', desc: locale.image },
        { name: 'preview.cover', desc: locale['preview.cover'] },
        { name: 'preview.root', desc: locale['preview.root'] },
        { name: 'preview.body', desc: locale['preview.body'] },
      ]}
    >
      <Block />
    </SemanticPreview>
  );
};

export default App;
