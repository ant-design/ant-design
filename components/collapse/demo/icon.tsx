import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';

// Icons from third-party libraries (e.g. lucide, react-icons) render as a bare `<svg>`
// rather than an `.anticon` wrapper. It stays vertically centred with the title text.
const ChartIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <path d="M3 3v18h18" />
    <path d="M7 14l4-4 3 3 5-6" />
  </svg>
);

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: (
      <>
        <SmileOutlined /> Panel with an Ant Design icon
      </>
    ),
    children: <p>{text}</p>,
  },
  {
    key: '2',
    label: (
      <>
        <ChartIcon /> Panel with a third-party icon
      </>
    ),
    children: <p>{text}</p>,
  },
];

const App: React.FC = () => <Collapse defaultActiveKey={['1']} items={items} />;

export default App;
