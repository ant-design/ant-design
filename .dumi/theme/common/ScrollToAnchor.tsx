import { useEffect, useRef } from 'react';
import { useLocation } from 'dumi';

/**
 * copied from: https://dev.to/mindactuate/scroll-to-anchor-element-with-react-router-v6-38op
 * resolve: https://github.com/ant-design/ant-design/issues/45241
 */
function ScrollToAnchor() {
  const location = useLocation();
  const lastHash = useRef('');

  // listen to location change using useEffect with location as dependency
  // https://jasonwatmore.com/react-router-v6-listen-to-location-route-change-without-history-listen
  useEffect(() => {
    if (location.hash) {
      lastHash.current = location.hash.slice(1); // safe hash for further use after navigation
    }

    if (lastHash.current && document.getElementById(lastHash.current)) {
      setTimeout(() => {
        document
          .getElementById(lastHash.current)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        lastHash.current = '';
      }, 0);
    }
  }, [location]);

  return null;
}

export default ScrollToAnchor;
