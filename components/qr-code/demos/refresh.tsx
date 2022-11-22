import React, { useState, useEffect } from 'react';
import { QrCode } from '@alipay/tech-ui';
import { Spin } from 'antd';
import service from './service';
import type { CertifyLPDTO } from './service';

export default () => {
  const [loading, setLoading] = useState(false);
  const [expired, setExpired] = useState(false);
  const [certifyData, setCertifyData] = useState<CertifyLPDTO>({});
  const { qrUrl, imgUrl, expires } = certifyData;

  // 重新加载二维码，实际使用中替换为实际请求
  const reloadQrCode = async () => {
    setLoading(true);
    const result = await service.reloadQrCode();
    if (result.success) {
      setExpired(false);
      setCertifyData(result.data);
    }
    setLoading(false);
  };

  // 轮询当前认证状态，更新过期状态
  useEffect(() => {
    reloadQrCode();
  }, []);

  useEffect(() => {
    const loopStatus = setInterval(() => {
      // 这里可以查询认证状态并做后续动作。
      setExpired(Date.now() > expires);
    }, 1000);

    return () => {
      clearInterval(loopStatus);
    };
  }, [expires]);

  return loading ? (
    <Spin />
  ) : (
    <QrCode
      value={qrUrl!}
      size={196}
      logo={imgUrl}
      expired={expired}
      onRefresh={() => {
        reloadQrCode();
      }}
    />
  );
};
