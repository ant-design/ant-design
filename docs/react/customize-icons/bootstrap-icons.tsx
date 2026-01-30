import React from 'react';
import { ConfigProvider } from 'antd';
import type { AntTreeNodeProps } from 'antd/es/tree';
import {
  ArrowRepeat,
  ArrowRight,
  ArrowUp,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  ExclamationCircle,
  InfoCircle,
  Plus,
  ThreeDots,
  XCircle,
  XLg,
} from 'react-bootstrap-icons';

import './bootstrap-icons.css';
import Examples from './examples';

const Demo: React.FC = () => {
  return (
    <ConfigProvider
      icons={{
        closeIcon: <XLg />,
        successIcon: <CheckCircle />,
        infoIcon: <InfoCircle />,
        warningIcon: <ExclamationCircle />,
        errorIcon: <XCircle />,
      }}
      alert={{
        successIcon: <CheckCircle />,
        infoIcon: <InfoCircle />,
        warningIcon: <ExclamationCircle />,
        errorIcon: <XCircle />,
        closeIcon: <XLg />,
      }}
      breadcrumb={{
        separator: <ArrowRight style={{ display: 'inline-block' }} />,
        dropdownIcon: <ChevronDown style={{ display: 'inline-block' }} />,
      }}
      button={{
        loadingIcon: <ArrowRepeat className="icon-spin" />,
      }}
      cascader={{
        expandIcon: <ChevronRight />,
        loadingIcon: <ArrowRepeat className="icon-spin" />,
      }}
      collapse={{
        expandIcon: (props) => <ChevronDown {...props} />,
      }}
      datePicker={{
        suffixIcon: <Calendar />,
      }}
      drawer={{
        closeIcon: <XLg />,
      }}
      floatButton={{
        backTopIcon: <ArrowUp />,
      }}
      floatButtonGroup={{
        closeIcon: <XLg />,
      }}
      image={{
        preview: {
          closeIcon: <XLg />,
        },
      }}
      modal={{
        closeIcon: <XLg />,
      }}
      notification={{
        closeIcon: <XLg />,
      }}
      rangePicker={{
        separator: <ArrowRight />,
      }}
      table={{
        expandable: {
          expandIcon: ({ expanded }) => <ChevronDown rotate={expanded ? 180 : 0} />,
        },
      }}
      tabs={{
        moreIcon: <ThreeDots />,
        addIcon: <Plus />,
        removeIcon: <XLg />,
      }}
      tag={{
        closeIcon: <XLg style={{ display: 'inline-block' }} />,
      }}
      timePicker={{
        suffixIcon: <Clock />,
      }}
      tour={{
        closeIcon: <XLg />,
      }}
      transfer={{
        selectionsIcon: <ChevronDown />,
      }}
      treeSelect={{
        switcherIcon: ({ expanded }: AntTreeNodeProps) => (
          <ChevronDown rotate={expanded ? 180 : 0} />
        ),
      }}
    >
      <Examples />
    </ConfigProvider>
  );
};

export default Demo;
