var React = require('react');

var FilterRow = React.createClass({
  handleClick: function() {
    this.props.onDeleted(this.props.item);
  },
  render: function() {
    return (
      <tr>
        <td>{this.props.item.name}</td>
        <td>{this.props.item.id}</td>
        <td><button onClick={this.handleClick} className="delete_filter btn btn-danger btn-xs" >Delete</button></td>
      </tr>
    );
  }
});

module.exports = FilterRow;