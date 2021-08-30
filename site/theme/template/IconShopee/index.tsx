import * as React from 'react';
import Icon, * as AllIcons from 'infra-design-icons';
import './style.less';

const allIcons: { [key: string]: any } = AllIcons;
function isShopeeIcon(key: string) {
  return key.startsWith('I') && /[A-Z]/.test(key[1]);
}
export default function ShopeeIconDisplay() {
  const iconKeys = React.useMemo(() => Object.keys(AllIcons), []);
  const ShopeeIcons = React.useMemo(() => {
    return iconKeys.filter(isShopeeIcon).map(key => allIcons[key]);
  }, []);
  const fillRows = [1, 2, 3, 4, 5];
  return (
    <div>
      <h2>Shopee Icon - {ShopeeIcons.length} 个</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {ShopeeIcons.map((app, idx) => {
          return (
            <div className={'icon-item-box'}>
              <Icon component={app} key={idx} style={{ fontSize: 48, color: '#333' }}></Icon>
              <span style={{ color: '#999' }}>{app.render.displayName}</span>
            </div>
          );
        })}
        {new Array(5).fill('').map((v, i) => (
          <div key={i} className={'icon-item-box'} />
        ))}
      </div>
    </div>
  );
}
