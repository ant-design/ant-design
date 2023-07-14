import React from 'react';
import type { ListGridType } from '.';

export interface ListConsumerProps {
  grid?: ListGridType;
  itemLayout?: string;
}

export const ListContext = React.createContext<ListConsumerProps>({});

export const ListConsumer = ListContext.Consumer;
