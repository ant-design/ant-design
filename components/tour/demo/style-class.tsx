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
        classNames={{
          // Object form - set className for each semantic part
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
        }}
        styles={{
          // Object form - set style for each semantic part
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
        }}
      />

      <Divider />

      <Tour
        open={false}
        steps={steps}
        classNames={{
          // Function form - dynamic className based on props
          root: ({ props }) =>
            `dynamic-tour-root ${props.type === 'primary' ? 'primary-tour' : 'default-tour'}`,
          mask: ({ props }) => (props.mask ? 'has-mask' : 'no-mask'),
          section: ({ props }) => `tour-section-${props.current || 0}`,
          title: ({ props }) => (props.type === 'primary' ? 'primary-title' : 'default-title'),
          description: ({ props }) => `description-step-${props.current || 0}`,
          footer: ({ props }) =>
            props.steps && props.steps.length > 1 ? 'multi-step-footer' : 'single-step-footer',
          actions: ({ props }) => `actions-${props.steps?.length || 0}-steps`,
          indicators: ({ props }) =>
            props.steps && props.steps.length > 3 ? 'many-indicators' : 'few-indicators',
        }}
        styles={{
          // Function form - dynamic style based on props
          root: ({ props }) => ({
            maxWidth: props.type === 'primary' ? 450 : 350,
            zIndex: props.zIndex || 1001,
          }),
          mask: ({ props }) => ({
            backgroundColor:
              props.type === 'primary' ? 'rgba(24, 144, 255, 0.1)' : 'rgba(0, 0, 0, 0.2)',
          }),
          section: ({ props }) => ({
            borderRadius: props.type === 'primary' ? 16 : 8,
            border: props.type === 'primary' ? '2px solid #1890ff' : '1px solid #d9d9d9',
          }),
          title: ({ props }) => ({
            color: props.type === 'primary' ? '#1890ff' : '#262626',
            fontSize: props.type === 'primary' ? 20 : 16,
          }),
          description: ({ props }) => ({
            color: props.type === 'primary' ? '#1890ff' : '#595959',
            fontSize: props.current === 0 ? 16 : 14,
          }),
          footer: ({ props }) => ({
            backgroundColor: props.type === 'primary' ? '#f6ffed' : '#fafafa',
            borderTop: `1px solid ${props.type === 'primary' ? '#b7eb8f' : '#f0f0f0'}`,
          }),
          actions: ({ props }) => ({
            gap: props.type === 'primary' ? 12 : 8,
          }),
          indicators: ({ props }) => ({
            opacity: props.current === 0 ? 1 : 0.7,
          }),
          indicator: ({ props }) => ({
            backgroundColor: props.type === 'primary' ? '#1890ff' : '#d9d9d9',
            width: props.type === 'primary' ? 10 : 6,
            height: props.type === 'primary' ? 10 : 6,
          }),
        }}
      />
    </>
  );
};

export default App;
