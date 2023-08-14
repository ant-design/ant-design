import * as React from 'react';
import { useState } from 'react';
import { createStyles, css, useTheme } from 'antd-style';
import { Typography, Carousel } from 'antd';
import { getCarouselStyle } from '../util';

const useStyle = createStyles(() => {
  const { carousel } = getCarouselStyle();
  return {
    carousel,
    container: css`
      position: relative;
    `,
    title: css`
      position: absolute;
      top: 15%;
      z-index: 1;
      width: 100%;
      text-align: center;
    `,
  };
});

const mobileImageConfigList = [
  {
    imageSrc:
      'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*KsMrRZaciFcAAAAAAAAAAAAADrJ8AQ/original',
    titleColor: 'rgba(0,0,0,.88)',
  },
  {
    imageSrc:
      'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*3FkqR6XRNgoAAAAAAAAAAAAADrJ8AQ/original',
    titleColor: '#fff',
  },
  {
    imageSrc:
      'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*cSX_RbD3k9wAAAAAAAAAAAAADrJ8AQ/original',
    titleColor: '#fff',
  },
  {
    imageSrc:
      'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*MldsRZeax6EAAAAAAAAAAAAADrJ8AQ/original',
    titleColor: '#fff',
  },
  {
    imageSrc:
      'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*xCAmSL0xlZ8AAAAAAAAAAAAADrJ8AQ/original',
    titleColor: '#fff',
  },
  {
    imageSrc:
      'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*vCfCSbiI_VIAAAAAAAAAAAAADrJ8AQ/original',
    titleColor: '#fff',
  },
  {
    imageSrc:
      'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*xCAmSL0xlZ8AAAAAAAAAAAAADrJ8AQ/original',
    titleColor: '#fff',
  },
  {
    imageSrc:
      'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*BeDBTY9UnXIAAAAAAAAAAAAADrJ8AQ/original',
    titleColor: '#fff',
  },
  {
    imageSrc:
      'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*Q63XTbk8YaMAAAAAAAAAAAAADrJ8AQ/original',
    titleColor: '#fff',
  },
];

export interface MobileCarouselProps {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
}

export default function MobileCarousel(props: MobileCarouselProps) {
  const { styles } = useStyle();
  const { id, title, description } = props;
  const token = useTheme();
  const [currentSlider, setCurrentSlider] = useState<number>(0);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Typography.Title
          id={id}
          level={1}
          style={{
            fontWeight: 900,
            color: mobileImageConfigList[currentSlider].titleColor,
            // Special for the title
            fontFamily: `AliPuHui, ${token.fontFamily}`,
            fontSize: token.fontSizeHeading2,
          }}
        >
          {title}
        </Typography.Title>
        <Typography.Paragraph
          style={{
            marginBottom: token.marginXXL,
            color: mobileImageConfigList[currentSlider].titleColor,
          }}
        >
          {description}
        </Typography.Paragraph>
      </div>
      <Carousel className={styles.carousel} afterChange={setCurrentSlider}>
        {mobileImageConfigList.map((item, index) => (
          <div key={index}>
            <img src={item.imageSrc} alt="" style={{ width: '100%' }} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
