
var React = require('react');
var FollowingRow = require('./followingRow');

var Following = React.createClass({
  getInitialState: function() {
    var focusingOnList = JSON.parse(localStorage.focusingOn);
    return {
      list: focusingOnList
    };
  },
  handleDeleteFocusing: function(item) {
    var focusingOnList = this.state.list
    for (var i = focusingOnList.length - 1; i >= 0; i--) {
        if (focusingOnList[i].id == item.id) {
            deleteIndex = i;
            break;
        }
    }

    focusingOnList.splice(i,1);
    localStorage.focusingOn=JSON.stringify(focusingOnList);
    this.setState({list: focusingOnList});
  },
  componentDidMount: function() {
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
      if(message.type == "addFocusingOn"){
        var focusingOnList = JSON.parse(localStorage.focusingOn);
        self.setState({list: focusingOnList});
      }
    }.bind(this));
  },
  render: function() {
    var rows = [];
    this.state.list.forEach(function(item) {
      rows.push(<FollowingRow item={item} onDeleted={this.handleDeleteFocusing} />);
    }.bind(this));
    return (
      <div id="focusingOn">
        <h2>Following:</h2>
        <ol>{rows}</ol>
      </div>
    );
  }
});

module.exports = Following;