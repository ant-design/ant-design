import * as React from 'react';
import { Card, Row, Col } from '@allenai/varnish';
import './MorePage.less';

interface MoreProps {
  title: string;
  description: string;
  date: string;
  img: string;
  source: 'zhihu' | 'yuque';
  href: string;
}

const SourceImages = {
  zhihu: 'https://gw.alipayobjects.com/zos/basement_prod/5f4e1fd0-d255-4309-b181-a3715a720ebe.svg',
  yuque: 'https://gw.alipayobjects.com/zos/basement_prod/53e7a5b8-c9f4-45a4-8378-cbf50f2dd0d0.svg',
};

const MORE_LIST: MoreProps[] = [
  {
    title: '揭密可视化专家配色秘笈',
    description:
      '颜色搭配不仅可以传递出美感，颜色还可以通过不同的组合排序，形成一门新的界面语言，讲述数据的故事。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*M7rLR5follIAAAAAAAAAAABkARQnAQ',
    date: '2020-04-02',
    source: 'zhihu',
    href: 'https://zhuanlan.zhihu.com/p/112540818',
  },
  {
    title: 'HiTu 插画资产设计分享',
    description:
      '分享一下我们在做 HiTu 插画设计的一些过程和方法，希望能给同样做插画资产的同学带来帮助与启发。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*cJdyS4KVDlgAAAAAAAAAAABkARQnAQ',
    date: '2020-03-16',
    source: 'zhihu',
    href: 'https://zhuanlan.zhihu.com/p/112541651',
  },
  {
    title: '从常用图表到 DashBoard 页面模板，懒人套餐请享用吧！',
    description: 'Ant Design 4.0 和 AntV 的重磅产品 G2 4.0 发布之际，图表的样式也跟着大升级了哦。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*d_D0TLmwFLoAAAAAAAAAAABkARQnAQ',
    date: '2020-03-11',
    source: 'zhihu',
    href: 'https://zhuanlan.zhihu.com/p/111373360',
  },
  {
    title: '言之有序',
    description:
      '大到一个系统，小到一个按钮，背后的每一条规则既要思考设计的易用性，同时也要去推敲组织的合理性。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*J1SBR47PngwAAAAAAAAAAABkARQnAQ',
    date: '2020-03-03',
    source: 'zhihu',
    href: 'https://zhuanlan.zhihu.com/p/110442621',
  },
];

const MoreCard = ({ title, description, date, img, source, href }: MoreProps) => {
  return (
    <Col xs={24} sm={6}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          if (window.gtag) {
            window.gtag('event', '点击', {
              event_category: '首页文章',
              event_label: href,
            });
          }
        }}
      >
        <Card hoverable cover={<img alt={title} src={img} />} className="more-card">
          <Card.Meta title={title} description={description} />
          <div>
            {date}
            <span className="more-card-source">
              <img src={SourceImages[source]} alt={source} />
            </span>
          </div>
        </Card>
      </a>
    </Col>
  );
};

export default function MorePage() {
  return (
    <Row gutter={[24, 32]}>
      {MORE_LIST.map(more => (
        <MoreCard key={more.title} {...more} />
      ))}
    </Row>
  );
}
