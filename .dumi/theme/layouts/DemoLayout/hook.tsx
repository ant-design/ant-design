import { useState, useEffect } from 'react';

interface SearchParamsInterface {
  [key: string]: string;
}

// Hook for listening to SearchParams without relying on libraries like react-router
// To handle the situation of static site generation
export default function useSearchParams() {
  const [searchParams, setSearchParams] = useState<SearchParamsInterface>({});

  useEffect(() => {
    const updateSearchParams = () => {
      const params = new URLSearchParams(window.location.search);
      const paramsObj: SearchParamsInterface = {};
      params.forEach((value, key) => {
        paramsObj[key] = value;
      });
      setSearchParams(paramsObj);
    };

    updateSearchParams();
    window.addEventListener('popstate', updateSearchParams);

    return () => {
      window.removeEventListener('popstate', updateSearchParams);
    };
  }, []);

  return searchParams;
}
