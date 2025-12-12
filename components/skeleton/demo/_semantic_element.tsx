import React, { useState } from 'react';
import { Divider, Flex, Segmented, Skeleton } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

interface PreviewContentProps {
  element: string;
  setElement: React.Dispatch<React.SetStateAction<string>>;
}

const COMPONENT_MAP: Record<string, React.ElementType> = {
  Avatar: Skeleton.Avatar,
  Button: Skeleton.Button,
  Input: Skeleton.Input,
  Node: Skeleton.Node,
  Image: Skeleton.Image,
};

const OPTIONS = [
  { value: 'Avatar', label: 'Avatar' },
  { value: 'Button', label: 'Button' },
  { value: 'Input', label: 'Input' },
  { value: 'Image', label: 'Image' },
  { value: 'Node', label: 'Node' },
];

const PreviewContent: React.FC<PreviewContentProps> = (props) => {
  const { element, setElement, ...rest } = props;
  const Element = COMPONENT_MAP[element];
  return (
    <Flex vertical style={{ width: 'fit-content', marginRight: 'auto' }}>
      <Segmented options={OPTIONS} value={element} onChange={setElement} />
      <Divider titlePlacement="start" plain>
        Preview
      </Divider>
      <Element {...rest} />
    </Flex>
  );
};

const locales = {
  cn: {
    root: '根元素',
    content: '内容元素',
  },
  en: {
    root: 'Root element',
    content: 'Content element',
  },
};

const App: React.FC = () => {
  const [element, setElement] = useState('Avatar');
  const [locale] = useLocale(locales);

  return (
    <SemanticPreview
      componentName={`Skeleton.${element}`}
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'content', desc: locale.content, version: '6.0.0' },
      ]}
    >
      <PreviewContent element={element} setElement={setElement} />
    </SemanticPreview>
  );
};

export default App;
