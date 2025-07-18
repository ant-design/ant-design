import { Button, Divider, Space, Tour } from 'antd';
import React, { useRef, useState } from 'react';
import type { TourProps } from 'antd';

const Content1: React.FC<{
  setCurrent: (current: number) => void;
  setOpen: (open: boolean) => void;
}> = ({ setCurrent, setOpen }) => {
  return (
    <div
      style={
        {
          backgroundColor: '#fff',
          padding: '10px',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        } as React.CSSProperties
      }
    >
      <Button onClick={() => setCurrent(1)}>Next Step</Button>
      <div
        style={
          {
            marginTop: '10px',
            marginBottom: '10px',
            fontSize: '14px',
            color: '#666',
          } as React.CSSProperties
        }
      >
        <i style={{ fontWeight: 'bold', color: '#333' } as React.CSSProperties}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit
        </i>
        . Perspiciatis pariatur, quidem asperiores laboriosam nostrum commodi cumque aperiam ab
        consequuntur dolores natus accusantium neque incidunt blanditiis aliquam iure deserunt
        aspernatur nam!
      </div>
      <div
        style={
          {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          } as React.CSSProperties
        }
      >
        <span>1 / 2</span>
        <Button type="primary" onClick={() => setOpen(false)}>
          Close
        </Button>
      </div>
    </div>
  );
};

const Content2: React.FC<{
  setCurrent: (current: number) => void;
  setOpen: (open: boolean) => void;
}> = ({ setCurrent, setOpen }) => {
  return (
    <div
      style={
        {
          backgroundColor: '#fff',
          padding: '10px',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        } as React.CSSProperties
      }
    >
      <Button onClick={() => setCurrent(0)}>Last Step</Button>
      <img
        style={{ width: '100%', margin: '10px 0' } as React.CSSProperties}
        alt="tour.png"
        src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
      />
      <div
        style={
          {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          } as React.CSSProperties
        }
      >
        <span>2 / 2</span>
        <Button type="primary" onClick={() => setOpen(false)}>
          Finish
        </Button>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const [current, setCurrent] = useState<number>(0);

  const steps: TourProps['steps'] = [
    {
      contentRender: <Content1 setCurrent={setCurrent} setOpen={setOpen} />,
      target: () => ref1.current,
    },
    {
      contentRender: <Content2 setCurrent={setCurrent} setOpen={setOpen} />,
      target: () => ref2.current,
      placement: 'top',
    },
  ];
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Begin Tour
      </Button>
      <Divider />
      <Space>
        <Button ref={ref1}>Content Render 1</Button>
        <Button ref={ref2} type="primary">
          Content Render 2
        </Button>
      </Space>
      <Tour current={current} open={open} onClose={() => setOpen(false)} steps={steps} />
    </>
  );
};

export default App;
