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

const DemoBox: React.FC<React.PropsWithChildren<{ value: number }>> = (props) => {
  const { value, children } = props;
  return <p className={`height-${value}`}>{children}</p>;
};

const App: React.FC = () => {
  const { styles } = useStyles();
  return (
    <>
      <Divider titlePlacement="start">Align Top</Divider>
      <Row className={styles.rowContainer} justify="center" align="top">
        <Col span={4}>
          <DemoBox value={100}>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox value={50}>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox value={120}>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox value={80}>col-4</DemoBox>
        </Col>
      </Row>
      <Divider titlePlacement="start">Align Middle</Divider>
      <Row className={styles.rowContainer} justify="space-around" align="middle">
        <Col span={4}>
          <DemoBox value={100}>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox value={50}>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox value={120}>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox value={80}>col-4</DemoBox>
        </Col>
      </Row>
      <Divider titlePlacement="start">Align Bottom</Divider>
      <Row className={styles.rowContainer} justify="space-between" align="bottom">
        <Col span={4}>
          <DemoBox value={100}>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox value={50}>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox value={120}>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox value={80}>col-4</DemoBox>
        </Col>
      </Row>
    </>
  );
};

export default App;
