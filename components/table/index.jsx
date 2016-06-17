import React from 'react';
import Table from './Table';
import TableColumn from './TableColumn';

const TableWithColumn = (props) => {
  if (props.columns) {
    return <Table {...props} />;
  }
  const columns = React.Children.map(props.children, child => (child.type === TableColumn ? child.props : null));
  return <Table {...props} columns={columns} />;
};

TableWithColumn.propTypes = {
  children: (props, propName, componentName) => {
    let error;
    const prop = props[propName] || [];
    React.Children.forEach(prop, child => {
      if (child.type !== TableColumn) {
        error = new Error(
          `\`${componentName}\` only accepts children of type \`TableColumn\`.`
        );
      }
    });
    return error;
  },
};

TableWithColumn.Column = TableColumn;
export default TableWithColumn;
