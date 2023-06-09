import { Select, Spin } from "antd";
import React, { useCallback, useEffect, useState } from "react";

interface PropTypes {
  initValues?: Record<string, string>[];
  value: Record<string, string>[];
  setValue: Function;
}

const initData = [
  {
    customAttr: "雪山之王",
    label: " 雪豹",
    value: "snow lepoard"
  },
  {
    customAttr: "森林之王",
    label: "辛巴",
    value: "senba"
  }
];

async function fetchList(username: string) {
  return new Promise((res) =>
    res([
      {
        customAttr: "天空之王",
        label: "火烈鸟",
        value: "fire bird"
      },
      {
        customAttr: "深海之王",
        label: "美人鱼",
        value: "beauty fish"
      },
      {
        customAttr: "自定义",
        label: `${username}`,
        value: "userName"
      }
    ])
  );
}
const WrappedSelect = ({
  initValues = [],
  value = [],
  setValue
}: PropTypes) => {
  const [options, setOptions] = useState<Record<string, string>[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);

  useEffect(() => {
    if (initValues?.length) {
      setValue(initValues);
    }
  }, [initValues, setValue]);

  const onSearch = useCallback((name: string) => {
    setFetching(true);
    return fetchList(name).then((list) => {
      setOptions(list as Record<string, string>[]);
      setFetching(false);
    });
  }, []);

  const selectCallback = (
    newValue: Record<string, string>[],
    selectedList: Record<string, string>[]
  ) => {
    const values = newValue?.map((v) => v.value);
    const newArr = [...selectedList, ...initValues].filter((k) =>
      values.includes(k.value)
    );
    setValue(newArr);
  };

  const valueWidthAllAttrs = value.map((v: any) => ({
    ...v,
    label: `${v.label}(${v.customAttr})${v.value}`
  }));
  const optionsWidthAllAttrs = options.map((v) => ({
    ...v,
    label: `${v.label}(${v.customAttr})${v.value}`
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
    <WrappedSelect initValues={initData} value={value} setValue={setValue} />
  );
};

export default SelectOriginOptions;
