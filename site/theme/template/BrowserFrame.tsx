import React from 'react';

interface BrowserFrameProps {
  children?: React.ReactNode;
}

const BrowserFrame: React.FC<BrowserFrameProps> = ({ children }) => (
  <div className="browser-mockup with-url">{children}</div>
);

export default BrowserFrame;
