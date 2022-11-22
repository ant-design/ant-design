export interface CertifyLPDTO {
  /** 认证id */
  certifyId?: string;
  /** 二维码url */
  qrUrl?: string;
  /** 二维码中的Logo的图片地址 */
  imgUrl?: string;
  /** 过期时间戳，单位毫秒 */
  expires?: number;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 刷新二维码
 */
export const reloadQrCode = async () => {
  await sleep(Math.random() * 2000);

  return {
    success: true,
    errorCode: null,
    errorMessage: null,
    data: {
      /** 认证id */
      certifyId: '#certifyId',
      /** 二维码url */
      qrUrl: 'https://www.alipay.com',
      /** 二维码中的Logo的图片地址 */
      imgUrl:
        'https://gw-office.alipayobjects.com/basement_prod/c83c53ab-515e-43e2-85d0-4d0da16f11ef.svg',
      /** 过期时间戳，单位毫秒 */
      expires: Date.now() + 6000, // 假设 6 秒过期
    },
  };
};

export default {
  reloadQrCode,
};
