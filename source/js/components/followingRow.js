
var React = require('react');
var item_url = 'https://swgjazz.ibm.com:8017/jazz/web/projects/Social%20CRM%20-%20Sales%20Force%20Automation#action=com.ibm.team.workitem.viewWorkItem&id=';


var FollowingRow = React.createClass({
  handleClick: function(e) {

    e.preventDefault();
    this.props.onDeleted(this.props.item);
  },
  render: function() {
    var link = item_url + this.props.item.id;
    return (
        <a className="list-group-item" href={link} target="_blank">
          {this.props.item.summary}
          <button type="button" className="close custom-close" aria-label="Close" onClick={this.handleClick} itemid={this.props.item.id}><span aria-hidden="true">&times;</span></button>
        </a>
    );
  }
});

module.exports = FollowingRow;