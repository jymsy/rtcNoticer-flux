var React = require('react');
var FollowingRow = require('./followingRow');
var followStore = require('../stores/followStore');
var rtcActions = require('../actions/rtcActions');

var Following = React.createClass({
  getInitialState: function() {
    return {
      list: followStore.getAllFollows()
    };
  },
  handleDeleteFocusing: function(item) {
    rtcActions.removeFollow(item.id);

  },
  componentDidMount: function() {
    followStore.addChangeListener(this._onChange);
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
      if (message.type == "addFocusingOn") {
        rtcActions.createFollow();
      }
    }.bind(this));
  },
  componentWillUnmount: function() {
    followStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState({
      list: followStore.getAllFollows()
    });
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