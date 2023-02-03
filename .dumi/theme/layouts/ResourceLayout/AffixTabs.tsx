import * as React from 'react';
import throttle from 'lodash/throttle';
import { Tabs } from 'antd';
import { css } from '@emotion/react';
import scrollTo from '../../../../components/_util/scrollTo';
import useSiteToken from '../../../hooks/useSiteToken';

const useStyle = () => {
  const { token } = useSiteToken();

  const { boxShadowSecondary, antCls } = token;

  return {
    affixTabs: css`
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      z-index: 11;
      padding: 0 40px;
      background: #fff;
      box-shadow: ${boxShadowSecondary};
      transform: translate3d(0, -100%, 0);
      opacity: 0;
      transition: opacity 0.3s, transform 0.3s;

      ${antCls}-tabs {
        max-width: 1208px;
        margin: 0 auto;

        ${antCls}-tabs-nav {
          margin: 0;

          &::before {
            border-bottom-color: transparent;
          }

          ${antCls}-tabs-tab {
            padding: 21px 0;
          }
        }
      }
    `,
    affixTabsFixed: css`
      transform: translate3d(0, 0, 0);
      opacity: 1;
    `,
  };
};

const VIEW_BALANCE = 32;

export default () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const idsRef = React.useRef<string[]>([]);
  const [loaded, setLoaded] = React.useState(false);
  const [fixedId, setFixedId] = React.useState<string | null>(null);

  const styles = useStyle();

  function scrollToId(id: string) {
    const targetNode = document.getElementById(id);

    if (targetNode) {
      const newTop = targetNode.offsetTop - containerRef.current!.offsetHeight - VIEW_BALANCE;
      scrollTo(newTop);
    }
  }

  React.useEffect(() => {
    idsRef.current = Array.from(document.querySelectorAll('h2[id]')).map(({ id }) => id);
    setLoaded(true);
  }, []);

  React.useEffect(() => {
    const hashId = decodeURIComponent((location.hash || '').slice(1));
    if (hashId) {
      scrollToId(hashId);
    }
  }, [loaded]);

  const onSyncAffix = React.useMemo(() => {
    function doSync() {
      const { scrollY } = window;
      const containerHeight = containerRef.current!.offsetHeight;

      for (let i = idsRef.current.length - 1; i >= 0; i -= 1) {
        const id = idsRef.current[i];
        const current = document.getElementById(id)!;
        const offsetTop = current.offsetTop - containerHeight - VIEW_BALANCE;

        if (offsetTop <= scrollY) {
          setFixedId(id);
          return;
        }
      }

      setFixedId(null);
    }

    return throttle(doSync);
  }, []);

  React.useEffect(() => {
    window.addEventListener('scroll', onSyncAffix);
    window.addEventListener('resize', onSyncAffix);
    onSyncAffix();

    return () => {
      window.removeEventListener('scroll', onSyncAffix);
      window.removeEventListener('resize', onSyncAffix);
    };
  }, []);

  return (
    <div css={[styles.affixTabs, fixedId && styles.affixTabsFixed]} ref={containerRef}>
      <Tabs
        activeKey={fixedId}
        onChange={(key) => {
          scrollToId(key);
        }}
        items={idsRef.current.map((id) => ({
          key: id,
          label: <span style={{ textTransform: 'capitalize' }}>{id.replace(/-/g, ' ')}</span>,
        }))}
      />
    </div>
  );
};
