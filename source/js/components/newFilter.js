var React = require('react');

var NewFilter = React.createClass({
  onSubmit: function(event) {
    event.preventDefault();
    var nameNode = this.refs.name.getDOMNode();
    var idNode = this.refs.id.getDOMNode();
    var name = nameNode.value.trim();
    var id = idNode.value.trim();

    if (name != "" && id != "") {
        var currentFilter = JSON.parse(localStorage.filter);
        currentFilter.push({name: name, id:id, lastModifyDate:"1"});
        localStorage.filter = JSON.stringify(currentFilter);
        PubSub.publish(reloadFilterEvt);
    }
    nameNode.value = "";
    idNode.value = "";
  },
  render: function() {
    var inputStyle = {width:'200px'};
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

