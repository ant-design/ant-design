import { Select, Spin } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';

interface PropTypes { 
  initData?: Record<string, string>[]; 
  value: Record<string, string>[];
  setValue: Function 
}

const initData = [
  {
    customAttr: '雪山之王',
    label: ' 雪豹',
    value: 'snow lepoard',
  },
  {
    customAttr: '森林之王',
    label: '辛巴',
    value: 'senba',
  },
];

async function fetchList(username: string) {
  return new Promise((res) =>
    res([
      {
        customAttr: '天空之王',
        label: '火烈鸟',
        value: 'fire bird',
      },
      {
        customAttr: '深海之王',
        label: '美人鱼',
        value: 'beauty fish',
      },
    ]),
  );
}
const WrappedSelect = ({ initData = [], value = [], setValue }: PropTypes) => {
  const [options, setOptions] = useState<Record<string, string>>([]);
  const [fetching, setFetching] = useState<boolean>(false);

  useEffect(() => {
    if (initData?.length) {
      setValue(initData);
    }
  }, [initData, setValue]);

  const onSearch = useCallback(
    (name: string) => {
      setFetching(true);
      return fetchList(name).then((list) => {
        setOptions(list as Record<string, string>[]);
        setFetching(false);
      });
    },
    [fetchList],
  );

  const selectCallback = (newValue: Record<string, string>[], selectedList: Record<string, string>[]) => {
    const values = newValue?.map((v) => v.value);
    const newArr = [...selectedList, ...initData].filter((k) =>
      values.includes(k.value),
    );
    setValue(newArr);
  };

  const valueWidthAllAttrs = value.map((v: any) => ({
    ...v,
    label: `${v.label}(${v.customAttr})${v.value}`,
  }));
  const optionsWidthAllAttrs = options.map((v) => ({
    ...v,
    label: `${v.label}(${v.customAttr})${v.value}`,
  }));

  return (
    <div style={{ padding: 40 }}>
      <div style={{ marginBottom: 24 }}>
        当前选中的值为: {JSON.stringify(value)}
      </div>
      <Select
        labelInValue
        filterOption={false}
        mode="multiple"
        showSearch
        showArrow
        onSearch={onSearch}
        value={valueWidthAllAttrs}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        options={optionsWidthAllAttrs}
        onChange={selectCallback}
        style={{ width: 600 }}
      />
    </div>
  );
};
const SelectOriginOptions = () => {
  const [value, setValue] = useState([]);
  return (
    <WrappedSelect initData={initData} value={value} setValue={setValue} />
  );
};

export default SelectOriginOptions;

