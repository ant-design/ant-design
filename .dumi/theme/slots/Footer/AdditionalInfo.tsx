import * as React from 'react';
import { Modal, Button, Typography, Row, Col, Tour } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { isLocalStorageNameSupported, ping } from '../../utils';
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

const V5_NOTIFICATION = 'antd@4.0.0-notification-sent';
const SHOULD_OPEN_ANT_DESIGN_MIRROR_MODAL = 'ANT_DESIGN_DO_NOT_OPEN_MIRROR_MODAL';

function disableAntdMirrorModal() {
  window.localStorage.setItem(SHOULD_OPEN_ANT_DESIGN_MIRROR_MODAL, 'true');
}

function shouldOpenAntdMirrorModal() {
  return !window.localStorage.getItem(SHOULD_OPEN_ANT_DESIGN_MIRROR_MODAL);
}

export default function InfoNewVersion() {
  return null;

  const [locale, lang] = useLocale(locales);
  const [notify, setNotify] = React.useState<null | boolean>(null);

  const { token } = useSiteToken();

  function onClose() {
    setNotify(false);
    localStorage.setItem(V5_NOTIFICATION, 'true');
  }

  React.useEffect(() => {
    if (isLocalStorageNameSupported()) {
      // 大版本发布后全局弹窗提示
      //   1. 点击『知道了』之后不再提示
      //   2. 超过截止日期后不再提示
      if (
        localStorage.getItem(V5_NOTIFICATION) !== 'true' &&
        Date.now() < new Date('2022/12/31').getTime()
      ) {
        setNotify(true);
        return;
      }
    }

    setNotify(false);
  }, []);

  React.useEffect(() => {
    const timeout = ping((status) => {
      if (status !== 'timeout' && status !== 'error') {
        if (
          // process.env.NODE_ENV === 'production' &&
          notify === false &&
          window.location.host !== 'ant-design.antgroup.com' &&
          shouldOpenAntdMirrorModal()
        ) {
          Modal.confirm({
            title: '提示',
            content: '内网用户推荐访问国内镜像以获得极速体验～',
            okText: '🚀 立刻前往',
            cancelText: '不再弹出',
            closable: true,
            onOk() {
              window.open('https://ant-design.antgroup.com', '_self');
              disableAntdMirrorModal();
            },
            onCancel() {
              disableAntdMirrorModal();
            },
          });
        }
      }
    });

    return clearTimeout(timeout);
  }, [notify]);

  return (
    <>
      <Tour
        open={!!notify}
        mask={false}
        steps={[
          {
            title: locale.title,
            target: () => document.querySelector('#versionSelector')!,
            description: (
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
            ),
          },
        ]}
      />
      {/* <Modal
        open={!!notify}
        title={locale.title}
        closable={false}
        footer={<Button onClick={onClose}>{locale.ok}</Button>}
      >
        <Row gutter={16}>
          <Col flex="none">
            <SmileOutlined style={{ fontSize: 72, color: token.colorSuccess }} />
          </Col>
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
      </Modal> */}
    </>
  );
}
