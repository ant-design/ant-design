import InternalCard from './Card';
import Grid from './Grid';
import Meta from './Meta';

export { CardProps, CardTabListType } from './Card';
export { CardGridProps } from './Grid';
export { CardMetaProps } from './Meta';

type InternalCardType = typeof InternalCard;

export interface CardInterface extends InternalCardType {
  Grid: typeof Grid;
  Meta: typeof Meta;
}

const Card = InternalCard as CardInterface;

Card.Grid = Grid;
Card.Meta = Meta;

export default Card;
