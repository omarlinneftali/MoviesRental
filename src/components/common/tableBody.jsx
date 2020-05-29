import React, { Component } from "react";
import _ from "lodash";
class TableBody extends Component {
  renderCell = (column, element) => {
    if (column.content) return column.content(element);

    return _.get(element, column.path);
  };

  createKey = (column, element) => {
    return element[this.props.keyProperty] + (column.path || column.content);
  };

  render() {
    const { data, columns, keyProperty } = this.props;
    return (
      <tbody>
        {data.map((element) => (
          <tr key={element[keyProperty]}>
            {columns.map((column) => (
              <td key={this.createKey(column, element)}>
                {this.renderCell(column, element)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

TableBody.defaultProps = {
  keyProperty: "_id",
};

export default TableBody;
