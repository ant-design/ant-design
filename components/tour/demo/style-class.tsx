import React, { useRef, useState } from 'react';
import { Button, Divider, Space, Tour } from 'antd';
import type { TourProps } from 'antd';

const App: React.FC = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const [open, setOpen] = useState<boolean>(false);

  const steps: TourProps['steps'] = [
    {
      title: 'Upload File',
      description: 'Put your files here.',
      cover: (
        <img
          alt="tour.png"
          src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
        />
      ),
      target: () => ref1.current,
    },
    {
      title: 'Save',
      description: 'Save your changes.',
      target: () => ref2.current,
    },
    {
      title: 'Other Actions',
      description: 'Click to see other actions.',
      target: () => ref3.current,
    },
  ];

  const classNamesObject: TourProps['classNames'] = {
    root: 'custom-tour-root',
    mask: 'custom-tour-mask',
    section: 'custom-tour-section',
    cover: 'custom-tour-cover',
    header: 'custom-tour-header',
    title: 'custom-tour-title',
    description: 'custom-tour-description',
    footer: 'custom-tour-footer',
    actions: 'custom-tour-actions',
    indicators: 'custom-tour-indicators',
    indicator: 'custom-tour-indicator',
  };

  const stylesObject: TourProps['styles'] = {
    root: {
      maxWidth: 400,
    },
    mask: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    section: {
      borderRadius: 12,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
    cover: {
      borderRadius: '12px 12px 0 0',
    },
    header: {
      padding: '16px 20px 8px',
    },
    title: {
      fontSize: 18,
      fontWeight: 600,
      color: '#1890ff',
    },
    description: {
      padding: '0 20px 16px',
      color: '#666',
      lineHeight: 1.6,
    },
    footer: {
      padding: '12px 20px 16px',
      borderTop: '1px solid #f0f0f0',
    },
    actions: {
      gap: 8,
    },
    indicators: {
      marginRight: 12,
    },
    indicator: {
      width: 8,
      height: 8,
      backgroundColor: '#d9d9d9',
    },
  };

  const classNamesFunction: TourProps['classNames'] = (info) => {
    return {
      root: `dynamic-tour-root ${info.props.type === 'primary' ? 'primary-tour' : 'default-tour'}`,
      mask: info.props.mask ? 'has-mask' : 'no-mask',
      section: `tour-section-${info.props.current || 0}`,
      title: info.props.type === 'primary' ? 'primary-title' : 'default-title',
      description: `description-step-${info.props.current || 0}`,
      footer:
        info.props.steps && info.props.steps.length > 1
          ? 'multi-step-footer'
          : 'single-step-footer',
      actions: `actions-${info.props.steps?.length || 0}-steps`,
      indicators:
        info.props.steps && info.props.steps.length > 3 ? 'many-indicators' : 'few-indicators',
    };
  };

  const stylesFunction: TourProps['styles'] = (info) => {
    return {
      root: {
        maxWidth: info.props.type === 'primary' ? 450 : 350,
        zIndex: info.props.zIndex || 1001,
      },
      mask: {
        backgroundColor:
          info.props.type === 'primary' ? 'rgba(24, 144, 255, 0.1)' : 'rgba(0, 0, 0, 0.2)',
      },
      section: {
        borderRadius: info.props.type === 'primary' ? 16 : 8,
        border: info.props.type === 'primary' ? '2px solid #1890ff' : '1px solid #d9d9d9',
      },
      title: {
        color: info.props.type === 'primary' ? '#1890ff' : '#262626',
        fontSize: info.props.type === 'primary' ? 20 : 16,
      },
      description: {
        color: info.props.type === 'primary' ? '#1890ff' : '#595959',
        fontSize: info.props.current === 0 ? 16 : 14,
      },
      footer: {
        backgroundColor: info.props.type === 'primary' ? '#f6ffed' : '#fafafa',
        borderTop: `1px solid ${info.props.type === 'primary' ? '#b7eb8f' : '#f0f0f0'}`,
      },
      actions: {
        gap: info.props.type === 'primary' ? 12 : 8,
      },
      indicators: {
        opacity: info.props.current === 0 ? 1 : 0.7,
      },
      indicator: {
        backgroundColor: info.props.type === 'primary' ? '#1890ff' : '#d9d9d9',
        width: info.props.type === 'primary' ? 10 : 6,
        height: info.props.type === 'primary' ? 10 : 6,
      },
    };
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Begin Tour
      </Button>

      <Divider />

      <Space>
        <Button ref={ref1} type="primary">
          Upload
        </Button>
        <Button ref={ref2}>Save</Button>
        <Button ref={ref3} type="dashed">
          Other Actions
        </Button>
      </Space>

      <Tour
        open={open}
        onClose={() => setOpen(false)}
        steps={steps}
        classNames={classNamesObject}
        styles={stylesObject}
      />

      <Divider />

      <Tour open={false} steps={steps} classNames={classNamesFunction} styles={stylesFunction} />
    </>
  );
};

export default App;
