import * as React from 'react';
import classNames from 'classnames';
import throttle from 'lodash/throttle';
import { Tabs } from 'antd';
import scrollTo from '../../../../components/_util/scrollTo';

import './AffixTabs.less';

const VIEW_BALANCE = 32;
const { TabPane } = Tabs;

export default () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const idsRef = React.useRef<string[]>([]);
  const [, forceUpdate] = React.useState<{}>({});
  const [fixedId, setFixedId] = React.useState<string | null>(null);

  React.useEffect(() => {
    idsRef.current = Array.from(document.querySelectorAll('h2[id]')).map(({ id }) => id);
    forceUpdate({});
  }, []);

  const onSyncAffix = React.useMemo(() => {
    function doSync() {
      const scrollY = window.scrollY;
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
    <div
      className={classNames('resource-affix-tabs', {
        'resource-affix-tabs-fixed': fixedId,
      })}
      ref={containerRef}
    >
      <Tabs
        activeKey={fixedId || undefined}
        onChange={key => {
          const newTop =
            document.getElementById(key)!.offsetTop -
            containerRef.current!.offsetHeight -
            VIEW_BALANCE;
          scrollTo(newTop);
        }}
      >
        {idsRef.current.map(id => (
          <TabPane key={id} tab={id.replace(/-/g, ' ')} />
        ))}
      </Tabs>
    </div>
  );
};
