import * as React from 'react';

export default function usePatchElement(): [
  React.ReactElement[],
  (element: React.ReactElement) => Function,
] {
  const [elements, setElements] = React.useState<React.ReactElement[]>([]);

  function patchElement(element: React.ReactElement) {
    // append a new element to elements (and create a new ref)
    setElements(originElements => [...originElements, element]);

    // return a function that removes the new element out of elements (and create a new ref)
    // it works a little like useEffect
    return () => {
      setElements(originElements => originElements.filter(ele => ele !== element));
    };
  }

  return [elements, patchElement];
}
