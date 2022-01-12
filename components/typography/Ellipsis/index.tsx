import * as React from 'react';

export interface EllipsisProps {
  enabled?: boolean;
  text?: React.ReactNode;
  /** `forceRenderExpanded` is used for ellipsis measure */
  suffix: (forceRenderExpanded?: boolean) => React.ReactNode;
  children: (cutChildren: React.ReactNode) => React.ReactNode;
}

export default ({ enabled, children, text, suffix }: EllipsisProps) => {
  const showChildren = children(
    <>
      {text}
      {suffix()}
    </>,
  );

  return (
    <>
      {showChildren}
      {/* Measure usage */}
      {enabled && (
        <div aria-hidden style={{ position: 'fixed', left: 0, top: 0, pointerEvents: 'none' }}>
          {children(
            <>
              {text}
              {suffix(true)}
            </>,
          )}
        </div>
      )}
    </>
  );
};
