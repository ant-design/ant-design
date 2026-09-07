import React from 'react';
import { Col, Divider, Row } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles((props) => {
  const { css } = props;
  return {
    rowContainer: css`
      background-color: rgba(128, 128, 128, 0.08);
    `,
  };
});

const App: React.FC = () => {
  const { styles } = useStyles();
  return (
    <>
      <Divider titlePlacement="start">Normal</Divider>
      <Row className={styles.rowContainer}>
        <Col span={6} order={4}>
          1 col-order-4
        </Col>
        <Col span={6} order={3}>
          2 col-order-3
        </Col>
        <Col span={6} order={2}>
          3 col-order-2
        </Col>
        <Col span={6} order={1}>
          4 col-order-1
        </Col>
      </Row>
      <Divider titlePlacement="start">Responsive</Divider>
      <Row className={styles.rowContainer}>
        <Col span={6} xs={{ order: 1 }} sm={{ order: 2 }} md={{ order: 3 }} lg={{ order: 4 }}>
          1 col-order-responsive
        </Col>
        <Col span={6} xs={{ order: 2 }} sm={{ order: 1 }} md={{ order: 4 }} lg={{ order: 3 }}>
          2 col-order-responsive
        </Col>
        <Col span={6} xs={{ order: 3 }} sm={{ order: 4 }} md={{ order: 2 }} lg={{ order: 1 }}>
          3 col-order-responsive
        </Col>
        <Col span={6} xs={{ order: 4 }} sm={{ order: 3 }} md={{ order: 1 }} lg={{ order: 2 }}>
          4 col-order-responsive
        </Col>
      </Row>
    </>
  );
};

export default App;
