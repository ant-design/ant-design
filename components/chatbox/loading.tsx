/* eslint-disable react/no-array-index-key */
import React from 'react';

interface LoadingProps {
  prefixCls: string;
}

const Loading: React.FC<LoadingProps> = (props) => {
  const { prefixCls } = props;
  return (
    <span className={`${prefixCls}-dot`}>
      <svg height="1em" viewBox="0 0 100 40">
        <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
          <g transform="translate(-100, -71)">
            <g transform="translate(95, 71)">
              <g transform="translate(5, 0)">
                {Array.from({ length: 3 }).map<React.ReactNode>((_, i) => (
                  <rect
                    key={`dot-item-${i}`}
                    fill="currentColor"
                    x={20 + i * 26}
                    y="16"
                    width="8"
                    height="8"
                    rx="2"
                  >
                    <animate
                      attributeName="y"
                      from="16"
                      to="16"
                      dur="2s"
                      begin={`${i * 0.2}s`}
                      repeatCount="indefinite"
                      values="16; 6; 26; 16; 16"
                      keyTimes="0; 0.1; 0.3; 0.4; 1"
                    />
                  </rect>
                ))}
              </g>
            </g>
          </g>
        </g>
      </svg>
    </span>
  );
};

if (process.env.NODE_ENV !== 'production') {
  Loading.displayName = 'Loading';
}

export default Loading;
