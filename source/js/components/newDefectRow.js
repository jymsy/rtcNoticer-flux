
var React = require('react');
var item_url = 'https://swgjazz.ibm.com:8017/jazz/web/projects/Social%20CRM%20-%20Sales%20Force%20Automation#action=com.ibm.team.workitem.viewWorkItem&id=';


var NewDefectRow = React.createClass({
  render: function() {
    var link = item_url + this.props.item.id;
    return (
      <li className = "new-item-row">
        <a href={link} target="_blank">{this.props.item.id} - {this.props.item.summary}</a>
      </li>
    );
  }
});

module.exports = NewDefectRow;