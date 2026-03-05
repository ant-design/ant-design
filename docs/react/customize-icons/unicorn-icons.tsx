import React from 'react';
import { ConfigProvider } from 'antd';

import './bootstrap-icons.css';
import Examples from './examples';

const unicorn = <span>🦄</span>;

const unicornSpin = <span className="icon-spin">🦄</span>;

const Demo: React.FC = () => {
  return (
    <ConfigProvider
      icons={{
        closeIcon: unicorn,
        successIcon: unicorn,
        infoIcon: unicorn,
        warningIcon: unicorn,
        errorIcon: unicorn,
      }}
      alert={{
        successIcon: unicorn,
        infoIcon: unicorn,
        warningIcon: unicorn,
        errorIcon: unicorn,
        closeIcon: unicorn,
      }}
      breadcrumb={{
        separator: unicorn,
        dropdownIcon: unicorn,
      }}
      button={{
        loadingIcon: unicornSpin,
      }}
      cascader={{
        expandIcon: unicorn,
        loadingIcon: unicornSpin,
        clearIcon: unicorn,
        removeIcon: unicorn,
        suffixIcon: unicorn,
        searchIcon: unicorn,
      }}
      collapse={{
        expandIcon: () => unicorn,
      }}
      datePicker={{
        clearIcon: unicorn,
        suffixIcon: unicorn,
      }}
      drawer={{
        closeIcon: unicorn,
      }}
      floatButton={{
        backTopIcon: unicorn,
      }}
      floatButtonGroup={{
        closeIcon: unicorn,
      }}
      image={{
        preview: {
          closeIcon: unicorn,
        },
      }}
      modal={{
        closeIcon: unicorn,
        infoIcon: unicorn,
        successIcon: unicorn,
        errorIcon: unicorn,
        warningIcon: unicorn,
      }}
      notification={{
        closeIcon: unicorn,
      }}
      rangePicker={{
        separator: unicorn,
      }}
      table={{
        expandable: {
          expandIcon: () => unicorn,
        },
      }}
      tabs={{
        moreIcon: unicorn,
        addIcon: unicorn,
        removeIcon: unicorn,
      }}
      tag={{
        closeIcon: unicorn,
      }}
      timePicker={{
        clearIcon: unicorn,
        suffixIcon: unicorn,
      }}
      tour={{
        closeIcon: unicorn,
      }}
      transfer={{
        selectionsIcon: unicorn,
      }}
      treeSelect={{
        switcherIcon: () => unicorn,
      }}
    >
      <Examples />
    </ConfigProvider>
  );
};

export default Demo;
