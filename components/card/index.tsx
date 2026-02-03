import InternalCard from './Card';
import CardGrid from './CardGrid';
import CardMeta from './CardMeta';

export type { CardProps, CardSemanticType, CardTabListType } from './Card';
export type { CardGridProps } from './CardGrid';
export type { CardMetaProps, CardMetaSemanticType } from './CardMeta';

type InternalCardType = typeof InternalCard;

export interface CardInterface extends InternalCardType {
  Grid: typeof CardGrid;
  Meta: typeof CardMeta;
}

const Card = InternalCard as CardInterface;

Card.Grid = CardGrid;
Card.Meta = CardMeta;

export default Card;
