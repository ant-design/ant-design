import React, { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';
import type { TiltOptions } from 'vanilla-tilt';

interface TiltProps extends React.HTMLAttributes<HTMLDivElement> {
  options?: TiltOptions;
}

// https://micku7zu.github.io/vanilla-tilt.js/index.html
const defaultTiltOptions: TiltOptions = {
  scale: 1.02,
  max: 8,
  speed: 1500,
  glare: true,
  'max-glare': 0.8,
};

const Tilt: React.FC<TiltProps> = ({ options, ...props }) => {
  const node = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (node.current) {
      VanillaTilt.init(node.current, {
        ...defaultTiltOptions,
        ...options,
      });
    }
    return () => {
      (node.current as any)?.vanillaTilt.destroy();
    };
  }, []);
  return <div ref={node} {...props} />;
};

export default Tilt;
