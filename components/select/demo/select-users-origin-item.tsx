import React from "react";
import { Select, Spin } from "antd";
import debounce from "lodash/debounce";
import { useMemo, useRef, useState, useEffect } from "react";

const initData = [
  {
    deptName: "雪山之王",
    extProperty: {
      deptName: "大猫"
    },
    id: "0111111",
    outUserNo: "111111",
    realName: "雪山之王",
    tntInstId: "",
    userChannel: "motain",
    label: " 雪豹",
    value: "snow lepoard"
  },
  {
    deptName: "森林之王",
    extProperty: {
      deptName: "大猫"
    },
    id: "0111114",
    outUserNo: "111114",
    realName: "狮子王",
    tntInstId: "",
    userChannel: "forest",
    label: "辛巴",
    value: "senba"
  }
].map((v) => ({
  ...v,
  label: `${v.realName}(${v.deptName})${v.realName}`,
  value: v.outUserNo
}));

function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const fetchRef = useRef(0);
  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
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
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
}

// Usage of DebounceSelect

async function fetchUserList(username) {
  console.log("fetching user", username);
  return new Promise((res) =>
    res(
      [
        {
          deptName: "天空之王",
          extProperty: {
            deptName: "鸟"
          },
          id: "0111112",
          outUserNo: "111112",
          realName: "飞鸟",
          tntInstId: "",
          userChannel: "sky",
          label: "火烈鸟",
          value: "fire bird"
        },
        {
          deptName: "深海之王",
          extProperty: {
            deptName: "大鱼"
          },
          id: "0111113",
          outUserNo: "111113",
          realName: "bigfish",
          tntInstId: "",
          userChannel: "sea",
          label: "大美人鱼",
          value: "beauty fish"
        }
      ].map((v) => ({
        ...v,
        label: `${v.realName}(${v.deptName})${v.realName}`,
        value: v.outUserNo
      }))
    )
  );
}
const SelectUsers = ({ selectUserCallback, value, setValue }) => {
  // const [value, setValue] = useState([]);
  console.log(value, 111);

  return (
    <>
      当前选中的值为: {JSON.stringify(value)}
      <DebounceSelect
        mode="multiple"
        value={value}
        placeholder="Select users"
        fetchOptions={fetchUserList}
        onChange={(newValue, selectedList) => {
          // console.log(newValue, 8888);
          // setValue(arr);
          selectUserCallback?.({ newValue, selectedList });
        }}
        style={{
          width: "100%"
        }}
      />
    </>
  );
};
const AddSelectedOriginOptionsDemo = ({ initData }) => {
  const [value, setValue] = useState([]);
  const selectUserCallback = ({ newValue, selectedList }) => {
    console.log(newValue, selectedList, 8888);
    const values = newValue.map((v) => v.value);
    const newArr = [...selectedList, ...initData].filter((k) =>
      values.includes(k.value)
    );
    setValue(newArr);
  };
  useEffect(() => {
    if (initData?.length) {
      console.log("initData: ", initData);
      setValue(initData);
    }
  }, [initData]);
  return (
    <SelectUsers
      value={value}
      setValue={setValue}
      selectUserCallback={selectUserCallback}
    />
  );
};

const App = () => <AddSelectedOriginOptionsDemo initData={initData} />;

export default App;
