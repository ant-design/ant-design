import * as React from 'react';
import { ColumnProps } from './interface';

export default class Column<T> extends React.Component<ColumnProps<T>, React.ComponentState> {}
