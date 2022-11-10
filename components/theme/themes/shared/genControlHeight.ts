import type { HeightMapToken, SeedToken } from '../../interface';

const genControlHeight = (token: Pick<SeedToken, 'controlHeight'>): HeightMapToken => {
  const { controlHeight } = token;

  return {
    controlHeightSM: controlHeight * 0.75,
    controlHeightXS: controlHeight * 0.5,
    controlHeightLG: controlHeight * 1.25,
  };
};

export default genControlHeight;
