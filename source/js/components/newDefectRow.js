
var React = require('react');

var NewDefectRow = React.createClass({
  render: function() {
    var link = item_url + this.props.item.id;
    return (
      <li>
        <a href={link} target="_blank">{this.props.item.id} - {this.props.item.summary}</a>
      </li>
    );
  }
});

module.exports = NewDefectRow;