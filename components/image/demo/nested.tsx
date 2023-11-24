import React from 'react';
import { Divider, Image, Modal } from 'antd';

const App: React.FC = () => (
  <Modal open>
    <Modal open>
      <Modal open>
        <Image
          width={200}
          src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          preview={{
            visible: true,
          }}
        />
        <Divider />
        <Image.PreviewGroup
          preview={{
            visible: true,
          }}
        >
          <Image
            width={200}
            src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
          />
        </Image.PreviewGroup>
      </Modal>
    </Modal>
  </Modal>
);

export default App;
