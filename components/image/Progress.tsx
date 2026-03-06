import * as React from 'react';
import { clsx } from 'clsx';

// Visually hidden styles for screen readers
const VISUALLY_HIDDEN_STYLE: React.CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

export type ProgressClassNames = {
  root?: string;
  content?: string;
  rail?: string;
  indicator?: string;
};

export type ProgressStyles = {
  root?: React.CSSProperties;
  content?: React.CSSProperties;
  rail?: React.CSSProperties;
  indicator?: React.CSSProperties;
};

export interface ProgressProps {
  prefixCls: string;
  percent?: number;
  render?: (progress: React.ReactNode, percent: number) => React.ReactNode;
  classNames?: ProgressClassNames;
  styles?: ProgressStyles;
  rootClassName?: string;
  rootStyle?: React.CSSProperties;
  width?: React.CSSProperties['width'];
  height?: React.CSSProperties['height'];
}

const Progress: React.FC<ProgressProps> = (props) => {
  const {
    prefixCls,
    percent,
    render: progressRender,
    classNames: progressClassNames,
    styles: progressStyles,
    rootClassName,
    rootStyle,
    width,
    height,
  } = props;

  // Check if percent is a valid finite number
  const hasPercent = typeof percent === 'number' && Number.isFinite(percent);

  // Calculate percent value (clamped to 0-100 for progress bar width)
  const percentValue = hasPercent ? Math.max(0, Math.min(100, Math.round(percent))) : 0;

  // Render progress bar (rail with ::before pseudo for track)
  const progressBar = hasPercent ? (
    <div
      className={clsx(`${prefixCls}-progress-rail`, progressClassNames?.rail)}
      style={
        {
          ...progressStyles?.rail,
          '--progress-percent': `${percentValue}%`,
        } as React.CSSProperties
      }
    />
  ) : null;

  // Render progress content
  const progressContent = progressRender ? (
    progressRender(progressBar, percentValue)
  ) : (
    <>
      {progressBar}
      {hasPercent && (
        <div
          className={clsx(`${prefixCls}-progress-indicator`, progressClassNames?.indicator)}
          style={progressStyles?.indicator}
        >
          {`${percentValue}%`}
        </div>
      )}
    </>
  );

  return (
    <div
      className={clsx(
        prefixCls,
        `${prefixCls}-progress-wrapper`,
        progressClassNames?.root,
        rootClassName,
      )}
      style={{
        width,
        height,
        ...rootStyle,
        ...progressStyles?.root,
      }}
      role={hasPercent ? 'progressbar' : undefined}
      aria-valuemin={hasPercent ? 0 : undefined}
      aria-valuemax={hasPercent ? 100 : undefined}
      aria-valuenow={hasPercent ? percentValue : undefined}
      aria-label={hasPercent ? `${percentValue}%` : undefined}
      aria-busy={!hasPercent ? true : undefined}
    >
      {/* Visually hidden live region for non-percent loading state */}
      {!hasPercent && (
        <span role="status" aria-live="polite" style={VISUALLY_HIDDEN_STYLE}>
          Loading
        </span>
      )}
      {/* Watercolor ink layers */}
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className={`${prefixCls}-progress-ink`} />
      ))}
      {/* Progress content */}
      <div
        className={clsx(`${prefixCls}-progress-content`, progressClassNames?.content)}
        style={progressStyles?.content}
      >
        {progressContent}
      </div>
    </div>
  );
};

if (process.env.NODE_ENV !== 'production') {
  Progress.displayName = 'ImageProgress';
}

export default Progress;
