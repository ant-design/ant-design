import Grid from './Grid';
import Meta from './Meta';
import InternalCard from './Card';

export { CardGridProps } from './Grid';
export { CardMetaProps } from './Meta';
export { CardProps, CardTabListType } from './Card';

type InternalCardType = typeof InternalCard;

export interface CardInterface extends InternalCardType {
  Grid: typeof Grid;
  Meta: typeof Meta;
}

const Card = InternalCard as CardInterface;

Card.Grid = Grid;
Card.Meta = Meta;

export default Card;
