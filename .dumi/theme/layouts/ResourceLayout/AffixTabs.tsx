import * as React from 'react';
import { Tabs } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import throttle from 'lodash/throttle';

import scrollTo from '../../../../components/_util/scrollTo';

const listenerEvents = ['scroll', 'resize'] as const;

const useStyle = createStyles(({ token, css }) => {
  const { boxShadowSecondary, antCls } = token;

  return {
    affixTabs: css`
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      z-index: 1001;
      padding: 0 40px;
      background: #fff;
      box-shadow: ${boxShadowSecondary};
      transform: translate3d(0, -100%, 0);
      opacity: 0;
      transition:
        opacity 0.3s,
        transform 0.3s;

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
    span: css`
      text-transform: capitalize;
    `,
  };
});

const VIEW_BALANCE = 32;

const AffixTabs: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const idsRef = React.useRef<string[]>([]);
  const [loaded, setLoaded] = React.useState(false);
  const [fixedId, setFixedId] = React.useState<string | undefined>(undefined);

  const {
    styles: { affixTabs, affixTabsFixed, span },
  } = useStyle();

  function scrollToId(id: string) {
    const targetNode = document.getElementById(id);

    if (targetNode) {
      const newTop = targetNode.offsetTop - containerRef.current!.offsetHeight - VIEW_BALANCE;
      scrollTo(newTop);
    }
  }

  React.useEffect(() => {
    const nodeList = document.querySelectorAll<HTMLHeadingElement>('h2[id]');
    idsRef.current = Array.from(nodeList).map<string>(({ id }) => id);
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

      setFixedId(undefined);
    }

    return throttle(doSync);
  }, []);

  React.useEffect(() => {
    listenerEvents.forEach((event) => window.addEventListener(event, onSyncAffix));
    onSyncAffix();
    return () => {
      listenerEvents.forEach((event) => window.removeEventListener(event, onSyncAffix));
    };
  }, []);

  return (
    <div className={classNames(affixTabs, fixedId && affixTabsFixed)} ref={containerRef}>
      <Tabs
        activeKey={fixedId}
        centered
        size="large"
        onChange={scrollToId}
        items={idsRef.current.map((id) => ({
          key: id,
          label: <span className={span}>{id.replace(/-/g, ' ')}</span>,
        }))}
      />
    </div>
  );
};

export default AffixTabs;
