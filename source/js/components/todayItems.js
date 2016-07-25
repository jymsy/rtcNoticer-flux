var React = require('react');
var NewDefectRow = require('./newDefectRow');

var TodayItems = React.createClass({
  getInitialState: function() {
    return {
      list: []
    };
  },
  componentWillMount: function() {
    var message = {
      type: "initItems"
    };

    chrome.runtime.sendMessage(message, function(items) {
      if (items) {
        this.setState({list:items});
      }
    }.bind(this));
  },
  componentDidMount: function() {
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
      if(message.type == "addNewItem"){
        console.log('add new item');
        var list = this.state.list;
        list.push(message.value);
        this.setState({list:list});
      }
    }.bind(this));
  },
  render: function() {
    var rows = [];
    console.log(this.state.list);
    this.state.list.forEach(function(item) {
      rows.push(<NewDefectRow item={item} />);
    }.bind(this));
    return (
      <div id="todayItems">
        <h2>Defects since last check:</h2>
        <ol className="newItems-list">{rows}</ol>
      </div>
    );
  }
});

module.exports = TodayItems;