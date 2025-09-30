import React, { useRef, useState } from 'react';
import { Button, Flex, Space, Tour, Divider } from 'antd';
import type { TourProps, TourStepProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(() => ({
  root: {
    borderRadius: 4,
  },
  section: {
    borderRadius: 8,
  },
}));

const App: React.FC = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const [open, setOpen] = useState<boolean>(false);
  const [openFn, setOpenFn] = useState<boolean>(false);
  const { styles: classNames } = useStyles();

  const btnProps: {
    nextButtonProps: TourStepProps['nextButtonProps'];
    prevButtonProps: TourStepProps['prevButtonProps'];
  } = {
    nextButtonProps: {
      style: {
        border: '1px solid #CDC1FF',
        color: '#CDC1FF',
      },
    },
    prevButtonProps: {
      style: {
        backgroundColor: '#CDC1FF',
        color: '#fff',
      },
    },
  };

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
      prevButtonProps: {},
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

  const stylesObject: TourProps['styles'] = {
    mask: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    section: {
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      border: '2px solid #4096ff',
    },
    cover: {
      borderRadius: '12px 12px 0 0',
    },
  };

  const stylesFunction: TourProps['styles'] = (info) => {
    if (info.props.type === 'primary') {
      return {
        mask: {
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        },
        section: {
          backgroundColor: 'rgb(205,193,255, 0.8)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        },
        cover: {
          borderRadius: '12px 12px 0 0',
        },
      };
    }
    return {};
  };

  const sharedProps = {
    steps,
    classNames,
    arrow: false,
  };

  return (
    <Flex vertical gap="middle">
      <Flex gap="middle">
        <Button type="primary" onClick={() => setOpen(true)}>
          Begin Tour Object
        </Button>
        <Button type="primary" onClick={() => setOpenFn(true)}>
          Begin Tour Function
        </Button>
      </Flex>
      <Divider />
      <Tour {...sharedProps} open={open} onClose={() => setOpen(false)} styles={stylesObject} />
      <Tour
        {...sharedProps}
        steps={steps.map((s) => ({ ...s, ...btnProps }))}
        type="primary"
        open={openFn}
        onClose={() => setOpenFn(false)}
        styles={stylesFunction}
      />
      <Space>
        <Button ref={ref1} type="primary">
          Upload
        </Button>
        <Button ref={ref2}>Save</Button>
        <Button ref={ref3} type="dashed">
          Other Actions
        </Button>
      </Space>
    </Flex>
  );
};

export default App;
