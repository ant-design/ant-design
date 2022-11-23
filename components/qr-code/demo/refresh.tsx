import React, { useState, useEffect } from 'react';
import { QrCode, Spin } from 'antd';

interface CertifyLPDTO {
  /** 认证id */
  certifyId?: string;
  /** 二维码url */
  qrUrl?: string;
  /** 二维码中的Logo的图片地址 */
  imgUrl?: string;
  /** 过期时间戳，单位毫秒 */
  expires?: number;
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * 刷新二维码
 */
const server = async () => {
  await sleep(Math.random() * 2000);
  return {
    success: true,
    errorCode: null,
    errorMessage: null,
    data: {
      /** 认证id */
      certifyId: '#certifyId',
      /** 二维码url */
      qrUrl: 'https://ant.design/',
      /** 二维码中的Logo的图片地址 */
      imgUrl: 'https://gw.alipayobjects.com/zos/antfincdn/%24C9tmj978R/Carousel.svg',
      /** 过期时间戳，单位毫秒 */
      expires: Date.now() + 6000, // 假设 6 秒过期
    },
  };
};

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [expired, setExpired] = useState<boolean>(false);
  const [certifyData, setCertifyData] = useState<CertifyLPDTO>({});
  const { qrUrl, imgUrl, expires } = certifyData;

  // 重新加载二维码，实际使用中替换为实际请求
  const reloadQrCode = async () => {
    setLoading(true);
    const result = await server();
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
      setExpired(Date.now() > expires!);
    }, 1000);

    return () => {
      clearInterval(loopStatus);
    };
  }, [expires]);

  return loading ? (
    <Spin />
  ) : (
    <QrCode value={qrUrl!} size={196} logo={imgUrl} expired={expired} onRefresh={reloadQrCode} />
  );
};

export default App;
