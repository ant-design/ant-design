import React from 'react';

const BrowserFrame: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="browser-mockup with-url">{children}</div>
);

export default BrowserFrame;
