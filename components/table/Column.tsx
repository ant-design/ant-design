import * as React from 'react';
import { ColumnProps } from './interface';

/* eslint-disable react/prefer-stateless-function */
export default class Column<T> extends React.Component<ColumnProps<T>, React.ComponentState> {}
