import React from 'react';
import { Alert, Flex, Typography } from 'antd';

import useLocale from '../../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    closeAlertTitle: '关闭提示',
    welcomeMessage: '你好！欢迎使用专业版，你可以根据自身需求添加业务模块。',
    helpTitle: '帮助信息',
    helpDescription:
      '你好，由于你的良好信用，我们决定赠送你三个月产品会员，欲了解会员特权与活动请进首页会员专区查看。',
    expandCollapseTitle: '展开/收起提示',
    longMessage:
      '提示信息超过2行时，可以使用将部分信息折叠，以减少空间占用。提示信息超过2行时，可以使用将部分信息折叠，以减少空间占用。提示信息超过2行时，可以使用将部分信息折叠，以减少空间占用。提示信息超过2行时，可以使用将部分信息折叠，以减少空间占用。提示信息超过2行时，可以使用将部分信息折叠，以减少空间占用。',
    collapse: '收起',
    expandMore: '展开更多',
    otherActionsTitle: '执行其他操作',
    singleLineMessage: '提示信息不超过一行时，按钮放在信息右侧。',
    relatedAction: '相关操作',
    multiLineMessage:
      '提示信息超过一行，此时按钮按照从上至下的视觉流，放置在信息区下方，这样浏览起来更流畅，即先阅读提示信息，再根据信息判断执行什么操作。',
    relatedAction1: '相关操作1',
    relatedAction2: '相关操作2',
    alertTitle: '提示标题',
    guidanceText:
      '建议统一使用 Link Button，明确可点击的同时，整体视觉也更和谐；当提示信息不超一行时，按钮放在信息右侧；当提示信息超过一行，按钮放置在信息区下方；这样能够确保用户的浏览动线一致，即先阅读提示信息，再根据信息判断执行什么操作。',
  },
  en: {
    closeAlertTitle: 'Close Alert',
    welcomeMessage:
      'Hello! Welcome to use the professional version. You can add business modules according to your needs.',
    helpTitle: 'Help Information',
    helpDescription:
      'Hello, due to your good credit, we have decided to give you a three-month product membership. To learn about membership privileges and activities, please visit the membership section on the homepage.',
    expandCollapseTitle: 'Expand/Collapse Alert',
    longMessage:
      'When alert information exceeds 2 lines, you can collapse part of the information to reduce space usage. When alert information exceeds 2 lines, you can collapse part of the information to reduce space usage. When alert information exceeds 2 lines, you can collapse part of the information to reduce space usage. When alert information exceeds 2 lines, you can collapse part of the information to reduce space usage. When alert information exceeds 2 lines, you can collapse part of the information to reduce space usage.',
    collapse: 'Collapse',
    expandMore: 'Expand More',
    otherActionsTitle: 'Perform Other Actions',
    singleLineMessage:
      'When alert information does not exceed one line, the button is placed on the right side of the information.',
    relatedAction: 'Related Action',
    multiLineMessage:
      'When alert information exceeds one line, the button is placed below the information area according to the top-to-bottom visual flow, making browsing smoother, i.e., first read the alert information, then decide what action to take based on the information.',
    relatedAction1: 'Related Action 1',
    relatedAction2: 'Related Action 2',
    alertTitle: 'Alert Title',
    guidanceText:
      'It is recommended to uniformly use Link Button, which clarifies clickability while maintaining overall visual harmony; when alert information does not exceed one line, the button is placed on the right side of the information; when alert information exceeds one line, the button is placed below the information area; this ensures consistent user browsing flow, i.e., first read the alert information, then decide what action to take based on the information.',
  },
};

const Demo: React.FC = () => {
  const [locale] = useLocale(locales);
  const [expandA, setExpandA] = React.useState(false);
  const [expandB, setExpandB] = React.useState(true);
  return (
    <Flex gap="large" vertical style={{ maxWidth: 600 }}>
      <Flex gap="middle" vertical>
        <div>{locale.closeAlertTitle}</div>
        <Alert showIcon closable title={locale.welcomeMessage} />
        <Alert showIcon closable title={locale.helpTitle} description={locale.helpDescription} />
      </Flex>
      <Flex gap="middle" vertical>
        <div>{locale.expandCollapseTitle}</div>
        <Alert
          showIcon
          closable
          title={
            <div>
              <Typography.Paragraph ellipsis={!expandA && { rows: 2 }} style={{ marginBottom: 8 }}>
                {locale.longMessage}
              </Typography.Paragraph>
              <Typography.Link onClick={() => setExpandA((prev) => !prev)}>
                {expandA ? locale.collapse : locale.expandMore}
              </Typography.Link>
            </div>
          }
          style={{ alignItems: 'baseline' }}
        />
        <Alert
          showIcon
          closable
          title={
            <div>
              <Typography.Paragraph ellipsis={!expandB && { rows: 2 }} style={{ marginBottom: 8 }}>
                {locale.longMessage}
              </Typography.Paragraph>
              <Typography.Link onClick={() => setExpandB((prev) => !prev)}>
                {expandB ? locale.collapse : locale.expandMore}
              </Typography.Link>
            </div>
          }
          style={{ alignItems: 'baseline' }}
        />
      </Flex>
      <Flex gap="middle" vertical>
        <div>{locale.otherActionsTitle}</div>
        <Alert
          showIcon
          closable
          title={locale.singleLineMessage}
          action={<Typography.Link>{locale.relatedAction}</Typography.Link>}
        />
        <Alert
          showIcon
          closable
          title={
            <div>
              <Typography.Paragraph style={{ marginBottom: 8 }}>
                {locale.multiLineMessage}
              </Typography.Paragraph>
              <Flex gap={8}>
                <Typography.Link>{locale.relatedAction1}</Typography.Link>
                <Typography.Link>{locale.relatedAction2}</Typography.Link>
              </Flex>
            </div>
          }
          style={{ alignItems: 'baseline' }}
        />
        <Alert
          showIcon
          closable
          title={locale.alertTitle}
          description={
            <div>
              <Typography.Paragraph style={{ marginBottom: 8 }}>
                {locale.multiLineMessage}
              </Typography.Paragraph>
              <Flex gap={8}>
                <Typography.Link>{locale.relatedAction1}</Typography.Link>
                <Typography.Link>{locale.relatedAction2}</Typography.Link>
              </Flex>
            </div>
          }
        />
        <Typography.Paragraph type="secondary">{locale.guidanceText}</Typography.Paragraph>
      </Flex>
    </Flex>
  );
};

export default Demo;
