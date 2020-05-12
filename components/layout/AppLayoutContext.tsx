import React from 'react';

/**
 * Different variants represent different application level layouts:
 *
 *  - The "app" variant is a layout with a left aligned navigation menu. This
 *    is traditionally used for applications with several levels of navigation.
 *
 *  - The "default" variant is a standard, horizontally centered application. This
 *    is a fairly conventional layout used for content  rich websites.
 */
export type AppLayoutVariant = 'app' | 'hcenter';

/**
 * Information captured about the current layout.
 */
interface AppLayoutSettings {
  /* The current, active variant. */
  appLayoutVariant: AppLayoutVariant;
  /* The current height of the header, which by default in Varnish collapses
       as the user scrolls. */
  currentHeaderHeight: number;
  /* A method allowing the header height to be set. */
  setHeaderHeight: (height: number) => void;
}

/**
 * This context is intended to allow information about the current, active
 * layout to be shared across various components at different levels of the tree.
 *
 * Generally speaking a single `<AppLayoutContext.Provider />` should be used
 * per page. More complex scenarios, however, might necessitate using multiple.
 */
export const AppLayoutContext = React.createContext<AppLayoutSettings>({
  appLayoutVariant: 'hcenter',
  currentHeaderHeight: 0,
  setHeaderHeight() {},
});

interface AppLayoutProviderProps {
  appLayoutVariant: AppLayoutVariant;
  children: React.ReactNode | React.ReactNodeArray;
}

/**
 * A default, stateful wrapper that makes it easy to set the current layout.
 *
 * Most of the time you should use this.
 */
export const DefaultAppLayoutProvider = ({
  appLayoutVariant,
  children,
}: AppLayoutProviderProps) => {
  const [currentHeaderHeight, setHeaderHeight] = React.useState(0);
  return (
    <AppLayoutContext.Provider
      value={{
        appLayoutVariant,
        currentHeaderHeight,
        setHeaderHeight,
      }}
    >
      {children}
    </AppLayoutContext.Provider>
  );
};
