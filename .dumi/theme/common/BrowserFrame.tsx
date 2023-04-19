import React from 'react';

const BrowserFrame = ({ children }: { children?: React.ReactNode }) => (
  <div className="browser-mockup with-url">{children}</div>
);

export default BrowserFrame;
