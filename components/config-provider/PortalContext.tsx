import * as React from 'react';
import warning from '../_util/warning';

export function usePatchElement(): [
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

interface PortalContextProps {
  hasParent: boolean;
  patchElement: (element: React.ReactElement) => void;
}

const PortalContext = React.createContext<PortalContextProps>({
  hasParent: false,
  patchElement: () => {
    warning(
      false,
      'ConfigProvider',
      'You are using function with the ability of ConfigProvider. Please wrapper your App with at least one ConfigProvider.',
    );
  },
});

export const PortalContextProvider: React.FC<{}> = ({ children }) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const [elements, patchElement] = usePatchElement();
  const { hasParent, patchElement: patchParentElement } = React.useContext(PortalContext);

  return (
    <>
      <PortalContext.Provider
        value={{
          hasParent: true,
          patchElement: hasParent ? patchParentElement : patchElement,
        }}
      >
        {children}
      </PortalContext.Provider>
      {!hasParent && (
        <div ref={divRef} className="dev-only-holder">
          {elements}
        </div>
      )}
    </>
  );
};

export default PortalContext;
