import React from 'react';
import { Watermark, Typography } from 'antd';

const { Paragraph } = Typography;

const App: React.FC = () => (
  <Watermark
    height={30}
    width={130}
    zIndex={11}
    image="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*lkAoRbywo0oAAAAAAAAAAAAADrJ8AQ/original"
  >
    <Typography>
      <Paragraph>
        The light-speed iteration of the digital world makes products more complex. However, human
        consciousness and attention resources are limited. Facing this design contradiction, the
        pursuit of natural interaction will be the consistent direction of Ant Design.
      </Paragraph>
      <Paragraph>
        Natural user cognition: According to cognitive psychology, about 80% of external information
        is obtained through visual channels. The most important visual elements in the interface
        design, including layout, colors, illustrations, icons, etc., should fully absorb the laws
        of nature, thereby reducing the user&apos;s cognitive cost and bringing authentic and smooth
        feelings. In some scenarios, opportunely adding other sensory channels such as hearing,
        touch can create a richer and more natural product experience.
      </Paragraph>
      <Paragraph>
        Natural user behavior: In the interaction with the system, the designer should fully
        understand the relationship between users, system roles, and task objectives, and also
        contextually organize system functions and services. At the same time, a series of methods
        such as behavior analysis, artificial intelligence and sensors could be applied to assist
        users to make effective decisions and reduce extra operations of users, to save users&apos;
        mental and physical resources and make human-computer interaction more natural.
      </Paragraph>
    </Typography>
    <img
      src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*zx7LTI_ECSAAAAAAAAAAAABkARQnAQ"
      alt="示例图片"
      style={{ zIndex: 10, maxWidth: '100%', position: 'relative' }}
    />
  </Watermark>
);

export default App;
