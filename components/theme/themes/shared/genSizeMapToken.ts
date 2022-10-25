import type { SeedToken, SizeMapToken } from '../../interface';

export default function genSizeMapToken(token: SeedToken): SizeMapToken {
  const { sizeUnit, sizeBaseStep } = token;

  return {
    sizeXXL: sizeUnit * (sizeBaseStep + 8), // 48
    sizeXL: sizeUnit * (sizeBaseStep + 4), // 32
    sizeLG: sizeUnit * (sizeBaseStep + 2), // 24
    sizeMD: sizeUnit * (sizeBaseStep + 1), // 20
    sizeMS: sizeUnit * sizeBaseStep, // 16
    size: sizeUnit * sizeBaseStep, // 16
    sizeSM: sizeUnit * (sizeBaseStep - 1), // 12
    sizeXS: sizeUnit * (sizeBaseStep - 2), // 8
    sizeXXS: sizeUnit * (sizeBaseStep - 3), // 4
  };
}
