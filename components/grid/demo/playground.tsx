import React, { useState } from 'react';
import { Col, Row, Slider } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles((props) => {
  const { css, cssVar } = props;
  return {
    colContainer: css`
      border: 0;
      padding-block: 0 !important;
      background-color: transparent !important;
    `,
    box: css`
      height: 120px;
      font-size: ${cssVar.fontSize};
      line-height: 120px;
      background-color: #0092ff;
      border-radius: ${cssVar.borderRadiusSM};
    `,
    code: css`
      direction: ltr;
      padding: ${cssVar.paddingXS} ${cssVar.padding};
      font-size: ${cssVar.fontSize};
      background-color: #f9f9f9;
      border-radius: ${cssVar.borderRadius};
    `,
  };
});

const gutters: Record<PropertyKey, number> = {};
const vgutters: Record<PropertyKey, number> = {};
const colCounts: Record<PropertyKey, number> = {};

[8, 16, 24, 32, 40, 48].forEach((value, i) => {
  gutters[i] = value;
});

[8, 16, 24, 32, 40, 48].forEach((value, i) => {
  vgutters[i] = value;
});

[2, 3, 4, 6, 8, 12].forEach((value, i) => {
  colCounts[i] = value;
});

const App: React.FC = () => {
  const { styles } = useStyles();

  const [gutterKey, setGutterKey] = useState(1);
  const [vgutterKey, setVgutterKey] = useState(1);
  const [colCountKey, setColCountKey] = useState(2);

  const cols: React.ReactNode[] = [];
  const colCount = colCounts[colCountKey];
  let colCode = '';
  for (let i = 0; i < colCount; i++) {
    cols.push(
      <Col className={styles.colContainer} key={i.toString()} span={24 / colCount}>
        <div className={styles.box}>Column</div>
      </Col>,
    );
    colCode += `  <Col span={${24 / colCount}} />\n`;
  }

  return (
    <>
      <span>Horizontal Gutter (px): </span>
      <div style={{ width: '50%' }}>
        <Slider
          min={0}
          max={Object.keys(gutters).length - 1}
          value={gutterKey}
          onChange={setGutterKey}
          marks={gutters}
          step={null}
          tooltip={{ formatter: (value) => gutters[value as number] }}
        />
      </div>
      <span>Vertical Gutter (px): </span>
      <div style={{ width: '50%' }}>
        <Slider
          min={0}
          max={Object.keys(vgutters).length - 1}
          value={vgutterKey}
          onChange={setVgutterKey}
          marks={vgutters}
          step={null}
          tooltip={{ formatter: (value) => vgutters[value as number] }}
        />
      </div>
      <span>Column Count:</span>
      <div style={{ width: '50%', marginBottom: 48 }}>
        <Slider
          min={0}
          max={Object.keys(colCounts).length - 1}
          value={colCountKey}
          onChange={setColCountKey}
          marks={colCounts}
          step={null}
          tooltip={{ formatter: (value) => colCounts[value as number] }}
        />
      </div>
      <Row gutter={[gutters[gutterKey], vgutters[vgutterKey]]}>
        {cols}
        {cols}
      </Row>
      Another Row:
      <Row gutter={[gutters[gutterKey], vgutters[vgutterKey]]}>{cols}</Row>
      <pre
        className={styles.code}
      >{`<Row gutter={[${gutters[gutterKey]}, ${vgutters[vgutterKey]}]}>\n${colCode}\n${colCode}</Row>`}</pre>
      <pre
        className={styles.code}
      >{`<Row gutter={[${gutters[gutterKey]}, ${vgutters[vgutterKey]}]}>\n${colCode}</Row>`}</pre>
    </>
  );
};

export default App;
