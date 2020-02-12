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
export type LayoutVariant = 'app' | 'hcenter';

/**
 * Information captured about the current layout.
 */
interface LayoutSettings {
    /* The current, active variant. */
    layoutVariant: LayoutVariant;
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
 * Generally speaking a single `<LayoutContext.Provider />` should be used
 * per page. More complex scenarios, however, might necessitate using multiple.
 */
export const LayoutContext = React.createContext<LayoutSettings>({
    layoutVariant: 'hcenter',
    currentHeaderHeight: 0,
    setHeaderHeight() {},
});

interface LayoutProviderProps {
    layoutVariant: LayoutVariant;
    children: React.ReactNode | React.ReactNodeArray;
}

/**
 * A default, stateful wrapper that makes it easy to set the current layout.
 *
 * Most of the time you should use this.
 */
export const DefaultLayoutProvider = ({ layoutVariant, children }: LayoutProviderProps) => {
    const [currentHeaderHeight, setHeaderHeight] = React.useState(0);
    return (
        <LayoutContext.Provider
            value={{
                layoutVariant,
                currentHeaderHeight,
                setHeaderHeight,
            }}>
            {children}
        </LayoutContext.Provider>
    );
};
