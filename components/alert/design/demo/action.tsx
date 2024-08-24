import React from 'react';
import { Alert, Flex, Typography } from 'antd';

const Demo = () => {
  const [expandA, setExpandA] = React.useState(false);
  const [expandB, setExpandB] = React.useState(true);

  return (
    <Flex gap="large" vertical style={{ maxWidth: 600 }}>
      <Flex gap="middle" vertical>
        <div>关闭提示</div>
        <Alert showIcon closable message="你好！欢迎使用专业版，你可以根据自身需求添加业务模块。" />
        <Alert
          showIcon
          closable
          message="帮助信息"
          description="你好，由于你的良好信用，我们决定赠送你三个月产品会员，欲了解会员特权与活动请进首页会员专区查看。"
        />
      </Flex>
      <Flex gap="middle" vertical>
        <div>展开/收起提示</div>
        <Alert
          showIcon
          closable
          message={
            <div>
              <Typography.Paragraph ellipsis={!expandA && { rows: 2 }} style={{ marginBottom: 8 }}>
                提示信息超过2行时，可以使用将部分信息折叠，以减少空间占用。提示信息超过2行时，可以使用将部分信息折叠，以减少空间占用。提示信息超过2行时，可以使用将部分信息折叠，以减少空间占用。提示信息超过2行时，可以使用将部分信息折叠，以减少空间占用。提示信息超过2行时，可以使用将部分信息折叠，以减少空间占用。
              </Typography.Paragraph>
              <Typography.Link onClick={() => setExpandA((prev) => !prev)}>
                {expandA ? '收起' : '展开更多'}
              </Typography.Link>
            </div>
          }
          style={{ alignItems: 'baseline' }}
        />
        <Alert
          showIcon
          closable
          message={
            <div>
              <Typography.Paragraph ellipsis={!expandB && { rows: 2 }} style={{ marginBottom: 8 }}>
                提示信息超过2行时，可以使用将部分信息折叠，以减少空间占用。提示信息超过2行时，可以使用将部分信息折叠，以减少空间占用。提示信息超过2行时，可以使用将部分信息折叠，以减少空间占用。提示信息超过2行时，可以使用将部分信息折叠，以减少空间占用。提示信息超过2行时，可以使用将部分信息折叠，以减少空间占用。
              </Typography.Paragraph>
              <Typography.Link onClick={() => setExpandB((prev) => !prev)}>
                {expandB ? '收起' : '展开更多'}
              </Typography.Link>
            </div>
          }
          style={{ alignItems: 'baseline' }}
        />
      </Flex>
      <Flex gap="middle" vertical>
        <div>执行其他操作</div>
        <Alert
          showIcon
          closable
          message="提示信息不超过一行时，按钮放在信息右侧。"
          action={<Typography.Link>相关操作</Typography.Link>}
        />
        <Alert
          showIcon
          closable
          message={
            <div>
              <Typography.Paragraph style={{ marginBottom: 8 }}>
                提示信息超过一行，此时按钮按照从上至下的视觉流，放置在信息区下方，这样浏览起来更流畅，即先阅读提示信息，再根据信息判断执行什么操作。
              </Typography.Paragraph>
              <Flex gap={8}>
                <Typography.Link>相关操作1</Typography.Link>
                <Typography.Link>相关操作2</Typography.Link>
              </Flex>
            </div>
          }
          style={{ alignItems: 'baseline' }}
        />
        <Alert
          showIcon
          closable
          message="提示标题"
          description={
            <div>
              <Typography.Paragraph style={{ marginBottom: 8 }}>
                提示信息超过一行，此时按钮按照从上至下的视觉流，放置在信息区下方，这样浏览起来更流畅，即先阅读提示信息，再根据信息判断执行什么操作。
              </Typography.Paragraph>
              <Flex gap={8}>
                <Typography.Link>相关操作1</Typography.Link>
                <Typography.Link>相关操作2</Typography.Link>
              </Flex>
            </div>
          }
        />
        <Typography.Paragraph type="secondary">
          建议统一使用Link
          Button，明确可点击的同时，整体视觉也更和谐；当提示信息不超一行时，按钮放在信息右侧；当提示信息超过一行，按钮放置在信息区下方；这样能够确保用户的浏览动线一致，即先阅读提示信息，再根据信息判断执行什么操作。
        </Typography.Paragraph>
      </Flex>
    </Flex>
  );
};

export default Demo;
