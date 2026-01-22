import React from 'react';
import { ConfigProvider } from 'antd';

import './bootstrap-icons.css';
import Examples from './examples';

const unicorn = <span>🦄</span>;

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
        loadingIcon: unicorn,
      }}
      collapse={{
        expandIcon: () => unicorn,
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
