import * as React from 'react';

export type AvatarShape = 'circle' | 'square';

const ShapeContext = React.createContext<AvatarShape>('circle');

export interface ShapeContextProps {
  shape?: AvatarShape;
  children?: React.ReactNode;
}

export const ShapeContextProvider: React.FC<ShapeContextProps> = ({ children, shape }) => (
  <ShapeContext.Consumer>
    {originShape => (
      <ShapeContext.Provider value={shape || originShape}>{children}</ShapeContext.Provider>
    )}
  </ShapeContext.Consumer>
);

export default ShapeContext;
