import type { SeedToken, SizeMapToken } from '../../interface';

export default function genSizeMapToken(token: SeedToken): SizeMapToken {
  const { sizeUnit, sizeBaseStep } = token;

  return {
    sizeXXL: sizeUnit * (sizeBaseStep + 10),
    sizeXL: sizeUnit * (sizeBaseStep + 6),
    sizeLG: sizeUnit * (sizeBaseStep + 2),
    sizeMD: sizeUnit * (sizeBaseStep + 2),
    sizeMS: sizeUnit * (sizeBaseStep + 1),
    size: sizeUnit * sizeBaseStep,
    sizeSM: sizeUnit * sizeBaseStep,
    sizeXS: sizeUnit * (sizeBaseStep - 1),
    sizeXXS: sizeUnit * (sizeBaseStep - 1),
  };
}
