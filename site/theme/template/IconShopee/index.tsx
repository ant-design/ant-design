import * as React from 'react';
import Icon, * as AllIcons from 'infra-design-icons';
import './style.less';

const allIcons: { [key: string]: any } = AllIcons;
function isShopeeIcon(key: string) {
  return key.startsWith('I') && /[A-Z]/.test(key[1]);
}
export default function ShopeeIconDisplay() {
  const iconKeys = React.useMemo(() => Object.keys(AllIcons), []);
  const ShopeeIcons = React.useMemo(
    () => iconKeys.filter(isShopeeIcon).map(key => allIcons[key]),
    [],
  );
  return (
    <div>
      <h2>Shopee Icon - {ShopeeIcons.length} 个</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {ShopeeIcons.map(app => (
          <div className={'icon-item-box'} key={app.render.displayName}>
            <Icon component={app} style={{ fontSize: 48, color: '#333' }} />
            <span style={{ color: '#999' }}>{app.render.displayName}</span>
          </div>
        ))}
        {new Array(5)
          .fill('xx')
          .map((v, i) => v + i)
          .map(v => (
            <div key={v} className={'icon-item-box'} />
          ))}
      </div>
    </div>
  );
}
