import React from 'react';

export interface ListConsumerProps {
  grid?: any;
  itemLayout?: string;
}

export const ListContext = React.createContext<ListConsumerProps>({});

export const ListConsumer = ListContext.Consumer;
