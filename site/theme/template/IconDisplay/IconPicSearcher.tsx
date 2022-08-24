import React, { useCallback, useEffect, useState } from 'react';
import { Upload, Tooltip, Popover, Modal, Progress, message, Spin, Result } from 'antd';
import CopyToClipboard from 'react-copy-to-clipboard';
import { injectIntl } from 'react-intl';
import * as AntdIcons from '@ant-design/icons';

const allIcons: { [key: string]: any } = AntdIcons;

const { Dragger } = Upload;
interface AntdIconClassifier {
  load: Function;
  predict: Function;
}
declare global {
  interface Window {
    antdIconClassifier: AntdIconClassifier;
  }
}

interface PicSearcherProps {
  intl: any;
}

interface PicSearcherState {
  loading: boolean;
  modalOpen: boolean;
  popoverVisible: boolean;
  icons: iconObject[];
  fileList: any[];
  error: boolean;
  modelLoaded: boolean;
}

interface iconObject {
  type: string;
  score: number;
}

const PicSearcher: React.FC<PicSearcherProps> = ({ intl }) => {
  const { messages } = intl;
  const [state, setState] = useState<PicSearcherState>({
    loading: false,
    modalOpen: false,
    popoverVisible: false,
    icons: [],
    fileList: [],
    error: false,
    modelLoaded: false,
  });
  const predict = (imgEl: HTMLImageElement) => {
    try {
      let icons: any[] = window.antdIconClassifier.predict(imgEl);
      if (gtag && icons.length) {
        gtag('event', 'icon', {
          event_category: 'search-by-image',
          event_label: icons[0].className,
        });
      }
      icons = icons.map(i => ({ score: i.score, type: i.className.replace(/\s/g, '-') }));
      setState(prev => ({ ...prev, loading: false, error: false, icons }));
    } catch {
      setState(prev => ({ ...prev, loading: false, error: true }));
    }
  };
  // eslint-disable-next-line class-methods-use-this
  const toImage = (url: string) =>
    new Promise(resolve => {
      const img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');
      img.src = url;
      img.onload = () => {
        resolve(img);
      };
    });

  const uploadFile = useCallback((file: File) => {
    setState(prev => ({ ...prev, loading: true }));
    const reader = new FileReader();
    reader.onload = () => {
      toImage(reader.result as string).then(predict);
      setState(prev => ({
        ...prev,
        fileList: [{ uid: 1, name: file.name, status: 'done', url: reader.result }],
      }));
    };
    reader.readAsDataURL(file);
  }, []);

  const onPaste = useCallback((event: ClipboardEvent) => {
    const items = event.clipboardData && event.clipboardData.items;
    let file = null;
    if (items && items.length) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.includes('image')) {
          file = items[i].getAsFile();
          break;
        }
      }
    }
    if (file) {
      uploadFile(file);
    }
  }, []);
  const toggleModal = useCallback(() => {
    setState(prev => ({
      ...prev,
      modalOpen: !prev.modalOpen,
      popoverVisible: false,
      fileList: [],
      icons: [],
    }));
    if (!localStorage.getItem('disableIconTip')) {
      localStorage.setItem('disableIconTip', 'true');
    }
  }, []);
  // eslint-disable-next-line class-methods-use-this
  const onCopied = useCallback((text: string) => {
    message.success(
      <span>
        <code className="copied-code">{text}</code> copied 🎉
      </span>,
    );
  }, []);
  useEffect(() => {
    const script = document.createElement('script');
    script.onload = async () => {
      await window.antdIconClassifier.load();
      setState(prev => ({ ...prev, modelLoaded: true }));
      document.addEventListener('paste', onPaste);
    };
    script.src = 'https://cdn.jsdelivr.net/gh/lewis617/antd-icon-classifier@0.0/dist/main.js';
    document.head.appendChild(script);
    setState(prev => ({ ...prev, popoverVisible: !localStorage.getItem('disableIconTip') }));
    return () => {
      document.removeEventListener('paste', onPaste);
    };
  }, []);

  return (
    <div className="icon-pic-searcher">
      <Popover
        content={messages[`app.docs.components.icon.pic-searcher.intro`]}
        open={state.popoverVisible}
      >
        <AntdIcons.CameraOutlined className="icon-pic-btn" onClick={toggleModal} />
      </Popover>
      <Modal
        title={messages[`app.docs.components.icon.pic-searcher.title`]}
        open={state.modalOpen}
        onCancel={toggleModal}
        footer={null}
      >
        {state.modelLoaded || (
          <Spin
            spinning={!state.modelLoaded}
            tip={messages['app.docs.components.icon.pic-searcher.modelloading']}
          >
            <div style={{ height: 100 }} />
          </Spin>
        )}
        {state.modelLoaded && (
          <Dragger
            accept="image/jpeg, image/png"
            listType="picture"
            customRequest={o => uploadFile(o.file as File)}
            fileList={state.fileList}
            showUploadList={{ showPreviewIcon: false, showRemoveIcon: false }}
          >
            <p className="ant-upload-drag-icon">
              <AntdIcons.InboxOutlined />
            </p>
            <p className="ant-upload-text">
              {messages['app.docs.components.icon.pic-searcher.upload-text']}
            </p>
            <p className="ant-upload-hint">
              {messages['app.docs.components.icon.pic-searcher.upload-hint']}
            </p>
          </Dragger>
        )}
        <Spin
          spinning={state.loading}
          tip={messages['app.docs.components.icon.pic-searcher.matching']}
        >
          <div className="icon-pic-search-result">
            {state.icons.length > 0 && (
              <div className="result-tip">
                {messages['app.docs.components.icon.pic-searcher.result-tip']}
              </div>
            )}
            <table>
              {state.icons.length > 0 && (
                <thead>
                  <tr>
                    <th className="col-icon">
                      {messages['app.docs.components.icon.pic-searcher.th-icon']}
                    </th>
                    <th>{messages['app.docs.components.icon.pic-searcher.th-score']}</th>
                  </tr>
                </thead>
              )}
              <tbody>
                {state.icons.map(icon => {
                  const { type } = icon;
                  const iconName = `${type
                    .split('-')
                    .map(str => `${str[0].toUpperCase()}${str.slice(1)}`)
                    .join('')}Outlined`;
                  return (
                    <tr key={iconName}>
                      <td className="col-icon">
                        <CopyToClipboard text={`<${iconName} />`} onCopy={onCopied}>
                          <Tooltip title={icon.type} placement="right">
                            {React.createElement(allIcons[iconName])}
                          </Tooltip>
                        </CopyToClipboard>
                      </td>
                      <td>
                        <Progress percent={Math.ceil(icon.score * 100)} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {state.error && (
              <Result
                status="500"
                title="503"
                subTitle={messages['app.docs.components.icon.pic-searcher.server-error']}
              />
            )}
          </div>
        </Spin>
      </Modal>
    </div>
  );
};

export default injectIntl(PicSearcher);
