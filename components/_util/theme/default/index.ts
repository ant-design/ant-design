import seedToken, { SeedToken } from './seed';
import derivative, { DerivativeToken } from './derivative';

export type DesignToken = SeedToken & DerivativeToken;

const designToken: DesignToken = {
  ...seedToken,
  ...derivative(seedToken),
};

export default designToken;
