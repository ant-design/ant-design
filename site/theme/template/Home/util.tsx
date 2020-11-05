/* eslint-disable import/prefer-default-export */
import * as React from 'react';

export function preLoad(list: string[]) {
  if (typeof window !== 'undefined') {
    // 图处预加载；
    const div = document.createElement('div');
    div.style.display = 'none';
    document.body.appendChild(div);
    list.forEach(src => {
      const img = new Image();
      img.src = src;
      div.appendChild(img);
    });
  }
}

const siteData: { [prefix: string]: any } = {};
export function useSiteData(keys: Array<string | number> = []): any {
  const prefix = keys.shift()!;

  const getData = () => {
    if (!siteData[prefix]) return null;
    return keys.reduce((data, key) => {
      return data[key];
    }, siteData[prefix]);
  };

  const [data, setData] = React.useState<any>(getData());

  React.useEffect(() => {
    if (!data && typeof fetch !== 'undefined') {
      fetch(`https://my-json-server.typicode.com/ant-design/website-data/${prefix}`)
        .then(res => res.json())
        .then((res: any) => {
          siteData[prefix] = res;
          setData(getData());
        });
    }
  }, []);

  return data;
}
