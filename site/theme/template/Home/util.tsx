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

export function useSiteData<T>(language?: 'cn' | 'en'): T {
  const [data, setData] = React.useState<any>({});

  React.useEffect(() => {
    if (!data && typeof fetch !== 'undefined') {
      fetch(`https://cdn.jsdelivr.net/gh/ant-design/website-data@change-data/db.json`)
        .then(res => res.json())
        .then((result: any) => {
          setData(result);
        });
    }
  }, [language]);

  return data;
}
