import * as React from 'react';
import { Upload } from 'antd';
import useFetch from './useFetch';

const App: React.FC = () => {
  const { data, loading, error } = useFetch('https://www.mocky.io/v2/5cc8019d300000980a055e76');

  return (
    <Upload>
      {loading && <div>Loading...</div>}
      {error && <div>Error</div>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </Upload>
  );
};

export default App;
