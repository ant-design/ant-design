import InternalCard from './Card';
import Grid from './Grid';
import Meta from './Meta';

export type { CardProps, CardTabListType } from './Card';
export type { CardGridProps } from './Grid';
export type { CardMetaProps } from './Meta';

type InternalCardType = typeof InternalCard;

export interface CardInterface extends InternalCardType {
  Grid: typeof Grid;
  Meta: typeof Meta;
}

const Card = InternalCard as CardInterface;

Card.Grid = Grid;
Card.Meta = Meta;

if (process.env.NODE_ENV !== 'production') {
  Card.displayName = 'Card';
}

export default Card;
