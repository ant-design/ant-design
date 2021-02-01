/* eslint-disable import/prefer-default-export */
import * as React from 'react';
import { useDocumentVisibility } from 'ahooks';

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

const siteData: Record<string, any> = {};
export function useSiteData<T>(endpoint: string, language?: 'cn' | 'en'): T {
  const getData = () => {
    const endpointData = siteData[endpoint];
    if (!endpointData) return null;
    return language ? endpointData[language] : endpointData;
  };

  const [data, setData] = React.useState<any>(getData());
  const documentVisibility = useDocumentVisibility();

  React.useEffect(() => {
    if (!data && typeof fetch !== 'undefined' && documentVisibility) {
      fetch(`https://my-json-server.typicode.com/ant-design/website-data/${endpoint}`)
        .then(res => res.json())
        .then((res: any) => {
          siteData[endpoint] = res;
          setData(getData());
        });
    }
  }, [endpoint, documentVisibility]);

  return data;
}
