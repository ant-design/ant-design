import React from 'react';
import { ConfigProvider, Divider, Typography } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

const blockContent = `AntV 是蚂蚁集团全新一代数据可视化解决方案，致力于提供一套简单方便、专业可靠、不限可能的数据可视化最佳实践。得益于丰富的业务场景和用户需求挑战，AntV 经历多年积累与不断打磨，已支撑整个阿里集团内外 20000+ 业务系统，通过了日均千万级 UV 产品的严苛考验。
我们正在基础图表，图分析，图编辑，地理空间可视化，智能可视化等各个可视化的领域耕耘，欢迎同路人一起前行。`;

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      components: {
        Typography: {
          fontWeightStrong: 700,
          titleMarginTop: '2.4em',
          titleMarginBottom: '1em',
          colorSuccessText: '#FF0000',
          colorWarningText: '#00FF00',
          colorErrorText: '#0000FF',
        },
      },
    }}
  >
    <Typography>
      <Title>Introduction</Title>
      <Paragraph>
        After massive project practice and summaries, Ant Design, a design language for background
        applications, is refined by Ant UED Team, which aims to{' '}
        <Text strong>
          uniform the user interface specs for internal background projects, lower the unnecessary
          cost of design differences and implementation and liberate the resources of design and
          front-end development
        </Text>
        .
      </Paragraph>
      <Title level={2}>Guidelines and Resources</Title>
      <Paragraph>
        We supply a series of design principles, practical patterns and high quality design
        resources (<Text code>Sketch</Text> and <Text code>Axure</Text>), to help people create
        their product prototypes beautifully and efficiently.
      </Paragraph>

      <Paragraph>
        <ul>
          <li>
            <Link href="/docs/spec/proximity">Principles</Link>
          </li>
          <li>
            <Link href="/docs/spec/overview">Patterns</Link>
          </li>
          <li>
            <Link href="/docs/resources">Resource Download</Link>
          </li>
        </ul>
      </Paragraph>

      <Paragraph>
        Press <Text keyboard>Esc</Text> to exit...
      </Paragraph>

      <Divider />

      <Title>介绍</Title>
      <Paragraph>
        随着商业化的趋势，越来越多的企业级产品对更好的用户体验有了进一步的要求。带着这样的一个终极目标，我们（蚂蚁集团体验技术部）经过大量的项目实践和总结，逐步打磨出一个服务于企业级产品的设计体系
        Ant Design。基于<Text mark>『确定』和『自然』</Text>
        的设计价值观，通过模块化的解决方案，降低冗余的生产成本，让设计者专注于
        <Text strong>更好的用户体验</Text>。
      </Paragraph>
      <Title level={2}>设计资源</Title>
      <Paragraph>
        我们提供完善的设计原则、最佳实践和设计资源文件（<Text code>Sketch</Text> 和
        <Text code>Axure</Text>），来帮助业务快速设计出高质量的产品原型。
      </Paragraph>

      <Paragraph>
        <ul>
          <li>
            <Link href="/docs/spec/proximity-cn">设计原则</Link>
          </li>
          <li>
            <Link href="/docs/spec/overview-cn">设计模式</Link>
          </li>
          <li>
            <Link href="/docs/resources-cn">设计资源</Link>
          </li>
        </ul>
      </Paragraph>

      <Paragraph>
        <blockquote>{blockContent}</blockquote>
        <pre>{blockContent}</pre>
      </Paragraph>

      <Paragraph>
        按<Text keyboard>Esc</Text>键退出阅读……
      </Paragraph>
    </Typography>

    <Typography.Text type="success">Success but red</Typography.Text>
    <Typography.Text type="warning">Warning but green</Typography.Text>
    <Typography.Text type="danger">Danger but blue</Typography.Text>
  </ConfigProvider>
);

export default App;
