
var React = require('react');
var item_url = 'https://swgjazz.ibm.com:8017/jazz/web/projects/Social%20CRM%20-%20Sales%20Force%20Automation#action=com.ibm.team.workitem.viewWorkItem&id=';


var NewDefectRow = React.createClass({
  render: function() {
    var link = item_url + this.props.item.id;
    var severity = this.props.item.severity || 'Normal';
    var className = "list-group-item ";
    switch (severity) {
        case "Blocker": 
            className += "list-group-item-danger";
            break;
        case "Critical":
            className += "list-group-item-danger";
            break;
        case "Major":
            className += "list-group-item-info";
            break;
        default:
            className += "list-group-item-warning";
    }
    return (
        <a className = {className} href={link} target="_blank">{this.props.item.id} - {this.props.item.summary}</a>
    );
  }
});

module.exports = NewDefectRow;