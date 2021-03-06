var React = require('react');
var rtcActions = require('../actions/rtcActions');

var NewFilter = React.createClass({
  onSubmit: function(event) {
    event.preventDefault();
    var nameNode = this.refs.name.getDOMNode();
    var idNode = this.refs.id.getDOMNode();
    var name = nameNode.value.trim();
    var id = idNode.value.trim();

    if (name != "" && id != "") {
      rtcActions.createFilter(id, name);
    }
    nameNode.value = "";
    idNode.value = "";
  },
  render: function() {
    var inputStyle = {
      width: '200px'
    };
    return (
      <form className="form-inline" onSubmit={this.onSubmit}>
      Add filter:<br/>
      <div className="form-group">
        <input type="text" ref="name" className="form-control" style={inputStyle} placeholder="Name"/>
      </div>
      <div className="form-group">
        <input type="text" ref="id" className="form-control" style={inputStyle} placeholder="ID"/>
      </div>
      <button className="btn btn-primary" type="submit" >Add</button>
    </form>
    );
  }
});

module.exports = NewFilter;