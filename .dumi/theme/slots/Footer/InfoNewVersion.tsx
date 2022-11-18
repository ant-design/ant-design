import * as React from 'react';
import { Modal, Button, Typography, Row, Col } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { isLocalStorageNameSupported } from '../../../theme/utils';
import useLocale from '../../../hooks/useLocale';
import useSiteToken from '../../../hooks/useSiteToken';

const locales = {
  cn: {
    title: '🎉🎉🎉 Ant Design 5.0 发布！ 🎉🎉🎉',
    ok: '知道了',
  },
  en: {
    title: '🎉🎉🎉 Ant Design 5.0 is released! 🎉🎉🎉',
    ok: 'Got it',
  },
};

export default function InfoNewVersion() {
  const [locale, lang] = useLocale(locales);
  const [notify, setNotify] = React.useState(false);

  const { token } = useSiteToken();

  function onClose() {
    setNotify(false);
    localStorage.setItem('antd@4.0.0-notification-sent', 'true');
  }

  React.useEffect(() => {
    if (!isLocalStorageNameSupported()) {
      return;
    }

    // 大版本发布后全局弹窗提示
    //   1. 点击『知道了』之后不再提示
    //   2. 超过截止日期后不再提示
    if (
      localStorage.getItem('antd@4.0.0-notification-sent') !== 'true' &&
      Date.now() < new Date('2022/12/31').getTime()
    ) {
      setNotify(true);
    }
  }, []);

  return (
    <Modal
      open={notify}
      title={locale.title}
      closable={false}
      footer={<Button onClick={onClose}>{locale.ok}</Button>}
    >
      <Row gutter={16}>
        {/* <Col flex="none">
          <SmileOutlined style={{ fontSize: 72, color: token.colorSuccess }} />
        </Col> */}
        <Col flex="auto">
          <Typography style={{ marginTop: token.marginXS }}>
            {lang === 'cn' ? (
              <>
                <p>
                  点击{' '}
                  <Typography.Link href="/changelog-cn" onClick={onClose}>
                    此处查看
                  </Typography.Link>{' '}
                  完整更新日志。
                </p>
                <p>
                  如果你需要访问 v4 版本的文档，请点击{' '}
                  <Typography.Link href="https://4x.ant.design/" onClick={onClose}>
                    此处查看
                  </Typography.Link>
                  。
                </p>
              </>
            ) : (
              <>
                <p>
                  Click{' '}
                  <Typography.Link href="/changelog" onClick={onClose}>
                    here
                  </Typography.Link>{' '}
                  to view full changelog.
                </p>
                <p>
                  If you want to check v4 documentation, please click{' '}
                  <Typography.Link href="https://4x.ant.design/" onClick={onClose}>
                    here
                  </Typography.Link>
                  .
                </p>
              </>
            )}
          </Typography>
        </Col>
      </Row>
    </Modal>
  );
}
