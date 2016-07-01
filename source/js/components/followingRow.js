
var React = require('react');
var item_url = 'https://swgjazz.ibm.com:8017/jazz/web/projects/Social%20CRM%20-%20Sales%20Force%20Automation#action=com.ibm.team.workitem.viewWorkItem&id=';


var FollowingRow = React.createClass({
  handleClick: function() {
    this.props.onDeleted(this.props.item);
  },
  render: function() {
    var link = item_url + this.props.item.id;
    return (
      <li>
        <button onClick={this.handleClick} itemid={this.props.item.id} className="delete_focusing btn btn-danger">X</button>
        <a href={link} target="_blank">{this.props.item.summary}</a>
      </li>
    );
  }
});

module.exports = FollowingRow;