import * as React from 'react';

export default function usePatchElement(): [
  React.ReactElement[],
  (element: React.ReactElement) => Function,
] {
  const [elements, setElements] = React.useState<React.ReactElement[]>([]);

  function patchElement(element: React.ReactElement) {
    setElements(originElements => [...originElements, element]);

    return () => {
      setElements(originElements => originElements.filter(ele => ele !== element));
    };
  }

  return [elements, patchElement];
}
