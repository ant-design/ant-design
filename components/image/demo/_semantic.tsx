import React from 'react';
import { Image } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    cover: '悬浮提示元素',
    'preview.root': '预览根元素',
    'preview.body': '预览内容元素',
  },
  en: {
    root: 'Root element',
    cover: 'Hover cover element',
    'preview.root': 'Preview root element',
    'preview.body': 'Preview body element',
  },
};

const Block = ({ classNames, ...restProps }: any) => {
  const divRef = React.useRef<HTMLDivElement>(null);

  const [propClassNames, previewClassNames] = React.useMemo(() => {
    // TODO: Split classNames object into classNames & previewClassNames with `preview.` prefix
  }, [classNames]);

  return (
    <div ref={divRef}>
      <Image
        width={200}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        preview={{
          getContainer: () => divRef.current,
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
        { name: 'cover', desc: locale.cover },
        { name: 'preview.root', desc: locale['preview.root'] },
        { name: 'preview.body', desc: locale['preview.body'] },
      ]}
    >
      <Block />
    </SemanticPreview>
  );
};

export default App;
