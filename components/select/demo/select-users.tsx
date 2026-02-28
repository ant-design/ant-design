import React, { useMemo, useRef, useState } from 'react';
import { Avatar, Select, Spin } from 'antd';
import type { SelectProps } from 'antd';
import debounce from 'lodash/debounce';

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
}

function DebounceSelect<
  ValueType extends {
    key?: string;
    label: React.ReactNode;
    value: string | number;
    avatar?: string;
  } = any,
>({ fetchOptions, debounceTimeout = 300, ...props }: DebounceSelectProps<ValueType>) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<ValueType[]>([]);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return (
    <Select
      labelInValue
      showSearch={{ filterOption: false, onSearch: debounceFetcher }}
      notFoundContent={fetching ? <Spin size="small" /> : 'No results found'}
      {...props}
      options={options}
      optionRender={(option) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {option.data.avatar && <Avatar src={option.data.avatar} style={{ marginRight: 8 }} />}
          {option.label}
        </div>
      )}
    />
  );
}

// Usage of DebounceSelect
interface UserValue {
  label: string;
  value: string;
  avatar?: string;
}

async function fetchUserList(username: string): Promise<UserValue[]> {
  console.log('fetching user', username);
  return fetch(`https://660d2bd96ddfa2943b33731c.mockapi.io/api/users/?search=${username}`)
    .then((res) => res.json())
    .then((res) => {
      const results = Array.isArray(res) ? res : [];
      return results.map((user) => ({
        label: user.name,
        value: user.id,
        avatar: user.avatar,
      }));
    })
    .catch(() => {
      console.log('fetch mock data failed');
      return [];
    });
}

const App: React.FC = () => {
  const [value, setValue] = useState<UserValue[]>([]);

  return (
    <DebounceSelect
      mode="multiple"
      value={value}
      placeholder="Select users"
      fetchOptions={fetchUserList}
      style={{ width: '100%' }}
      onChange={(newValue) => {
        if (Array.isArray(newValue)) {
          setValue(newValue);
        }
      }}
    />
  );
};

export default App;
